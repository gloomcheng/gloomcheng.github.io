---
title: "[Drupal] 自定義 Token 以及呼叫它的方法"
description: "要建立自定義的 token 會需要用到 hooktokeninfo() 及 hooktoken()，前者是定義 token 的分類及可以使用的 tokens、後者則是撰寫 token 要置換成什麼內容的程式。 ### 準備 Token 以下是 Drupal Token - Generic placeholder substitution 的範例： / Imp"
publishedAt: "2022-07-11T01:39:57.000Z"
updatedAt: "2022-07-11T01:56:21.000Z"
legacyPath: "/technical/drupal-zi-ding-yi-token-yi-ji-hu-jiao-ta-de-fang-fa"
kind: "technical"
tags: ["Drupal 8+", "Form API", "Module development", "Token"]
legacyNid: 186
archived: true
---

要建立自定義的 token 會需要用到 `hook_token_info()` 及 `hook_token()`，前者是定義 token 的分類及可以使用的 tokens、後者則是撰寫 token 要置換成什麼內容的程式。

### 準備 Token

以下是 Drupal [Token - Generic placeholder substitution](https://www.drupal.org/documentation/modules/token) 的範例：

```
/**
 * Implements hook_token_info().
 */
function databasics_token_info() {
  $info = array();

  $info['types'] = array(
    'databasics-totals' => array(
      'name' => t('Databasics totals'),
      'description' => t('Global databasics tokens.'),
    ),
    // [databasics-page:]
    'databasics-page' => array(
      'name' => t('Databasics'),
      'description' => t('Tokens for databasics page counts.'),
      'needs-data' => array('databasics_record'),
    ),
  );

  $info['tokens'] = array(
    'databasics-totals' => array(
      // [databasics-totals:count]
      'count' => array(
        'name' => t('Total page views'),
        'description' => t('Total page views for entire site.'),
      ),
    ),
    // Page specific tokens.
    'databasics-page' => array(
      // Add a token for the view count.
      // [databasics-page:view-count]
      'view-count' => array(
        'name' => t('View count'),
        'description' => t('Number of times the page has been viewed by the current user.'),
      ),
      // [databasics-page:last-viewed]
      'last-viewed' => array(
        'name' => t('Last viewed'),
        'description' => t('Date the page was last viewed.'),
      ),
    ),
  );

  // [node:view-count], [node:view-count:last-viewed]
  $info['tokens']['node'] = array(
    'view-count' => array(
      'name' => t('View count'),
      'description' => t('Number of times the current node has been viewed by the current user.'),
      'type' => 'databasics-page', 
    ),
  );

  return $info;
}
```

```
/**
 * Implements hook_tokens().
 */
function databasics_tokens($type, $tokens, array $data = array(), array $options = array()) {
  $replacements = array();

  // Replacement values for tokens that can be calculated without any additional
  // data.
  if ($type == 'databasics-totals') {
    foreach ($tokens as $name => $original) {
      switch ($name) {
        case 'count':
          $count = db_query('SELECT SUM(view_count) FROM {databasics}')->fetchField();
          $replacements[$original] = $count;
          break;
      }
    }
  }

  // Replacement values for tokens that require additional contextual data.
  if ($type == 'databasics-page' && !empty($data['databasics_record'])) {
    $record = $data['databasics_record'];
    foreach ($tokens as $name => $original) {
      switch ($name) {
        case 'view-count':
          $replacements[$original] = $record->view_count;
          break;

        case 'last-viewed':
          $replacements[$original] = $record->last_viewed;
          break;
      }
    }

  }
  // An array of replacement values keyed by original token string.
  return $replacements;
}
```

上述的 hook 想當然爾必須寫在 `databasics.module` 檔案裡（假設客製模組的名稱 `databasics`），但如果你想將 token 相關的程式另外建立成 `.tokens.inc` 檔案管理，那你可以在 `databasics.module` 寫以下的程式[^1]：

```
// Load databasics.tokens.inc from custom_token module
module_load_include('inc', 'databasics', 'databasics.tokens');
```

### 在表單中提供 Browsing Tokens 的連結

如果我們要在客製表單提供 `Browsing Tokens` 的連結，那會需要加入下段的程式碼[^2]：

```
$form['token_help'] = array(
  '#theme' => 'token_tree_link',
  '#token_types' => array('user', 'node'),
);
```

### 將 token 置換成實際的內容

上述只是「建立可用的 token」，及「在表單中提供可以瀏覽、搜索 token」的 UI 功能，然而還沒有完成將 token 置換成實際內容的功能。要將 token 置換成實際的內容，會需要先呼叫 `token service`，然後用 `replace()` 方法來做實際內容的置換，例如下面的程式碼[^3]：

```
$node = \Drupal\node\Entity\Node::load($nid);  //load the current node
$token_service = \Drupal::token();  //get the Drupal token service which replaces tokens with tokens' data
$body_field_data = $node->get('body')->value;  //get the "text" (basic data) of the body field
$token_data = array(  //assigns the current node data to the 'node' key in the $data array; the node key is recognized by the Token service
  'node' => $node,
);
$token_options = ['clear' => TRUE];  //part of the Token replacement service; A boolean flag indicating that tokens should be removed from the final text if no replacement value can be generated
$params['body'] = $token_service->replace($body_field_data, $token_data, $token_options);  //sets the 'body' key of the $params array equal to the basic body field data plus replaces the tokens in the body field```
```

[^1]: [How to create custom token to be used in default mail message template in Drupal 8](https://www.valuebound.com/resources/blog/how-to-create-custom-token-to-be-used-default-mail-message-template-drupal-8)
[^2]: [Token - Generic placeholder substitution](https://www.drupal.org/documentation/modules/token)
[^3]: [Can't get token replacement to work](https://drupal.stackexchange.com/questions/293871/cant-get-token-replacement-to-work)

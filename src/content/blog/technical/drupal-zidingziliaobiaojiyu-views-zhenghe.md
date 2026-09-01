---
title: "[Drupal] 自訂資料表及與 Views 整合"
description: "本文適用於 Drupal 7。 ## 自訂資料表 如果你需要建構 custom table，那麼你可以用 hookschema() 來定義資料表結構。 在開始前，建議可以閱讀 Schema API quick start guide php / Implements hookschema(). / function mymoduleschema() { $s"
publishedAt: "2021-01-14T19:10:29.000Z"
updatedAt: "2021-01-18T12:30:30.000Z"
legacyPath: "/technical/drupal-zidingziliaobiaojiyu-views-zhenghe"
kind: "technical"
tags: ["Drupal 7", "Module development", "Views"]
legacyNid: 163
archived: true
---

本文適用於 Drupal 7。

## 自訂資料表

如果你需要建構 custom table，那麼你可以用 `hook_schema()` 來定義資料表結構。
在開始前，建議可以閱讀 [Schema API quick start guide](https://www.drupal.org/docs/7/api/schema-api/schema-api-quick-start-guide)

```php
/**
 * Implements hook_schema().
 */
function mymodule_schema() {
  $schema['custom_table1'] = array(
     // 定義資料欄位
  );
  $schema['custom_table2'] = array(
     // 定義資料欄位
  );
  return $schema;
}
```

上述中，table 陣列下就是定義你這個資料表需要的資料欄位。以 node 模組為例，node table 下每個欄位基本上可以設定以下參數

```php
$schema['node'] = array(
  'description' => 'The base table for nodes.',
  'fields' => array(
    'nid' => array(
      'type' => 'serial',
      'unsigned' => TRUE,
      'not null' => TRUE,
    ),
);
```

基本上，一定會定義每個資料欄位的**資料型態（type）**。Drupal 的 Schema API 提供有 自動編序[Serial](https://www.drupal.org/docs/7/api/schema-api/data-types/serial)、整數[Integer](https://www.drupal.org/docs/7/api/schema-api/data-types/integer)、浮點數[Float](https://www.drupal.org/docs/7/api/schema-api/data-types/float)、小數[Decimal (Numeric)](https://www.drupal.org/docs/7/api/schema-api/data-types/decimal-numeric)、文字[Text](https://www.drupal.org/docs/7/api/schema-api/data-types/text)、變動長度長文字[Varchar](https://www.drupal.org/docs/7/api/schema-api/data-types/varchar)、固定長度長文字[Char](https://www.drupal.org/docs/7/api/schema-api/data-types/char)及二進位大型物件[Blob](https://www.drupal.org/docs/7/api/schema-api/data-types/blob)等資料類型。你可以根據自己的需求來規劃各欄位要儲存什麼類型的資料，例如如果你需要流水序號，可以用 Serial；如果需要儲存 nid 或 uid 來當 foreign key，那可以用 Integer。比例特別的是，如果你需要儲存建立時間、變更時間等資料，通常也會用 Integer 來儲存 UNIXSTAMP 的時間值。

不同的資料型態，則會額外的參數可以設定。例如 `int`、`float`、`decimal` 這三種類型，可以加上 `unsigned` 參數來設定此欄位是否可以存「負值」，例如 `unsigned =&gt; TRUE` 就是**不允許**儲存負值（不允許使用正負號）。另外還有諸如 `not null` 與 `default` 等也是常用的設定參數，在 [Schema Reference](https://www.drupal.org/docs/7/api/schema-api/schema-reference) 一文有詳細的說明，建議可以仔細讀一讀。

最後，設定完資料欄位外，如果你熟悉資料庫的運作，應該會想到 `primary key` 或 `foreign key` 等設定，沒錯，這同樣是在 schema 裡一併設置的。同樣拿 node 模組的 node table 來說明：

```php
$schema['node'] = array(
  'description' => 'The base table for nodes.',
  'fields' => array(
    'nid' => array(
      'type' => 'serial',
      'unsigned' => TRUE,
      'not null' => TRUE,
    ),
   ...
  // For documentation purposes only; foreign keys are not created in the
  // database.
  'foreign keys' => array(
    'node_revision' => array(
      'table' => 'node_revision',
      'columns' => array(
        'vid' => 'vid',
      ),
    ),
    'node_author' => array(
      'table' => 'users',
      'columns' => array(
        'uid' => 'uid',
      ),
    ),
  ),
  'primary key' => array(
    'nid',
  ),
);
```

當然，一旦開始要設計資料表結構時，一定還是手足無措，一堆問題找不到，所以建議可以參考 [Schema API](https://api.drupal.org/api/drupal/includes%21database%21schema.inc/group/schemaapi/7.x)，裡面是提供 node 的 schema 設計，很詳細，該用到的參數都用到了，可以當參考範例。

### 如果沒有在啟用模組前就定義好 schema

此時，你除了用 `hook_schema()` 外，還需要用 `hook_update_N()`，透過 Drupal 的更新機制，來更新資料結構（包含資料表的建立、刪除，以及資料欄位的建立、調整、刪除等）。

```php
function mymodule_update_6100() {
  $schema = drupal_get_schema('custom_table1');
  db_add_field('custom_table1', 'newcol', $schema['newcol']);
}
```

## 與 Views 整合

要讓 Views 可以讀得到前面自定的資料表，簡單一點你可以用 [Views Custom Table](https://www.drupal.org/project/view_custom_table) 模組，參考頁面的圖示說明操作，你就可以快速的達到跟 Views 整合的效果。

如果你想嘗試 hardcore，那麼 [Exposing Tables to Views in Drupal 7](https://www.sitepoint.com/exposing-tables-views-drupal-7/) 這篇文章給我們一個指引。

要讓客製模組跟 Views 整合，首先要在模組的 `.module` 檔案，定義 Views API 版本。

```php
/**
 * Implements hook_views_api().
 */
function mymodule_views_api()
{
    return array(
        'api' => 3,
        'path' => drupal_get_path('module', 'expose') . '/includes/views',
    );
}
```

然後，再建立 `mymodule.views.inc` 檔案並放到 `mymodule/includes/views` 資料夾下（如果你想放到 `mymodule/includees` 下，記得上面那段程式中的 `path` 也要跟著改）。

接著我們需要透過 `hook_views_data()` 來加入 Views 的支援，詳細範例可以直接參考 [How to join user table with another table in views data](https://orao-web.net/en/ressource-center/how-join-user-table-another-table-views-data) 一文，還滿清楚的。比較特別的是，如果我們今天設計的資料表有 `uid` 欄位，而且透過此欄位來參照到 users 資料表，進而取得使用者的名稱、Email 等資訊的話，那麼關鍵在下面範例的 `relationship` 那邊，透過此處的設置，等於是讓我們在 Views 「關聯」區域可以有一個可以加入使用的欄位，名稱叫做「Author」（如果常用 Drupal Views 的，應該不陌生，例如我們先用「Content」資料表時，想進一步抓到文章的作者個資，就會在關聯加入「Author」欄位）。

```php
function node_views_data() {
  ..
  // uid field
  $data['node']['uid'] = array(
    'title' => t('Author uid'),
    'help' => t('The user authoring the content. If you need more fields than the uid add the content: author relationship'),
    'relationship' => array(
      'title' => t('Author'),
      'help' => t('Relate content to the user who created it.'),
      'handler' => 'views_handler_relationship',
      'base' => 'users',
      'field' => 'uid',
      'label' => t('author'),
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_user_name',
    ),
    'argument' => array(
      'handler' => 'views_handler_argument_numeric',
    ),
    'field' => array(
      'handler' => 'views_handler_field_user',
    ),
  );
  ..
}
```

其實 `views_data()` 設計的很完整，但一開始接觸應該還是多少搞不太懂邏輯，除了上述 node 模組的範例外，建議還可以看看 [user_views_data()](https://api.drupal.org/api/views/modules%21user.views.inc/function/user_views_data/7.x-3.x) 的程式範例，兩相比較應該比較好懂。尤其 Content 和 User 本來就是使用 Views 最常用到的資料表，結合平時的操作經驗，發揮聯想，會比較容易對程式碼有感覺。

### 有沒有更簡單的方法？

使用 Drupal 近十年的時間，幾乎什麼需求、疑難雜症在 Drupal 社群上都會找到解方，僅管不一定完全合適，但總是一個方向。例如我在找資料過程中，找到 [Data](https://www.drupal.org/project/data) 模組，看來是一個可以透過後台 UI 建立資料表、調整資料結構的利器。有興趣的就自行試試囉！

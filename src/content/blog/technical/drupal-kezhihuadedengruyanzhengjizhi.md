---
title: "[Drupal] 客製化的登入驗證機制"
description: "如果要讓使用者可以填入 Email 或帳號來登入，是有第三方模組可以直接提供，但如果是想讓使用者填入其他欄位（如「真實姓名」）或引用其他的驗證機制（如「SOAP SSO」），可以用以下方式來達成。 ### Drupal 7 Drupal 7 比較簡單好理解，直接用 hook 機制即可。例如以下的程式碼片段。 php / Implements hookform"
publishedAt: "2021-06-07T05:32:37.000Z"
updatedAt: "2021-06-07T06:01:59.000Z"
legacyPath: "/technical/drupal-kezhihuadedengruyanzhengjizhi"
kind: "technical"
tags: ["Drupal 7", "Drupal 8", "Drupal 9", "Module development"]
legacyNid: 170
archived: true
---

如果要讓使用者可以填入 Email 或帳號來登入，是有第三方模組可以直接提供，但如果是想讓使用者填入其他欄位（如「真實姓名」）或引用其他的驗證機制（如「SOAP SSO」），可以用以下方式來達成。

### Drupal 7

Drupal 7 比較簡單好理解，直接用 hook 機制即可。例如以下的程式碼片段。

```php
/**
  * Implements hook_form_alter().
  */
 function example_auth_form_alter(&$form, &$form_state, $form_id) {
   if ($form_id == 'user_login' || $form_id == 'user_login_block') {
     array_unshift($form['#validate'], 'example_auth_user_login_form_validate');
   }
 }

 /**
  * Custom validate
  */
 function example_auth_user_login_form_validate(&$form, &$form_state) {
   // Fetch username and password from $form_state
   $username = $form_state['input']['name'];
   $password = $form_state['input']['pass'];

    // Custom validate logic here.
 }
```

### Drupal 8/9

Drupal 8/9 的話有兩種方式可以達成，一種是延續 hook 機制，另一種方式則是利用 OOP (Object-Oriented Programming）的特性改寫 [UserLoginForm](https://api.drupal.org/api/drupal/core%21modules%21user%21src%21Form%21UserLoginForm.php/class/UserLoginForm/9.1.x)。

要用哪種方式，端看你的需求，但不論是要改寫既有的驗證機制，還是新增額外的驗證機制，都可以參考以下的程式片段[fn][Integrating External Authentication](https://www.drupal.org/docs/contributed-modules/external-authentication/integrating-external-authentication)[/fn]改寫。

```php
use Drupal\Core\Form\FormStateInterface;

function example_auth_form_user_login_form_alter(&$form, FormStateInterface $form_state) {
  // Add external user login validation in user_login_form
  // after ::validateAuthentication
  // and before ::validateFinal.
  if (@in_array('::validateFinal', $form['#validate'])) {
    $key = array_search('::validateFinal', $form['#validate']);
    $form['#validate'][$key] = 'example_auth_authenticate';
    $form['#validate'][] = '::validateFinal';
  }
}

function example_auth_authenticate(array &$form, FormStateInterface $form_state) {
  // Custom validate logic here.
}
```

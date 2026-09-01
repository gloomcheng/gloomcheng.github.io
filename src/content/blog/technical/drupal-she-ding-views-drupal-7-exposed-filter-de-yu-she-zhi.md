---
title: "[Drupal] 設定 Views (for Drupal 7) exposed filter 的預設值"
description: "本案例情境是，某個學校系所網站，需要根據不同學年度提供對應的「修業規範」等資料，而前台呈現的頁面當然就是以 Views 製作，並提供「學年度」切換的 exposed filter；但是，之前一直不知道究竟要怎麼設定 exposed filter 的預設值是抓最新的「學年度」（以分類製作）。 之前搜尋的資料所提供的方向，大多是 hookformalter() "
publishedAt: "2022-12-29T10:31:27.000Z"
updatedAt: "2022-12-29T10:39:31.000Z"
legacyPath: "/technical/drupal-she-ding-views-drupal-7-exposed-filter-de-yu-she-zhi"
kind: "technical"
tags: ["Drupal 7", "Module development", "Views"]
legacyNid: 190
archived: true
---

本案例情境是，某個學校系所網站，需要根據不同學年度提供對應的「修業規範」等資料，而前台呈現的頁面當然就是以 Views 製作，並提供「學年度」切換的 exposed filter；但是，之前一直不知道究竟要怎麼設定 exposed filter 的預設值是抓最新的「學年度」（以分類製作）。

之前搜尋的資料所提供的方向，大多是 `hook_form_alter()` 或 `hook_views_pre_view()`，但嘗試過都失敗了，於是只好每年都到 Views 去修改 exposed filter 的「預設值」。

今天再次花時間搜尋，總算找到正確的方向，應該是要用 `hook_views_pre_build()` 來設定預設值才對[^1]，其程式碼範例如下：

```php
/**
 * Implements hook_views_pre_build().
 */
function YOUR_MODULE_views_pre_build(&$view) {
  if ($view->name == 'machinery') {
    $view->filter['field_producer_tid']->value = "All";
  }
}
```

[^1]: [Set form exposed filter default value](https://stackoverflow.com/questions/21551855/set-form-exposed-filter-default-value)

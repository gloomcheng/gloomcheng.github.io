---
title: "[Drupal] 為 taxonomy overview 增加欄位"
description: "在 Drupal 8/9，一般如果想要幫某個系統頁面加上額外的欄位、資訊，第一直覺都會想到用 Views，不過卻不適用於分類總覽（taxonomy overview）頁。要改總覽頁得用 hookformFORMIDalter() 來處理。 下面的程式範例是以加上分類項目發佈狀態的為例，但會套用到所有分類頁上，如果只想套用到特定的 vocabulary，那可以"
publishedAt: "2021-02-22T09:24:51.000Z"
updatedAt: "2021-06-07T06:15:06.000Z"
legacyPath: "/technical/drupal-wei-taxonomy-overview-zengjialanwei"
kind: "technical"
tags: ["Drupal 8", "Module development"]
legacyNid: 167
archived: true
---

在 Drupal 8/9，一般如果想要幫某個系統頁面加上額外的欄位、資訊，第一直覺都會想到用 Views，不過卻不適用於分類總覽（taxonomy overview）頁。要改總覽頁得用 `hook_form_FORM_ID_alter()` 來處理。

下面的程式範例是以加上分類項目發佈狀態的為例，但會套用到所有分類頁上，如果只想套用到特定的 vocabulary，那可以用 url 的 args 來進一步限制。

```php
/**
 * Implements hook_form_ID_alter().
 */
function MODULE_NAME_form_taxonomy_overview_terms_alter(&$form, FormStateInterface $formState) {
  $form['terms']['#header'] = array_merge(array_slice($form['terms']['#header'], 0, 1, TRUE),
    [t('Status')],
    array_slice($form['terms']['#header'], 1, NULL, TRUE));

  foreach ($form['terms'] as &$term) {
    if (is_array($term) && !empty($term['#term'])) {
      $status['status'] = [
        '#markup' => ($term['#term']->status->value) ? t('Published') : t('Unpublished'),
        '#type' => 'item',
      ];

      $term = array_slice($term, 0, 1, TRUE) +
        $status +
        array_slice($term, 1, NULL, TRUE);
    }
  }
}
```

Ref:
1. [How to alter taxonomy term overview page – Drupal 8](http://btobac.com/blog/how-alter-taxonomy-term-overview-page-drupal-8)
2. [How to add a column to taxonomy overview page?](https://gorannikolovski.com/blog/how-add-column-taxonomy-overview-page)

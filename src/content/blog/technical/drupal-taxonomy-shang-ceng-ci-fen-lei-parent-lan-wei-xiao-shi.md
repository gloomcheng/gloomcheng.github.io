---
title: "[Drupal] Taxonomy 上層次分類 (parent) 欄位消失"
description: "如題，主要就是在分類編輯頁，沒有出現「上層次分類」(parent) 欄位，而當次分類詞太多的時候，又無法用拖拉的方式調整分類詞的階層關係（例如出現在第二頁的分類詞，就無法拉到第一頁的父分類詞下）。這個問題滿奇特，一開始用關鍵字（例如 taxonomy parent disappear）搜尋都找不到真正的答案。 後來直接看程式碼 php // \\Drupal\\"
publishedAt: "2021-09-15T06:46:41.000Z"
updatedAt: "2021-09-26T04:03:34.000Z"
legacyPath: "/technical/drupal-taxonomy-shang-ceng-ci-fen-lei-parent-lan-wei-xiao-shi"
kind: "technical"
tags: ["Drupal 8"]
legacyNid: 178
archived: true
---

如題，主要就是在分類編輯頁，沒有出現「上層次分類」(parent) 欄位，而當次分類詞太多的時候，又無法用拖拉的方式調整分類詞的階層關係（例如出現在第二頁的分類詞，就無法拉到第一頁的父分類詞下）。這個問題滿奇特，一開始用關鍵字（例如 taxonomy parent disappear）搜尋都找不到真正的答案。

後來直接看程式碼
```php
    // \Drupal\taxonomy\TermStorageInterface::loadTree() and
    // \Drupal\taxonomy\TermStorageInterface::loadParents() may contain large
    // numbers of items so we check for taxonomy.settings:override_selector
    // before loading the full vocabulary. Contrib modules can then intercept
    // before hook_form_alter to provide scalable alternatives.
    if (!$this
      ->config('taxonomy.settings')
      ->get('override_selector')) {
      $exclude = [];
      if (!$term
        ->isNew()) {
        $parent = array_keys($taxonomy_storage
          ->loadParents($term
          ->id()));
        $children = $taxonomy_storage
          ->loadTree($vocabulary
          ->id(), $term
          ->id());

        // A term can't be the child of itself, nor of its children.
        foreach ($children as $child) {
          $exclude[] = $child->tid;
        }
        $exclude[] = $term
          ->id();
      }
      $tree = $taxonomy_storage
        ->loadTree($vocabulary
        ->id());
      $options = [
        '<' . $this
          ->t('root') . '>',
      ];
      if (empty($parent)) {
        $parent = [
          0,
        ];
      }
      foreach ($tree as $item) {
        if (!in_array($item->tid, $exclude)) {
          $options[$item->tid] = str_repeat('-', $item->depth) . $item->name;
        }
      }
      $form['relations']['parent'] = [
        '#type' => 'select',
        '#title' => $this
          ->t('Parent terms'),
        '#options' => $options,
        '#default_value' => $parent,
        '#multiple' => TRUE,
      ];
    }
```
[class TermForm](https://api.drupal.org/api/drupal/core%21modules%21taxonomy%21src%21TermForm.php/class/TermForm/8.9.x)

從程式碼中可以看出，它必須要先判斷 `override_selector` 的值，符合條件才會出現「上層次分類」的欄位，然而為什麼要這麼做，看註解好像是為了避免載入過長的分類詞(?!)，我是搞不懂為什麼會這樣設計。

但既然有關鍵字了，要找答案就簡單很多了，在 [Terms created when override_selector = TRUE don't appear on Terms List/Overview page](https://www.drupal.org/project/drupal/issues/2985762) 討論串有提到，比較快的解決就是在 `settings.php` 加上 `$config['taxonomy.settings']['override_selector'] = false;`，然後就可以看到「上層次分類」又出現了。

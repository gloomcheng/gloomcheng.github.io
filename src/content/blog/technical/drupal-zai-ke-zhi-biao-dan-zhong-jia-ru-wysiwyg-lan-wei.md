---
title: "[Drupal] 在客製表單中加入 wysiwyg 欄位"
description: "Drupal 8/9 要使用 TextFormat[^1] 類型的欄位 $form['body'] = array( '#type' => 'textformat', '#title' => 'Body', '#format' => 'fullhtml', '#defaultvalue' => 'The quick brown fox jumped over"
publishedAt: "2022-07-11T01:10:43.000Z"
updatedAt: "2022-07-11T01:13:43.000Z"
legacyPath: "/technical/drupal-zai-ke-zhi-biao-dan-zhong-jia-ru-wysiwyg-lan-wei"
kind: "technical"
tags: ["Drupal 8+", "Form API", "Module development"]
legacyNid: 184
archived: true
---

Drupal 8/9 要使用 `TextFormat`[^1] 類型的欄位

```
$form['body'] = array(
  '#type' => 'text_format',
  '#title' => 'Body',
  '#format' => 'full_html',
  '#default_value' => '<p>The quick brown fox jumped over the lazy dog.</p>',
);
```

[^1]: https://api.drupal.org/api/drupal/core%21modules%21filter%21src%21Element%21TextFormat.php/class/TextFormat/8.4.x

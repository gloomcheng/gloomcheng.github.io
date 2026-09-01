---
title: "[Drupal] 檢索本月建立的內容節點"
description: "php // 取得本月第一天的 timestamp $firstminuteofmonth = mktime(0, 0, 0, date('m'), 1, date('Y')); // 取得本月最後一天的 timestamp $lastminuteofmonth = mktime(23, 59, 59, date('m'), date('t'), date("
publishedAt: "2021-05-13T02:02:37.000Z"
updatedAt: "2021-06-07T06:13:34.000Z"
legacyPath: "/technical/drupal-jiansuobenyuejianlideneirongjiedian"
kind: "technical"
tags: ["Drupal 8", "Module development"]
legacyNid: 169
archived: true
---

```php
// 取得本月第一天的 timestamp
$first_minute_of_month = mktime(0, 0, 0, date('m'), 1, date('Y'));
// 取得本月最後一天的 timestamp
$last_minute_of_month = mktime(23, 59, 59, date('m'), date('t'), date('Y'));

$query = \Drupal::entityQuery('node')
  ->condition('status', Drupal\node\NodeInterface::PUBLISHED)
  ->condition('type', $bundle_type)
  ->condition('created', [$first_minute_of_month, $last_minute_of_month], 'BETWEEN')
  ->range(0, 10);

return $query->execute();
```

---
title: "[Drupal] DrupalDateTime 的用法"
description: "過往在 Drupal 7 以前，「日期」欄位存的是 UNIX timestamp 的格式，所以取出欄位值後，通常會需要用 date[^1] 函式來轉換日期的呈現格式。 DrupalDateTime[^2] 是擴充 PHP DateTime[^3] 的類別，自 Drupal 8 開始，核心提供的「日期」欄位預設都是 DrupalDateTime 類別實作的，這"
publishedAt: "2022-07-11T01:14:00.000Z"
updatedAt: "2022-10-14T06:36:26.000Z"
legacyPath: "/technical/drupal-drupaldatetime-de-yong-fa"
kind: "technical"
tags: ["Drupal 8+", "DrupalDateTime"]
legacyNid: 185
archived: true
---

過往在 Drupal 7 以前，「日期」欄位存的是 UNIX timestamp 的格式，所以取出欄位值後，通常會需要用 `date`[^1] 函式來轉換日期的呈現格式。

`DrupalDateTime`[^2] 是擴充 PHP `DateTime`[^3] 的類別，自 Drupal 8 開始，核心提供的「日期」欄位預設都是 DrupalDateTime 類別實作的，這意味著，在取用 `Entity` 時可以直接使用 DrupalDateTime 提供的方法（method）來轉變日期的格式，而不需要再透過 `date` 來處理。

例如：

```
// get unix timestamp
$timestamp = $node->field_date->date->getTimestamp();
// get a formatted date
$date_formatted = $node->field_date->date->format('Y-m-d H:i:s');
```

在 [How to get formatted date string from a DateTimeItem object](https://drupal.stackexchange.com/questions/252333/how-to-get-formatted-date-string-from-a-datetimeitem-object) 有更多討論，以及 `DrupalDateTime` 的用法說明。

至於是否能用 `$node-&gt;get('field_date')` 的方法來取得 `DrupalDateTime` 的 date 資訊？這就需要再找時間測試了。

[^1]: [PHP: date](https://www.php.net/manual/en/function.date.php)
[^2]: [DrupalDateTime](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Datetime%21DrupalDateTime.php/class/DrupalDateTime/8.8.x)
[^3]: [PHP: DateTime](https://www.php.net/manual/en/class.datetime.php)

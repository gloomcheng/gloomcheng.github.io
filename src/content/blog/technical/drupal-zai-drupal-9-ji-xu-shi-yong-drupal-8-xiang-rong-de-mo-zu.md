---
title: "[Drupal] 在 Drupal 9 繼續使用 Drupal 8 相容的模組"
description: "Drupal 8 要升級至 Drupal 9，最麻煩的環節應該是部分模組沒有支援 Drupal 9，且許多 Drupal 8 的模組開發者也沒有要繼續維護的打算，導致在使用 composer 升級時，會因為這些模組的相依性限制，而無法順利升級到 Drupal 9。 遇到這種問題，比較好的解決方案，建議在 composer 加入 Lenient 儲存庫[^1]"
publishedAt: "2022-10-26T14:19:09.000Z"
updatedAt: "2022-10-26T14:30:07.000Z"
legacyPath: "/technical/drupal-zai-drupal-9-ji-xu-shi-yong-drupal-8-xiang-rong-de-mo-zu"
kind: "technical"
tags: ["Composer", "Drupal 8", "Drupal 9+"]
legacyNid: 189
archived: true
---

Drupal 8 要升級至 Drupal 9，最麻煩的環節應該是部分模組沒有支援 Drupal 9，且許多 Drupal 8 的模組開發者也沒有要繼續維護的打算，導致在使用 composer 升級時，會因為這些模組的相依性限制，而無法順利升級到 Drupal 9。

遇到這種問題，比較好的解決方案，建議在 composer 加入 Lenient 儲存庫[^1]：

```
$ composer config repositories.lenient composer https://packages.drupal.org/lenient 
```

加入後的 composer.json 會類似下面的結果

```
    "repositories": {
        "lenient": {
            "type": "composer",
            "url": "https://packages.drupal.org/lenient"
        },
        "0": {
            "type": "composer",
            "url": "https://packages.drupal.org/8"
        }
    },
```

當然，除了採用 Lenient 儲存庫外，也可以自行修改那些未升級模組的 `info.yml` 檔案，自行加入相容 Drupal 9 的設定。但不論哪種方法，要注意未升級模組的程式碼是否完全相容 Drupal 9/10。

[^1]: [Using Drupal's Lenient Composer Endpoint](https://www.drupal.org/docs/develop/using-composer/using-drupals-lenient-composer-endpoint)

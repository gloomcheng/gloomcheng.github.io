---
title: "[Drupal] 手動刪除設定項目 (configuration item)"
description: "Drupal 8/9 改用 Configuration API 儲存模組的設定值及相關資料，此舉讓網站的設定資料搬遷變得更容易，但如果你遇到 Drupal 8 早期開發的模組（如 Commerce Inventory），因為模組的反安裝機制沒有寫好，以致於模組沒有成功反安裝而留下部分設定資料未能順利刪除時，這時就可以手動來裝這些資料刪掉。例如本文範例遇到的錯"
publishedAt: "2021-10-21T15:47:31.000Z"
updatedAt: "2021-10-21T15:57:36.000Z"
legacyPath: "/technical/drupal-shou-dong-shan-chu-she-ding-xiang-mu-configuration-item"
kind: "technical"
tags: ["Configuration API", "Drupal 8", "Drupal 9"]
legacyNid: 180
archived: true
---

Drupal 8/9 改用 [Configuration API](https://www.drupal.org/docs/drupal-apis/configuration-api/configuration-api-overview) 儲存模組的設定值及相關資料，此舉讓網站的設定資料搬遷變得更容易，但如果你遇到 Drupal 8 早期開發的模組（如 [Commerce Inventory](https://www.drupal.org/project/commerce_inventory)），因為模組的反安裝機制沒有寫好，以致於模組沒有成功反安裝而留下部分設定資料未能順利刪除時，這時就可以手動來裝這些資料刪掉。例如本文範例遇到的錯誤訊息如下：

```
Drupal\Component\Plugin\Exception\PluginNotFoundException: The "purchasable_entity_create_inventory_item_action" plugin does not exist.
```

要將這些設定資料刪掉，首先必須啟用核心的 [Configuration Management](https://www.drupal.org/docs/8/core/modules/config) 模組，然後在 **Export** 頁面找到上述缺失的設定資料的名稱。以上述為例，在「Action」（行動）下可以找到上述的設定資料，然後找到該設定資料的名稱為「system.action.commerce_product_variation_create_inventory_item_action」，之後再利用 `drush` 指令刪除即可：

```
drush config-delete "system.action.commerce_product_variation_create_inventory_item_action"
```

如果需要步驟式的指引說明，請參考 [4 ways to delete configuration items in Drupal 8 and 9](https://gorannikolovski.com/blog/4-ways-delete-configuration-items-drupal-8-and-9)

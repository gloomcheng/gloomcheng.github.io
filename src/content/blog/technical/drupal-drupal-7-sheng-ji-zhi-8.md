---
title: "[Drupal] Drupal 7 升級至 8"
description: "隨著 Drupal 9.0.0-alpha1 版釋出，想說也該把這個網站升級至 Drupal 8 了，於是就又浪費了好幾個小時 ## 話說在前 不論是 Drupal 6 或 Drupal 7 都無法直接升級至 Drupal 8，所以升級流程約略是 1. Drupal 6 必須先升級至 Drupal 7 2. 先安裝一個空的 Drupal 8 網站（建議可以用"
publishedAt: "2020-02-14T16:35:55.000Z"
updatedAt: "2020-02-15T14:19:36.000Z"
legacyPath: "/technical/drupal-drupal-7-sheng-ji-zhi-8"
kind: "technical"
tags: ["Drupal 8"]
legacyNid: 157
archived: true
---

隨著 Drupal [9.0.0-alpha1](https://www.drupal.org/project/drupal/releases/9.0.0-alpha1 "9.0.0-alpha1") 版釋出，想說也該把這個網站升級至 Drupal 8 了，於是就又浪費了好幾個小時

## 話說在前
不論是 Drupal 6 或 Drupal 7 都無法直接升級至 Drupal 8，所以升級流程約略是
1. Drupal 6 必須先升級至 Drupal 7
2. 先安裝一個空的 Drupal 8 網站（建議可以用 [drupal/recommended-project](https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-and-manage-dependencies "drupal/recommended-project") 安裝）
3. 先評估有哪些原先裝在 Drupal 7 的模組，還需要安裝在 Drupal 8 的，先用 composer require 的指令安裝並啟用
4. 以上工作都確認完，就可以開始升級了

## 升級流程
### 建立 Drupal 8 網站
首先，用 composer 建立一個 drupal 8 的網站

`composer create-project drupal/recommended-project d8.site.folder`

後續因為需要用 drush 來進行升級，須先安裝 drush

`composer require drush/drush`

接著，請先建立一個空的資料庫，然後就可以下指令

`drush site:install`

透過對話式的指示建立空的網站

### 安裝必須的模組
例如，在原本的網站有安裝 pathauto，則必須用 composer 指令安裝模組

`composer require drupal/pathauto`

**這個過程相當耗費時間和心力，請逐一檢查清楚再進入下一步驟，因為要先有安裝對應的模組，才能讓 Drupal 在後續的流程中正確產生 migration 檔案，這些產生的 migration 檔案就是將 Drupal 7 需要匯入的資料產生成 yaml 檔案，且作為真正匯入資料的來源根據。**

### 準備匯入資料
#### [方法一] 使用 Drush
使用 Drush 升級前，必須先安裝以下三個模組
- [Migration Upgrade](https://www.drupal.org/project/migrate_upgrade)
- [Migration Plus](https://www.drupal.org/project/migrate_plus)
- [Migration Toos](https://www.drupal.org/project/migrate_tools)

安裝並啟用上述模組後，接下來可以下指令

`drush migrate-upgrade --legacy-db-url=mysql://user:password@server/db --legacy-root=http://example.com --configure-only`

上述指令是要在 Drupal 8 的網站執行，該指令係指要從 Drupal 7 取得資料，所以 user/password/server/db 都請填 Drupal 7 的資料庫資料。其中，`--configure-only` 則是只建立 migration 設定檔，而暫時不會匯入資料，這很重要，如果你沒下這個參數，則在執行上述指令後就會完成匯入了；建議不要直接匯入，這樣你可以瞭解 Drush 在這個步驟究竟做了什麼事。

在上述指令後，如果想知道有哪些待執行的 migration，則可以下 `drush migrate-status` 來查看狀態，檢查一切無誤後，則可以下 `drush migrate-import --all` 來執行真正的 migration。如果想更加瞭解上述指令，可以參考 [Upgrade using Drush](https://www.drupal.org/docs/8/upgrade/upgrade-using-drush)。

如果你之前有開發過類似 Ruby on Rails / Django (python) / Laravel (PHP) 等框架開發過網站的話，應該很好理解前述動作在做什麼，基本上就是檢查 db schema，看看缺了哪些資料欄位，以及有哪些資料需要匯入的。

另，如果遇到匯入失敗或出問題，可以先下 `drush site:install` 清空 Drupal 8 的資料庫，再重新來過。雖然用 drush 來更新、匯入資料很方便，不過我匯入後一直無法順利讀取到 node body 的值，原本以為是 drush 匯入有問題，所以我後來又改用下列直接使用網站的方式來進行匯入。不過，實際上 node body 讀不到的原因，是因為「語系」的問題，最後是靠直接修改 db 的語系設定值來修正的。

還有，如果升級過程中，遇到了 `upgrade_d7_menu_links Migration - 1 failed.` 錯誤訊息的話，好像只需要再跑一次 `drush migrate-import --all` 就好，只是主選單應該有些連結壞掉了，這應該還好，等全部匯完後再到 Drupal 8 新站自行修改就好。

#### [方法二] 使用網站
這個方法的操作也是滿簡單的，只是跟 drush 方法不同，需要啟用的模組（這幾個都是核心模組，不需另外安裝）如下
- Migrate
- Migrate Drupal
- Migrate Drupal UI

啟用後，只要直接瀏覽 `/upgrade` 網頁，根據其指令操作就好，有興趣的直接參考 [Upgrade using web browser](https://www.drupal.org/docs/8/upgrade/upgrade-using-web-browser)。

### 結語
如果你的網站本來就是偏 blog，也就是使用的模組較少，那麼從 Drupal 7 升級到 Drupal 8 雖然會有不少關卡，但應該還算滿好解決的；但如果你的網站安裝了很多特殊的模組，那就建議不要升級了，反正 Drupal 7 的後續支援服務會再延長，就繼續用 Drupal 7 吧！

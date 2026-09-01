---
title: "[Drupal] 欄位即將刪除"
description: "如果要移除模組時，遇到「欄位即將刪除（fields pending deletion）」，且清除快取或執行 cron 之後還是無法處理時，這時可以試試以下的 drush 指令 drush php-eval 'fieldpurgebatch(10000);' Ref: “Fields pending deletion” stopping module unis"
publishedAt: "2021-07-20T07:34:03.000Z"
updatedAt: "2021-07-20T07:37:49.000Z"
legacyPath: "/technical/drupal-lanweijijiangshanchu"
kind: "technical"
tags: ["Drupal 8", "Drupal 9"]
legacyNid: 173
archived: true
---

如果要移除模組時，遇到「欄位即將刪除（fields pending deletion）」，且清除快取或執行 cron 之後還是無法處理時，這時可以試試以下的 drush 指令

```
drush php-eval 'field_purge_batch(10000);'
```

Ref: [“Fields pending deletion” stopping module unistall - how to delete manually?](https://drupal.stackexchange.com/questions/244275/fields-pending-deletion-stopping-module-unistall-how-to-delete-manually)

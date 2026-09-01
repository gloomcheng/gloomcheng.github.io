---
title: "[Drupal] Drupal 7 內容管理頁篩選功能失敗 (Administration Views )"
description: "今天突然遇到客戶回報說「特定角色」無法在內容管理頁使用篩選內容類型的功能，稍微看了下，發現應該是 ajax 的問題 查了下模組相關的 issue，原來是新的 Administration Views 加了新的權限設定「Use ajax pages on Administration Views System Display」，提供「特定角色」具有這項權限就解"
publishedAt: "2023-04-19T09:58:47.000Z"
updatedAt: "2023-04-19T10:03:20.000Z"
legacyPath: "/technical/drupal-drupal-7-nei-rong-guan-li-ye-shai-xuan-gong-neng-shi-bai-administration-views"
kind: "technical"
tags: ["Drupal 7", "Views"]
legacyNid: 193
archived: true
---

今天突然遇到客戶回報說「特定角色」無法在內容管理頁使用篩選內容類型的功能，稍微看了下，發現應該是 ajax 的問題
查了下模組相關的 issue，原來是新的 Administration Views 加了新的權限設定「[Use ajax pages on Administration Views System Display](https://www.drupal.org/project/admin_views/issues/3236328)」，提供「特定角色」具有這項權限就解決了

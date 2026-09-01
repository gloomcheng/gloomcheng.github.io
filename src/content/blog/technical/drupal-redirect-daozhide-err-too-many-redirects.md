---
title: "[Drupal] Redirect 導致的 ERR_TOO_MANY_REDIRECTS"
description: "先前遇到一個案例，如果登入後到首頁，就會出現 ERRTOOMANYREDIRECTS 錯誤訊息，但未登入時就沒事。因為只有登入才會有問題，於是就擱置暫不處理。 但後來更新 Drupal core 之後，連未登入也都會出現 ERRTOOMANYREDIRECTS 了，於是直接用關鍵字搜尋，就找到 ERRTOOMANYREDIRECTS，並指引到 Infinit"
publishedAt: "2021-01-20T17:26:28.000Z"
updatedAt: "2021-01-21T05:53:24.000Z"
legacyPath: "/technical/drupal-redirect-daozhide-err-too-many-redirects"
kind: "technical"
tags: ["Drupal 8"]
legacyNid: 166
archived: true
---

先前遇到一個案例，如果登入後到首頁，就會出現 ERR_TOO_MANY_REDIRECTS 錯誤訊息，但未登入時就沒事。因為只有登入才會有問題，於是就擱置暫不處理。

但後來更新 Drupal core 之後，連未登入也都會出現 ERR_TOO_MANY_REDIRECTS 了，於是直接用關鍵字搜尋，就找到 [ERR_TOO_MANY_REDIRECTS](https://www.drupal.org/project/redirect/issues/3126608)，並指引到 [Infinite redirect loop when route_normalizer_enabled is true](https://www.drupal.org/project/redirect/issues/3096948) 說明確切的發生原因。

主要原因應該是使用 [Redirect](https://www.drupal.org/project/redirect) 設置重導向頁面，然後其中有部分設置到連回首頁（/）的重導向設置錯誤了，於是造成無限重導向的結果。

此問題可以透過關閉「Enforce clean and canonical URLs」選項來解決，或是可以用 drush 指令，如下
```bash
drush cset redirect.settings route_normalizer_enabled 0
```

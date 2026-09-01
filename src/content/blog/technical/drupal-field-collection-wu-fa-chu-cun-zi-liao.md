---
title: "[Drupal] Field Collection 無法儲存資料"
description: "這個案例很特別。這個網站用 field collection 有好一段時間了，突然客戶回報無法儲存資料，嘗試好幾次確實都是在 field collection 填入資料但無法順利寫入資料庫。 查了下發現兩年前就有這個問題，然而近四個月還有傳出類似災情，詳情可以閱讀這則討論。解法方法也不難，打入該則討論裡提到的 patch 即可。"
publishedAt: "2018-06-29T03:27:21.000Z"
updatedAt: "2018-06-29T03:27:21.000Z"
legacyPath: "/technical/drupal-field-collection-wu-fa-chu-cun-zi-liao"
kind: "technical"
tags: ["Drupal 7"]
legacyNid: 144
archived: true
---

<p>這個案例很特別。這個網站用 field collection 有好一段時間了，突然客戶回報無法儲存資料，嘗試好幾次確實都是在 field collection 填入資料但無法順利寫入資料庫。</p>

<p>查了下發現兩年前就有這個問題，然而近四個月還有傳出類似災情，詳情可以閱讀<a href="https://www.drupal.org/project/field_collection/issues/2107477">這則討論</a>。解法方法也不難，打入該則討論裡提到的 patch 即可。</p>

---
title: "[Drupal] 使用 Feeds 與 Feeds Tamper 模組匯入分類詞"
description: "建置網站過程中，有個很重要也很難搞的流程，就是匯入資料。這些資料有可能是從舊的資料庫匯出，也有可能是從 Excel 而來，通常我們都會將這些資料轉存成 .csv 格式的檔案，然後利用 Feeds 模組來匯入。 匯入過程其實不會太難，到 Feeds UI 進行相關的欄位設定即可，比較麻煩的是不同資料類型的欄位的匯入，例如 Image / File / URL "
publishedAt: "2017-03-28T15:56:14.000Z"
updatedAt: "2017-03-28T15:58:55.000Z"
legacyPath: "/technical/drupal-shi-yong-feeds-yu-feeds-tamper-mo-zu-hui-ru-fen-lei-ci"
kind: "technical"
tags: []
legacyNid: 117
archived: true
---

<p>建置網站過程中，有個很重要也很難搞的流程，就是匯入資料。這些資料有可能是從舊的資料庫匯出，也有可能是從 Excel 而來，通常我們都會將這些資料轉存成 .csv 格式的檔案，然後利用 <a href="https://www.drupal.org/project/feeds">Feeds</a> 模組來匯入。</p>

<p>匯入過程其實不會太難，到 Feeds UI 進行相關的欄位設定即可，比較麻煩的是不同資料類型的欄位的匯入，例如 Image / File / URL 等，有些資料類型有對應的 Feeds 相關模組可以處理（例如 URL），有些我也還不知道怎麼處理（例如 Image / File）。排除這些資料類型不論，匯入過程中最常見的應該是要匯入分類詞，這在 Feeds 中是可以匯入的，只是無法在 .csv 資料檔案中，用同一個欄位來匯入多個分類詞。</p>

<p>記得早前就曾研究過這個問題，但當時沒究就怎麼解決，這次再細查一次解決方案，一樣找到 <a href="https://www.drupal.org/project/feeds_tamper">Feeds Tamper</a> 模組，一樣卡在不知道怎麼設定。後來找到<a href="http://drupal.stackexchange.com/a/135574">這篇文章</a>，細看才發覺原來 Feeds Tamper 開發了很多 plugin，要使用它必須在完成 Feeds 欄位對應後，再到要「前處理」的欄位進行 plugin 的設定（Feeds Tamper 看來應該是在 Feeds 匯入前又做了一次前處理）。</p>

<p>其實只要看下面這張圖就可以理解了，感謝 Google 老師。</p>

<p><a href="http://drupal.stackexchange.com/a/135574"><img alt="" src="https://i.stack.imgur.com/hXU1A.png" loading="lazy" /></a></p>

<p>至於 .csv 檔案裡的資料只要用「,」區隔不同分類詞即可，如下圖。</p>

<p><a href="http://drupal.stackexchange.com/a/135574"><img alt="" src="https://www.drupal.org/files/csv_0.png" loading="lazy" /></a></p>

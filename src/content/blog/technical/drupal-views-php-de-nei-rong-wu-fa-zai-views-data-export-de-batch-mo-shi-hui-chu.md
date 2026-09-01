---
title: "[Drupal] Views PHP 的內容無法在 Views Data Export 的 Batch 模式匯出"
description: "簡單說，就是用 Views Data Export 的「Batch」匯出模式時，會發現所有用 Views PHP 設計的欄位都無法順利匯出其欄位數值。問題主因是 View PHP 沒有實作 pre / post execute 的程式片段。 想瞭解具體情況的可以看相關討論；如果只是想找解法的，可以直接參考這個 Patch。 參考資料：https://www."
publishedAt: "2018-03-14T10:15:59.000Z"
updatedAt: "2018-03-14T10:15:59.000Z"
legacyPath: "/technical/drupal-views-php-de-nei-rong-wu-fa-zai-views-data-export-de-batch-mo-shi-hui-chu"
kind: "technical"
tags: ["Drupal 7", "Views"]
legacyNid: 134
archived: true
---

<p>簡單說，就是用 Views Data Export 的「Batch」匯出模式時，會發現所有用 Views PHP 設計的欄位都無法順利匯出其欄位數值。問題主因是 View PHP 沒有實作 pre / post execute 的程式片段。</p>

<p>想瞭解具體情況的可以看<a href="https://www.drupal.org/project/views_php/issues/1088776">相關討論</a>；如果只是想找解法的，可以直接參考這個 <a href="https://www.drupal.org/files/issues/views_php_pre_post_execute-1088776-16.patch">Patch</a>。</p>

<p>參考資料：https://www.drupal.org/project/views_data_export/issues/1536670#comment-8573359</p>

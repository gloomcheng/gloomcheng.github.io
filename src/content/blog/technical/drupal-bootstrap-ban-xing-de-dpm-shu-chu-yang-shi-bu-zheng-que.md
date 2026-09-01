---
title: "[Drupal] Bootstrap 版型的 dpm() 輸出樣式不正確"
description: "自從更新 Bootstrap 7.x-3.8 安全性更新後，dpm() 輸出的結果就變成一堆文字，而不是點開階層的方式呈現 目前比較快的解法是在 Bootstrap 子版型的 template.php 加上 themestatusmessage() 的改寫。 相關討論請看 Bootstrap 7.x-3.8 breaks dpm() Krumo and st"
publishedAt: "2017-10-02T09:55:13.000Z"
updatedAt: "2017-10-02T09:55:13.000Z"
legacyPath: "/technical/drupal-bootstrap-ban-xing-de-dpm-shu-chu-yang-shi-bu-zheng-que"
kind: "technical"
tags: []
legacyNid: 125
archived: true
---

<p>自從更新 Bootstrap 7.x-3.8 安全性更新後，dpm() 輸出的結果就變成一堆文字，而不是點開階層的方式呈現<br />
目前比較快的解法是在 Bootstrap 子版型的 template.php 加上 theme_status_message() 的改寫。</p>

<p>相關討論請看 <a href="https://www.drupal.org/node/2824578">Bootstrap 7.x-3.8 breaks dpm() Krumo and string output</a></p>

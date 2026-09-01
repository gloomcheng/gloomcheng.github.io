---
title: "[Drupal] D7 模組開發初體驗 - Required for Publishing"
description: "前篇文章提到，為改善多步驟表單的易用性，需要 Required for Publishing 模組，可惜的是作者還沒釋出 D7 的版本。幾經思量下，決定自己下海試試看 D7 的模組開發。由於是拿別人的程式碼來改，所以還算簡單，比較麻煩的應屬部分 API 在 D7 的用法已改，或是已丟棄。找尋替代的 API 函式算是較花時間，不然程式邏輯其實很明確，不太需要調"
publishedAt: "2012-08-22T14:33:23.000Z"
updatedAt: "2012-08-22T14:33:23.000Z"
legacyPath: "/technical/drupal-d7-mo-zu-kai-fa-chu-ti-yan-required-publishing"
kind: "technical"
tags: ["Back-end", "Drupal 7", "Module development"]
legacyNid: 51
archived: true
---

<p>前篇文章提到，為改善多步驟表單的易用性，需要 <a title="Required for Publishing module" href="http://drupal.org/project/required_for_pub/">Required for Publishing</a> 模組，可惜的是作者還沒釋出 D7 的版本。幾經思量下，決定自己下海試試看 D7 的模組開發。</p><p>由於是拿別人的程式碼來改，所以還算簡單，比較麻煩的應屬部分 API 在 D7 的用法已改，或是已丟棄。找尋替代的 API 函式算是較花時間，不然程式邏輯其實很明確，不太需要調整。</p><p>雖然最後算是成功改出 D7 可用的 <a title="Required for Publishing module for Drupal 7" href="http://drupal.org/node/1229498">Required for Publising</a> 模組程式，但因為部分程式有專為特定專案情境而改寫，所以並不算適合所有人使用，希望有人可以協助接手修改。</p>

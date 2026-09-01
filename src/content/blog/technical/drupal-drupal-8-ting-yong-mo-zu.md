---
title: "[Drupal] Drupal 8 停用模組"
description: "開始使用 Drupal 8 之後，發現居然沒有停用模組的功能了（D8 的停用模組是移除模組，會刪除掉該模組相關的資料），乍看很是不便，上網一找發現因應而生 Disable modules 模組，且在該模組介紹頁發覺 D8 之所以拿掉停用模組功能的原因。 據相關討論內容來看，因為 D8 強調 dev / stage / prod 的開發流程線，因此特別強調設定"
publishedAt: "2017-04-12T13:43:44.000Z"
updatedAt: "2017-04-12T13:43:44.000Z"
legacyPath: "/technical/drupal-drupal-8-ting-yong-mo-zu"
kind: "technical"
tags: ["Drupal 8"]
legacyNid: 119
archived: true
---

<p>開始使用 Drupal 8 之後，發現居然沒有停用模組的功能了（D8 的停用模組是移除模組，會刪除掉該模組相關的資料），乍看很是不便，上網一找發現因應而生 <a href="https://www.drupal.org/project/disable_modules">Disable modules</a> 模組，且在該模組介紹頁發覺 D8 之所以拿掉停用模組功能的原因。</p>

<p>據<a href="https://www.drupal.org/node/1199946">相關討論內容</a>來看，因為 D8 強調 dev / stage / prod 的開發流程線，因此特別強調設定檔匯入/匯出的機制，這使得停用模組這功能可能導致轉移時的問題，因而索性拿掉此功能了，讓停用模組變成移除模組的功能，把相關資料都移除掉。</p>

<p>不過這樣的修改造成其他問題，例如 dev 要開啟 devel 模組，但在 stage 可能就要關閉此模組，在此一情境下，可能就要在匯出功能前移除 devel，然後再轉出設定檔，而無法在 stage 強制設定關閉 devel 模組。於是，便又衍生出 <a href="https://www.drupal.org/project/config_split">Configuration Split</a> 這種模組，可以針對前述問題做很好的設定管理。</p>

<p>目前看來，如果我只是想臨時性停用模組確認某些狀況，在 D8 是無法達到的，每次只能移除模組再重啟、重新設定。然而，這樣的情況可能過不久就會再改變了，因為同在 Disable modules 的頁面看到<a href="https://www.drupal.org/node/2081873">另一則討論串</a>，也是在討論目前的機制沒有提供暫時性停用模組的功能，希望重新實作出停用模組的功能，只是討論串停留在兩年前，還無法知道最後會是怎麼發展啊。</p>

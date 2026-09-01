---
title: "[Drupal] 在 autocomplete 欄位按 enter 鍵會 trigger 第一個 ajax button 的問題"
description: "像是在 autocomplete 的 tag 欄位輸入資料並按 Enter 鍵後，結果觸發了 insert 按鈕，又把圖插入到內文區，此時只要在版型的 js 檔寫入一小段程式就可以改善 //fix enter key triggering button click on autocomplete fields. $('input.form-autocompl"
publishedAt: "2014-10-15T15:08:09.000Z"
updatedAt: "2016-05-19T01:48:28.000Z"
legacyPath: "/technical/drupal-zai-autocomplete-lan-wei-enter-jian-hui-trigger-di-yi-ge-ajax-button-de-wen-ti"
kind: "technical"
tags: []
legacyNid: 95
archived: true
---

<p>像是在 autocomplete 的 tag 欄位輸入資料並按 Enter 鍵後，結果觸發了 insert 按鈕，又把圖插入到內文區，此時只要在版型的 js 檔寫入一小段程式就可以改善</p>

<code>
//fix enter key triggering button click on autocomplete fields.  
$('input.form-autocomplete').keydown(function(e) {return e.keyCode != 13});
</code>

<p>Ref: https://www.drupal.org/node/482558#comment-1670326</p>

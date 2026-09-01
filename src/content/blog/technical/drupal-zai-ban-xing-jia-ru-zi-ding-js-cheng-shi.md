---
title: "[Drupal] 在版型加入自訂 js 程式"
description: "在開發 Bootstrap 子版型時經常會需要寫些自訂 js 程式，像是 js/theme.js 這類的程式。因為版型的 js 有固定格式的開頭，為了方便找尋，把程式碼貼在下面。 (function ($) { Drupal.behaviors.exampleModule = { attach: function (context, settings) { "
publishedAt: "2016-09-05T06:11:02.000Z"
updatedAt: "2017-09-30T04:33:35.000Z"
legacyPath: "/technical/drupal-zai-ban-xing-jia-ru-zi-ding-js-cheng-shi"
kind: "technical"
tags: []
legacyNid: 113
archived: true
---

<p>在開發 Bootstrap 子版型時經常會需要寫些自訂 js 程式，像是 js/theme.js 這類的程式。因為版型的 js 有固定格式的開頭，為了方便找尋，把程式碼貼在下面。</p>

<pre>
<code class="language-javascript">(function ($) {
  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      // Code to be run on page load, and
      // on ajax load added here
    }
  };
}(jQuery));</code></pre>

<p>詳情可參考：<a href="https://www.drupal.org/node/756722">Managing JavaScript in Drupal 7</a></p>

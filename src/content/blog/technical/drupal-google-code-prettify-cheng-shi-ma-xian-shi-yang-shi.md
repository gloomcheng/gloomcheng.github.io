---
title: "[Drupal] Google Code Prettify 程式碼顯示樣式"
description: "之前一直搞不定 Syntax Highlighter 的設定，今天重用同樣的關鍵字搜尋時發現新的模組，叫 Google Code Prettify，看起來安裝和設定都更簡單，就把其中幾篇文章的程式碼樣式都調整了下。 有興趣的，可以參照下面的安裝步驟： cd sites/.../libraries git clone https://github.com/go"
publishedAt: "2016-05-19T02:03:32.000Z"
updatedAt: "2017-09-30T04:36:41.000Z"
legacyPath: "/technical/drupal-google-code-prettify-cheng-shi-ma-xian-shi-yang-shi"
kind: "technical"
tags: ["Code highlight", "Drupal 7"]
legacyNid: 108
archived: true
---

<p>之前一直搞不定 <a href="https://www.drupal.org/project/syntaxhighlighter">Syntax Highlighter</a> 的設定，今天重用同樣的關鍵字搜尋時發現新的模組，叫 <a href="https://www.drupal.org/project/prettify">Google Code Prettify</a>，看起來安裝和設定都更簡單，就把其中幾篇文章的程式碼樣式都調整了下。</p>

<p>有興趣的，可以參照下面的安裝步驟：</p>

<pre>
<code class="language-bash">cd sites/.../libraries git clone https://github.com/google/code-prettify.git mv code-prettify
prettify drush dl prettify &amp;&amp; drush en -y prettify</code></pre>

<p>然後再到 Administration &gt;&gt; Configuration &gt;&gt; User interface &gt;&gt; Code prettify 設定要套用什麼樣的程式碼樣式就可以了，我是選「Drupal.org」</p>

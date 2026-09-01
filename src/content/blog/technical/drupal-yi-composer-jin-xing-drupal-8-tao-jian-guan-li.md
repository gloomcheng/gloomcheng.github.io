---
title: "[Drupal] 以 Composer 進行 Drupal 8 套件管理"
description: "Drupal 8 帶來不少變革，相關的操作、應用變異也很大。其中，比較常見的大概就是開始運用 Composer 進行套件管理的工作，甚至是連同安裝 Drupal 8 的方式都因應改變，可謂又是一波典範轉移。 本文主要參考 https://www.drupal.org/docs/develop/using-composer/using-composer-to-"
publishedAt: "2017-04-12T10:46:52.000Z"
updatedAt: "2017-04-12T10:46:52.000Z"
legacyPath: "/technical/drupal-yi-composer-jin-xing-drupal-8-tao-jian-guan-li"
kind: "technical"
tags: ["Composer", "Drupal 8", "Drupal Composer"]
legacyNid: 118
archived: true
---

<p>Drupal 8 帶來不少變革，相關的操作、應用變異也很大。其中，比較常見的大概就是開始運用 Composer 進行套件管理的工作，甚至是連同安裝 Drupal 8 的方式都因應改變，可謂又是一波典範轉移。</p>

<p>本文主要參考 https://www.drupal.org/docs/develop/using-composer/using-composer-to-manage-drupal-site-dependencies，概分幾個段落來記錄。</p>

<h2>安裝 Drupal 8</h2>

<p>安裝 Drupal 8 建議的方式已經不是用 drush 來安裝了，而是使用 Composer 來安裝，查了下看來滿多人在使 <a href="https://github.com/drupal-composer/drupal-project">Drupal Composer</a> 這個工具。要使用這工具前，必須要先安裝 composer。</p>

<p>接著，就可以利用下列指令來下載 Drupal，下載過程同時會下載相關套件、工具，例如 Drupal Console / Drush：</p>

<pre>
composer create-project drupal-composer/drupal-project:8.x-dev &lt;web folder&gt; --stability dev --no-interaction</pre>

<p>這個指令會下載 Drupal core 並放置在 &lt;web folder&gt;/web 資料夾下，所以記得 Apache / Nginx 的設定檔必須設定到正確的網站根目錄。</p>

<h2>使用 Drush 指令</h2>

<p>雖然乍看比 Drupal 7 複雜很多，不過你還是可以用 Drush 指令，但在使用 Drush 指令前必須先知道 drush 不是全域性的指令了，而是放在每個網站下的 &lt;web folder&gt;/vendor/bin/drush。也就是說，如果你想使用 drush 指令，你必須這麼做：</p>

<pre>
cd web
../vendor/bin/drush ...</pre>

<h2>安裝 Drupal 模組</h2>

<p>如果要安裝任何 Drupal 模組，Drupal Composer 建議的方式不是使用 drush dl / drush en 來安裝，而是在 &lt;web folder&gt; 資料夾，透過下列指令來下載模組和相依程式：</p>

<pre>
composer require drupal/&lt;module name&gt;</pre>

<p>此後，composer 會從 Drupal.org 下載模組程式和其他必須的相依程式、套件，接下來你就可以使用慣用的 drush 指令啟用模組：</p>

<pre>
cd web
../vendor/bin/drush en &lt;module name&gt;</pre>

---
title: "[Apache] 利用 .htaccess 設定強制導向 https"
description: "這是很頻繁遇到的問題了，遇到只能使用 cPanel 的網站，但又需要設定強制導向 https，就必須從 .htaccess 著手。之前查過不少方法，基本上大多是設定判斷 RewriteCond 來偵測用戶連結的是不是 https(443)，如果不符合就用 RewriteRule 導向 https 通訊協定。 剛剛因為更新 Drupal 核心程式不小心把 .h"
publishedAt: "2018-10-18T10:00:31.000Z"
updatedAt: "2018-10-18T10:00:31.000Z"
legacyPath: "/technical/apache-li-yong-htaccess-she-ding-qiang-zhi-dao-xiang-https"
kind: "technical"
tags: ["Apache", "Drupal 7", "Linux"]
legacyNid: 149
archived: true
---

<p>這是很頻繁遇到的問題了，遇到只能使用 cPanel 的網站，但又需要設定強制導向 https，就必須從 .htaccess 著手。之前查過不少方法，基本上大多是設定判斷 RewriteCond 來偵測用戶連結的是不是 https(443)，如果不符合就用 RewriteRule 導向 https 通訊協定。</p>

<p>剛剛因為更新 Drupal 核心程式不小心把 .htaccess 覆蓋掉了，所以又上網查了一下，找到 <a href="https://3cwebservices.com/drupal/how-redirect-all-traffic-https-your-drupal-site">How to redirect all traffic to HTTPS on your Drupal site</a> 文章，裡面提的方法簡單又好設定，記錄一下，避免日後又要再查一次。</p>

<p>基本上是把下面的程式碼放在 RewriteEngine on 下面</p>

<pre>
<code class="language-apache">  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]</code></pre>

<p>置入該段程式碼後的設定檔會類似</p>

<pre>
<code class="language-apache"># Various rewrite rules.
&lt;IfModule mod_rewrite.c&gt;
  RewriteEngine on
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Set "protossl" to "s" if we were accessed via https://.  This is used later
  # if you enable "www." stripping or enforcement, in order to ensure that
  # you don't bounce between http and https.
  RewriteRule ^ - [E=protossl]
  RewriteCond %{HTTPS} on
  RewriteRule ^ - [E=protossl:s]</code></pre>

<p> </p>

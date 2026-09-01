---
title: "[Drupal] Drupal 8 更新核心程式"
description: "主要也是依循 Composer 管理機制，並參考 Update core (option 4) 查找哪些模組需要更新 composer outdated 更新模組 composer update drupal/modulename --with-dependencies 更新資料庫 drush updb 清除快取 drush cr 當然，每次更新時切記要先做"
publishedAt: "2017-11-22T07:06:00.000Z"
updatedAt: "2017-11-22T07:06:00.000Z"
legacyPath: "/technical/drupal-drupal-8-geng-xin-he-xin-cheng-shi"
kind: "technical"
tags: ["Composer", "Drupal 8"]
legacyNid: 126
archived: true
---

<p>主要也是依循 Composer 管理機制，並參考 <a href="https://www.drupal.org/docs/8/update/update-core-option-4">Update core (option 4)</a></p>

<ol>
	<li>查找哪些模組需要更新
	<pre>
<code>composer outdated</code></pre>
	</li>
	<li>更新模組
	<pre>
<code>composer update drupal/modulename --with-dependencies</code></pre>
	</li>
	<li>更新資料庫
	<pre>
<code>drush updb</code></pre>
	</li>
	<li>清除快取
	<pre>
<code>drush cr</code></pre>
	</li>
</ol>

<p>當然，每次更新時切記要先做備份，然後更新後要到「報告」確認網站狀態。</p>

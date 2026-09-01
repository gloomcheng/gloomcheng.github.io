---
title: "[Drupal] 重建選單路徑"
description: "有時候會遇到因不明原因造成管理選單錯亂，例如 node/add 這個選單不見，導致看不到新增內容的各個項目 這時的解決方法是刪除 menulink 資料表的資料，然後再用 menurebuild() 重建資料 以下是用 drush 指令的操作方式： drush sqlq \"DELETE FROM menulinks WHERE menuname='manag"
publishedAt: "2017-09-30T04:14:47.000Z"
updatedAt: "2017-09-30T04:31:08.000Z"
legacyPath: "/technical/drupal-zhong-jian-xuan-dan-lu-jing"
kind: "technical"
tags: ["Drupal 7", "Menu"]
legacyNid: 124
archived: true
---

<p>有時候會遇到因不明原因造成管理選單錯亂，例如 node/add 這個選單不見，導致看不到新增內容的各個項目<br />
這時的解決方法是刪除 menu_link 資料表的資料，然後再用 menu_rebuild() 重建資料</p>

<p>以下是用 drush 指令的操作方式：</p>

<pre>
<code class="language-bash">drush sqlq "DELETE FROM menu_links WHERE menu_name='management'"
drush eval 'menu_rebuild();'</code></pre>

<p> </p>

<p>參考資料：<br />
https://drupal.stackexchange.com/questions/58618/how-do-i-call-the-menu-rebuild-function-in-drupal-7<br />
https://drupal.stackexchange.com/questions/48515/how-to-completely-wipe-and-rebuild-drupal-menus</p>

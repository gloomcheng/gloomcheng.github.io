---
title: "[Drupal] 在主選單加入 node/add/content-type 的選單項目"
description: "情境描述： 在主選單加入某個特定內容類型的新增連結，但同時要限制必須是註冊使用者才能建立內容。然而，因為 Drupal menu access callback 的設定，當未登入使用者不具有權限建立內容時，就無法看到 node/add/content-type 的路徑，也就會造成選單中是前述路徑的選單項目無法顯示在未登入使用者的畫面上。 解法： 讓註冊使用者"
publishedAt: "2017-02-16T07:47:39.000Z"
updatedAt: "2017-02-18T06:46:53.000Z"
legacyPath: "/technical/drupal-zai-zhu-xuan-dan-jia-ru-nodeaddcontent-type-de-xuan-dan-xiang-mu"
kind: "technical"
tags: ["Drupal 7"]
legacyNid: 115
archived: true
---

<p>情境描述：</p>

<p>在主選單加入某個特定內容類型的新增連結，但同時要限制必須是註冊使用者才能建立內容。然而，因為 Drupal menu access callback 的設定，當未登入使用者不具有權限建立內容時，就無法看到 node/add/content-type 的路徑，也就會造成選單中是前述路徑的選單項目無法顯示在未登入使用者的畫面上。</p>

<p>解法：</p>

<p>讓註冊使用者才能建立內容，這在 Drupal 內建的權限控管機制就做得到，只不過可以加上 <a href="https://www.drupal.org/project/r4032login">Redirect 403 to User Login</a> 模組或 <a href="https://www.drupal.org/project/logintoboggan">LoginToboggan</a> 模組，讓使用者在存取 node/add/content-type 路徑時可以直接導向登入頁，而不是限制存取的頁面。</p>

<ul>
	<li><a href="https://www.drupal.org/project/r4032login">Redirect 403 to User Login</a> 模組：可以修改 403 頁面到登入畫面，也可以隱藏原本 access denied 的訊息，在 UX 方面的感受較佳。</li>
	<li><a href="https://www.drupal.org/project/logintoboggan">LoginToboggan</a> 模組：這模組的主要功能是可以提供使用者用 E-mail 登入、註冊時設置密碼等機制，但該模組同樣有提供 403 頁面導向登入頁的功能，只是相關的設置項目不若 r4032login 模組來得細緻。</li>
</ul>

<p>然而，上述模組還是無法解決要在主選單顯示連到 node/add/content-type 選單項目的需求。這時，需要用迂迴的做法，就是先建立一個空的頁面，並設定 Rules 的導向，以便導到 node/add/content-type 的頁面。一來，這個空的頁面是未登入使用者可以瀏覽的，當使用者瀏覽時再導向至 node/add/content-type 頁面，此時就會因為權限設定問題，再被導到登入頁。</p>

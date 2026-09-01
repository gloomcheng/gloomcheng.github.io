---
title: "[Drupal] 隨機顯示最新內容"
description: "案例：在最新的五則內容中，隨機顯示其中三則內容。做法：用 Views 先建立顯示五則內容的 display（如 block）；注意，因為是要顯示最新的五則內容，所以 Items per page 要設為「5」，而 sort criteria 要設以「發表日期」排序（desc）寫一個客製模組，然後利用 hookviewspostexecute 函式來重寫輸出結"
publishedAt: "2013-05-23T16:32:17.000Z"
updatedAt: "2013-05-24T09:23:26.000Z"
legacyPath: "/technical/drupal-sui-ji-xian-shi-zui-xin-nei-rong"
kind: "technical"
tags: ["Drupal 6", "Module development", "Views"]
legacyNid: 69
archived: true
---

<p>案例：在最新的五則內容中，隨機顯示其中三則內容。</p><p>做法：</p><ol><li>用 Views 先建立顯示五則內容的 display（如 block）；注意，因為是要顯示最新的五則內容，所以 Items per page 要設為「5」，而 sort criteria 要設以「發表日期」排序（desc）</li><li>寫一個客製模組，然後利用 hook_views_post_execute 函式來重寫輸出結果，程式碼如下</li></ol><pre class="brush: php;">  if ($view-&gt;name == 'view_name' &amp;&amp; $view-&gt;current_display == 'display_name') {
    $rand = array_rand($view-&gt;result, 3);
    foreach ($rand as $key =&gt; $value) {
      $result[] = $view-&gt;result[$value];
    }
    $view-&gt;result = $result;
  }
</pre><p>說明：透過 array_rand 函式，只能取得 array key，而不是取得整個 views 的結果，因此還要利用迴圈依序取出 views 的結果並暫存到某個變數，最後再將結果覆蓋回 views 的結果。<br />如果是只需要從五則近期內容隨機取出一則，就不用這麼複雜，只需要在 hook_views_post_execute 函式中寫入下面這行程式碼即可</p><pre class="brush: php;">$view-&gt;result = array($view-&gt;result[array_rand($view-&gt;result)]);</pre><p>參考資料：<a title="[SOLVED] Randomly display content of one of the first five nodes in the query in a Views block." href="http://www.zyxware.com/articles/2951/solved-randomly-display-content-of-one-of-the-first-five-nodes-in-the-query-in-a-views-block">[SOLVED] Randomly display content of one of the first five nodes in the query in a Views block.</a></p>

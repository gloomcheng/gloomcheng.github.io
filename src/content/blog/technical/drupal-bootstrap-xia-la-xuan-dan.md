---
title: "[Drupal] Bootstrap 下拉選單"
description: "經常忘記怎麼讓 Bootstarp 預設展開下拉選單，然後就變成去修改 menu-link.func.php 程式。 其實解法很簡單，在父層選單項目勾選「展開的方式顯示」即可 [1]，然後再加一段 js 程式在版型內，設定成 hover 選單項目就會出現下拉選單 [2]。 $(\".nav li.expanded\").hover( function(){ $("
publishedAt: "2017-08-30T05:43:23.000Z"
updatedAt: "2017-08-30T07:21:42.000Z"
legacyPath: "/technical/drupal-bootstrap-xia-la-xuan-dan"
kind: "technical"
tags: ["Bootstrap", "Drupal 7"]
legacyNid: 123
archived: true
---

<p>經常忘記怎麼讓 Bootstarp 預設展開下拉選單，然後就變成去修改 menu-link.func.php 程式。</p>

<p>其實解法很簡單，在父層選單項目勾選「展開的方式顯示」即可 [<a href="https://www.drupal.org/node/2279407#comment-8841951">1</a>]，然後再加一段 js 程式在版型內，設定成 hover 選單項目就會出現下拉選單 [<a href="https://stackoverflow.com/a/38327037">2</a>]。</p>

<pre>
<span>  $</span><span>(</span><span>".nav li.expanded"</span><span>).</span><span>hover</span><span>(</span><span>
    </span><span>function</span><span>(){</span><span>
      $</span><span>(</span><span>this</span><span>).</span><span>addClass</span><span>(</span><span>"open"</span><span>);</span><span>
    </span><span>},</span><span>function</span><span>(){</span><span>
      $</span><span>(</span><span>this</span><span>).</span><span>removeClass</span><span>(</span><span>"open"</span><span>);</span><span>
    </span><span>}</span><span>
  </span><span>);</span></pre>

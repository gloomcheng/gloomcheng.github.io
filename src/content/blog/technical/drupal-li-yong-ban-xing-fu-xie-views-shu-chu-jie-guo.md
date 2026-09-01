---
title: "[Drupal] 利用版型覆寫 views 輸出結果"
description: "我這次主要是想在 views 的 more-link 加上 .btn-primary 的 class，讓輸出結果直接變成按鈕樣式。在查找資料中[1][2]，發現在 Drupal 8.0.x 的早期版本中，是有 views-more.html.twig 版型範本檔案的；不過在最新的 8.6.x 版本已沒有這個檔案了，我並沒有進一步去瞭解為什麼要拿掉這個版型檔案"
publishedAt: "2018-10-18T03:20:01.000Z"
updatedAt: "2018-10-18T03:20:01.000Z"
legacyPath: "/technical/drupal-li-yong-ban-xing-fu-xie-views-shu-chu-jie-guo"
kind: "technical"
tags: ["Drupal 8", "Theme", "Views"]
legacyNid: 147
archived: true
---

<p>我這次主要是想在 views 的 more-link 加上 .btn-primary 的 class，讓輸出結果直接變成按鈕樣式。在查找資料中[<a href="https://www.drupal.org/project/drupal/issues/2226923">1</a>][<a href="https://www.drupal.org/project/drupal/issues/2036195">2</a>]，發現在 Drupal 8.0.x 的早期版本中，是有 views-more.html.twig 版型範本檔案的；不過在最新的 8.6.x 版本已沒有這個檔案了，我並沒有進一步去瞭解為什麼要拿掉這個版型檔案。</p>

<p>由於已經沒有 views-more.html.twig 可以修改，所以如果要覆寫 views 的輸出結果，就要在 <strong>THEMENAME.theme</strong> 檔案中利用程式直接修改。在網路上找到的<a href="http://www.drupalthemez.com/blog/d8-adding-class-more-link-view">參考文章</a>有提供一段範例程式碼如下：</p>

<pre>
<code class="language-php">/**
 * Implements template_preprocess_views_view()
 * @param array $vars
 */
function THEMENAME_preprocess_views_view(&amp;$vars){
  if(YOUR CONDITION FOR ADDING A CLASS){
    $vars['more']['#options']['attributes']['class'] = array(
      ENTER YOUR CLASSES AS ARRAY ELEMENTS
    );
  }
}</code></pre>

<p> </p>

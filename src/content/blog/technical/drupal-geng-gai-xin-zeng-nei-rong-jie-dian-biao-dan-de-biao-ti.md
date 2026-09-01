---
title: "[Drupal] 更改新增內容節點表單的標題"
description: "新增內容節點表單也就是 /node/add/[content-type]，預設的標題是 Create [content-type]（「建立[內容類型名稱]」）。要更改此表單的頁面標題，在 D6/D7 的做法不同，以下分述之：[D6]最快的方式是寫一個客制模組，利用 hookformalter 函式改寫表單標題即可[1]。function yourmodule"
publishedAt: "2012-08-29T15:37:29.000Z"
updatedAt: "2012-08-29T15:39:05.000Z"
legacyPath: "/technical/drupal-geng-gai-xin-zeng-nei-rong-jie-dian-biao-dan-de-biao-ti"
kind: "technical"
tags: ["Drupal 6", "Drupal 7", "Front-end", "Panel"]
legacyNid: 54
archived: true
---

<p>新增內容節點表單也就是 /node/add/[content-type]，預設的標題是 Create [content-type]（「建立[內容類型名稱]」）。要更改此表單的頁面標題，在 D6/D7 的做法不同，以下分述之：</p><p>[D6]</p><p>最快的方式是寫一個客制模組，利用 <a title="hook_form_alter function" href="http://api.drupal.org/api/drupal/developer%21hooks%21core.php/function/hook_form_alter/6">hook_form_alter</a> 函式改寫表單標題即可[<a title="Change Page Title on Add Node Page" href="http://drupal.stackexchange.com/questions/6376/change-page-title-on-add-node-page">1</a>]。</p><pre class="brush:php;">function yourmodule_form_alter(&amp;$form, &amp;$form_state, $form_id) {
  if ($form_id == 'nodetype_node_form') {
    drupal_set_title('My new title');
  }
}</pre><p>或是您可以直接使用 <a title="hook_form_FORM_ID_alter function" href="http://api.drupal.org/api/drupal/developer%21hooks%21core.php/function/hook_form_FORM_ID_alter/6">hook_form_FORM_ID_alter</a> 函式，限定在特定的內容類型表單。</p><p>[D7]</p><p>Drupal 7 因為 render 頁面的方式與 D6 差異甚大，所以上述方式無法順利改變頁面標題（其實有順利變更標題變數，但卻是在 render 頁面後才改變的，所以實際上看到的頁面標題並沒有改變）。</p><p>在嘗試幾種解決後，最後發現使用 Panel 模組來修改最快，也是目前我找到的唯一可行解。</p><p>請參考 <a title="Panels 3: Using variants to create node layouts" href="http://drupal.org/node/661656">Panels 3: Using variants to create node layouts.</a> 一文。詳細操作方式需擷圖輔助說明，容下文再敘。</p>

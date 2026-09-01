---
title: "[Drupal] Undefined index 錯誤"
description: "在為 Drupal 7 開發模組時，經常會看到如下的錯誤訊息 Notice: Undefined index: xxx xxxx針對此問題，Kay.L 提出關掉 Logging and errors 的告警功能即可[1]。不過，對於開發者而言，最好是瞭解此問題發生的原因及解決方式較佳。此訊息之所以會出現，其實是在程式運行過程中找不到定義的變數。例如：func"
publishedAt: "2012-08-23T17:05:34.000Z"
updatedAt: "2012-08-23T18:26:39.000Z"
legacyPath: "/technical/drupal-undefined-index-cuo-wu"
kind: "technical"
tags: ["Back-end", "Drupal 7", "Module development"]
legacyNid: 53
archived: true
---

<p>在為 Drupal 7 開發模組時，經常會看到如下的錯誤訊息</p><blockquote><p>*  Notice: Undefined index: xxx xxxx</p></blockquote><p>針對此問題，<a title="Kay.L on Drupal Taiwan" href="http://drupaltaiwan.org/user/kay_l">Kay.L</a> 提出關掉 Logging and errors 的告警功能即可[<a title="Drupal 7 與 Undefined index 錯誤" href="http://www.notabluescreen.com/undefined-index-error">1</a>]。不過，對於開發者而言，最好是瞭解此問題發生的原因及解決方式較佳。</p><p>此訊息之所以會出現，其實是在程式運行過程中找不到定義的變數。例如：</p><pre class="brush: php;">function required_for_pub_form_alter(&amp;$form, &amp;$form_state, $form_id) {
  // If node publishing is enabled, mark the checkbox regardless of the current status.
  $fields = $form_state['field'];
  // Verify that there are fields in the content type.
  if (is_array($fields)) {
    foreach ($fields as $field) {
      // Make sure at least one field is set as required_for_pub
      if ($field['und']['instance']['required_for_pub']) {
        $form['options']['status']['#default_value'] = TRUE;
        return;
      }
    }
  }
}</pre><p>上段程式中，我其實是想確認<strong>內容表單</strong>中是否有任何一個欄位勾選了「Required for Publihsing」的選項，以做為是否要執行接續程式的判斷；但因為 hook_form_alter 會套用到所有的表單，而不只是 node 表單而已，所以當您在瀏覽其他表單時就會發現出現 Undefined index: xxx 的訊息，這意思就是您瀏覽的表單中找不到這個變數（也就是 $field['und']['instance']['required_for_pub'] 或 $form['options']['status']['#default_value']）。</p><p>既然只是因為找不到變數才出現的告警訊息，那麼其實只要在整個程式的最外圈再加上判斷變數是否已設定的條件式，即可完美地解決此問題[<a title="解決「Undefined index 錯誤PHP」" href="http://allenplay.blogspot.tw/2011/04/undefined-index-php.html">2</a>]。所以上述的程式修改之後如下：</p><pre class="brush: php;">function required_for_pub_form_alter(&amp;$form, &amp;$form_state, $form_id) {
  // If node publishing is enabled, mark the checkbox regardless of the current status.
  if (isset($form['#node'])) {
    $fields = $form_state['field'];
    // Verify that there are fields in the content type.
    if (is_array($fields)) {
      foreach ($fields as $field) {
        // Make sure at least one field is set as required_for_pub
        if ($field['und']['instance']['required_for_pub']) {
          $form['options']['status']['#default_value'] = TRUE;
          return;
        }
      }
    }
  }
}</pre><p>以上。下課。</p>

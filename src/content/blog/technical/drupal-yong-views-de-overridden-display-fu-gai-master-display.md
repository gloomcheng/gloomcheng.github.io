---
title: "[Drupal] 用 Views 的 overridden display 覆蓋 master display"
description: "雖然 Views 的 master (default) 和 override display 的設計很方便，而且有提供可以 revert override to default 的功能，但有時候是想保留 override display 並覆蓋掉 default display，這時候就尷尬了，因為 Views 沒有提供這麼方便的功能。 在 copy vie"
publishedAt: "2017-11-22T16:22:58.000Z"
updatedAt: "2017-11-22T16:22:58.000Z"
legacyPath: "/technical/drupal-yong-views-de-overridden-display-fu-gai-master-display"
kind: "technical"
tags: ["Drupal 7", "Views"]
legacyNid: 127
archived: true
---

<p>雖然 Views 的 master (default) 和 override display 的設計很方便，而且有提供可以 revert override to default 的功能，但有時候是想保留 override display 並覆蓋掉 default display，這時候就尷尬了，因為 Views 沒有提供這麼方便的功能。</p>

<p>在 <a href="https://www.drupal.org/forum/support/post-installation/2014-08-01/copy-view-overridden-display-to-master-default">copy view (overridden) display to master (default)</a> 討論串找到一個很方便的解法，基本用法是透過 Devel 模組的執行 PHP 功能，直接參考下列程式碼並替換掉「machine_name_of_my_view」與「machine_name_of_the_overridden_display」這兩個參數成真正的 views &amp; display machine name 即可。</p>

<pre>
<code>$view = views_get_view('machine_name_of_my_view');
$source_display = 'machine_name_of_the_overridden_display';
dpm($view, 'view');

foreach (array_keys($view-&gt;display[$source_display]-&gt;display_options['defaults']) as $key) {
  if (!empty($view-&gt;display[$source_display]-&gt;display_options[$key])) {
    $view-&gt;display['default']-&gt;display_options[$key] = $view-&gt;display[$source_display]-&gt;display_options[$key];
  }
  unset($view-&gt;display[$source_display]-&gt;display_options[$key]);
}
unset($view-&gt;display[$source_display]-&gt;display_options['defaults']);
dpm($view, 'new view');

// Uncomment and run once you are sure to save the changes.
//$view-&gt;save();</code></pre>

<p>上述程式碼跑完後，如果沒有什麼錯誤訊息，就把最後一行的註解取消掉，再跑一次才會真正執行該段程式碼。 </p>

---
title: "[Drupal] 在 Drupal 8 印出變數資訊"
description: "在 Drupal 7 開發模組或版型時，若需要列印變數資訊，會直接安裝 Devel 模組，而後使用 dpm() 或 dsm() 方法就可以列印變數資訊了。然而，Drupal 8 因為已經捨棄 Krumo，所以使用 dpm / dsm 方法雖然可以列印變數資訊，但卻是沒有良好格式化的結果（根據 How to Print Variables using Kint"
publishedAt: "2018-10-17T19:23:21.000Z"
updatedAt: "2018-10-17T19:23:21.000Z"
legacyPath: "/technical/drupal-zai-drupal-8-yin-chu-bian-shu-zi-xun"
kind: "technical"
tags: ["Debug", "Devel", "Drupal 8", "Kint"]
legacyNid: 146
archived: true
---

<p>在 Drupal 7 開發模組或版型時，若需要列印變數資訊，會直接安裝 Devel 模組，而後使用 dpm() 或 dsm() 方法就可以列印變數資訊了。然而，Drupal 8 因為已經捨棄 Krumo，所以使用 dpm / dsm 方法雖然可以列印變數資訊，但卻是沒有良好格式化的結果（根據 <a href="https://www.webwash.net/how-to-print-variables-using-kint-in-drupal-8/">How to Print Variables using Kint in Drupal 8</a> 一文是說 dpm / dsm 方法還可以使用，但實際上我沒有成功過），所以建議改用 kint() 來列印變數資訊。</p>

<p>由於 kint 屬於 Devel 8.x 的子模組，所以要使用 kint() 還是需要下載 Devel 模組並啟用 kint 模組，安裝方式可參考<a href="https://www.webwash.net/how-to-print-variables-using-kint-in-drupal-8/">此文</a>。依照 Drupal 7 的經驗，安裝並啟用模組後，應該就可以直接使用 kint() 或 ksm() 方法，然而實際上在程式碼內直接呼叫這方法會出現錯誤訊息，如下：</p>

<pre>
<code class="language-php">AH01071: Got error 'PHP message: Error: Cannot access protected property Drupal\\Core\\Utility\\Error::$blacklistFunctions in /var/www/example.com/web/core/lib/Drupal/Core/Utility/Error.php on line 116 #0 /var/www/example.com/web/core/includes/errors.inc(65): Drupal\\Core\\Utility\\Error::getLastCaller(Array)\n#1 /var/www/example.com/web/core/includes/bootstrap.inc(584): _drupal_error_handler_real(8, 'Undefined prope...', '/var/www/...', 496, Array)\n#2 [internal function]: _drupal_error_handler(8, 'Undefined prope...', '/var/www/...', 496, Array)\n#3 /var/www/example.com/web/modules/contrib/devel/kint/kint/inc/kintParser.class.php(496): ReflectionProperty-&gt;getValue(Object(Drupal\\Core\\Config\\ImmutableConfig))\n#4 /var/www/example.com/web/modules/contrib/devel/kint/kint/inc/kintParser.class.php(115): kintParser::_parse_object(Object(Drupal\\Core\\Config\\ImmutableConfig), Object(kintVariableData))\n#5 /var/www/example.com/web/modules/contrib/dev...\n'</code></pre>

<p>透過錯誤訊息，找到篇相似問題的<a href="https://www.drupal.org/project/devel/issues/2857361">討論文章</a>，目前看起來應該是因為 kint 的程式碼有問題，但好像無解；不過在同文的其中一則<a href="https://www.drupal.org/project/devel/issues/2857361#comment-12336002">回應</a>中，找到一個可解決的辦法，就是在 php 檔案開頭加入下面的程式碼：</p>

<pre>
<code class="language-php">require_once DRUPAL_ROOT . '/modules/contrib/devel/kint/kint/Kint.class.php';
Kint::$maxLevels = 3;</code></pre>

<p>使用前請注意下 kint 的路徑位置是否正確；另外，經測試 $maxLevel 設超過 3 也會出錯誤訊息（不過還沒進一步追查是為什麼）。</p>

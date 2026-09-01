---
title: "[Drupal] 在 body 加入 path alias 的 class"
description: "Drupal 7 的版型大部分都預設會在 body 元素加入以路徑為主的 class，不過 Drupal 8 的版型似乎預設都沒加入這個功能。如果想將 path alias 加到 body 當成 class 來使用的話，可以用以下的程式來達成 / Implements hookpreprocesshtml(). / function THEMEpreproc"
publishedAt: "2019-09-23T11:27:10.000Z"
updatedAt: "2019-09-23T11:27:10.000Z"
legacyPath: "/technical/drupal-zai-body-jia-ru-path-alias-de-class"
kind: "technical"
tags: ["Drupal 8", "Theme"]
legacyNid: 156
archived: true
---

<p>Drupal 7 的版型大部分都預設會在 body 元素加入以路徑為主的 class，不過 Drupal 8 的版型似乎預設都沒加入這個功能。如果想將 path alias 加到 body 當成 class 來使用的話，可以用以下的程式來達成</p>

<pre>
<code class="language-php">/**
 * Implements hook_preprocess_html().
 */
function THEME_preprocess_html(&amp;$variables) {
  $current_path = \Drupal::service('path.current')-&gt;getPath();
  $path_alias = \Drupal::service('path.alias_manager')-&gt;getAliasByPath($current_path);
  $path_alias = ltrim($path_alias, '/');
  $variables['attributes']['class'][] = 'path-' . \Drupal\Component\Utility\Html::cleanCssIdentifier($path_alias);
}</code></pre>

<p>記得是寫在版型的 .theme 檔案裡喔（也就是 D7 版型的 template.php）</p>

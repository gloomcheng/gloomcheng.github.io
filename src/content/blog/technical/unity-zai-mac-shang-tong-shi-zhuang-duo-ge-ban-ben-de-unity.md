---
title: "[Unity] 在 Mac 上同時安裝多個版本的 Unity"
description: "之前 Unity 官方有提供過解法，概念是更改 Unity 資料夾的名稱，不過之前嘗試過無效。這次再搜尋同樣的關鍵字找到一個好用的工具 Install Unity Script，而且在 Mac High Sierra (10.13) 可以直接下載使用，不用安裝任何相依套件。 查看支援安裝的版本 ./install-unity.py --packages 看來"
publishedAt: "2018-03-29T12:46:23.000Z"
updatedAt: "2018-03-29T12:46:23.000Z"
legacyPath: "/technical/unity-zai-mac-shang-tong-shi-zhuang-duo-ge-ban-ben-de-unity"
kind: "technical"
tags: ["Install Unity Script", "Mac", "Unity"]
legacyNid: 140
archived: true
---

<p>之前 Unity 官方有提供過解法，概念是更改 Unity 資料夾的名稱，不過之前嘗試過無效。這次再搜尋同樣的關鍵字找到一個好用的工具 <a href="https://github.com/sttz/install-unity">Install Unity Script</a>，而且在 Mac High Sierra (10.13) 可以直接下載使用，不用安裝任何相依套件。</p>

<h3>查看支援安裝的版本</h3>

<pre>
<code class="language-bash">./install-unity.py --packages</code></pre>

<p>看來從 5.0 版以上都有支援可以利用此腳本程式下載、安裝。</p>

<h3>安裝 Unity</h3>

<pre>
<code class="language-bash">./install-unity.py --package Unity VERSIONS</code></pre>

<p>VERSIONS 可支援多個參數，例如可以輸入「2017.1 2017.2 2017.3」就可以同時安裝列出的版本。</p>

<h3>查看 Unity 支援的元件</h3>

<pre>
<code class="language-bash">install-unity.py --packages 2017.1.2</code></pre>

<p>跟第一個指令的差別在於後面加上特定的 Unity 版本，就可以查看該版本提供的支援元件有哪些。</p>

<h3>安裝 Unity 元件</h3>

<pre>
<code class="language-bash">install-unity.py --package iOS --package Android 2017.1.2</code></pre>

<p>這個指令是指要安裝 iOS / Android 的元件，並且設定安裝 2017.1.2 的版本</p>

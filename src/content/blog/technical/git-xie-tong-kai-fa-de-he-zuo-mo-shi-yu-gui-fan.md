---
title: "[Git] 協同開發的合作模式與規範"
description: "本文是基於使用 Git 做為程式庫的前提下，討論程式協同開發的合作模式與相關規範。 Commit 的寫作建議 妥適的 commit 訊息可以讓協作夥伴很快地釐清每次更新的目的與影響範圍，關於如何撰寫好的 commit 有很多文章可以參考，我自己讀的是 How to Write a Git Commit Message [中譯]。不過這類文章只是提供一個「方向"
publishedAt: "2018-03-26T01:37:24.000Z"
updatedAt: "2018-03-26T02:53:58.000Z"
legacyPath: "/technical/git-xie-tong-kai-fa-de-he-zuo-mo-shi-yu-gui-fan"
kind: "technical"
tags: []
legacyNid: 135
archived: true
---

<p>本文是基於使用 Git 做為程式庫的前提下，討論程式協同開發的合作模式與相關規範。</p>

<h3>Commit 的寫作建議</h3>

<p>妥適的 commit 訊息可以讓協作夥伴很快地釐清每次更新的目的與影響範圍，關於如何撰寫好的 commit 有很多文章可以參考，我自己讀的是 <a href="https://chris.beams.io/posts/git-commit/">How to Write a Git Commit Message</a> [<a href="https://blog.louie.lu/2017/03/21/%E5%A6%82%E4%BD%95%E5%AF%AB%E4%B8%80%E5%80%8B-git-commit-message/">中譯</a>]。不過這類文章只是提供一個「方向」，在實作方面，則可以參考 Angular 社群提倡的 <a href="http://commitizen.github.io/cz-cli/">Commitizen</a>，Commitizen 不只是定義寫作規範，更提出一套工具，協助開發者使用既定格式的建議撰寫 commit 訊息，詳細的用法說明可參考「<a href="http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html">Commit message 和 Change log 编写指南</a>」一文。</p>

<p>採用 Commitizen 工具還有另一個好處，就是透過一致的訊息格式，可以在發佈版本時自動產生 change log，例如下圖</p>

<p><img loading="lazy" /><br />
（圖片來源：<a href="http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html">Commit message 和 Change log 编写指南</a>）</p>

<p>如果你是要在非 Node 專案中使用 Commitizen 的話，<a href="https://www.jianshu.com/p/00c9ec4e552e">必須先建立一個空的 package.json，然後輸入下列指令</a></p>

<pre>
<code>commitizen init cz-conventional-changelog --save --save-exact</code></pre>

<p> </p>

<h3>開發流程</h3>

<p>使用 Git 的好處就是可以開很多 branch 來切割工作並且避免相互影響，並以此設計出不同的分支線，來實作出 dev -&gt; staging -&gt; production 的開發流程。</p>

<p>在「<a href="https://medium.com/origino/git-workflow-%E5%96%84%E7%94%A8git%E5%88%86%E6%94%AF%E5%BC%B7%E5%8C%96%E5%B0%88%E6%A1%88%E7%9A%84%E9%96%8B%E7%99%BC%E6%B5%81%E7%A8%8B-c7af53da7b6e">Git Workflow — 善用Git分支強化專案的開發流程</a>」一文中，提到可以根據專案的需求建立以下的分支：</p>

<blockquote>
<p><strong>Master branch</strong>: 主線，該專案的預設分支線。</p>

<p><strong>Develop branch</strong>: 開發線</p>

<p><strong>Feature branches</strong>: 開發新功能的分支，只經由develop branch分支出來，慣例是以新功能的用途命名，當新功能開發完成便會併回develop branch。</p>

<p><strong>Release branches</strong>: 負責專案發布新版本的分支，會經由develop branch分支出來，當該版本的發布完成後會併回develop跟master branch。</p>

<p><strong>Hotfix branches: </strong>當正式版本的產品需要立即解決問題所使用的分支，當緊急修改完成後，該分支就會併回master與release branch，再由release合併到develop去更新緊急修正的部分。</p>
</blockquote>

<p>這樣一來，我們可以根據不同的目標，在不同的分支下處理不同的工作項目，而後再整併到 release 分支，待測試、確認無誤後再合併到 master 分支。而在 git 下的操作指令大略會是</p>

<pre>
<code class="language-bash">$ git checkout master
$ git merge release
$ git tag -a "v0.1"</code></pre>

<p>不過我們目前處理的專案只開 develop 與 master 分支，在實務運用上確實有所侷限，主要是每次要從 develop 合併回 master 時等於是要把所有變更中的工作都處理完畢，這樣無法同時分工處理 release 和 develop，所以如果是先開一個 release 分支只套用要發佈的更新程式，那麼 develop 分支就可以繼續再做開發工作。</p>

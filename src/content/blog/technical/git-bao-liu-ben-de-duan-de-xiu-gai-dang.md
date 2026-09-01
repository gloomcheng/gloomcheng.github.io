---
title: "[Git] 保留本地端的修改檔案"
description: "因為 Django 的設定檔寫在 settings.py 及 wsgi.py 裡，這樣一來 dev / staging / production 應該都會有不同的設定檔，一旦我們需要在 production 下 git pull 來更新程式碼時，又不希望覆蓋掉我們在本地端修改的檔案，就可以用以下指令來解決（不過會發生這種問題應該是流程設計不佳，根本解決方法還"
publishedAt: "2018-01-28T15:26:24.000Z"
updatedAt: "2018-01-28T15:26:24.000Z"
legacyPath: "/technical/git-bao-liu-ben-de-duan-de-xiu-gai-dang"
kind: "technical"
tags: []
legacyNid: 133
archived: true
---

<p>因為 Django 的設定檔寫在 settings.py 及 wsgi.py 裡，這樣一來 dev / staging / production 應該都會有不同的設定檔，一旦我們需要在 production 下 git pull 來更新程式碼時，又不希望覆蓋掉我們在本地端修改的檔案，就可以用以下指令來解決（不過會發生這種問題應該是流程設計不佳，根本解決方法還是要進一步瞭解 Django 的建議開發流程）：</p>

<pre>
<code>
git stash（可以儲存目前修改的檔案到暫存空間，但並不是 commit）

git pull（拉回最新版的程式碼）

git stash pop（還原修改檔案到工作空間）</code></pre>

<p>雖然上述方式可以暫時解決目前的困境，但仍然不是最佳解，比較好的解法應該是新增 template 或是透過 .gitignore 來忽略部分檔案不要更新，只是這樣一來連初始安裝的版本也就沒有應用程式的設定檔，頗傷腦筋。</p>

<p>參考資料：<br />
https://git-scm.com/book/zh-tw/v1/Git-%E5%B7%A5%E5%85%B7-%E5%84%B2%E8%97%8F-Stashing<br />
https://stackoverflow.com/questions/10414769/git-pull-keeping-local-changes</p>

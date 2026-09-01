---
title: "[Debian] Ruby upgrade 1.9.1 from 1.8.7"
description: "本文為工作日誌，應只適用於特殊情境，未必能符合一般情況，請理解。 緣由：日前將 Redmine 從 1.x 升級到 2.x，同時將 ruby 從 1.8.7 升級到 1.9.1 注意：Debian Wheezy 的 ruby 套件依然是 1.8.7，必須安裝 ruby1.9 才會成功安裝 ruby 1.9.1 問題：更新到 ruby1.9 後，原使用 pas"
publishedAt: "2013-12-31T10:22:25.000Z"
updatedAt: "2016-05-19T01:54:45.000Z"
legacyPath: "/technical/debian-ruby-upgrade-191-187"
kind: "technical"
tags: ["Apache2", "Debian", "Redmine", "RoR"]
legacyNid: 77
archived: true
---

<p>本文為工作日誌，應只適用於特殊情境，未必能符合一般情況，請理解。</p>

<p><strong>緣由</strong>：日前將 Redmine 從 1.x 升級到 2.x，同時將 ruby 從 1.8.7 升級到 1.9.1<br />
<strong>注意</strong>：Debian Wheezy 的 ruby 套件依然是 1.8.7，必須安裝 ruby1.9 才會成功安裝 ruby 1.9.1<br />
<strong>問題</strong>：更新到 ruby1.9 後，原使用 passenger 來達成多 RoR 應用程式實體的功能失效，無法啟動 Redmine，看來是需要重新安裝</p>

<p>過程：</p>

<p>[完全移除 Ruby 1.8]<br />
透過下列指令找出所有 ruby 相關的套件<br />
</p><pre>dpkg --get-selections | grep ruby</pre><br />
接著透過下列指令移除 ruby 1.8 相關的套件<br />
<pre>apt-get remove libruby1.8 libxapian-ruby1.8 ruby1.8 ruby1.8-dev rubygems1.8</pre><p></p>

<p>[安裝 ruby 1.9.1 所需的套件]<br />
</p><pre>apt-get install ruby1.9.1 ruby1.9.1-dev libruby1.9.1</pre><p></p>

<p>[重新安裝 passenger]<br />
</p><pre>gem install passenger passenger-install-apache2-module</pre> 然後根據安裝過程的指示，安裝必須的套件或調整 swap 空間，安裝後會指示要更改 passenger.load 與 passenger.conf 檔案內容，接著就可以啟用 passenger 模組並重啟 apache2<br />
<code>a2enmod passenger
service apache2 restart</code><p></p>

<p>[重新設定 Redmine]<br />
因為使用的 bundler 版本不同，基本上原安裝過程所使用的套件都不存在（原安裝的相關套件都是在 ruby 1.8 版本下，這次是重新安裝到 ruby 1.9.1），參考 <a href="http://www.redmine.org/projects/redmine/wiki/RedmineInstall" title="Installing Redmine">Redmine Install</a> 文件來處理即可</p>

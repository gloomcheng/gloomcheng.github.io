---
title: "[Linux] Ubuntu 16 安裝 Postfix (SPF/DKIM)"
description: "首先安裝 Postfix，主要參考下文的 Step 1 Step 3 https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-as-a-send-only-smtp-server-on-ubuntu-16-04 註：可以用 Mailinator"
publishedAt: "2018-01-28T12:54:12.000Z"
updatedAt: "2018-01-28T12:54:12.000Z"
legacyPath: "/technical/linux-ubuntu-16-zhuang-postfix-spfdkim"
kind: "technical"
tags: ["DKIM", "Linux", "Postfix", "SPF", "Ubuntu"]
legacyNid: 132
archived: true
---

<p>首先安裝 Postfix，主要參考下文的 Step 1 ~ Step 3<br />
https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-as-a-send-only-smtp-server-on-ubuntu-16-04</p>

<p>註：可以用 <a href="https://www.mailinator.com/">Mailinator</a> 產生一組測試用的帳號，用來測試 Postfix 的設置是否正確，以及是否有收到寄出的信件</p>

<p>接著，為了讓網頁系統寄出的信件不會被判定為 Spam，再參考下列兩篇文章分別進行 DKIM 的軟體設置及 DKIM 金鑰設置<br />
https://www.linuxbabe.com/mail-server/setting-up-dkim-and-spf<br />
https://linode.com/docs/email/postfix/configure-spf-and-dkim-in-postfix-on-debian-8/#configure-opendkim</p>

<p>設置完之後，必須將 SPF 及 DKIM 的記錄加到 DNS 記錄中</p>

<p> </p>

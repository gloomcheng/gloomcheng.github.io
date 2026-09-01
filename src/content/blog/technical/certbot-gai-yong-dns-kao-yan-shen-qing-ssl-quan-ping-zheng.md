---
title: "[Certbot] 改用 DNS 考驗申請 SSL 安全憑證"
description: "因某間大學防火牆擋 http(80) 通訊埠，導致無法使用 HTTP-01 考驗方式從 Let's Encrypt 申請 SSL 安全憑證 這是現今最常見的一種驗證方式。Let’s Encrypt 給予 ACME 客戶端一個 token，請 ACME 客戶端將包含 token 和帳號金鑰指紋的檔案，放到網頁伺服器中 http:///.well-known/a"
publishedAt: "2022-10-25T05:33:34.000Z"
updatedAt: "2022-10-25T07:10:00.000Z"
legacyPath: "/technical/certbot-gai-yong-dns-kao-yan-shen-qing-ssl-quan-ping-zheng"
kind: "technical"
tags: ["Certbot", "Firewall", "SSL", "Ubuntu"]
legacyNid: 188
archived: true
---

因某間大學防火牆擋 http(80) 通訊埠，導致無法使用 [HTTP-01 考驗方式](https://letsencrypt.org/zh-tw/docs/challenge-types/)從 Let's Encrypt 申請 SSL 安全憑證

```
這是現今最常見的一種驗證方式。Let’s Encrypt 給予 ACME 客戶端一個 token，請 ACME 客戶端將包含 token 和帳號金鑰指紋的檔案，放到網頁伺服器中 http:///.well-known/acme-challenge/ 的位置。當 ACME 客戶端通知 Let’s Encrypt 這個檔案已經放置完成，Let’s Encrypt 就會試著取得它（可能會從多個主機嘗試取得數次）。如果我們能從你的網頁伺服器取得檔案並驗證其內容，你就通過了這個考驗，你可以接著向我們申請憑證頒發。如果我們的驗證失敗，你就必須重來一次。

我們驗證 HTTP-01 時，接受最多 10 次重新導向，並且只接受從 “http:” 導向到 “https:” 與通訊埠 80 導向到通訊埠 443，不接受 IP 位址的重新導向。當我們被重新導向到 HTTPS 後，我們不會驗證憑證是否有效（因為驗證的目的是申請有效憑證，所以可能會遇到自簽憑證或是過期憑證）。

HTTP-01 只能只能透過通訊埠 80 來完成；讓 ACME 客戶端使用任意通訊埠進行驗證，可能會導致安全性問題，所以 ACME 標準中不允許這樣的驗證行為。

優點：

在不需要了解設定網域的額外知識下，輕鬆的完成自動驗證
允許主機或服務提供業者透過 CNAME 紀錄申請憑證
適用於多數現成的網頁伺服器
缺點：

如果你的網路服務業者 (ISP) 阻擋通訊埠 80（這種情況很少見，但有些住宅區的 ISP 會這麼做）那麼你就無法使用這個方式驗證
Let’s Encrypt 不允許你使用這種驗證方式頒發萬用憑證
如果你有很多個網頁伺服器，你必須確保驗證檔案在各個伺服器上
```

這時就可以改用 DNS-01 考驗方式，來取得 SSL 安全憑證。以下是在 Ubuntu 20 環境下的作法：

1. 安裝 certbot (python3)

在 Certbot 官網上，預設會建議 Ubuntu 要安裝 snap 版的 certbot，但為了改用 DNS-01 考驗，建議改裝 python3 版本的 certbot [^1]。

首先，安裝 python3 及相依的套件

```
sudo apt update
sudo apt install python3 python3-venv libaugeas0
```

接著，建立 python3 的虛擬環境，並安裝 certbot

```
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
```

安裝 certbot

```
sudo /opt/certbot/bin/pip install certbot
sudo rm /usr/bin/certbot (如果先前用 snap 安裝產生的軟連結還在的話)
sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot
```

2. 安裝 DNS-01 考驗的外掛

不同的 DNS 服務商，會需要使用不同的 DNS-01 考驗的外掛 (plugin)，此次以 Gandi DNS[^2] 為例：

```
/opt/certbot/bin/pip install certbot-plugin-gandi
```

接著，要到 Gandi 申請 API Key，並準備 `gandi.ini` 檔案，一般只需要 `certbot_plugin_gandi:dns_api_key` 這行就好

```
# live dns v5 api key
certbot_plugin_gandi:dns_api_key=APIKEY

# optional organization id, remove it if not used
certbot_plugin_gandi:dns_sharing_id=SHARINGID
```

之後就可以重新申請 SSL 安全憑證了

```
certbot certonly -a certbot-plugin-gandi:dns --certbot-plugin-gandi:dns-credentials gandi.ini -d domain.com
```

[^1]: https://certbot.eff.org/instructions?ws=other&amp;os=pip
[^2]: https://github.com/kalemontes/certbot-plugin-gandi

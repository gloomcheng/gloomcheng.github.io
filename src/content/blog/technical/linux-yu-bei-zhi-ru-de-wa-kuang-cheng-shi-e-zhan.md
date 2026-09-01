---
title: "[Linux] 與被植入的挖礦程式惡戰"
description: "最近學校的一台主機經常飆高 CPU，一開始追查發現原來是被塞入了一隻惡意程式，用途是在挖礦的。在資訊工程師生涯近十年來，首次看到被塞入的程式居然不太惡意，純粹只是會佔用主機資源而已，著實令人驚奇！ 簡單記錄一下幾個比較關鍵的點，提供搜尋到這篇文章的人參考。 如果被入侵的話，在 /tmp 資料夾下會發現 aiox86 與 .XO-lock 與 .X1-lock"
publishedAt: "2018-04-25T05:00:33.000Z"
updatedAt: "2020-02-15T04:56:48.000Z"
legacyPath: "/technical/linux-yu-bei-zhi-ru-de-wa-kuang-cheng-shi-e-zhan"
kind: "technical"
tags: ["Linux", "Security"]
legacyNid: 142
archived: true
---

<p>最近學校的一台主機經常飆高 CPU，一開始追查發現原來是被塞入了一隻惡意程式，用途是在挖礦的。在資訊工程師生涯近十年來，首次看到被塞入的程式居然不太惡意，純粹只是會佔用主機資源而已，著實令人驚奇！</p>

<p>簡單記錄一下幾個比較關鍵的點，提供搜尋到這篇文章的人參考。</p>

<ol>
	<li>如果被入侵的話，在 /tmp 資料夾下會發現 <strong>aiox86 與 .XO-lock</strong> <strong>與</strong> <strong>.X1-lock 與 .XO-lock 與 .jnks/chron-34e2fg</strong> 等檔案、程式</li>
	<li>這隻程式會透過 53 port 到特定 IP 取回一隻叫 a.sh 的程式並執行它</li>
	<li><s>這隻程式似乎有竄改 apache  程式（不是很肯定，只是從 /var/log/apache2/error.log 看到 apache 執行會直接出現錯誤），建議還是移除並重裝最新版的 apache</s></li>
	<li>這隻程式會以 www-data 身分改寫 crontab，設定每 15 秒就會到網路上抓 a.sh 並執行</li>
	<li>程式開發者設定，只要存在「<strong>/usr/share/man/11.gz</strong>」這個檔案就不會執行該程式 XD</li>
</ol>

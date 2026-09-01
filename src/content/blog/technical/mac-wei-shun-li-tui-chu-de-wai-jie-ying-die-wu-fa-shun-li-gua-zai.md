---
title: "[Mac] 未順利退出的外接硬碟無法順利掛載"
description: "經常遇到這個問題，記錄一下解決方法。 diskutil unmountDisk /dev/disk2 diskutil eject /dev/disk2 diskutil mountDisk /dev/disk2"
publishedAt: "2018-04-01T16:57:20.000Z"
updatedAt: "2018-04-01T16:57:20.000Z"
legacyPath: "/technical/mac-wei-shun-li-tui-chu-de-wai-jie-ying-die-wu-fa-shun-li-gua-zai"
kind: "technical"
tags: ["Mac"]
legacyNid: 141
archived: true
---

<p>經常遇到這個問題，記錄一下<a href="https://apple.stackexchange.com/questions/235309/external-drive-does-not-mount-after-plug-off-without-eject">解決方法</a>。</p>

<pre>
<code class="language-bash">diskutil unmountDisk /dev/disk2
diskutil eject /dev/disk2
diskutil mountDisk /dev/disk2</code></pre>

<p> </p>

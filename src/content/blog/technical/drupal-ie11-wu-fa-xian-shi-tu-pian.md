---
title: "[Drupal] IE11 無法顯示圖片"
description: "現在開發網頁已經很少為了 IE 特別調整什麼了，除非是在公務機關環境，偶爾還是會遇到在使用舊版 IE 的現象。不過這次的問題是發生在 IE11 無法顯示圖片。 首先，我把苗頭放在 Image Style 後產生的 itok，找到「Some images are not displayed in IE [closed]」文章，解法看來是要從伺服器端下手，不過因"
publishedAt: "2017-03-14T04:32:16.000Z"
updatedAt: "2018-05-14T04:05:19.000Z"
legacyPath: "/technical/drupal-ie11-wu-fa-xian-shi-tu-pian"
kind: "technical"
tags: ["Drupal 7", "IE11", "ImageCache Actions", "MIME"]
legacyNid: 116
archived: true
---

<p>現在開發網頁已經很少為了 IE 特別調整什麼了，除非是在公務機關環境，偶爾還是會遇到在使用舊版 IE 的現象。不過這次的問題是發生在 IE11 無法顯示圖片。</p>

<p>首先，我把苗頭放在 Image Style 後產生的 itok，找到「<a href="http://drupal.stackexchange.com/questions/192742/some-images-are-not-displayed-in-ie">Some images are not displayed in IE [closed]</a>」文章，解法看來是要從伺服器端下手，不過因為主機放在學校資訊中心，若非必要，實在不想求助資訊中心。</p>

<p>如果是改 header 可以解決，那修改 Drupal Core 看來也可能是選項之一，然後找到「<a href="http://blog.merge.nl/drupal-broken-images-convert-png-extension-nosniff-header">Internet Explorer, MIME sniffing and broken images</a>」，仔細研讀後才知道無法正確顯示圖片的正確原因為何。</p>

<p>因為我使用了 ImageCache Actions 模組，想做出有圓角效果的縮圖，但為了要有圓角效果，所以得先把圖片轉成 .png 格式，才能套用圓角效果。這樣的做法隱藏了造成 IE11 無法顯示圖片的原因，而這個原因其實一開始模組操作畫面就有說明了，只是一直沒有細讀說明。</p>

<p>之所以 IE11 不能正確顯示圖片，其原因是，為了要讓 .jpg 圖檔可以套用圖片樣式的效果，必須把圖像格式轉換為 .png，而在這個過程中，ImageCache Actions 模組只是改變圖片內容，而未改變圖檔的副檔名，也就是說，套用圖片樣式後產生的縮圖，會發生檔名為 .jpg 的圖像但卻是採用 .png 的格式。</p>

<blockquote>
<p>If you've been using transparencies in the process, the result may get saved as a PNG (as the image was treated as a one in in-between processes). If this is not desired (file sizes may get too big) you should use this process to force a flatten action before saving. For technical reasons, changing the file format within imagecache does <em>not</em> change the filename suffix. A png may be saved as a *.jpg or vice versa. This may confuse some browsers and image software, but most of them have no trouble.</p>
</blockquote>

<p>因此，這會使某些瀏覽器產生混淆，無法正確顯示圖片。雖然 Firefox / Chrome / Safari 這些瀏覽器都沒問題，但就是 IE11 會出問題。根據上文「<a href="http://blog.merge.nl/drupal-broken-images-convert-png-extension-nosniff-header">Internet Explorer, MIME sniffing and broken images</a>」的作者建議，直接改掉 .htaccess 的 header 設定即可，不過這行設定原本是在防堵 XSS 攻擊的，而且要改 .htaccess 必須要請資訊中心的工作人員協助，非最佳選項。最後，則是採用不套用圓角效果的方案來改善這個問題。</p>

<p>結案。</p>

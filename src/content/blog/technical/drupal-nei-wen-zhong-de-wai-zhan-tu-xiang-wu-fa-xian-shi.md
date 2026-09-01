---
title: "[Drupal] 內文中的外站圖像無法顯示"
description: "如果你看到內文圖像無法顯示，並且圖像標題顯示 This image has been removed. For security reasons, only images from the local domain are allowed. 那應該就是文字格式裡不小心啟用了 Restrict images to this site 的選項，所以把外部圖像過濾"
publishedAt: "2021-09-26T03:51:13.000Z"
updatedAt: "2021-10-21T15:46:50.000Z"
legacyPath: "/technical/drupal-nei-wen-zhong-de-wai-zhan-tu-xiang-wu-fa-xian-shi"
kind: "technical"
tags: ["Drupal 8", "Drupal 9"]
legacyNid: 179
archived: true
---

如果你看到內文圖像無法顯示，並且圖像標題顯示
```
This image has been removed. For security reasons, only images from the local domain are allowed.
```

那應該就是文字格式裡不小心啟用了 **Restrict images to this site** 的選項，所以把外部圖像過濾掉了，關閉此過濾器就好了。

![Text format](https://i.stack.imgur.com/PmFQE.png)
Ref: [How do I override the "This image has been removed" message?](https://drupal.stackexchange.com/questions/160637/how-do-i-override-the-this-image-has-been-removed-message)

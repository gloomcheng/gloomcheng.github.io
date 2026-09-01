---
title: "[QNAP] API 登入認證"
description: "去年中嘗試用 QNAP 旗下的 QVR Pro 作為監控系統，並透過他們提供的 API，來取得 QVR Pro 的錄影內容。 雖然 API 設計的還算完善，不過其中對於登入認證的部分，就顯得說明不完整，不管怎麼試就是無法成功登入並取得 session id。後來在 API for QNAP QTS Authentication 這份文章中找到端倪，原來是密碼"
publishedAt: "2021-01-20T12:26:38.000Z"
updatedAt: "2021-01-20T12:38:08.000Z"
legacyPath: "/technical/qnap-api-dengrurenzheng"
kind: "technical"
tags: ["QNAP"]
legacyNid: 165
archived: true
---

去年中嘗試用 QNAP 旗下的 [QVR Pro](https://www.qnap.com/zh-tw/software/qvr-pro) 作為監控系統，並透過他們提供的 API，來取得 QVR Pro 的錄影內容。

雖然 API 設計的還算完善，不過其中對於登入認證的部分，就顯得說明不完整，不管怎麼試就是無法成功登入並取得 session id。後來在 [API for QNAP QTS Authentication](https://download.qnap.com/dev/API_QNAP_QTS_Authentication.pdf) 這份文章中找到端倪，原來是密碼的部分還需要透過 [get_sid.js](http://eu1.qnap.com/Storage/SDK/get_sid.js) 程式轉換。

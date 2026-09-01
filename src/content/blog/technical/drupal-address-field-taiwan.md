---
title: "[Drupal] Address field for Taiwan"
description: "近期在執行的電子商城網站，因有填寫地址的需求，因此稍微研究一下 Address Field 模組，並擴展其功能，寫了一個 Address Field Taiwan 的模組（目前還是 sandbox 階段）。這模組主要功能就是將地址格式改成「縣市」、「鄉鎮市區」、「郵遞區號」、「地址」等熟悉填寫的格式，並且將前三者設為互相連動，也就是只要下拉選取縣市、鄉鎮市區"
publishedAt: "2013-02-04T13:03:03.000Z"
updatedAt: "2013-02-04T13:05:16.000Z"
legacyPath: "/technical/drupal-address-field-taiwan"
kind: "technical"
tags: ["Commerce", "Drupal 7", "Module development"]
legacyNid: 62
archived: true
---

<p>近期在執行的電子商城網站，因有填寫地址的需求，因此稍微研究一下 <a title="Addressfield module" href="http://drupal.org/project/addressfield">Address Field</a> 模組，並擴展其功能，寫了一個 <a title="Address Field Taiwan module" href="http://drupal.org/sandbox/gloomcheng/1872126">Address Field Taiwan</a> 的模組（目前還是 sandbox 階段）。</p><p>這模組主要功能就是將地址格式改成「縣市」、「鄉鎮市區」、「郵遞區號」、「地址」等熟悉填寫的格式，並且將前三者設為互相連動，也就是只要下拉選取縣市、鄉鎮市區後，就會自動填入對應的郵遞區號。</p><p>我已經送出建立專案的申請，但因為程式碼撰寫方式不符合標準寫法，還在修改中，不知道何時才會改完；所以<span>有興趣試用的，請到 <a title="Source code for addressfield_tw module" href="http://drupalcode.org/sandbox/gloomcheng/1872126.git">http://drupalcode.org/sandbox/gloomcheng/1872126.git</a> 下載。</span></p>

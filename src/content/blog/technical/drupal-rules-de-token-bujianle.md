---
title: "[Drupal] Rules 的 token 不見了？"
description: "雖然用 Drupal 8/9 也有幾年的時間，但越來越少有機會用到 Rules，不知道原來 Rules 裡面應該無法直接使用 token 了。遇到此問題，最直覺蹦出來的想法，就是應該會有其他的模組可以解決吧，於是找了 Rules Token 試試看，但效果不如預期。 後來再重新搜尋一次資料，這才發現原來是 Rules 現在支援使用 twig 語法來取得 to"
publishedAt: "2021-07-22T04:53:58.000Z"
updatedAt: "2021-07-22T04:59:30.000Z"
legacyPath: "/technical/drupal-rules-de-token-bujianle"
kind: "technical"
tags: ["Drupal 8", "Drupal 9", "Rules"]
legacyNid: 174
archived: true
---

雖然用 Drupal 8/9 也有幾年的時間，但越來越少有機會用到 Rules，不知道原來 Rules 裡面應該無法直接使用 token 了。遇到此問題，最直覺蹦出來的想法，就是應該會有其他的模組可以解決吧，於是找了 [Rules Token](https://www.drupal.org/project/rules_token) 試試看，但效果不如預期。

後來再重新搜尋一次資料，這才發現原來是 Rules 現在支援使用 twig 語法來取得 token 值，也就是說，只要把原本的 `[node:title]` 改成 `{{ node.title }}` 就好了。

Ref: [Changes to Rules in Drupal 8](https://www.drupal.org/docs/contributed-modules/d8-rules-essentials/changes-to-rules-in-drupal-8)

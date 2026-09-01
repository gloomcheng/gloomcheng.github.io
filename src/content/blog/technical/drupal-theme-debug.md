---
title: "[Drupal] Theme debug"
description: "在 sites/default/services.yml 填入以下內容 parameters: twig.config: debug : true autoreload: true cache: false"
publishedAt: "2021-07-30T06:11:01.000Z"
updatedAt: "2021-07-30T06:12:33.000Z"
legacyPath: "/technical/drupal-theme-debug"
kind: "technical"
tags: ["Drupal 8", "Drupal 9", "Theme"]
legacyNid: 175
archived: true
---

在 `sites/default/services.yml` 填入以下內容

```
parameters:
  twig.config:
    debug : true
    auto_reload: true
    cache: false
```

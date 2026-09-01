---
title: "[Drupal] Bootstrap 4 下拉選單改用 hover 作動"
description: "之前在 [Drupal] Bootstrap 下拉選單提過將 click 下拉選單改成 hover 下拉選單，但只適用於 Bootstrap 3。 以下是適用 Bootstrap 4.1.2 以上的作法 [1] javascript function toggleDropdown (e) { const d = $(e.targe"
publishedAt: "2021-01-06T16:51:34.000Z"
updatedAt: "2021-01-20T12:39:18.000Z"
legacyPath: "/technical/drupal-bootstrap-4-xialaxuandangaiyong-hover-zuodong"
kind: "technical"
tags: ["Bootstrap 4", "Drupal 8", "Radix"]
legacyNid: 162
archived: true
---

之前在 [[Drupal] Bootstrap 下拉選單](/blog/technical/drupal-bootstrap-xia-la-xuan-dan/) 提過將 click 下拉選單改成 hover 下拉選單，但只適用於 Bootstrap 3。

以下是適用 Bootstrap 4.1.2 以上的作法 [[1](https://stackoverflow.com/a/42183824)]

```javascript
function toggleDropdown (e) {
  const _d = $(e.target).closest('.dropdown'),
    _m = $('.dropdown-menu', _d);
  setTimeout(function(){
    const shouldOpen = e.type !== 'click' && _d.is(':hover');
    _m.toggleClass('show', shouldOpen);
    _d.toggleClass('show', shouldOpen);
    $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
  }, e.type === 'mouseleave' ? 300 : 0);
}

$('body')
  .on('mouseenter mouseleave','.dropdown',toggleDropdown)
  .on('click', '.dropdown-menu a', toggleDropdown);
```

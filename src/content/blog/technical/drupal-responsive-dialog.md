---
title: "[Drupal] Responsive Dialog"
description: "在 Drupal 8/9 可以用 OpenDialogCommand Class 來實作 Dialog 或 Modal Dialog。 但要怎麼讓 Dialog 可以因應載具尺寸自動調整呢？例如電腦版下最多 700px 的大小、而在手機版底下則變成滿版。在網路上搜尋到的範例，大多是 $response->addCommand(new OpenModalDia"
publishedAt: "2022-05-05T14:53:07.000Z"
updatedAt: "2022-05-05T15:19:50.000Z"
legacyPath: "/technical/drupal-responsive-dialog"
kind: "technical"
tags: ["Ajax API", "Drupal 8", "Drupal 9"]
legacyNid: 182
archived: true
---

在 Drupal 8/9 可以用 [OpenDialogCommand](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Ajax%21OpenDialogCommand.php/class/OpenDialogCommand/8.2.x) Class 來實作 Dialog 或 Modal Dialog。

但要怎麼讓 Dialog 可以因應載具尺寸自動調整呢？例如電腦版下最多 700px 的大小、而在手機版底下則變成滿版。在網路上搜尋到的範例，大多是
```
$response->addCommand(new OpenModalDialogCommand($title, $content, ['width' => '700']));
```
其中，width 值所佔用的參數其實就是 [`$dialogOptions`](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Ajax%21OpenDialogCommand.php/property/OpenDialogCommand%3A%3AdialogOptions/8.8.x)，透過文件可以得知 `$dialogOptions` 可以直接使用 jQuery UI Dialog 支援使用的 Options[^1]，包括：

```
appendTo
autoOpen
buttons
classes
closeOnEscape
closeText
dialogClass
draggable
height
hide
maxHeight
maxWidth
minHeight
minWidth
modal
position
resizable
show
title
width
```

既然 jQuery UI Dialog 有提供 maxWidth 的參數，那最直覺的解法就是設定
```
$dialogOptions = ['width' => 700, 'maxWidth' => '100%'];
```
但實際套用後，會發現其實 Dialog 並沒有如預期般在手機版變成 100% 的寬度。

於是，便轉換下思維方向，改成找 `jQuery UI Dialog responsive` 關鍵字，果不其然就找到一個 jQuery UI Dialog 說明文件中不存在的神秘參數 **`fluid`**[^2]，再搭配 width / maxWidth 的設定，就可以成功達到 Responsive jQuery UI Dialog 的效果了。
```
$dialogOptions = [
    width: 'auto', // overcomes width:'auto' and maxWidth bug
    maxWidth: 700,
    height: 'auto',
    fluid: true, //new option
];
```

[^1]: [Dialog Widget](https://api.jqueryui.com/dialog/)
[^2]: [Responsive jQuery UI Dialog ( and a fix for maxWidth bug )](https://stackoverflow.com/a/16471891)

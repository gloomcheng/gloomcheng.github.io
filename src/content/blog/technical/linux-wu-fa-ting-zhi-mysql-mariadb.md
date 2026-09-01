---
title: "[Linux] 無法停止 MySQL / MariaDB"
description: "在進行 Debian 作業系統升級時，由於 MariaDB 鎖定在 10.1 的版本，然後升級過程又安裝了 10.5 的版本，造成衝突。於是，原本是要將 sudo apt purge mariadb-server-10.1 移除，但在移除過程中因為 Stopping MariaDB database server: mysqld failed! 卡住而無法順"
publishedAt: "2023-02-04T11:39:38.000Z"
updatedAt: "2023-02-04T11:47:21.000Z"
legacyPath: "/technical/linux-wu-fa-ting-zhi-mysql-mariadb"
kind: "technical"
tags: ["Debian", "Linux", "MariaDB", "MySQL"]
legacyNid: 191
archived: true
---

在進行 Debian 作業系統升級時，由於 MariaDB 鎖定在 10.1 的版本，然後升級過程又安裝了 10.5 的版本，造成衝突。於是，原本是要將 `sudo apt purge mariadb-server-10.1` 移除，但在移除過程中因為 `Stopping MariaDB database server: mysqld failed!` 卡住而無法順利移除。

一般的解決方法是 `sudo service mysql stop` 就可以了，但如果你也遇到用盡大部分的方法都無法停止 mysql 服務的情況，可以改用以下的指令：

```
$ sudo mysqladmin -u root -p shutdown
```

Ref: [Ubuntu can't stop mysqld](https://stackoverflow.com/a/53530564 "Ubuntu can't stop mysqld")

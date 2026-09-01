---
title: "[Linux] 更改 MySQL/MariaDB 的登入驗證方式"
description: "如果是早期安裝的 Debian，預設安裝 MySQL 時都會需要設定 mysql root 的密碼，並且都是以 mysql -u root -p 再輸入密碼的方式登入 mysql client。 後期的 MySQL/MariaDB 則是改成提供 unixsocket 的登入機制，意思就是你可以改用 sudo mysql 就直接登入 mysql client "
publishedAt: "2023-02-04T12:04:24.000Z"
updatedAt: "2023-02-04T12:10:33.000Z"
legacyPath: "/technical/linux-geng-gai-mysqlmariadb-de-deng-ru-yan-zheng-fang-shi"
kind: "technical"
tags: ["Debian", "Linux", "MariaDB", "MySQL"]
legacyNid: 192
archived: true
---

如果是早期安裝的 Debian，預設安裝 MySQL 時都會需要設定 mysql root 的密碼，並且都是以 `mysql -u root -p` 再輸入密碼的方式登入 mysql client。

後期的 MySQL/MariaDB 則是改成提供 `unix_socket` 的登入機制，意思就是你可以改用 `sudo mysql` 就直接登入 mysql client 而不需要再另外輸入 mysql root 的密碼。

以下是將輸入密碼 `mysql_native_password` 的機制改成 `unix_socket` 的方法。

*改用 unix_socket*

```
> ALTER USER root@localhost IDENTIFIED VIA unix_socket;
```
*改用 mysql_native_password*

```
> ALTER USER root@localhost IDENTIFIED VIA mysql_native_password;
> SET PASSWORD = PASSWORD('foo');
```

詳細說明可參考 [Authentication Plugin - Unix Socket](https://mariadb.com/kb/en/authentication-plugin-unix-socket/)

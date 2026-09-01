---
title: "[QNAP] SSH 金錀登入"
description: "因為 QNAP 的 authorizedkeys 的設置位置比較特別，所以特別留個記錄。 1. 上傳金錀檔案 bash scp idrsa.pub admin@ClientIPAddress /etc/config/ssh/ 2. 寫入 authorizedkeys 檔案 bash cat idrsa.pub >> authorizedkeys 完整說明可參"
publishedAt: "2021-01-20T12:20:52.000Z"
updatedAt: "2021-01-20T12:25:54.000Z"
legacyPath: "/technical/qnap-ssh-jinlundengru"
kind: "technical"
tags: ["Back-end", "QNAP"]
legacyNid: 164
archived: true
---

因為 QNAP 的 authorized_keys 的設置位置比較特別，所以特別留個記錄。

1. 上傳金錀檔案
```bash
scp id_rsa.pub admin@ClientIPAddress /etc/config/ssh/
```

2. 寫入 authorized_keys 檔案
```bash
cat id_rsa.pub >> authorized_keys
```

完整說明可參閱 [SSH: How To Set Up Authorized Keys](https://wiki.qnap.com/wiki/SSH:_How_To_Set_Up_Authorized_Keys)

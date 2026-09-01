---
title: "[VSCode] 用 Visual Studio Code 直接編輯遠端檔案"
description: "20200402 更新：現在有 Visual Studio Code Remote - SSH 套件可以直接編修遠端主機的檔案，可參考此文 平常已經習慣使用 Terminal + VIM 的工作方式，直接連線到遠端編輯檔案，對我來說，大概就是把 Terminal 環境設置好，以及使用 SSH Key 直接登入主機，就省去不少麻煩。雖然這樣的工作方式對我來說很"
publishedAt: "2018-10-18T06:04:18.000Z"
updatedAt: "2021-09-26T04:11:50.000Z"
legacyPath: "/technical/vscode-yong-visual-studio-code-zhi-jie-bian-ji-yuan-duan-dang"
kind: "technical"
tags: ["Code", "Remote", "Visual Studio Code", "VSCode"]
legacyNid: 148
archived: true
---

**20200402 更新：現在有 Visual Studio Code Remote - SSH 套件可以直接編修遠端主機的檔案，可參考[此文](https://www.footmark.info/software/editor/vscode-remote-ssh-linux-folder/)**

平常已經習慣使用 Terminal + VIM 的工作方式，直接連線到遠端編輯檔案，對我來說，大概就是把 Terminal 環境設置好，以及使用 SSH Key 直接登入主機，就省去不少麻煩。雖然這樣的工作方式對我來說很方便，不過最近需要跟一位前端設計師合作套版，思索了一下，覺得這樣的工作方式應該會造成設計師困擾，因此就開始找尋可以直接在本地編輯檔案的方法。

當然，一般來說，用 FileZilla 或 WinSCP 這類工作就可以用透過 SSH 登入遠端主機，並把遠端檔案下載到本機，在編輯後再重新上傳到遠端主機，這樣的工作模式其實也沒什麼不好。但，考量到現在使用 [Sass/SCSS](https://blog.kdchang.cc/2016/10/11/sass-scss-tutorial-introduction/) 的前端開發環境大多需要結合 gulp 同時開 node.js 執行開發環境，以便讓開發者可以看到即時的 Sass 編譯結果，所以還是需要讓前端設計師開始學習新的協同合作模式。

近期因為偏好使用 Visual Studio Code（後簡稱 VSCode），所以就直接找可以用 VSCode 遠端修改程式的功能，果不其實還真的有，工程師面臨的問題果然都是相同的，可以想到的解決途徑也都很相似。要讓 VSCode 可以編輯遠端檔案，必須分別在本機端和遠端主機進行下列工作：

- 本機端：安裝 [Remote VSCode](https://marketplace.visualstudio.com/items?itemName=rafaelmaiolla.remote-vscode) 套件（看部分說明文件說需要設定 User config，不過我實際上沒有這個步驟），然後在 ~/.ssh/config 加上

```
Host *
    ForwardAgent yes
    RemoteForward 52698 127.0.0.1:52698
```

- 遠端主機：安裝 rmate（有 [多種選擇](https://marketplace.visualstudio.com/items?itemName=rafaelmaiolla.remote-vscode)，下面以 bash 為例）

```
sudo wget -O /usr/local/bin/rcode https://raw.github.com/aurora/rmate/master/rmate
sudo chmod a+x /usr/local/bin/rcode
```

設置好工作環境後，接著就可以在 VSCode 按 Command + P，並在跳出的 Command Palette 輸入「 Remote: Start Server」，然後在 VSCode 編輯器畫面下方就會有「終端機」的畫面，可以按一般 Terminal 的操作方式，登入到遠端主機、切換目錄等，唯一不同的是，當要編輯檔案時，要改用以下指令

```
code FILENAME
```

這樣就會以 VSCode 打開該遠端檔案並編輯，當你編輯完後儲存，其儲存行為就會直接更新遠端檔案，而不必像 FileZilla/WinSCP 般還要先把遠端檔案下載到本機後再重新上傳。

如果想多瞭解如何安裝、操作，可參考：

- [使用 Visual Studio Code 進行遠端檔案編輯](https://tzuchiehhung.github.io/2018/02/25/RemoteVSCode/)（中文）
- [Remote File Editing Over SSH with Visual Studio Code](https://spin.atomicobject.com/2017/12/18/remote-vscode-file-editing/)（英文）

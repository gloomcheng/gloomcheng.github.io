---
title: "[Drupal] 建立多步驟表單"
description: "針對較為複雜的表單結構（像是申請表單、問卷），通常會將表單拆成多個步驟供網友填寫，一來是頁面不致太長，二來是稍稍減低網友的抗拒意識（是否有效我很懷疑）。在 Drupal 7 若要實現多步驟表單，只需安裝 Field Group 模組即可，設定上也相當簡易，只是若沒參考說明文件的話就搞不懂怎麼設定。其實 Field Group 就是以 Group 欄位來當成不"
publishedAt: "2012-08-22T14:26:30.000Z"
updatedAt: "2012-08-22T14:27:09.000Z"
legacyPath: "/technical/drupal-jian-li-duo-bu-zhou-biao-dan"
kind: "technical"
tags: ["Drupal 7", "Front-end"]
legacyNid: 50
archived: true
---

<p>針對較為複雜的表單結構（像是申請表單、問卷），通常會將表單拆成多個步驟供網友填寫，一來是頁面不致太長，二來是稍稍減低網友的抗拒意識（是否有效我很懷疑）。</p><p>在 Drupal 7 若要實現多步驟表單，只需安裝 <a title="Field Group module" href="http://drupal.org/project/field_group">Field Group</a> 模組即可，設定上也相當簡易，只是若沒參考說明文件的話就搞不懂怎麼設定。其實 Field Group 就是以 Group 欄位來當成不同步驟的區別，如下所示（或參考<a title="Field Group description image" href="http://drupal.org/files/images/fieldgroup_03.png">模組說明圖</a>）：</p><p>- Field Group Holder（必須，整個表單的最外層）<br />-- Field Group Step 1<br />--- Field Question 1<br />--- Field Question 2<br />-- Field Group Step 2<br />--- Field Question 3<br />--- Field Question 4<br />--- Field Question 5<br />--- ...</p><p>這樣雖然可以達成多步驟表單的建置需求，但卻有許多易用性的問題。例如：只能上一步、下一步，無法直接跳步驟，像是從步驟四跳到步驟二；利用 jQuery 來重新繪製表單，所以 render 時較花時間。此時就需要安裝 <a title="Multistep module" href="http://drupal.org/project/multistep">Multistep</a> 模組來改善易用性的問題（D6 的多步驟表單則只需安裝此模組即可）。</p><p>啟用此模組後，只需回到欄位設定的頁面，並改 Group field 的類型改成 multistep 即可（此處須注意，使用 multistep 並不需最外層，也就是 Field Group Holder），再次檢視建立節點表單時，可發現表單的網址結構已改寫，在最末端會加上 step=1 之類；同時在 Block 設定頁面，會多出一個 multistep 的區塊，將此區塊加入內容中，即可多出各步驟的提示及連結，也就是直接跳步驟的功能。</p><p>至此，表單易用性看來已有改善。不過，冗長的表單通常也就表示需要花費較多的時間來填寫，在填寫過程中網友可能會需要進行多次儲存（不然網路突然斷線的話怎麼辦）。但是 Drupal 的驗證機制相當麻煩，只要按下「儲存」鈕後即會驗證所有必填欄位，也就是假設您目前正填寫到第二步驟，想儲存表單喘口氣，但因為表單驗證後查到步驟三、步驟四仍有必填欄位須填寫，因而無法通過驗證，也就無法成功儲存表單。</p><p>開發 Multistep 模組的作者的另一個作品可完美地解決此問題，<a title="Required for Publishing module" href="http://drupal.org/project/required_for_pub/">Required for Publihsing</a> 模組，如字詞意思一般，也就是在「發佈」前才檢查必填欄位是否已填。可惜的是，此模組尚未發佈 D7 的專用版本，雖然花費許多時間找尋其他替代方案，卻一無所獲，只好繼續等待作者發佈 D7 的版本囉。</p>

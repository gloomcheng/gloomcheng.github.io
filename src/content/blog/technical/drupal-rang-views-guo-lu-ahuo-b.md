---
title: "[Drupal] 讓 Views 過濾 A「或」B"
description: "Drupal 果然是個怪東西，什麼怪怪的需求都有機會找到已經被實作出來的模組。我的需求是要讓「上下文過濾器」（contextual filter）可以使用「OR」的功能，跟 Views Or 提供的功能不太相同。 概況簡單的說，就是我用兩個參照使用者（user reference）的欄位來抓所有相關的內容，像下表這樣的關聯性： 內容類型 參照使用者的欄位 A"
publishedAt: "2016-05-19T02:30:07.000Z"
updatedAt: "2017-03-14T04:07:28.000Z"
legacyPath: "/technical/drupal-rang-views-guo-lu-ahuo-b"
kind: "technical"
tags: ["Contextual Filters OR", "Drupal 7", "Views"]
legacyNid: 109
archived: true
---

<p>Drupal 果然是個怪東西，什麼怪怪的需求都有機會找到已經被實作出來的模組。我的需求是要讓「上下文過濾器」（contextual filter）可以使用「OR」的功能，跟 <a href="https://www.drupal.org/project/views_or">Views Or</a> 提供的功能不太相同。</p>

<p>概況簡單的說，就是我用兩個參照使用者（user reference）的欄位來抓所有相關的內容，像下表這樣的關聯性：</p>

<table>
	<thead>
		<tr>
			<th scope="col">內容類型</th>
			<th scope="col">參照使用者的欄位</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="rtecenter">A</td>
			<td class="rtecenter" rowspan="3">F1</td>
		</tr>
		<tr>
			<td class="rtecenter">B</td>
		</tr>
		<tr>
			<td class="rtecenter">C</td>
		</tr>
		<tr>
			<td class="rtecenter">D</td>
			<td class="rtecenter" rowspan="2">F2</td>
		</tr>
		<tr>
			<td class="rtecenter">E</td>
		</tr>
	</tbody>
</table>

<p>在 Views 中，會在「過濾條件」篩出 A / B / C / D / E 五種內容類型；接著，我希望能夠輸入 uid 之後就可以列出跟該位使用者相關的所有內容，所以我在「上下文過濾器」加入 F1 / F2 兩個欄位。</p>

<p>這樣設定後，當在「Preview with contextual filters」輸入「1509」（也就是 uid 為 1509），只會列出 A/B/C 三種內容類型的資料；如果輸入「1509/1509」則會顯示為空。進一步追查就會發現，這是因為 SQL query 的內容是去搜尋 F1 AND F2 的資料，當然會是空的，因為要同時 F1 和 F2 都是 1509 的內容根本不存在（A / B / C 沒有 F2 的值、D / E 沒有 F1 的值，所以不會同時有符合 F1 和 F2 值都有的內容），既然如此，就是找看看有沒有可以改寫「上下文過濾器」，使其變成 F1 OR F2 就可以了。果不其然，還真的有合適的模組 <a href="https://www.drupal.org/project/views_contextual_filters_or">Views Contextual Filters OR</a> 可以使用。</p>

<p>當然啦，這個功能其實也是寫客製模組就可以達成了，而且也不難，只不過有時會試著找看看有沒有別人已經寫好的「通用性」模組功能可以達到這些目標，而通常這麼做都會有出乎意料的收穫。</p>

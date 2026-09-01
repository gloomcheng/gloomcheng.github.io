---
title: "[CSS] Selector Type"
description: "因應近期套版工作所需，記錄一下幾種特別的選擇器用法。 [通用選取項(Universal Selector)] p { color: red; } / p 元素後的子元素的文字都為紅色 / [比鄰選取項(Adjacent Selector)] h1+p { margin-top: 1em; } / 緊鄰 h1 元素的 p 元素，上邊界距離為 1 倍文字高 / "
publishedAt: "2013-02-06T14:54:14.000Z"
updatedAt: "2016-05-19T01:55:59.000Z"
legacyPath: "/technical/css-selector-type"
kind: "technical"
tags: ["Front-end"]
legacyNid: 66
archived: true
---

<p>因應近期套版工作所需，記錄一下幾種特別的選擇器用法。</p>

<p>[通用選取項(Universal Selector)]<br />
</p><pre>p * { color: red; } /* p 元素後的子元素的文字都為紅色 */</pre><p></p>

<p>[比鄰選取項(Adjacent Selector)]<br />
</p><pre>h1+p { margin-top: 1em; } /* 緊鄰 h1 元素的 p 元素，上邊界距離為 1 倍文字高 */</pre><p></p>

<p>[擬元素選取項(Pseudo-element Selector)]</p>

<table class="reference">
	<tbody>
		<tr>
			<th>Selector</th>
			<th>Example</th>
			<th>Example description</th>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_link.asp">:link</a></td>
			<td>a:link</td>
			<td>Selects all unvisited links</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_visited.asp">:visited</a></td>
			<td>a:visited</td>
			<td>Selects all visited links</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_active.asp">:active</a></td>
			<td>a:active</td>
			<td>Selects the active link</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_hover.asp">:hover</a></td>
			<td>a:hover</td>
			<td>Selects links on mouse over</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_focus.asp">:focus</a></td>
			<td>input:focus</td>
			<td>Selects the input element which has focus</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_firstletter.asp">:first-letter</a></td>
			<td>p:first-letter</td>
			<td>Selects the first letter of every &lt;p&gt; element</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_firstline.asp">:first-line</a></td>
			<td>p:first-line</td>
			<td>Selects the first line of every &lt;p&gt; element</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_firstchild.asp">:first-child</a></td>
			<td>p:first-child</td>
			<td>Selects every &lt;p&gt; elements that is the first child of its parent</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_before.asp">:before</a></td>
			<td>p:before</td>
			<td>Insert content before every &lt;p&gt; element</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_after.asp">:after</a></td>
			<td>p:after</td>
			<td>Insert content after every &lt;p&gt; element</td>
		</tr>
		<tr>
			<td><a href="http://www.w3schools.com/cssref/sel_lang.asp">:lang(<em>language</em>)</a></td>
			<td>p:lang(it)</td>
			<td>Selects every &lt;p&gt; element with a lang attribute value starting with "it"</td>
		</tr>
	</tbody>
</table>

<p> </p>

<p>Reference:</p>

<ol>
	<li>http://www.w3schools.com/css/css_pseudo_elements.asp</li>
	<li>http://zh.wikibooks.org/zh-tw/CSS#.E9.81.B8.E5.8F.96.E9.A0.85.28Selector.29</li>
	<li>http://reference.sitepoint.com/css/combinators</li>
</ol>

---
title: "[Drupal] 讓 Views 輸出結果依中文筆畫排序"
description: "Views 是架設 Druapl 網站必不可缺少的模組，此模組提供一個簡便的介面，讓我們可以自訂要從資料庫擷取哪些資料來呈現，以及用什麼方式來呈現。以往自行架設開發系統時，對於特定單元頁面，要從哪個資料表擷取資料、要顯示哪些欄位內容，都必須自行撰寫程式，而 Views 則簡化了前述的工作。 Views 除了可讓我們決定要呈現哪些資料欄位外，亦可設定要依哪種方"
publishedAt: "2012-08-17T14:59:12.000Z"
updatedAt: "2016-05-19T01:47:31.000Z"
legacyPath: "/technical/drupal-rang-views-shu-chu-jie-guo-yi-zhong-wen-bi-hua-pai-xu"
kind: "technical"
tags: ["Drupal 7", "MySQL", "Views"]
legacyNid: 47
archived: true
---

<p><a href="http://drupal.org/project/views/" title="Views module">Views</a> 是架設 Druapl 網站必不可缺少的模組，此模組提供一個簡便的介面，讓我們可以自訂要從資料庫擷取哪些資料來呈現，以及用什麼方式來呈現。以往自行架設開發系統時，對於特定單元頁面，要從哪個資料表擷取資料、要顯示哪些欄位內容，都必須自行撰寫程式，而 Views 則簡化了前述的工作。</p>

<p>Views 除了可讓我們決定要呈現哪些資料欄位外，亦可設定要依哪種方式進行排序。通常我們會需要依內容標題排序，若內容是英文，排序結果會依字母排序，但如果內容是中文呢？很可惜，中文內容其實是依 UTF-8 的編碼來排序，所以並不是依筆畫順序排序，而是依該中文字在編碼表的順序來排的。</p>

<p>那麼，要如何才能依筆畫排序呢？首先，我們必須知道的是，雖然 UTF-8 編碼無法依筆畫排序，不過 Big5 編碼表中的中文字，確實是依筆畫排序的[<a href="http://calos-tw.blogspot.tw/2011/09/mysql.html" title="在MySQL裡讓中文依筆畫排序">1</a>]；也就是說，我們需要將輸出結果轉換為 Big5 碼，即可讓中文內容依編碼表的順序來排序，最終結果就會是依筆畫排序。</p>

<p>因此，若要讓 Views 的輸出結果依中文筆畫排序，有兩種方法。方法一，是安裝 <a href="http://drupal.org/project/views_php" title="Views PHP module">Views PHP</a> 模組，這讓我們可以在 Views 用 PHP 語言加入一些特定的功能。安裝模組後，在 Sort Criteria 新增 PHP 欄位，並加入以下程式碼：</p>

<code>
$row1_zh = iconv("UTF-8","big5", $row1-&gt;title);
$row2_zh = iconv("UTF-8","big5", $row2-&gt;title);
$comparison = strcmp($row1_zh, $row2_zh);
return $comparison;
</code>

<p>這段程式的意思是，將第一列的資料（此處是以「標題」欄位為例，$row1-&gt;title）以 <a href="http://www.php.net/manual/en/function.iconv.php" title="PHP iconv function">iconv</a> 函數轉換成 Big5 編碼，再將第二列的資料進行轉換，然後再以 strcmp 函數進行字串比對。如此一來，比對完之後，就會將筆畫多的中文字交換到筆畫少的中文字之後，因此就達成了以筆畫排序的目標。</p>

<p>不過此法只適用於僅用一種排序方式的案例。舉例來說，如果同時要呈現會員姓名（標題）及會員年份（分類），然後希望依中文筆畫排序後再依會員年份排序，那麼此法可能會讓你失望。因為 Views PHP 是在 SQL query 之後，但在 render 之前產生效果，所以排序結果很難掌控。</p>

<p>此時，你會需要使用方法二，其實就是撰寫一個小模組（請把 HEX 及 CONVERT 後的空格去除）：</p>

<code>
function yourmodule_views_query_alter(&amp;$view, &amp;$query) {
  if ($view-&gt;name == 'member' &amp;&amp; $view-&gt;current_display == 'page_1') {
    $query-&gt;orderby = array(
      array(
        'field' =&gt; 'HEX (CONVERT(node_title USING big5))', 
        'direction' =&gt; 'ASC', 
      )
    );
  }
}
</code>

<p><a href="http://api.drupal.org/api/views/views.api.php/function/hook_views_query_alter/7" title="Drupal Views hook function">hook_views_query_alter</a> 函式的功能是在 SQL query 產生之前，改寫 SQL 查詢語法，如你所見，這段程式的用意其實是加上 HEX (CONVERT (node_title USING big5)) 的排序語法，直接從源頭修改排序結果，然後就大功告成啦。</p>

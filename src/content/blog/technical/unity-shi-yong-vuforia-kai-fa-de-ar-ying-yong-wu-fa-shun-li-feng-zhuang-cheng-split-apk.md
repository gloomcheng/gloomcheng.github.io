---
title: "[Unity] 使用 Vuforia 開發的 AR 應用無法順利封裝成 split apk"
description: "情境說明 Vuforia 是一套可用來開發 AR 擴增實境應用的 SDK，並且內建在 Unity 2017.2 之後的版本，算是易取得、易使用的開發工具。此次的專案是以 Unity + Vuforia 開發 AR 應用，但考量到使用者可能是在山區使用，因此規劃將所有需要的 3D 模型都直接封裝在 APK 裡面，造成 APK 超過 100MB。一旦 APK 超"
publishedAt: "2018-03-28T14:38:39.000Z"
updatedAt: "2018-03-28T14:38:39.000Z"
legacyPath: "/technical/unity-shi-yong-vuforia-kai-fa-de-ar-ying-yong-wu-fa-shun-li-feng-zhuang-cheng-split-apk"
kind: "technical"
tags: ["APK", "AR", "Augmented Reality", "OBB", "split application binary", "Unity", "Vuforia"]
legacyNid: 138
archived: true
---

<h3>情境說明</h3>

<p>Vuforia 是一套可用來開發 AR 擴增實境應用的 SDK，並且內建在 Unity 2017.2 之後的版本，算是易取得、易使用的開發工具。此次的專案是以 Unity + Vuforia 開發 AR 應用，但考量到使用者可能是在山區使用，因此規劃將所有需要的 3D 模型都直接封裝在 APK 裡面，造成 APK 超過 100MB。一旦 APK 超過 100MB，就必須拆成 APK 與 OBB（APK 擴充程式檔）。</p>

<p>當使用者從 Google Play 下載應用程式時，會同時下載 APK 與 OBB 檔，所以對終端使用者而言，操作上並沒有太大的差異。對以 Unity 做為遊戲開發工具的開發者而言，由於 Unity 內建支援將 APK 拆分封裝的功能，開發者只要在發佈前勾選「Split Application Binary」，Unity 會將主要的程式封裝成 APK，而把相關需要的資源（例如貼圖、模型、影片等）存成 OBB，所以這算是遊戲開發領域常用的技巧。</p>

<p>然而，此法運用在以 Vuforia 開發的應用程式上，會發生一個嚴重的問題。Vuforia 之所以可以辨識圖騰而顯示出對應的數位內容，主要是透過 Vuforia 平台提供的 .dat（database）及 .xml 檔，當使用 Unity 封裝應用程式後，這兩個檔案預設會放在應用程式下的 <a href="https://docs.unity3d.com/Manual/StreamingAssets.html">StreamingAssets</a> 資料夾裡，<a href="https://blog.csdn.net/czlilove/article/details/20546039">在這資料夾的任何檔案都會被如實地複製到對象載具（設備）的一個特定資料夾</a>，且不會針對這資料夾的內容進行壓縮或加密，具體可參考「<a href="http://simcai.com/2015/11/29/Unity%E8%B5%84%E6%BA%90%E8%B7%AF%E5%BE%84%E5%8F%8A%E5%8A%A0%E8%BD%BD%E5%A4%96%E9%83%A8%E8%B5%84%E6%BA%90%E4%BB%8B%E7%BB%8D/">Unity资源路径及加载外部资源介绍</a>」一文。</p>

<blockquote>
<p>StreamingAssets和Resources很像。同样作为一个只读的Unity3D的保留文件夹出现。不过两者也有很大的区别，那就是Resources文件夹中的内容在打包时会被压缩和加密。而StreamingAsset文件夹中的内容则会原封不动的打入包中，因此StreamingAssets主要用来存放一些二进制文件。</p>

<p>特点：</p>

<ol>
	<li>只读不可写。</li>
	<li>主要用来存放二进制文件。</li>
	<li>只能用过WWW类来读取。</li>
</ol>
</blockquote>

<p>在多數情況下，這樣的設計沒什麼問題。不過呢，當我們面對封裝檔案過大而必須拆分為 APK/OBB 時，此時根據 Unity 的演算方法，會將 .dat/.xml 這兩個檔案存到 OBB 裡，這使得安裝 APK 後，在應用程式下的 StreamingAssets 資料夾會找不到 .dat/.xml 等檔案，進而造成 Vuforia 無法順利初始化。</p>

<p>意思就是，Vuforia 會無法使用，連帶自然就沒有 AR 的應用可以使用了！</p>

<h3>解決方法</h3>

<p>這個問題是去年就遇到的，當時其實有搜尋到<a href="https://developer.vuforia.com/forum/android/load-dataset-android-split-binary-obb">一篇文章</a>，而且這篇文章就是正解，不過那時剛碰 Unity，對於其運作方式和設計方式不甚清楚，就算仔細閱讀過該文，也看不出端倪（雖然該篇文章其實寫得很清楚）。</p>

<p>今年為了把案子順利結束掉，又再次面對這個問題，從而發現時至 2018/03 的此時，還是有開發者遇到<a href="https://forum.unity.com/threads/vuforia-android-build-split-obb-apk-bug-solved.517690/">同樣的問題</a>，而且把問題定義得更清楚：</p>

<blockquote>
<p><strong>The correct solution to the problem From the Vuforia team side:</strong><br />
Vuforia team should add to the Vuforia SDK search Databases support in OBB files.<br />
<br />
<strong>The correct solution to the problem From the Unity team side:</strong><br />
Need added option selecting location "StreamingAssets" choice of APP / OBB file.</p>
</blockquote>

<p>如果你有順著把情境說明看完，應該就能理解該文作者提出的解決方案，一是由 Vuforia 加入可以從 OBB 檔案讀取 .dat/.xml 檔案的功能；二是由 Unity 加入可以選擇 StreamingAssets 封裝到 APK 或 OBB 的選項。不論前述何者被落實，應該都能更簡易地解決問題。</p>

<p>不過前述方案都還沒被落實，所以在同篇討論文章的引導下，再看了一遍去年閱讀過的文章「<a href="https://developer.vuforia.com/forum/android/load-dataset-android-split-binary-obb">Load dataset from Android split binary (obb)</a>」，這次照著文章指示的步驟調整，確實可解決問題。具體的解法方法如下：</p>

<ol>
	<li>首先到 Vuforia 設定頁面（<strong>Vuforia Configuration</strong>）

	<ul>
		<li>確認已輸入 Vuforia license</li>
		<li>確認已勾選欲載入（loaded）使用的辨識圖片資料集並設定為啟用（activated)</li>
	</ul>
	</li>
	<li>接著到封裝設定頁面（<strong>Player Settings -&gt; Android Settings</strong>）
	<ul>
		<li>到「Other Settings」欄位集，將「Write Permissions」參數設定為「External (SDCard)」</li>
		<li>到「Publishing Settings」欄位集，勾選使用「Split Application Binary」</li>
	</ul>
	</li>
</ol>

<p>去年，我執行到這裡就進行封裝了，然後就失敗了！所以，接下來的步驟才是關鍵。</p>

<ol>
	<li>新增一個空的腳本程式（script），並命名為「ObbExtractor.cs」，然後貼上下列的程式碼</li>
	<li>建立一個新的場景（scene），在新的場景裡放入空的 GameObject，並套用 ObbExtractor 程式元件</li>
	<li>把這個場景加到封裝列表裡，而且順序必須比 Vuforia 的場景前面</li>
</ol>

<pre>
<code class="language-cs">using System.IO;
using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
 
 
public class ObbExtractor : MonoBehaviour {
 
    void Start () {
        StartCoroutine(ExtractObbDatasets());
    }
 
    private IEnumerator ExtractObbDatasets () {
        string[] filesInOBB = {"VuforiaMars_Images.dat", "VuforiaMars_Images.xml"};
        foreach (var filename in filesInOBB) {
            string uri = Application.streamingAssetsPath + "/Vuforia/" + filename;
 
            string outputFilePath = Application.persistentDataPath + "/Vuforia/" + filename;
            if(!Directory.Exists(Path.GetDirectoryName(outputFilePath)))
                Directory.CreateDirectory(Path.GetDirectoryName(outputFilePath));
 
            var www = new WWW(uri);
            yield return www;
 
            Save(www, outputFilePath);
            yield return new WaitForEndOfFrame();
        }
 
        // When done extracting the datasets, Start Vuforia AR scene
        SceneManager.LoadScene( "0-Splash" );
    }
 
    private void Save(WWW www, string outputPath) {
        File.WriteAllBytes( outputPath, www.bytes );
 
        // Verify that the File has been actually stored
        if( File.Exists( outputPath ) )
        {
            Debug.Log( "File successfully saved at: " + outputPath );
        }
        else
        {
            Debug.Log( "Failure!! - File does not exist at: " + outputPath );  
        }
    }
}</code></pre>

<p>前述的作法中，關鍵是在實際執行 Vuforia 前，透過上述程式碼先從 OBB 檔中找出 .dat/.xml 等檔案並複製到 StreamingAssets 資料夾裡，這樣一來，當進入 AR 應用的場景並載入 Vuforia 元件時，就不會因為載不到所需的檔案而無法順利初始化 Vuforia 元件。</p>

<h3>進階應用</h3>

<p>在前述作法中，是將初始場景設計為空白的，當載入 Vuforia 資料庫後，就會直接跳轉到 AR 相機的場景；而在我的案例中，則是設計了一個初始選單的場景，同時在執行這場景時先預載 Vuforia 資料庫，這樣的設計其實可以提供較佳的使用者經驗。</p>

<p>其次是，如果想要將這段程式碼同時應用在 Android / iOS 的環境下，而不需要管理兩套程式碼，那麼可以針對 Start() 函式裡的程式碼做小幅度的修改，例如</p>

<pre>
<code class="language-cs">    if( Application.platform == RuntimePlatform.Android )
        StartCoroutine( ExtractObbDatasets() );
    else
        StartCoroutine( LoadMainMenuAsync() );</code></pre>

<p> </p>

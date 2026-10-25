# 首頁與上架規範檢查（2026-10-14）

## 本輪確認範圍
使用者已確認只處理首頁樣式與上架規範，本輪未重建動畫。最初讀取遠端 145f76c8 時沒有動畫；提交前遠端已更新至 a541b460c6a44e3080cd9114c4c0e196f13ac594，新增 standing-wave/index.html 與 manifest.json。本輪保留它們，不修改也不將它們冒充本輪成果。此動畫的 V3 一致性與物理細節不在本輪驗證範圍。

## 首頁來源及修正
採用原對話附件 `index(1).html`，讀取位置是桌面附件暫存檔，而非此 Windows 環境不存在的 `/mnt/data`。原檔 SHA-256：`7a3c1b81a550f5daa248e0a6a885702deda9d1f36291a7caa4ae66f4d6bca662`。
忽略 CRLF/LF 差異後，HTML 主體及 CSS 與附件完全一致；只改動畫資料載入與清單邏輯。保留七個物理分類、導覽、卡片、搜尋及響應式規則。
自動目錄只列出通過驗證且入口存在的動畫；最新目錄含行進波與駐波。其他空分類顯示尚無上架動畫。明確區分載入、失敗與空結果。

## 規範與目錄
保留 PROJECT_SPEC.md 與 PUBLISHING.md 原規範，追加使用者核准的首頁基準修正與部署驗證契約。新增根目錄 AGENTS.md 作為新對話的入口指示。
指定動畫上架僅允許該動畫資料夾，禁止順便改首頁、目錄、流程、規範與其他動畫。這些是協作規範，不是 GitHub 權限層級的技術隔離。
build_catalog.py 原本已具備 schema、分類及入口檢查；補上缺少 manifest、錯誤層級與 ASCII slug 驗證。

## 已完成驗證
- 首頁 HTML/CSS 來源一致與 JavaScript 語法檢查通過。
- 使用最小 DOM 模型驗證空目錄、清單連結、關鍵字搜尋、分類篩選、不安全路徑拒絕及載入失敗狀態；通過。此項不等同真實瀏覽器視覺驗收。
- 目錄產生器：空目錄、合法動畫、缺 manifest、分類不一致、禁止欄位、非法 slug 的正反案例通過。測試資料僅放臨時目錄，未上架。
- `.github/workflows/deploy.yml` 已包含 main push、自動目錄、Pages 權限與部署步驟；未發現需修改的設定，保留。既有 SHA 145f76c8eb6a31a55da3eff7dc96e5d042cc1fce 的 run 38529783725 為 success；這不代表本輪提交已部署。

## 待提交後驗證
本文件初次提交時尚未有此次 SHA 與部署結果；必須查詢相同 SHA 的 push run 與公開首頁／simulations.json，再記錄實際結果。不得將此節解讀為部署已成功。

提交基底再次刷新為 aaccd3a575c6f32dd0a854132c88cb71038fccc8（tree ef195298de167077ecee5ab534d671fca28496aa），其中另有 diffraction-interference 動畫；本輪六個變更路徑均不包含 simulations/，完整保留兩個動畫資料夾。前次自動審查因擔心舊基底刪動畫拒絕建立 tree，未更新 main；重新讀取完整 tree 後再提交。

## 提交後實際驗證
- 本輪首頁與規範提交：`c4ffeb755a7ce5f9f689a8177d84db1f85f5f90e`，已更新至 main。
- [對應 Pages workflow run 38530664544](https://github.com/derliang/physics-lab/actions/runs/38530664544) 的 head_sha 與上述提交一致，status completed、conclusion success。
- deploy job 的 Validate and generate catalog、Setup Pages、Upload static site、Deploy Pages 均為 success。
- 真實瀏覽器重新整理 [公開首頁](https://derliang.github.io/physics-lab/) 後，確認為附件基準樣式（七主題、原 hero、原卡片與導覽），清單顯示「波的繞射與干涉」與「行進波與駐波」。
- [公開 simulations.json](https://derliang.github.io/physics-lab/simulations.json) 含上述兩個動畫與正確相對路徑；來源儲存庫的 simulations.json 仍是舊空陣列，公開部署成品由 Actions 重新生成，符合契約。
- 真實瀏覽器搜尋「駐波」只顯示行進波與駐波；清空後選「力學」顯示尚無動畫，再選首頁恢復兩個動畫。已完成基本樣式與互動驗證，未進行所有裝置的視覺驗收。
- 新建 tree 中兩動畫的四個檔案 blob SHA 與最新基底完全一致；確認本輪沒有覆蓋或刪除其他提交的動畫。
- 本文件追加的驗證紀錄是另一筆文件提交；上述部署成功結論只針對 c4ffeb755a7ce5f9f689a8177d84db1f85f5f90e，不提前宣稱文件提交的部署結果。

## 2026-10-19 動畫共通規範 V1.1 修訂紀錄
- 使用者逐題確認並最終核准八項標準：60/30 FPS；完整播放、單格步進與時間歸零；數值誤差原則 ≤1%；完整定量顯示；3～5 組教學情境及本機儲存／網址分享；三級測試且至少五個物理案例；iPad／桌面／手機支援（手機橫向優先）；3 秒可操作、初始下載建議 ≤5MB、連續運作 30 分鐘。
- 新增 `ANIMATION_STANDARD.md`；原有 PROJECT_SPEC.md、AGENTS.md、PUBLISHING.md 及本檔只追加引用／紀錄，不刪除原文。
- 本次授權僅及上述五份文件，不更新既有動畫、首頁、分類、目錄產生器或部署工作流程。
- 本次提交及部署結果須以新 commit SHA 查核；未查證前不得記載為成功。

## 2026-10-19 動畫卡片識別與整卡點擊修改紀錄
- 使用者指出波動類動畫在首頁共用海浪 emoji，無法快速區分；要求每一動畫有專屬 icon，整張卡片可開啟。
- 首頁為現有五個波動動畫加入現象專屬 SVG：繞射與干涉、海更斯次波、水波槽波紋、駐波雙向振形、波的疊加；配合不同主色與淡色背景。
- 卡片採原生 `<a href="動畫路徑">` 包住圖示、標題、簡介、狀態及開啟提示；對鍵盤與觸控保有原生連結功能。
- 未來動畫使用路徑識別碼衍生的穩定配色與單字圖示作安全備援，不回退成全分類共用 emoji；保留既有 manifest 四欄 schema、搜尋、分類與目錄。
- 語法檢查在提交前進行；GitHub Actions 與公開頁面結果須於提交後另按本次 SHA 驗證。實機操作未測項目如實註記。

## 版權資訊增補（2026-10-24）
使用者明確授權的版權任務，僅新增：`LICENSE.md`、README「著作權與使用授權」小節、首頁既有頁尾內單一版權句、`index.html` 與 `scripts/build_catalog.py` 檔頭註解、`AGENTS.md` 版權維護規範。未改動畫功能、分類、目錄邏輯、部署流程與任何網址；`simulations/` 各動畫頁僅於 `<html>` 前加入 HTML 檔頭註解（使用者另行同意），無任何畫面或邏輯變動。驗證：`build_catalog.py` 本機執行通過（產生 8 筆目錄；`simulations.json` 為 Actions 部署時產生的產物，本機測試輸出已還原、不提交）；首頁桌機／手機寬度無橫向捲動。

## 2026-10-25 平台改版：1a 期刊封面式首頁與上架規範 v2
使用者明確授權的一次性平台改版（分支 `platform-v2`）。

### 變更
- 新增 `assets/site.css`、`assets/site.js`、`info.html`；`index.html` 改為 1a 期刊封面式，移除寫死的動畫圖示，版權檔頭與頁尾版權句保留。
- `scripts/build_catalog.py` 升級為 manifest v2 檢查（欄位字數、icon.svg 元素／屬性／色票／線寬／重複、cover.webp 尺寸、範本殘留文字），下架改看 `status`；新增 `scripts/test_build_catalog.py`。
- 10 支動畫：manifest 升級 v2（介紹文字由 AI 讀動畫內容起草，經使用者審閱）、新增 `icon.svg`（6 個由舊首頁搬出並改用色票、4 個新畫）、`TEST_REPORT` 補上下架紀錄；`diffraction-interference` 補建 TEST_REPORT.md（三級驗收標「未驗證」）。各動畫 `index.html` 未修改，網址不變。
- 文件：`PUBLISHING.md` v2（v1 封存於 `docs/archive/`）、`docs/design/DESIGN.md` 與模擬頁、`docs/templates/`、`AGENTS.md`、`PROJECT_SPEC.md` 第十一節、`CATALOG_VISIBILITY.md`、`README.md`、`CLAUDE.md`。`.github/workflows/deploy.yml` 未修改。

### 提交前已完成的驗證
- `python scripts/test_build_catalog.py`：12 項全數通過（合格案例、13 種 manifest 違規、10 種 icon 違規、檔案缺漏、資料夾規則、cover、範本殘留、現有 repo 實際通過）。
- `python scripts/build_catalog.py`：產生 8 筆目錄（2 支 `hidden` 已檢查但不列出）；本機輸出的 `simulations.json` 已還原，不提交。
- Chrome 本機（`http.server`）以 iframe 固定寬度 390／768／1024／1280 檢查首頁、`#mechanics`（空主題，回到全部）、`?q=駐波` 搜尋、介紹頁、已下架與格式錯誤的介紹頁：皆無橫向溢出；卡片欄數依序 1／2／3／4；可點元素高度皆 ≥44px；6 個空主題頁籤為不可點的灰字；鍵盤 Tab 可聚焦整張卡片並以 Enter 開啟介紹頁；主控台無錯誤；已下架動畫原網址仍回應 200。
- 同日依使用者指示將配色改為明亮科技風、取消深色模式、空主題不顯示「籌備中」，改版後重跑上列檢查並截圖目視確認。
- 未驗證：iPad Safari 與手機實機、GitHub Actions 部署與公開站點（須於提交後依 commit SHA 查核再補記）。

### 合併與部署後實際驗證（2026-10-25）
- [PR #1](https://github.com/derliang/physics-lab/pull/1) 以 merge commit 合併；`origin/main` = `a01592dd0e7b2efb31b501788cf8c4a355019355`，包含改版提交 `c09b5479370d4ef63ba7157a7d77aa082ce360e9`。
- [Pages workflow run 40175981687](https://github.com/derliang/physics-lab/actions/runs/40175981687)：event push、head_sha 與上述 main SHA 一致，conclusion success；Checkout、Validate and generate catalog、Setup Pages、Upload static site、Deploy Pages 均 success。
- 公開站點（加查詢參數避開快取）：首頁、`info.html`、`assets/site.css`、`assets/site.js`、`simulations.json` 皆 200；`simulations.json` 為 8 筆 v2 目錄（含 icon、cover 欄位），不含 2 支 hidden；10 支動畫原網址與 icon.svg 皆 200。
- 真實瀏覽器（Chrome）重新整理公開首頁：明亮科技風版型、8 張卡片、6 個空主題頁籤不可點、圖示無破圖、頁尾版權句保留；駐波共振介紹頁麵包屑「首頁›波動›駐波共振」、5 條觀察重點、「開始實驗」指向原動畫網址；已下架的 ripple-tank-lab 介紹頁顯示「找不到這支動畫」；主控台無錯誤。
- 仍未驗證：iPad Safari 與手機實機操作。

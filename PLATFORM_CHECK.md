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

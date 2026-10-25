> **已封存（2026-10-25）**：本檔為舊版 v1 上架指南，僅供查閱歷史。現行規則一律以根目錄 [`PUBLISHING.md`](../../PUBLISHING.md) v2 為準，不得依本檔上架。

# Physics Lab 動畫直接上架操作指南

請先遵守 [PROJECT_SPEC.md](../../PROJECT_SPEC.md)。

## 上架對話固定指令

> 讀取 `derliang/physics-lab` 的 `main` 及正式專案規範。將本對話製作的動畫直接上架到該儲存庫的 `main`，不要再詢問是否允許推送。只能新增 `simulations/<category>/<slug>/index.html`、`manifest.json` 和同資料夾必要資源；如果這是指定的既有動畫修訂，則只能修改該動畫。不得修改首頁、分類、平台程式或其他動畫。上架後驗證部署並回報網址與 commit SHA。

## 分類
`mechanics` 力學、`thermal` 熱學、`waves` 波動、`electromagnetism` 電磁學、`optics` 光學、`modern` 近代物理、`experiments` 實驗與數據。

## 範例檔案
`simulations/waves/standing-wave/index.html`：單一可操作 HTML 網頁。

`simulations/waves/standing-wave/manifest.json`：
```json
{
  "title": "行進波與駐波",
  "category": "waves",
  "description": "觀察兩列反向行進波的疊加與波節。",
  "keywords": ["駐波", "行進波", "波節", "疊加"]
}
```

不可寫入 `path` 欄位；部署系統自行計算網址。請勿修改 `simulations.json` 或 `scripts/build_catalog.py`。

## 成功標準
- GitHub 的 `main` 含有效動畫與 manifest，未更改不允許的檔案。
- Pages 部署工作流程成功執行，新動畫出現在正確分類。
- iPad 橫向可操作，調參時動畫可見並即時更新。
- 回覆實際 commit 與網址。若部署尚未開通，明確標註。


## 自動目錄與 Pages 發布契約
1. 開始時讀取根目錄 `AGENTS.md`、本指南、`PROJECT_SPEC.md` 和最新 `main`。
2. 一次只提交使用者指定動畫資料夾內的檔案。不要改 `index.html`、`scripts/`、`.github/`、規範、其他動畫或手動修改 `simulations.json`。
3. 本地可執行 `python scripts/build_catalog.py` 驗證，但產生的 `simulations.json` 不納入動畫提交。目錄由 Actions 於部署成品重新產生。
4. `.github/workflows/deploy.yml` 在每次 `main` push 或人工觸發時依序 checkout、驗證 manifest／產生目錄、configure-pages、upload-pages-artifact、deploy-pages。驗證失敗不得發布。
5. Pages 須使用 GitHub Actions 作為發布來源；若設定不符，回報平台設定問題，不能越權修改首頁或流程。
6. 禁止 force push。提交前重新讀取 main，以目前 head 作父提交，更新分支時檢查 expected SHA；遠端已變動就重新檢查差異，不能覆蓋他人內容。
7. 必須對照本次 commit SHA 查詢 push 工作流程。舊 commit 的成功、PR 檢查成功或只有 commit 存在，均不能當作本次 Pages 成功。
8. 分別回報「提交已確認」、「部署成功／失敗／待驗證」、「公開首頁與目錄已驗證／未驗證」，附 SHA、Actions 連結與網址。部署成功後再查公開站點內容，避免 CDN 舊版被誤認為新版。
9. 檢查與結論寫入指定動畫資料夾內的上架紀錄；平台修訂則寫平台檢查文件。不可把尚未完成的步驟寫成成功。

## 首頁基準與此次範圍
首頁使用 `PROJECT_SPEC.md` 第七節的附件設計基準（七個物理主題），新增動畫只寫 manifest，不改首頁架構。本輪未建立 V3 動畫；提交前遠端已有另一筆提交的 standing-wave 動畫，首頁依自動目錄列出它。

## 動畫品質驗收 V1.1（2026-10-19 已核准）
動畫製作與更新前，須讀取並遵守 [`ANIMATION_STANDARD.md`](ANIMATION_STANDARD.md)。上架前執行三級驗收，包含至少五個物理測試案例；測試條件、預期與實際結果、狀態、日期與版本紀錄均保存於該動畫資料夾。無法完成的實測須如實標示未驗證，不得冒稱通過。此為品質要求，不允許藉此更動首頁、目錄、部署流程或其他動畫；既有動畫不因此自動修改。

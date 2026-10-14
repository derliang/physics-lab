# Physics Lab 動畫直接上架操作指南

請先遵守 [PROJECT_SPEC.md](PROJECT_SPEC.md)。

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

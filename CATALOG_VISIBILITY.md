# Physics Lab 首頁動畫目錄可見性紀錄
日期：2026-10-21

使用者明確要求以下兩個動畫只從 Physics Lab 首頁目錄下架，不刪除或覆蓋：
- `simulations/waves/ripple-tank-lab/`
- `simulations/waves/ripple-wave-superposition/`

## 實作
`scripts/build_catalog.py` 中的 `HIDDEN_FROM_CATALOG` 僅略過兩筆目錄資料輸出，仍對這兩筆執行原有 manifest 驗證。首頁 HTML、原動畫程式、manifest 及部署工作流程均未修改，也沒有手動修改 `simulations.json`。

**原網址繼續可直接開啟**：GitHub Pages 仍將 GitHub 儲存庫的靜態檔案完整部署；下架只影響首頁卡片、分類及搜尋結果。

## 恢復上架
取得使用者授權後，從 `HIDDEN_FROM_CATALOG` 移除指定路徑，再經 commit、Actions 部署即可。

## 測試
在四個假資料目錄上執行產生器，新動畫與一般動畫出現在 `simulations.json`，兩個被隱藏者不在清單；但舊動畫 index.html 均存在。

## 2026-10-25 機制改為 manifest status（上架規範 v2）
- `HIDDEN_FROM_CATALOG` 名單已移除。上述兩支動畫的 `manifest.json` 改為 `"status": "hidden"`，下架狀態不變，原網址仍可直接開啟；兩支的 `TEST_REPORT.md` 已補記上下架紀錄。
- 往後下架／恢復一律依 [`PUBLISHING.md`](PUBLISHING.md) 第 8 節：只改該動畫的 `status` 並記錄，不修改平台程式。下架的動畫仍須通過 manifest 與 icon.svg 檢查。

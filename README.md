# Physics Lab｜互動物理實驗室

高中物理互動模擬網站，主要針對 iPad 橫向投影最佳化。

- 首頁：https://derliang.github.io/physics-lab/
- 專案規範：[PROJECT_SPEC.md](PROJECT_SPEC.md)
- 上架規範 v2：[PUBLISHING.md](PUBLISHING.md)（範本在 [docs/templates/](docs/templates/)）
- 設計規範：[docs/design/DESIGN.md](docs/design/DESIGN.md)
- 協作入口（AI 開工必讀）：[AGENTS.md](AGENTS.md)

動畫開發對話只准新增 `simulations/<category>/<slug>/` 下的新動畫資料夾，不准改動平台架構。上架只交資料：首頁、主題頁與動畫介紹頁（`info.html`）都由 GitHub Actions 執行 `scripts/build_catalog.py` 檢查各動畫的 `manifest.json`、`icon.svg` 後自動產生；檢查不通過就不會部署。

首次啟用 GitHub Pages：到 Settings → Pages → Build and deployment → Source 選擇 **GitHub Actions**；之後對 main 分支 push 即觸發自動部署。

## 著作權與使用授權

© 2026 derliang. All rights reserved.

本程式免費提供聖功女中師生於非營利教育用途使用；**所有使用者均限非營利使用**。其他學校或機構請先寄信至 [derliang@gmail.com](mailto:derliang@gmail.com) 申請，並取得作者 Email 回覆同意。程式碼重製、修改、散布、再發布及商業使用均須另行授權。

完整條款請參閱 [LICENSE.md](./LICENSE.md)。

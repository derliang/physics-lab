# Physics Lab｜互動物理實驗室

高中物理互動模擬網站，主要針對 iPad 橫向投影最佳化。

- 首頁：https://derliang.github.io/physics-lab/
- 專案規範：[PROJECT_SPEC.md](PROJECT_SPEC.md)
- 上架指南：[PUBLISHING.md](PUBLISHING.md)

動畫開發對話只准新增 `simulations/<category>/<slug>/` 下的新動畫資料夾，不准改動平台架構。網站目錄透過 GitHub Actions 自動掃描動畫的 `manifest.json` 並產生。

首次啟用 GitHub Pages：到 Settings → Pages → Build and deployment → Source 選擇 **GitHub Actions**；之後對 main 分支 push 即觸發自動部署。

## 著作權與使用授權

© 2026 derliang. All rights reserved.

本程式免費提供聖功女中師生於非營利教育用途使用；**所有使用者均限非營利使用**。其他學校或機構請先寄信至 [derliang@gmail.com](mailto:derliang@gmail.com) 申請，並取得作者 Email 回覆同意。程式碼重製、修改、散布、再發布及商業使用均須另行授權。

完整條款請參閱 [LICENSE.md](./LICENSE.md)。

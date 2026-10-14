# Physics Lab｜互動物理實驗室

高中物理互動模擬網站，主要針對 iPad 橫向投影最佳化。

- 首頁：https://derliang.github.io/physics-lab/
- 專案規範：[PROJECT_SPEC.md](PROJECT_SPEC.md)
- 上架指南：[PUBLISHING.md](PUBLISHING.md)

動畫開發對話只准新增 `simulations/<category>/<slug>/` 下的新動畫資料夾，不准改動平台架構。網站目錄透過 GitHub Actions 自動掃描動畫的 `manifest.json` 並產生。

首次啟用 GitHub Pages：到 Settings → Pages → Build and deployment → Source 選擇 **GitHub Actions**；之後對 main 分支 push 即觸發自動部署。

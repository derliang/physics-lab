# Physics Lab 動畫上架規範 v2

> 狀態：正式，2026-10-25 使用者核准。取代舊版 v1（已封存於 [`docs/archive/PUBLISHING_v1.md`](docs/archive/PUBLISHING_v1.md)，不得再依舊版上架）。
> 讀者：負責製作與上架動畫的 ChatGPT（或任何 AI／人員）。開工前另須讀 [`AGENTS.md`](AGENTS.md) 與 [`ANIMATION_STANDARD.md`](ANIMATION_STANDARD.md)。

## 0. 一句話原則

**上架只交資料，不交設計。** 首頁、主題頁、介紹頁都是固定版型，全部由 `manifest.json` 與 `icon.svg` 自動產生。上架一支新動畫，網站外觀不會也不准有任何改變；需要改外觀，屬於平台改版，必須另外取得使用者授權並依 [`docs/design/DESIGN.md`](docs/design/DESIGN.md) 走設計流程。

## 1. 可以動與不可以動的路徑

| 情境 | 可以新增或修改 | 一律不可修改 |
|---|---|---|
| 上架新動畫 | 新的 `simulations/<category>/<slug>/` 資料夾內的檔案 | `index.html`、`info.html`、`about.html`、`assets/`、`scripts/`、`.github/`、`docs/`、所有規範文件、`simulations.json`、其他動畫 |
| 修訂指定動畫 | 該動畫資料夾內的檔案 | 同上 |
| 下架／恢復指定動畫 | 該動畫 `manifest.json` 的 `status`，以及同資料夾 `TEST_REPORT.md` 的紀錄 | 同上，且不得刪除動畫檔案 |

使用者說「把動畫 push 到 GitHub」「上架到 Physics Lab」或同義指令，即授權在 `main` 直接提交**該動畫資料夾**（見 `PROJECT_SPEC.md` 第三節），不必再問；但不包含上表右欄任何檔案。

## 2. 動畫資料夾結構

```
simulations/<category>/<slug>/
├── index.html        必要：動畫本體（沿用 ANIMATION_STANDARD.md，含第十二章檔頭版權註解）
├── manifest.json     必要：目錄與介紹頁的全部文字（第 3 節）
├── icon.svg          必要：動畫專屬圖示（第 4 節）
├── cover.webp        選用：介紹頁的動畫截圖（第 5 節）
└── TEST_REPORT.md    必要：三級驗收紀錄與上下架紀錄
```

- 範本：[`docs/templates/`](docs/templates/) 內的 `manifest.json`、`icon.svg`、`TEST_REPORT.md`。複製後必須改成實際內容；殘留【請填】文字或沿用範本圖示，部署會失敗。
- `category` 只能是：`mechanics` 力學、`thermal` 熱學、`waves` 波動、`electromagnetism` 電磁學、`optics` 光學、`modern` 近代物理、`experiments` 實驗與數據。不得新增分類。
- `slug`：小寫英文、數字與連字號，例如 `standing-wave-resonance`。上架後不得改名，因為老師已分享的網址會失效。

## 3. manifest.json v2

### 3.1 範例（文字僅示範格式，內容須以動畫實際模型為準）

```json
{
  "manifestVersion": 2,
  "title": "駐波共振",
  "subtitle": "弦與管的諧音實驗室",
  "category": "waves",
  "description": "比較兩端固定、一端自由、兩端開放的駐波；調整階數、弦長、張力與線密度，看見波節波腹與頻率的規律。",
  "keywords": ["駐波", "共振", "兩端固定", "管樂器", "波節", "頻率"],
  "highlights": [
    "比較三種邊界條件下形成駐波的方式，看出固定端是波節、自由端是波腹。",
    "改變階數，數一數波節與波腹，找出弦長與波長的關係。",
    "調整張力與線密度，觀察波速與頻率如何跟著改變。"
  ],
  "howto": "先選擇弦或管的邊界類型，再切換階數；拖動弦長、張力與線密度滑桿，畫面即時更新。可暫停後單格步進。",
  "model": "【依動畫實際採用的模型、關係式、適用條件、近似與限制填寫】",
  "devices": ["ipad-landscape", "desktop", "phone-landscape"],
  "tint": "navy",
  "status": "published",
  "updated": "2026-10-25"
}
```

### 3.2 欄位規則（缺任何必要欄位或超出限制，部署會失敗）

| 欄位 | 必要 | 限制 | 出現在 |
|---|---|---|---|
| `manifestVersion` | 是 | 固定為 `2` | — |
| `title` | 是 | 2～20 字，不含「｜」 | 卡片標題、介紹頁大標、搜尋 |
| `subtitle` | 否 | 2～20 字 | 卡片副標、介紹頁副標 |
| `category` | 是 | 必須與資料夾的 category 相同 | 主題頁籤、麵包屑 |
| `description` | 是 | 30～120 字 | 卡片簡介（最多顯示 3 行）、介紹頁導言、搜尋 |
| `keywords` | 是 | 3～12 個，每個 1～12 字，不重複 | 卡片關鍵字（前 3 個）、介紹頁標籤、搜尋 |
| `highlights` | 是 | 3～5 條，每條 15～60 字 | 介紹頁「觀察重點」 |
| `howto` | 是 | 30～150 字 | 介紹頁「操作方式」 |
| `model` | 是 | 30～200 字，寫模型、適用條件、近似與限制 | 介紹頁「物理模型與限制」 |
| `devices` | 是 | 從 `ipad-landscape`、`desktop`、`phone-landscape`、`phone-portrait` 中選，至少含 `ipad-landscape` | 介紹頁「建議裝置」；未含 `phone-portrait` 時手機會提示轉橫向 |
| `tint` | 是 | 從 `navy`、`teal`、`ochre`、`plum`、`rose`、`slate` 中選一個 | 卡片與介紹頁圖示的底色 |
| `status` | 是 | `published`（上架）或 `hidden`（下架） | 決定是否出現在首頁 |
| `updated` | 是 | `YYYY-MM-DD`，台北時間 | 介紹頁「更新日期」 |

- 字數以字元計，中文、英文、標點都算一個字；文字前後不可有空白。
- 不可加入上表以外的欄位，也不可寫 `path`（網址由系統計算）。
- 文字一律台灣繁體中文；不寫行銷用語、驚嘆號、emoji。
- `description` 寫「學生能做什麼、看到什麼」；`highlights` 每條以動詞開頭（比較、改變、調整、觀察…）；`howto` 用動畫介面上真實的控制項名稱；`model` 不得把近似結果寫成普遍定律（`ANIMATION_STANDARD.md` 4.2）。

## 4. icon.svg 規格

- 必須是 `xmlns="http://www.w3.org/2000/svg"`、`viewBox="0 0 72 72"` 的線條圖，畫出該動畫的物理現象；檔案不超過 4 KB。
- 只能使用 `svg`、`g`、`path`、`circle`、`ellipse`、`rect`、`line`、`polyline`、`polygon`。
- 禁止：`text`、`image`、`script`、`style`、`foreignObject`、`use`、漸層與濾鏡，以及 `style`、`class`、`href`、`filter`、`mask`、`clip-path`、任何 `on…` 屬性。
- `fill` 與 `stroke` 只能是 `none` 或下列色票：

| 名稱 | 色碼 | 名稱 | 色碼 |
|---|---|---|---|
| 墨黑 | `#1c1b18` | 藍紫 | `#8a6ad6` |
| 深墨藍 | `#1f3a68` | 土黃 | `#a65f00` |
| 淺藍 | `#6f8fc4` | 橙 | `#ec9730` |
| 青綠 | `#2f9c90` | 玫瑰 | `#bd5b84` |
| 灰褐 | `#8a8170` | 紙白 | `#fffdf8` |

- 每條線都要有 `stroke-width`（寫在元素或外層 `g`），數值 2～5；線條顏色最多 3 種。`opacity`、`fill-opacity`、`stroke-dasharray`、`stroke-linecap` 可以用。
- 不得與其他動畫或範本的 icon.svg 完全相同（部署時自動比對）。
- 圖示放在淺色底上顯示（網站只有淺色版）；不要畫背景色塊。

## 5. cover.webp 規格（選用）

- 1600 × 900 px 的 WebP、不超過 300 KB，必須是動畫的真實畫面截圖，不加文字或外框。
- 沒有提供時，介紹頁自動改用放大的 icon.svg，不算缺件。

## 6. 版型對照（ChatGPT 不需也不准製作這些頁面）

| 頁面 | 網址 | 內容來源 |
|---|---|---|
| 首頁 | `index.html` | 全部 `status: published` 的動畫 |
| 主題頁 | `index.html#waves` | 該分類的動畫；沒有動畫的分類在頁籤上自動變灰、不可點，上架第一支後自動開放 |
| 介紹頁 | `info.html?sim=waves/standing-wave-resonance` | 該動畫的 manifest、icon.svg、cover.webp |
| 動畫本體 | `simulations/waves/standing-wave-resonance/` | 動畫自己的 `index.html`（網址維持不變） |

## 7. 上架流程

1. 讀 `AGENTS.md`、本規範、`ANIMATION_STANDARD.md`，以及遠端 `main` 的最新內容。
2. 在新資料夾完成第 2 節的檔案，`status` 填 `published`，`updated` 填當天（台北時間）。
3. 在本機執行 `python scripts/build_catalog.py`。看到 `Catalog generated` 才算通過；出現「上架檢查未通過」就照列出的每一項修正動畫資料夾內的檔案，不要修改 `build_catalog.py`。產生的 `simulations.json` 不要提交（`git checkout -- simulations.json` 還原）。
4. 確認 `git status` 的變更只有該動畫資料夾，再提交到 `main`（禁止 force push；遠端有新提交就先 rebase 自己的提交）。
5. 依 commit SHA 查 GitHub Actions「Deploy Physics Lab」結果；成功後開啟正式站的首頁、主題頁、介紹頁與動畫本體各一次。
6. 回報：commit SHA、Actions 連結、介紹頁網址、動畫網址、部署成功或失敗。未驗證的項目要寫「未驗證」，不得虛報成功。

## 8. 下架與恢復

- 下架：只把 `status` 改為 `hidden`，並在 `TEST_REPORT.md` 的「上下架紀錄」加一行「YYYY-MM-DD 下架，原因：…（使用者指示）」。動畫檔案保留，原網址仍可直接開啟，只是不出現在首頁、主題頁、搜尋與介紹頁。
- 恢復：改回 `published`，同樣記一行。
- 只有使用者明確指示才可下架或恢復。下架的動畫仍要通過第 3、4 節檢查。

## 9. 修訂既有動畫

- 只改使用者指定的那支動畫；同步更新 `updated` 日期與 `TEST_REPORT.md`。
- `slug` 與 `category` 不改；確需改分類，屬平台變更，先請示使用者。

## 10. 部署時的自動檢查（`scripts/build_catalog.py` 負責）

缺少必要檔案或欄位、殘留範本文字、字數或數量超出限制、分類不符、slug 不合法、icon.svg 使用禁止元素或屬性或色票外的顏色、線寬不合、icon.svg 與其他動畫或範本重複、cover.webp 尺寸或大小不符：任一項發生，部署就停止，網站維持原狀。平台維護者修改檢查規則後，必須執行 `python scripts/test_build_catalog.py` 全數通過。

## 11. 什麼時候才需要動到設計

只有使用者明確要求改首頁、主題頁、介紹頁的外觀或結構時，才屬於平台改版：先更新 `docs/design/DESIGN.md`，取得使用者確認，再改程式。上架動畫永遠不屬於這種情況。

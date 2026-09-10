# 完整主題交換

主題的單位是「第一、第二、第三版整套設計」，不是第一版內的配色變化。

| ID | 完整主題 | 版型／外觀 |
| --- | --- | --- |
| v1 | 第一版・墨綠精品會所（預設） | 側欄、山景、霧金、原版會所卡片 |
| v2 | 第二版・大膽連結 | 橫向導覽、紫黃、金屬主視覺與會員票卡 |
| v3 | 第三版・前衛科技 | 3D核心、電光色、活動與手機底部導覽 |

各頁的「切換主題」可選擇其他整套設計。選擇後按「套用完整主題」才切換。
「還原第一版」切回原本墨綠設計。關閉／Escape 不套用未確認的選擇。
切換會導航至該完整主題的固定同站路徑，不只是修改 CSS 顏色。

## 共用核心與主題分離

- `shared/app.js`：三版共用的會員、帳單、收據、公告、活動等示範功能。
- `shared/demo-state.js`：本分頁的固定虛構活動ID及篩選條件；三版共用。
- `shared/theme-catalog.js`：可擴充主題目錄（ID、名稱、路徑、配圖、對話窗標籤）。
- `shared/themes.js`：主題目錄驗證、同站路徑及偏好；不把選項數量寫死為三個。
- `shared/theme-picker.js`、`theme-picker.css`：三版共用主題選擇器。
- `v1/`、`v2/`、`v3/`：各自完整 HTML 版型、CSS 和圖片；第三版另有 core.js。
- `portal/`：固定入口，第一次預設v1；以後採用儲存的完整主題ID。
- 原本 v1 的 navy/ivory 變色檔與三份舊 app.js 不再被頁面載入，僅保留歷史參考。

新增完整主題時，新增獨立版型／樣式，在 theme-catalog.js 加入固定登錄，並使用同一套共用腳本。
版型需保留現有共用功能的 `data-panel`、`data-event`、`data-filter`、對話窗及選單契約。
第三版的3D為該主題專屬；不應讓其在第一版或第二版載入。

## 以後加入第四、第五套主題

1. 建立例如 `v4/index.html`、`v4/styles.css` 與該主題的圖片。這是新設計的檔案，不是複製一套業務系統。
2. 根元素設定 `data-site-theme="v4"`。載入 theme-catalog.js → themes.js → demo-state.js → app.js → theme-picker.js，和共用 theme-picker.css。
3. 在目錄加入 `{id:'v4',name:'第四版｜你的主題',description:'主題簡述',path:'v4/',image:'v4/assets/cover.jpg',dialogKicker:'YOUR CLUB'}`。
4. 切換選單自動新增第四個選項，不必修改選擇器或共用業務程式；之後第五套亦同。
5. 驗證手機排版、文字對比、全部入口、主題互換與示範狀態保留，再依發布流程上線。比較首頁若需要專屬介紹，可另外更新其展示卡片。

新主題需保留的核心掛點：`#detail-dialog`、`#dialog-content`、`#dialog-title`（由共用核心建立）、`#dialog-kicker`、`#dialog-close`、`#toast`、`#sidebar`、`#sidebar-shade`、`#menu-button`、`#filter-result`、`#layout-theme-trigger`。
會員活動數使用 `.member-stats button strong`；活動卡片用 `data-category`／`data-event`，篩選器用 `data-filter`。功能按鈕維持原有 `data-panel` 鍵。
視覺本身不受三款現有風格限制；只要保留上述掛點，就能共用同一套功能。

目錄只接受唯一ID、固定同站資料夾及圖片路徑；不能從瀏覽器儲存或任意網址動態安裝主題程式。
目前仍只有三套實際完成的設計；第四、第五套是可擴充能力，不是假裝已完成的新設計。

## demo 與正式系統的邊界

localStorage的 `north-lions.demo.full-theme.v1` 只記住v1/v2/v3；舊配色偏好忽略。
sessionStorage的 `north-lions.demo.portal-state.v1` 只接受meeting/service/social等固定示意活動ID及篩選條件。
無真實會員資料、付款或個人表單儲存；不讀取或清除其他儲存鍵。儲存受限時會提示。
未連接正式網站、未設定全會共用主題、未修改權限與財務。
正式整合時，將共用示範核心換成現有業務資料層，讓主題只承擔顯示；全站主題設定需透過正式管理流程另行接入。

# Design Tokens

> 來源：Figma Design Guideline（node 3188:100693、3199:50511）
> 所有顏色與字體皆須使用 CSS 變數，禁止直接寫入 hex 值或 px 值。

---

## Typography

字體一律使用 **PingFang TC**，line-height 皆為 `auto`。

| Token | Size | Weight | 用途 |
|---|---|---|---|
| fonts-semibold-h1 | 24px | Semibold（600） | H1、標題大 |
| fonts-medium-h1 | 24px | Medium（500） | H1、標題大 |
| fonts-regular-h2 | 20px | Regular（400） | H2、標題中 |
| fonts-medium-p1 | 16px | Medium（500） | P1、次標題、內文 |
| fonts-regular-p1 | 15px | Regular（400） | P2、按鈕 |
| fonts-regulare-p2 | 14px | Regular（400） | P3、按鈕 |
| fonts-semibold-p3 | 12px | Semibold（600） | P4、輔助文案 / 次要文案 |
| fonts-regular-p3 | 12px | Regular（400） | P4、Detail info、輔助文案 / 次要文案 |
| fonts-regular-s1 | 10px | Regular（400） | S1、底部導航 |
| fonts-regular-s2 | 9px | Regular（400） | S2、Tag |

---

## Primary

| Token | CSS Variable | Hex | 用途 |
|---|---|---|---|
| color-primary-blue-main | `var(--color-primary-blue-main)` | #3A6EA5 | button |
| color-primary-blue-press | `var(--color-primary-blue-press)` | #204367 | button, input |
| color-primary-blue-disable | `var(--color-primary-blue-disable)` | #D4E2EA | button |

---

## Base White

| Token | CSS Variable | 色值 | 用途 |
|---|---|---|---|
| color-base-white-main | `var(--color-base-white-main)` | #FFFFFF | button, text |
| color-base-white-transparent | `var(--color-base-white-transparent)` | rgba(255,255,255,0.5) | card |
| color-base-white-second | `var(--color-base-white-second)` | #F0F0F0 | App title bar |
| color-base-white-edit | `var(--color-base-white-edit)` | #F7F7F7 | Edit page bg |
| color-base-white-trans50 | `var(--color-base-white-trans50)` | rgba(255,255,255,0.5) | card |
| color-base-white-trans90 | `var(--color-base-white-trans90)` | rgba(255,255,255,0.9) | tab |
| color-base-white-blue | `var(--color-base-white-blue)` | #E1E9F0 | bg |
| color-base-white-gradient-light | `var(--color-base-white-gradient-light)` | #E6F0F7 | bg-gradient-light |
| color-base-white-gradient-dark | `var(--color-base-white-gradient-dark)` | #C9D4E3 | bg-gradient-dark |

---

## Base Grey

| Token | CSS Variable | Hex | 用途 |
|---|---|---|---|
| color-base-grey-divider | `var(--color-base-grey-divider)` | #C2C2C2 | divider |
| color-base-grey-input | `var(--color-base-grey-input)` | #D9D9D9 | input, tag |
| color-base-grey-card | `var(--color-base-grey-card)` | #FEFEFE | card, bg |

---

## Text

| Token | CSS Variable | Hex | 用途 |
|---|---|---|---|
| color-text-main | `var(--color-text-main)` | #333333 | text |
| color-text-secondary | `var(--color-text-secondary)` | #666666 | text |
| color-text-placeholder | `var(--color-text-placeholder)` | #999999 | text |
| color-text-link | `var(--color-text-link)` | #2E739E | text |
| color-text-unfocus | `var(--color-text-unfocus)` | #8AADC2 | text |
| color-text-white | `var(--color-text-white)` | #FFFFFF | text |

---

## Notice

| Token | CSS Variable | Hex | 用途 |
|---|---|---|---|
| color-base-notice-success | `var(--color-base-notice-success)` | #337C05 | success |
| color-base-notice-error | `var(--color-base-notice-error)` | #DD330D | error |
| color-base-notice-notify | `var(--color-base-notice-notify)` | #DD9F18 | notify |
| color-base-notice-warning | `var(--color-base-notice-warning)` | #FF9583 | warning |
| color-base-notice-success-tag | `var(--color-base-notice-success-tag)` | #C5DCB6 | success-tag |
| color-base-notice-warning-tag | `var(--color-base-notice-warning-tag)` | #F1CEB1 | warning-tag |
| color-base-notice-blue-tag | `var(--color-base-notice-blue-tag)` | #CEE4F1 | blue-tag |

---

## Secondary

| Token | CSS Variable | Hex | 用途 |
|---|---|---|---|
| color-secondary-yellow | `var(--color-secondary-yellow)` | #FACD6D | secondary-yellow |
| color-secondary-blue | `var(--color-secondary-blue)` | #0578B5 | secondary-blue |

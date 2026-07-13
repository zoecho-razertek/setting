import { useState } from 'react'
import './BankCodeSheet.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicSearch    from '../assets/ic_basic_search.svg'
import { BANK_OPTIONS } from '../bankOptions'

/**
 * BankCodeSheet — 銀行代碼列表
 * Figma: 11.5k.2_帳戶相關_銀行列表 (node 567:56966)
 *
 * 疊在 BankAccountEditSheet 之上的巢狀彈窗：畫面維持原本整頁的樣式
 * （狀態列、標題列、返回鍵），但以覆蓋層的方式渲染，不經過 App 導頁，
 * 因此返回時不會讓下層彈窗重新播放滑入動畫。關鍵字即時篩選銀行代碼／名稱。
 *
 * Props:
 *   onSelect {function} (code: string) => void
 *   onClose  {function} () => void
 */
export default function BankCodeSheet({ onSelect, onClose }) {
  const [keyword, setKeyword] = useState('')

  const filtered = BANK_OPTIONS.filter(bank =>
    `${bank.code} ${bank.name}`.toLowerCase().includes(keyword.trim().toLowerCase())
  )

  return (
    <div className="bcs-page" onClick={e => e.stopPropagation()}>

      {/* Status bar */}
      <div className="bcs-status">
        <span className="bcs-status-time">9:41</span>
        <div className="bcs-status-icons">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0"    y="3"   width="3" height="9"    rx="1" fill="#333" />
            <rect x="4.5"  y="2"   width="3" height="10"   rx="1" fill="#333" />
            <rect x="9"    y="0.5" width="3" height="11.5" rx="1" fill="#333" />
            <rect x="13.5" y="0"   width="3" height="12"   rx="1" fill="#333" opacity="0.35" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.5C13.2 1.7 10.7 0.5 8 0.5C5.3 0.5 2.8 1.7 1 3.5L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z" fill="#333"/>
            <path d="M8 5.5C9.5 5.5 10.9 6.1 11.9 7.1L13.3 5.7C11.9 4.3 10 3.5 8 3.5C6 3.5 4.1 4.3 2.7 5.7L4.1 7.1C5.1 6.1 6.5 5.5 8 5.5Z" fill="#333"/>
            <circle cx="8" cy="10" r="1.5" fill="#333"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35"/>
            <rect x="22" y="4" width="2" height="4" rx="1" fill="#333" fillOpacity="0.4"/>
            <rect x="2"  y="2" width="17" height="8" rx="2" fill="#333"/>
          </svg>
        </div>
      </div>

      {/* Title bar */}
      <div className="bcs-titlebar">
        <button className="bcs-back-btn" onClick={onClose}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="bcs-title">銀行代碼</span>
      </div>

      {/* Search */}
      <div className="bcs-search-wrap">
        <div className="bcs-search-box">
          <input
            type="text"
            className="bcs-search-input"
            placeholder="輸入關鍵字尋找"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            autoFocus
          />
          <img src={icBasicSearch} alt="" className="bcs-search-icon" />
        </div>
      </div>

      {/* Body */}
      <div className="bcs-scroll">
        <div className="bcs-table">
          {filtered.map(bank => (
            <button key={bank.code} className="bcs-cell" onClick={() => onSelect(bank.code)}>
              <span className="bcs-cell-label">{bank.code} {bank.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

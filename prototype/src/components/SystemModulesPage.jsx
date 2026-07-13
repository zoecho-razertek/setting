import './SystemModulesPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicArrowNext from '../assets/ic_basic_arrow_next.png'

const CELLS = [
  { label: '帳務系統', value: '已啟用', action: 'billingSystem' },
]

/**
 * SystemModulesPage — 系統模組設定頁
 * Figma: 11.5.4_系統模組設定 (node 1521:97077)
 *
 * Props:
 *   onBack       {function} () => void
 *   onCellSelect {function} (action: string) => void
 */
export default function SystemModulesPage({ onBack, onCellSelect }) {
  return (
    <div className="smp-page">

      {/* Status bar */}
      <div className="smp-status">
        <span className="smp-status-time">9:41</span>
        <div className="smp-status-icons">
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
      <div className="smp-titlebar">
        <button className="smp-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="smp-title">系統模組設定</span>
      </div>

      {/* Body */}
      <div className="smp-scroll">
        <div className="smp-table">
          {CELLS.map(cell => (
            <button key={cell.action} className="smp-cell" onClick={() => onCellSelect?.(cell.action)}>
              <span className="smp-cell-label">{cell.label}</span>
              <span className="smp-cell-info">
                <span className="smp-cell-value">{cell.value}</span>
                <img src={icBasicArrowNext} alt="" className="smp-cell-arrow" />
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

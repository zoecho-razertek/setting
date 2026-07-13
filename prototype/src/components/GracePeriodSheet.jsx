import './GracePeriodSheet.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicCheck     from '../assets/ic_basic_check.png'
import icBasicInfoSmall from '../assets/ic_basic_info_small.png'

const OPTIONS = ['無', '3 天', '5 天', '7 天', '10 天', '15 天', '30 天']

/**
 * GracePeriodSheet — 寬限期設定
 * Figma: 11.5j.1_催租方案_限用密碼_寬限期 (node 567:56875)
 *
 * 疊在 RestrictedPasswordSheet 之上的巢狀彈窗：畫面維持原本整頁的樣式
 * （狀態列、標題列、返回鍵），但以覆蓋層的方式渲染，不經過 App 導頁，
 * 因此返回時不會讓下層彈窗重新播放滑入動畫。
 *
 * Props:
 *   value    {string}   目前選中的寬限期（如「3 天」）
 *   onSelect {function} (value: string) => void
 *   onClose  {function} () => void
 */
export default function GracePeriodSheet({ value, onSelect, onClose }) {
  return (
    <div className="gps-page" onClick={e => e.stopPropagation()}>

      {/* Status bar */}
      <div className="gps-status">
        <span className="gps-status-time">9:41</span>
        <div className="gps-status-icons">
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
      <div className="gps-titlebar">
        <button className="gps-back-btn" onClick={onClose}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="gps-title">寬限期設定</span>
      </div>

      {/* Body */}
      <div className="gps-scroll">
        <div className="gps-table">
          {OPTIONS.map(option => (
            <button key={option} className="gps-cell" onClick={() => onSelect(option)}>
              <span className="gps-cell-label">{option}</span>
              {value === option && (
                <img src={icBasicCheck} alt="" className="gps-cell-check" />
              )}
            </button>
          ))}
        </div>

        <div className="gps-hint">
          <img src={icBasicInfoSmall} alt="" className="gps-hint-icon" />
          <div className="gps-hint-text">
            <p>寬限期是指「帳單繳租日＋寬限日」，超過寬限期的帳單，才會觸發限用指定密碼的功能。</p>
            <p>ex. 帳單繳租日是 05/01，寬限期 5 天，則超過 05/06 仍未繳租的話，電子鎖將會於 5/7 午夜 0:00 進入限用指定密碼的模式。</p>
          </div>
        </div>
      </div>
    </div>
  )
}

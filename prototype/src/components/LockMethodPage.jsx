import { useState } from 'react'
import './LockMethodPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicArrowNext from '../assets/ic_basic_arrow_next.png'
import icCellCard       from '../assets/ic_cell_card.png'
import icCellLock01     from '../assets/ic_cell_lock01.png'
import icBasicInfoSmall from '../assets/ic_basic_info_small.png'
import icInputEyeClose  from '../assets/ic_input_eye_close.png'
import icInputEyeOpen   from '../assets/ic_input_eye_open.png'

/**
 * LockMethodPage — 個人密碼與開鎖方式設定頁
 * Figma: 11.3b.0_開門密碼_個人端 (node 1614:22372)
 *
 * Props:
 *   cardCount    {number}    已綁定卡片數
 *   isCorporate  {boolean}   是否為團隊端
 *   onBack       {function}  () => void
 *   onCellSelect {function}  (action: string) => void
 */
export default function LockMethodPage({ cardCount = 0, isCorporate = false, onBack, onCellSelect }) {
  const [showCorporatePassword, setShowCorporatePassword] = useState(false)
  const corporatePassword = '0012300'

  return (
    <div className="plm-page">

      {/* Status bar */}
      <div className="plm-status">
        <span className="plm-status-time">9:41</span>
        <div className="plm-status-icons">
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
      <div className="plm-titlebar">
        <button className="plm-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="plm-title">密碼與開鎖方式</span>
      </div>

      {/* Body */}
      <div className="plm-scroll">

        <div className="plm-section">
          <span className="plm-section-title">感應開鎖</span>
          <div className="plm-card-group">
            <button className="plm-cell" onClick={() => onCellSelect?.('cardManagement')}>
              <span className="plm-cell-main">
                <img src={icCellCard} alt="" className="plm-cell-icon" />
                <span className="plm-cell-label">卡片管理</span>
              </span>
              <span className="plm-cell-info">
                <span className="plm-cell-value plm-cell-value--placeholder">{cardCount} 張卡片</span>
                <img src={icBasicArrowNext} alt="" className="plm-cell-arrow" />
              </span>
            </button>
          </div>
        </div>

        <div className="plm-section">
          <span className="plm-section-title">密碼開鎖</span>
          <div className="plm-card-group">
            <button
              className={`plm-cell${isCorporate ? ' plm-cell--no-active-bg' : ''}`}
              onClick={() => {
                if (isCorporate) {
                  setShowCorporatePassword(prev => !prev)
                } else {
                  onCellSelect?.('doorPassword')
                }
              }}
            >
              <span className="plm-cell-main">
                <img src={icCellLock01} alt="" className="plm-cell-icon" />
                <span className="plm-cell-label">開門密碼</span>
              </span>
              <span className={`plm-cell-info${isCorporate ? ' plm-cell-info--password-toggle' : ''}`}>
                <span className="plm-cell-value plm-cell-value--placeholder">
                  {isCorporate && showCorporatePassword ? corporatePassword : '00***00'}
                </span>
                <img
                  src={isCorporate ? (showCorporatePassword ? icInputEyeOpen : icInputEyeClose) : icBasicArrowNext}
                  alt=""
                  className="plm-cell-arrow"
                />
              </span>
            </button>
          </div>
        </div>

        <div className="plm-hint">
          <img src={icBasicInfoSmall} alt="" className="plm-hint-icon" />
          <p className="plm-hint-text">
            此開門密碼會應用至您管理、所有空置中房源的電子鎖，請妥善保管，勿截圖 / 轉傳。
          </p>
        </div>

      </div>

    </div>
  )
}

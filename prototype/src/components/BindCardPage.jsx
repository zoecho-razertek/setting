import { useEffect, useState } from 'react'
import './BindCardPage.css'
import imgAddCard        from '../assets/img_onboarding_addcard02.png'
import icBasicInfoSmall  from '../assets/ic_basic_info_small.png'

const SENSE_SECONDS = 30

/**
 * BindCardPage — 綁定卡片感應頁
 * Figma: 0.7.1_add card02 (node 5161:13783)
 *
 * 瀏覽器無法呼叫實體 NFC 感應，此原型改以「點擊卡片插圖」模擬感應成功，
 * 取代真實的 NFC 感應流程。
 *
 * Props:
 *   onExit   {function} () => void
 *   onSensed {function} () => void  感應成功（點擊插圖）後呼叫
 */
export default function BindCardPage({ onExit, onSensed }) {
  const [countdown, setCountdown] = useState(SENSE_SECONDS)

  useEffect(() => {
    if (countdown <= 0) return
    const id = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  return (
    <div className="bcp-page">

      {/* Status bar */}
      <div className="bcp-status">
        <span className="bcp-status-time">9:41</span>
        <div className="bcp-status-icons">
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
      <div className="bcp-titlebar">
        <span className="bcp-title">綁定卡片</span>
        <button className="bcp-exit-btn" onClick={onExit}>離開</button>
      </div>

      {/* Body */}
      <div className="bcp-scroll">
        <p className="bcp-info-text">
          請將卡片放置於手機背面進行感應。
        </p>

        {/* 點擊卡片插圖模擬 NFC 感應成功（瀏覽器無法呼叫實體 NFC） */}
        <button className="bcp-illustration-btn" onClick={onSensed}>
          <img src={imgAddCard} alt="" className="bcp-illustration" />
        </button>

        <p className="bcp-sense-text">
          請於時間內感應卡片... {countdown} 秒...
        </p>

        <div className="bcp-hint">
          <img src={icBasicInfoSmall} alt="" className="bcp-hint-icon" />
          <span className="bcp-hint-text">感應中請勿移動卡片</span>
        </div>
      </div>

      {/* Card info footer */}
      <div className="bcp-footer">
        <p className="bcp-footer-title">卡片說明：</p>
        <p className="bcp-footer-text">
          支援悠遊卡、一卡通、門禁卡，請使用 MH Lock 電子鎖主機綁卡，或透過 Android 手機進行綁定。
        </p>
        <p className="bcp-footer-link">購買更多客製化卡片 &gt;&gt;</p>
      </div>

    </div>
  )
}

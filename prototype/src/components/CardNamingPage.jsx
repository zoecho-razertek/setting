import { useState } from 'react'
import './CardNamingPage.css'
import imgAddCardDone from '../assets/img_onboarding_addcard03.png'

const NAME_MAX_LENGTH = 20

/**
 * CardNamingPage — 卡片綁定完成／命名頁
 * Figma: 0.7.2_add card03 (node 5162:14106)
 *
 * Props:
 *   onReturnToList  {function} (name: string) => void
 *   onBindAnother    {function} () => void
 */
export default function CardNamingPage({ onReturnToList, onBindAnother }) {
  const [name, setName] = useState('')
  const canReturn = name.trim().length > 0

  return (
    <div className="cnp-page">

      {/* Status bar */}
      <div className="cnp-status">
        <span className="cnp-status-time">9:41</span>
        <div className="cnp-status-icons">
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
      <div className="cnp-titlebar">
        <span className="cnp-title">綁定卡片</span>
      </div>

      {/* Body */}
      <div className="cnp-scroll">
        <p className="cnp-info-text">
          卡片已綁定！現在可以用這張卡片感應開啟 帳號下所有的電子鎖了！請幫您的卡片命名吧！
        </p>

        <div className="cnp-field">
          <div className="cnp-field-label-row">
            <label className="cnp-field-label">卡片名稱*</label>
            <span className="cnp-field-counter">{name.length}/{NAME_MAX_LENGTH}</span>
          </div>
          <input
            type="text"
            className="cnp-input"
            placeholder="請幫您的卡片命名吧！"
            maxLength={NAME_MAX_LENGTH}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <img src={imgAddCardDone} alt="" className="cnp-illustration" />
      </div>

      {/* Bottom actions */}
      <div className="cnp-bottom">
        <button
          className="cnp-primary-btn"
          disabled={!canReturn}
          onClick={() => onReturnToList?.(name)}
        >
          返回卡片列表
        </button>
        <button className="cnp-text-btn" onClick={onBindAnother}>繼續綁定卡片</button>
      </div>

    </div>
  )
}

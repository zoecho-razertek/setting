import { useState } from 'react'
import './ChangePhonePage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'

/**
 * ChangePhonePage — 變更手機頁
 * Figma: 0.2.2_sign up_phone (node 5156:13394)
 *
 * Props:
 *   onBack {function} () => void
 *   onNext {function} (phone: string) => void
 */
export default function ChangePhonePage({ onBack, onNext }) {
  const [phone, setPhone] = useState('')

  const canContinue = phone.replace(/\D/g, '').length >= 8

  return (
    <div className="chp-page">

      {/* Status bar */}
      <div className="chp-status">
        <span className="chp-status-time">9:41</span>
        <div className="chp-status-icons">
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

      {/* Title bar (back button only) */}
      <div className="chp-titlebar">
        <button className="chp-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
      </div>

      {/* Body */}
      <div className="chp-scroll">
        <h1 className="chp-heading">變更手機</h1>
        <p className="chp-subtitle">為了帳號安全，變更手機需進行驗證。</p>

        <div className="chp-input-row">
          <span className="chp-input-prefix">TW</span>
          <span className="chp-input-divider" />
          <input
            type="tel"
            className="chp-input"
            placeholder="請填寫新手機號碼"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <button
          className="chp-continue-btn"
          disabled={!canContinue}
          onClick={() => onNext?.(phone)}
        >
          繼續
        </button>
      </div>

    </div>
  )
}

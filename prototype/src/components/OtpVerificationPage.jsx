import { useEffect, useRef, useState } from 'react'
import './OtpVerificationPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'

const CODE_LENGTH = 6
const RESEND_SECONDS = 55

function formatCountdown(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

/**
 * OtpVerificationPage — 輸入驗證碼頁
 * Figma: 0.8.2_忘記密碼_驗證 (node 5157:13544)
 *
 * Props:
 *   onBack     {function} () => void
 *   onVerified {function} (code: string) => void
 */
export default function OtpVerificationPage({ onBack, onVerified }) {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''))
  const [countdown, setCountdown] = useState(RESEND_SECONDS)
  const inputRefs = useRef([])

  useEffect(() => {
    if (countdown <= 0) return
    const id = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  const code = digits.join('')
  const canContinue = code.length === CODE_LENGTH

  const handleChange = (i, raw) => {
    const value = raw.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = value
    setDigits(next)
    if (value && i < CODE_LENGTH - 1) inputRefs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputRefs.current[i - 1]?.focus()
  }

  const handleResend = () => {
    if (countdown > 0) return
    setCountdown(RESEND_SECONDS)
    setDigits(Array(CODE_LENGTH).fill(''))
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="otp-page">

      {/* Status bar */}
      <div className="otp-status">
        <span className="otp-status-time">9:41</span>
        <div className="otp-status-icons">
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
      <div className="otp-titlebar">
        <button className="otp-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="otp-title">MH Lock</span>
      </div>

      {/* Body */}
      <div className="otp-scroll">
        <h1 className="otp-heading">輸入驗證碼</h1>
        <p className="otp-subtitle">請輸入手機收到的 {CODE_LENGTH} 位驗證碼</p>

        <div className="otp-boxes">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              className="otp-box"
              value={d}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
            />
          ))}
        </div>

        <button
          className="otp-continue-btn"
          disabled={!canContinue}
          onClick={() => onVerified?.(code)}
        >
          繼續
        </button>

        <div className="otp-resend-block">
          <p className="otp-resend-hint">
            {countdown > 0 ? `沒收到驗證碼？${formatCountdown(countdown)} 後可重新發送` : '沒收到驗證碼？'}
          </p>
          <button
            className={`otp-resend-link${countdown > 0 ? ' otp-resend-link--disabled' : ''}`}
            disabled={countdown > 0}
            onClick={handleResend}
          >
            重新發送
          </button>
        </div>
      </div>

    </div>
  )
}

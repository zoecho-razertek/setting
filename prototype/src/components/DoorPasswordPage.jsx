import { useState } from 'react'
import './DoorPasswordPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icEyeOpen        from '../assets/ic_input_eye_open.png'
import icEyeClose       from '../assets/ic_input_eye_close.png'

const CURRENT_PASSWORD = '273881' // 目前設定的開門密碼（示意值）
const PASSWORD_PATTERN = /^\d{6,8}$/

/**
 * DoorPasswordPage — 變更開門密碼頁
 * Figma: 11.3b.1_個人開門密碼_設定密碼 (node 1614:22374)
 *
 * Props:
 *   onBack {function} () => void
 *   onSave {function} (newPassword: string) => void
 */
export default function DoorPasswordPage({ onBack, onSave }) {
  const [newPassword, setNewPassword]         = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword]         = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const confirmMismatch = confirmPassword.length > 0 && confirmPassword !== newPassword
  const canSave = PASSWORD_PATTERN.test(newPassword) && confirmPassword === newPassword

  return (
    <div className="dpp-page">

      {/* Status bar */}
      <div className="dpp-status">
        <span className="dpp-status-time">9:41</span>
        <div className="dpp-status-icons">
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
      <div className="dpp-titlebar">
        <button className="dpp-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="dpp-title">變更開門密碼</span>
      </div>

      {/* Body */}
      <div className="dpp-scroll">
        <div className="dpp-form">

          <div className="dpp-field">
            <div className="dpp-field-label-row">
              <label className="dpp-field-label">目前密碼*</label>
            </div>
            <input
              type="text"
              className="dpp-input dpp-input--readonly"
              value={CURRENT_PASSWORD}
              readOnly
            />
          </div>

          <div className="dpp-field">
            <div className="dpp-field-label-row">
              <label className="dpp-field-label">新密碼*</label>
            </div>
            <div className="dpp-input-wrap">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="dpp-input"
                placeholder="請輸入新密碼 (6-8 個數字)"
                inputMode="numeric"
                maxLength={8}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value.replace(/\D/g, ''))}
              />
              {newPassword.length > 0 && (
                <button
                  type="button"
                  className="dpp-eye-btn"
                  onClick={() => setShowNewPassword(v => !v)}
                >
                  <img src={showNewPassword ? icEyeOpen : icEyeClose} alt="" width={20} height={20} />
                </button>
              )}
            </div>
          </div>

          <div className="dpp-field">
            <div className="dpp-field-label-row">
              <label className="dpp-field-label">確認新密碼*</label>
            </div>
            <div className="dpp-input-wrap">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`dpp-input${confirmMismatch ? ' dpp-input--error' : ''}`}
                placeholder="請確認新密碼"
                inputMode="numeric"
                maxLength={8}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value.replace(/\D/g, ''))}
              />
              {confirmPassword.length > 0 && (
                <button
                  type="button"
                  className="dpp-eye-btn"
                  onClick={() => setShowConfirmPassword(v => !v)}
                >
                  <img src={showConfirmPassword ? icEyeOpen : icEyeClose} alt="" width={20} height={20} />
                </button>
              )}
            </div>
            {confirmMismatch && (
              <span className="dpp-field-error">和新密碼不符合</span>
            )}
          </div>

        </div>

        <button
          className="dpp-save-btn"
          disabled={!canSave}
          onClick={() => onSave?.(newPassword)}
        >
          儲存
        </button>
      </div>

    </div>
  )
}

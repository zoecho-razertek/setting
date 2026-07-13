import { useState } from 'react'
import './RestrictedPasswordSheet.css'
import icBasicArrowNext from '../assets/ic_basic_arrow_next.png'
import GracePeriodSheet  from './GracePeriodSheet'

/**
 * RestrictedPasswordSheet — 限用指定密碼設定彈窗
 * Figma: 11.5j.0_催租方案_限用密碼 (node 567:56868)
 *
 * 「寬限期」欄位點擊後疊出 GracePeriodSheet（巢狀彈窗），而非導頁或下拉選單，
 * 避免返回時本彈窗重新播放滑入動畫。
 *
 * Props:
 *   enabled          {boolean}  是否啟用限用指定密碼
 *   gracePeriodLabel {string}   寬限期目前顯示文字（如「3 天」）
 *   onSave           {function} (enabled: boolean) => void
 *   onGracePeriodChange {function} (value: string) => void
 *   onClose          {function} () => void
 */
export default function RestrictedPasswordSheet({ enabled, gracePeriodLabel, onSave, onGracePeriodChange, onClose }) {
  const [localEnabled, setLocalEnabled] = useState(enabled)
  const [showGracePeriod, setShowGracePeriod] = useState(false)

  return (
    <div className="rps-overlay" onClick={onClose}>
      <div className="rps-sheet" onClick={e => e.stopPropagation()}>
        <div className="rps-grabber" />
        <h2 className="rps-title">限用指定密碼</h2>

        <p className="rps-description">
          若有逾期的租金帳單，則電子鎖會進入限定模式，僅能使用密碼開門。承租方需每日至 App 索取新的開門密碼。繳租完成後，系統會自動解除限用指定密碼模式。
        </p>

        <div className="rps-options">
          <label className="rps-option">
            <input
              type="radio"
              name="restrictedPassword"
              className="rps-radio-input"
              checked={localEnabled}
              onChange={() => setLocalEnabled(true)}
            />
            <span className="rps-radio-dot" />
            <span className="rps-option-label">啟用「限用指定密碼」</span>
          </label>
          <label className="rps-option">
            <input
              type="radio"
              name="restrictedPassword"
              className="rps-radio-input"
              checked={!localEnabled}
              onChange={() => setLocalEnabled(false)}
            />
            <span className="rps-radio-dot" />
            <span className="rps-option-label">不使用</span>
          </label>
        </div>

        <div className="rps-field">
          <span className="rps-field-label">寬限期</span>
          <button
            className="rps-nav-row"
            disabled={!localEnabled}
            onClick={() => setShowGracePeriod(true)}
          >
            <span className="rps-nav-value">{gracePeriodLabel}</span>
            <img src={icBasicArrowNext} alt="" className="rps-nav-arrow" />
          </button>
        </div>

        <button className="rps-save-btn" onClick={() => onSave(localEnabled)}>儲存</button>
      </div>

      {showGracePeriod && (
        <GracePeriodSheet
          value={gracePeriodLabel}
          onSelect={value => {
            onGracePeriodChange?.(value)
            setShowGracePeriod(false)
          }}
          onClose={() => setShowGracePeriod(false)}
        />
      )}
    </div>
  )
}

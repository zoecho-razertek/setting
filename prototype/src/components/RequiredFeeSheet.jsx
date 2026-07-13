import { useState } from 'react'
import './RequiredFeeSheet.css'
import icInputDropdown from '../assets/ic_input_dropdown.png'

const FEE_TYPE_OPTIONS = [
  { value: 'depositAndFirstMonth', label: '押金與第一期租金' },
  { value: 'depositOnly',          label: '押金' },
]

/**
 * RequiredFeeSheet — 繳納指定費用設定彈窗
 * Figma: 11.5d.0_和約設定_綁定限制 (node 567:56856)
 *
 * Props:
 *   enabled  {boolean}  是否需先繳納指定費用
 *   feeType  {string}   指定費用類型
 *   onSave   {function} (enabled: boolean, feeType: string) => void
 *   onClose  {function} () => void
 */
export default function RequiredFeeSheet({ enabled, feeType, onSave, onClose }) {
  const [localEnabled, setLocalEnabled] = useState(enabled)
  const [localFeeType, setLocalFeeType] = useState(feeType)

  return (
    <div className="rfs-overlay" onClick={onClose}>
      <div className="rfs-sheet" onClick={e => e.stopPropagation()}>
        <div className="rfs-grabber" />
        <h2 className="rfs-title">繳納指定費用</h2>

        <p className="rfs-description">
          您可設定「完成付款」為綁定租約的前置條件。
        </p>
        <p className="rfs-description">
          開啟後，系統將要求承租方先完成指定費用付款，才能進入下一步租約綁定流程。
        </p>

        <div className="rfs-options">
          <label className="rfs-option">
            <input
              type="radio"
              name="requiredFee"
              className="rfs-radio-input"
              checked={localEnabled}
              onChange={() => setLocalEnabled(true)}
            />
            <span className="rfs-radio-dot" />
            <span className="rfs-option-label">預設「需繳納指定費用」</span>
          </label>
          <label className="rfs-option">
            <input
              type="radio"
              name="requiredFee"
              className="rfs-radio-input"
              checked={!localEnabled}
              onChange={() => setLocalEnabled(false)}
            />
            <span className="rfs-radio-dot" />
            <span className="rfs-option-label">不使用</span>
          </label>
        </div>

        <div className="rfs-field">
          <span className="rfs-field-label">預設指定費用*</span>
          <div className="rfs-select-wrap">
            <select
              className="rfs-select"
              value={localFeeType}
              disabled={!localEnabled}
              onChange={e => setLocalFeeType(e.target.value)}
            >
              {FEE_TYPE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <img src={icInputDropdown} alt="" className="rfs-select-arrow" />
          </div>
        </div>

        <button className="rfs-save-btn" onClick={() => onSave(localEnabled, localFeeType)}>儲存</button>
      </div>
    </div>
  )
}

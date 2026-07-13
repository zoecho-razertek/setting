import { useRef, useState } from 'react'
import './EditFieldSheet.css'
import icInputDropdown from '../assets/ic_input_dropdown.png'

function formatDate(raw) {
  if (!raw) return ''
  const [y, m, d] = raw.split('-')
  return `${y}/${m}/${d}`
}

/**
 * EditFieldSheet — 單一欄位編輯的底部彈出視窗
 * Figma: 3.7e.1_基本設定_電子鎖名稱 (node 5148:96971，套用於姓名／生日欄位編輯)
 *
 * Props:
 *   field  {object}  { key, title, label, type: 'text'|'date', value, maxLength?, description? }
 *   onSave {function} (value: string) => void
 *   onClose {function} () => void
 */
export default function EditFieldSheet({ field, onSave, onClose }) {
  const [value, setValue] = useState(field.value || '')
  const dateInputRef = useRef(null)

  const openDatePicker = () => {
    try { dateInputRef.current?.showPicker() } catch { dateInputRef.current?.click() }
  }

  return (
    <div className="efs-overlay" onClick={onClose}>
      <div className="efs-sheet" onClick={e => e.stopPropagation()}>
        <div className="efs-grabber" />
        <h2 className="efs-title">{field.title || field.label}</h2>
        {field.description && (
          <p className="efs-field-description">{field.description}</p>
        )}

        <div className="efs-field">
          <div className="efs-field-label-row">
            <span className="efs-field-label">{field.label}*</span>
            {field.type === 'text' && (
              <span className="efs-field-counter">{value.length}/{field.maxLength}</span>
            )}
          </div>
          {field.type === 'date' ? (
            <div className="efs-date-row" onClick={openDatePicker}>
              <input
                ref={dateInputRef}
                type="date"
                className="efs-date-input-hidden"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
              <span className={`efs-date-text${value ? '' : ' efs-date-text--placeholder'}`}>
                {value ? formatDate(value) : '請選擇日期'}
              </span>
              <img src={icInputDropdown} alt="" className="efs-date-arrow" />
            </div>
          ) : (
            <input
              type="text"
              className="efs-input"
              value={value}
              maxLength={field.maxLength}
              onChange={e => setValue(e.target.value)}
            />
          )}
        </div>

        <button className="efs-save-btn" onClick={() => onSave(value)}>儲存</button>
      </div>
    </div>
  )
}

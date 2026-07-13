import { useState } from 'react'
import './NumberFieldSheet.css'

/**
 * NumberFieldSheet — 數字輸入設定的底部彈出視窗（如：N 天前通知）
 * Figma: 11.5g.0_和約設定_繳費通知 (node 822:90117)
 *
 * Props:
 *   field  {object}  { title, description, suffix, value, min?, max? }
 *   onSave {function} (value: number) => void
 *   onClose {function} () => void
 */
export default function NumberFieldSheet({ field, onSave, onClose }) {
  const [value, setValue] = useState(field.value)

  const handleChange = (raw) => {
    const digits = raw.replace(/\D/g, '')
    setValue(digits === '' ? '' : Number(digits))
  }

  return (
    <div className="nfs-overlay" onClick={onClose}>
      <div className="nfs-sheet" onClick={e => e.stopPropagation()}>
        <div className="nfs-grabber" />
        <h2 className="nfs-title">{field.title}</h2>

        {field.description && (
          <p className="nfs-description">{field.description}</p>
        )}

        <div className="nfs-input-row">
          <input
            type="text"
            inputMode="numeric"
            className="nfs-input"
            value={value}
            onChange={e => handleChange(e.target.value)}
          />
          <span className="nfs-suffix">{field.suffix}</span>
        </div>

        <button
          className="nfs-save-btn"
          disabled={value === ''}
          onClick={() => onSave(Number(value))}
        >
          儲存
        </button>
      </div>
    </div>
  )
}

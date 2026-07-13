import { useState } from 'react'
import './SelectFieldSheet.css'

/**
 * SelectFieldSheet — 單選項設定的底部彈出視窗
 * Figma: 11.5b.0_和約設定_租賃模式 (node 957:72986)
 *
 * Props:
 *   field  {object}  { title, description: string|string[], options: [{value, label}], value }
 *   onSave {function} (value: string) => void
 *   onClose {function} () => void
 */
export default function SelectFieldSheet({ field, onSave, onClose }) {
  const [value, setValue] = useState(field.value)
  const descriptions = field.description
    ? [].concat(field.description)
    : []

  return (
    <div className="sfs-overlay" onClick={onClose}>
      <div className="sfs-sheet" onClick={e => e.stopPropagation()}>
        <div className="sfs-grabber" />
        <h2 className="sfs-title">{field.title}</h2>

        {descriptions.map((paragraph, i) => (
          <p key={i} className="sfs-description">{paragraph}</p>
        ))}

        <div className="sfs-options">
          {field.options.map(opt => (
            <label key={opt.value} className="sfs-option">
              <input
                type="radio"
                name={field.title}
                className="sfs-radio-input"
                checked={value === opt.value}
                onChange={() => setValue(opt.value)}
              />
              <span className="sfs-radio-dot" />
              <span className="sfs-option-label">{opt.label}</span>
            </label>
          ))}
        </div>

        <button className="sfs-save-btn" onClick={() => onSave(value)}>儲存</button>
      </div>
    </div>
  )
}

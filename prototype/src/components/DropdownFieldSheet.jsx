import { useState } from 'react'
import './DropdownFieldSheet.css'
import icInputDropdown from '../assets/ic_input_dropdown.png'

/**
 * DropdownFieldSheet — 下拉選單設定的底部彈出視窗
 * Figma: 11.5e.0_和約設定_收租週期 (node 567:56943)
 *
 * Props:
 *   field  {object}  { title, options: [{value, label}], value }
 *   onSave {function} (value: string) => void
 *   onClose {function} () => void
 */
export default function DropdownFieldSheet({ field, onSave, onClose }) {
  const [value, setValue] = useState(field.value)

  return (
    <div className="dfs-overlay" onClick={onClose}>
      <div className="dfs-sheet" onClick={e => e.stopPropagation()}>
        <div className="dfs-grabber" />
        <h2 className="dfs-title">{field.title}</h2>

        <div className="dfs-select-wrap">
          <select
            className="dfs-select"
            value={value}
            onChange={e => setValue(e.target.value)}
          >
            {field.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <img src={icInputDropdown} alt="" className="dfs-select-arrow" />
        </div>

        <button className="dfs-save-btn" onClick={() => onSave(value)}>儲存</button>
      </div>
    </div>
  )
}

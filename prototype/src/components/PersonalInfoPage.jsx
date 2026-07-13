import { useState } from 'react'
import './PersonalInfoPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicArrowNext from '../assets/ic_basic_arrow_next.png'
import icBasicCamera    from '../assets/ic_basic_camera.png'
import imgDefaultAvatar from '../assets/img_default_avatar.png'
import EditFieldSheet   from './EditFieldSheet'

const EDITABLE_FIELDS = {
  姓名: { key: 'name',     title: '編輯姓名', label: '姓名', type: 'text', maxLength: 20 },
  生日: { key: 'birthday', title: '輸入生日', label: '生日', type: 'date',
          description: '讓我們在特別的日子，給你專屬的祝福' },
}

function formatBirthday(raw) {
  if (!raw) return ''
  const [y, m, d] = raw.split('-')
  return `${y}/${m}/${d}`
}

/**
 * PersonalInfoPage — 個人資訊頁
 * Figma: 11.1a.0_個人資訊 (node 567:56812)
 *
 * Props:
 *   onBack       {function}  () => void
 *   onFieldSelect {function} (label: string) => void
 *   onSaved      {function}  () => void
 */
export default function PersonalInfoPage({ onBack, onFieldSelect, onSaved }) {
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [editingField, setEditingField] = useState(null) // '姓名' | '生日' | null

  const FIELDS = [
    { label: 'MH 帳號',    value: 'wan***@gmail.com', tone: 'main', arrow: false },
    { label: 'App 登入密碼', value: '',                 tone: 'main' },
    { label: '姓名',       value: name     || '尚未填寫', tone: name     ? 'main' : 'placeholder' },
    { label: '生日',       value: birthday ? formatBirthday(birthday) : '尚未填寫', tone: birthday ? 'main' : 'placeholder' },
    { label: '手機號碼',   value: '09***123',         tone: 'secondary' },
    { label: 'Google 帳號', value: '尚未綁定',          tone: 'placeholder' },
    { label: 'Line 帳號',   value: '尚未綁定',          tone: 'placeholder' },
    { label: 'Apple 帳號',  value: '尚未綁定',          tone: 'placeholder' },
  ]

  const handleCellClick = (label) => {
    if (EDITABLE_FIELDS[label]) {
      setEditingField(label)
    } else {
      onFieldSelect?.(label)
    }
  }

  const handleSheetSave = (value) => {
    if (editingField === '姓名') setName(value)
    if (editingField === '生日') setBirthday(value)
    setEditingField(null)
    onSaved?.()
  }

  return (
    <div className="pip-page">

      {/* Status bar */}
      <div className="pip-status">
        <span className="pip-status-time">9:41</span>
        <div className="pip-status-icons">
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
      <div className="pip-titlebar">
        <button className="pip-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="pip-title">個人資訊</span>
      </div>

      {/* Scrollable body */}
      <div className="pip-scroll">

        {/* Avatar */}
        <div className="pip-avatar-row">
          <div className="pip-avatar-wrap">
            <img src={imgDefaultAvatar} alt="" className="pip-avatar" />
            <button className="pip-camera-btn" onClick={() => onFieldSelect?.('avatar')}>
              <img src={icBasicCamera} alt="" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* Field table */}
        <div className="pip-table">
          {FIELDS.map(f => (
            <button key={f.label} className="pip-cell" onClick={() => handleCellClick(f.label)}>
              <span className="pip-cell-label">{f.label}</span>
              <span className="pip-cell-info">
                <span className={`pip-cell-value pip-cell-value--${f.tone}`}>{f.value}</span>
                {f.arrow !== false && <img src={icBasicArrowNext} alt="" className="pip-cell-arrow" />}
              </span>
            </button>
          ))}
        </div>

        {/* Delete account */}
        <div className="pip-bottom">
          <button className="pip-delete-btn" onClick={() => onFieldSelect?.('deleteAccount')}>刪除帳號</button>
          <span className="pip-delete-caption">刪除房東版 MH Lock 帳號。</span>
        </div>
      </div>

      {editingField && (
        <EditFieldSheet
          field={{ ...EDITABLE_FIELDS[editingField], value: editingField === '姓名' ? name : birthday }}
          onSave={handleSheetSave}
          onClose={() => setEditingField(null)}
        />
      )}

    </div>
  )
}

import { useState } from 'react'
import './CardEditPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicTrash     from '../assets/ic_basic_trash.png'
import icBasicArrowNext from '../assets/ic_basic_arrow_next.png'
import imgCardKey       from '../assets/Card_key.png'
import EditFieldSheet   from './EditFieldSheet'

/**
 * CardEditPage — 卡片編輯頁
 * Figma: 3.2b.0_卡片編輯_全訂閱 (node 1614:22457)
 *
 * Props:
 *   card     {object}   { id, name, cardId, activatedAt }
 *   onBack   {function} () => void
 *   onRename {function} (id, name) => void
 *   onDelete {function} (id) => void
 */
export default function CardEditPage({ card, onBack, onRename, onDelete }) {
  const [editingName, setEditingName] = useState(false)

  return (
    <div className="cep-page">

      {/* Status bar */}
      <div className="cep-status">
        <span className="cep-status-time">9:41</span>
        <div className="cep-status-icons">
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
      <div className="cep-titlebar">
        <button className="cep-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="cep-title">卡片管理</span>
        <button className="cep-delete-btn" onClick={() => onDelete?.(card.id)}>
          <img src={icBasicTrash} alt="" width={24} height={24} />
        </button>
      </div>

      {/* Body */}
      <div className="cep-scroll">

        <div className="cep-card">
          <img src={imgCardKey} alt="" className="cep-card-bg" />
          <span className="cep-card-name">{card.name}</span>
        </div>

        <div className="cep-section">
          <span className="cep-section-title">基本資料</span>
          <div className="cep-card-group">
            <button className="cep-cell" onClick={() => setEditingName(true)}>
              <span className="cep-cell-label">卡片名稱</span>
              <span className="cep-cell-info">
                <span className="cep-cell-value">{card.name}</span>
                <img src={icBasicArrowNext} alt="" className="cep-cell-arrow" />
              </span>
            </button>
            <div className="cep-cell">
              <span className="cep-cell-label">卡片 ID</span>
              <span className="cep-cell-info">
                <span className="cep-cell-value cep-cell-value--placeholder">{card.cardId}</span>
              </span>
            </div>
            <div className="cep-cell">
              <span className="cep-cell-label">啟用時間</span>
              <span className="cep-cell-info">
                <span className="cep-cell-value cep-cell-value--placeholder">{card.activatedAt}</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {editingName && (
        <EditFieldSheet
          field={{ title: '編輯卡片名稱', label: '卡片名稱', type: 'text', maxLength: 20, value: card.name }}
          onSave={value => { onRename?.(card.id, value); setEditingName(false) }}
          onClose={() => setEditingName(false)}
        />
      )}

    </div>
  )
}

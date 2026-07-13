import './CardManagementPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicAdd       from '../assets/ic_basic_add.png'
import imgDefaultCard   from '../assets/img_default_card.png'
import imgCardKey       from '../assets/Card_key.png'

/**
 * CardManagementPage — 卡片管理頁（空值／有資料）
 * Figma 空值: 11.3c.0_開門設定_通用_卡片 (node 1614:22169)
 * Figma 有資料: 3.2a.3_卡片管理 (node 1520:49326)
 *
 * Props:
 *   cards       {Array<{id, name}>} 已綁定的卡片列表
 *   onBack      {function} () => void
 *   onAddCard   {function} () => void
 *   onTutorial  {function} () => void
 *   onCardSelect {function} (id) => void
 */
export default function CardManagementPage({ cards = [], onBack, onAddCard, onTutorial, onCardSelect }) {
  const hasCards = cards.length > 0

  return (
    <div className="cmp-page">

      {/* Status bar */}
      <div className="cmp-status">
        <span className="cmp-status-time">9:41</span>
        <div className="cmp-status-icons">
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
      <div className="cmp-titlebar">
        <button className="cmp-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="cmp-title">卡片管理</span>
        {hasCards && (
          <button className="cmp-add-icon-btn" onClick={onAddCard}>
            <img src={icBasicAdd} alt="" width={24} height={24} />
          </button>
        )}
      </div>

      {/* Body */}
      {hasCards ? (
        <div className="cmp-scroll">
          <div className="cmp-card-list">
            {cards.map(card => (
              <button key={card.id} className="cmp-card" onClick={() => onCardSelect?.(card.id)}>
                <img src={imgCardKey} alt="" className="cmp-card-bg" />
                <span className="cmp-card-name">{card.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="cmp-scroll">

          <div className="cmp-empty">
            <img src={imgDefaultCard} alt="" className="cmp-empty-img" />
            <p className="cmp-empty-text">還沒有卡片，新增後請下拉更新此頁面。</p>
            <button className="cmp-add-btn" onClick={onAddCard}>新增卡片</button>
          </div>

          <div className="cmp-divider-row">
            <span className="cmp-divider-line" />
            <span className="cmp-divider-text">or</span>
            <span className="cmp-divider-line" />
          </div>

          <div className="cmp-help">
            <p className="cmp-help-text">如何新增卡片？</p>
            <button className="cmp-help-link" onClick={onTutorial}>卡片教學</button>
          </div>

        </div>
      )}

    </div>
  )
}

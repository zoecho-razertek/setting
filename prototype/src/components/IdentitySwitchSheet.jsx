import './IdentitySwitchSheet.css'
import icBasicCheck from '../assets/ic_basic_check.png'
import { IDENTITIES } from '../identities'

/**
 * IdentitySwitchSheet — 切換房東身份彈窗
 * Figma: 11.0.2_設定_身份切換 (node 995:34996)
 *
 * Props:
 *   currentId {string}   目前選中的身份 id
 *   onSelect  {function} (id: string) => void
 *   onClose   {function} () => void
 */
export default function IdentitySwitchSheet({ currentId, onSelect, onClose }) {
  return (
    <div className="iss-overlay" onClick={onClose}>
      <div className="iss-sheet" onClick={e => e.stopPropagation()}>
        <div className="iss-grabber" />
        <h2 className="iss-title">切換房東身份</h2>

        <div className="iss-list">
          {IDENTITIES.map(identity => {
            const selected = identity.id === currentId
            return (
              <button
                key={identity.id}
                className={`iss-card${selected ? ' iss-card--selected' : ''}`}
                onClick={() => onSelect(identity.id)}
              >
                <img src={identity.img} alt="" className="iss-avatar" />
                <div className="iss-text">
                  <span className="iss-name">{identity.name}</span>
                  <span className="iss-role">{identity.role}</span>
                </div>
                {selected && <img src={icBasicCheck} alt="" className="iss-check" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

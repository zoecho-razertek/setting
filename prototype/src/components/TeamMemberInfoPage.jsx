import './TeamMemberInfoPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicCopy from '../assets/ic_basic_copy.png'

const MEMBER_DETAILS = {
  1: { name: 'Cindy', role: '團隊擁有者', position: '業務經理', email: 'cindy@yungching.com', phone: '09***123' },
  2: { name: 'Alex Chen', role: '團隊成員', position: '業務', email: 'alex@yungching.com', phone: '09***456' },
  3: { name: 'Kelly Wang', role: '團隊成員', position: '業務', email: 'kelly@yungching.com', phone: '09***789' },
  4: { name: 'Mia Lin', role: '團隊成員', position: '業務', email: 'mia@yungching.com', phone: '09***321' },
  5: { name: 'Ryan Wu', role: '團隊成員', position: '業務', email: 'ryan@yungching.com', phone: '09***654' },
  6: { name: '09***123', role: '團隊成員', position: '-', email: '-', phone: '09***123' },
  7: { name: '09***234', role: '尚未註冊', position: '-', email: '-', phone: '09***234' },
}

const PROPERTIES = ['台北套房・101', '台北套房・102', '台北套房・103']

function InfoRow({ label, value, copyable, onCopy }) {
  const content = (
    <>
      <span className="tmip-row-label">{label}</span>
      <span className="tmip-row-right">
        <span className="tmip-row-value">{value}</span>
        {copyable && <img src={icBasicCopy} alt="" className="tmip-copy-icon" />}
      </span>
    </>
  )

  if (copyable) {
    return (
      <button className="tmip-row tmip-row--clickable" type="button" onClick={() => onCopy?.(value)}>
        {content}
      </button>
    )
  }

  return (
    <div className="tmip-row">
      {content}
    </div>
  )
}

export default function TeamMemberInfoPage({ memberId, onBack, onCopied }) {
  const member = MEMBER_DETAILS[memberId] || MEMBER_DETAILS[1]
  const handleCopy = async (value) => {
    try {
      if (value && value !== '-') {
        await navigator.clipboard?.writeText(value)
      }
    } catch {
      // Clipboard availability depends on browser permissions; the prototype still confirms the action.
    }
    onCopied?.()
  }

  return (
    <div className="tmip-page">
      <div className="tmip-status">
        <span className="tmip-status-time">9:41</span>
        <div className="tmip-status-icons">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="3" width="3" height="9" rx="1" fill="#333" />
            <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#333" />
            <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#333" />
            <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#333" opacity="0.35" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.5C13.2 1.7 10.7 0.5 8 0.5C5.3 0.5 2.8 1.7 1 3.5L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z" fill="#333" />
            <path d="M8 5.5C9.5 5.5 10.9 6.1 11.9 7.1L13.3 5.7C11.9 4.3 10 3.5 8 3.5C6 3.5 4.1 4.3 2.7 5.7L4.1 7.1C5.1 6.1 6.5 5.5 8 5.5Z" fill="#333" />
            <circle cx="8" cy="10" r="1.5" fill="#333" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35" />
            <rect x="22" y="4" width="2" height="4" rx="1" fill="#333" fillOpacity="0.4" />
            <rect x="2" y="2" width="17" height="8" rx="2" fill="#333" />
          </svg>
        </div>
      </div>

      <div className="tmip-titlebar">
        <button className="tmip-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="tmip-title">團隊成員資訊</span>
      </div>

      <div className="tmip-scroll">
        <div className="tmip-photo-area">
          <div className="tmip-avatar" aria-hidden="true" />
        </div>

        <div className="tmip-table">
          <InfoRow label="姓名" value={member.name} />
          <InfoRow label="職位" value={member.position} />
          <InfoRow label="E-mail" value={member.email} copyable onCopy={handleCopy} />
          <InfoRow label="聯絡電話" value={member.phone} copyable onCopy={handleCopy} />
        </div>

        <div className="tmip-section-title">管理房源</div>
        <div className="tmip-table">
          {PROPERTIES.map(property => (
            <div className="tmip-row" key={property}>
              <span className="tmip-row-label">{property}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import './PersonalInfoPage.css'
import './TeamInfoPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicArrowNext from '../assets/ic_basic_arrow_next.png'
import icBasicCamera from '../assets/ic_basic_camera.png'
import imgCompany from '../assets/img_company.png'
import imgCompany2 from '../assets/img_company2.png'
import imgDefaultAvatar from '../assets/img_default_avatar.png'
import EditFieldSheet from './EditFieldSheet'

const EDITABLE_FIELDS = {
  姓名: { key: 'name', title: '編輯姓名', label: '姓名', type: 'text', maxLength: 20 },
  團隊名稱: { key: 'teamName', title: '編輯團隊資訊', label: '團隊名稱', type: 'text', maxLength: 20 },
  聯絡電話: { key: 'phone', title: '編輯聯絡電話', label: '聯絡電話', type: 'text', maxLength: 20 },
}

const TEAM_INFO = {
  yongching: {
    teamName: '永慶房屋',
    identity: '團隊擁有者',
    position: '業務經理',
    companyIcon: imgCompany,
    canEditTeamName: true,
  },
  sinyi: {
    teamName: '信義房屋',
    identity: '成員',
    position: '業務',
    companyIcon: imgCompany2,
    canEditTeamName: false,
  },
}

export default function TeamInfoPage({ identityId = 'yongching', onBack, onSaved }) {
  const teamInfo = TEAM_INFO[identityId] || TEAM_INFO.yongching
  const [name, setName] = useState('Cindy')
  const [teamName, setTeamName] = useState(teamInfo.teamName)
  const [phone, setPhone] = useState('09***123')
  const [editingField, setEditingField] = useState(null)

  const fields = [
    { label: 'MH帳號', value: 'wan***@gmail.com', tone: 'main', arrow: false },
    { label: '姓名', value: name, tone: 'main', arrow: true },
    {
      label: '團隊名稱',
      value: teamName,
      tone: 'main',
      arrow: teamInfo.canEditTeamName,
      companyIcon: teamInfo.companyIcon,
      gapBefore: true,
    },
    { label: '帳號身份', value: teamInfo.identity, tone: 'main', arrow: false },
    { label: '職位', value: teamInfo.position, tone: 'main', arrow: false },
    { label: '聯絡電話', value: phone || '尚未填寫', tone: phone ? 'secondary' : 'placeholder', arrow: true },
  ]

  const handleCellClick = (label) => {
    if (EDITABLE_FIELDS[label]) {
      setEditingField(label)
    }
  }

  const handleSheetSave = (value) => {
    if (editingField === '姓名') setName(value)
    if (editingField === '團隊名稱') setTeamName(value)
    if (editingField === '聯絡電話') setPhone(value)
    setEditingField(null)
    onSaved?.()
  }

  return (
    <div className="pip-page">
      <div className="pip-status">
        <span className="pip-status-time">9:41</span>
        <div className="pip-status-icons">
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

      <div className="pip-titlebar">
        <button className="pip-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="pip-title">個人資訊</span>
      </div>

      <div className="pip-scroll tip-scroll">
        <div className="pip-avatar-row">
          <div className="pip-avatar-wrap">
            <img src={imgDefaultAvatar} alt="" className="pip-avatar" />
            <button className="pip-camera-btn" type="button">
              <img src={icBasicCamera} alt="" width={24} height={24} />
            </button>
          </div>
        </div>

        <div className="pip-table tip-table">
          {fields.map(field => (
            <button
              key={field.label}
              className={`pip-cell${field.gapBefore ? ' tip-cell--gap-before' : ''}`}
              onClick={() => handleCellClick(field.label)}
              type="button"
            >
              <span className="pip-cell-label">{field.label}</span>
              <span className="pip-cell-info">
                {field.companyIcon && <img src={field.companyIcon} alt="" className="tip-company-icon" />}
                <span className={`pip-cell-value pip-cell-value--${field.tone}`}>{field.value}</span>
                {field.arrow && <img src={icBasicArrowNext} alt="" className="pip-cell-arrow" />}
              </span>
            </button>
          ))}
        </div>
      </div>

      {editingField && (
        <EditFieldSheet
          field={{
            ...EDITABLE_FIELDS[editingField],
            value: editingField === '姓名' ? name : editingField === '團隊名稱' ? teamName : phone,
            imageField: editingField === '團隊名稱' ? { label: '團隊圖示', src: teamInfo.companyIcon } : undefined,
          }}
          onSave={handleSheetSave}
          onClose={() => setEditingField(null)}
        />
      )}
    </div>
  )
}

import { useState } from 'react'
import './LeaseDefaultsPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicArrowNext from '../assets/ic_basic_arrow_next.png'
import icBasicInfoSmall from '../assets/ic_basic_info_small.png'
import SelectFieldSheet   from './SelectFieldSheet'
import RequiredFeeSheet   from './RequiredFeeSheet'
import WelcomeMessageSheet from './WelcomeMessageSheet'

const DEFAULT_WELCOME_MESSAGE =
  '👋 親愛的房客您好，\n' +
  '歡迎入住 <房源名稱>！很高興能成為您的房東，接下來的日子請多多指教。\n' +
  '若在居住或使用上有任何需求，請隨時透過此頻道與我聯繫。\n' +
  '祝您在這裡生活愉快、舒心自在！'

const SELECT_FIELDS = {
  rentalMode: {
    default: 'monthly',
    labels: { monthly: '月租', daily: '日租' },
    field: {
      title: '租賃模式',
      description: '使用「月租」模式，系統會按月列出費用清單。使用「日租」模式，費用需一次付清，系統僅列出一筆帳單。',
      options: [
        { value: 'monthly', label: '預設「月租」' },
        { value: 'daily',   label: '預設「日租」' },
      ],
    },
  },
  earlyTerminationFee: {
    default: 'withPenalty',
    labels: { withPenalty: '有違約金', noPenalty: '不需違約金' },
    field: {
      title: '中途退租違約金',
      description: '承租方於租約終止前退租，將於退租時酌收最高一個月的違約金。系統預設違約金唯一個月租金，如有需要，可在辦理退租手續時，修改違約金金額。',
      options: [
        { value: 'withPenalty', label: '預設使用「違約金」' },
        { value: 'noPenalty',   label: '不需違約金' },
      ],
    },
  },
  lockSharing: {
    default: 'shareable',
    labels: { shareable: '可共享', notShareable: '禁止共享' },
    field: {
      title: '電子鎖共享許可',
      description: [
        '開啟此功能後，承租方可將電子鎖權限分享給同住者（如：室友或家人）。',
        '若關閉，僅承租方本人可使用電子鎖開門。',
      ],
      options: [
        { value: 'shareable',    label: '預設「可共享電子鎖」' },
        { value: 'notShareable', label: '禁止共享' },
      ],
    },
  },
  showAvailableOnly: {
    default: 'onlyAvailable',
    labels: { onlyAvailable: '顯示可出租', showAll: '顯示全部' },
    field: {
      title: '房源顯示設定',
      description: '新增租約－選擇房源的時後，預設只顯示可簽約的房源。',
      options: [
        { value: 'onlyAvailable', label: '只顯示可簽約房源' },
        { value: 'showAll',       label: '顯示全部' },
      ],
    },
  },
}

/**
 * LeaseDefaultsPage — 租約預設值設定頁
 * Figma: 11.5.1_租約設定 (node 2061:193384)
 *
 * Props:
 *   onBack       {function} () => void
 *   onCellSelect {function} (action: string) => void
 *   onSaved      {function} () => void
 */
export default function LeaseDefaultsPage({ onBack, onCellSelect, onSaved }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(Object.entries(SELECT_FIELDS).map(([key, cfg]) => [key, cfg.default]))
  )
  const [requiredFeeEnabled, setRequiredFeeEnabled] = useState(true)
  const [requiredFeeType, setRequiredFeeType] = useState('depositAndFirstMonth')
  const [welcomeMessage, setWelcomeMessage] = useState(DEFAULT_WELCOME_MESSAGE)
  const [editingField, setEditingField] = useState(null) // action key | null

  const CELLS = [
    { label: '租賃模式',               value: SELECT_FIELDS.rentalMode.labels[values.rentalMode], action: 'rentalMode' },
    { label: '中途退租違約金',          value: SELECT_FIELDS.earlyTerminationFee.labels[values.earlyTerminationFee], action: 'earlyTerminationFee' },
    { label: '需先繳納指定費用',        value: requiredFeeEnabled ? '需先繳納' : '不使用', action: 'requiredFee' },
    { label: '電子鎖共享許可',          value: SELECT_FIELDS.lockSharing.labels[values.lockSharing], action: 'lockSharing' },
    { label: '簽約時只顯示可出租的房源', value: SELECT_FIELDS.showAvailableOnly.labels[values.showAvailableOnly], action: 'showAvailableOnly' },
    { label: '迎賓詞',                 value: '',       action: 'welcomeMessage' },
  ]

  const handleCellClick = (action) => {
    if (SELECT_FIELDS[action] || action === 'requiredFee' || action === 'welcomeMessage') {
      setEditingField(action)
    } else {
      onCellSelect?.(action)
    }
  }

  return (
    <div className="ldp-page">

      {/* Status bar */}
      <div className="ldp-status">
        <span className="ldp-status-time">9:41</span>
        <div className="ldp-status-icons">
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
      <div className="ldp-titlebar">
        <button className="ldp-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="ldp-title">租約預設值設定</span>
      </div>

      {/* Body */}
      <div className="ldp-scroll">
        <div className="ldp-table">
          {CELLS.map(cell => (
            <button key={cell.action} className="ldp-cell" onClick={() => handleCellClick(cell.action)}>
              <span className="ldp-cell-label">{cell.label}</span>
              <span className="ldp-cell-info">
                {cell.value && <span className="ldp-cell-value">{cell.value}</span>}
                <img src={icBasicArrowNext} alt="" className="ldp-cell-arrow" />
              </span>
            </button>
          ))}
        </div>

        <div className="ldp-hint">
          <img src={icBasicInfoSmall} alt="" className="ldp-hint-icon" />
          <p className="ldp-hint-text">
            此處設定會帶入租約，成為預設值。您仍可在新增租約時，根據需求進行修改。
          </p>
        </div>
      </div>

      {editingField && SELECT_FIELDS[editingField] && (
        <SelectFieldSheet
          field={{ ...SELECT_FIELDS[editingField].field, value: values[editingField] }}
          onSave={value => {
            setValues(prev => ({ ...prev, [editingField]: value }))
            setEditingField(null)
            onSaved?.()
          }}
          onClose={() => setEditingField(null)}
        />
      )}

      {editingField === 'requiredFee' && (
        <RequiredFeeSheet
          enabled={requiredFeeEnabled}
          feeType={requiredFeeType}
          onSave={(enabled, feeType) => {
            setRequiredFeeEnabled(enabled)
            setRequiredFeeType(feeType)
            setEditingField(null)
            onSaved?.()
          }}
          onClose={() => setEditingField(null)}
        />
      )}

      {editingField === 'welcomeMessage' && (
        <WelcomeMessageSheet
          value={welcomeMessage}
          onSave={text => {
            setWelcomeMessage(text)
            setEditingField(null)
            onSaved?.()
          }}
          onClose={() => setEditingField(null)}
        />
      )}

    </div>
  )
}

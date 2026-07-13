import { useState } from 'react'
import './BillingDefaultsPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicArrowNext from '../assets/ic_basic_arrow_next.png'
import icBasicInfoSmall from '../assets/ic_basic_info_small.png'
import DropdownFieldSheet     from './DropdownFieldSheet'
import SelectFieldSheet       from './SelectFieldSheet'
import NumberFieldSheet       from './NumberFieldSheet'
import RestrictedPasswordSheet from './RestrictedPasswordSheet'

const CHOICE_FIELDS = {
  paymentDeadline: {
    type: 'dropdown',
    default: '5',
    labels: { 5: '每月 5 號', 10: '每月 10 號', 15: '每月 15 號', 20: '每月 20 號', 25: '每月 25 號' },
    field: {
      title: '繳費期限',
      options: [
        { value: '5',  label: '每月 5 號' },
        { value: '10', label: '每月 10 號' },
        { value: '15', label: '每月 15 號' },
        { value: '20', label: '每月 20 號' },
        { value: '25', label: '每月 25 號' },
      ],
    },
  },
  rentReminderVoice: {
    type: 'select',
    default: 'enabled',
    labels: { enabled: '啟用', disabled: '不使用' },
    tones: { enabled: 'success', disabled: 'placeholder' },
    field: {
      title: '催租語音',
      description: '若有逾期的租金帳單，則系統會在開啟門鎖時，播放催租語音。',
      options: [
        { value: 'enabled',  label: '啟用「催租語音」' },
        { value: 'disabled', label: '不使用' },
      ],
    },
  },
}

const PAYMENT_NOTIFICATION_FIELD = {
  title: '繳費通知',
  description: '系統會在指定的通知時間，寄發繳費通知給租客。',
  suffix: '天前通知',
}

/**
 * BillingDefaultsPage — 帳務預設值設定頁
 * Figma: 11.5.3_帳務設定 (node 2061:194936)
 *
 * Props:
 *   onBack       {function} () => void
 *   onCellSelect {function} (action: string) => void
 *   onSaved      {function} () => void
 */
export default function BillingDefaultsPage({ onBack, onCellSelect, onSaved }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(Object.entries(CHOICE_FIELDS).map(([key, cfg]) => [key, cfg.default]))
  )
  const [paymentNotificationDays, setPaymentNotificationDays] = useState(10)
  const [restrictedPasswordEnabled, setRestrictedPasswordEnabled] = useState(true)
  const [gracePeriodLabel, setGracePeriodLabel] = useState('3 天')
  const [editingField, setEditingField] = useState(null) // action key | null

  const SECTIONS = [
    {
      title: '租賃費用相關',
      cells: [
        { label: '繳費期限',     value: CHOICE_FIELDS.paymentDeadline.labels[values.paymentDeadline], tone: 'placeholder', action: 'paymentDeadline' },
        { label: '收款方式',     value: '匯款 | 中國信託', tone: 'placeholder', action: 'paymentMethod' },
        { label: '繳費通知時間', value: `${paymentNotificationDays} 天前`, tone: 'placeholder', action: 'paymentNotification' },
      ],
    },
    {
      title: '催租方案',
      cells: [
        { label: '播放催租語音',     value: CHOICE_FIELDS.rentReminderVoice.labels[values.rentReminderVoice], tone: CHOICE_FIELDS.rentReminderVoice.tones[values.rentReminderVoice], action: 'rentReminderVoice' },
        { label: '限用指定密碼開門', value: restrictedPasswordEnabled ? '啟用' : '不使用', tone: restrictedPasswordEnabled ? 'success' : 'placeholder', action: 'restrictedPassword' },
      ],
    },
  ]

  const handleCellClick = (action) => {
    if (CHOICE_FIELDS[action] || action === 'paymentNotification' || action === 'restrictedPassword') {
      setEditingField(action)
    } else {
      onCellSelect?.(action)
    }
  }

  return (
    <div className="bdp-page">

      {/* Status bar */}
      <div className="bdp-status">
        <span className="bdp-status-time">9:41</span>
        <div className="bdp-status-icons">
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
      <div className="bdp-titlebar">
        <button className="bdp-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="bdp-title">帳務預設值設定</span>
      </div>

      {/* Body */}
      <div className="bdp-scroll">
        {SECTIONS.map(section => (
          <div key={section.title} className="bdp-section">
            <span className="bdp-section-title">{section.title}</span>
            <div className="bdp-table">
              {section.cells.map(cell => (
                <button key={cell.action} className="bdp-cell" onClick={() => handleCellClick(cell.action)}>
                  <span className="bdp-cell-label">{cell.label}</span>
                  <span className="bdp-cell-info">
                    <span className={`bdp-cell-value bdp-cell-value--${cell.tone}`}>{cell.value}</span>
                    <img src={icBasicArrowNext} alt="" className="bdp-cell-arrow" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="bdp-hint">
          <img src={icBasicInfoSmall} alt="" className="bdp-hint-icon" />
          <p className="bdp-hint-text">
            此處設定會帶入租約，成為預設值。您仍可在新增租約時，根據需求進行修改。
          </p>
        </div>
      </div>

      {editingField && CHOICE_FIELDS[editingField]?.type === 'dropdown' && (
        <DropdownFieldSheet
          field={{ ...CHOICE_FIELDS[editingField].field, value: values[editingField] }}
          onSave={value => {
            setValues(prev => ({ ...prev, [editingField]: value }))
            setEditingField(null)
            onSaved?.()
          }}
          onClose={() => setEditingField(null)}
        />
      )}

      {editingField && CHOICE_FIELDS[editingField]?.type === 'select' && (
        <SelectFieldSheet
          field={{ ...CHOICE_FIELDS[editingField].field, value: values[editingField] }}
          onSave={value => {
            setValues(prev => ({ ...prev, [editingField]: value }))
            setEditingField(null)
            onSaved?.()
          }}
          onClose={() => setEditingField(null)}
        />
      )}

      {editingField === 'paymentNotification' && (
        <NumberFieldSheet
          field={{ ...PAYMENT_NOTIFICATION_FIELD, value: paymentNotificationDays }}
          onSave={value => {
            setPaymentNotificationDays(value)
            setEditingField(null)
            onSaved?.()
          }}
          onClose={() => setEditingField(null)}
        />
      )}

      {editingField === 'restrictedPassword' && (
        <RestrictedPasswordSheet
          enabled={restrictedPasswordEnabled}
          gracePeriodLabel={gracePeriodLabel}
          onSave={enabled => {
            setRestrictedPasswordEnabled(enabled)
            setEditingField(null)
            onSaved?.()
          }}
          onGracePeriodChange={setGracePeriodLabel}
          onClose={() => setEditingField(null)}
        />
      )}

    </div>
  )
}

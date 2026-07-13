import { useState } from 'react'
import './PaymentMethodPage.css'
import icBasicArrowBack from '../assets/ic_basic_arrow_back.png'
import icBasicAdd       from '../assets/ic_basic_add.png'
import icBasicEdit      from '../assets/ic_basic_edit.png'
import BankAccountEditSheet from './BankAccountEditSheet'
import { bankName } from '../bankOptions'

const INITIAL_ACCOUNTS = [
  { id: 'taishin', name: '台新',   bankCode: '812', accountNumber: '2777261198772' },
  { id: 'cathay',  name: '國泰',   bankCode: '013', accountNumber: '2777261198772', isDefault: true },
  { id: 'private', name: '私房錢', bankCode: '812', accountNumber: '2777261198772' },
]

/**
 * PaymentMethodPage — 收款方式
 * Figma 列表: 11.5k.0_帳戶相關_線下收款帳號 (node 3414:63294)
 * Figma 編輯彈窗: 11.5k.3_帳戶相關_新增資料 (node 822:90693)
 *
 * 點擊任一「匯款」帳戶項目，會疊出 BankAccountEditSheet 進行編輯／刪除。
 *
 * Props:
 *   onBack {function} () => void
 */
export default function PaymentMethodPage({ onBack }) {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS)
  const [editingAccountId, setEditingAccountId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  const editingAccount = accounts.find(a => a.id === editingAccountId)
  const closeSheet = () => { setEditingAccountId(null); setIsAdding(false) }

  const handleSave = (id, fields) => {
    if (id) {
      setAccounts(prev => prev.map(a => ({
        ...a,
        ...(a.id === id ? fields : { isDefault: fields.isDefault ? false : a.isDefault }),
      })))
    } else {
      setAccounts(prev => [
        ...prev.map(a => fields.isDefault ? { ...a, isDefault: false } : a),
        { id: `acc-${Date.now()}`, ...fields },
      ])
    }
    closeSheet()
  }

  const handleDelete = (id) => {
    setAccounts(prev => prev.filter(a => a.id !== id))
    closeSheet()
  }

  return (
    <div className="pmp-page">

      {/* Status bar */}
      <div className="pmp-status">
        <span className="pmp-status-time">9:41</span>
        <div className="pmp-status-icons">
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
      <div className="pmp-titlebar">
        <button className="pmp-back-btn" onClick={onBack}>
          <img src={icBasicArrowBack} alt="" width={24} height={24} />
        </button>
        <span className="pmp-title">收款方式</span>
        <button className="pmp-add-icon-btn" onClick={() => setIsAdding(true)}>
          <img src={icBasicAdd} alt="" width={24} height={24} />
        </button>
      </div>

      {/* Body */}
      <div className="pmp-scroll">
        <div className="pmp-section">
          <span className="pmp-section-title">匯款</span>
          <div className="pmp-table">
            {accounts.map(account => (
              <button key={account.id} className="pmp-cell" onClick={() => setEditingAccountId(account.id)}>
                <div className="pmp-cell-main">
                  <p className="pmp-cell-name">{account.name}</p>
                  <p className="pmp-cell-label">{bankName(account.bankCode)} ({account.bankCode}) {account.accountNumber}</p>
                  {account.isDefault && (
                    <span className="pmp-tag">預設</span>
                  )}
                </div>
                <span className="pmp-edit-icon">
                  <img src={icBasicEdit} alt="" width={24} height={24} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {(editingAccount || isAdding) && (
        <BankAccountEditSheet
          account={editingAccount || null}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={closeSheet}
        />
      )}

    </div>
  )
}

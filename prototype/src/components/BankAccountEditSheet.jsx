import { useState } from 'react'
import './BankAccountEditSheet.css'
import icInputDropdown from '../assets/ic_input_dropdown.png'
import { bankName } from '../bankOptions'
import BankCodeSheet from './BankCodeSheet'

/**
 * BankAccountEditSheet — 新增／編輯銀行帳號彈窗
 * Figma 編輯: 11.5k.3_帳戶相關_新增資料 (node 822:90693)
 * Figma 新增: 11.5k.1_帳戶相關_新增 (node 567:56931)
 *
 * 未傳入 account（或傳入 null）時為「新增」模式：欄位皆為空值、不顯示刪除按鈕。
 * 點擊「銀行代碼」會疊出 BankCodeSheet 選擇銀行，而非原生下拉選單。
 *
 * Props:
 *   account  {object|null}  { id, name, bankCode, accountNumber, isDefault }
 *   onSave   {function} (id: string|null, fields: object) => void
 *   onDelete {function} (id: string) => void
 *   onClose  {function} () => void
 */
export default function BankAccountEditSheet({ account, onSave, onDelete, onClose }) {
  const isEditing = !!account
  const [name, setName] = useState(account?.name || '')
  const [bankCode, setBankCode] = useState(account?.bankCode || '')
  const [accountNumber, setAccountNumber] = useState(account?.accountNumber || '')
  const [isDefault, setIsDefault] = useState(!!account?.isDefault)
  const [showBankCode, setShowBankCode] = useState(false)

  return (
    <div className="bae-overlay" onClick={onClose}>
      <div className="bae-sheet" onClick={e => e.stopPropagation()}>
        <div className="bae-grabber" />
        <h2 className="bae-title">{isEditing ? '編輯銀行帳號' : '新增銀行帳號'}</h2>

        <div className="bae-field">
          <div className="bae-field-label-row">
            <span className="bae-field-label">帳號名稱*</span>
            <span className="bae-field-counter">{name.length}/20</span>
          </div>
          <input
            type="text"
            className="bae-input"
            value={name}
            maxLength={20}
            placeholder="請輸入名稱"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="bae-field">
          <span className="bae-field-label">銀行代碼*</span>
          <button
            type="button"
            className={`bae-select${bankCode ? '' : ' bae-select--placeholder'}`}
            onClick={() => setShowBankCode(true)}
          >
            <span>{bankCode ? `${bankCode} – ${bankName(bankCode)}` : '請選擇銀行代碼'}</span>
            <img src={icInputDropdown} alt="" className="bae-select-arrow" />
          </button>
        </div>

        <div className="bae-field">
          <span className="bae-field-label">帳號</span>
          <input
            type="text"
            className="bae-input"
            value={accountNumber}
            placeholder="請輸入帳號"
            onChange={e => setAccountNumber(e.target.value)}
          />
        </div>

        <label className="bae-checkbox-row">
          <input
            type="checkbox"
            className="bae-checkbox-input"
            checked={isDefault}
            onChange={e => setIsDefault(e.target.checked)}
          />
          <span className="bae-checkbox-box" />
          <span className="bae-checkbox-label">設為預設收款帳戶</span>
        </label>

        <button
          className="bae-save-btn"
          onClick={() => onSave(account?.id ?? null, { name, bankCode, accountNumber, isDefault })}
        >
          儲存
        </button>
        {isEditing && (
          <button className="bae-delete-btn" onClick={() => onDelete?.(account.id)}>刪除</button>
        )}
      </div>

      {showBankCode && (
        <BankCodeSheet
          onSelect={code => { setBankCode(code); setShowBankCode(false) }}
          onClose={() => setShowBankCode(false)}
        />
      )}
    </div>
  )
}

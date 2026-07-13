import { useState } from 'react'
import './WelcomeMessageSheet.css'

const MAX_LENGTH = 500

/**
 * WelcomeMessageSheet — 迎賓詞設定彈窗
 * Figma: node 1489:162463
 *
 * Props:
 *   value   {string}   目前的迎賓詞內容
 *   onSave  {function} (value: string) => void
 *   onClose {function} () => void
 */
export default function WelcomeMessageSheet({ value, onSave, onClose }) {
  const [text, setText] = useState(value)

  return (
    <div className="wms-overlay" onClick={onClose}>
      <div className="wms-sheet" onClick={e => e.stopPropagation()}>
        <div className="wms-grabber" />
        <h2 className="wms-title">迎賓詞</h2>

        <p className="wms-description">
          當承租方成功綁定租約時，系統會發送歡迎入住的迎賓詞在訊息中，您可自訂迎賓詞的內容。
        </p>
        <p className="wms-description">
          &lt; &gt; 中的內容為系統帶入，請勿刪除。
        </p>

        <span className="wms-counter">{text.length}/{MAX_LENGTH}</span>

        <textarea
          className="wms-textarea"
          maxLength={MAX_LENGTH}
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <button className="wms-save-btn" onClick={() => onSave(text)}>儲存</button>
      </div>
    </div>
  )
}

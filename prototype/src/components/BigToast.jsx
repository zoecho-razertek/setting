import { useEffect } from 'react'
import './BigToast.css'

/**
 * BigToast — 大型成功提示框（可跨專案引用）
 *
 * 父層容器需要 position: relative（或 absolute/fixed）才能正確覆蓋。
 *
 * Props:
 *   show      {boolean}   是否顯示
 *   icon      {string}    圖示 src
 *   iconSize  {number}    圖示邊長 px，預設 84
 *   text      {string}    提示文字
 *   duration  {number}    顯示時長 ms，預設 2000
 *   onDone    {function}  時間到後回呼
 */
export default function BigToast({ show, icon, iconSize = 84, text, duration = 2000, onDone }) {
  useEffect(() => {
    if (!show) return
    const id = setTimeout(() => onDone?.(), duration)
    return () => clearTimeout(id)
  }, [show, duration, onDone])

  if (!show) return null

  return (
    <div className="bgt-overlay">
      <div className="bgt-box">
        {icon && <img src={icon} alt="" width={iconSize} height={iconSize} className="bgt-icon" />}
        {text && <p className="bgt-text">{text}</p>}
      </div>
    </div>
  )
}

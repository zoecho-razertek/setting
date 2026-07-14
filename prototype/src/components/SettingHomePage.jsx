import { useState } from 'react'
import './SettingHomePage.css'
import IdentitySwitchSheet from './IdentitySwitchSheet'
import { IDENTITIES } from '../identities'
import icBasicRentOpen  from '../assets/ic_basic_rent_open.png'
import icBasicArrowNext from '../assets/ic_basic_arrow_next.png'
import icTabHome         from '../assets/ic_tab_home_unfocus.png'
import icTabMessage      from '../assets/ic_tab_message_unfocus.png'
import icTabNotification from '../assets/ic_tab_notification_unfocus.png'
import icTabMineFocus    from '../assets/ic_setting.png'
import photo1 from '../assets/Photo-1.png'
import photo2 from '../assets/Photo-2.png'
import photo3 from '../assets/Photo-3.png'
import photo4 from '../assets/Photo-4.png'
import photo5 from '../assets/Photo-5.png'

const PRODUCTS = [
  { name: '指紋模組',    price: '$200', img: photo1 },
  { name: '臉部辨識模組', price: '$299', img: photo2 },
  { name: '充電電池',    price: '$450', img: photo3 },
  { name: '特權卡',      price: '$50',  img: photo4 },
  { name: '感應戒指',    price: '$450', img: photo5 },
]

const LANDLORD_CELLS = [
  { label: '個人資訊',             sub: '個人資料、登入密碼、電子鎖共享條碼', divider: true, action: 'profile' },
  { label: '個人密碼與開鎖方式設定', sub: '設定適用所有電子鎖的密碼、卡片',    divider: true, action: 'personalPassword' },
  { label: '租約設定',             sub: '設定租約、帳務的預設內容',          divider: false, action: 'leaseSetting' },
]

const TEAM_CELLS = [
  { label: '團隊資訊',             sub: '公司團隊資料、身份、權限',                   divider: true,  action: 'teamInfo' },
  { label: '法人密碼與卡片', sub: '公司業務使用，設定適用所有電子鎖的密碼、卡片', divider: true,  action: 'corporatePassword' },
  { label: '團隊成員',             sub: '公司團隊中的成員',                          divider: false, action: 'teamMembers' },
]

const MH_CELLS = [
  { label: 'App 設定', sub: '切換不同身份時，語言與通知設定會自動沿用', divider: true,  action: 'appSetting' },
  { label: '使用教學', sub: 'MH Lock 的相關教學',                  divider: true,  action: 'tutorial' },
  { label: '公開資訊', sub: '官網、隱私政策、客服信箱、客服電話',       divider: false, action: 'publicInfo' },
]

const TABS = [
  { key: 'home',         label: '首頁',   icon: icTabHome },
  { key: 'message',      label: '訊息',   icon: icTabMessage },
  { key: 'notification', label: '佈告欄', icon: icTabNotification },
  { key: 'mine',         label: '我的',   icon: icTabMineFocus },
]

/**
 * SettingHomePage — 個人房東「我的」設定首頁
 * Figma: 11.0.0_設定_個人房東 (node 987:26418)
 *
 * Props:
 *   onCellSelect {function}  (action: string) => void
 *   onTabChange  {function}  (tab: 'home'|'message'|'notification'|'mine') => void
 */
export default function SettingHomePage({ currentIdentity = 'personal', onIdentityChange, onCellSelect, onTabChange }) {
  const [showIdentitySwitch, setShowIdentitySwitch] = useState(false)

  const identity = IDENTITIES.find(i => i.id === currentIdentity) ?? IDENTITIES[0]

  return (
    <div className="shp-page">

      {/* Status bar */}
      <div className="shp-status">
        <span className="shp-status-time">9:41</span>
        <div className="shp-status-icons">
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

      {/* Scrollable area: profile + content */}
      <div className="shp-scroll">

        {/* Profile card */}
        <button
          className={`shp-profile${identity.isTeam ? ' shp-profile--team' : ''}`}
          onClick={() => setShowIdentitySwitch(true)}
        >
          <img src={identity.img} alt="" className="shp-avatar" />
          <div className="shp-profile-text">
            <div className="shp-profile-name-row">
              <img src={identity.icon} alt="" className="shp-profile-house-icon" />
              <span className="shp-profile-name">{identity.name}</span>
            </div>
            <span className="shp-profile-role">{identity.role}</span>
          </div>
          <div className="shp-profile-arrow">
            <img src={icBasicRentOpen} alt="" className="shp-profile-arrow-icon" />
          </div>
        </button>

        {/* Content list */}
        <div className="shp-content">

          {/* MH 商城 */}
          <div className="shp-module">
            <div className="shp-module-title-row">
              <span className="shp-module-title">MH 商城</span>
              <button className="shp-module-link" onClick={() => onCellSelect?.('shop')}>
                <span className="shp-module-link-text">前往商城</span>
                <img src={icBasicArrowNext} alt="" className="shp-link-arrow" />
              </button>
            </div>
            <div className="shp-shop-scroll">
              {PRODUCTS.map(p => (
                <div key={p.name} className="shp-shop-item">
                  <img src={p.img} alt={p.name} className="shp-shop-img" />
                  <span className="shp-shop-name">{p.name}</span>
                  <span className="shp-shop-price">{p.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 關於個人房東／關於團隊 */}
          <div className="shp-module">
            <div className="shp-module-title-row">
              <span className="shp-module-title">{identity.isTeam ? '關於團隊' : '關於個人房東'}</span>
            </div>
            <div className="shp-card-group">
              {(identity.isTeam ? TEAM_CELLS : LANDLORD_CELLS).map(cell => (
                <div key={cell.label}>
                  <button className="shp-cell" onClick={() => onCellSelect?.(cell.action)}>
                    <span className="shp-cell-title">{cell.label}</span>
                    <span className="shp-cell-sub">{cell.sub}</span>
                  </button>
                  {cell.divider && <div className="shp-cell-divider" />}
                </div>
              ))}
            </div>

            {/* 關於 MH Lock sub-section */}
            <div className="shp-sub-title-row">
              <span className="shp-sub-title">關於 MH Lock</span>
            </div>
            <div className="shp-card-group">
              {MH_CELLS.map(cell => (
                <div key={cell.label}>
                  <button className="shp-cell" onClick={() => onCellSelect?.(cell.action)}>
                    <span className="shp-cell-title">{cell.label}</span>
                    <span className="shp-cell-sub">{cell.sub}</span>
                  </button>
                  {cell.divider && <div className="shp-cell-divider" />}
                </div>
              ))}
            </div>
          </div>

          {/* 登出 */}
          <button className="shp-logout" onClick={() => onCellSelect?.('logout')}>登出</button>

        </div>
      </div>

      {/* Tab bar */}
      <div className="shp-tabbar">
        <div className="shp-tabbar-items">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`shp-tab-item${tab.key === 'mine' ? ' shp-tab-item--active' : ''}`}
              onClick={() => onTabChange?.(tab.key)}
            >
              <img src={tab.icon} alt="" className="shp-tab-icon" />
              <span className={`shp-tab-label${tab.key === 'mine' ? ' shp-tab-label--active' : ''}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
        <div className="shp-home-indicator">
          <div className="shp-home-indicator-bar" />
        </div>
      </div>

      {showIdentitySwitch && (
        <IdentitySwitchSheet
          currentId={currentIdentity}
          onSelect={id => { onIdentityChange?.(id); setShowIdentitySwitch(false) }}
          onClose={() => setShowIdentitySwitch(false)}
        />
      )}

    </div>
  )
}

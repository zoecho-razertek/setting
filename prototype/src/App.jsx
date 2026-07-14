import { useState } from 'react'
import './index.css'
import './App.css'
import SettingHomePage     from './components/SettingHomePage'
import PersonalInfoPage    from './components/PersonalInfoPage'
import TeamInfoPage        from './components/TeamInfoPage'
import TeamMembersPage     from './components/TeamMembersPage'
import TeamMemberInfoPage  from './components/TeamMemberInfoPage'
import AppSettingsPage     from './components/AppSettingsPage'
import HomeShortcutPage    from './components/HomeShortcutPage'
import ChangePasswordPage  from './components/ChangePasswordPage'
import ChangePhonePage     from './components/ChangePhonePage'
import OtpVerificationPage from './components/OtpVerificationPage'
import LockMethodPage      from './components/LockMethodPage'
import DoorPasswordPage    from './components/DoorPasswordPage'
import CardManagementPage  from './components/CardManagementPage'
import BindCardPage        from './components/BindCardPage'
import CardNamingPage      from './components/CardNamingPage'
import CardEditPage        from './components/CardEditPage'
import LeaseSettingPage    from './components/LeaseSettingPage'
import LeaseDefaultsPage   from './components/LeaseDefaultsPage'
import BillingDefaultsPage from './components/BillingDefaultsPage'
import PaymentMethodPage   from './components/PaymentMethodPage'
import SystemModulesPage   from './components/SystemModulesPage'
import BigToast            from './components/BigToast'

function formatTimestamp(date) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const TEAM_CARDS = [
  {
    id: 'team-card-1',
    name: '永慶房屋卡片',
    cardId: '1865204',
    activatedAt: '2026/07/14 09:41:00',
  },
]

export default function App() {
  const [page, setPage]   = useState('settingHome')
  const [toastText, setToastText] = useState(null)
  const [cards, setCards] = useState([])
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState(null)
  const [currentIdentity, setCurrentIdentity] = useState('personal')
  const [isCorporateMode, setIsCorporateMode] = useState(false)

  const saveAndReturn = (message = '已儲存', targetPage = 'personalInfo') => {
    setPage(targetPage)
    setToastText(message)
  }

  return (
    <div className="app-root">
      {page === 'settingHome' && (
        <SettingHomePage
          currentIdentity={currentIdentity}
          onIdentityChange={setCurrentIdentity}
          onCellSelect={action => {
            if (action === 'profile')         setPage('personalInfo')
            if (action === 'teamInfo') {
              setPage('teamInfo')
            }
            if (action === 'teamMembers') {
              setPage('teamMembers')
            }
            if (action === 'personalPassword') {
              setIsCorporateMode(false)
              setPage('lockMethod')
            }
            if (action === 'corporatePassword') {
              setIsCorporateMode(true)
              setPage('lockMethod')
            }
            if (action === 'appSetting')      setPage('appSettings')
            if (action === 'leaseSetting')     setPage('leaseSetting')
          }}
        />
      )}
      {page === 'personalInfo' && (
        <PersonalInfoPage
          onBack={() => setPage('settingHome')}
          onFieldSelect={label => {
            if (label === 'App 登入密碼') setPage('changePassword')
            if (label === '手機號碼')     setPage('changePhone')
          }}
          onSaved={() => setToastText('已儲存')}
        />
      )}
      {page === 'teamInfo' && (
        <TeamInfoPage
          identityId={currentIdentity}
          onBack={() => setPage('settingHome')}
          onSaved={() => setToastText('已儲存')}
        />
      )}
      {page === 'teamMembers' && (
        <TeamMembersPage
          onBack={() => setPage('settingHome')}
          onMemberSelect={id => {
            setSelectedTeamMemberId(id)
            setPage('teamMemberInfo')
          }}
        />
      )}
      {page === 'teamMemberInfo' && (
        <TeamMemberInfoPage
          memberId={selectedTeamMemberId}
          onBack={() => setPage('teamMembers')}
          onCopied={() => setToastText('已複製！')}
        />
      )}
      {page === 'appSettings' && (
        <AppSettingsPage
          onBack={() => setPage('settingHome')}
          onShortcutSelect={() => setPage('homeShortcut')}
        />
      )}
      {page === 'homeShortcut' && (
        <HomeShortcutPage
          onBack={() => setPage('appSettings')}
          onSaved={() => saveAndReturn('已儲存', 'appSettings')}
        />
      )}
      {page === 'changePassword' && (
        <ChangePasswordPage onBack={() => setPage('personalInfo')} onSave={saveAndReturn} />
      )}
      {page === 'changePhone' && (
        <ChangePhonePage
          onBack={() => setPage('personalInfo')}
          onNext={() => setPage('otpVerification')}
        />
      )}
      {page === 'otpVerification' && (
        <OtpVerificationPage
          onBack={() => setPage('changePhone')}
          onVerified={() => saveAndReturn('手機號碼已修改')}
        />
      )}
      {page === 'lockMethod' && (
        <LockMethodPage
          onBack={() => setPage('settingHome')}
          cardCount={isCorporateMode ? TEAM_CARDS.length : cards.length}
          isCorporate={isCorporateMode}
          onCellSelect={action => {
            if (action === 'doorPassword')    setPage('doorPassword')
            if (action === 'cardManagement')  setPage('cardManagement')
          }}
        />
      )}
      {page === 'doorPassword' && (
        <DoorPasswordPage
          onBack={() => setPage('lockMethod')}
          onSave={() => saveAndReturn('已儲存', 'lockMethod')}
        />
      )}
      {page === 'cardManagement' && (
        <CardManagementPage
          cards={isCorporateMode ? TEAM_CARDS : cards}
          hideAddButton={isCorporateMode}
          onBack={() => setPage('lockMethod')}
          onAddCard={() => setPage('bindCard')}
          onCardSelect={id => { setSelectedCardId(id); setPage('cardEdit') }}
        />
      )}
      {page === 'bindCard' && (
        <BindCardPage
          onExit={() => setPage('cardManagement')}
          onSensed={() => setPage('cardNaming')}
        />
      )}
      {page === 'cardNaming' && (
        <CardNamingPage
          onReturnToList={name => {
            setCards(prev => [...prev, {
              id: Date.now(),
              name,
              cardId: String(Math.floor(1000000 + Math.random() * 9000000)),
              activatedAt: formatTimestamp(new Date()),
            }])
            setPage('cardManagement')
          }}
          onBindAnother={() => setPage('bindCard')}
        />
      )}
      {page === 'cardEdit' && (isCorporateMode ? TEAM_CARDS : cards).some(c => c.id === selectedCardId) && (
        <CardEditPage
          card={(isCorporateMode ? TEAM_CARDS : cards).find(c => c.id === selectedCardId)}
          hideDelete={isCorporateMode}
          onBack={() => setPage('cardManagement')}
          onRename={(id, name) => setCards(prev => prev.map(c => c.id === id ? { ...c, name } : c))}
          onDelete={id => {
            setCards(prev => prev.filter(c => c.id !== id))
            setPage('cardManagement')
          }}
        />
      )}

      {page === 'leaseSetting' && (
        <LeaseSettingPage
          onBack={() => setPage('settingHome')}
          onCellSelect={action => {
            if (action === 'leaseDefaults')   setPage('leaseDefaults')
            if (action === 'billingDefaults') setPage('billingDefaults')
            if (action === 'systemModules')   setPage('systemModules')
          }}
        />
      )}
      {page === 'leaseDefaults' && (
        <LeaseDefaultsPage
          onBack={() => setPage('leaseSetting')}
          onSaved={() => setToastText('已儲存')}
        />
      )}
      {page === 'billingDefaults' && (
        <BillingDefaultsPage
          onBack={() => setPage('leaseSetting')}
          onCellSelect={action => {
            if (action === 'paymentMethod') setPage('paymentMethod')
          }}
          onSaved={() => setToastText('已儲存')}
        />
      )}
      {page === 'paymentMethod' && (
        <PaymentMethodPage onBack={() => setPage('billingDefaults')} />
      )}
      {page === 'systemModules' && (
        <SystemModulesPage
          onBack={() => setPage('leaseSetting')}
          onSaved={() => setToastText('已儲存')}
        />
      )}

      <BigToast
        show={!!toastText}
        text={toastText}
        onDone={() => setToastText(null)}
      />
    </div>
  )
}

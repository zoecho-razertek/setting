import { useState } from 'react'
import './index.css'
import './App.css'
import SettingHomePage     from './components/SettingHomePage'
import PersonalInfoPage    from './components/PersonalInfoPage'
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

export default function App() {
  const [page, setPage]   = useState('settingHome')
  const [toastText, setToastText] = useState(null)
  const [cards, setCards] = useState([])
  const [selectedCardId, setSelectedCardId] = useState(null)

  const saveAndReturn = (message = '已儲存', targetPage = 'personalInfo') => {
    setPage(targetPage)
    setToastText(message)
  }

  return (
    <div className="app-root">
      {page === 'settingHome' && (
        <SettingHomePage
          onCellSelect={action => {
            if (action === 'profile')         setPage('personalInfo')
            if (action === 'personalPassword') setPage('lockMethod')
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
          cards={cards}
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
      {page === 'cardEdit' && cards.some(c => c.id === selectedCardId) && (
        <CardEditPage
          card={cards.find(c => c.id === selectedCardId)}
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
        <SystemModulesPage onBack={() => setPage('leaseSetting')} />
      )}

      <BigToast
        show={!!toastText}
        text={toastText}
        onDone={() => setToastText(null)}
      />
    </div>
  )
}

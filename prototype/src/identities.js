import imgProfile  from './assets/img_profile.png'
import imgCompany  from './assets/img_company.png'
import imgCompany2 from './assets/img_company2.png'
import icRentHouseFill    from './assets/ic_rent_house_fill.png'
import icRentCompanyFocus from './assets/ic_rent_company_f_focus.png'

export const IDENTITIES = [
  { id: 'personal',  img: imgProfile,  icon: icRentHouseFill,    name: '王大天',   role: '個人房東',   isTeam: false },
  { id: 'yongching', img: imgCompany,  icon: icRentCompanyFocus, name: '永慶房屋', role: '團隊擁有者', isTeam: true },
  { id: 'sinyi',     img: imgCompany2, icon: icRentCompanyFocus, name: '信義房屋', role: '團隊成員',   isTeam: true },
]

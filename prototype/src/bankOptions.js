export const BANK_OPTIONS = [
  { code: '004', name: '台灣銀行' },
  { code: '005', name: '土地銀行' },
  { code: '006', name: '合作金庫銀行' },
  { code: '007', name: '第一銀行' },
  { code: '008', name: '華南銀行' },
  { code: '009', name: '彰化銀行' },
  { code: '011', name: '上海銀行' },
  { code: '012', name: '台北富邦' },
  { code: '013', name: '國泰世華' },
  { code: '016', name: '高雄銀行' },
  { code: '017', name: '兆豐商銀' },
  { code: '018', name: '農業金庫' },
  { code: '812', name: '台新' },
]

export function bankName(code) {
  return BANK_OPTIONS.find(bank => bank.code === code)?.name || code
}

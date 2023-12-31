import Link from 'next/link'
import { fetchWalletAccounts } from '~/actions/WalletAccount'
import Amount from '~/components/Amount'

export default async function Wallet() {
  const walletAccounts = await fetchWalletAccounts()
  return (
    <>
      <h2>
        <Link href="/wallets">
          我的钱包
        </Link>
      </h2>
      {
        walletAccounts.map(account => (
          <div key={account.id} className="py-2 px-4 shadow rounded-md">
            <div className="flex-x-between flex-y-center pb-1 border-b border-dashed border-stone-200">
              <h4>{account.name}</h4>
              <Amount>{account.amount.toNumber()}</Amount>
            </div>
            <div className="flex-x-between mt-2">
              <div className="flex-y-center">
                今日消费：
                <Amount>{account.todayExpenditure}</Amount>
              </div>
              <div className="flex-y-center">
                本月消费：
                <Amount>{account.monthlyExpenditure}</Amount>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

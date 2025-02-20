import TransactionsTable from '@/components/TransactionsTable';
import HeaderBox from '@/components/ui/HeaderBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import React from 'react';

const TransactionHistory = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = (await getLoggedInUser()) || { $id: '', firstName: 'Guest' };

  try {
    const accounts = await getAccounts({ userId: loggedIn.$id });

    const accountsData = accounts.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    if (!appwriteItemId) {
      return <p className="text-center text-red-500">Invalid account selection.</p>;
    }

    const account = await getAccount({ appwriteItemId });
    console.log(account);

    return (
      <div className="transactions">
        <div className="transactions-header">
          <HeaderBox title="Transaction History" subtext="See Your Bank Details And Recent Transactions." />
        </div>
        <div className="space-y-6">
          <div className="transactions-account">
            <div className="flex flex-col gap-2">
              <h2 className="text-18 font-bold text-white">{account?.name}</h2>
              <p className="text-14 text-blue-25">
                {account?.officialName}
              </p>
              <p className="text-14 font-semibold tracking-[1.1px] text-white">
                 ●●●● ●●●● ●●●● {account?.mask}
              </p>
              <div className='transactions-account-balance'>
                <p className="text-14">Current Balance</p>
                <p className="text-24 text-center font-bold">
                {formatAmount(account?.currentBalance ?? 0)}
                </p>
              </div>
            </div>
          </div>
          <section className="flex w-full flex-col gap-6">
              <TransactionsTable transactions={account?.transactions}/>
            </section>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="text-center text-red-500">Error loading transactions.</p>;
  }
};

export default TransactionHistory

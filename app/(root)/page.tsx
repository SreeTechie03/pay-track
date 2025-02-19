import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import HeaderBox from '@/components/ui/HeaderBox';
import RecentTransactions from '@/components/ui/RecentTransactions';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number (page as string) || 1;
  const loggedIn = (await getLoggedInUser()) || { $id: '', firstName: 'Guest' };

  try {
    const accounts = await getAccounts({ userId: loggedIn.$id });

    if (!accounts || !accounts.data?.length) {
      return <p className="text-center text-red-500">No accounts found.</p>;
    }

    const accountsData = accounts.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    if (!appwriteItemId) {
      return <p className="text-center text-red-500">Invalid account selection.</p>;
    }

    const account = await getAccount({ appwriteItemId });
    console.log(account)

    return (
      <section className="home">
        <div className="home-content">
          <header className="home-header">
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || 'Guest'}
              subtext="Access and manage your account and transactions, because that’s everyone’s dream."
            />
            <TotalBalanceBox
              accounts={accountsData}
              totalBanks={accounts?.totalBanks}
              totalCurrentBalance={accounts?.totalCurrentBalance}
            />
          </header>
           <RecentTransactions
             accounts={accountsData}
             transactions={account?.transactions}
             appwriteItemId={appwriteItemId}
             page={currentPage}
           />
        </div>
        <RightSidebar
          user={loggedIn}
          transactions={account?.transactions || []}
          banks={accountsData?.slice(0, 2)}
        />
      </section>
    );
  } catch (error) {
    return <p className="text-center text-red-500">Error loading data.</p>;
  }
};

export default Home;
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import HeaderBox from '@/components/ui/HeaderBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams:{id, page}}:
  SearchParamProps) => {

  const loggedIn = await getLoggedInUser() ||{$id: '', name: 'Guest'}; 
  const accounts = await getAccounts({ userId: loggedIn.$id || '' });
  

  


  if(!accounts) return;
  const accountsData = accounts?.data;
  const appwriteItemId =(id as string) || accountsData[0]?.appwriteItemId;  
  const account = await getAccount({ appwriteItemId });
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transactions, because that’s everyone’s dream."
          />
          <TotalBalanceBox
          accounts={[accountsData]}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance} 
          />
        </header>
        Recent Transactions
      </div>
      <RightSidebar 
        user={loggedIn}
        transactions={accounts?.transactions}
        banks={accountsData?.slice(0,2)}
      />
    </section>
  );
};

export default Home;

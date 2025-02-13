import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import HeaderBox from '@/components/ui/HeaderBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name}
            subtext="Access and manage your account and transactions, because that’s everyone’s dream."
          />
          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={199999.99}
          />
        </header>
        Recent Transactions
      </div>
      <RightSidebar 
        User={loggedIn}
        transactions={[]}
        banks={[{ currentBalance:123.50 }, 
          { currentBalance:500.50}]}
      />
    </section>
  );
};

export default Home;

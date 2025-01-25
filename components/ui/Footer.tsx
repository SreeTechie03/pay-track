import React from 'react';
import Image from 'next/image';
import { logoutAccount } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

type FooterProps = {
  user: {
    firstName?: string;
    name?: string;
    email?: string;
  } | null;
  type?: 'desktop' | 'mobile';
};

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const loggedOut: boolean = (await logoutAccount()) ?? false;
      if (loggedOut) router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <footer className="footer">
      {/* User Initial */}
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        {user && user.name ? (
          <p className="text-xl font-bold text-gray-700">
            {user?.name[0].toUpperCase()}
          </p>
        ) : (
          <p className="text-xl font-bold text-gray-700">?</p>
        )}
      </div>

      {/* User Name or Fallback */}
      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user?.name || 'Guest'}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email || 'No Email'}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" fill alt="Logout" />
      </div>
    </footer>
  );
};

export default Footer;

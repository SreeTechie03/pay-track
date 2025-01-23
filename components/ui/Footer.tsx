import React from 'react';

type FooterProps = {
  user: {
    firstName?: string; // Optional, as user might be null
    name?: string; // Optional to handle undefined
    email?: string; // Optional, if email exists
  } | null; // Allow user to be null
  type?: 'desktop' | 'mobile'; // Optional type prop with default
};

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  return (
    <footer className="footer">
      {/* User Initial */}
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        {user && user.name ? (
          <p className="text-xl font-bold text-gray-700">
            {user.name[0].toUpperCase()}
          </p>
        ) : (
          <p className="text-xl font-bold text-gray-700">N/A</p> // Default text if no user
        )}
      </div>

      {/* User Name or Fallback */}
      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className="text-14 truncate font-normal text-gray-600">
          {user?.name || 'Guest'} {/* Show user name or 'Guest' */}
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
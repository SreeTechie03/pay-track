'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Footer from './Footer';

interface SidebarProps {
  user: { firstName?: string; lastName?: string; name?: string } | null; // Allow null and optional fields
}

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="icons/logo.svg"
            width={34}
            height={34}
            alt="SmartEd logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">SmartEd Innovations</h1>
        </Link>

        {sidebarLinks.map((item) => {
          // Changed: Strictly check if the current path matches the exact route
          const isActive = pathname === item.route;

          return (
            <Link
              href={item.route}
              key={item.label}
              // Changed: Added conditional class for active state
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <div className="relative size-6">
                <Image 
                  src={item.imgURL} 
                  alt={item.label || ''} 
                  fill 
                  // Changed: Adjusted brightness and inversion for active state
                  className={cn({ 'brightness-[3] invert-0': isActive })}
                />
              </div>
              <p
                // Changed: Applied conditional text color for active state
                className={cn('sidebar-label', { '!text-white': isActive })}
              >
                {item.label}
              </p>
            </Link>
          );
        })}

        {/* User placeholder or name */}
        <p className="text-sm mt-4 font-semibold">
          {user?.firstName ? `Welcome, ${user.firstName}` : ''}
        </p>
      </nav>

      {/* Pass user to Footer */}
      <Footer user={user} type="desktop" />
    </section>
  );
};

export default Sidebar;

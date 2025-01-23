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
            alt="Origin logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Origin</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <div className="relative size-6">
                <Image 
                  src={item.imgURL} 
                  alt={item.label} 
                  fill 
                  className={cn({ 'brightness-[3] invert-0': isActive })}
                />
              </div>
              <p className={cn('sidebar-label', { '!text-white': isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
        
        {/* User placeholder or name */}
        <p className="text-sm mt-4 font-semibold">
          {user?.firstName ? `Welcome, ${user.firstName}` : 'Welcome, Guest'}
        </p>
      </nav>

      {/* Pass user to Footer */}
      <Footer user={user} type="desktop" />
    </section>
  );
};

export default Sidebar;
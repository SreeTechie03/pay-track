'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Footer from './Footer';
import PlaidLink from './PlaidLink';

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
            src="/icons/logo.png"
            width={34}
            height={34}
            alt="SmartEd logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">SmartEd Innovations</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route;

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <div className="relative size-6">
                <Image 
                  src={item.imgURL} 
                  alt={item.label || ''} 
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

        <PlaidLink user={user as User}/>
      </nav>

      <Footer user={user} type="desktop" />
    </section>
  );
};

export default Sidebar;

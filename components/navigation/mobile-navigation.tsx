'use client';

import { Home, Search, Wallet, User, Settings } from 'lucide-react';
import { useAuth } from '@/components/providers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNavigation() {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Discover', href: '/discover' },
    { icon: Wallet, label: 'Wallet', href: '/wallet' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  if (!user) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-purple-500/20 z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center py-2 px-3 transition-colors ${
                isActive 
                  ? 'text-purple-400' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
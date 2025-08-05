'use client';

import Image from 'next/image';
import { Home, Search, Wallet, User, Settings, Shield, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '@/components/providers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

export function DesktopSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Discover', href: '/discover' },
    { icon: Wallet, label: 'Wallet', href: '/wallet' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  const adminItems = [
    { icon: Shield, label: 'Moderation', href: '/moderation', roles: ['moderator', 'admin'] },
    { icon: BarChart3, label: 'Admin', href: '/admin', roles: ['admin'] },
    { icon: Settings, label: 'Settings', href: '/settings', roles: ['user', 'creator', 'moderator', 'admin'] },
  ];

  if (!user) return null;

  return (
    <div className="w-64 h-full bg-card/80 backdrop-blur-sm border-r border-purple-500/20 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-purple-500/20">
        <h1 className="text-2xl font-bold font-orbitron gradient-text">VIBRA</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}

        {/* Admin Section */}
        {adminItems.some(item => item.roles.includes(user.role)) && (
          <>
            <div className="pt-4 pb-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider px-4">
                Administration
              </p>
            </div>
            {adminItems.map(({ icon: Icon, label, href, roles }) => {
              if (!roles.includes(user.role)) return null;
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <Image src={user.avatar} alt={user.username} width={40} height={40} />
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user.username}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
        
        <Button 
          onClick={logout}
          variant="outline" 
          className="w-full justify-start border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
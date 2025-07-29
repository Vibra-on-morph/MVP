import './globals.css';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { Providers } from '@/components/providers';
import { MobileNavigation } from '@/components/navigation/mobile-navigation';
import { DesktopSidebar } from '@/components/navigation/desktop-sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata: Metadata = {
  title: 'Vibra - Crypto-Native Video Social',
  description: 'Earn crypto rewards for creating and engaging with short-form videos',
  keywords: 'crypto, video, social media, rewards, blockchain, NFT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} font-sans`}>
        <Providers>
          <div className="flex h-screen bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <DesktopSidebar />
            </div>
            
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto custom-scrollbar">
              {children}
            </main>
            
            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <MobileNavigation />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
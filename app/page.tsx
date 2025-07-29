'use client';

import { useAuth } from '@/components/providers';
import { LandingPage } from '@/components/pages/landing-page';
import { VideoFeed } from '@/components/pages/video-feed';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <VideoFeed /> : <LandingPage />;
}
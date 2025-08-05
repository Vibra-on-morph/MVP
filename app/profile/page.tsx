'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Edit, MapPin, Calendar, Link as LinkIcon, Users, Heart, Eye } from 'lucide-react';
import { useAuth } from '@/components/providers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { mockVideos } from '@/data/mock-data';
import { formatNumber } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'videos' | 'liked'>('videos');

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const userVideos = mockVideos.filter(video => video.userId === user.id);
  const totalViews = userVideos.reduce((sum, video) => sum + video.views, 0);
  const totalLikes = userVideos.reduce((sum, video) => sum + video.likes, 0);

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 lg:h-64 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"></div>
        
        {/* Profile Info */}
        <div className="relative px-4 pb-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-background">
                  <Image src={user.avatar} alt={user.username} width={128} height={128} />
                </Avatar>
                {user.verified && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 lg:mt-16">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{user.username}</h1>
                    <p className="text-muted-foreground capitalize mb-2">{user.role}</p>
                    {user.bio && (
                      <p className="text-muted-foreground mb-4 max-w-md">{user.bio}</p>
                    )}
                    
                    {/* Stats */}
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="font-bold text-lg">{formatNumber(user.followers)}</span>
                        <span className="text-muted-foreground ml-1">Followers</span>
                      </div>
                      <div>
                        <span className="font-bold text-lg">{formatNumber(user.following)}</span>
                        <span className="text-muted-foreground ml-1">Following</span>
                      </div>
                      <div>
                        <span className="font-bold text-lg">{formatNumber(totalLikes)}</span>
                        <span className="text-muted-foreground ml-1">Likes</span>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="px-4 py-8 bg-card/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Earnings Overview</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="video-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">
                    {user.totalEarned.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Earned</p>
                </div>
              </div>
            </Card>

            <Card className="video-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">
                    {formatNumber(totalViews)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </div>
              </div>
            </Card>

            <Card className="video-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400">
                    {formatNumber(totalLikes)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Likes</p>
                </div>
              </div>
            </Card>

            <Card className="video-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">
                    {userVideos.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Videos Posted</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex border-b border-purple-500/20 mb-8">
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'videos'
                  ? 'border-purple-400 text-purple-400'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Videos ({userVideos.length})
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'liked'
                  ? 'border-purple-400 text-purple-400'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Liked (0)
            </button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeTab === 'videos' && userVideos.map((video) => (
              <div key={video.id} className="video-card overflow-hidden cursor-pointer group">
                <div className="relative aspect-[9/16]">
                  <Image
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium line-clamp-2 mb-1">
                      {video.title}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/80">
                      <span>{formatNumber(video.views)} views</span>
                      <span>{formatNumber(video.likes)} likes</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-green-500/20 px-2 py-1 rounded text-xs font-semibold text-green-400">
                    +{video.rewards.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
            
            {activeTab === 'liked' && (
              <div className="col-span-full text-center py-12">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No liked videos yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Search, TrendingUp, Hash, Siren as Fire, Clock, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { mockVideos } from '@/data/mock-data';
import { formatNumber } from '@/lib/utils';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('trending');

  const categories = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'new', label: 'New', icon: Clock },
    { id: 'popular', label: 'Popular', icon: Fire },
    { id: 'liked', label: 'Most Liked', icon: Heart },
  ];

  const trendingTags = [
    { tag: 'bitcoin', count: 1234 },
    { tag: 'nft', count: 892 },
    { tag: 'defi', count: 756 },
    { tag: 'crypto', count: 2143 },
    { tag: 'trading', count: 687 },
    { tag: 'blockchain', count: 543 },
  ];

  const filteredVideos = mockVideos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Discover</h1>
          <p className="text-muted-foreground">Find trending crypto content and creators</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search videos, creators, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-card border-purple-500/20 focus:border-purple-400 text-lg"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
                activeCategory === id
                  ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white'
                  : 'bg-card border border-purple-500/20 text-muted-foreground hover:text-foreground hover:border-purple-400/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Trending Tags */}
        <Card className="video-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Hash className="w-5 h-5 text-purple-400" />
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {trendingTags.map(({ tag, count }) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-full transition-colors"
              >
                <span className="text-purple-400">#</span>
                <span>{tag}</span>
                <span className="text-xs text-muted-foreground">
                  {formatNumber(count)}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="video-card overflow-hidden cursor-pointer group">
              <div className="relative aspect-[9/16]">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                
                {/* Creator Info */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img 
                    src={video.avatar} 
                    alt={video.username}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="text-white text-sm font-medium">
                    {video.username}
                  </span>
                </div>

                {/* Rewards */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full text-black text-xs font-semibold">
                  +{video.rewards.toFixed(1)}
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center gap-4">
                      <span>{formatNumber(video.views)} views</span>
                      <span>{formatNumber(video.likes)} likes</span>
                    </div>
                    <span>{video.createdAt.toLocaleDateString()}</span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {video.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && searchQuery && (
          <Card className="video-card p-12 text-center">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try searching for different keywords or browse trending content
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
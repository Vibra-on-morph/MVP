'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Play, Pause, Volume2, VolumeX, MoreHorizontal } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Video } from '@/types';
import { formatNumber } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onLike: () => void;
  onShare: () => void;
}

export function VideoCard({ video, isActive, onLike, onShare }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(isActive);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      
      {/* Mock Video - Using Image as Placeholder */}
      <img 
        src={video.thumbnailUrl} 
        alt={video.title}
        className="w-full h-full object-cover"
      />
      
      {/* Play/Pause Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={togglePlay}
          className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <div className="flex items-end justify-between">
          {/* Left Side - Video Info */}
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10 border-2 border-white">
                <img src={video.avatar} alt={video.username} />
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{video.username}</span>
                  {video.userId === '1' && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-300">
                  {formatNumber(video.views)} views • {video.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <h3 className="text-white font-medium mb-2 line-clamp-2">
              {video.title}
            </h3>
            
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {video.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {video.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={onLike}
              className={`flex flex-col items-center gap-1 ${
                video.isLiked ? 'text-red-500' : 'text-white'
              }`}
            >
              <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className={`w-6 h-6 ${video.isLiked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-xs">{formatNumber(video.likes)}</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white">
              <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs">{formatNumber(video.comments)}</span>
            </button>

            <button 
              onClick={onShare}
              className="flex flex-col items-center gap-1 text-white"
            >
              <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-xs">{formatNumber(video.shares)}</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white">
              <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MoreHorizontal className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleMute}
          className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm text-white"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Rewards Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full text-black text-xs font-semibold">
          +{video.rewards.toFixed(2)} VIBRA
        </div>
      </div>
    </div>
  );
}
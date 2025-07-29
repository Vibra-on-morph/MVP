'use client';

import { useState, useRef, useEffect } from 'react';
import { VideoCard } from '@/components/video/video-card';
import { UploadButton } from '@/components/video/upload-button';
import { mockVideos } from '@/data/mock-data';
import { Video } from '@/types';

export function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const videoHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      setCurrentVideoIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = (videoId: string) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            likes: video.isLiked ? video.likes - 1 : video.likes + 1,
            isLiked: !video.isLiked 
          }
        : video
    ));
  };

  const handleShare = (videoId: string) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { ...video, shares: video.shares + 1 }
        : video
    ));
  };

  return (
    <div className="relative h-screen">
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory custom-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-screen snap-start">
            <VideoCard
              video={video}
              isActive={index === currentVideoIndex}
              onLike={() => handleLike(video.id)}
              onShare={() => handleShare(video.id)}
            />
          </div>
        ))}
      </div>
      
      {/* Upload Button */}
      <div className="absolute bottom-20 lg:bottom-8 right-4">
        <UploadButton />
      </div>
    </div>
  );
}
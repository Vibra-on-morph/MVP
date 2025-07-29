'use client';

import { useState, useRef, useEffect } from 'react';
import { VideoCard } from '@/components/video/video-card';
import { UploadButton } from '@/components/video/upload-button';
import { mockVideos } from '@/data/mock-data';
import { Video } from '@/types';

export function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      const scrollTop = container.scrollTop;
      const videoHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentVideoIndex, videos.length]);

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
    
    // Mock share functionality
    if (navigator.share) {
      const video = videos.find(v => v.id === videoId);
      if (video) {
        navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        }).catch(console.error);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentVideoIndex > 0) {
        const container = containerRef.current;
        if (container) {
          container.scrollTo({
            top: (currentVideoIndex - 1) * container.clientHeight,
            behavior: 'smooth'
          });
        }
      } else if (e.key === 'ArrowDown' && currentVideoIndex < videos.length - 1) {
        const container = containerRef.current;
        if (container) {
          container.scrollTo({
            top: (currentVideoIndex + 1) * container.clientHeight,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideoIndex, videos.length]);
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
              isActive={index === currentVideoIndex && !isScrolling}
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
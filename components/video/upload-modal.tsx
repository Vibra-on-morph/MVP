'use client';

import { useState } from 'react';
import { X, Upload, Film, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface UploadModalProps {
  onClose: () => void;
}

export function UploadModal({ onClose }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedFile) {
      newErrors.file = 'Please select a video file';
    } else if (selectedFile.size > 100 * 1024 * 1024) { // 100MB
      newErrors.file = 'File size must be less than 100MB';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith('video/')) {
      setSelectedFile(files[0]);
      setErrors(prev => ({ ...prev, file: '' }));
    } else {
      setErrors(prev => ({ ...prev, file: 'Please select a valid video file' }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type.startsWith('video/')) {
      setSelectedFile(files[0]);
      setErrors(prev => ({ ...prev, file: '' }));
    } else {
      setErrors(prev => ({ ...prev, file: 'Please select a valid video file' }));
    }
  };

  const handleUpload = async () => {
    if (!validateForm()) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Mock upload process
    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      console.log('Uploading:', { file: selectedFile, ...formData });
      // Here you would integrate with your backend/cloud storage
      
      // Success - close modal
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
      setErrors({ upload: 'Upload failed. Please try again.' });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && !uploading && onClose()}
    >
      <div className="bg-card rounded-2xl p-6 w-full max-w-lg relative neon-border max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground disabled:opacity-50"
          disabled={uploading}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">Upload Video</h2>
          <p className="text-muted-foreground">Share your content and start earning</p>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Uploading...</span>
              <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
            dragActive 
              ? 'border-purple-400 bg-purple-400/10' 
              : errors.file
              ? 'border-red-400 bg-red-400/10'
              : 'border-muted-foreground/30 hover:border-purple-400/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="space-y-2">
              <Film className="w-12 h-12 text-purple-400 mx-auto" />
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-sm text-purple-400 hover:text-purple-300 disabled:opacity-50"
                disabled={uploading}
              >
                Choose different file
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <p className="font-medium mb-2">Drag & drop your video here</p>
                <p className="text-sm text-muted-foreground mb-4">
                  MP4, MOV, AVI up to 100MB
                </p>
                <label htmlFor="video-upload">
                  <Button 
                    variant="outline" 
                    className="cursor-pointer"
                    disabled={uploading}
                  >
                    Browse Files
                  </Button>
                </label>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={uploading}
                />
              </div>
            </div>
          )}
        </div>
        
        {errors.file && (
          <p className="text-red-400 text-sm mb-4 text-center">{errors.file}</p>
        )}

        {/* Video Details Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              type="text"
              placeholder="What's your video about?"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`bg-secondary border-secondary-foreground/20 focus:border-purple-400 ${
                errors.title ? 'border-red-400' : ''
              }`}
              disabled={uploading}
              maxLength={100}
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              placeholder="Tell viewers more about your video..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`bg-secondary border-secondary-foreground/20 focus:border-purple-400 min-h-[100px] ${
                errors.description ? 'border-red-400' : ''
              }`}
              disabled={uploading}
              maxLength={500}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <Input
              type="text"
              placeholder="crypto, blockchain, nft (separated by commas)"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
              disabled={uploading}
            />
          </div>
        </div>

        {errors.upload && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm text-center">{errors.upload}</p>
          </div>
        )}
        {/* Upload Button */}
        <div className="mt-6 flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !formData.title || uploading}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
          >
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {uploading ? 'Uploading...' : 'Upload Video'}
          </Button>
        </div>
      </div>
    </div>
  );
}
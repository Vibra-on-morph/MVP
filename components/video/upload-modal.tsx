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
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });

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
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    // Mock upload process
    console.log('Uploading:', { file: selectedFile, ...formData });
    // Here you would integrate with your backend/cloud storage
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-lg relative neon-border max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">Upload Video</h2>
          <p className="text-muted-foreground">Share your content and start earning</p>
        </div>

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
            dragActive 
              ? 'border-purple-400 bg-purple-400/10' 
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
                onClick={() => setSelectedFile(null)}
                className="text-sm text-purple-400 hover:text-purple-300"
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
                  <Button variant="outline" className="cursor-pointer">
                    Browse Files
                  </Button>
                </label>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Video Details Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              type="text"
              placeholder="What's your video about?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              placeholder="Tell viewers more about your video..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-secondary border-secondary-foreground/20 focus:border-purple-400 min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <Input
              type="text"
              placeholder="crypto, blockchain, nft (separated by commas)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
            />
          </div>
        </div>

        {/* Upload Button */}
        <div className="mt-6 flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !formData.title}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Video
          </Button>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadModal } from './upload-modal';

export function UploadButton() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowUpload(true)}
        size="lg"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 shadow-lg neon-glow"
      >
        <Plus className="w-6 h-6" />
      </Button>
      
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </>
  );
}
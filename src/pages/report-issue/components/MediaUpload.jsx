// src/pages/report-issue/components/MediaUpload.jsx
import React, { useState, useRef } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const MediaUpload = ({ onMediaUpload, existingMedia = [] }) => {
  const [media, setMedia] = useState(existingMedia);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  
  const maxFiles = 5;
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'video/avi'];

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files).slice(0, maxFiles - media.length);
    
    const validFiles = newFiles.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported`);
        return false;
      }
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      processFiles(validFiles);
    }
  };

  const processFiles = async (files) => {
    setIsUploading(true);
    
    const processedFiles = await Promise.all(
      files.map(async (file) => {
        const preview = await createPreview(file);
        return {
          id: Date.now() + Math.random(),
          file,
          preview,
          name: file.name,
          size: file.size,
          type: file.type.startsWith('image/') ? 'image' : 'video'
        };
      })
    );

    const updatedMedia = [...media, ...processedFiles];
    setMedia(updatedMedia);
    onMediaUpload(updatedMedia);
    setIsUploading(false);
  };

  const createPreview = (file) => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      } else {
        // For videos, create a thumbnail
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        video.onloadedmetadata = () => {
          canvas.width = 200;
          canvas.height = (video.videoHeight / video.videoWidth) * 200;
          
          video.currentTime = 1; // Seek to 1 second for thumbnail
        };
        
        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL());
        };
        
        video.src = URL.createObjectURL(file);
      }
    });
  };

  const removeFile = (fileId) => {
    const updatedMedia = media.filter(item => item.id !== fileId);
    setMedia(updatedMedia);
    onMediaUpload(updatedMedia);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary hover:bg-surface'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={48} className="text-text-tertiary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Drag and drop files here, or click to select
        </h3>
        <p className="text-text-secondary mb-4">
          Upload photos and videos to help illustrate the issue
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={media.length >= maxFiles || isUploading}
            icon="Image"
          >
            Choose Photos
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'video/*';
              input.multiple = true;
              input.onchange = (e) => handleFileSelect(e.target.files);
              input.click();
            }}
            disabled={media.length >= maxFiles || isUploading}
            icon="Video"
          >
            Choose Videos
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        
        <div className="mt-4 text-sm text-text-tertiary">
          <p>Maximum {maxFiles} files • 10MB per file • JPG, PNG, GIF, MP4, MOV, AVI</p>
          <p>{media.length}/{maxFiles} files uploaded</p>
        </div>
      </div>

      {/* Loading State */}
      {isUploading && (
        <div className="flex items-center justify-center py-4">
          <Icon name="Loader2" size={20} className="animate-spin text-primary mr-2" />
          <span className="text-text-secondary">Processing files...</span>
        </div>
      )}

      {/* Uploaded Files */}
      {media.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-text-primary">Uploaded Files ({media.length})</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.map((item) => (
              <div key={item.id} className="relative bg-white border border-border rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  {item.type === 'image' ? (
                    <img
                      src={item.preview}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={item.preview}
                        alt={`${item.name} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <Icon name="Play" size={32} className="text-white" />
                      </div>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => removeFile(item.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                
                <div className="p-3">
                  <p className="text-sm font-medium text-text-primary truncate" title={item.name}>
                    {item.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-text-secondary">
                      {formatFileSize(item.size)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.type === 'image' ?'bg-blue-100 text-blue-600' :'bg-purple-100 text-purple-600'
                    }`}>
                      {item.type === 'image' ? 'Photo' : 'Video'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex items-start">
          <Icon name="Camera" size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-green-800 font-medium mb-1">Photography Tips</p>
            <ul className="text-green-700 space-y-1">
              <li>• Take clear, well-lit photos from multiple angles</li>
              <li>• Include context like nearby landmarks or street signs</li>
              <li>• Show the full extent of the issue</li>
              <li>• Avoid including people's faces for privacy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
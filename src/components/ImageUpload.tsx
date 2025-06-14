import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void;
  initialImages?: string[];
  maxImages?: number;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  initialImages = [],
  maxImages = 10,
  className = ''
}) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback((newImages: string[]) => {
    setImages(newImages);
    onImagesChange(newImages);
  }, [onImagesChange]);

  const handleFileSelect = useCallback(async (files: FileList) => {
    if (files.length === 0) return;

    setUploading(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      const validFiles: File[] = [];

      // Validate files before upload
      for (let i = 0; i < files.length && images.length + validFiles.length < maxImages; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum size is 5MB`);
          continue;
        }

        validFiles.push(file);
        formData.append('files', file);
      }

      if (validFiles.length === 0) {
        setUploading(false);
        return;
      }

      // Upload files to server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      if (result.urls && result.urls.length > 0) {
        const updatedImages = [...images, ...result.urls];
        handleImageChange(updatedImages);
        
        // Show success message
        alert(`Successfully uploaded ${result.urls.length} image(s)`);
      }

    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    }

    setUploading(false);
  }, [images, maxImages, handleImageChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    handleImageChange(updatedImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    handleImageChange(updatedImages);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="h-12 w-12 text-gray-400" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {uploading ? 'Uploading images...' : 'Upload property images'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Drag and drop images here, or{' '}
              <button
                type="button"
                onClick={handleBrowseClick}
                className="text-orange-600 hover:text-orange-500 font-medium"
                disabled={uploading}
              >
                browse to select
              </button>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Maximum {maxImages} images, up to 5MB each. Supported formats: JPG, PNG, WebP
            </p>
          </div>
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">
            Uploaded Images ({images.length}/{maxImages})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
                
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
                
                {/* Image Index */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {index === 0 ? 'Main' : index + 1}
                </div>
                
                {/* Move Buttons */}
                <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      className="bg-blue-500 text-white rounded px-2 py-1 text-xs hover:bg-blue-600"
                    >
                      ←
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      className="bg-blue-500 text-white rounded px-2 py-1 text-xs hover:bg-blue-600"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {/* Add More Button */}
            {images.length < maxImages && (
              <button
                type="button"
                onClick={handleBrowseClick}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors"
                disabled={uploading}
              >
                <Plus className="h-8 w-8 mb-2" />
                <span className="text-sm">Add More</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;


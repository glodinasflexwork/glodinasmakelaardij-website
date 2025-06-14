import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Plus, Cloud } from 'lucide-react';
import Image from 'next/image';

interface CloudinaryUploadProps {
  onImagesChange: (images: string[]) => void;
  initialImages?: string[];
  maxImages?: number;
  className?: string;
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onImagesChange,
  initialImages = [],
  maxImages = 10,
  className = ''
}) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  React.useEffect(() => {
    // Load Cloudinary upload widget script
    if (typeof window !== 'undefined' && !cloudinaryRef.current) {
      cloudinaryRef.current = (window as any).cloudinary;
      
      if (!cloudinaryRef.current) {
        const script = document.createElement('script');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.async = true;
        script.onload = () => {
          cloudinaryRef.current = (window as any).cloudinary;
        };
        document.body.appendChild(script);
      }
    }
  }, []);

  const handleImageChange = (newImages: string[]) => {
    setImages(newImages);
    onImagesChange(newImages);
  };

  const openUploadWidget = () => {
    if (!cloudinaryRef.current) {
      alert('Cloudinary is still loading. Please try again in a moment.');
      return;
    }

    setUploading(true);

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
        sources: ['local', 'url', 'camera'],
        multiple: true,
        maxFiles: maxImages - images.length,
        maxFileSize: 5000000, // 5MB
        resourceType: 'image',
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        theme: 'minimal',
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#FF6B35',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#FF6B35',
            action: '#FF6B35',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1'
          }
        },
        text: {
          en: {
            or: 'or',
            back: 'Back',
            advanced: 'Advanced',
            close: 'Close',
            no_results: 'No Results',
            search_placeholder: 'Search...',
            about_uw: 'About Upload Widget',
            search: {
              placeholder: 'Search for images',
              reset: 'Reset search'
            },
            camera: {
              capture: 'Capture',
              cancel: 'Cancel',
              take_pic: 'Take a picture and upload it',
              explanation: 'Make sure your camera is connected and your browser allows camera access. When ready, click Capture.'
            },
            dropzone: {
              title: 'Upload Property Images',
              subtitle: 'Drag and drop images here, or click to browse'
            },
            local: {
              browse: 'Browse',
              dd_title_single: 'Drag and Drop an Image',
              dd_title_multi: 'Drag and Drop Images',
              drop_title_single: 'Drop image to upload',
              drop_title_multi: 'Drop images to upload'
            }
          }
        }
      },
      (error: any, result: any) => {
        setUploading(false);
        
        if (error) {
          console.error('Upload error:', error);
          alert('Upload failed. Please try again.');
          return;
        }

        if (result && result.event === 'success') {
          const newImageUrl = result.info.secure_url;
          const updatedImages = [...images, newImageUrl];
          handleImageChange(updatedImages);
        }

        if (result && result.event === 'close') {
          // Widget closed
        }
      }
    );

    widgetRef.current.open();
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
      {/* Upload Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={openUploadWidget}
          disabled={uploading || images.length >= maxImages}
          className={`inline-flex items-center px-6 py-3 border-2 border-dashed rounded-lg text-sm font-medium transition-colors ${
            uploading || images.length >= maxImages
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-orange-300 text-orange-600 hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50'
          }`}
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
              Uploading...
            </>
          ) : (
            <>
              <Cloud className="mr-2 h-5 w-5" />
              Upload Property Images
            </>
          )}
        </button>
        
        <p className="text-xs text-gray-500 mt-2">
          {images.length}/{maxImages} images • Max 5MB each • JPG, PNG, WebP supported
        </p>
        
        {images.length >= maxImages && (
          <p className="text-xs text-orange-600 mt-1">
            Maximum number of images reached
          </p>
        )}
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
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
                onClick={openUploadWidget}
                disabled={uploading}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-8 w-8 mb-2" />
                <span className="text-sm">Add More</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cloudinary Branding */}
      <div className="text-center">
        <p className="text-xs text-gray-400">
          Powered by{' '}
          <a 
            href="https://cloudinary.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            Cloudinary
          </a>
        </p>
      </div>
    </div>
  );
};

export default CloudinaryUpload;


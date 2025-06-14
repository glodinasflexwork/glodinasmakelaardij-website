import React, { useState } from 'react';
import { Camera, Upload, X, Eye, Download } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  onImageSelect?: (imageUrl: string) => void;
  selectedImage?: string;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  onImagesChange,
  onImageSelect,
  selectedImage,
  className = ''
}) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const setAsMainImage = (index: number) => {
    if (index === 0) return; // Already main image
    
    const updatedImages = [...images];
    const [mainImage] = updatedImages.splice(index, 1);
    updatedImages.unshift(mainImage);
    onImagesChange(updatedImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    onImagesChange(updatedImages);
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `property-image-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (images.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No images uploaded yet</p>
        <p className="text-sm text-gray-400">Upload images to see them here</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image Display */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Main Image</h4>
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
            <Image
              src={images[0]}
              alt="Main property image"
              fill
              className="object-cover"
            />
            
            {/* Main Image Controls */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setLightboxImage(images[0])}
                  className="bg-white text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
                  title="View full size"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => downloadImage(images[0], 0)}
                  className="bg-white text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
                  title="Download image"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(0)}
                  className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Main Image Badge */}
            <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Main Image
            </div>
          </div>
        </div>
      )}

      {/* Additional Images Grid */}
      {images.length > 1 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">
            Additional Images ({images.length - 1})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.slice(1).map((image, index) => {
              const actualIndex = index + 1;
              return (
                <div
                  key={actualIndex}
                  className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer ${
                    selectedImage === image ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => onImageSelect?.(image)}
                >
                  <Image
                    src={image}
                    alt={`Property image ${actualIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Image Controls */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200">
                    <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImage(image);
                        }}
                        className="bg-white text-gray-700 rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                        title="View full size"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(image, actualIndex);
                        }}
                        className="bg-white text-gray-700 rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                        title="Download image"
                      >
                        <Download className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(actualIndex);
                        }}
                        className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    
                    {/* Set as Main Button */}
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAsMainImage(actualIndex);
                        }}
                        className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-orange-600 transition-colors"
                      >
                        Set as Main
                      </button>
                    </div>
                  </div>
                  
                  {/* Image Number */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {actualIndex + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 bg-white text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative w-full h-full">
              <Image
                src={lightboxImage}
                alt="Property image full size"
                width={800}
                height={600}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;


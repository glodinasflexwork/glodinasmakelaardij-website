import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Phone,
  Mail,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface PropertyImage {
  src: string;
  alt: string;
}

interface PropertyFeature {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface PropertyPageProps {
  property: {
    id: string;
    title: string;
    address: string;
    city: string;
    price: string;
    priceType: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    plotSize?: number;
    buildYear: number;
    energyLabel: string;
    status: string;
    description: string;
    features: PropertyFeature[];
    images: PropertyImage[];
    floorPlan?: string;
    location: {
      lat: number;
      lng: number;
    };
  };
}

export default function PropertyPage({ property }: PropertyPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-orange-600 transition-colors">Woningen</Link>
            <span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]?.src}
                  alt={property.images[currentImageIndex]?.alt}
                  className="w-full h-96 object-cover rounded-xl cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                />
                
                {/* Image Navigation */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  property.status === 'Beschikbaar' 
                    ? 'bg-orange-500 text-white'
                    : property.status === 'Onder bod'
                    ? 'bg-orange-100 text-orange-800 border border-orange-300'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {property.status}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {property.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'border-orange-500' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kenmerken</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-orange-500">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{feature.label}</div>
                      <div className="font-semibold text-gray-900">{feature.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Beschrijving</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Floor Plan */}
            {property.floorPlan && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Plattegrond</h2>
                <img
                  src={property.floorPlan}
                  alt="Plattegrond"
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {/* Location */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Locatie</h2>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">{property.address}, {property.city}</span>
              </div>
              
              {/* Google Maps Embed */}
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dw901SwHSR3g-0&q=${encodeURIComponent(property.address + ', ' + property.city)}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${property.address}`}
                />
              </div>
              
              {/* Neighborhood Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Buurtinformatie</h3>
                <p className="text-sm text-gray-600">
                  Deze woning ligt in een gewilde buurt van {property.city} met goede voorzieningen 
                  en uitstekende bereikbaarheid.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Price and Basic Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{property.price}</div>
                  <div className="text-gray-600">{property.priceType}</div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{property.address}, {property.city}</span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Bed className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                    <div className="text-sm text-gray-600">Slaapkamers</div>
                    <div className="font-semibold">{property.bedrooms}</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                    <div className="text-sm text-gray-600">Badkamers</div>
                    <div className="font-semibold">{property.bathrooms}</div>
                  </div>
                  <div className="text-center">
                    <Square className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                    <div className="text-sm text-gray-600">Oppervlakte</div>
                    <div className="font-semibold">{property.area}m²</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Bezichtiging Plannen
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                      <Phone className="w-4 h-4 mr-2" />
                      Bellen
                    </Button>
                    <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                      <Mail className="w-4 h-4 mr-2" />
                      E-mail
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Bewaren
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Delen
                    </Button>
                  </div>
                </div>
              </div>

              {/* Energy Label */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Energielabel</h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-lg font-bold text-white ${
                  property.energyLabel === 'A' ? 'bg-green-500' :
                  property.energyLabel === 'B' ? 'bg-green-400' :
                  property.energyLabel === 'C' ? 'bg-yellow-500' :
                  property.energyLabel === 'D' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}>
                  <Zap className="w-4 h-4 mr-2" />
                  Energielabel {property.energyLabel}
                </div>
              </div>

              {/* Contact Agent */}
              <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Uw makelaar</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src="/agent-photo.jpg"
                    alt="Makelaar"
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Glodinas Makelaardij</div>
                    <div className="text-sm text-gray-600">Erkend makelaar</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-orange-500" />
                    <span>(6) 81 34 85 51</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-orange-500" />
                    <span>info@glodinasmakelaardij.nl</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={property.images[currentImageIndex]?.src}
              alt={property.images[currentImageIndex]?.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Bezichtiging Plannen</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Uw volledige naam"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="uw.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="06 12 34 56 78"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gewenste datum</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bericht (optioneel)</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Eventuele vragen of opmerkingen..."
                />
              </div>
              
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Verstuur Aanvraag
              </Button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}


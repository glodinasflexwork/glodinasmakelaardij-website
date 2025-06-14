'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Mail, 
  Phone, 
  Heart, 
  Share2, 
  MapPin, 
  Home, 
  Bath, 
  BedDouble, 
  Ruler, 
  Tag, 
  ArrowLeft,
  Info,
  Building,
  Lightbulb
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  originalPrice?: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  energyLabel: string;
  features: string[];
  mainImage: string;
  images: string[];
  rating: number;
  status: 'new' | 'under_offer' | 'available' | 'sold';
  description: string;
  neighborhood?: string;
  yearBuilt?: number;
  plotSize?: number;
  heating?: string;
  parking?: string;
  garden?: string;
}

type Props = {
  params: { id: string }
}

export default function PropertyDetailPage({ params }: Props) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Property not found');
          } else {
            throw new Error('Failed to fetch property');
          }
          return;
        }

        const data = await response.json();
        setProperty(data.property);
        setError(null);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-600">Woning details laden...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Woning niet gevonden</h1>
            <p className="mb-8 text-gray-600">
              {error || 'De woning die u zoekt bestaat niet of is niet meer beschikbaar.'}
            </p>
            <Link href="/woningen">
              <Button variant="cta">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Terug naar woningen
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Property Detail Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/woningen" className="text-gray-600 hover:text-orange-500">
                    Woningen
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{property.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Property Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-800 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-2xl md:text-3xl font-bold text-orange-600">{property.price}</div>
            {property.originalPrice && (
              <div className="text-sm text-gray-500 line-through text-right">{property.originalPrice}</div>
            )}
          </div>
        </div>
        
        {/* Property Status */}
        {property.status === 'new' && (
          <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-6">
            Nieuw
          </div>
        )}
        {property.status === 'under_offer' && (
          <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-6">
            Onder Bod
          </div>
        )}
        {property.status === 'sold' && (
          <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-6">
            Verkocht
          </div>
        )}
        
        {/* Property Images Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src={property.mainImage || property.images[0] || '/images/placeholder-property.jpg'} 
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-[190px] rounded-lg overflow-hidden">
                <Image 
                  src={image || '/images/placeholder-property.jpg'} 
                  alt={`${property.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/schedule">
            <Button variant="cta" size="lg" className="flex-grow md:flex-grow-0">
              <Calendar className="mr-2 h-5 w-5" />
              Plan een bezichtiging
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ctaOutline" size="lg" className="flex-grow md:flex-grow-0">
              <Mail className="mr-2 h-5 w-5" />
              Contact opnemen
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="flex-grow md:flex-grow-0">
            <Heart className="mr-2 h-5 w-5" />
            Opslaan
          </Button>
          <Button variant="outline" size="lg" className="flex-grow md:flex-grow-0">
            <Share2 className="mr-2 h-5 w-5" />
            Delen
          </Button>
        </div>
        
        {/* Property Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Main Info */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Kenmerken</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <BedDouble className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-900 font-medium">Slaapkamers</div>
                    <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-900 font-medium">Badkamers</div>
                    <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-900 font-medium">Woonoppervlak</div>
                    <div className="font-semibold text-gray-900">{property.size}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-900 font-medium">Energielabel</div>
                    <div className="font-semibold text-gray-900">{property.energyLabel}</div>
                  </div>
                </div>
                {property.yearBuilt && (
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-orange-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-900">Bouwjaar</div>
                      <div className="font-semibold text-gray-900">{property.yearBuilt}</div>
                    </div>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-orange-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-900">Oppervlakte</div>
                      <div className="font-semibold text-gray-900">{property.area}m²</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Beschrijving</h2>
              <div className="text-gray-900 leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>
            
            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-lg border p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Kenmerken</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Tag className="h-4 w-4 text-orange-500 mr-2" />
                    <div>
                      <span className="text-sm text-gray-900">{feature}</span>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Additional Details */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Aanvullende informatie</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.neighborhood && (
                  <div>
                    <div className="text-sm text-gray-900">Buurt</div>
                    <div className="font-semibold text-gray-900">{property.neighborhood}</div>
                  </div>
                )}
                {property.heating && (
                  <div>
                    <div className="text-sm text-gray-900">Verwarming</div>
                    <div className="font-semibold text-gray-900">{property.heating}</div>
                  </div>
                )}
                {property.parking && (
                  <div>
                    <div className="text-sm text-gray-900">Parkeren</div>
                    <div className="font-semibold text-gray-900">{property.parking}</div>
                  </div>
                )}
                {property.garden && (
                  <div>
                    <div className="text-sm text-gray-900">Tuin</div>
                    <div className="font-semibold text-gray-900">{property.garden}</div>
                  </div>
                )}
                {property.plotSize && property.plotSize > 0 && (
                  <div>
                    <div className="text-sm text-gray-900">Perceeloppervlakte</div>
                    <div className="font-semibold text-gray-900">{property.plotSize}m²</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
              
              {/* Agent Info */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                    GM
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Glodinas Makelaardij</div>
                    <div className="text-sm text-gray-900">Makelaar</div>
                  </div>
                </div>
              </div>
              
              {/* Contact Buttons */}
              <div className="space-y-3">
                <Link href="/contact" className="block">
                  <Button variant="cta" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    E-mail versturen
                  </Button>
                </Link>
                <Button variant="ctaOutline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Bel direct
                </Button>
                <Link href="/schedule" className="block">
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Plan bezichtiging
                  </Button>
                </Link>
              </div>
              
              {/* Property Rating */}
              {property.rating && (
                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm text-gray-900 mb-2">Waardering</div>
                  <div className="flex items-center">
                    <div className="flex text-orange-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < property.rating ? 'text-orange-500' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-900">({property.rating}/5)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Similar Properties */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vergelijkbare woningen</h2>
          <p className="text-gray-900">
            Bekijk andere woningen in {property.neighborhood || property.location} die mogelijk interessant voor u zijn.
          </p>
          <div className="mt-4">
            <Link href="/woningen">
              <Button variant="ctaOutline">
                Meer woningen bekijken
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}


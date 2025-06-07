'use client';

import React, { useState } from 'react';
import { Search, Heart, MapPin, Bed, Bath, Home, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface Property {
  id: number;
  title: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  image: string;
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Te Koop' | 'Te Huur' | 'Verkocht';
}

const PropertyGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  // Real property data with the addresses provided by the client
  const properties: Property[] = [
    {
      id: 1,
      title: 'Ruim appartement in rustige wijk',
      address: 'Jacob Schorerlaan 201, 2515 XS Den Haag',
      price: '€ 375.000 k.k.',
      bedrooms: 3,
      bathrooms: 1,
      size: '85 m²',
      image: '/images/properties/property1.jpg',
      status: 'Te Koop'
    },
    {
      id: 2,
      title: 'Karakteristiek pand in het centrum',
      address: 'Groenewegje 76, 2515 LN Den Haag',
      price: '€ 450.000 k.k.',
      bedrooms: 2,
      bathrooms: 1,
      size: '75 m²',
      image: '/images/properties/property2.jpg',
      status: 'Te Koop'
    },
    {
      id: 3,
      title: 'Modern appartement nabij stadscentrum',
      address: 'Westeinde 11-D, 2512 GS Den Haag',
      price: '€ 325.000 k.k.',
      bedrooms: 2,
      bathrooms: 1,
      size: '65 m²',
      image: '/images/properties/property3.jpg',
      status: 'Te Koop'
    },
    {
      id: 4,
      title: 'Luxe woning nabij strand',
      address: 'Rijslag 27, 2587 BB Den Haag',
      price: '€ 595.000 k.k.',
      bedrooms: 4,
      bathrooms: 2,
      size: '120 m²',
      image: '/images/properties/property4.jpg',
      status: 'Te Koop'
    }
  ];

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Onze Woningen</h2>
        
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Zoek op locatie, prijs, of kenmerken..."
              className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.status}
                </div>
                <button 
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                  onClick={() => toggleFavorite(property.id)}
                  aria-label="Add to favorites"
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.address}</span>
                </div>
                <div className="text-2xl font-bold text-primary mb-4">{property.price}</div>
                <div className="flex justify-between mb-6">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{property.bedrooms} Slaapkamers</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{property.bathrooms} Badkamer</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{property.size}</span>
                  </div>
                </div>
                <Button className="w-full flex items-center justify-center">
                  Bekijk Details <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="mx-auto">
            Bekijk Alle Woningen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGallery;


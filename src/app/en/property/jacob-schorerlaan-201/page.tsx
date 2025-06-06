'use client';

import PropertyPage from '@/components/PropertyPage';
import { 
  Home,
  Car,
  Zap,
  Thermometer,
  Wifi,
  Shield,
  TreePine,
  Building,
  Square,
  Calendar
} from 'lucide-react';

export default function JacobSchorerlaanPropertyEnglish() {
  const property = {
    id: 'jacob-schorerlaan-201',
    title: 'Jacob Schorerlaan 201',
    address: 'Jacob Schorerlaan 201',
    city: 'The Hague',
    price: '€465,000',
    priceType: 'k.k.',
    bedrooms: 3,
    bathrooms: 1,
    area: 107,
    plotSize: 150,
    buildYear: 1995,
    energyLabel: 'A',
    status: 'Available',
    description: `This beautiful property at Jacob Schorerlaan 201 offers a unique opportunity to live in the heart of The Hague, near the vibrant Groente- en Fruitmarkt (Vegetable and Fruit Market). The house has been completely renovated and equipped with modern amenities, while preserving its authentic charm.

    With a living area of 107m², this property offers spacious living spaces, including a bright living room with large windows that provide plenty of natural light. The modern kitchen is fully equipped with high-quality appliances and offers sufficient space for meal preparation.

    The property features three comfortable bedrooms and a modern bathroom. The location is ideal for those who enjoy urban living with all amenities within reach, including shops, restaurants, public transport, and recreational facilities.

    The energy label A ensures low energy costs and a sustainable living environment. This is an excellent opportunity for both first-time buyers and investors looking for a high-quality property in a desirable neighborhood of The Hague.`,
    
    features: [
      {
        icon: <Home className="w-5 h-5" />,
        label: 'Living Area',
        value: '107 m²'
      },
      {
        icon: <Square className="w-5 h-5" />,
        label: 'Plot Size',
        value: '150 m²'
      },
      {
        icon: <Building className="w-5 h-5" />,
        label: 'Built Year',
        value: '1995'
      },
      {
        icon: <Zap className="w-5 h-5" />,
        label: 'Energy Label',
        value: 'A'
      },
      {
        icon: <Car className="w-5 h-5" />,
        label: 'Parking',
        value: 'Public parking'
      },
      {
        icon: <Thermometer className="w-5 h-5" />,
        label: 'Heating',
        value: 'Central heating (2020)'
      },
      {
        icon: <Wifi className="w-5 h-5" />,
        label: 'Internet',
        value: 'Fiber optic available'
      },
      {
        icon: <Shield className="w-5 h-5" />,
        label: 'Security',
        value: 'Alarm system'
      },
      {
        icon: <TreePine className="w-5 h-5" />,
        label: 'Garden',
        value: 'Back garden (South)'
      },
      {
        icon: <Calendar className="w-5 h-5" />,
        label: 'Available',
        value: 'Immediately'
      }
    ],
    
    images: [
      {
        src: '/images/properties/jacob-schorerlaan-201-living-room.jpg',
        alt: 'Jacob Schorerlaan 201 - Living Room'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-kitchen.jpg',
        alt: 'Jacob Schorerlaan 201 - Kitchen'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-bedroom.jpg',
        alt: 'Jacob Schorerlaan 201 - Bedroom'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-bathroom.jpg',
        alt: 'Jacob Schorerlaan 201 - Bathroom'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-exterior.jpg',
        alt: 'Jacob Schorerlaan 201 - Exterior'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-garden.jpg',
        alt: 'Jacob Schorerlaan 201 - Garden'
      }
    ],
    
    floorPlan: '/images/properties/jacob-schorerlaan-201-floorplan.jpg',
    
    location: {
      lat: 52.0705,
      lng: 4.3007
    }
  };

  return <PropertyPage property={property} />;
}


import PropertyPage from '@/components/PropertyPage';
import { 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Zap,
  Home,
  MapPin,
  TreePine
} from 'lucide-react';

const property = {
  id: 'groenewegje-76',
  title: 'Groenewegje 76',
  address: 'Groenewegje 76',
  city: '2515 LN The Hague',
  price: '€575,000',
  priceType: 'k.k.',
  bedrooms: 2,
  bathrooms: 1,
  area: 92,
  buildYear: 1920,
  energyLabel: 'A',
  status: 'Under offer',
  description: 'Charming ground floor apartment located on the canals of The Hague with two bedrooms, backyard and a beautiful view of the canal! This unique apartment offers a perfect combination of historical charm and modern comfort. The property has been completely renovated and is move-in ready, with high-quality finishes and sustainable materials. The waterfront location makes this a special property in the heart of The Hague.',
  features: [
    {
      icon: <Bed className="w-5 h-5" />,
      label: 'Bedrooms',
      value: '2'
    },
    {
      icon: <Bath className="w-5 h-5" />,
      label: 'Bathrooms',
      value: '1'
    },
    {
      icon: <Square className="w-5 h-5" />,
      label: 'Living area',
      value: '92 m²'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Built year',
      value: '1920'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Energy label',
      value: 'A'
    },
    {
      icon: <TreePine className="w-5 h-5" />,
      label: 'Garden',
      value: 'Backyard'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'Canal side'
    },
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Type',
      value: 'Ground floor apartment'
    }
  ],
  images: [
    {
      src: '/properties/groenewegje-76/living-room.jpg',
      alt: 'Living room with canal view'
    },
    {
      src: '/properties/groenewegje-76/kitchen.jpg',
      alt: 'Modern kitchen'
    },
    {
      src: '/properties/groenewegje-76/bedroom1.jpg',
      alt: 'Master bedroom'
    },
    {
      src: '/properties/groenewegje-76/bedroom2.jpg',
      alt: 'Second bedroom'
    },
    {
      src: '/properties/groenewegje-76/bathroom.jpg',
      alt: 'Bathroom'
    },
    {
      src: '/properties/groenewegje-76/garden.jpg',
      alt: 'Backyard'
    },
    {
      src: '/properties/groenewegje-76/canal-view.jpg',
      alt: 'Canal view'
    }
  ],
  location: {
    lat: 52.0705,
    lng: 4.3007
  }
};

export default function GroenewegjePage() {
  return <PropertyPage property={property} />;
}


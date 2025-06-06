import PropertyPage from '@/components/PropertyPage';
import { 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Zap,
  Home,
  MapPin,
  Building
} from 'lucide-react';

const property = {
  id: 'westeinde-11-d',
  title: 'Westeinde 11-D',
  address: 'Westeinde 11-D',
  city: '2512 GS The Hague',
  price: '€675,000',
  priceType: 'k.k.',
  bedrooms: 2,
  bathrooms: 1,
  area: 110,
  buildYear: 1921,
  energyLabel: 'A',
  status: 'Available',
  description: 'Spacious and stately classic apartment located on Westeinde with private entrance on private square. This beautiful apartment is located in a historic building from 1921 and has been completely renovated while preserving authentic details. The property features high ceilings, large windows and an excellent location in the center of The Hague. Perfect for those looking for a combination of historical charm and modern comfort in the heart of the city.',
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
      value: '110 m²'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Built year',
      value: '1921'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Energy label',
      value: 'A'
    },
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Type',
      value: 'Apartment'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'City center'
    },
    {
      icon: <Building className="w-5 h-5" />,
      label: 'Entrance',
      value: 'Private entrance'
    }
  ],
  images: [
    {
      src: '/properties/westeinde-11-d/living-room.jpg',
      alt: 'Spacious living room with high ceilings'
    },
    {
      src: '/properties/westeinde-11-d/kitchen.jpg',
      alt: 'Modern kitchen'
    },
    {
      src: '/properties/westeinde-11-d/bedroom1.jpg',
      alt: 'Master bedroom'
    },
    {
      src: '/properties/westeinde-11-d/bedroom2.jpg',
      alt: 'Second bedroom'
    },
    {
      src: '/properties/westeinde-11-d/bathroom.jpg',
      alt: 'Bathroom'
    },
    {
      src: '/properties/westeinde-11-d/entrance.jpg',
      alt: 'Private entrance'
    },
    {
      src: '/properties/westeinde-11-d/exterior.jpg',
      alt: 'Building exterior'
    }
  ],
  location: {
    lat: 52.0799,
    lng: 4.3113
  }
};

export default function WesteindeePage() {
  return <PropertyPage property={property} />;
}


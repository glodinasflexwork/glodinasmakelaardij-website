import PropertyPage from '@/components/PropertyPage';
import { 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Car,
  TreePine,
  Zap,
  Home,
  MapPin,
  Waves,
  Dumbbell,
  Sparkles
} from 'lucide-react';

const property = {
  id: 'rijslag-27',
  title: 'Rijslag 27',
  address: 'Rijslag 27',
  city: '2587 BB The Hague',
  price: '€6,500,000',
  priceType: 'k.k.',
  bedrooms: 7,
  bathrooms: 3,
  area: 750,
  plotSize: 1572,
  buildYear: 1925,
  energyLabel: 'A+',
  status: 'Under offer',
  description: 'Exquisite waterfront villa in The Hague with pool, wellness facilities, and private jetty. Situated on a quiet, tree-lined street in Benoordenhout, this unique villa offers the ultimate in luxury living. The villa features a spacious living area of 750m² on a plot of 1,572m² and offers all modern amenities including a private swimming pool, wellness room, gym and a private jetty on the water. Perfect for those looking for exclusive living in one of The Hague\'s most desirable neighborhoods.',
  features: [
    {
      icon: <Bed className="w-5 h-5" />,
      label: 'Bedrooms',
      value: '7'
    },
    {
      icon: <Bath className="w-5 h-5" />,
      label: 'Bathrooms',
      value: '3'
    },
    {
      icon: <Square className="w-5 h-5" />,
      label: 'Living area',
      value: '750 m²'
    },
    {
      icon: <TreePine className="w-5 h-5" />,
      label: 'Plot size',
      value: '1,572 m²'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Built year',
      value: '1925'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Energy label',
      value: 'A+'
    },
    {
      icon: <Waves className="w-5 h-5" />,
      label: 'Swimming pool',
      value: 'Private pool'
    },
    {
      icon: <Dumbbell className="w-5 h-5" />,
      label: 'Fitness',
      value: 'Private gym'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      label: 'Wellness',
      value: 'Wellness facilities'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'Benoordenhout'
    },
    {
      icon: <Car className="w-5 h-5" />,
      label: 'Parking',
      value: 'Private driveway'
    },
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Type',
      value: 'Detached villa'
    }
  ],
  images: [
    {
      src: '/properties/rijslag-27/exterior.jpg',
      alt: 'Exclusive waterfront villa'
    },
    {
      src: '/properties/rijslag-27/living-room.jpg',
      alt: 'Spacious living room with high ceilings'
    },
    {
      src: '/properties/rijslag-27/kitchen.jpg',
      alt: 'Luxury kitchen with island'
    },
    {
      src: '/properties/rijslag-27/master-bedroom.jpg',
      alt: 'Master bedroom with ensuite'
    },
    {
      src: '/properties/rijslag-27/pool.jpg',
      alt: 'Private swimming pool in garden'
    },
    {
      src: '/properties/rijslag-27/wellness.jpg',
      alt: 'Wellness room'
    },
    {
      src: '/properties/rijslag-27/gym.jpg',
      alt: 'Fitness room'
    },
    {
      src: '/properties/rijslag-27/jetty.jpg',
      alt: 'Private jetty'
    },
    {
      src: '/properties/rijslag-27/garden.jpg',
      alt: 'Spacious garden with terrace'
    },
    {
      src: '/properties/rijslag-27/dining-room.jpg',
      alt: 'Dining room'
    }
  ],
  location: {
    lat: 52.1205,
    lng: 4.3234
  }
};

export default function RijslagPage() {
  return <PropertyPage property={property} />;
}


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
  city: '2587 BB Den Haag',
  price: '€6.500.000',
  priceType: 'k.k.',
  bedrooms: 7,
  bathrooms: 3,
  area: 750,
  plotSize: 1572,
  buildYear: 1925,
  energyLabel: 'A+',
  status: 'Onder bod',
  description: 'Exclusieve watervilla in Den Haag met zwembad, wellness faciliteiten en privé aanlegsteiger. Gelegen aan een rustige, met bomen omzoomde straat in Benoordenhout biedt deze unieke villa het ultieme in luxe wonen. De villa beschikt over een ruime woonoppervlakte van 750m² op een perceel van 1.572m² en biedt alle moderne gemakken inclusief een privé zwembad, wellness ruimte, fitnessruimte en een eigen aanlegsteiger aan het water. Perfect voor wie op zoek is naar exclusief wonen in een van de meest gewilde buurten van Den Haag.',
  features: [
    {
      icon: <Bed className="w-5 h-5" />,
      label: 'Slaapkamers',
      value: '7'
    },
    {
      icon: <Bath className="w-5 h-5" />,
      label: 'Badkamers',
      value: '3'
    },
    {
      icon: <Square className="w-5 h-5" />,
      label: 'Woonoppervlakte',
      value: '750 m²'
    },
    {
      icon: <TreePine className="w-5 h-5" />,
      label: 'Perceel',
      value: '1.572 m²'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Bouwjaar',
      value: '1925'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Energielabel',
      value: 'A+'
    },
    {
      icon: <Waves className="w-5 h-5" />,
      label: 'Zwembad',
      value: 'Privé zwembad'
    },
    {
      icon: <Dumbbell className="w-5 h-5" />,
      label: 'Fitness',
      value: 'Eigen fitnessruimte'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      label: 'Wellness',
      value: 'Wellness faciliteiten'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Ligging',
      value: 'Benoordenhout'
    },
    {
      icon: <Car className="w-5 h-5" />,
      label: 'Parkeren',
      value: 'Privé oprit'
    },
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Type',
      value: 'Vrijstaande villa'
    }
  ],
  images: [
    {
      src: '/properties/rijslag-27/exterior.jpg',
      alt: 'Exclusieve watervilla aan het water'
    },
    {
      src: '/properties/rijslag-27/living-room.jpg',
      alt: 'Ruime woonkamer met hoge plafonds'
    },
    {
      src: '/properties/rijslag-27/kitchen.jpg',
      alt: 'Luxe keuken met kookeiland'
    },
    {
      src: '/properties/rijslag-27/master-bedroom.jpg',
      alt: 'Master bedroom met ensuite'
    },
    {
      src: '/properties/rijslag-27/pool.jpg',
      alt: 'Privé zwembad in de tuin'
    },
    {
      src: '/properties/rijslag-27/wellness.jpg',
      alt: 'Wellness ruimte'
    },
    {
      src: '/properties/rijslag-27/gym.jpg',
      alt: 'Fitnessruimte'
    },
    {
      src: '/properties/rijslag-27/jetty.jpg',
      alt: 'Privé aanlegsteiger'
    },
    {
      src: '/properties/rijslag-27/garden.jpg',
      alt: 'Ruime tuin met terras'
    },
    {
      src: '/properties/rijslag-27/dining-room.jpg',
      alt: 'Eetkamer'
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


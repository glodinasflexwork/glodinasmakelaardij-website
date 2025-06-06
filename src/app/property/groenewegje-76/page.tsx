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
  city: '2515 LN Den Haag',
  price: '€575.000',
  priceType: 'k.k.',
  bedrooms: 2,
  bathrooms: 1,
  area: 92,
  buildYear: 1920,
  energyLabel: 'A',
  status: 'Onder bod',
  description: 'Charmant gelijkvloers appartement gelegen aan de grachten van Den Haag met twee slaapkamers, achtertuin en een prachtig uitzicht op de gracht! Dit unieke appartement biedt een perfecte combinatie van historische charme en moderne comfort. De woning is volledig gerenoveerd en instapklaar, met hoogwaardige afwerking en duurzame materialen. De ligging aan het water maakt dit een bijzondere woning in het hart van Den Haag.',
  features: [
    {
      icon: <Bed className="w-5 h-5" />,
      label: 'Slaapkamers',
      value: '2'
    },
    {
      icon: <Bath className="w-5 h-5" />,
      label: 'Badkamers',
      value: '1'
    },
    {
      icon: <Square className="w-5 h-5" />,
      label: 'Woonoppervlakte',
      value: '92 m²'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Bouwjaar',
      value: '1920'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Energielabel',
      value: 'A'
    },
    {
      icon: <TreePine className="w-5 h-5" />,
      label: 'Tuin',
      value: 'Achtertuin'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Ligging',
      value: 'Aan de gracht'
    },
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Type',
      value: 'Gelijkvloers appartement'
    }
  ],
  images: [
    {
      src: '/properties/groenewegje-76/living-room.jpg',
      alt: 'Woonkamer met uitzicht op de gracht'
    },
    {
      src: '/properties/groenewegje-76/kitchen.jpg',
      alt: 'Moderne keuken'
    },
    {
      src: '/properties/groenewegje-76/bedroom1.jpg',
      alt: 'Hoofdslaapkamer'
    },
    {
      src: '/properties/groenewegje-76/bedroom2.jpg',
      alt: 'Tweede slaapkamer'
    },
    {
      src: '/properties/groenewegje-76/bathroom.jpg',
      alt: 'Badkamer'
    },
    {
      src: '/properties/groenewegje-76/garden.jpg',
      alt: 'Achtertuin'
    },
    {
      src: '/properties/groenewegje-76/canal-view.jpg',
      alt: 'Uitzicht op de gracht'
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


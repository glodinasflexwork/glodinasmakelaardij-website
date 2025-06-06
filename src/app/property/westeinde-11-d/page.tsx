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
  city: '2512 GS Den Haag',
  price: '€675.000',
  priceType: 'k.k.',
  bedrooms: 2,
  bathrooms: 1,
  area: 110,
  buildYear: 1921,
  energyLabel: 'A',
  status: 'Beschikbaar',
  description: 'Ruim en statig klassiek appartement gelegen aan het Westeinde met eigen ingang op eigen plein. Dit prachtige appartement bevindt zich in een historisch pand uit 1921 en is volledig gerenoveerd met behoud van authentieke details. De woning beschikt over hoge plafonds, grote ramen en een uitstekende ligging in het centrum van Den Haag. Perfect voor wie op zoek is naar een combinatie van historische charme en moderne comfort in het hart van de stad.',
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
      value: '110 m²'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Bouwjaar',
      value: '1921'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Energielabel',
      value: 'A'
    },
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Type',
      value: 'Appartement'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Ligging',
      value: 'Centrum'
    },
    {
      icon: <Building className="w-5 h-5" />,
      label: 'Ingang',
      value: 'Eigen ingang'
    }
  ],
  images: [
    {
      src: '/properties/westeinde-11-d/living-room.jpg',
      alt: 'Ruime woonkamer met hoge plafonds'
    },
    {
      src: '/properties/westeinde-11-d/kitchen.jpg',
      alt: 'Moderne keuken'
    },
    {
      src: '/properties/westeinde-11-d/bedroom1.jpg',
      alt: 'Hoofdslaapkamer'
    },
    {
      src: '/properties/westeinde-11-d/bedroom2.jpg',
      alt: 'Tweede slaapkamer'
    },
    {
      src: '/properties/westeinde-11-d/bathroom.jpg',
      alt: 'Badkamer'
    },
    {
      src: '/properties/westeinde-11-d/entrance.jpg',
      alt: 'Eigen ingang'
    },
    {
      src: '/properties/westeinde-11-d/exterior.jpg',
      alt: 'Buitenkant pand'
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


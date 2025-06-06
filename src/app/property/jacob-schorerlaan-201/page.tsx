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

export default function JacobSchorerlaanProperty() {
  const property = {
    id: 'jacob-schorerlaan-201',
    title: 'Jacob Schorerlaan 201',
    address: 'Jacob Schorerlaan 201',
    city: '2515 XS Den Haag',
    price: '€475.000',
    priceType: 'k.k.',
    bedrooms: 4,
    bathrooms: 1,
    area: 107,
    plotSize: 102,
    buildYear: 1995,
    energyLabel: 'A',
    status: 'Te koop',
    description: `Grote 3-laags eengezinswoning met zonnige achtertuin gelegen in de gewilde Groente- en Fruitmarkt buurt van Den Haag. Deze woning biedt veel ruimte en comfort voor een gezin.

Met een woonoppervlakte van 107m² biedt deze woning ruime leefruimtes, waaronder een lichte woonkamer met grote ramen die zorgen voor veel natuurlijk licht. De moderne keuken is volledig uitgerust met hoogwaardige apparatuur en biedt voldoende ruimte voor het bereiden van maaltijden.

De woning beschikt over vier comfortabele slaapkamers en een moderne badkamer. De ligging is ideaal voor wie houdt van stedelijk leven met alle voorzieningen binnen handbereik, waaronder winkels, restaurants, openbaar vervoer en recreatiemogelijkheden.

De energielabel A zorgt voor lage energiekosten en een duurzame leefomgeving. Dit is een uitstekende kans voor zowel starters als investeerders die op zoek zijn naar een kwalitatief hoogwaardige woning in een gewilde buurt van Den Haag.`,
    
    features: [
      {
        icon: <Home className="w-5 h-5" />,
        label: 'Woonoppervlakte',
        value: '107 m²'
      },
      {
        icon: <Square className="w-5 h-5" />,
        label: 'Perceeloppervlakte',
        value: '150 m²'
      },
      {
        icon: <Building className="w-5 h-5" />,
        label: 'Bouwjaar',
        value: '1995'
      },
      {
        icon: <Zap className="w-5 h-5" />,
        label: 'Energielabel',
        value: 'A'
      },
      {
        icon: <Car className="w-5 h-5" />,
        label: 'Parkeren',
        value: 'Openbare parkeerplaats'
      },
      {
        icon: <Thermometer className="w-5 h-5" />,
        label: 'Verwarming',
        value: 'CV-ketel (2020)'
      },
      {
        icon: <Wifi className="w-5 h-5" />,
        label: 'Internet',
        value: 'Glasvezel beschikbaar'
      },
      {
        icon: <Shield className="w-5 h-5" />,
        label: 'Beveiliging',
        value: 'Alarm installatie'
      },
      {
        icon: <TreePine className="w-5 h-5" />,
        label: 'Tuin',
        value: 'Achtertuin (Zuid)'
      },
      {
        icon: <Calendar className="w-5 h-5" />,
        label: 'Beschikbaar',
        value: 'Per direct'
      }
    ],
    
    images: [
      {
        src: '/images/properties/jacob-schorerlaan-201-living-room.jpg',
        alt: 'Jacob Schorerlaan 201 - Woonkamer'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-kitchen.jpg',
        alt: 'Jacob Schorerlaan 201 - Keuken'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-bedroom.jpg',
        alt: 'Jacob Schorerlaan 201 - Slaapkamer'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-bathroom.jpg',
        alt: 'Jacob Schorerlaan 201 - Badkamer'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-exterior.jpg',
        alt: 'Jacob Schorerlaan 201 - Buitenkant'
      },
      {
        src: '/images/properties/jacob-schorerlaan-201-garden.jpg',
        alt: 'Jacob Schorerlaan 201 - Tuin'
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


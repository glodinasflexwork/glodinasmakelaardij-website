import React from 'react';
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

// Mock data for property details
const properties = [
  {
    id: 'jacob-schorerlaan-201',
    title: 'Jacob Schorerlaan 201',
    location: 'Den Haag, Groente- en Fruitmarkt',
    price: '€465.000 k.k.',
    originalPrice: '€475.000',
    size: '107m²',
    bedrooms: 4,
    bathrooms: 1,
    area: 107,
    energyLabel: 'A',
    features: ['Tuin', 'Serre', 'Moderne Keuken', 'Parkeren'],
    mainImage: '/images/properties/living-room-1.jpg',
    images: [
      '/images/properties/living-room-1.jpg',
      '/images/properties/kitchen-1.jpg',
      '/images/properties/bedroom-1.jpg',
      '/images/properties/bathroom-1.jpg',
      '/images/properties/exterior-1.jpg',
    ],
    rating: 5,
    status: 'new' as const,
    description: 'Prachtig gerenoveerd appartement met moderne afwerking, ruime woonkamer en volledig uitgeruste keuken. Gelegen in een levendige buurt met alle voorzieningen binnen handbereik.',
    fullDescription: `
      Dit prachtige appartement aan de Jacob Schorerlaan 201 is recent volledig gerenoveerd en biedt een perfecte combinatie van comfort, stijl en locatie. Met een woonoppervlakte van 107m² verdeeld over 4 slaapkamers, een ruime woonkamer en een moderne keuken, is dit appartement ideaal voor gezinnen of professionals die op zoek zijn naar ruimte en comfort in het hart van Den Haag.

      De woning beschikt over hoogwaardige afwerkingen, waaronder een luxe keuken met inbouwapparatuur, een stijlvolle badkamer met regendouche, en een zonnige serre die uitkijkt op de goed onderhouden tuin. De grote ramen zorgen voor veel natuurlijk licht in het hele appartement.

      De locatie is uitstekend, op loopafstand van winkels, restaurants, scholen en openbaar vervoer. Het centrum van Den Haag is slechts 10 minuten fietsen, en het strand van Scheveningen is gemakkelijk bereikbaar met de tram.

      Kenmerken:
      - 4 slaapkamers
      - 1 moderne badkamer
      - Ruime woonkamer met veel lichtinval
      - Volledig uitgeruste keuken met inbouwapparatuur
      - Zonnige serre
      - Goed onderhouden tuin
      - Energielabel A
      - Parkeergelegenheid
      - Nabij alle voorzieningen
    `,
    yearBuilt: 1998,
    renovated: 2022,
    constructionType: 'Appartement',
    parkingType: 'Op straat',
    heatingType: 'Centrale verwarming',
    insulation: ['Dakisolatie', 'Muurisolatie', 'Vloerisolatie', 'Dubbel glas'],
    neighborhood: 'Groente- en Fruitmarkt',
    nearbyFacilities: ['Supermarkt', 'School', 'Park', 'Openbaar vervoer', 'Restaurants'],
    agent: {
      name: 'Martijn de Vries',
      phone: '+31 70 123 4567',
      email: 'martijn@glodinasmakelaardij.nl',
      photo: '/images/team/agent-1.jpg'
    },
    viewings: [
      { date: '2025-06-10', timeSlots: ['10:00', '14:00', '16:00'] },
      { date: '2025-06-12', timeSlots: ['11:00', '15:00', '17:00'] },
      { date: '2025-06-15', timeSlots: ['13:00', '15:00'] },
    ]
  },
  {
    id: 'groenewegje-76',
    title: 'Groenewegje 76',
    location: 'Den Haag, Centrum',
    price: '€695.000 k.k.',
    size: '120m²',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    energyLabel: 'B',
    features: ['Grachtzicht', 'Historisch', 'Centrale Ligging'],
    mainImage: '/images/properties/living-room-2.jpg',
    images: [
      '/images/properties/living-room-2.jpg',
      '/images/properties/bedroom-1.jpg',
      '/images/properties/kitchen-1.jpg',
      '/images/properties/bathroom-1.jpg',
      '/images/properties/exterior-2.jpg',
    ],
    rating: 5,
    status: 'under_offer' as const,
    description: 'Karakteristiek appartement in het historische centrum van Den Haag met uitzicht op de gracht. Hoge plafonds, originele details en moderne voorzieningen maken dit een unieke woonkans.',
    fullDescription: `
      Dit karakteristieke appartement aan het Groenewegje 76 biedt een unieke kans om te wonen in een historisch pand in het centrum van Den Haag. Met een woonoppervlakte van 120m² verdeeld over 3 slaapkamers en 2 badkamers, combineert deze woning historische charme met modern comfort.

      Het appartement beschikt over prachtige originele details zoals hoge plafonds met sierlijsten, authentieke houten vloeren en karakteristieke raampartijen. De ruime woonkamer biedt een adembenemend uitzicht op de gracht, terwijl de moderne keuken is uitgerust met hoogwaardige apparatuur.

      De locatie is ongeëvenaard, in het hart van het historische centrum van Den Haag. Alle voorzieningen zoals winkels, restaurants, musea en openbaar vervoer bevinden zich op loopafstand. Het Binnenhof en het Mauritshuis zijn slechts enkele minuten wandelen.

      Kenmerken:
      - 3 ruime slaapkamers
      - 2 moderne badkamers
      - Authentieke details behouden
      - Hoge plafonds met sierlijsten
      - Uitzicht op de gracht
      - Energielabel B
      - Centrale locatie
      - Nabij alle voorzieningen
    `,
    yearBuilt: 1885,
    renovated: 2020,
    constructionType: 'Herenhuis',
    parkingType: 'Vergunninghouders',
    heatingType: 'Centrale verwarming',
    insulation: ['Dakisolatie', 'Dubbel glas'],
    neighborhood: 'Centrum',
    nearbyFacilities: ['Winkels', 'Restaurants', 'Musea', 'Openbaar vervoer', 'Parken'],
    agent: {
      name: 'Sophie Jansen',
      phone: '+31 70 123 4568',
      email: 'sophie@glodinasmakelaardij.nl',
      photo: '/images/team/agent-2.jpg'
    },
    viewings: [
      { date: '2025-06-11', timeSlots: ['10:00', '14:00'] },
      { date: '2025-06-13', timeSlots: ['11:00', '15:00'] },
      { date: '2025-06-16', timeSlots: ['13:00', '17:00'] },
    ]
  },
  {
    id: 'westeinde-11-d',
    title: 'Westeinde 11-D',
    location: 'Den Haag, Centrum',
    price: '€525.000 k.k.',
    size: '95m²',
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    energyLabel: 'C',
    features: ['Stadscentrum', 'Gerenoveerd', 'Balkon'],
    mainImage: '/images/properties/living-room-3.jpg',
    images: [
      '/images/properties/living-room-3.jpg',
      '/images/properties/bedroom-2.jpg',
      '/images/properties/kitchen-1.jpg',
      '/images/properties/bathroom-1.jpg',
      '/images/properties/balcony-1.jpg',
    ],
    rating: 4,
    status: 'available' as const,
    description: 'Modern appartement in het bruisende centrum van Den Haag. Volledig gerenoveerd met hoogwaardige materialen en voorzien van een ruim balkon met uitzicht over de stad.',
    fullDescription: `
      Dit moderne appartement aan het Westeinde 11-D is gelegen in het bruisende centrum van Den Haag. Met een woonoppervlakte van 95m² verdeeld over 2 slaapkamers en een ruime woonkamer, biedt deze woning comfort en stijl in het hart van de stad.

      Het appartement is recent volledig gerenoveerd met hoogwaardige materialen en beschikt over een moderne keuken met inbouwapparatuur, een stijlvolle badkamer en een ruim balkon met uitzicht over de stad. De grote ramen zorgen voor veel natuurlijk licht in het hele appartement.

      De locatie is perfect voor stadsliefhebbers, met alle voorzieningen zoals winkels, restaurants, theaters en openbaar vervoer op loopafstand. Het Centraal Station van Den Haag is slechts 10 minuten lopen, en het strand van Scheveningen is gemakkelijk bereikbaar met de tram.

      Kenmerken:
      - 2 ruime slaapkamers
      - 1 moderne badkamer
      - Ruime woonkamer met veel lichtinval
      - Volledig uitgeruste keuken met inbouwapparatuur
      - Ruim balkon met uitzicht over de stad
      - Energielabel C
      - Centrale locatie
      - Nabij alle voorzieningen
    `,
    yearBuilt: 1975,
    renovated: 2023,
    constructionType: 'Appartement',
    parkingType: 'Vergunninghouders',
    heatingType: 'Centrale verwarming',
    insulation: ['Dakisolatie', 'Dubbel glas'],
    neighborhood: 'Centrum',
    nearbyFacilities: ['Winkels', 'Restaurants', 'Theaters', 'Openbaar vervoer', 'Parken'],
    agent: {
      name: 'Thomas Bakker',
      phone: '+31 70 123 4569',
      email: 'thomas@glodinasmakelaardij.nl',
      photo: '/images/team/agent-3.jpg'
    },
    viewings: [
      { date: '2025-06-09', timeSlots: ['10:00', '14:00', '16:00'] },
      { date: '2025-06-11', timeSlots: ['11:00', '15:00'] },
      { date: '2025-06-14', timeSlots: ['13:00', '15:00', '17:00'] },
    ]
  },
];

type Props = {
  params: { id: string }
}

export default function PropertyDetailPage({ params }: Props) {
  // Find the property by ID
  const property = properties.find(p => p.id === params.id);
  
  // If property not found, show error
  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Woning niet gevonden</h1>
            <p className="mb-8">De woning die u zoekt bestaat niet of is niet meer beschikbaar.</p>
            <Link href="/properties">
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
                  <Link href="/properties" className="text-gray-600 hover:text-orange-500">
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-2">
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
        
        {/* Property Images Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src={property.images[0]} 
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-[190px] rounded-lg overflow-hidden">
                <Image 
                  src={image} 
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
          <Button variant="cta" size="lg" className="flex-grow md:flex-grow-0">
            <Calendar className="mr-2 h-5 w-5" />
            Plan een bezichtiging
          </Button>
          <Button variant="ctaOutline" size="lg" className="flex-grow md:flex-grow-0">
            <Mail className="mr-2 h-5 w-5" />
            Contact opnemen
          </Button>
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
              <h2 className="text-xl font-bold mb-4">Kenmerken</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <BedDouble className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Slaapkamers</div>
                    <div className="font-semibold">{property.bedrooms}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Badkamers</div>
                    <div className="font-semibold">{property.bathrooms}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Woonoppervlak</div>
                    <div className="font-semibold">{property.size}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Energielabel</div>
                    <div className="font-semibold">{property.energyLabel}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Bouwjaar</div>
                    <div className="font-semibold">{property.yearBuilt}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <div className="font-semibold">{property.constructionType}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Omschrijving</h2>
              <div className="prose max-w-none">
                {property.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Kenmerken en voorzieningen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Algemeen</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>Bouwjaar: {property.yearBuilt}</span>
                    </li>
                    {property.renovated && (
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Gerenoveerd: {property.renovated}</span>
                      </li>
                    )}
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>Type: {property.constructionType}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>Energielabel: {property.energyLabel}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Isolatie</h3>
                  <ul className="space-y-2">
                    {property.insulation.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Verwarming</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>{property.heatingType}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Parkeren</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>{property.parkingType}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Buurt</h2>
              <p className="mb-4">Deze woning is gelegen in de buurt {property.neighborhood} in Den Haag.</p>
              
              <h3 className="font-semibold mb-2">Voorzieningen in de buurt</h3>
              <ul className="grid grid-cols-2 gap-2">
                {property.nearbyFacilities.map((facility, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div>
            {/* Agent Contact Card */}
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Makelaar</h2>
              <div className="flex items-center mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={property.agent.photo} 
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">{property.agent.name}</div>
                  <div className="text-sm text-gray-600">Makelaar</div>
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="cta" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  {property.agent.phone}
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  E-mail
                </Button>
              </div>
            </div>
            
            {/* Schedule Viewing Card */}
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Plan een bezichtiging</h2>
              <div className="space-y-4">
                {property.viewings.map((viewing, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="font-semibold mb-2">{viewing.date}</div>
                    <div className="grid grid-cols-3 gap-2">
                      {viewing.timeSlots.map((time, timeIndex) => (
                        <Button key={timeIndex} variant="outline" size="sm" className="text-sm">
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                <Button variant="cta" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Plan bezichtiging
                </Button>
              </div>
            </div>
            
            {/* Features Card */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">Kenmerken</h2>
              <ul className="space-y-2">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Tag className="h-4 w-4 text-orange-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}


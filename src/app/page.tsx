import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyGallery from '@/components/PropertyGallery';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Home, Search, Handshake, Building, Calculator, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const galleryProperties = [
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
      ],
      rating: 5,
      status: 'new' as const,
      description: 'Prachtig gerenoveerd appartement met moderne afwerking, ruime woonkamer en volledig uitgeruste keuken. Gelegen in een levendige buurt met alle voorzieningen binnen handbereik.',
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
      ],
      rating: 5,
      status: 'under_offer' as const,
      description: 'Karakteristiek appartement in het historische centrum van Den Haag met uitzicht op de gracht. Hoge plafonds, originele details en moderne voorzieningen maken dit een unieke woonkans.',
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
      ],
      rating: 4,
      status: 'available' as const,
      description: 'Modern appartement in het bruisende centrum van Den Haag. Volledig gerenoveerd met hoogwaardige materialen en voorzien van een ruim balkon met uitzicht over de stad.',
    },
    {
      id: 'rijslag-27',
      title: 'Rijslag 27',
      location: 'Den Haag, Benoordenhout',
      price: '€1.250.000 k.k.',
      size: '180m²',
      bedrooms: 5,
      bathrooms: 3,
      area: 180,
      energyLabel: 'A',
      features: ['Zwembad', 'Grote Tuin', 'Moderne Villa'],
      mainImage: '/images/properties/living-room-1.jpg',
      images: [
        '/images/properties/living-room-1.jpg',
        '/images/properties/bedroom-2.jpg',
        '/images/properties/kitchen-1.jpg',
      ],
      rating: 5,
      status: 'under_offer' as const,
      description: 'Luxe villa in de prestigieuze wijk Benoordenhout. Deze ruime woning biedt alle comfort met een privé zwembad, grote tuin en hoogwaardige afwerking in alle ruimtes.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - New premium image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-building.jpeg')"
          }}
        />
        
        {/* Enhanced Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-0">
          <div className="max-w-4xl mx-auto">
            {/* Orange accent bar above heading */}
            <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto md:mx-0"></div>
            
            <p className="text-base md:text-lg lg:text-xl font-medium mb-3 md:mb-4 text-orange-400 tracking-wide text-center md:text-left">
              PROFESSIONELE MAKELAARSDIENSTEN
            </p>
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 md:mb-8 text-center md:text-left text-white">
              Uw woning verkopen<br />
              in <span className="text-orange-400">Den Haag</span>?
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              Wij zorgen voor een snelle en succesvolle verkoop tegen de beste prijs
            </p>
            
            {/* CTA Buttons - Stacked on Mobile, Side by Side on Desktop */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 md:mb-12">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Neem Contact Op
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/schedule" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold backdrop-blur-sm flex items-center justify-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan Afspraak
                </Button>
              </Link>
            </div>
            
            {/* Stats Row - 2x2 Grid on Mobile, 4x1 on Desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto md:mx-0">
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">150+</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Verkochte Woningen</div>
              </div>
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">98%</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Klanttevredenheid</div>
              </div>
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">€50M+</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Verkoopvolume</div>
              </div>
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">15+</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Jaar Ervaring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <section id="properties">
        <PropertyGallery properties={galleryProperties} language="nl" />
      </section>

      {/* Services Section - Enhanced for Mobile */}
      <section id="about" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto"></div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-16">
              Onze Diensten
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Woning Kopen</h3>
                <p className="text-gray-600">Vind uw droomhuis met deskundige begeleiding tijdens het gehele aankoopproces.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Woning Verkopen</h3>
                <p className="text-gray-600">Maximaliseer de waarde van uw woning met onze bewezen marketingstrategieën.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Woningtaxatie</h3>
                <p className="text-gray-600">Krijg nauwkeurige marktwaarderingen van gecertificeerde makelaars.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Marktanalyse</h3>
                <p className="text-gray-600">Uitgebreide marktanalyses om de beste beslissingen te nemen.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Onderhandeling</h3>
                <p className="text-gray-600">Professionele onderhandelingsexpertise voor de beste resultaten.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Service</h3>
                <p className="text-gray-600">Persoonlijke begeleiding en premium service voor elke klant.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-12">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 md:px-8 py-3 md:py-4 flex items-center justify-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Neem Contact Op
                </Button>
              </Link>
              <Link href="/schedule" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-orange-600 text-orange-600 hover:bg-orange-50 px-6 md:px-8 py-3 md:py-4 flex items-center justify-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan Afspraak
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


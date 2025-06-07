import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyGallery from '@/components/PropertyGallery';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Home, Search, Handshake, Building, Calculator, Mail } from 'lucide-react';
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
      mainImage: '/images/properties/jacob-schorerlaan-201-living-room.jpg',
      images: [
        '/images/properties/jacob-schorerlaan-201-living-room.jpg',
        '/images/properties/jacob-schorerlaan-201-kitchen.jpg',
        '/images/properties/jacob-schorerlaan-201-bathroom.jpg',
        '/images/properties/jacob-schorerlaan-201-exterior.jpg',
        '/images/properties/jacob-schorerlaan-201-roof.jpg',
      ],
      rating: 5,
      status: 'new' as const,
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
      mainImage: '/images/gallery/groenewegje-76.jpg',
      images: [
        '/images/gallery/groenewegje-76.jpg',
      ],
      rating: 5,
      status: 'under_offer' as const,
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
      mainImage: '/images/gallery/westeinde-11.jpg',
      images: [
        '/images/gallery/westeinde-11.jpg',
      ],
      rating: 4,
      status: 'available' as const,
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
      mainImage: '/images/gallery/rijslag-27.jpg',
      images: [
        '/images/gallery/rijslag-27.jpg',
      ],
      rating: 5,
      status: 'under_offer' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Clean Orange & White */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        
        {/* Clean Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl font-medium mb-4 text-orange-400 tracking-wide">
              PROFESSIONELE MAKELAARSDIENSTEN
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Uw woning verkopen<br />
              in <span className="text-orange-400">Den Haag</span>?
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Wij zorgen voor een snelle en succesvolle verkoop tegen de beste prijs
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Mail className="mr-2 h-5 w-5" />
                  Neem Contact Op
                </Button>
              </Link>
              <Link href="/schedule">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan Afspraak
                </Button>
              </Link>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400">150+</div>
                <div className="text-sm md:text-base text-white/90">Verkochte Woningen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400">98%</div>
                <div className="text-sm md:text-base text-white/90">Klanttevredenheid</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400">€50M+</div>
                <div className="text-sm md:text-base text-white/90">Verkoopvolume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400">15+</div>
                <div className="text-sm md:text-base text-white/90">Jaar Ervaring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <PropertyGallery properties={galleryProperties} language="nl" />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-16">
              Onze Diensten
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Woning Kopen</h3>
                <p className="text-gray-600">Vind uw droomhuis met deskundige begeleiding tijdens het gehele aankoopproces.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Woning Verkopen</h3>
                <p className="text-gray-600">Maximaliseer de waarde van uw woning met onze bewezen marketingstrategieën.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Woningtaxatie</h3>
                <p className="text-gray-600">Krijg nauwkeurige marktwaarderingen van gecertificeerde makelaars.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Marktanalyse</h3>
                <p className="text-gray-600">Uitgebreide marktanalyses om de beste beslissingen te nemen.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Onderhandeling</h3>
                <p className="text-gray-600">Professionele onderhandelingsexpertise voor de beste resultaten.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Service</h3>
                <p className="text-gray-600">Persoonlijke begeleiding en premium service voor elke klant.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href="/contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                  <Mail className="mr-2 h-5 w-5" />
                  Neem Contact Op
                </Button>
              </Link>
              <Link href="/schedule">
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4">
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


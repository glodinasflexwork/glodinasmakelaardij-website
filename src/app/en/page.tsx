import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyGallery from '@/components/PropertyGallery';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Home, Search, Handshake, Building, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function EnglishHomePage() {
  const galleryProperties = [
    {
      id: 'jacob-schorerlaan-201',
      title: 'Jacob Schorerlaan 201',
      location: 'Den Haag, Groente- en Fruitmarkt',
      price: '€465,000 k.k.',
      originalPrice: '€475,000',
      size: '107m²',
      bedrooms: 4,
      energyLabel: 'A',
      features: ['Garden', 'Conservatory', 'Modern Kitchen', 'Parking'],
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
      location: 'Den Haag, City Center',
      price: '€695,000 k.k.',
      size: '120m²',
      bedrooms: 3,
      energyLabel: 'B',
      features: ['Canal View', 'Historic', 'Central Location'],
      mainImage: '/images/gallery/groenewegje-76.jpg',
      images: [
        '/images/gallery/groenewegje-76.jpg',
      ],
      rating: 5,
      status: 'under_offer' as const,
    },
    {
      id: 'westeinde-11',
      title: 'Westeinde 11-D',
      location: 'Den Haag, City Center',
      price: '€525,000 k.k.',
      size: '95m²',
      bedrooms: 2,
      energyLabel: 'C',
      features: ['City Center', 'Renovated', 'Balcony'],
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
      price: '€1,250,000 k.k.',
      size: '180m²',
      bedrooms: 5,
      energyLabel: 'A',
      features: ['Swimming Pool', 'Large Garden', 'Modern Villa'],
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
      
      {/* Hero Section - Rentastone Style */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl font-medium mb-4 text-orange-300 tracking-wide uppercase">
              YOUR PROPERTY SOLD FAST!
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Want to sell your<br />
              property in <span className="text-orange-400">Den Haag</span>?
            </h1>
            
            {/* CTA Button - Rentastone Style */}
            <div className="mb-12">
              <Link href="/en/contact">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-none uppercase tracking-wide shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  CLICK HERE FOR MORE INFORMATION
                </Button>
              </Link>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400">150+</div>
                <div className="text-sm md:text-base text-white/90">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400">98%</div>
                <div className="text-sm md:text-base text-white/90">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400">€50M+</div>
                <div className="text-sm md:text-base text-white/90">Sales Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400">15+</div>
                <div className="text-sm md:text-base text-white/90">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-gray-600">
                Discover our selection of premium properties in Den Haag
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Jacob Schorerlaan 201 - Featured Property */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img 
                    src="/images/properties/jacob-schorerlaan-201-living-room.jpg" 
                    alt="Jacob Schorerlaan 201 - Living Room"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Available
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Energy Label A
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Jacob Schorerlaan 201</h3>
                  <p className="text-gray-600 mb-4">Groente- en Fruitmarkt • 4 rooms • 107m²</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">€465,000</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Built:</span>
                      <span>1995</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plot:</span>
                      <span>102m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Garden:</span>
                      <span>Sunny backyard</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    View Details
                  </Button>
                </div>
              </div>

              {/* Property 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Exclusive
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Luxury Apartment</h3>
                  <p className="text-gray-600 mb-4">Scheveningen • 3 rooms • 95m²</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">€525,000</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    View Details
                  </Button>
                </div>
              </div>

              {/* Property 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Villa</h3>
                  <p className="text-gray-600 mb-4">Wassenaar • 6 rooms • 180m²</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">€895,000</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <PropertyGallery properties={galleryProperties} />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-16">
              Our Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Buying</h3>
                <p className="text-gray-600">Find your dream home with expert guidance through the entire buying process.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Selling</h3>
                <p className="text-gray-600">Maximize your property value with our proven marketing strategies.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Valuation</h3>
                <p className="text-gray-600">Get accurate market valuations from certified real estate professionals.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Market Analysis</h3>
                <p className="text-gray-600">Comprehensive market analysis to make the best decisions.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Negotiation</h3>
                <p className="text-gray-600">Professional negotiation expertise for the best results.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Service</h3>
                <p className="text-gray-600">Personal guidance and premium service for every client.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href="/en/contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </Link>
              <Link href="/en/schedule">
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Meeting
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


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Calendar, Star, Home, Search, Handshake, Building, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function EnglishHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Simplified and more elegant */}
      <section id="home" className="relative bg-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Trusted <span className="text-green-600">Real Estate Partner</span> in Den Haag
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Expert guidance for buying, selling, and investing in premium properties throughout Den Haag and surrounding areas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/en/contact">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                      <Calendar className="mr-2 h-5 w-5" />
                      Get Free Consultation
                    </Button>
                  </Link>
                  <a href="tel:+31681348551">
                    <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-green-50 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">150+</div>
                      <div className="text-gray-600">Properties Sold</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">98%</div>
                      <div className="text-gray-600">Client Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">€50M+</div>
                      <div className="text-gray-600">Sales Volume</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">15+</div>
                      <div className="text-gray-600">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
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


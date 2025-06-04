import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Calendar, Star, Home, Search, Handshake, Building, Calculator } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Simplified and more elegant */}
      <section id="home" className="relative bg-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Logo and branding */}
              <div className="text-center lg:text-left">
                <div className="mb-8">
                  <Image
                    src="/logo.png"
                    alt="Glodinas Makelaardij"
                    width={400}
                    height={200}
                    className="mx-auto lg:mx-0"
                    priority
                  />
                </div>
                <h1 className="text-2xl lg:text-3xl font-light text-gray-700 mb-6">
                  Premium Real Estate Services in Den Haag
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Professional guidance for buying, selling, and investing in Den Haag&apos;s finest properties.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button variant="green" size="lg" className="bg-green-600 hover:bg-green-700">
                    <Phone className="h-5 w-5 mr-2" />
                    (6) 81 34 85 51
                  </Button>
                  <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Consultation
                  </Button>
                </div>
              </div>
              
              {/* Right side - Clean stats */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Why Choose Glodinas Makelaardij</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
                    <div className="text-sm text-gray-600">Properties Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">€50M+</div>
                    <div className="text-sm text-gray-600">Sales Volume</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section - Simplified */}
      <section id="properties" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Current Properties
              </h2>
              <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked selection of premium homes in Den Haag&apos;s most desirable neighborhoods.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Property 1 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <Home className="h-16 w-16 text-green-600" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Energy A</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Jacob Schorerlaan 201</h3>
                  <p className="text-gray-600 text-sm mb-4">Den Haag, Groente- en Fruitmarkt</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-green-600">€465,000</div>
                    <div className="text-right text-sm text-gray-600">
                      <div>107 m² • 4 bedrooms</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Garden</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Modern Kitchen</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Parking</span>
                  </div>
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    View Details
                  </Button>
                </div>
              </div>

              {/* Property 2 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <Building className="h-16 w-16 text-green-600" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">Energy C</span>
                    <div className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Harderwijkstraat 181</h3>
                  <p className="text-gray-600 text-sm mb-4">Den Haag, Laakkwartier</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-green-600">€275,000</div>
                    <div className="text-right text-sm text-gray-600">
                      <div>71 m² • 2 bedrooms</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Balcony</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Renovated 2019</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Central</span>
                  </div>
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    View Details
                  </Button>
                </div>
              </div>

              {/* Property 3 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <Home className="h-16 w-16 text-green-600" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">Energy D</span>
                    <div className="flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Loosdrechtsestraat 36</h3>
                  <p className="text-gray-600 text-sm mb-4">Den Haag, Bezuidenhout</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-green-600">€250,000</div>
                    <div className="text-right text-sm text-gray-600">
                      <div>65 m² • 3 bedrooms</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Historic</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">High Ceilings</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Investment</span>
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

      {/* About Section - Simplified */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Meet Cihat Kaya
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Your trusted real estate expert at Glodinas Makelaardij, dedicated to helping you find the perfect property or achieve the best value for your investment in Den Haag and surrounding areas.
            </p>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Founder of Glodinas Makelaardij, specializing in premium properties throughout Den Haag with a focus on exceptional client service and market expertise.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Property Valuation</h3>
                <p className="text-sm text-gray-600">Accurate market analysis and valuations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Buyer Support</h3>
                <p className="text-sm text-gray-600">Complete guidance from search to closing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Negotiation</h3>
                <p className="text-sm text-gray-600">Securing the best terms for you</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="green" size="lg" className="bg-green-600 hover:bg-green-700">
                <Phone className="h-5 w-5 mr-2" />
                Call (6) 81 34 85 51
              </Button>
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                <Mail className="h-5 w-5 mr-2" />
                cihatkaya@glodinas.nl
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


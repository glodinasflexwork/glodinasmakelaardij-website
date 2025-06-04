import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Calendar, Star, Home, TrendingUp, Users, Search, BarChart3, Handshake, Building, Calculator } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium Properties in 
              <span className="text-green-600"> Den Haag</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover exceptional homes in the heart of Den Haag with personalized service and expert guidance from your trusted real estate professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="green" size="lg">
                <Home className="h-5 w-5 mr-2" />
                Explore Properties
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">€50M+</div>
              <div className="text-gray-600">Total Sales Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Professional Real Estate Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive support for all your real estate needs in Den Haag and surrounding areas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Property Valuation */}
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Valuation</h3>
                <p className="text-gray-600 mb-6">
                  Accurate market analysis and property valuations based on current market trends and comparable sales.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>

              {/* Buyer Representation */}
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Buyer Representation</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive support for buyers, from property search to negotiation and closing.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>

              {/* Seller Services */}
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Seller Services</h3>
                <p className="text-gray-600 mb-6">
                  Strategic marketing and pricing to maximize your property value and minimize time on market.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>

              {/* Investment Consulting */}
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Consulting</h3>
                <p className="text-gray-600 mb-6">
                  Expert guidance on real estate investments and portfolio development strategies.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>

              {/* Market Analysis */}
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Analysis</h3>
                <p className="text-gray-600 mb-6">
                  In-depth market research and trend analysis to inform your real estate decisions.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>

              {/* Negotiation Expertise */}
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Handshake className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Negotiation Expertise</h3>
                <p className="text-gray-600 mb-6">
                  Skilled negotiation to secure the best possible terms for both buyers and sellers.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="properties" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Featured Properties
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked selection of premium homes in Den Haag&apos;s most desirable neighborhoods.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Property 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Home className="h-16 w-16 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Energy A</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Jacob Schorerlaan 201</h3>
                  <p className="text-gray-600 text-sm mb-4">Den Haag, Groente- en Fruitmarkt</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900">€465,000</div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">107 m²</div>
                      <div className="text-sm text-gray-600">4 bedrooms</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Garden</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Conservatory</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Modern Kitchen</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Parking</span>
                  </div>
                  <Button variant="green" className="w-full">View Details</Button>
                </div>
              </div>

              {/* Property 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Building className="h-16 w-16 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Energy C</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Harderwijkstraat 181</h3>
                  <p className="text-gray-600 text-sm mb-4">Den Haag, Laakkwartier</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900">€275,000</div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">71 m²</div>
                      <div className="text-sm text-gray-600">2 bedrooms</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Balcony</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Renovated 2019</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Central Location</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Public Transport</span>
                  </div>
                  <Button variant="green" className="w-full">View Details</Button>
                </div>
              </div>

              {/* Property 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Home className="h-16 w-16 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Energy D</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-gray-300" />
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Loosdrechtsestraat 36</h3>
                  <p className="text-gray-600 text-sm mb-4">Den Haag, Bezuidenhout</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900">€250,000</div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">65 m²</div>
                      <div className="text-sm text-gray-600">3 bedrooms</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Historic Building</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">High Ceilings</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">City Center</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Investment Opportunity</span>
                  </div>
                  <Button variant="green" className="w-full">View Details</Button>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <Search className="h-5 w-5 mr-2" />
                View All Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Meet Cihat Kaya
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Your trusted real estate expert at Glodinas Makelaardij, dedicated to helping you find the perfect property or achieve the best value for your investment in Den Haag and surrounding areas.
                </p>
                <p className="text-gray-600 mb-8">
                  Founder of Glodinas Makelaardij, specializing in premium properties throughout Den Haag with a focus on exceptional client service and market expertise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="green">
                    <Phone className="h-4 w-4 mr-2" />
                    Call (6) 81 34 85 51
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Consultation
                  </Button>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Professional Experience</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Market Expertise</h4>
                    <p className="text-gray-600 text-sm">
                      With over 5 years of experience in the Den Haag real estate market, I have developed deep insights into local neighborhoods, pricing trends, and investment opportunities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Residential Properties in Den Haag</li>
                      <li>• Investment Property Analysis</li>
                      <li>• First-Time Buyer Assistance</li>
                      <li>• Property Valuation & Market Analysis</li>
                      <li>• International Client Services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Contact me today for personalized service and expert guidance in Den Haag&apos;s real estate market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Phone className="h-5 w-5 mr-2" />
              Call Direct
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
              <Mail className="h-5 w-5 mr-2" />
              Email Me
            </Button>
            <Button variant="secondary" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


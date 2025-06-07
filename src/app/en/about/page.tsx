import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Home, 
  Users, 
  Award, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function AboutPageEN() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Glodinas Real Estate
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your trusted partner in real estate since 2015. We help you find your dream home or sell your current property at the best price.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/en/contact">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  Get In Touch
                </Button>
              </Link>
              <Link href="/en/schedule">
                <Button variant="outline" size="lg" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4">
                  <Clock className="w-5 h-5 mr-2" />
                  Schedule Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Who We Are
                </h2>
                <p className="text-gray-600 mb-4">
                  Glodinas Real Estate is a professional real estate agency based in The Hague. With years of experience in the property market, we help individuals and businesses buy, sell, and rent residential and commercial properties.
                </p>
                <p className="text-gray-600 mb-4">
                  Our team consists of experienced real estate agents who know the local market inside and out. We offer personal service and are always ready to advise you on important real estate decisions.
                </p>
                <p className="text-gray-600">
                  At Glodinas Real Estate, quality and customer satisfaction come first. We ensure a transparent process and keep you informed of progress at all times.
                </p>
              </div>
              <div className="bg-orange-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Numbers</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Home className="w-6 h-6 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">150+</div>
                      <div className="text-gray-600">Properties Sold</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-6 h-6 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">98%</div>
                      <div className="text-gray-600">Customer Satisfaction</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-6 h-6 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">€50M+</div>
                      <div className="text-gray-600">Total Transaction Value</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">15+</div>
                      <div className="text-gray-600">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Our Services
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <Home className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Selling Properties</h3>
                  <p className="text-gray-600">
                    Professional guidance when selling your property. From valuation to transfer.
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Buying Properties</h3>
                  <p className="text-gray-600">
                    Help finding and buying your dream home in The Hague and surrounding areas.
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Rental & Management</h3>
                  <p className="text-gray-600">
                    Complete rental service and professional property management for investors.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Why Choose Us?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Local Expertise</h4>
                      <p className="text-gray-600">Extensive knowledge of The Hague real estate market</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Personal Service</h4>
                      <p className="text-gray-600">Customized and personal attention for every client</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Transparent Communication</h4>
                      <p className="text-gray-600">Clear communication and regular updates</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Fast Service</h4>
                      <p className="text-gray-600">Efficient handling and short turnaround times</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Extensive Network</h4>
                      <p className="text-gray-600">Strong connections with other professionals in the sector</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Results-Oriented</h4>
                      <p className="text-gray-600">Focus on achieving the best results for you</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Get In Touch
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                  <p className="text-gray-600">
                    Lange Voorhout 123<br />
                    2514 EA The Hague
                  </p>
                </div>
                <div>
                  <Phone className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                  <p className="text-gray-600">
                    <a href="tel:+31701234567" className="hover:text-orange-600">
                      070 123 4567
                    </a>
                  </p>
                </div>
                <div>
                  <Mail className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                  <p className="text-gray-600">
                    <a href="mailto:info@glodinasmakelaardij.nl" className="hover:text-orange-600">
                      info@glodinasmakelaardij.nl
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


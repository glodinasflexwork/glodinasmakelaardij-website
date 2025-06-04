import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScheduleForm from '@/components/forms/ScheduleForm';
import { Calendar, Clock, MapPin, Video, Phone, Users, CheckCircle } from 'lucide-react';

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Schedule a Consultation
              </h1>
              <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Book a personalized consultation with Cihat Kaya, your trusted real estate expert. 
                Choose a convenient time and let us help you with your property needs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Information Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Meeting Information</h2>
                  
                  {/* Meeting Types */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Available Services</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">Property Valuation</p>
                            <p className="text-sm text-gray-600">Get an accurate market assessment</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">Buying Consultation</p>
                            <p className="text-sm text-gray-600">Find your perfect property</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">Selling Strategy</p>
                            <p className="text-sm text-gray-600">Maximize your property value</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">Investment Advice</p>
                            <p className="text-sm text-gray-600">Smart property investments</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Meeting Options</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <span className="text-gray-600">In-person at our office</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Video className="h-5 w-5 text-green-600" />
                          <span className="text-gray-600">Video consultation</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-green-600" />
                          <span className="text-gray-600">Phone consultation</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <span className="text-gray-600">At property location</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Business Hours</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>By appointment</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-3">What to Expect</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Personalized consultation</li>
                        <li>• Market analysis and insights</li>
                        <li>• Professional recommendations</li>
                        <li>• No obligation discussion</li>
                        <li>• Follow-up action plan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scheduling Form */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Book Your Appointment</h2>
                  <ScheduleForm />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Easy Scheduling</h3>
                <p className="text-gray-600 text-sm">
                  Choose from available time slots that work with your schedule. 
                  We offer flexible timing including evenings and weekends.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600 text-sm">
                  Meet with Cihat Kaya, an experienced real estate professional 
                  who knows the Den Haag market inside and out.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Prompt Service</h3>
                <p className="text-gray-600 text-sm">
                  We respect your time. Meetings start promptly and we come 
                  prepared with relevant market data and insights.
                </p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-16 bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-green-900 mb-2">Need Immediate Assistance?</h3>
              <p className="text-green-700 mb-4">
                For urgent matters or if you need to schedule outside business hours, 
                please call us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+31681348551"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call (6) 81 34 85 51
                </a>
                <a 
                  href="mailto:cihatkaya@glodinas.nl"
                  className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Email for Custom Times
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


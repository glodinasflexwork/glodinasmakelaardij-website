import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EnglishSchedulePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Schedule a Meeting
              </h1>
              <p className="text-xl text-gray-600">
                Book a free consultation with our real estate expert
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Scheduling Form */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Preferred Time</h2>
                  <ContactForm />
                </div>
              </div>
              
              {/* Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">What to Expect?</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Consultation</h3>
                        <p className="text-gray-600">A comprehensive 30-45 minute discussion about your real estate needs and goals.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Times</h3>
                        <p className="text-gray-600">We offer appointments on weekdays, evenings, and weekends to fit your schedule.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Approach</h3>
                        <p className="text-gray-600">Each consultation is tailored to your specific situation and real estate wishes.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Have Questions?</h3>
                  <p className="text-gray-600 mb-4">
                    Feel free to contact us if you have any questions about scheduling your appointment.
                  </p>
                  <div className="space-y-3">
                    <a href="tel:+31681348551" className="flex items-center justify-center w-full">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Phone className="mr-2 h-4 w-4" />
                        (6) 81 34 85 51
                      </Button>
                    </a>
                    <a href="mailto:cihatkaya@glodinas.nl" className="flex items-center justify-center w-full">
                      <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                        <Mail className="mr-2 h-4 w-4" />
                        cihatkaya@glodinas.nl
                      </Button>
                    </a>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Choose Us?</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• 15+ years experience in Den Haag</li>
                    <li>• 150+ successfully sold properties</li>
                    <li>• 98% client satisfaction</li>
                    <li>• Certified NVM real estate agent</li>
                    <li>• Personal guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}


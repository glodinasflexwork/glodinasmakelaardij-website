import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EnglishContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-600">
                Ready to achieve your real estate goals? Let's talk.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                        <a href="tel:+31681348551" className="text-green-600 hover:text-green-700 font-medium">
                          (6) 81 34 85 51
                        </a>
                        <p className="text-gray-600 text-sm mt-1">Monday - Friday, 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                        <a href="mailto:cihatkaya@glodinas.nl" className="text-green-600 hover:text-green-700 font-medium">
                          cihatkaya@glodinas.nl
                        </a>
                        <p className="text-gray-600 text-sm mt-1">We respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                        <p className="text-gray-600">Den Haag, Netherlands</p>
                        <p className="text-gray-600 text-sm mt-1">Serving all of Den Haag and surrounding areas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                        <div className="text-gray-600 text-sm space-y-1">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p>Saturday: 10:00 AM - 4:00 PM</p>
                          <p>Sunday: By appointment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a href="tel:+31681348551" className="flex items-center justify-center w-full">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                    </a>
                    <a href="mailto:cihatkaya@glodinas.nl" className="flex items-center justify-center w-full">
                      <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
                  <ContactForm />
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


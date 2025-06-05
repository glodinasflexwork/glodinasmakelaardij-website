import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, Clock, Calendar, MessageCircle } from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                {t('title')}
              </h1>
              <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('getInTouch')}</h2>
                  
                  {/* Contact Details */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t('phone.title')}</h3>
                        <a href="tel:+31681348551" className="text-green-600 hover:text-green-700 font-medium">
                          (6) 81 34 85 51
                        </a>
                        <p className="text-sm text-gray-600 mt-1">{t('phone.hours')}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t('email.title')}</h3>
                        <a href="mailto:cihatkaya@glodinas.nl" className="text-green-600 hover:text-green-700 font-medium">
                          cihatkaya@glodinas.nl
                        </a>
                        <p className="text-sm text-gray-600 mt-1">{t('email.response')}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t('location.title')}</h3>
                        <p className="text-gray-600">{t('location.address')}</p>
                        <p className="text-sm text-gray-600 mt-1">{t('location.area')}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t('hours.title')}</h3>
                        <div className="text-gray-600 text-sm space-y-1">
                          <p>{t('hours.weekdays')}</p>
                          <p>{t('hours.saturday')}</p>
                          <p>{t('hours.sunday')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">{t('quickActions')}</h3>
                    <div className="space-y-3">
                      <Link 
                        href="/schedule"
                        className="inline-flex items-center justify-center w-full px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {t('scheduleMeeting')}
                      </Link>
                      
                      <a 
                        href="tel:+31681348551"
                        className="inline-flex items-center justify-center w-full px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {t('callNow')}
                      </a>

                      <a 
                        href="mailto:cihatkaya@glodinas.nl"
                        className="inline-flex items-center justify-center w-full px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {t('sendEmail')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('sendMessage')}</h2>
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Immediate Response</h3>
                <p className="text-gray-600 text-sm">
                  For urgent matters, call us directly. We&apos;re available during business hours 
                  and can arrange emergency consultations.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600 text-sm">
                  Book a consultation at your convenience. We offer evening and weekend 
                  appointments to fit your schedule.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600 text-sm">
                  Get professional advice from Cihat Kaya, your trusted real estate expert 
                  with years of experience in Den Haag market.
                </p>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Service Area</h2>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Den Haag & Surrounding Areas</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We proudly serve Den Haag and the surrounding municipalities, providing expert 
                  real estate services throughout the region. Our local knowledge and market expertise 
                  ensure you get the best possible service for your property needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


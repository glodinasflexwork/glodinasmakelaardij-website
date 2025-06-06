import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScheduleForm from '@/components/forms/ScheduleForm';
import { Phone, Mail, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Plan een Afspraak
              </h1>
              <p className="text-xl text-gray-600">
                Boek een gratis consult met onze vastgoedexpert
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Scheduling Form */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kies Uw Voorkeurstijd</h2>
                  <ScheduleForm />
                </div>
              </div>
              
              {/* Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Wat Kunt U Verwachten?</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gratis Consult</h3>
                        <p className="text-gray-600">Een uitgebreid gesprek van 30-45 minuten over uw vastgoedbehoeften en doelen.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexibele Tijden</h3>
                        <p className="text-gray-600">We bieden afspraken aan op werkdagen, avonden en weekenden om bij uw schema te passen.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Persoonlijke Aanpak</h3>
                        <p className="text-gray-600">Elk consult wordt aangepast aan uw specifieke situatie en vastgoedwensen.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Heeft U Vragen?</h3>
                  <p className="text-gray-600 mb-4">
                    Neem gerust contact met ons op als u vragen heeft over het plannen van uw afspraak.
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Waarom Kiezen Voor Ons?</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• 15+ jaar ervaring in Den Haag</li>
                    <li>• 150+ succesvol verkochte woningen</li>
                    <li>• 98% klanttevredenheid</li>
                    <li>• Gecertificeerd NVM makelaar</li>
                    <li>• Persoonlijke begeleiding</li>
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


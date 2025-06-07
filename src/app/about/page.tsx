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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Over Glodinas Makelaardij
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Uw betrouwbare partner in vastgoed sinds 2015. Wij helpen u bij het vinden van uw droomhuis of het verkopen van uw huidige woning tegen de beste prijs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Opnemen
                </Button>
              </Link>
              <Link href="/schedule">
                <Button variant="outline" size="lg" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4">
                  <Clock className="w-5 h-5 mr-2" />
                  Afspraak Plannen
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
                  Wie zijn wij?
                </h2>
                <p className="text-gray-600 mb-4">
                  Glodinas Makelaardij is een professioneel makelaarskantoor gevestigd in Den Haag. Met jarenlange ervaring in de vastgoedmarkt helpen wij particulieren en bedrijven bij het kopen, verkopen en verhuren van woningen en commercieel vastgoed.
                </p>
                <p className="text-gray-600 mb-4">
                  Ons team bestaat uit ervaren makelaars die de lokale markt door en door kennen. Wij bieden persoonlijke service en staan altijd klaar om u te adviseren bij belangrijke vastgoedbeslissingen.
                </p>
                <p className="text-gray-600">
                  Bij Glodinas Makelaardij staat kwaliteit en klanttevredenheid voorop. Wij zorgen voor een transparant proces en houden u altijd op de hoogte van de voortgang.
                </p>
              </div>
              <div className="bg-orange-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Onze Cijfers</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Home className="w-6 h-6 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">150+</div>
                      <div className="text-gray-600">Verkochte Woningen</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-6 h-6 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">98%</div>
                      <div className="text-gray-600">Klanttevredenheid</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-6 h-6 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">€50M+</div>
                      <div className="text-gray-600">Totale Transactiewaarde</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">15+</div>
                      <div className="text-gray-600">Jaar Ervaring</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Onze Diensten
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <Home className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Woningen Verkopen</h3>
                  <p className="text-gray-600">
                    Professionele begeleiding bij het verkopen van uw woning. Van taxatie tot overdracht.
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Woningen Kopen</h3>
                  <p className="text-gray-600">
                    Hulp bij het vinden en kopen van uw droomhuis in Den Haag en omgeving.
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                  <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Verhuur & Beheer</h3>
                  <p className="text-gray-600">
                    Complete verhuurservice en professioneel vastgoedbeheer voor beleggers.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Waarom Kiezen Voor Ons?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Lokale Expertise</h4>
                      <p className="text-gray-600">Uitgebreide kennis van de Den Haagse vastgoedmarkt</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Persoonlijke Service</h4>
                      <p className="text-gray-600">Maatwerk en persoonlijke aandacht voor elke klant</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Transparante Communicatie</h4>
                      <p className="text-gray-600">Duidelijke communicatie en regelmatige updates</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Snelle Service</h4>
                      <p className="text-gray-600">Efficiënte afhandeling en korte doorlooptijden</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Uitgebreid Netwerk</h4>
                      <p className="text-gray-600">Sterke connecties met andere professionals in de sector</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Resultaatgericht</h4>
                      <p className="text-gray-600">Focus op het behalen van de beste resultaten voor u</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Neem Contact Op
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Adres</h4>
                  <p className="text-gray-600">
                    Lange Voorhout 123<br />
                    2514 EA Den Haag
                  </p>
                </div>
                <div>
                  <Phone className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Telefoon</h4>
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


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Users, 
  MapPin, 
  Mail,
  CheckCircle,
  Building,
  Calendar,
  ArrowRight,
  Briefcase,
  Shield,
  TrendingUp
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Matching home page style */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-building.jpeg')"
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-0">
          <div className="max-w-4xl mx-auto">
            {/* Orange accent bar above heading */}
            <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto md:mx-0"></div>
            
            <p className="text-base md:text-lg lg:text-xl font-medium mb-3 md:mb-4 text-orange-400 tracking-wide text-center md:text-left">
              OVER ONS
            </p>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-8 text-center md:text-left text-white">
              Uw betrouwbare partner<br />
              in <span className="text-orange-400">vastgoed</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              Sinds 2015 helpen wij particulieren en bedrijven bij het kopen, verkopen en verhuren van woningen in Den Haag
            </p>
            
            {/* CTA Buttons - Stacked on Mobile, Side by Side on Desktop */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 md:mb-12">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Neem Contact Op
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/schedule" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold backdrop-blur-sm flex items-center justify-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan Afspraak
                </Button>
              </Link>
            </div>
            
            {/* Stats Row - 2x2 Grid on Mobile, 4x1 on Desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto md:mx-0">
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">150+</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Verkochte Woningen</div>
              </div>
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">98%</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Klanttevredenheid</div>
              </div>
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">€50M+</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Verkoopvolume</div>
              </div>
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">15+</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Jaar Ervaring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto"></div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-16">
              Wie Zijn Wij?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p className="text-gray-700 mb-6 text-lg">
                  Glodinas Makelaardij is een toonaangevend makelaarskantoor gevestigd in Den Haag. Met onze diepgaande kennis van de lokale vastgoedmarkt helpen wij particulieren en bedrijven bij het kopen, verkopen en verhuren van woningen en commercieel vastgoed.
                </p>
                <p className="text-gray-700 mb-6 text-lg">
                  Ons team bestaat uit ervaren makelaars die de Haagse markt door en door kennen. Wij bieden persoonlijke service op maat en staan altijd klaar om u te adviseren bij belangrijke vastgoedbeslissingen.
                </p>
                <p className="text-gray-700 text-lg">
                  Bij Glodinas Makelaardij staat kwaliteit en klanttevredenheid voorop. Wij zorgen voor een transparant proces en houden u altijd op de hoogte van de voortgang. Onze aanpak is professioneel, persoonlijk en resultaatgericht.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-xl shadow-sm">
                  <Briefcase className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Professioneel</h3>
                  <p className="text-gray-600">Gecertificeerde makelaars met jarenlange ervaring in de vastgoedmarkt.</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl shadow-sm">
                  <Users className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Persoonlijk</h3>
                  <p className="text-gray-600">Persoonlijke aandacht en maatwerk voor elke klant.</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl shadow-sm">
                  <Shield className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Betrouwbaar</h3>
                  <p className="text-gray-600">Transparante communicatie en eerlijk advies.</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl shadow-sm">
                  <TrendingUp className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Resultaatgericht</h3>
                  <p className="text-gray-600">Focus op het behalen van de beste resultaten voor u.</p>
                </div>
              </div>
            </div>
            
            {/* Team Section */}
            <div className="mb-20">
              <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto"></div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-16">
                Ons Team
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <div className="h-48 bg-orange-100 flex items-center justify-center">
                    <Users className="w-20 h-20 text-orange-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Cihat Kaya</h3>
                    <p className="text-orange-500 font-medium mb-4">Oprichter & Hoofdmakelaar</p>
                    <p className="text-gray-600 mb-4">
                      Met meer dan 15 jaar ervaring in de vastgoedmarkt van Den Haag, brengt Cihat diepgaande kennis en expertise in elke transactie.
                    </p>
                    <div className="flex items-center text-gray-500">
                      <Mail className="w-4 h-4 mr-2" />
                      <a href="mailto:cihatkaya@glodinas.nl" className="hover:text-orange-500 transition-colors">
                        cihatkaya@glodinas.nl
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <div className="h-48 bg-orange-100 flex items-center justify-center">
                    <Users className="w-20 h-20 text-orange-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Anna de Vries</h3>
                    <p className="text-orange-500 font-medium mb-4">Senior Makelaar</p>
                    <p className="text-gray-600 mb-4">
                      Anna specialiseert zich in luxe woningen en heeft een uitstekend netwerk in de exclusieve wijken van Den Haag.
                    </p>
                    <div className="flex items-center text-gray-500">
                      <Mail className="w-4 h-4 mr-2" />
                      <a href="mailto:anna@glodinas.nl" className="hover:text-orange-500 transition-colors">
                        anna@glodinas.nl
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <div className="h-48 bg-orange-100 flex items-center justify-center">
                    <Users className="w-20 h-20 text-orange-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Mark Jansen</h3>
                    <p className="text-orange-500 font-medium mb-4">Vastgoedadviseur</p>
                    <p className="text-gray-600 mb-4">
                      Mark heeft een achtergrond in architectuur en biedt waardevolle inzichten over de structurele aspecten van vastgoed.
                    </p>
                    <div className="flex items-center text-gray-500">
                      <Mail className="w-4 h-4 mr-2" />
                      <a href="mailto:mark@glodinas.nl" className="hover:text-orange-500 transition-colors">
                        mark@glodinas.nl
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services Section */}
            <div className="mb-20">
              <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto"></div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-16">
                Onze Diensten
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Woningen Verkopen</h3>
                  <p className="text-gray-600">
                    Professionele begeleiding bij het verkopen van uw woning. Van taxatie tot overdracht.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Woningen Kopen</h3>
                  <p className="text-gray-600">
                    Hulp bij het vinden en kopen van uw droomhuis in Den Haag en omgeving.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Verhuur & Beheer</h3>
                  <p className="text-gray-600">
                    Complete verhuurservice en professioneel vastgoedbeheer voor beleggers.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Why Choose Us Section */}
            <div className="mb-20">
              <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto"></div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-16">
                Waarom Kiezen Voor Ons?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Lokale Expertise</h4>
                      <p className="text-gray-600">Uitgebreide kennis van de Den Haagse vastgoedmarkt en alle wijken. Wij kennen elke buurt en straat.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Persoonlijke Service</h4>
                      <p className="text-gray-600">Maatwerk en persoonlijke aandacht voor elke klant. Wij nemen de tijd om uw wensen en behoeften te begrijpen.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Transparante Communicatie</h4>
                      <p className="text-gray-600">Duidelijke communicatie en regelmatige updates over de voortgang van uw verkoop of aankoop.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Snelle Service</h4>
                      <p className="text-gray-600">Efficiënte afhandeling en korte doorlooptijden. Wij werken snel en effectief om uw doelen te bereiken.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Uitgebreid Netwerk</h4>
                      <p className="text-gray-600">Sterke connecties met andere professionals in de sector, zoals hypotheekadviseurs, notarissen en aannemers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Resultaatgericht</h4>
                      <p className="text-gray-600">Focus op het behalen van de beste resultaten voor u, of het nu gaat om de hoogste verkoopprijs of de aankoop van uw droomhuis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gray-50 p-8 md:p-12 rounded-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Klaar om uw vastgoeddoelen te bereiken?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Neem vandaag nog contact met ons op voor een vrijblijvend gesprek over uw wensen en mogelijkheden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Neem Contact Op
                  </Button>
                </Link>
                <Link href="/schedule" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-orange-600 text-orange-600 hover:bg-orange-50 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold flex items-center justify-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Plan Afspraak
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


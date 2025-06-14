import React from 'react';
import { Metadata } from 'next';
import { Home, MapPin, Heart, Search, Filter, CheckCircle, Euro, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Woningen Huren in Den Haag | Huurwoningen | Glodinas Makelaardij',
  description: 'Vind uw ideale huurwoning in Den Haag. Uitgebreid aanbod appartementen en huizen. Professionele begeleiding bij het huren.',
  keywords: 'woningen huren, huurwoningen, Den Haag, appartement huren, huis huren, Glodinas',
};

const WoningenHurenPage = () => {
  const benefits = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Uitgebreid Aanbod",
      description: "Toegang tot alle beschikbare huurwoningen in Den Haag"
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Persoonlijke Selectie",
      description: "Woningen die perfect aansluiten bij uw wensen en budget"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Snelle Reactie",
      description: "Direct reageren op nieuwe woningen die beschikbaar komen"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Begeleiding",
      description: "Professionele ondersteuning tijdens het hele huurproces"
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: "Transparante Kosten",
      description: "Duidelijke informatie over huurprijs en bijkomende kosten"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Flexibele Bezichtigingen",
      description: "Bezichtigingen op momenten die u uitkomen"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Intake Gesprek",
      description: "Bespreking van uw wensen, budget en voorkeuren"
    },
    {
      step: "02",
      title: "Woningen Zoeken",
      description: "Actief zoeken naar geschikte huurwoningen"
    },
    {
      step: "03",
      title: "Selectie & Bezichtiging",
      description: "Voorselektie en begeleide bezichtigingen"
    },
    {
      step: "04",
      title: "Aanvraag Indienen",
      description: "Professionele ondersteuning bij de huuranvraag"
    },
    {
      step: "05",
      title: "Contractafhandeling",
      description: "Begeleiding bij het tekenen van het huurcontract"
    }
  ];

  const propertyTypes = [
    {
      type: "Studio's",
      priceRange: "€800 - €1.200",
      description: "Compacte woningen voor starters",
      features: ["25-40 m²", "Eigen keuken", "Eigen badkamer"]
    },
    {
      type: "Appartementen",
      priceRange: "€1.200 - €2.000",
      description: "Comfortabele 1-3 kamer appartementen",
      features: ["40-80 m²", "Balkon/terras", "Moderne voorzieningen"]
    },
    {
      type: "Eengezinswoningen",
      priceRange: "€1.800 - €3.500",
      description: "Ruime gezinswoningen met tuin",
      features: ["80-150 m²", "Eigen tuin", "Meerdere slaapkamers"]
    },
    {
      type: "Luxe Woningen",
      priceRange: "€3.500+",
      description: "Premium woningen in toplocaties",
      features: ["150+ m²", "Hoogwaardige afwerking", "Premium locatie"]
    }
  ];

  const neighborhoods = [
    { name: "Centrum", avgRent: "€1.650", availability: "Hoog" },
    { name: "Benoordenhout", avgRent: "€2.200", availability: "Gemiddeld" },
    { name: "Voorburg", avgRent: "€1.450", availability: "Hoog" },
    { name: "Leidschenveen", avgRent: "€1.350", availability: "Zeer Hoog" },
    { name: "Haagse Bos", avgRent: "€1.850", availability: "Laag" },
    { name: "Scheveningen", avgRent: "€1.750", availability: "Gemiddeld" }
  ];

  const requirements = [
    "Geldig identiteitsbewijs",
    "Inkomensverklaring (3x huurprijs)",
    "Werkgeversverklaring",
    "Uittreksel BKR",
    "Referenties vorige verhuurder",
    "Bankafschriften (3 maanden)"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Huurwoningen in <span className="text-orange-400">Den Haag</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Vind uw ideale huurwoning met professionele begeleiding. 
              Van studio tot eengezinswoning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/woningen">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <Search className="w-5 h-5 mr-2" />
                  Bekijk Aanbod
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Huur Gesprek
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom Huren via Glodinas?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professionele begeleiding bij het vinden van uw ideale huurwoning. 
              Wij kennen de markt en zorgen voor een succesvolle huurervaring.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-indigo-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Woningtypes & Prijzen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van compacte studio's tot ruime eengezinswoningen. 
              Voor elke levensfase en budget hebben wij passende opties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((property, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-center mb-4">
                  <Home className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {property.type}
                  </h3>
                  <div className="text-2xl font-bold text-indigo-600 mt-2">
                    {property.priceRange}
                  </div>
                </div>
                
                <p className="text-gray-600 text-center mb-4">
                  {property.description}
                </p>
                
                <div className="space-y-2">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ons Huurproces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Een gestructureerde aanpak die zorgt voor een succesvolle huurervaring.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Populaire Huurwijken
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek de verschillende wijken en hun gemiddelde huurprijzen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((neighborhood, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {neighborhood.name}
                  </h3>
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gemiddelde huur:</span>
                    <span className="font-bold text-indigo-600">{neighborhood.avgRent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Beschikbaarheid:</span>
                    <span className={`font-medium ${
                      neighborhood.availability === 'Zeer Hoog' ? 'text-green-600' :
                      neighborhood.availability === 'Hoog' ? 'text-green-500' :
                      neighborhood.availability === 'Gemiddeld' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {neighborhood.availability}
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
                  Bekijk Woningen
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Wat Heeft U Nodig?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Voor een succesvolle huuranvraag zijn enkele documenten vereist. 
                Wij helpen u bij het verzamelen van alle benodigde papieren.
              </p>
              
              <div className="space-y-3">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Start Uw Zoektocht
              </h3>
              <p className="text-gray-600 mb-6">
                Laat ons weten wat u zoekt en wij gaan direct voor u aan de slag. 
                Gratis en zonder verplichtingen.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                  <span>Persoonlijke zoekservice</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                  <span>Begeleide bezichtigingen</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                  <span>Hulp bij aanvraagprocedure</span>
                </div>
              </div>
              
              <Link href="/contact">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3">
                  <Search className="w-5 h-5 mr-2" />
                  Start Zoekservice
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar om Uw Ideale Huurwoning te Vinden?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Neem contact op en laat ons u helpen bij het vinden van uw nieuwe thuis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Bel Direct: (6) 81 34 85 51
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Plan Afspraak
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WoningenHurenPage;


import React from 'react';
import { Metadata } from 'next';
import { Search, MapPin, Heart, TrendingUp, CheckCircle, Users, Calculator, FileText, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Woningen Kopen in Den Haag | Glodinas Makelaardij',
  description: 'Vind uw droomhuis in Den Haag met professionele begeleiding. Uitgebreid aanbod woningen, deskundige advisering en persoonlijke service.',
  keywords: 'woningen kopen, Den Haag, makelaar, huis kopen, vastgoed, Glodinas',
};

const WoningenKopenPage = () => {
  const benefits = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Uitgebreid Zoekservice",
      description: "Toegang tot alle beschikbare woningen in Den Haag en omgeving"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Persoonlijke Begeleiding",
      description: "Ervaren makelaars begeleiden u door het gehele aankoopproces"
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Financiële Advisering",
      description: "Hulp bij hypotheekadvies en financieringsmogelijkheden"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Juridische Ondersteuning",
      description: "Controle van alle documenten en contracten"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Marktkennis",
      description: "Actuele marktinformatie en waarderingsinzichten"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Onderhandelingsexpertise",
      description: "Professionele onderhandeling voor de beste prijs"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Intake & Wensen",
      description: "Uitgebreid gesprek over uw wensen, budget en voorkeuren"
    },
    {
      step: "02", 
      title: "Zoeken & Selecteren",
      description: "Actief zoeken naar geschikte woningen die aan uw criteria voldoen"
    },
    {
      step: "03",
      title: "Bezichtigingen",
      description: "Begeleide bezichtigingen met professionele beoordeling"
    },
    {
      step: "04",
      title: "Onderhandeling",
      description: "Strategische onderhandeling over prijs en voorwaarden"
    },
    {
      step: "05",
      title: "Juridische Afhandeling",
      description: "Controle van alle documenten en begeleiding tot overdracht"
    }
  ];

  const neighborhoods = [
    { name: "Centrum", properties: 45, avgPrice: "€485.000" },
    { name: "Benoordenhout", properties: 23, avgPrice: "€675.000" },
    { name: "Voorburg", properties: 34, avgPrice: "€425.000" },
    { name: "Leidschenveen", properties: 28, avgPrice: "€395.000" },
    { name: "Haagse Bos", properties: 19, avgPrice: "€525.000" },
    { name: "Scheveningen", properties: 31, avgPrice: "€445.000" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Uw Droomhuis in <span className="text-orange-400">Den Haag</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Professionele begeleiding bij het kopen van uw ideale woning. 
              Van zoeken tot sleuteloverdracht.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/woningen">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <Search className="w-5 h-5 mr-2" />
                  Bekijk Aanbod
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg border-2 border-white">
                  <Phone className="w-5 h-5 mr-2" />
                  Gratis Gesprek
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
              Waarom Kiezen voor Glodinas?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meer dan 15 jaar ervaring in de Haagse woningmarkt. 
              Wij kennen de markt en zorgen voor een zorgeloze aankoop.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-orange-500 mb-4">
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

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ons Aankoopproces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Een gestructureerde aanpak die zorgt voor een succesvolle en stressvrije aankoop.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Populaire Wijken in Den Haag
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek de verschillende wijken en hun gemiddelde woningprijzen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((neighborhood, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {neighborhood.name}
                  </h3>
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Beschikbaar:</span>
                    <span className="font-medium">{neighborhood.properties} woningen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gemiddelde prijs:</span>
                    <span className="font-bold text-orange-600">{neighborhood.avgPrice}</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                  Bekijk Woningen
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar om Uw Droomhuis te Vinden?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Neem contact op voor een vrijblijvend gesprek over uw woonwensen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Bel Direct: (6) 81 34 85 51
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg border-2 border-white">
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

export default WoningenKopenPage;


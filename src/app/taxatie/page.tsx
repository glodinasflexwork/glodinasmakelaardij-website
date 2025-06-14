import React from 'react';
import { Metadata } from 'next';
import { Calculator, TrendingUp, FileText, Award, Clock, CheckCircle, Euro, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Woningtaxatie Den Haag | Gratis Waardebepaling | Glodinas Makelaardij',
  description: 'Gratis professionele woningtaxatie in Den Haag. Gecertificeerde makelaars bepalen de actuele marktwaarde van uw woning.',
  keywords: 'woningtaxatie, taxatie, waardebepaling, Den Haag, makelaar, vastgoed waardering, Glodinas',
};

const TaxatiePage = () => {
  const benefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Gecertificeerde Taxateurs",
      description: "Erkende makelaars met jarenlange ervaring in de Haagse markt"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Actuele Marktdata",
      description: "Gebruik van de nieuwste verkoopcijfers en markttrends"
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Uitgebreide Analyse",
      description: "Vergelijking met vergelijkbare woningen in de buurt"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Gedetailleerd Rapport",
      description: "Schriftelijke rapportage met onderbouwing van de waarde"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Snelle Service",
      description: "Taxatie binnen 24 uur na afspraak beschikbaar"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Geheel Gratis",
      description: "Geen kosten, geen verplichtingen, volledig vrijblijvend"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Afspraak Maken",
      description: "Plan een afspraak op een moment dat u uitkomt"
    },
    {
      step: "02",
      title: "Woningbezoek",
      description: "Onze makelaar bezoekt uw woning voor inspectie"
    },
    {
      step: "03",
      title: "Marktanalyse",
      description: "Vergelijking met recente verkopen in de buurt"
    },
    {
      step: "04",
      title: "Waardebepaling",
      description: "Professionele inschatting van de marktwaarde"
    },
    {
      step: "05",
      title: "Rapportage",
      description: "Schriftelijk rapport met onderbouwing"
    }
  ];

  const factors = [
    "Locatie en buurt",
    "Grootte en indeling",
    "Bouwjaar en staat",
    "Energielabel",
    "Tuin en balkon",
    "Parkeerplaats",
    "Recente verkopen",
    "Marktomstandigheden"
  ];

  const neighborhoods = [
    { name: "Centrum", avgPrice: "€485.000", trend: "+3.2%" },
    { name: "Benoordenhout", avgPrice: "€675.000", trend: "+2.8%" },
    { name: "Voorburg", avgPrice: "€425.000", trend: "+4.1%" },
    { name: "Leidschenveen", avgPrice: "€395.000", trend: "+3.7%" },
    { name: "Haagse Bos", avgPrice: "€525.000", trend: "+2.5%" },
    { name: "Scheveningen", avgPrice: "€445.000", trend: "+3.9%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-orange-400">Gratis</span> Woningtaxatie
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Ontdek de actuele marktwaarde van uw woning met een professionele 
              taxatie door gecertificeerde makelaars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schedule">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  Plan Gratis Taxatie
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Direct Contact
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
              Waarom Onze Taxatie?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meer dan 15 jaar ervaring in de Haagse woningmarkt. 
              Betrouwbare waarderingen gebaseerd op actuele marktdata.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-purple-600 mb-4">
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
              Hoe Werkt Het?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Een eenvoudig proces dat binnen enkele dagen tot een betrouwbare 
              waardebepaling van uw woning leidt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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

      {/* Factors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Wat Bepaalt de Waarde?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Onze taxateurs kijken naar alle relevante factoren die de 
                waarde van uw woning beïnvloeden.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {factors.map((factor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Gemiddelde Woningprijzen Den Haag
              </h3>
              
              <div className="space-y-4">
                {neighborhoods.map((neighborhood, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{neighborhood.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{neighborhood.avgPrice}</div>
                      <div className="text-sm text-green-600">{neighborhood.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                * Gemiddelde prijzen gebaseerd op recente verkopen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ontdek de Waarde van Uw Woning
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Plan vandaag nog een gratis taxatie. Geen kosten, geen verplichtingen.
          </p>
          
          <div className="bg-white/10 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">24u</div>
                <div className="text-sm text-purple-200">Snelle service</div>
              </div>
              <div>
                <div className="text-2xl font-bold">€0</div>
                <div className="text-sm text-purple-200">Geheel gratis</div>
              </div>
              <div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-purple-200">Jaar ervaring</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                <Calculator className="w-5 h-5 mr-2" />
                Plan Gratis Taxatie
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Bel: (6) 81 34 85 51
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TaxatiePage;


import React from 'react';
import { Metadata } from 'next';
import { TrendingUp, Camera, Users, Target, Award, Clock, CheckCircle, Euro, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Woning Verkopen in Den Haag | Glodinas Makelaardij',
  description: 'Verkoop uw woning snel en tegen de beste prijs. Professionele marketing, fotografie en onderhandeling door ervaren makelaars.',
  keywords: 'woning verkopen, Den Haag, makelaar, huis verkopen, vastgoed verkoop, Glodinas',
};

const WoningenVerkopenPage = () => {
  const services = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Marktwaarde Bepaling",
      description: "Professionele taxatie voor de juiste vraagprijs"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Professionele Fotografie",
      description: "Hoogwaardige foto's en virtuele tours"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Marketing & Promotie",
      description: "Uitgebreide online en offline marketing"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Bezichtigingen",
      description: "Professionele begeleiding van alle bezichtigingen"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Onderhandeling",
      description: "Strategische onderhandeling voor de beste prijs"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Juridische Afhandeling",
      description: "Complete begeleiding tot aan de overdracht"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Gratis Taxatie",
      description: "Professionele waardebepaling van uw woning",
      duration: "1 dag"
    },
    {
      step: "02",
      title: "Marketing Voorbereiding",
      description: "Fotografie, teksten en presentatiemateriaal",
      duration: "3-5 dagen"
    },
    {
      step: "03",
      title: "Online Plaatsing",
      description: "Publicatie op alle relevante platforms",
      duration: "1 dag"
    },
    {
      step: "04",
      title: "Bezichtigingen",
      description: "Begeleiding van geïnteresseerde kopers",
      duration: "2-6 weken"
    },
    {
      step: "05",
      title: "Verkoop & Overdracht",
      description: "Onderhandeling en juridische afhandeling",
      duration: "6-8 weken"
    }
  ];

  const stats = [
    { number: "98%", label: "Verkocht binnen 3 maanden" },
    { number: "€50M+", label: "Totale verkoopwaarde 2024" },
    { number: "150+", label: "Verkochte woningen" },
    { number: "4.8/5", label: "Gemiddelde klantbeoordeling" }
  ];

  const marketingChannels = [
    "Funda.nl - Marktleider",
    "Jaap.nl - Breed bereik", 
    "Pararius.nl - Internationale kopers",
    "Social Media Marketing",
    "Google Ads Campagnes",
    "Eigen Website & Database",
    "Netwerk van Collega Makelaars",
    "Print Advertenties"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Verkoop Uw Woning <span className="text-orange-400">Succesvol</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Maximale verkoopprijs door professionele marketing, 
              strategische pricing en deskundige onderhandeling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/taxatie">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <Euro className="w-5 h-5 mr-2" />
                  Gratis Taxatie
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Verkoop Gesprek
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Verkoopservice
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van taxatie tot sleuteloverdracht. Wij zorgen voor een zorgeloze verkoop 
              tegen de best mogelijke prijs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-green-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
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
              Ons Verkoopproces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Een bewezen aanpak die zorgt voor een snelle verkoop tegen de beste prijs.
            </p>
          </div>

          <div className="space-y-8">
            {process.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 rounded-xl p-6">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <Clock className="w-4 h-4" />
                  {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Maximale Online Zichtbaarheid
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Uw woning wordt gepresenteerd op alle relevante platforms 
                voor maximaal bereik en de beste kopers.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {marketingChannels.map((channel, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{channel}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Gratis Marktwaarde Bepaling
              </h3>
              <p className="text-gray-600 mb-6">
                Ontdek wat uw woning waard is met onze professionele taxatie. 
                Geheel vrijblijvend en zonder verplichtingen.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Professionele taxatie</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Marktanalyse rapport</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Verkoopadvies op maat</span>
                </div>
              </div>
              
              <Link href="/taxatie">
                <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-lg py-3">
                  <Euro className="w-5 h-5 mr-2" />
                  Vraag Gratis Taxatie Aan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar om Uw Woning te Verkopen?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Start vandaag nog met een gratis taxatie en ontdek de mogelijkheden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Bel Direct: (6) 81 34 85 51
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Plan Afspraak
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WoningenVerkopenPage;


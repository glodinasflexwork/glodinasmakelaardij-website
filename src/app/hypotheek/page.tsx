import React from 'react';
import { Metadata } from 'next';
import { Calculator, PiggyBank, FileText, TrendingUp, Shield, CheckCircle, Euro, Phone, Mail, Home, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hypotheekadvies Den Haag | Hypotheek Berekenen | Glodinas Makelaardij',
  description: 'Professioneel hypotheekadvies in Den Haag. Berekening, aanvraag en begeleiding voor uw hypotheek. Onafhankelijk advies voor de beste voorwaarden.',
  keywords: 'hypotheekadvies, hypotheek berekenen, Den Haag, hypotheekaanvraag, financiering, Glodinas',
};

const HypotheekadviesPage = () => {
  const services = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Hypotheek Berekening",
      description: "Bereken uw maximale leencapaciteit en maandlasten",
      features: ["Inkomenstoets", "Uitgavenanalyse", "Renteberekening", "Scenario's vergelijken"]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Aanvraag Begeleiding",
      description: "Volledige ondersteuning bij uw hypotheekaanvraag",
      features: ["Documentatie", "Bankcontact", "Onderhandeling", "Afhandeling"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Renteadvies",
      description: "Advies over rentevaste periodes en rentevormen",
      features: ["Marktanalyse", "Risicobeoordeling", "Optimale looptijd", "Renteprognose"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verzekeringen",
      description: "Passende verzekeringen bij uw hypotheek",
      features: ["Overlijdensrisico", "Arbeidsongeschiktheid", "Werkloosheid", "Woonlastenverzekering"]
    }
  ];

  const mortgageTypes = [
    {
      name: "Annuïteitenhypotheek",
      description: "Gelijke maandlasten gedurende de looptijd",
      pros: ["Voorspelbare maandlasten", "Fiscaal voordelig", "Meest gekozen vorm"],
      rate: "Vanaf 3.8%"
    },
    {
      name: "Lineaire Hypotheek",
      description: "Gelijke aflossing, dalende maandlasten",
      pros: ["Sneller aflossen", "Minder rente betalen", "Lagere eindschuld"],
      rate: "Vanaf 3.7%"
    },
    {
      name: "Aflossingsvrije Hypotheek",
      description: "Alleen rente betalen, geen aflossing",
      pros: ["Lagere maandlasten", "Meer financiële ruimte", "Beleggingsmogelijkheden"],
      rate: "Vanaf 4.1%"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Intake Gesprek",
      description: "Bespreking van uw wensen en financiële situatie",
      duration: "60 min"
    },
    {
      step: "2",
      title: "Berekening & Advies",
      description: "Uitgebreide berekening en hypotheekadvies op maat",
      duration: "3-5 dagen"
    },
    {
      step: "3",
      title: "Offerte Aanvragen",
      description: "Aanvragen van offertes bij verschillende geldverstrekkers",
      duration: "1-2 weken"
    },
    {
      step: "4",
      title: "Aanvraag & Afhandeling",
      description: "Indienen aanvraag en begeleiding tot aan de notaris",
      duration: "4-6 weken"
    }
  ];

  const benefits = [
    "Onafhankelijk advies van alle geldverstrekkers",
    "Geen kosten voor hypotheekadvies bij aankoop via ons",
    "Persoonlijke begeleiding van A tot Z",
    "Snelle afhandeling en directe communicatie",
    "Ervaring met complexe financieringen",
    "Nazorg en service na afronding"
  ];

  const stats = [
    { number: "€2.5M", label: "Gemiddeld gefinancierd per maand" },
    { number: "98%", label: "Goedkeuringspercentage aanvragen" },
    { number: "15", label: "Dagen gemiddelde doorlooptijd" },
    { number: "4.2/5", label: "Klantbeoordeling hypotheekservice" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-orange-400">Hypotheekadvies</span> Den Haag
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Onafhankelijk hypotheekadvies voor de beste financiering van uw droomhuis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  Bereken Hypotheek
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Gratis Adviesgesprek
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Hypotheekdiensten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Volledige ondersteuning bij uw hypotheek van berekening tot afronding
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="text-green-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mortgage Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hypotheekvormen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verschillende hypotheekvormen voor elke situatie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mortgageTypes.map((type, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{type.name}</h3>
                  <span className="text-2xl font-bold text-green-600">{type.rate}</span>
                </div>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="space-y-2">
                  {type.pros.map((pro, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {pro}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ons Hypotheekproces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stap voor stap naar uw ideale hypotheek
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-2">{step.description}</p>
                <div className="flex items-center justify-center text-sm text-green-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom Kiezen voor Ons Hypotheekadvies?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De voordelen van onze hypotheekservice
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Resultaten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cijfers die onze expertise bewijzen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar voor uw hypotheekadvies?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Start vandaag nog met een gratis adviesgesprek en ontdek uw mogelijkheden
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Start Aanvraag
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 text-lg">
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

export default HypotheekadviesPage;


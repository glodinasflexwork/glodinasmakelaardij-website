import React from 'react';
import { Metadata } from 'next';
import { Building, Users, Shield, TrendingUp, Clock, CheckCircle, Euro, Phone, Mail, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Verhuur Beheer Den Haag | Vastgoed Beheer | Glodinas Makelaardij',
  description: 'Professioneel verhuur beheer in Den Haag. Volledige ontzorging voor vastgoedeigenaren. Van huurdersselectie tot onderhoud.',
  keywords: 'verhuur beheer, vastgoed beheer, Den Haag, verhuurservice, property management, Glodinas',
};

const VerhuurBeheerPage = () => {
  const services = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Huurdersselectie",
      description: "Zorgvuldige screening en selectie van betrouwbare huurders"
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: "Huurinning",
      description: "Maandelijkse huurinning en financiële rapportage"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Onderhoud & Reparaties",
      description: "Coördinatie van onderhoud en spoedklussen"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Juridische Ondersteuning",
      description: "Contractbeheer en juridische advisering"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Marktanalyse",
      description: "Regelmatige evaluatie van huurprijzen en marktwaarde"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Service",
      description: "Bereikbaar voor spoedgevallen en urgente zaken"
    }
  ];

  const benefits = [
    "Maximale huurinkomsten",
    "Minimale leegstand",
    "Professionele huurdersselectie",
    "Volledige ontzorging",
    "Transparante rapportage",
    "Juridische zekerheid",
    "Onderhoud coördinatie",
    "Marktconforme huurprijzen"
  ];

  const process = [
    {
      step: "01",
      title: "Intake & Waardering",
      description: "Bespreking van uw wensen en waardebepaling van de woning"
    },
    {
      step: "02",
      title: "Marketing & Verhuur",
      description: "Professionele marketing en selectie van geschikte huurders"
    },
    {
      step: "03",
      title: "Contractafhandeling",
      description: "Opstellen huurcontract en begeleiding bij ondertekening"
    },
    {
      step: "04",
      title: "Lopend Beheer",
      description: "Maandelijkse huurinning en onderhoud coördinatie"
    },
    {
      step: "05",
      title: "Rapportage",
      description: "Regelmatige financiële rapportage en marktupdate"
    }
  ];

  const packages = [
    {
      name: "Basis Beheer",
      price: "4%",
      description: "Essentiële verhuurservice",
      features: [
        "Huurdersselectie",
        "Contractbeheer",
        "Maandelijkse huurinning",
        "Basis onderhoud coördinatie",
        "Jaarlijkse rapportage"
      ]
    },
    {
      name: "Volledig Beheer",
      price: "6%",
      description: "Complete ontzorging",
      features: [
        "Alle basis services",
        "24/7 spoeddienst",
        "Uitgebreid onderhoud",
        "Juridische ondersteuning",
        "Kwartaal rapportage",
        "Marktanalyse"
      ],
      popular: true
    },
    {
      name: "Premium Beheer",
      price: "8%",
      description: "Luxe vastgoed service",
      features: [
        "Alle volledig services",
        "Persoonlijke accountmanager",
        "Maandelijkse rapportage",
        "Renovatie begeleiding",
        "Investment advies",
        "VIP service"
      ]
    }
  ];

  const stats = [
    { number: "250+", label: "Woningen in beheer" },
    { number: "98%", label: "Bezettingsgraad" },
    { number: "€15M+", label: "Beheerd vastgoed" },
    { number: "4.9/5", label: "Eigenaar tevredenheid" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-orange-400">Professioneel</span> Verhuur Beheer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto">
              Volledige ontzorging voor vastgoedeigenaren. Maximale huurinkomsten 
              met minimale zorgen door professioneel beheer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <Building className="w-5 h-5 mr-2" />
                  Gratis Adviesgesprek
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" className="bg-white text-teal-900 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Plan Afspraak
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
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">
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
              Onze Verhuur Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van A tot Z ontzorgd. Wij nemen alle zorgen uit handen zodat u 
              kunt genieten van uw vastgoedinvestering.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-teal-600 mb-4">
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
              Hoe Werkt Ons Beheer?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Een gestructureerde aanpak die zorgt voor optimale verhuurresultaten.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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

      {/* Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Beheer Pakketten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kies het pakket dat het beste bij uw wensen en vastgoed past.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300 ${
                pkg.popular ? 'ring-2 ring-teal-600 scale-105' : ''
              }`}>
                {pkg.popular && (
                  <div className="bg-teal-600 text-white text-sm font-medium px-3 py-1 rounded-full text-center mb-4">
                    Meest Gekozen
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    {pkg.price}
                  </div>
                  <p className="text-gray-600">
                    {pkg.description}
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button className={`w-full ${
                  pkg.popular 
                    ? 'bg-teal-600 hover:bg-teal-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}>
                  Kies Dit Pakket
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Voordelen van Professioneel Beheer
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Laat uw vastgoed voor u werken terwijl wij alle zorgen uit handen nemen. 
                Meer rendement, minder stress.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Gratis Rendement Analyse
              </h3>
              <p className="text-gray-600 mb-6">
                Ontdek het potentieel van uw vastgoed met onze gratis analyse. 
                Wij berekenen uw mogelijke huurinkomsten en rendement.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Marktwaarde bepaling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Huurpotentieel analyse</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Rendement berekening</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Persoonlijk advies</span>
                </div>
              </div>
              
              <Link href="/contact">
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Vraag Gratis Analyse Aan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar voor Professioneel Verhuur Beheer?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Neem contact op voor een vrijblijvend gesprek over de mogelijkheden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Bel Direct: (6) 81 34 85 51
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100 px-8 py-4 text-lg">
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

export default VerhuurBeheerPage;


import React from 'react';
import { Metadata } from 'next';
import { Users, Award, TrendingUp, Home, Calculator, Shield, Phone, Mail, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Diensten | Professionele Makelaardij Services | Glodinas Makelaardij',
  description: 'Ontdek onze uitgebreide makelaardij diensten in Den Haag. Van aankoop tot verkoop, van taxatie tot verhuur beheer.',
  keywords: 'makelaardij diensten, Den Haag, vastgoed services, makelaar, Glodinas',
};

const DienstenPage = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Woningen Kopen",
      description: "Professionele begeleiding bij het vinden en kopen van uw droomhuis",
      features: ["Uitgebreid zoekservice", "Bezichtigingen", "Onderhandeling", "Juridische ondersteuning"],
      link: "/woningen/kopen"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Woningen Verkopen", 
      description: "Maximale verkoopprijs door strategische marketing en onderhandeling",
      features: ["Marktwaarde bepaling", "Professionele fotografie", "Online marketing", "Bezichtigingen"],
      link: "/woningen/verkopen"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Woningtaxatie",
      description: "Gratis professionele waardebepaling van uw woning",
      features: ["Gecertificeerde taxateurs", "Actuele marktdata", "Schriftelijk rapport", "Geheel gratis"],
      link: "/taxatie"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Woningen Huren",
      description: "Vind uw ideale huurwoning met persoonlijke begeleiding",
      features: ["Uitgebreid aanbod", "Persoonlijke selectie", "Snelle reactie", "Begeleiding"],
      link: "/woningen/huren"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verhuur Beheer",
      description: "Volledige ontzorging voor vastgoedeigenaren",
      features: ["Huurdersselectie", "Huurinning", "Onderhoud", "24/7 service"],
      link: "/verhuur-beheer"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Marktanalyse",
      description: "Uitgebreide marktinzichten voor betere vastgoedbeslissingen",
      features: ["Markttrends", "Prijsontwikkeling", "Investeringsadvies", "Rapportage"],
      link: "/marktanalyse"
    }
  ];

  const stats = [
    { number: "15+", label: "Jaar Ervaring" },
    { number: "500+", label: "Tevreden Klanten" },
    { number: "€75M+", label: "Verkoopvolume" },
    { number: "4.9/5", label: "Klantbeoordeling" }
  ];

  const process = [
    {
      step: "01",
      title: "Kennismaking",
      description: "Gratis gesprek over uw wensen en doelstellingen"
    },
    {
      step: "02",
      title: "Strategie",
      description: "Op maat gemaakte aanpak voor uw situatie"
    },
    {
      step: "03",
      title: "Uitvoering",
      description: "Professionele begeleiding tijdens het hele proces"
    },
    {
      step: "04",
      title: "Resultaat",
      description: "Succesvol bereiken van uw vastgoeddoelen"
    }
  ];

  const testimonials = [
    {
      name: "Maria van der Berg",
      role: "Woningkoper",
      text: "Uitstekende service! Glodinas heeft ons perfect geholpen bij het vinden van ons droomhuis.",
      rating: 5
    },
    {
      name: "Jan Pietersen", 
      role: "Woningverkoper",
      text: "Professionele aanpak en snelle verkoop. Zeer tevreden met het resultaat.",
      rating: 5
    },
    {
      name: "Lisa de Vries",
      role: "Vastgoedinvesteerder",
      text: "Betrouwbaar verhuur beheer. Mijn investering is in goede handen.",
      rating: 5
    }
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
              Professionele <span className="text-orange-400">Makelaardij</span> Diensten
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Van aankoop tot verkoop, van taxatie tot verhuur beheer. 
              Wij bieden alle vastgoed diensten onder één dak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Gratis Gesprek
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Over Ons
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
              Onze Diensten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uitgebreide vastgoed diensten voor particulieren en investeerders. 
              Professioneel, betrouwbaar en resultaatgericht.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-blue-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={service.link}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Meer Informatie
                  </Button>
                </Link>
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
              Hoe Wij Werken
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Een gestructureerde aanpak die zorgt voor optimale resultaten 
              en een prettige samenwerking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wat Onze Klanten Zeggen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lees de ervaringen van onze tevreden klanten.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar om te Beginnen?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Neem contact op voor een vrijblijvend gesprek over uw vastgoedwensen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Bel Direct: (6) 81 34 85 51
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg">
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

export default DienstenPage;


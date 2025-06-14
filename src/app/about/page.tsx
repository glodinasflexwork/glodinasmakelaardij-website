import React from 'react';
import { Metadata } from 'next';
import { Award, Users, TrendingUp, Heart, CheckCircle, Star, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Over Glodinas Makelaardij | Uw Betrouwbare Makelaar in Den Haag',
  description: 'Leer meer over Glodinas Makelaardij. Meer dan 15 jaar ervaring in de Haagse vastgoedmarkt. Persoonlijke service en professionele begeleiding.',
  keywords: 'over ons, Glodinas Makelaardij, makelaar Den Haag, vastgoed ervaring, bedrijfsgeschiedenis',
};

const AboutPage = () => {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Persoonlijke Service",
      description: "Elke klant verdient persoonlijke aandacht en maatwerk"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Professionaliteit",
      description: "Hoogste kwaliteit dienstverlening met vakkennis en ervaring"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Betrouwbaarheid",
      description: "Transparantie en eerlijkheid in al onze handelingen"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Resultaatgericht",
      description: "Gericht op het behalen van de beste resultaten voor onze klanten"
    }
  ];

  const milestones = [
    {
      year: "2008",
      title: "Oprichting",
      description: "Glodinas Makelaardij wordt opgericht met de missie om persoonlijke vastgoedservice te bieden"
    },
    {
      year: "2012",
      title: "Uitbreiding Team",
      description: "Groei van het team met ervaren makelaars en specialisten"
    },
    {
      year: "2016",
      title: "500+ Transacties",
      description: "Mijlpaal van 500 succesvolle vastgoedtransacties bereikt"
    },
    {
      year: "2020",
      title: "Digitale Innovatie",
      description: "Lancering van geavanceerde online diensten en virtuele bezichtigingen"
    },
    {
      year: "2024",
      title: "Marktleider",
      description: "Erkend als een van de toonaangevende makelaars in Den Haag"
    }
  ];

  const stats = [
    { number: "15+", label: "Jaar Ervaring" },
    { number: "750+", label: "Tevreden Klanten" },
    { number: "€85M+", label: "Verkoopvolume" },
    { number: "4.9/5", label: "Klantbeoordeling" }
  ];

  const certifications = [
    "NVM Makelaar",
    "VBO Makelaar", 
    "Taxateur Onroerende Zaken",
    "WFT Hypotheekadviseur",
    "Erkend Vastgoedadviseur"
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
              Over <span className="text-orange-400">Glodinas</span> Makelaardij
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Meer dan 15 jaar ervaring in de Haagse vastgoedmarkt. 
              Persoonlijke service en professionele begeleiding staan centraal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Neem Contact Op
                </Button>
              </Link>
              <Link href="/team">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Ontmoet Ons Team
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

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ons Verhaal
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Glodinas Makelaardij werd opgericht vanuit de overtuiging dat vastgoed 
                meer is dan alleen stenen en cement. Het gaat om dromen, ambities en 
                de belangrijkste beslissingen in iemands leven.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Sinds onze oprichting in 2008 hebben wij ons ontwikkeld tot een van 
                de meest betrouwbare makelaardijen in Den Haag. Onze focus ligt op 
                persoonlijke service, waarbij elke klant de aandacht krijgt die hij verdient.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Met een team van ervaren professionals en een diepgaande kennis van 
                de lokale markt, helpen wij onze klanten bij het realiseren van hun 
                vastgoeddoelen.
              </p>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Onze Certificeringen
                </h3>
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Onze Missie
              </h3>
              <p className="text-gray-600 mb-6">
                "Wij geloven dat elke vastgoedtransactie uniek is. Daarom bieden wij 
                persoonlijke begeleiding die aansluit bij de specifieke behoeften van 
                onze klanten."
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3">Onze Belofte</h4>
                <ul className="space-y-2 text-blue-800">
                  <li>• Transparante communicatie</li>
                  <li>• Eerlijke prijsstelling</li>
                  <li>• Persoonlijke aandacht</li>
                  <li>• Professionele uitvoering</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Waarden
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De principes die ons dagelijks werk sturen en onze relaties met klanten bepalen.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Geschiedenis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Belangrijke mijlpalen in de ontwikkeling van Glodinas Makelaardij.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-orange-500 text-white rounded-full w-20 h-20 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">
                    {milestone.description}
                  </p>
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
            Klaar om Samen te Werken?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Ontdek hoe onze ervaring en persoonlijke aanpak u kan helpen bij uw vastgoeddoelen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Bel Direct: (6) 81 34 85 51
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 text-lg">
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

export default AboutPage;


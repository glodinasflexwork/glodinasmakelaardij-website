import React from 'react';
import { Metadata } from 'next';
import { Users, Award, Linkedin, Mail, Phone, MapPin, Star, TrendingUp, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ons Team | Glodinas Makelaardij - Ervaren Makelaars Den Haag',
  description: 'Ontmoet het ervaren team van Glodinas Makelaardij. Professionele makelaars met lokale kennis en persoonlijke service in Den Haag.',
  keywords: 'team, makelaars, Glodinas Makelaardij, vastgoed professionals, Den Haag, ervaring',
};

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Cihat Kaya",
      role: "Oprichter & Makelaar-Taxateur",
      experience: "15+ jaar",
      specialization: "Woningverkoop & Taxaties",
      description: "Cihat is de oprichter van Glodinas Makelaardij en heeft meer dan 15 jaar ervaring in de Haagse vastgoedmarkt. Hij specialiseert zich in woningverkoop en taxaties.",
      certifications: ["NVM Makelaar", "Taxateur", "VBO Makelaar"],
      languages: ["Nederlands", "Turks", "Engels"],
      email: "cihat@glodinas.nl",
      phone: "(6) 81 34 85 51",
      linkedin: "#",
      image: "/images/team/cihat-kaya.jpg"
    },
    {
      name: "Sarah van der Berg",
      role: "Senior Makelaar",
      experience: "12+ jaar",
      specialization: "Aankoop & Begeleiding",
      description: "Sarah heeft uitgebreide ervaring in aankoopbegeleiding en helpt klanten bij het vinden van hun droomhuis in Den Haag en omgeving.",
      certifications: ["NVM Makelaar", "Aankoopmakelaar", "WFT Basis"],
      languages: ["Nederlands", "Engels", "Duits"],
      email: "sarah@glodinas.nl",
      phone: "(6) 12 34 56 78",
      linkedin: "#",
      image: "/images/team/sarah-berg.jpg"
    },
    {
      name: "Mark Janssen",
      role: "Hypotheekadviseur",
      experience: "10+ jaar",
      specialization: "Hypotheken & Financiering",
      description: "Mark is onze specialist op het gebied van hypotheken en financiering. Hij helpt klanten bij het vinden van de beste hypotheek voor hun situatie.",
      certifications: ["WFT Hypotheekadviseur", "AFM Erkend", "VHV Lid"],
      languages: ["Nederlands", "Engels"],
      email: "mark@glodinas.nl",
      phone: "(6) 87 65 43 21",
      linkedin: "#",
      image: "/images/team/mark-janssen.jpg"
    },
    {
      name: "Lisa Vermeulen",
      role: "Verhuurmakelaar",
      experience: "8+ jaar",
      specialization: "Verhuur & Beheer",
      description: "Lisa specialiseert zich in verhuur en beheer van woningen. Zij zorgt voor een professionele afhandeling van alle verhuurprocessen.",
      certifications: ["VBO Makelaar", "Verhuurmakelaar", "WFT Basis"],
      languages: ["Nederlands", "Engels", "Frans"],
      email: "lisa@glodinas.nl",
      phone: "(6) 11 22 33 44",
      linkedin: "#",
      image: "/images/team/lisa-vermeulen.jpg"
    }
  ];

  const teamStats = [
    { number: "50+", label: "Jaar Gecombineerde Ervaring" },
    { number: "750+", label: "Tevreden Klanten" },
    { number: "4.9/5", label: "Gemiddelde Beoordeling" },
    { number: "€85M+", label: "Verkoopvolume" }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Persoonlijke Benadering",
      description: "Elk teamlid kent u persoonlijk en begrijpt uw specifieke behoeften"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Vakkennis & Ervaring",
      description: "Alle teamleden zijn gecertificeerd en hebben jarenlange ervaring"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Teamwork",
      description: "Wij werken samen om het beste resultaat voor u te behalen"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Resultaatgericht",
      description: "Ons team is gefocust op het behalen van uw vastgoeddoelen"
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
              Ons <span className="text-orange-400">Professionele</span> Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Ontmoet de ervaren professionals die u helpen bij al uw vastgoedbehoeften. 
              Persoonlijke service en vakkennis staan centraal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Neem Contact Op
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg border-2 border-white">
                  <Users className="w-5 h-5 mr-2" />
                  Plan Afspraak
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
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

      {/* Team Members */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Teamleden
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ervaren professionals die u persoonlijk begeleiden bij al uw vastgoedbehoeften.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-orange-600 font-semibold mb-2">
                        {member.role}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {member.experience}
                        </span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          {member.specialization}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {member.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Certificeringen</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.certifications.map((cert, certIndex) => (
                          <span key={certIndex} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Talen</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.languages.map((lang, langIndex) => (
                          <span key={langIndex} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{member.email}</span>
                      </a>
                      <a 
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{member.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom Kiezen voor Ons Team?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Onze teamwaarden en werkwijze die het verschil maken in uw vastgoedervaring.
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

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar om Kennis te Maken?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Neem contact op met ons team en ontdek hoe wij u kunnen helpen bij uw vastgoeddoelen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Bel Direct: (6) 81 34 85 51
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg border-2 border-white">
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

export default TeamPage;


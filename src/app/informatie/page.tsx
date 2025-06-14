import React from 'react';
import { Metadata } from 'next';
import { BookOpen, FileText, TrendingUp, Download, ArrowRight, Users, Calendar, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Informatie | Vastgoed Kennis & Resources | Glodinas Makelaardij',
  description: 'Uitgebreide informatie over de vastgoedmarkt, koopgidsen, marktrapportages en actueel vastgoednieuws in Den Haag.',
  keywords: 'vastgoed informatie, koopgids, marktrapportages, blog, Den Haag, vastgoedkennis, Glodinas',
};

const InformatiePage = () => {
  const informationSections = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Blog",
      description: "Blijf op de hoogte van het laatste vastgoednieuws, markttrends en praktische tips",
      features: [
        "Wekelijkse marktanalyses",
        "Praktische kooptips",
        "Duurzaamheidsadvies",
        "Financieringstips"
      ],
      link: "/blog",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Marktrapportages",
      description: "Download gratis marktrapportages over de vastgoedmarkt in Den Haag",
      features: [
        "Kwartaalrapporten",
        "Jaaroverzichten", 
        "Wijkanalyses",
        "Marktvooruitzichten"
      ],
      link: "/marktrapportages",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Koopgids",
      description: "Complete gids voor het kopen van een woning in Den Haag",
      features: [
        "Stap-voor-stap proces",
        "Kosten overzicht",
        "Belangrijke tips",
        "Document checklist"
      ],
      link: "/koopgids",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const latestContent = [
    {
      type: "Blog",
      title: "Vastgoedmarkt Den Haag: Vooruitzichten 2025",
      date: "14 juni 2025",
      excerpt: "Een uitgebreide analyse van de verwachte ontwikkelingen in de Haagse vastgoedmarkt.",
      link: "/blog"
    },
    {
      type: "Rapport",
      title: "Marktrapport Q2 2025 - Den Haag",
      date: "Juni 2025",
      excerpt: "Kwartaalanalyse met de nieuwste marktcijfers en trends voor het tweede kwartaal.",
      link: "/marktrapportages"
    },
    {
      type: "Gids",
      title: "Complete Koopgids 2025",
      date: "Mei 2025",
      excerpt: "Alles wat u moet weten over het kopen van een woning, van voorbereiding tot sleutels.",
      link: "/koopgids"
    }
  ];

  const stats = [
    { number: "50+", label: "Blog artikelen" },
    { number: "12", label: "Marktrapportages" },
    { number: "1000+", label: "Downloads per maand" },
    { number: "4.8/5", label: "Waardering content" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vastgoed <span className="text-orange-400">Informatie</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-100 max-w-3xl mx-auto">
              Uitgebreide kennis en resources voor al uw vastgoedvragen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Lees Blog
                </Button>
              </Link>
              <Link href="/marktrapportages">
                <Button size="lg" className="bg-white text-slate-700 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Rapporten
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
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

      {/* Information Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Informatie Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Toegang tot uitgebreide vastgoedkennis, marktinzichten en praktische gidsen
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {informationSections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    {section.icon}
                    <h3 className="text-2xl font-bold">{section.title}</h3>
                  </div>
                  <p className="text-white/90">
                    {section.description}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {section.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={section.link}>
                    <Button className="w-full bg-slate-600 hover:bg-slate-700">
                      Bekijk {section.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nieuwste Content
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De meest recente artikelen, rapporten en gidsen
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {latestContent.map((content, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {content.type}
                  </span>
                  <span className="text-gray-500 text-sm">{content.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {content.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {content.excerpt}
                </p>
                
                <Link href={content.link}>
                  <Button variant="outline" size="sm">
                    Lees Meer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Blijf op de Hoogte
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Ontvang wekelijks de laatste vastgoedtrends en tips direct in uw inbox
          </p>
          
          <div className="bg-white/10 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">Wekelijks</div>
                <div className="text-sm text-orange-200">Nieuwe content</div>
              </div>
              <div>
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm text-orange-200">Abonnees</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Gratis</div>
                <div className="text-sm text-orange-200">Altijd kosteloos</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Uw e-mailadres"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3">
              Aanmelden
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Heeft u Specifieke Vragen?
          </h2>
          <p className="text-xl mb-8 text-slate-300">
            Neem contact op voor persoonlijk advies over uw vastgoedsituatie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Stel uw Vraag
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-slate-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Plan Gesprek
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default InformatiePage;


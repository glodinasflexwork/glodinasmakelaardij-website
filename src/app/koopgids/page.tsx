import React from 'react';
import { Metadata } from 'next';
import { BookOpen, CheckCircle, Home, Search, Calculator, FileText, Users, Shield, TrendingUp, Clock, Phone, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Koopgids | Complete Gids voor Woningkoop | Glodinas Makelaardij',
  description: 'Uitgebreide koopgids voor het kopen van een woning in Den Haag. Stap-voor-stap begeleiding van zoeken tot sleuteloverdracht.',
  keywords: 'koopgids, woning kopen, Den Haag, koopproces, hypotheek, bezichtiging, onderhandeling, Glodinas',
};

const KoopgidsPage = () => {
  const buyingSteps = [
    {
      step: "1",
      title: "Voorbereiding & Budget",
      description: "Bepaal uw budget en krijg hypotheekadvies",
      details: [
        "Bereken uw maximale hypotheek",
        "Verzamel benodigde documenten",
        "Bepaal uw wensen en eisen",
        "Kies een makelaar"
      ],
      duration: "1-2 weken",
      icon: <Calculator className="w-6 h-6" />
    },
    {
      step: "2", 
      title: "Zoeken & Selecteren",
      description: "Vind woningen die bij u passen",
      details: [
        "Zoek op vastgoedplatforms",
        "Maak een selectie van woningen",
        "Plan bezichtigingen",
        "Vergelijk verschillende opties"
      ],
      duration: "2-8 weken",
      icon: <Search className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Bezichtigen & Beoordelen", 
      description: "Bekijk woningen en beoordeel de staat",
      details: [
        "Voer grondige bezichtigingen uit",
        "Let op constructie en onderhoud",
        "Controleer energielabel",
        "Vraag om bouwkundige keuring"
      ],
      duration: "2-4 weken",
      icon: <Home className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Bod & Onderhandeling",
      description: "Doe een bod en onderhandel over de prijs",
      details: [
        "Bepaal uw biedstrategie",
        "Doe een realistisch bod",
        "Onderhandel over voorwaarden",
        "Sluit de koopovereenkomst"
      ],
      duration: "1-2 weken", 
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      step: "5",
      title: "Financiering & Keuring",
      description: "Regel de hypotheek en laat keuren",
      details: [
        "Dien hypotheekaanvraag in",
        "Plan bouwkundige keuring",
        "Regel verzekeringen",
        "Bereid overdracht voor"
      ],
      duration: "4-6 weken",
      icon: <Shield className="w-6 h-6" />
    },
    {
      step: "6",
      title: "Overdracht & Sleutels",
      description: "Teken bij de notaris en ontvang de sleutels",
      details: [
        "Onderteken bij de notaris",
        "Betaal de koopsom",
        "Ontvang de sleutels",
        "Regel gas, water, licht"
      ],
      duration: "1 dag",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const importantTips = [
    {
      title: "Hypotheek Vooraf Regelen",
      description: "Regel een hypotheekofferte voordat u gaat zoeken. Dit geeft u zekerheid over uw budget en maakt u een serieuze koper.",
      icon: <Calculator className="w-8 h-8" />
    },
    {
      title: "Bouwkundige Keuring",
      description: "Laat altijd een bouwkundige keuring uitvoeren. Dit kan u duizenden euro's besparen aan onverwachte reparaties.",
      icon: <Home className="w-8 h-8" />
    },
    {
      title: "Locatie is Belangrijk",
      description: "Let niet alleen op de woning zelf, maar ook op de buurt, voorzieningen en toekomstige ontwikkelingen.",
      icon: <Search className="w-8 h-8" />
    },
    {
      title: "Onderhandel Slim",
      description: "Een goed bod is realistisch en onderbouwd. Uw makelaar helpt u met de juiste strategie.",
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  const costs = [
    {
      category: "Aankoopkosten",
      items: [
        { name: "Overdrachtsbelasting", percentage: "2%", description: "Van de koopsom" },
        { name: "Notariskosten", amount: "€1.500-2.500", description: "Afhankelijk van koopsom" },
        { name: "Makelaar", percentage: "1-2%", description: "Van de koopsom (incl. BTW)" },
        { name: "Taxatiekosten", amount: "€400-800", description: "Voor hypotheekverstrekker" }
      ]
    },
    {
      category: "Eenmalige Kosten",
      items: [
        { name: "Bouwkundige keuring", amount: "€400-800", description: "Afhankelijk van woningtype" },
        { name: "Hypotheekadvies", amount: "€2.000-4.000", description: "Bij externe adviseur" },
        { name: "Bankgarantie", amount: "€250-500", description: "Voor waarborgsom" },
        { name: "Verhuiskosten", amount: "€500-2.000", description: "Afhankelijk van afstand" }
      ]
    }
  ];

  const checklist = [
    "Budget en hypotheek op orde",
    "Makelaar gekozen",
    "Zoekprofiel bepaald",
    "Bezichtigingen gepland",
    "Bouwkundige keuring geregeld",
    "Verzekeringen onderzocht",
    "Notaris gekozen",
    "Verhuizing voorbereid"
  ];

  const documents = [
    "Geldig identiteitsbewijs",
    "Inkomensverklaring (3 maanden)",
    "Jaaropgave of IB60 formulier",
    "Bankafschriften (3 maanden)",
    "Arbeidscontract",
    "Uittreksel BKR",
    "Eventueel: echtscheidingsconvenant",
    "Eventueel: schenkingsakte"
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
              Complete <span className="text-orange-400">Koopgids</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Alles wat u moet weten over het kopen van een woning in Den Haag
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Download Koopgids PDF
              </Button>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Gratis Koopadvies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Buying Process Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Het Koopproces in 6 Stappen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van voorbereiding tot sleuteloverdracht - zo werkt het koopproces
            </p>
          </div>
          
          <div className="space-y-8">
            {buyingSteps.map((step, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  <div className="flex items-center gap-4 lg:w-1/4">
                    <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="text-indigo-600">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 text-center lg:text-right">
                    <div className="flex items-center gap-2 text-indigo-600 font-medium">
                      <Clock className="w-4 h-4" />
                      {step.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Belangrijke Tips voor Kopers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Praktische adviezen om uw woningkoop succesvol te laten verlopen
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {importantTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-indigo-600 mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-600">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Costs Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kosten bij Woningkoop
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Overzicht van alle kosten die komen kijken bij het kopen van een woning
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {costs.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-600">
                          {item.percentage || item.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="text-orange-600 mt-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tip: Reken op 3-5% extra kosten</h4>
                <p className="text-gray-700">
                  Naast de koopsom moet u rekenen op 3-5% extra kosten voor overdrachtsbelasting, 
                  notaris, makelaar en andere aankoopkosten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents & Checklist */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Required Documents */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Benodigde Documenten
              </h2>
              <p className="text-gray-600 mb-8">
                Deze documenten heeft u nodig voor uw hypotheekaanvraag
              </p>
              
              <div className="space-y-3">
                {documents.map((document, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span className="text-gray-700">{document}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Koopproces Checklist
              </h2>
              <p className="text-gray-600 mb-8">
                Zorg ervoor dat u alle stappen heeft doorlopen
              </p>
              
              <div className="space-y-3">
                {checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar om uw droomhuis te kopen?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Laat ons u begeleiden bij elke stap van het koopproces
          </p>
          
          <div className="bg-white/10 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-indigo-200">Jaar ervaring</div>
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-indigo-200">Succesvolle aankopen</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="text-sm text-indigo-200">Klantbeoordeling</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/Koopgids-2025-GM-Updated.pdf" download="Koopgids-2025-Glodinas-Makelaardij.pdf">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Download Gratis Koopgids
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Start Koopbegeleiding
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Bel: (06) 81 34 85 51
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default KoopgidsPage;


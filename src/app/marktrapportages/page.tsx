import React from 'react';
import { Metadata } from 'next';
import { Download, TrendingUp, BarChart3, FileText, Calendar, MapPin, Euro, Users, Building, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Marktrapportages | Vastgoedmarkt Rapporten | Glodinas Makelaardij',
  description: 'Download gratis marktrapportages over de vastgoedmarkt in Den Haag. Kwartaalrapporten, jaaroverzichten en wijkanalyses.',
  keywords: 'marktrapportages, vastgoedmarkt, rapporten, Den Haag, marktanalyse, kwartaalrapport, Glodinas',
};

const MarktrapportagesPage = () => {
  const latestReport = {
    title: "Marktrapport Q2 2025 - Den Haag",
    description: "Uitgebreide analyse van de vastgoedmarkt in Den Haag voor het tweede kwartaal van 2025",
    date: "Juni 2025",
    pages: 24,
    highlights: [
      "Prijsstijging van 4.2% ten opzichte van vorig jaar",
      "Gemiddelde verkooptijd gedaald naar 28 dagen",
      "Nieuwbouwprojecten zorgen voor meer aanbod",
      "Duurzaamheid wordt steeds belangrijker"
    ]
  };

  const reports = [
    {
      title: "Jaaroverzicht 2024 - Vastgoedmarkt Den Haag",
      description: "Complete analyse van de vastgoedmarkt ontwikkelingen in 2024",
      date: "Januari 2025",
      type: "Jaarrapport",
      pages: 48,
      downloads: 1250,
      featured: true
    },
    {
      title: "Marktrapport Q1 2025 - Den Haag",
      description: "Kwartaalanalyse van de vastgoedmarkt in het eerste kwartaal",
      date: "April 2025",
      type: "Kwartaalrapport",
      pages: 22,
      downloads: 890
    },
    {
      title: "Wijkrapport Benoordenhout 2025",
      description: "Uitgebreide analyse van de vastgoedmarkt in Benoordenhout met prijsontwikkelingen, demografische trends en marktvooruitzichten",
      date: "Juni 2025",
      type: "Wijkrapport",
      pages: 28,
      downloads: 750
    },
    {
      title: "Huurmarkt Rapport Den Haag 2024",
      description: "Uitgebreide analyse van de huurmarkt ontwikkelingen",
      date: "December 2024",
      type: "Themarapport",
      pages: 32,
      downloads: 1100
    },
    {
      title: "Nieuwbouw Monitor Q4 2024",
      description: "Overzicht van nieuwbouwprojecten en ontwikkelingen",
      date: "November 2024",
      type: "Themarapport",
      pages: 20,
      downloads: 720
    },
    {
      title: "Marktrapport Q4 2024 - Den Haag",
      description: "Kwartaalanalyse van het vierde kwartaal 2024",
      date: "Oktober 2024",
      type: "Kwartaalrapport",
      pages: 24,
      downloads: 980
    }
  ];

  const marketStats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Gemiddelde Prijsstijging",
      value: "+4.2%",
      description: "Ten opzichte van vorig jaar",
      color: "text-green-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Verkooptijd",
      value: "28 dagen",
      description: "Gemiddeld op de markt",
      color: "text-blue-600"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Verkochte Woningen",
      value: "2.847",
      description: "In Q2 2025",
      color: "text-purple-600"
    },
    {
      icon: <Euro className="w-8 h-8" />,
      title: "Gemiddelde Prijs",
      value: "€485.000",
      description: "Per woning in Den Haag",
      color: "text-orange-600"
    }
  ];

  const reportTypes = [
    {
      type: "Kwartaalrapporten",
      description: "Driemaandelijkse analyses van markttrends en ontwikkelingen",
      frequency: "4x per jaar",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      type: "Jaaroverzichten",
      description: "Uitgebreide jaarlijkse analyses met vooruitzichten",
      frequency: "1x per jaar",
      icon: <FileText className="w-6 h-6" />
    },
    {
      type: "Wijkanalyses",
      description: "Diepgaande analyses van specifieke wijken en buurten",
      frequency: "Op aanvraag",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      type: "Themarapporten",
      description: "Specialistische rapporten over specifieke onderwerpen",
      frequency: "Variabel",
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-orange-400">Markt</span>rapportages
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
              Gratis toegang tot uitgebreide marktanalyses en vastgoedrapporten
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                <Download className="w-5 h-5 mr-2" />
                <a href="/Jaaroverzicht-2024-Professional-GM.pdf" download="Jaaroverzicht-2024-Vastgoedmarkt-Den-Haag.pdf" className="text-white no-underline">
                  Download Laatste Rapport
                </a>
              </Button>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Vraag Maatwerk Rapport
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Actuele Marktcijfers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De belangrijkste statistieken uit ons laatste marktrapport
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketStats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Report */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nieuwste Rapport
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ons meest recente marktrapport met de laatste inzichten
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <FileText className="w-24 h-24 mx-auto mb-4" />
                  <div className="text-2xl font-bold">{latestReport.pages} pagina's</div>
                  <div className="text-emerald-100">{latestReport.date}</div>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {latestReport.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-lg">
                  {latestReport.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Belangrijkste bevindingen:</h4>
                  <div className="space-y-2">
                    {latestReport.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3">
                  <Download className="w-5 h-5 mr-2" />
                  <a href="/Jaaroverzicht-2024-Professional-GM.pdf" download="Jaaroverzicht-2024-Vastgoedmarkt-Den-Haag.pdf" className="text-white no-underline">
                    Download Gratis
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Soorten Rapporten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verschillende typen marktanalyses voor al uw informatiebehoeften
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reportTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-emerald-600 mb-4 flex justify-center">
                  {type.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {type.type}
                </h3>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <div className="text-sm text-emerald-600 font-medium">
                  {type.frequency}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports Archive */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rapport Archief
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Toegang tot al onze eerdere marktrapportages en analyses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                report.featured ? 'ring-2 ring-emerald-500' : ''
              }`}>
                {report.featured && (
                  <div className="bg-emerald-500 text-white text-sm font-medium px-3 py-1 rounded-full text-center mb-4">
                    Meest Populair
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {report.type}
                    </span>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{report.pages} pagina's</div>
                    <div>{report.downloads} downloads</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {report.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {report.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {report.date}
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    {report.title === "Jaaroverzicht 2024 - Vastgoedmarkt Den Haag" ? (
                      <a href="/Jaaroverzicht-2024-Professional-GM.pdf" download="Jaaroverzicht-2024-Vastgoedmarkt-Den-Haag.pdf" className="text-inherit no-underline">
                        Download
                      </a>
                    ) : report.title === "Wijkrapport Benoordenhout 2025" ? (
                      <a href="/Wijkrapport-Benoordenhout-2025-GM.pdf" download="Wijkrapport-Benoordenhout-2025.pdf" className="text-inherit no-underline">
                        Download
                      </a>
                    ) : report.title === "Nieuwbouw Monitor Q4 2024" ? (
                      <a href="/Nieuwbouw_Monitor_Q4_2024.pdf" download="Nieuwbouw-Monitor-Q4-2024.pdf" className="text-inherit no-underline">
                        Download
                      </a>
                    ) : report.title === "Huurmarkt Rapport Den Haag 2024" ? (
                      <a href="/Huurmarkt_Rapport_Den_Haag_2024.pdf" download="Huurmarkt-Rapport-Den-Haag-2024.pdf" className="text-inherit no-underline">
                        Download
                      </a>
                    ) : (
                      "Download"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3">
              Bekijk Alle Rapporten
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Wilt u een maatwerk marktrapport?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Vraag een op maat gemaakte analyse voor uw specifieke wijk of vastgoedtype
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Vraag Maatwerk Aan
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg">
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

export default MarktrapportagesPage;


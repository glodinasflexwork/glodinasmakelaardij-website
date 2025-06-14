import React from 'react';
import { Metadata } from 'next';
import { TrendingUp, BarChart3, PieChart, LineChart, MapPin, Calendar, Euro, Users, Building, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Marktanalyse Den Haag | Vastgoedmarkt Inzichten | Glodinas Makelaardij',
  description: 'Uitgebreide marktanalyse van de Haagse vastgoedmarkt. Actuele prijsontwikkelingen, trends en vooruitzichten voor kopers en verkopers.',
  keywords: 'marktanalyse, vastgoedmarkt, Den Haag, prijsontwikkeling, markttrends, vastgoed analyse, Glodinas',
};

const MarktanalysePage = () => {
  const marketStats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Prijsstijging 2024",
      value: "+4.2%",
      description: "Gemiddelde waardestijging woningen Den Haag",
      color: "text-green-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Gemiddelde Verkooptijd",
      value: "28 dagen",
      description: "Van eerste bezichtiging tot verkoop",
      color: "text-blue-600"
    },
    {
      icon: <Euro className="w-8 h-8" />,
      title: "Gemiddelde m² Prijs",
      value: "€4.850",
      description: "Per vierkante meter in Den Haag",
      color: "text-purple-600"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Aanbod vs Vraag",
      value: "1:7",
      description: "Verhouding beschikbare woningen vs kopers",
      color: "text-orange-600"
    }
  ];

  const neighborhoodData = [
    { name: "Centrum", avgPrice: "€695.000", change: "+5.2%", trend: "up" },
    { name: "Benoordenhout", avgPrice: "€1.250.000", change: "+3.8%", trend: "up" },
    { name: "Voorburg", avgPrice: "€485.000", change: "+4.1%", trend: "up" },
    { name: "Scheveningen", avgPrice: "€445.000", change: "+6.3%", trend: "up" },
    { name: "Haagse Bos", avgPrice: "€525.000", change: "+3.9%", trend: "up" },
    { name: "Bezuidenhout", avgPrice: "€415.000", change: "+4.7%", trend: "up" }
  ];

  const marketTrends = [
    {
      title: "Duurzaamheid Wordt Belangrijker",
      description: "Energielabel A woningen verkopen 15% sneller dan label C woningen",
      impact: "Hoog"
    },
    {
      title: "Thuiswerken Beïnvloedt Voorkeur",
      description: "Vraag naar woningen met thuiswerkruimte gestegen met 35%",
      impact: "Gemiddeld"
    },
    {
      title: "Buitenruimte Zeer Gewild",
      description: "Woningen met tuin of balkon behalen 8% hogere verkoopprijzen",
      impact: "Hoog"
    },
    {
      title: "Startersmarkt Onder Druk",
      description: "Woningen onder €400.000 zijn binnen 2 weken verkocht",
      impact: "Zeer Hoog"
    }
  ];

  const predictions = [
    "Prijsstijging zal afvlakken naar 2-3% in 2025",
    "Meer aanbod verwacht door nieuwbouwprojecten",
    "Duurzaamheidseisen worden strenger",
    "Hypotheekrente stabiliseert rond 4-4.5%"
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
              <span className="text-orange-400">Marktanalyse</span> Den Haag
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Actuele inzichten in de Haagse vastgoedmarkt voor weloverwogen beslissingen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Persoonlijke Analyse
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Plan Gesprek
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
              Marktcijfers 2024
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De belangrijkste statistieken van de Haagse vastgoedmarkt
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

      {/* Neighborhood Analysis */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wijkanalyse Den Haag
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prijsontwikkelingen per wijk in 2024
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoodData.map((neighborhood, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{neighborhood.name}</h3>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    <span className="font-semibold">{neighborhood.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{neighborhood.avgPrice}</div>
                <p className="text-gray-600">Gemiddelde verkoopprijs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Belangrijke Markttrends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontwikkelingen die de vastgoedmarkt beïnvloeden
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketTrends.map((trend, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">{trend.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trend.impact === 'Zeer Hoog' ? 'bg-red-100 text-red-800' :
                    trend.impact === 'Hoog' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {trend.impact}
                  </span>
                </div>
                <p className="text-gray-600">{trend.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Predictions */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Marktvooruitzichten 2025
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Onze verwachtingen voor de komende periode
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictions.map((prediction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-700">{prediction}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Wilt u een persoonlijke marktanalyse?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Ontvang een op maat gemaakte analyse van uw woning of gewenste buurt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Vraag Analyse Aan
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg">
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

export default MarktanalysePage;


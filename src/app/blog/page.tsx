import React from 'react';
import { Metadata } from 'next';
import { Calendar, User, Tag, ArrowRight, TrendingUp, Home, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog | Vastgoed Nieuws & Tips | Glodinas Makelaardij',
  description: 'Blijf op de hoogte van het laatste vastgoednieuws, markttrends en praktische tips voor kopen, verkopen en huren in Den Haag.',
  keywords: 'vastgoed blog, nieuws, tips, Den Haag, markttrends, kopen, verkopen, huren, Glodinas',
};

const BlogPage = () => {
  const featuredPost = {
    title: "Vastgoedmarkt Den Haag: Vooruitzichten 2025",
    excerpt: "Een uitgebreide analyse van de verwachte ontwikkelingen in de Haagse vastgoedmarkt voor het komende jaar.",
    image: "/api/placeholder/600/300",
    date: "14 juni 2025",
    author: "Cihat Kaya",
    category: "Marktanalyse",
    readTime: "8 min"
  };

  const blogPosts = [
    {
      title: "5 Tips voor Eerste Keer Kopers in Den Haag",
      excerpt: "Praktische adviezen voor starters op de woningmarkt om succesvol een eerste woning te kopen.",
      image: "/api/placeholder/400/250",
      date: "12 juni 2025",
      author: "Sarah de Vries",
      category: "Kooptips",
      readTime: "5 min"
    },
    {
      title: "Energielabel Verbeteren: ROI en Mogelijkheden",
      excerpt: "Hoe energiebesparende maatregelen de waarde van uw woning verhogen en wat de kosten zijn.",
      image: "/api/placeholder/400/250",
      date: "10 juni 2025",
      author: "Mark van der Berg",
      category: "Duurzaamheid",
      readTime: "6 min"
    },
    {
      title: "Verhuurmarkt Den Haag: Trends en Kansen",
      excerpt: "Actuele ontwikkelingen in de huurmarkt en wat dit betekent voor verhuurders en huurders.",
      image: "/api/placeholder/400/250",
      date: "8 juni 2025",
      author: "Lisa Janssen",
      category: "Verhuur",
      readTime: "7 min"
    },
    {
      title: "Hypotheekrente Ontwikkelingen Juni 2025",
      excerpt: "Overzicht van de huidige hypotheekrente en verwachtingen voor de komende maanden.",
      image: "/api/placeholder/400/250",
      date: "6 juni 2025",
      author: "Cihat Kaya",
      category: "Financiering",
      readTime: "4 min"
    },
    {
      title: "Woningwaardering: Wat Bepaalt de Prijs?",
      excerpt: "Factoren die de waarde van uw woning beïnvloeden en hoe u deze kunt optimaliseren.",
      image: "/api/placeholder/400/250",
      date: "4 juni 2025",
      author: "Sarah de Vries",
      category: "Taxatie",
      readTime: "6 min"
    },
    {
      title: "Nieuwbouw vs Bestaande Bouw: Voor- en Nadelen",
      excerpt: "Een vergelijking tussen nieuwbouw en bestaande woningen om u te helpen bij uw keuze.",
      image: "/api/placeholder/400/250",
      date: "2 juni 2025",
      author: "Mark van der Berg",
      category: "Kooptips",
      readTime: "5 min"
    }
  ];

  const categories = [
    { name: "Marktanalyse", count: 12, color: "bg-blue-100 text-blue-800" },
    { name: "Kooptips", count: 18, color: "bg-green-100 text-green-800" },
    { name: "Verkooptips", count: 15, color: "bg-orange-100 text-orange-800" },
    { name: "Verhuur", count: 10, color: "bg-purple-100 text-purple-800" },
    { name: "Financiering", count: 8, color: "bg-red-100 text-red-800" },
    { name: "Duurzaamheid", count: 6, color: "bg-emerald-100 text-emerald-800" }
  ];

  const recentPosts = [
    "Vastgoedmarkt Den Haag: Vooruitzichten 2025",
    "5 Tips voor Eerste Keer Kopers in Den Haag",
    "Energielabel Verbeteren: ROI en Mogelijkheden",
    "Verhuurmarkt Den Haag: Trends en Kansen"
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
              Vastgoed <span className="text-orange-400">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-100 max-w-3xl mx-auto">
              Blijf op de hoogte van het laatste vastgoednieuws, markttrends en praktische tips
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Uitgelicht</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <TrendingUp className="w-24 h-24 text-white" />
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {featuredPost.date}
                    </div>
                  </div>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Lees Meer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recente Artikelen</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-white" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          post.category === 'Kooptips' ? 'bg-green-100 text-green-800' :
                          post.category === 'Duurzaamheid' ? 'bg-emerald-100 text-emerald-800' :
                          post.category === 'Verhuur' ? 'bg-purple-100 text-purple-800' :
                          post.category === 'Financiering' ? 'bg-red-100 text-red-800' :
                          post.category === 'Taxatie' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {post.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Lees Meer
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Load More */}
              <div className="text-center mt-12">
                <Button className="bg-slate-600 hover:bg-slate-700 px-8 py-3">
                  Meer Artikelen Laden
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Categories */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Categorieën</h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recente Posts</h3>
                <div className="space-y-3">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <Link href="#" className="text-gray-700 hover:text-orange-600 transition-colors text-sm">
                        {post}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Nieuwsbrief</h3>
                <p className="mb-4 text-orange-100">
                  Ontvang wekelijks de laatste vastgoedtrends en tips direct in uw inbox.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Uw e-mailadres"
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                  />
                  <Button className="w-full bg-white text-orange-600 hover:bg-gray-100">
                    Aanmelden
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;


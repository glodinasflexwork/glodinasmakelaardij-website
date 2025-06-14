import React from 'react';
import { Metadata } from 'next';
import { Star, Quote, ThumbsUp, Award, TrendingUp, Users, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Reviews & Ervaringen | Glodinas Makelaardij - Klanttevredenheid',
  description: 'Lees de reviews en ervaringen van onze tevreden klanten. Ontdek waarom klanten kiezen voor Glodinas Makelaardij in Den Haag.',
  keywords: 'reviews, ervaringen, klanttevredenheid, Glodinas Makelaardij, testimonials, beoordelingen',
};

const ReviewsPage = () => {
  const overallStats = {
    averageRating: 4.9,
    totalReviews: 127,
    recommendationRate: 98,
    repeatCustomers: 85
  };

  const ratingBreakdown = [
    { stars: 5, percentage: 89, count: 113 },
    { stars: 4, percentage: 9, count: 11 },
    { stars: 3, percentage: 2, count: 3 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 }
  ];

  const featuredReviews = [
    {
      name: "Familie van der Meer",
      location: "Bezuidenhout, Den Haag",
      rating: 5,
      date: "December 2024",
      service: "Woningverkoop",
      review: "Cihat en zijn team hebben ons fantastisch geholpen bij de verkoop van ons huis. Professionele aanpak, eerlijke communicatie en een uitstekend resultaat. Binnen 3 weken verkocht voor de vraagprijs!",
      highlight: "Verkocht binnen 3 weken voor vraagprijs"
    },
    {
      name: "Mark & Sandra Jansen",
      location: "Voorburg",
      rating: 5,
      date: "November 2024",
      service: "Aankoop begeleiding",
      review: "Sarah heeft ons perfect begeleid bij de aankoop van ons eerste huis. Haar kennis van de markt en persoonlijke aandacht maakten het verschil. Zeer tevreden met de service!",
      highlight: "Eerste huis succesvol aangekocht"
    },
    {
      name: "Jennifer Williams",
      location: "Scheveningen",
      rating: 5,
      date: "Oktober 2024",
      service: "Verhuur",
      review: "Lisa heeft mijn appartement binnen een week verhuurd aan uitstekende huurders. Professionele screening en perfecte afhandeling. Kan Glodinas aan iedereen aanbevelen!",
      highlight: "Verhuurd binnen 1 week"
    },
    {
      name: "Ahmed Hassan",
      location: "Laak, Den Haag",
      rating: 5,
      date: "September 2024",
      service: "Hypotheekadvies",
      review: "Mark heeft ons geholpen met een complexe hypotheeksituatie. Zijn expertise en geduld waren onmisbaar. Uiteindelijk een perfecte hypotheek gekregen met uitstekende voorwaarden.",
      highlight: "Complexe hypotheek succesvol geregeld"
    },
    {
      name: "Familie Bakker",
      location: "Ypenburg",
      rating: 5,
      date: "Augustus 2024",
      service: "Taxatie",
      review: "Zeer professionele taxatie voor onze woning. Cihat nam de tijd om alles uitgebreid uit te leggen en de taxatie was zeer accuraat. Uitstekende service!",
      highlight: "Accurate en professionele taxatie"
    },
    {
      name: "Robert de Vries",
      location: "Benoordenhout",
      rating: 5,
      date: "Juli 2024",
      service: "Woningverkoop",
      review: "Tweede keer dat we met Glodinas werken. Weer een vlekkeloze verkoop! Hun kennis van de lokale markt en netwerk van kopers is indrukwekkend.",
      highlight: "Tweede succesvolle samenwerking"
    }
  ];

  const serviceRatings = [
    { service: "Woningverkoop", rating: 4.9, reviews: 45 },
    { service: "Aankoop begeleiding", rating: 4.8, reviews: 32 },
    { service: "Verhuur & Beheer", rating: 4.9, reviews: 28 },
    { service: "Hypotheekadvies", rating: 4.9, reviews: 15 },
    { service: "Taxaties", rating: 5.0, reviews: 7 }
  ];

  const platforms = [
    { name: "Google Reviews", rating: 4.9, reviews: 67, logo: "🔍" },
    { name: "Funda", rating: 4.8, reviews: 34, logo: "🏠" },
    { name: "Makelaar Vergelijken", rating: 4.9, reviews: 26, logo: "⭐" }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Klant <span className="text-orange-400">Reviews</span> & Ervaringen
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Ontdek wat onze klanten zeggen over hun ervaring met Glodinas Makelaardij. 
              Echte verhalen van tevreden klanten.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                {renderStars(overallStats.averageRating)}
                <span className="text-2xl font-bold text-orange-400">
                  {overallStats.averageRating}
                </span>
              </div>
              <div className="text-blue-100">
                Gebaseerd op {overallStats.totalReviews} reviews
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Word Ook Tevreden Klant
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Plan Gratis Gesprek
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {overallStats.averageRating}/5
              </div>
              <div className="text-gray-600 font-medium">
                Gemiddelde Beoordeling
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {overallStats.totalReviews}+
              </div>
              <div className="text-gray-600 font-medium">
                Klantreviews
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {overallStats.recommendationRate}%
              </div>
              <div className="text-gray-600 font-medium">
                Beveelt Ons Aan
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {overallStats.repeatCustomers}%
              </div>
              <div className="text-gray-600 font-medium">
                Terugkerende Klanten
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Breakdown */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Beoordeling Verdeling
          </h2>
          
          <div className="space-y-4">
            {ratingBreakdown.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-20">
                  <span className="text-sm font-medium">{rating.stars}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 w-16 text-right">
                  {rating.count} reviews
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Ratings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Beoordelingen per Dienst
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceRatings.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {service.service}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {renderStars(service.rating)}
                  <span className="font-bold text-orange-600">
                    {service.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {service.reviews} reviews
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recente Klantreviews
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-500">
                    {review.date}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {review.location} • {review.service}
                  </p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-3 mb-4">
                  <p className="text-sm font-medium text-orange-800">
                    {review.highlight}
                  </p>
                </div>

                <blockquote className="text-gray-700 italic">
                  <Quote className="w-5 h-5 text-gray-400 mb-2" />
                  "{review.review}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Platforms */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Beoordeeld op Meerdere Platforms
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-lg p-8">
                <div className="text-4xl mb-4">
                  {platform.logo}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {platform.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {renderStars(platform.rating)}
                  <span className="font-bold text-orange-600">
                    {platform.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {platform.reviews} reviews
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar om Uw Eigen Succesverhaal te Schrijven?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Sluit u aan bij onze tevreden klanten en ervaar zelf onze professionele service.
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
                Plan Gratis Gesprek
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ReviewsPage;


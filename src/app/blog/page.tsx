import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

// Mock blog posts data
const blogPosts = [
  {
    id: 'woningmarkt-update-2025',
    title: 'Woningmarkt Update 2025: Trends en Ontwikkelingen',
    excerpt: 'Een overzicht van de belangrijkste trends en ontwikkelingen op de Nederlandse woningmarkt in 2025. Wat kunnen kopers en verkopers verwachten?',
    content: `
      # Woningmarkt Update 2025: Trends en Ontwikkelingen

      De Nederlandse woningmarkt blijft in beweging, en 2025 brengt nieuwe uitdagingen en kansen met zich mee. In dit artikel bespreken we de belangrijkste trends en ontwikkelingen die we dit jaar verwachten te zien.

      ## Prijsontwikkelingen

      Na jaren van sterke prijsstijgingen zien we nu een stabilisatie in de woningprijzen. In de grote steden zoals Amsterdam, Rotterdam en Den Haag zijn de prijzen nog steeds hoog, maar de extreme stijgingen van de afgelopen jaren lijken voorbij. In sommige regio's zien we zelfs lichte prijsdalingen.

      De gemiddelde woningprijs in Nederland is momenteel €425.000, een stijging van slechts 2% ten opzichte van vorig jaar. Dit is een aanzienlijke afname vergeleken met de jaarlijkse stijgingen van 8-10% die we in de periode 2020-2023 zagen.

      ## Renteontwikkelingen

      De hypotheekrente is een cruciale factor voor de woningmarkt. Na de stijgingen in 2023 en 2024 lijkt de rente nu te stabiliseren rond de 4-4,5% voor een 10-jaars vaste hypotheek. Dit hogere renteniveau heeft de leencapaciteit van potentiële kopers beperkt, wat bijdraagt aan de afkoeling van de markt.

      Experts verwachten dat de rente in 2025 relatief stabiel zal blijven, met mogelijk kleine dalingen tegen het einde van het jaar als de inflatie verder afneemt.

      ## Woningaanbod

      Het woningaanbod blijft een uitdaging in Nederland. Hoewel er meer woningen te koop staan dan in de piekjaren van de verkopersmarkt, is er nog steeds een tekort aan betaalbare woningen, vooral in de grote steden.

      De overheid heeft ambitieuze plannen aangekondigd om de woningbouw te stimuleren, met als doel 100.000 nieuwe woningen per jaar te bouwen. In 2024 werden er ongeveer 75.000 nieuwe woningen opgeleverd, en voor 2025 wordt een vergelijkbaar aantal verwacht.

      ## Duurzaamheid

      Duurzaamheid blijft een belangrijk thema op de woningmarkt. Vanaf 2026 moeten alle kantoorpanden minimaal energielabel C hebben, en soortgelijke regelgeving voor woningen wordt verwacht in de komende jaren.

      Kopers zijn steeds meer geïnteresseerd in energiezuinige woningen, niet alleen vanwege de lagere energiekosten, maar ook vanwege de hogere waarde en betere verkoopbaarheid. Woningen met een goed energielabel (A of B) verkopen gemiddeld sneller en voor een hogere prijs dan vergelijkbare woningen met een slechter label.

      ## Advies voor kopers

      Voor potentiële kopers is 2025 mogelijk een gunstig moment om de woningmarkt te betreden. Met stabiliserende prijzen en een iets ruimer aanbod is er minder concurrentie dan in voorgaande jaren. Toch blijft het belangrijk om:

      1. Uw financiële situatie goed in kaart te brengen en een realistisch budget te bepalen
      2. Verschillende hypotheekaanbieders te vergelijken voor de beste voorwaarden
      3. Geduld te hebben en niet overhaast te beslissen
      4. Een aankoopmakelaar in te schakelen voor professioneel advies en onderhandeling

      ## Advies voor verkopers

      Voor verkopers is het belangrijk om realistisch te zijn over de vraagprijs. De tijd van extreme overbiedingen is grotendeels voorbij. Om uw woning succesvol te verkopen, adviseren wij:

      1. Investeer in een goede presentatie van uw woning, inclusief professionele foto's
      2. Zorg dat uw woning in goede staat is en overweeg kleine renovaties die de waarde kunnen verhogen
      3. Wees flexibel met bezichtigingen
      4. Schakel een ervaren makelaar in die de lokale markt goed kent

      ## Conclusie

      De woningmarkt in 2025 is evenwichtiger dan in voorgaande jaren, maar blijft uitdagend voor zowel kopers als verkopers. Met de juiste voorbereiding en professioneel advies kunt u echter nog steeds succesvol zijn in het kopen of verkopen van een woning.

      Bij Glodinas Makelaardij staan we klaar om u te begeleiden bij elke stap van het proces. Neem contact met ons op voor een persoonlijk adviesgesprek.
    `,
    author: 'Martijn de Vries',
    date: '2025-05-15',
    category: 'Marktanalyse',
    tags: ['woningmarkt', 'trends', '2025', 'prijsontwikkeling'],
    image: '/images/blog/housing-market.jpg',
  },
  {
    id: 'verduurzaming-woning',
    title: 'Verduurzaming van uw woning: investering die loont',
    excerpt: 'Ontdek hoe u uw woning kunt verduurzamen en welke subsidies beschikbaar zijn in 2025. Een duurzame woning is niet alleen goed voor het milieu, maar ook voor uw portemonnee.',
    content: `
      # Verduurzaming van uw woning: investering die loont

      Duurzaamheid staat hoog op de agenda, zowel bij de overheid als bij huiseigenaren. Een duurzame woning is niet alleen beter voor het milieu, maar kan ook leiden tot aanzienlijke besparingen op uw energierekening. In dit artikel bespreken we de verschillende manieren om uw woning te verduurzamen en de subsidies die in 2025 beschikbaar zijn.

      ## Waarom verduurzamen?

      Er zijn verschillende redenen om uw woning te verduurzamen:

      1. **Lagere energiekosten**: Een goed geïsoleerde woning met duurzame energiebronnen verbruikt minder energie, wat leidt tot lagere maandelijkse kosten.
      2. **Hoger comfort**: Betere isolatie zorgt voor een aangenamere temperatuur in huis, zowel in de winter als in de zomer.
      3. **Hogere woningwaarde**: Duurzame woningen zijn meer waard en verkopen sneller dan vergelijkbare niet-duurzame woningen.
      4. **Minder CO2-uitstoot**: Door minder energie te verbruiken, draagt u bij aan een beter milieu.

      ## Populaire verduurzamingsmaatregelen

      ### Isolatie

      Isolatie is vaak de eerste en meest effectieve stap in het verduurzamen van uw woning. De belangrijkste vormen van isolatie zijn:

      - **Dakisolatie**: Bespaart gemiddeld €600 per jaar op uw energierekening
      - **Spouwmuurisolatie**: Bespaart gemiddeld €350 per jaar
      - **Vloerisolatie**: Bespaart gemiddeld €250 per jaar
      - **HR++ of triple glas**: Bespaart gemiddeld €300 per jaar

      ### Duurzame energiebronnen

      Na het verbeteren van de isolatie kunt u overwegen om over te stappen op duurzame energiebronnen:

      - **Zonnepanelen**: Gemiddelde terugverdientijd van 7 jaar, daarna pure winst
      - **Warmtepomp**: Kan uw gasverbruik met 50-80% verminderen
      - **Zonneboiler**: Voor warm water, bespaart ongeveer 50% op uw gasverbruik voor warm water

      ### Slimme systemen

      Moderne technologie kan ook bijdragen aan een duurzamer huis:

      - **Slimme thermostaat**: Bespaart gemiddeld 10-15% op uw verwarmingskosten
      - **Energiemonitoring**: Geeft inzicht in uw energieverbruik, wat kan leiden tot bewuster gebruik
      - **LED-verlichting**: Verbruikt 85% minder energie dan traditionele gloeilampen

      ## Subsidies en financiering in 2025

      De overheid stimuleert woningeigenaren om te verduurzamen met verschillende subsidies:

      ### ISDE (Investeringssubsidie Duurzame Energie)

      Deze subsidie is beschikbaar voor:
      - Warmtepompen (€1.000 - €3.000)
      - Zonneboilers (€700 - €1.400)
      - Isolatiemaatregelen (ongeveer 30% van de kosten)

      ### Energiebespaarlening

      Een lening met een lage rente (1,5-2,5%) specifiek voor verduurzamingsmaatregelen. U kunt tot €65.000 lenen met een looptijd van 7-20 jaar.

      ### BTW-teruggave zonnepanelen

      De BTW op aanschaf en installatie van zonnepanelen kunt u terugvragen bij de Belastingdienst, wat neerkomt op ongeveer 21% korting.

      ### Gemeentelijke subsidies

      Veel gemeenten hebben aanvullende subsidies voor specifieke verduurzamingsmaatregelen. Check de website van uw gemeente voor de mogelijkheden.

      ## Stappenplan voor verduurzaming

      1. **Energiescan**: Begin met een professionele energiescan om te bepalen welke maatregelen het meest effectief zijn voor uw woning.
      2. **Prioriteiten stellen**: Focus eerst op isolatie, dan op installaties en tot slot op energieopwekking.
      3. **Offertes aanvragen**: Vraag meerdere offertes aan bij gecertificeerde bedrijven.
      4. **Subsidies aanvragen**: Vraag beschikbare subsidies aan voordat u begint met de werkzaamheden.
      5. **Uitvoering**: Laat de werkzaamheden uitvoeren door professionals.
      6. **Monitoring**: Houd uw energieverbruik bij om het effect van de maatregelen te meten.

      ## Conclusie

      Verduurzaming van uw woning is een investering die loont, zowel financieel als voor uw wooncomfort. Met de huidige subsidies en de stijgende energieprijzen is 2025 een uitstekend moment om te investeren in duurzaamheid.

      Bij Glodinas Makelaardij adviseren we graag over de impact van verduurzaming op de waarde van uw woning. Neem contact met ons op voor een persoonlijk adviesgesprek.
    `,
    author: 'Sophie Jansen',
    date: '2025-04-22',
    category: 'Duurzaamheid',
    tags: ['verduurzaming', 'isolatie', 'zonnepanelen', 'subsidies'],
    image: '/images/blog/sustainable-home.jpg',
  },
  {
    id: 'den-haag-populaire-wijken-2025',
    title: 'De populairste wijken van Den Haag in 2025',
    excerpt: 'Een overzicht van de meest gewilde wijken in Den Haag dit jaar. Ontdek waar de vraag het hoogst is en wat deze buurten zo aantrekkelijk maakt.',
    content: `
      # De populairste wijken van Den Haag in 2025

      Den Haag, de derde grootste stad van Nederland, blijft een aantrekkelijke plek om te wonen. Met zijn combinatie van stedelijke voorzieningen, culturele rijkdom en nabijheid van het strand, trekt de stad verschillende doelgroepen aan. In dit artikel bespreken we de populairste wijken van Den Haag in 2025 en wat deze buurten zo bijzonder maakt.

      ## 1. Statenkwartier

      Het Statenkwartier blijft een van de meest gewilde wijken van Den Haag. Deze statige buurt, gebouwd in de late 19e en vroege 20e eeuw, kenmerkt zich door prachtige architectuur en brede lanen.

      **Waarom populair:**
      - Prachtige herenhuizen met authentieke details
      - Nabijheid van het strand van Scheveningen (10 minuten fietsen)
      - Uitstekende voorzieningen, waaronder winkels op de Frederik Hendriklaan ("De Fred")
      - Goede scholen in de buurt
      - Rustige, groene omgeving met het Westbroekpark op loopafstand

      **Gemiddelde woningprijs:** €675.000
      **Populair bij:** Gezinnen met kinderen, professionals

      ## 2. Archipelbuurt

      De Archipelbuurt, gelegen naast het centrum, is een charmante wijk met straten vernoemd naar Indonesische eilanden. De buurt staat bekend om zijn statige panden en gezellige sfeer.

      **Waarom populair:**
      - Centrale ligging nabij het centrum
      - Karakteristieke architectuur
      - Diverse restaurants en cafés
      - Het Scheveningse Bosje en het Vredespaleis in de buurt
      - Goede verbindingen met het openbaar vervoer

      **Gemiddelde woningprijs:** €650.000
      **Populair bij:** Jonge professionals, expats, stellen

      ## 3. Belgisch Park

      Belgisch Park, gelegen tussen Scheveningen en het Statenkwartier, wordt steeds populairder. Deze groene wijk biedt een perfecte balans tussen stad en strand.

      **Waarom populair:**
      - Op loopafstand van het strand
      - Ruime woningen met tuinen
      - Rustige, groene omgeving
      - Goede verbindingen naar het centrum
      - Nabijheid van de Scheveningse Bosjes

      **Gemiddelde woningprijs:** €595.000
      **Populair bij:** Gezinnen, strandliefhebbers

      ## 4. Bezuidenhout

      Bezuidenhout heeft de afgelopen jaren een enorme transformatie ondergaan en is uitgegroeid tot een van de meest gewilde wijken van Den Haag.

      **Waarom populair:**
      - Uitstekende verbindingen (nabij station Den Haag Centraal)
      - Mix van historische en moderne architectuur
      - Betaalbaardere woningen dan in andere populaire wijken
      - Haagse Bos op loopafstand
      - Diverse winkels en restaurants

      **Gemiddelde woningprijs:** €425.000
      **Populair bij:** Jonge professionals, starters, forenzen

      ## 5. Zeeheldenkwartier

      Het Zeeheldenkwartier, gelegen tussen het centrum en de Duinoord, is een levendige wijk met een bohemien karakter.

      **Waarom populair:**
      - Bruisende sfeer met veel kleine winkels, cafés en restaurants
      - Karakteristieke panden
      - Centrale ligging
      - Sterke gemeenschapszin
      - Populaire weekmarkt op het Prins Hendrikplein

      **Gemiddelde woningprijs:** €485.000
      **Populair bij:** Jonge stellen, creatievelingen, starters

      ## Opkomende wijken

      Naast de gevestigde favorieten zijn er ook enkele wijken die snel in populariteit stijgen:

      ### Moerwijk

      Lange tijd werd Moerwijk gezien als een probleemwijk, maar dankzij grootschalige renovaties en nieuwbouwprojecten is de buurt bezig met een opmerkelijke comeback.

      **Waarom interessant:**
      - Betaalbare woningen
      - Goede verbindingen met het openbaar vervoer
      - Diverse bevolking
      - Veel groen
      - Stijgende huizenprijzen (goed voor investeerders)

      **Gemiddelde woningprijs:** €295.000
      **Populair bij:** Starters, investeerders

      ### Laakkwartier

      Het Laakkwartier transformeert van een industriële wijk naar een moderne woonwijk met veel nieuwbouw.

      **Waarom interessant:**
      - Betaalbare nieuwbouwwoningen
      - Goede verbindingen met het centrum
      - Multiculturele sfeer met diverse winkels en restaurants
      - Nabijheid van de Haagse Hogeschool en het HMC
      - Stijgend voorzieningenniveau

      **Gemiddelde woningprijs:** €325.000
      **Populair bij:** Studenten, starters, jonge gezinnen

      ## Conclusie

      Den Haag biedt een diverse mix van wijken, elk met hun eigen karakter en charme. Of u nu op zoek bent naar een statig herenhuis in het Statenkwartier, een modern appartement in Bezuidenhout of een betaalbare starterswoning in Moerwijk, Den Haag heeft voor ieder wat wils.

      Bij Glodinas Makelaardij kennen we alle wijken van Den Haag als onze broekzak. We helpen u graag bij het vinden van uw droomwoning in de wijk die het beste bij uw wensen en budget past. Neem contact met ons op voor een persoonlijk adviesgesprek.
    `,
    author: 'Thomas Bakker',
    date: '2025-03-10',
    category: 'Wijkanalyse',
    tags: ['Den Haag', 'wijken', 'populair', 'woningmarkt'],
    image: '/images/blog/den-haag-neighborhood.jpg',
  },
  {
    id: 'hypotheekrente-ontwikkelingen',
    title: 'Hypotheekrente ontwikkelingen: wat kunt u verwachten in 2025?',
    excerpt: 'Een analyse van de hypotheekrenteontwikkelingen en voorspellingen voor de rest van 2025. Wat betekent dit voor uw hypotheek?',
    content: `
      # Hypotheekrente ontwikkelingen: wat kunt u verwachten in 2025?

      De hypotheekrente is een cruciale factor bij het kopen van een woning of het oversluiten van een bestaande hypotheek. In dit artikel analyseren we de recente ontwikkelingen en geven we een vooruitblik voor de rest van 2025.

      ## Huidige situatie

      Na jaren van historisch lage rentepercentages zagen we in 2023 en 2024 een stijging van de hypotheekrente. Deze stijging was het gevolg van de verhoogde beleidsrente door de Europese Centrale Bank (ECB) om de inflatie te beteugelen.

      Momenteel (mei 2025) liggen de hypotheekrentes gemiddeld op:
      - 1 jaar vast: 3,8%
      - 5 jaar vast: 4,1%
      - 10 jaar vast: 4,3%
      - 20 jaar vast: 4,7%

      Dit is een stabilisatie ten opzichte van eind 2024, toen we zelfs lichte dalingen zagen na de piek in het najaar.

      ## Factoren die de hypotheekrente beïnvloeden

      ### Inflatie

      De inflatie is een belangrijke drijfveer voor de renteontwikkeling. Na de hoge inflatie in 2022-2023 zien we nu een normalisering. De huidige inflatie in Nederland ligt rond de 2,3%, wat dicht bij het streefcijfer van de ECB ligt (2%).

      ### ECB-beleid

      De ECB heeft begin 2025 de beleidsrente voor het eerst in anderhalf jaar verlaagd met 0,25 procentpunt. Experts verwachten nog 1-2 renteverlagingen in de rest van 2025, afhankelijk van de inflatieontwikkeling.

      ### Kapitaalmarktrente

      De rente op de kapitaalmarkt (waar banken hun geld lenen) heeft directe invloed op de hypotheekrente. Deze is de afgelopen maanden relatief stabiel gebleven.

      ### Concurrentie tussen geldverstrekkers

      De concurrentie tussen hypotheekverstrekkers is toegenomen, wat een dempend effect heeft op de rentetarieven. Nieuwe spelers op de markt zorgen voor scherpere aanbiedingen.

      ## Verwachtingen voor de rest van 2025

      Op basis van de huidige economische indicatoren en het beleid van de ECB verwachten experts het volgende voor de rest van 2025:

      ### Korte termijn (3-6 maanden)

      - Lichte daling van de hypotheekrente met 0,1-0,3 procentpunt
      - Meer differentiatie in tarieven tussen verschillende geldverstrekkers
      - Extra scherpe actietarieven voor specifieke rentevaste periodes

      ### Middellange termijn (6-12 maanden)

      - Verdere geleidelijke daling van de hypotheekrente met 0,2-0,5 procentpunt
      - Stabilisatie rond een nieuw, lager niveau tegen het einde van het jaar
      - Mogelijk grotere verschillen tussen korte en lange rentevaste periodes

      ## Wat betekent dit voor u?

      ### Als u een woning wilt kopen

      - Overweeg of u nu wilt kopen of wilt wachten op mogelijk lagere rentes
      - Houd er rekening mee dat lagere rentes kunnen leiden tot hogere huizenprijzen
      - Laat u adviseren over de optimale rentevaste periode gezien uw persoonlijke situatie

      ### Als u al een hypotheek heeft

      - Bereken of oversluiten voordelig kan zijn, vooral als u nog een hoge rente betaalt
      - Overweeg rentemiddeling als alternatief voor oversluiten
      - Bekijk of u extra kunt aflossen om uw maandlasten te verlagen

      ### Als u binnenkort uw rentevaste periode moet verlengen

      - Vergelijk aanbiedingen van verschillende geldverstrekkers
      - Overweeg om de rentevaste periode te splitsen in verschillende delen
      - Denk na over de optimale rentevaste periode gezien de huidige marktsituatie

      ## Rentevaste periode kiezen

      Bij het kiezen van een rentevaste periode is het belangrijk om uw persoonlijke situatie in overweging te nemen:

      - **Korte rentevaste periode (1-5 jaar)**: Momenteel het laagste tarief, maar meer onzekerheid over toekomstige rente
      - **Middellange rentevaste periode (6-10 jaar)**: Goede balans tussen tarief en zekerheid
      - **Lange rentevaste periode (15-30 jaar)**: Hoogste tarief, maar maximale zekerheid over uw maandlasten

      ## Conclusie

      De hypotheekrente lijkt in 2025 een dalende trend in te zetten, maar dramatische dalingen worden niet verwacht. Voor huizenkopers en huiseigenaren is het belangrijk om de ontwikkelingen te blijven volgen en persoonlijk advies in te winnen.

      Bij Glodinas Makelaardij werken we samen met onafhankelijke hypotheekadviseurs die u kunnen helpen bij het maken van de juiste keuzes. Neem contact met ons op voor een doorverwijzing naar een van onze partners.
    `,
    author: 'Martijn de Vries',
    date: '2025-05-02',
    category: 'Financieel',
    tags: ['hypotheek', 'rente', 'financiering', 'ECB'],
    image: '/images/blog/mortgage-rates.jpg',
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'Alle categorieën' },
  { id: 'marktanalyse', name: 'Marktanalyse' },
  { id: 'duurzaamheid', name: 'Duurzaamheid' },
  { id: 'wijkanalyse', name: 'Wijkanalyse' },
  { id: 'financieel', name: 'Financieel' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Blog Hero Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Vastgoed Blog</h1>
            <p className="text-lg text-gray-600 mb-8">
              Ontdek de laatste trends, inzichten en tips over de woningmarkt in Den Haag en omgeving.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Input 
                type="text" 
                placeholder="Zoek in artikelen..." 
                className="pl-10 pr-4 py-3 rounded-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 no-scrollbar">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={category.id === 'all' ? 'cta' : 'outline'}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
                <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {blogPosts[0].category}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {blogPosts[0].date}
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {blogPosts[0].title}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {blogPosts[0].excerpt}
              </p>
              
              <div className="flex items-center mb-6">
                <div className="mr-3">
                  <div className="font-semibold">{blogPosts[0].author}</div>
                  <div className="text-sm text-gray-500">Makelaar</div>
                </div>
              </div>
              
              <Link href={`/blog/${blogPosts[0].id}`}>
                <Button variant="cta">
                  Lees artikel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Recente artikelen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ctaOutline" size="sm">
                      Lees meer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Vorige
              </Button>
              <Button variant="cta" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Volgende
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 md:py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Blijf op de hoogte
            </h2>
            <p className="text-gray-600 mb-8">
              Schrijf u in voor onze nieuwsbrief en ontvang de laatste updates over de woningmarkt, nieuwe woningen en tips voor kopers en verkopers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                type="email" 
                placeholder="Uw e-mailadres" 
                className="flex-grow"
              />
              <Button variant="cta">
                Inschrijven
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}


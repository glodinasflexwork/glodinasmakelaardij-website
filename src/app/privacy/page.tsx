import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Privacyverklaring
              </h1>
              <p className="text-xl text-gray-600">
                Laatst bijgewerkt: December 2024
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2>1. Inleiding</h2>
              <p>
                Glodinas Makelaardij respecteert uw privacy en gaat zorgvuldig om met uw persoonlijke gegevens. 
                In deze privacyverklaring leggen wij uit welke gegevens wij verzamelen, waarom wij deze verzamelen 
                en hoe wij deze gebruiken.
              </p>

              <h2>2. Welke gegevens verzamelen wij?</h2>
              <p>Wij kunnen de volgende persoonlijke gegevens van u verzamelen:</p>
              <ul>
                <li>Naam en contactgegevens (adres, telefoonnummer, e-mailadres)</li>
                <li>Financiële informatie relevant voor vastgoedtransacties</li>
                <li>Voorkeuren en wensen betreffende onroerend goed</li>
                <li>Communicatie tussen u en ons</li>
              </ul>

              <h2>3. Waarom verzamelen wij deze gegevens?</h2>
              <p>Wij gebruiken uw persoonlijke gegevens voor:</p>
              <ul>
                <li>Het verlenen van makelaardiensten</li>
                <li>Communicatie over uw opdracht</li>
                <li>Het naleven van wettelijke verplichtingen</li>
                <li>Het verbeteren van onze dienstverlening</li>
              </ul>

              <h2>4. Hoe lang bewaren wij uw gegevens?</h2>
              <p>
                Wij bewaren uw persoonlijke gegevens niet langer dan noodzakelijk voor de doeleinden waarvoor 
                zij zijn verzameld, of zoals vereist door de wet. Voor makelaardiensten geldt een bewaartermijn 
                van 7 jaar na afronding van de opdracht.
              </p>

              <h2>5. Met wie delen wij uw gegevens?</h2>
              <p>
                Wij delen uw gegevens alleen met derden wanneer dit noodzakelijk is voor onze dienstverlening, 
                zoals met notarissen, hypotheekverstrekkers, of wanneer wij hiertoe wettelijk verplicht zijn.
              </p>

              <h2>6. Beveiliging van uw gegevens</h2>
              <p>
                Wij nemen passende technische en organisatorische maatregelen om uw persoonlijke gegevens 
                te beschermen tegen verlies, misbruik, ongeautoriseerde toegang, openbaarmaking, wijziging of vernietiging.
              </p>

              <h2>7. Uw rechten</h2>
              <p>U heeft het recht om:</p>
              <ul>
                <li>Inzage te krijgen in uw persoonlijke gegevens</li>
                <li>Onjuiste gegevens te laten corrigeren</li>
                <li>Uw gegevens te laten verwijderen</li>
                <li>Bezwaar te maken tegen verwerking</li>
                <li>Uw gegevens over te dragen</li>
              </ul>

              <h2>8. Cookies</h2>
              <p>
                Onze website gebruikt functionele cookies om de website goed te laten functioneren. 
                Wij plaatsen geen tracking cookies zonder uw toestemming.
              </p>

              <h2>9. Wijzigingen</h2>
              <p>
                Wij kunnen deze privacyverklaring van tijd tot tijd wijzigen. 
                Wijzigingen worden gepubliceerd op onze website.
              </p>

              <h2>10. Contact</h2>
              <p>
                Voor vragen over deze privacyverklaring of over de verwerking van uw persoonlijke gegevens 
                kunt u contact met ons opnemen via de contactgegevens op onze website.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vragen over uw privacy?</h3>
                <p className="text-gray-600 mb-4">
                  Heeft u vragen over hoe wij omgaan met uw persoonlijke gegevens? Neem gerust contact met ons op.
                </p>
                <Link href="/contact">
                  <span className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                    Neem contact op →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}


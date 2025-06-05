import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Algemene Voorwaarden
              </h1>
              <p className="text-xl text-gray-600">
                Laatst bijgewerkt: December 2024
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2>1. Algemeen</h2>
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle diensten die worden aangeboden door Glodinas Makelaardij, 
                gevestigd in Den Haag, Nederland. Door gebruik te maken van onze diensten gaat u akkoord met deze voorwaarden.
              </p>

              <h2>2. Dienstverlening</h2>
              <p>
                Glodinas Makelaardij biedt professionele makelaardiensten aan, waaronder maar niet beperkt tot:
              </p>
              <ul>
                <li>Bemiddeling bij aan- en verkoop van onroerend goed</li>
                <li>Woningtaxaties en marktanalyses</li>
                <li>Vastgoedinvesteringsadvies</li>
                <li>Onderhandelingen namens klanten</li>
              </ul>

              <h2>3. Verplichtingen van de Klant</h2>
              <p>
                De klant verplicht zich tot het verstrekken van juiste en volledige informatie die relevant is voor de opdracht. 
                De klant dient alle benodigde documenten tijdig aan te leveren.
              </p>

              <h2>4. Vergoeding</h2>
              <p>
                Onze vergoeding wordt vastgesteld conform de geldende NVM-tarieven en wordt vooraf schriftelijk overeengekomen. 
                De vergoeding is verschuldigd bij succesvolle afronding van de opdracht.
              </p>

              <h2>5. Aansprakelijkheid</h2>
              <p>
                Glodinas Makelaardij is aangesloten bij de NVM en beschikt over een beroepsaansprakelijkheidsverzekering. 
                Onze aansprakelijkheid is beperkt tot het bedrag dat door de verzekeraar wordt uitgekeerd.
              </p>

              <h2>6. Privacy</h2>
              <p>
                Wij gaan zorgvuldig om met uw persoonlijke gegevens conform onze{' '}
                <Link href="/privacy" className="text-green-600 hover:text-green-700">
                  privacyverklaring
                </Link>.
              </p>

              <h2>7. Geschillen</h2>
              <p>
                Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter 
                in Den Haag, tenzij partijen kiezen voor mediation via de NVM.
              </p>

              <h2>8. Wijzigingen</h2>
              <p>
                Glodinas Makelaardij behoudt zich het recht voor deze algemene voorwaarden te wijzigen. 
                Wijzigingen worden tijdig gecommuniceerd via onze website.
              </p>

              <div className="bg-green-50 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vragen over deze voorwaarden?</h3>
                <p className="text-gray-600 mb-4">
                  Neem gerust contact met ons op voor verduidelijking van deze algemene voorwaarden.
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


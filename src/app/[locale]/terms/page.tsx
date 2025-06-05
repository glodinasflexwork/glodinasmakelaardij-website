import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <div className="w-24 h-1 bg-green-600 mb-8"></div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Glodinas Makelaardij. These terms and conditions outline the rules and regulations 
                  for the use of our website and real estate services.
                </p>
                <p className="text-gray-600 mb-4">
                  By accessing this website and using our services, you accept these terms and conditions. 
                  Do not continue to use our website if you do not agree to all of the terms and conditions stated on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services</h2>
                <p className="text-gray-600 mb-4">
                  Glodinas Makelaardij provides real estate services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Property valuation and market analysis</li>
                  <li>Buyer representation and guidance</li>
                  <li>Seller services and marketing</li>
                  <li>Investment consulting</li>
                  <li>Negotiation services</li>
                  <li>Market research and analysis</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Professional Standards</h2>
                <p className="text-gray-600 mb-4">
                  Glodinas Makelaardij operates in accordance with Dutch real estate regulations and is committed 
                  to maintaining the highest professional standards. We are members of relevant professional 
                  organizations and adhere to their codes of conduct.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Property Information</h2>
                <p className="text-gray-600 mb-4">
                  While we strive to provide accurate and up-to-date property information, we cannot guarantee 
                  the accuracy, completeness, or timeliness of all information displayed on our website. 
                  Property details, prices, and availability are subject to change without notice.
                </p>
                <p className="text-gray-600 mb-4">
                  All property information should be verified independently, and we recommend conducting 
                  proper due diligence before making any property-related decisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Client Responsibilities</h2>
                <p className="text-gray-600 mb-4">
                  Clients are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Providing accurate and complete information</li>
                  <li>Acting in good faith during all transactions</li>
                  <li>Meeting agreed-upon deadlines and commitments</li>
                  <li>Paying fees and commissions as agreed</li>
                  <li>Complying with all applicable laws and regulations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  Glodinas Makelaardij shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                  or other intangible losses, resulting from your use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy</h2>
                <p className="text-gray-600 mb-4">
                  Your privacy is important to us. Please review our Privacy Statement to understand 
                  how we collect, use, and protect your personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These terms and conditions are governed by and construed in accordance with the laws 
                  of the Netherlands. Any disputes relating to these terms and conditions will be subject 
                  to the exclusive jurisdiction of the Dutch courts.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right to modify these terms and conditions at any time. Changes will be 
                  effective immediately upon posting on our website. Your continued use of our services 
                  after any changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms & Conditions, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-2"><strong>Glodinas Makelaardij</strong></p>
                  <p className="text-gray-600 mb-2">Phone: (6) 81 34 85 51</p>
                  <p className="text-gray-600 mb-2">Email: cihatkaya@glodinas.nl</p>
                  <p className="text-gray-600">Location: Den Haag, Netherlands</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function EnglishTermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Terms & Conditions
              </h1>
              <p className="text-xl text-gray-600">
                Last updated: December 2024
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2>1. General</h2>
              <p>
                These terms and conditions apply to all services offered by Glodinas Makelaardij, 
                located in Den Haag, Netherlands. By using our services, you agree to these terms.
              </p>

              <h2>2. Services</h2>
              <p>
                Glodinas Makelaardij provides professional real estate services, including but not limited to:
              </p>
              <ul>
                <li>Mediation in buying and selling real estate</li>
                <li>Property valuations and market analyses</li>
                <li>Real estate investment advice</li>
                <li>Negotiations on behalf of clients</li>
              </ul>

              <h2>3. Client Obligations</h2>
              <p>
                The client is obligated to provide accurate and complete information relevant to the assignment. 
                The client must provide all necessary documents in a timely manner.
              </p>

              <h2>4. Compensation</h2>
              <p>
                Our compensation is determined in accordance with current NVM rates and is agreed upon in writing in advance. 
                The compensation is due upon successful completion of the assignment.
              </p>

              <h2>5. Liability</h2>
              <p>
                Glodinas Makelaardij is affiliated with NVM and has professional liability insurance. 
                Our liability is limited to the amount paid out by the insurer.
              </p>

              <h2>6. Privacy</h2>
              <p>
                We handle your personal data carefully in accordance with our{' '}
                <Link href="/en/privacy" className="text-green-600 hover:text-green-700">
                  privacy policy
                </Link>.
              </p>

              <h2>7. Disputes</h2>
              <p>
                Dutch law applies to all agreements. Disputes will be submitted to the competent court 
                in Den Haag, unless parties choose mediation through NVM.
              </p>

              <h2>8. Changes</h2>
              <p>
                Glodinas Makelaardij reserves the right to modify these terms and conditions. 
                Changes will be communicated in a timely manner via our website.
              </p>

              <div className="bg-green-50 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions about these terms?</h3>
                <p className="text-gray-600 mb-4">
                  Feel free to contact us for clarification of these terms and conditions.
                </p>
                <Link href="/en/contact">
                  <span className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                    Contact us →
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


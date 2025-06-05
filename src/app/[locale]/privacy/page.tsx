import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Privacy Statement
            </h1>
            <div className="w-24 h-1 bg-green-600 mb-8"></div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Glodinas Makelaardij respects your privacy and is committed to protecting your personal data. 
                  This privacy statement explains how we collect, use, and protect your information when you 
                  use our website and services.
                </p>
                <p className="text-gray-600 mb-4">
                  This privacy statement complies with the General Data Protection Regulation (GDPR) and 
                  Dutch privacy laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Data Controller</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                  <p className="text-gray-600 mb-2"><strong>Glodinas Makelaardij</strong></p>
                  <p className="text-gray-600 mb-2">Contact: Cihat Kaya</p>
                  <p className="text-gray-600 mb-2">Phone: (6) 81 34 85 51</p>
                  <p className="text-gray-600 mb-2">Email: cihatkaya@glodinas.nl</p>
                  <p className="text-gray-600">Location: Den Haag, Netherlands</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We may collect the following types of personal information:
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Information:</h3>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                  <li>Name and contact details</li>
                  <li>Email address and phone number</li>
                  <li>Postal address</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Property-Related Information:</h3>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                  <li>Property preferences and requirements</li>
                  <li>Financial information relevant to property transactions</li>
                  <li>Property viewing history and feedback</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Website Usage:</h3>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use your personal information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Providing real estate services and property consultations</li>
                  <li>Communicating about properties and market updates</li>
                  <li>Processing property transactions and agreements</li>
                  <li>Improving our website and services</li>
                  <li>Complying with legal obligations</li>
                  <li>Marketing our services (with your consent)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Legal Basis for Processing</h2>
                <p className="text-gray-600 mb-4">
                  We process your personal data based on:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li><strong>Contract performance:</strong> To provide our real estate services</li>
                  <li><strong>Legitimate interests:</strong> To improve our services and communicate about relevant properties</li>
                  <li><strong>Consent:</strong> For marketing communications and non-essential cookies</li>
                  <li><strong>Legal obligation:</strong> To comply with real estate regulations and tax requirements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Other parties involved in property transactions (buyers, sellers, notaries, banks)</li>
                  <li>Professional service providers (lawyers, surveyors, mortgage advisors)</li>
                  <li>Government authorities when required by law</li>
                  <li>Trusted third-party service providers who assist in our operations</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
                <p className="text-gray-600 mb-4">
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Provide our services to you</li>
                  <li>Comply with legal obligations (typically 7 years for financial records)</li>
                  <li>Resolve disputes and enforce our agreements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  Under GDPR, you have the following rights:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Erasure:</strong> Request deletion of your data (right to be forgotten)</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Withdraw consent:</strong> For processing based on consent</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  To exercise these rights, please contact us using the information provided above.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies</h2>
                <p className="text-gray-600 mb-4">
                  Our website uses cookies to improve your browsing experience. We use:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li><strong>Essential cookies:</strong> Required for website functionality</li>
                  <li><strong>Analytics cookies:</strong> To understand how visitors use our website</li>
                  <li><strong>Marketing cookies:</strong> To show relevant advertisements (with consent)</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal 
                  data against unauthorized access, alteration, disclosure, or destruction. However, no 
                  internet transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Transfers</h2>
                <p className="text-gray-600 mb-4">
                  Your personal data is primarily processed within the European Union. If we transfer 
                  data outside the EU, we ensure appropriate safeguards are in place to protect your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Statement</h2>
                <p className="text-gray-600 mb-4">
                  We may update this privacy statement from time to time. We will notify you of any 
                  significant changes by posting the new privacy statement on our website and updating 
                  the &ldquo;last updated&rdquo; date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this privacy statement or our data practices, 
                  please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-2"><strong>Glodinas Makelaardij</strong></p>
                  <p className="text-gray-600 mb-2">Phone: (6) 81 34 85 51</p>
                  <p className="text-gray-600 mb-2">Email: cihatkaya@glodinas.nl</p>
                  <p className="text-gray-600">Location: Den Haag, Netherlands</p>
                </div>
                <p className="text-gray-600 mb-4">
                  You also have the right to lodge a complaint with the Dutch Data Protection Authority 
                  (Autoriteit Persoonsgegevens) if you believe we have not handled your personal data appropriately.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


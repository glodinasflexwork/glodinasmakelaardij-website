import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function EnglishPrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600">
                Last updated: December 2024
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Glodinas Makelaardij respects your privacy and handles your personal data carefully. 
                In this privacy policy, we explain what data we collect, why we collect it, 
                and how we use it.
              </p>

              <h2>2. What data do we collect?</h2>
              <p>We may collect the following personal data from you:</p>
              <ul>
                <li>Name and contact details (address, phone number, email address)</li>
                <li>Financial information relevant to real estate transactions</li>
                <li>Preferences and wishes regarding real estate</li>
                <li>Communication between you and us</li>
              </ul>

              <h2>3. Why do we collect this data?</h2>
              <p>We use your personal data for:</p>
              <ul>
                <li>Providing real estate services</li>
                <li>Communication about your assignment</li>
                <li>Complying with legal obligations</li>
                <li>Improving our services</li>
              </ul>

              <h2>4. How long do we keep your data?</h2>
              <p>
                We do not keep your personal data longer than necessary for the purposes for which 
                they were collected, or as required by law. For real estate services, a retention period 
                of 7 years applies after completion of the assignment.
              </p>

              <h2>5. With whom do we share your data?</h2>
              <p>
                We only share your data with third parties when necessary for our services, 
                such as with notaries, mortgage providers, or when we are legally obligated to do so.
              </p>

              <h2>6. Security of your data</h2>
              <p>
                We take appropriate technical and organizational measures to protect your personal data 
                against loss, misuse, unauthorized access, disclosure, alteration, or destruction.
              </p>

              <h2>7. Your rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct incorrect data</li>
                <li>Have your data deleted</li>
                <li>Object to processing</li>
                <li>Transfer your data</li>
              </ul>

              <h2>8. Cookies</h2>
              <p>
                Our website uses functional cookies to make the website work properly. 
                We do not place tracking cookies without your consent.
              </p>

              <h2>9. Changes</h2>
              <p>
                We may change this privacy policy from time to time. 
                Changes will be published on our website.
              </p>

              <h2>10. Contact</h2>
              <p>
                For questions about this privacy policy or about the processing of your personal data, 
                you can contact us via the contact details on our website.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions about your privacy?</h3>
                <p className="text-gray-600 mb-4">
                  Do you have questions about how we handle your personal data? Feel free to contact us.
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


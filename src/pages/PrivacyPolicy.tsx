
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const PrivacyPolicyPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              GGL (USA) Ltd - We are committed to protecting your privacy
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to GGL (USA) Ltd ["GGL (USA)", "we", "our", "us"]. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. We urge you to carefully read the following to comprehend how we collect, utilize, and safeguard your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Our Commitment to Privacy
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Limited Data Collection</h3>
                  <p className="text-gray-700 leading-relaxed">
                    At GGL (USA), we adhere to strict privacy principles by collecting only the essential information necessary for efficient communication. This streamlined approach simplifies user interactions and minimizes the exposure of personal details.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Voluntary Disclosure</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Users at GGL (USA) have full control over the information they choose to share. Our policy emphasizes voluntary data submission, empowering users to determine the extent of their engagement.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">User Empowerment</h3>
                  <p className="text-gray-700 leading-relaxed">
                    At GGL (USA), we prioritize user control over their personal information. We empower users to manage their privacy settings and preferences according to their needs.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                What Data Do We Gather?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At GGL (USA), we prioritize minimal data collection to optimize user interactions and facilitate effective communication. The information we collect includes:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Name</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Users can voluntarily provide their names when they contact us through our website's contact form or other communication channels for personalized interactions.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Email Address</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We use email addresses to establish efficient communication, allowing us to respond to inquiries promptly and provide updates about our services.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Phone Number</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Users may provide phone numbers to enable direct communication or receive service-related updates. Phone numbers are kept confidential and used only for communication purposes.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At GGL (USA), we are committed to using information responsibly:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Personalizing user experience and interactions</li>
                <li>Enhancing communication and customer support</li>
                <li>Improving our services based on user feedback</li>
                <li>Processing orders and transactions efficiently</li>
                <li>Ensuring security and preventing fraud</li>
                <li>Compliance with legal obligations when required</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Information Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At GGL (USA), the security and confidentiality of your information are our highest priorities. We implement comprehensive measures including data encryption, secure access controls, regular security audits, and employee training to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Your Choices and Rights
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You have various choices regarding your information including managing communication preferences, accessing and updating your information, requesting data deletion, and controlling cookie preferences. You can exercise these rights by contacting our privacy team.
              </p>
            </section>
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Questions About This Privacy Policy?
            </h3>
            <p className="text-blue-800 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-brand-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-navy/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500 text-center">
            Last updated: December 2023
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;

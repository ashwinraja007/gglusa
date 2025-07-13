
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const TermsOfUsePage: React.FC = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Use Agreement</h1>
            <p className="text-lg text-gray-600">
              For the GGL (USA) LLC Website
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Welcome to the GGL (USA) LLC. website (hereinafter referred to as the 'Website'). Please review these terms of use carefully before engaging with the Website. Your access and utilization of the Website are governed by these terms of use (hereinafter referred to as the 'Terms of Use'). By accessing or using the Website, you agree to be legally bound by these Terms of Use, representing both yourself and the entity you are authorized to act on behalf of (hereinafter referred to as 'you' or 'your'). If you do not accept all the Terms of Use, refrain from accessing or utilizing the Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                User Eligibility
              </h2>
              <p className="text-gray-700 leading-relaxed">
                GGL (USA) provides the Website exclusively to entities and individuals who have reached the legal age of majority and have the legal capacity to enter into binding agreements under the applicable law in United States of America. If you do not meet these criteria, you are not authorized to use the Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Scope of Terms of Use
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Use govern your use of the Website and all related applications, software, and services, collectively referred to as "Services," except where a separate agreement applies. Specific terms or agreements, known as "Service Agreements," may apply to certain Services or items provided through the Website. These Service Agreements will either accompany the relevant Services or be accessible via an associated hyperlink.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Modifications
              </h2>
              <p className="text-gray-700 leading-relaxed">
                GGL (USA) reserves the right to modify these Terms of Use at any time. Your continued use of the Website after any changes signifies your acceptance of such modifications. GGL (USA) may alter, supplement, delete, or update any aspect of the Website without notice and may adjust or introduce fees for products and services at its sole discretion. General practices and restrictions regarding other GGL (USA) products and services may also be established or modified at any time, based on GGL (USA)'s sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Privacy Notice
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By providing any individual's personal information to GGL (USA), you affirm that you have obtained all necessary consents for the processing of such personal information as required by the Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                License and Ownership
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  All intellectual property rights ("Intellectual Property") related to the Website and its contents (the "Content") are the exclusive property of GGL (USA), its affiliates, or third parties, and are protected by intellectual property laws in United States of America and globally. Various elements of the Website are also protected by trade name, trade secret, unfair competition, and other laws, prohibiting any copying or imitation.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  GGL (USA) grants you a limited, personal, non-transferable, non-sublicensable, and revocable license to access and use the Website, Content, and Services as presented by GGL (USA) and only as expressly permitted.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Restrictions on Website Use
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In addition to the limitations outlined in these Terms of Use, you agree to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You must not conceal the origin of information transmitted through the Website.</li>
                <li>You shall refrain from placing false or misleading information on the Website.</li>
                <li>Usage or access of any service, information, application, or software available via the Website is restricted to methods expressly permitted by GGL (USA).</li>
                <li>Uploading information containing viruses, malware, or other harmful programming is strictly prohibited.</li>
                <li>Specific sections of the Website are exclusive to GGL (USA) customers.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Termination
              </h2>
              <p className="text-gray-700 leading-relaxed">
                GGL (USA) reserves the right to terminate or suspend your use of the Website, GGL (USA) Systems, Information, Services, and Content at its sole discretion, without prior notice or reason. Upon termination or suspension, you must immediately cease using the Website and destroy any copies of the Content you have made.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Disclaimer of Warranties
              </h2>
              <p className="text-gray-700 leading-relaxed">
                GGL (USA) makes no guarantees regarding the results you may achieve by using the Website. You use these elements at your own risk, and they are provided "as is." To the fullest extent permitted by law, GGL (USA) disclaims all warranties, whether express, implied, statutory, or otherwise.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, these Terms of Use are governed by the internal laws of United States of America, and the courts in United States of America shall have sole and exclusive jurisdiction over any disputes arising from or related to these Terms of Use.
              </p>
            </section>
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Questions About These Terms?
            </h3>
            <p className="text-blue-800 mb-4">
              If you have any questions about these Terms of Use, please don't hesitate to contact us.
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

export default TermsOfUsePage;

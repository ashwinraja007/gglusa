import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";

// ✅ If image is in /public folder, no need to import it
// If you use an image in /src/assets, use this instead:
// import trucksImg from '@/assets/trucks.png';

const Transportation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 text-center md:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                >
                  Liquid Cargo Transportation
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg text-gray-700 mb-6"
                >
                  Reliable handling and distribution of liquid cargo across domestic and international routes.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-brand-gold hover:bg-amber-400 text-brand-navy font-medium rounded-md shadow-md transition-all"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </div>

              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden shadow-xl"
                >
                  <AspectRatio ratio={16 / 9}>
                    <img
                      alt="GGL India truck transporting liquid cargo"
                      src="/trucks.png" // or use {trucksImg} if imported
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Card Content Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-10 md:p-14 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                LIQUID CARGO TRANSPORTATION
              </h2>
              <div className="w-20 h-1 bg-brand-gold mb-8"></div>

              <p className="text-gray-700 mb-6 text-justify">
                At GGL India, we specialize in the secure and efficient transportation of liquid cargo. Our expert handling processes, dedicated fleet, and specialized containers ensure safe movement of bulk liquids across regions, meeting both safety and compliance standards.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-8">Specialized Liquid Transport Fleet</h3>
              <p className="text-gray-700 mb-6 text-justify">
                Our fleet is equipped with ISO tank containers, flexitanks, and dedicated tankers designed for the safe transport of various types of liquid cargo, including chemicals, oils, and food-grade liquids.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-8">Compliance & Safety</h3>
              <p className="text-gray-700 mb-4 text-justify">
                GGL adheres strictly to international safety standards and environmental regulations. Our operations prioritize:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Hazardous and non-hazardous liquid cargo segregation</li>
                <li>Temperature-controlled transport options</li>
                <li>Real-time GPS tracking and monitoring</li>
                <li>Emergency response protocols</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-8">Liquid Distribution Services</h3>
              <p className="text-gray-700 mb-4 text-justify">
                We offer end-to-end solutions for your liquid logistics needs, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Bulk liquid transportation (domestic & international)</li>
                <li>Intermediate storage and tank cleaning</li>
                <li>Last-mile delivery with safety compliance</li>
                <li>Return logistics and reverse liquid collection</li>
              </ul>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-brand-navy to-blue-700 rounded-xl text-white p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Need Expert Liquid Logistics?</h3>
              <p className="mb-6 text-blue-50">
                Partner with GGL India for safe and compliant bulk liquid transportation.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-brand-navy px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Transportation;

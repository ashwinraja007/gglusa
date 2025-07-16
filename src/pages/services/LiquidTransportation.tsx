import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
                      src="/trucks.png"
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-10 md:p-14 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Specialized Expertise in Liquid Transportation
              </h2>
              <div className="w-20 h-1 bg-brand-gold mb-8"></div>

              <p className="text-gray-700 mb-6 text-justify">
                Transporting liquid cargo demands specialized expertise, and we provide comprehensive solutions ensuring the safe and efficient delivery of your valuable cargo. Understanding the unique challenges of liquid transport, whether chemicals, food-grade products, or other bulk items, we utilize a specialized fleet and equipment—including ISO tanks, flexitanks, and specialized tankers—managed by a team trained in strict safety protocols.
              </p>

              <p className="text-gray-700 mb-6 text-justify">
                We offer end-to-end logistics, encompassing pre-shipment planning, route optimization, regulatory compliance, temperature-controlled transportation for sensitive cargo, secure loading/unloading, and real-time tracking. Our commitment to safety and reliability guarantees your cargo arrives in perfect condition and on time, making us a trusted partner for both domestic and international transportation needs.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm text-center">
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Specialized Equipment</h4>
                  <p className="text-gray-700 text-sm">ISO tanks, flexitanks, and specialized tankers for all cargo types</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm text-center">
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">End-to-End Logistics</h4>
                  <p className="text-gray-700 text-sm">Complete solutions from planning to delivery</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm text-center">
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Temperature Control</h4>
                  <p className="text-gray-700 text-sm">Maintain optimal conditions for sensitive cargo</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm text-center">
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Safety First</h4>
                  <p className="text-gray-700 text-sm">Strict protocols and trained personnel handle your cargo</p>
                </div>
              </div>
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

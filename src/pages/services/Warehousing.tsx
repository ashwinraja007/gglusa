import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Warehouse } from "lucide-react";
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Warehousing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  WAREHOUSING-3PL
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-lg text-gray-700 mb-6">
                  The GGL Group operates an extensive one million square feet of warehouse space, utilizing our advanced Warehouse Management Systems (WMS). Our in-house team of 26 highly experienced programmers have developed this system.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <Link to="/contact" className="px-6 py-3 bg-brand-gold hover:bg-amber-400 text-brand-navy font-medium rounded-md shadow-md transition-all">
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="rounded-xl overflow-hidden shadow-xl">
                  <AspectRatio ratio={16 / 9}>
                    <img alt="Warehousing Service" className="w-full h-full object-cover" src="/lovable-uploads/a00a6bca-afed-43ec-bb45-775ec956dc8d.jpg" />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Warehousing Management Excellence
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>

              <p className="text-gray-700 mb-6 text-justify font-normal text-lg leading-relaxed">
                The GGL Group operates an extensive one million square feet of warehouse space, utilizing our advanced Warehouse Management Systems (WMS). Our in-house team of 26 highly experienced programmers, who are industry specialists, have developed this system, allowing us to offer customized solutions tailored to the unique requirements of each client.
              </p>

              <p className="text-gray-700 mb-6 text-justify font-normal text-lg leading-relaxed">
                When onboarding new clients, we dedicate time to thoroughly understand their specific business needs. Through our integrated total solutions approach, we develop customized solutions that provide total visibility and transparency throughout the supply chain.
              </p>

              <h3 className="text-xl font-semibold text-brand-navy mt-8 mb-4">Our WMS encompasses a comprehensive set of features and steps:</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Advance Shipment Note (ASN)</li>
                <li>Goods Receipt Note (GRN)</li>
                <li>Goods Issue Note (GIO)</li>
                <li>Goods Delivery Note/Delivery Order (GDN)</li>
                <li>Stock Movement/Stock Relocation</li>
                <li>Reworking</li>
                <li>Serial Number, ASN, GRN upload option</li>
                <li>MIS Reports/MIS Dashboard</li>
                <li>Tracking</li>
                <li>Barcode scanning</li>
                <li>PDT (Portable Data Terminal) enabled</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-navy mt-10 mb-4">Key features of our WMS system include:</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Cloud-based Online Warehouse Management System</li>
                <li>Online tracking</li>
                <li>Online access for customers to access information across multiple locations</li>
                <li>Multi-customer, multi-location warehouse management for 3PL operations</li>
                <li>Advanced location management for optimizing warehouse usage</li>
                <li>Order re-cycle management</li>
                <li>B2B Integration with Customers' ERP for seamless online information updates through EDI</li>
                <li>Bar code generation and scanning capabilities</li>
                <li>PDT enabled, allowing the use of handheld terminals for put-away, picking, and cycle counting</li>
                <li>A "Live Scanning" feature providing real-time visibility to clients, reducing GRN time and ensuring immediate availability of cargo for ordering to their customers</li>
              </ul>

              <p className="text-gray-700 mt-6 text-justify font-normal text-lg leading-relaxed">
                Our WMS system is meticulously designed to adapt to various situations, countries, and infrastructure, ensuring optimal performance in any environment.
              </p>

              <p className="text-gray-700 mt-6 text-justify font-normal text-lg leading-relaxed">
                At GGL, our commitment to delivering exceptional warehouse management solutions remains unwavering, and our in-house developed WMS system is a testament to our dedication to providing customized, efficient, and technologically advanced services to our clients.
              </p>
            </div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="bg-gradient-to-r from-brand-navy to-blue-700 rounded-xl text-white p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Ready to Optimize Your Storage?</h3>
              <p className="mb-6 text-blue-50">
                Contact our team today for tailored warehousing solutions.
              </p>
              <Link to="/contact" className="inline-block bg-white text-brand-navy px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Warehousing;

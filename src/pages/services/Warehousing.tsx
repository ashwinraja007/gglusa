import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Warehouse, Package, Box, Globe, FileCheck, Shield, Truck, MapPin, Timer, Gauge, Thermometer } from "lucide-react";
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
const Warehousing = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                 <motion.h1 initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }} className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  WAREHOUSING-3PL
                </motion.h1>
                <motion.p initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.1
              }} className="text-lg text-gray-700 mb-6">The GGL Group operates an extensive one million square feet of warehouse space, utilizing our advanced Warehouse Management Systems (WMS). Our in-house team of 26 highly experienced programmers have developed this system.</motion.p>
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.2
              }}>
                  <Link to="/contact" className="px-6 py-3 bg-brand-gold hover:bg-amber-400 text-brand-navy font-medium rounded-md shadow-md transition-all">
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <motion.div initial={{
                opacity: 0,
                scale: 0.95
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 0.5
              }} className="rounded-xl overflow-hidden shadow-xl">
                  <AspectRatio ratio={16 / 9}>
                    <img alt="Warehousing Service" className="w-full h-full object-cover" src="/lovable-uploads/6443996b-8be8-4116-b844-0847fca71e52.png" />
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
                WMS Features and Steps
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              <ul className="text-gray-700 space-y-4 text-justify">
                <li><strong>Advance Shipment Note (ASN)</strong></li>
                <li><strong>Goods Receipt Note (GRN)</strong></li>
                <li><strong>Goods Issue Note (GIN)</strong></li>
                <li><strong>Goods Delivery Note/Delivery Order (GDN)</strong></li>
                <li><strong>Stock Movement/Stock Relocation</strong></li>
                <li><strong>Reworking</strong></li>
                <li><strong>Serial Number, ASN, GRN upload option</strong></li>
                <li><strong>MIS Reports/MIS Dashboard</strong></li>
                <li><strong>Tracking</strong></li>
                <li><strong>Barcode scanning</strong></li>
                <li><strong>PDT (Portable Data Terminal) enabled</strong></li>
              </ul>
            </div>

            {/* Key Features */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Key Features of Our WMS System
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              <ul className="text-gray-700 space-y-4 text-justify">
                <li><strong>Cloud-based Online Warehouse Management System</strong></li>
                <li><strong>Online tracking</strong></li>
                <li><strong>Online access for customers</strong> to access information across multiple locations</li>
                <li><strong>Multi-customer, multi-location warehouse management</strong> for 3PL operations</li>
                <li><strong>Advanced location management</strong> for optimizing warehouse usage</li>
                <li><strong>Order re-cycle management</strong></li>
                <li><strong>B2B integration with Customers' ERP</strong> for seamless online information updates through EDI</li>
                <li><strong>Bar code generation and scanning capabilities</strong></li>
                <li><strong>PDT enabled</strong>, allowing the use of handheld terminals for put-away, picking, and cycle counting</li>
                <li><strong>A "Live Scanning" feature</strong> providing real-time visibility to clients, reducing GRN time and ensuring immediate availability of cargo for ordering to their customers</li>
              </ul>
              <p className="text-gray-700 mt-6 text-justify font-normal text-lg leading-relaxed">
                Our WMS system is meticulously designed to adapt to various situations, countries, and infrastructure, ensuring optimal performance in any environment.
              </p>
            </div>

           
            {/* CTA */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} viewport={{
            once: true
          }} className="bg-gradient-to-r from-brand-navy to-blue-700 rounded-xl text-white p-8 text-center">
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
    </div>;
};
export default Warehousing;
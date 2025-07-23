import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Plane, Clock, Globe, Headset } from "lucide-react";
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AirFreight = () => {
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
                  Air Freight Solutions
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-lg text-gray-700 mb-6">
                  Tailored air freight solutions to meet your unique requirements
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
                    <img alt="Air Freight Service" className="w-full h-full object-cover" src="/lovable-uploads/be9bf1ab-8fbc-4e1e-b259-4e81ed0231be.jpg" />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content with Updated Text */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                Comprehensive Air Freight Services
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>

              <p className="text-gray-700 mb-6 text-justify font-normal">
                At GGL, we provide a comprehensive range of air freight services designed to meet all your shipping needs. Our expert air freight teams offer seamless air import, export, and express options, all on a convenient door-to-door basis. GGL stands out with competitive rates.
              </p>

              <p className="text-gray-700 mb-6 text-justify font-normal">
                Tailored air freight solutions to meet your unique requirements. We understand that every shipment is different. That's why we offer flexible air freight solutions designed to meet your specific needs. Whether you're shipping time-sensitive documents or large-scale cargo, we have the expertise and resources to handle it efficiently.
              </p>

              <p className="text-gray-700 mb-6 text-justify font-normal">
                Our comprehensive services include air imports, exports, and express deliveries, all with the convenience of door-to-door service. We pride ourselves on our competitive pricing and our unwavering commitment to providing exceptional customer support. Let us optimize your air freight logistics and ensure your shipments reach their destinations seamlessly.
              </p>
            </div>

            {/* CTA Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="bg-gradient-to-r from-brand-navy to-blue-700 rounded-xl text-white p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Ready to Ship with Us?</h3>
              <p className="mb-6 text-blue-50">
                Contact our team today for tailored air freight solutions.
              </p>
              <Link to="/contact" className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
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

export default AirFreight;

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

        {/* Main Content with Replaced Text */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                Comprehensive Air Freight Services
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>

              <p className="text-gray-700 mb-6 text-justify font-normal">
                GGL's highly skilled team has perfected an efficient and strategic process for seamlessly transporting freight across our extensive network, starting from its origin and reaching its desired destination. We utilize a diverse range of transportation modes, intermediaries, and cutting-edge technologies to ensure optimal results. Our expertise in logistics and supply chain management, coupled with our physical assets such as trucks, distribution centers, and warehouses, enables us to move freight with utmost efficiency and cost-effectiveness.
              </p>

              <p className="text-gray-700 mb-6 text-justify font-normal">
                At GGL, we are at the forefront of the industry, continuously developing and deploying the latest technologies. Our dedicated in-house team manages these technologies, allowing us to stay ahead of the curve. Some of the modules currently employed by our esteemed clients include:
              </p>

              <ul className="text-left list-disc list-inside text-gray-700 font-normal space-y-2">
                <li>PO Management Systems</li>
                <li>Online booking systems</li>
                <li>Electronic Shipping Instructions</li>
                <li>Electronic Bill of Lading</li>
                <li>Electronic Certificate of Origin</li>
                <li>Integrated customer portal</li>
              </ul>

              <p className="text-gray-700 mt-6 text-justify font-normal">
                Furthermore, we understand the importance of timely updates and effective communication throughout the shipment's journey. To streamline this process, we have implemented a user-friendly menu-driven system. Our clients have the flexibility to select specific milestones they wish to be notified about, ensuring relevant and concise communication while minimizing unnecessary interruptions.
              </p>

              <p className="text-gray-700 mt-6 text-justify font-normal">
                At GGL, our commitment to innovation and customer satisfaction remains unwavering as we continue to enhance our services through advanced technologies and tailored solutions.
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

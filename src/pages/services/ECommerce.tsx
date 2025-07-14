import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard, BarChart, Truck, Settings, Monitor } from "lucide-react";
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
const ECommerce = () => {
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
                  E-COMMERCE
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
              }} className="text-lg text-gray-700 mb-6">
                  Comprehensive e-commerce management solutions to enhance your online business operations
                </motion.p>
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
                    Get Started
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
                    <img alt="E-Commerce Solutions" className="w-full h-full object-cover" src="/lovable-uploads/acbc23f0-2458-4e3d-9222-c80a8ea8ce46.png" />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
                Complete E-Commerce Management System
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>

              <p className="text-gray-700 mb-8 text-justify font-normal text-lg leading-relaxed">
                To complement our supply chain solutions, we also build and manage customized e-commerce sites for our customers, 
                offering a comprehensive range of features and services to facilitate their online business operations. 
                Here are some key aspects of our e-commerce management system:
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {["Individualized Product Presentation", "Pricing Modules", "Customized Sales Management Process", "Integration with Warehouse, Transport, Freight Management & Finance Modules", "Payment Gateway Management Systems", "Dashboard with MIS"].map((feature, index) => <motion.div key={index} initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.5,
                delay: index * 0.1
              }} viewport={{
                once: true
              }} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>)}
              </div>

              <p className="text-gray-700 text-justify font-normal text-lg leading-relaxed">
                By leveraging our e-commerce management system, businesses can enhance their online presence, 
                streamline their e-commerce operations, and provide a seamless shopping experience for their customers. 
                We strive to deliver customized solutions that meet the unique needs of each customer, 
                enabling them to succeed in the competitive e-commerce landscape.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[{
              icon: <ShoppingCart className="h-10 w-10 text-brand-gold" />,
              title: "Product Management",
              description: "Comprehensive product catalog management with individualized presentation and pricing modules."
            }, {
              icon: <CreditCard className="h-10 w-10 text-brand-gold" />,
              title: "Payment Gateway",
              description: "Secure payment processing with multiple gateway options and financial integration."
            }, {
              icon: <BarChart className="h-10 w-10 text-brand-gold" />,
              title: "Analytics Dashboard",
              description: "Advanced MIS dashboard with real-time analytics and comprehensive reporting features."
            }, {
              icon: <Truck className="h-10 w-10 text-brand-gold" />,
              title: "Logistics Integration",
              description: "Seamless integration with warehouse, transport, and freight management modules."
            }, {
              icon: <Settings className="h-10 w-10 text-brand-gold" />,
              title: "Custom Solutions",
              description: "Tailored sales management processes designed to meet your specific business requirements."
            }, {
              icon: <Monitor className="h-10 w-10 text-brand-gold" />,
              title: "User Experience",
              description: "Enhanced online presence with seamless shopping experience for your customers."
            }].map((feature, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>)}
            </div>

            {/* CTA Section */}
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
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Ready to Transform Your E-Commerce?</h3>
              <p className="mb-6 text-blue-50">
                Contact our team today to discuss your customized e-commerce solution.
              </p>
              <Link to="/contact" className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Get Started
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default ECommerce;
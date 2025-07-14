import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Plane, Ship, Truck, Warehouse, Package, Anchor } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
const ScrollToTop = () => {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);
  return null;
};
const ServiceCard = ({
  icon,
  title,
  description,
  image,
  link
}) => {
  const getServiceImage = () => {
    switch (title) {
      case "Freight Management":
        return "/hom1.png";
      case "Warehousing-3PL":
        return "/warehosing.png";
      case "Distribution and Transportation":
        return "/hom3.png";
      case "E-Commerce":
        return "/hom1.png";
      default:
        return image;
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} viewport={{
    once: true
  }} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group grid grid-cols-1 md:grid-cols-2">
      <div className="w-full h-48 md:h-64">
        <img src={getServiceImage()} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6 flex flex-col justify-center">
        <div className="bg-brand-gold text-brand-navy p-2 rounded-full inline-block mb-2 w-fit">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-brand-navy mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-4">{description}</p>
        <Link to={link} className="text-brand-gold font-medium hover:text-amber-500 inline-flex items-center text-sm">
          Learn More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>;
};
const Services = () => {
  const isMobile = useIsMobile();
  const services = [{
      image: "/ocfreight.png",
      title: "Ocean Freight",
      description:
        "GGL's dedicated ocean freight department specialize in the complete range freight management services for LCL and FCL loads, supported thru a well established and reliable partner network around the world, for efficient collection, storage & delivery from shippers door to door.",
      icon: <Anchor />,
      link: "/services/ocean-freight"
    },
    {
      image: "/arfreight.png",
      title: "Air Freight",
      description:
        "At GGL, we provide a comprehensive range of air freight services designed to meet all your shipping needs. Our expert air freight teams offer seamless air import, export, and express options, all on a convenient door-to-door basis. GGL stands out with competitive rates.",
      icon: <Plane />,
      link: "/services/air-freight"
    },
    {
      image: "/custom.png",
      title: "Customs Clearance",
      description: "Expert customs clearance services ensuring your shipments move smoothly across borders with accurate documentation and regulatory compliance.",
      icon: <Truck size={20} />,
      link: "/services/customs-clearance"
    },
    {
      image: "/warehousing.png",
      title: "Warehousing - 3PL",
      description:
        "GGL is a premier supply chain solutions provider in Singapore, addressing the full spectrum of logistics needs for our clients. We facilitate the movement of goods from suppliers to manufacturers (for parts and components), from manufacturers and brand owners to resellers and distributors.",
      icon: <Warehouse />,
      link: "/services/warehousing"
    },
     {
      image: "/ecomm.png",
      title: "E-Commerce",
      description:
        "We build and manage customized e-commerce sites for our customers, offering individualized product presentation, pricing modules, customized sales management process, and integration with warehouse and transport modules.",
      icon: <Package />,
      link: "/services/e-commerce"
    },{
      image: "/iiqd.png",
      title: "Liquid Transportation",
      description: "Specialized solutions for transporting liquids safely and efficiently, utilizing ISO tanks, flexitanks, and specialized tankers managed by expert teams.",
      icon: <Droplets size={20} />,
      link: "/services/liquid-transportation"
    },
    {
      image: "/projectcar.png",
      title: "Project Cargo",
      description:
        "Project cargo refers to the specialized transportation of large, heavy, high-value, or complex equipment, often associated with large-scale infrastructure or construction projects.",
      icon: <Package />,
      link: "/services/project-cargo"
    }];
  return <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <section className="bg-gradient-to-r from-gray-900 to-brand-navy text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/lovable-uploads/gp.jpg" alt="Services" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-brand-navy opacity-90" />
          </div>

          <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="text-center max-w-3xl mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 text-slate-50">Our Core Services</h1>
              <div className="w-16 h-1 bg-brand-gold mx-auto mb-4"></div>
              <p className="text-base md:text-lg text-white/90 mb-4">
                Discover our four specialized logistics services designed to meet your comprehensive supply chain needs.
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
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
          }} className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-3">Core Services</h2>
              <div className="w-20 h-1 bg-brand-gold mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive range of services designed to meet all your logistics requirements.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-6">
              {services.map(service => <ServiceCard key={service.id} {...service} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Services;

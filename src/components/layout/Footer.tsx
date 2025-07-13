
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Linkedin, Instagram, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AddressInfo {
  title: string;
  address: string;
  phone?: string | string[];
  email?: string;
}

export const Footer = () => {
  const footerAnimation = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const addressVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.5
      }
    }
  };

  const addresses: AddressInfo[] = [
    {
      title: "New York Office",
      address: "New Jersey Branch, 33 Wood Avenue South, Suite 600, Iselin, NJ 08830",
      phone: "+1 732 456 6780",
      email: "info@gglusa.us"
    },
    {
      title: "Los Angeles Office", 
      address: "2250 South Central Avenue, Compton, CA 90220",
      phone: "+1 310 928 3903",
      email: "info@gglusa.us"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % addresses.length);
  };

  return (
    <footer className="pt-16 pb-8 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-brand-navy via-brand-gold to-brand-navy rounded-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-4">
          {/* Column 1: About */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={footerAnimation} 
            className="flex flex-col items-start"
          >
            <div className="mb-4">
              <img 
                src="/lovable-uploads/GGL.png" 
                alt="GGL Logo" 
                className="h-14 w-auto object-contain" 
                loading="lazy" 
              />
              <p className="text-lg font-semibold text-brand-navy mt-2">GGL USA LLC</p>
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-xs text-left">
              GGL is one of the leading Logistics company with its head quarter in Singapore having separate divisions for 3PL, Freight Management (Ocean and Air), Distribution and Transportation.
            </p>
            <div className="flex space-x-3 mt-4">
              <motion.a 
                href="https://www.facebook.com/gglusa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition" 
                whileHover={{ y: -3, scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/company/gglus/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition" 
                whileHover={{ y: -3, scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/gglusa/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition" 
                whileHover={{ y: -3, scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={footerAnimation} 
            transition={{ delay: 0.2 }} 
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10 px-[110px]"
          >
            <h3 className="font-bold text-lg text-brand-navy mb-4">Navigation</h3>
            <div className="flex flex-col gap-2 px-0 mx-0">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Careers", path: "/careers" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms And Conditions", path: "/terms-and-conditions" }
              ].map((link, index) => (
                <Link 
                  key={index} 
                  to={link.path} 
                  className="text-gray-600 hover:text-brand-gold transition flex items-center gap-2"
                >
                  <ArrowRight size={14} className="text-brand-gold" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Contact Info with Right Arrow */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={footerAnimation} 
            transition={{ delay: 0.4 }} 
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10"
          >
            <h3 className="font-bold text-lg text-brand-navy mb-4">Contact Us</h3>

            <div className="w-full max-w-xs text-gray-600 min-h-[180px] relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex} 
                  variants={addressVariants} 
                  initial="hidden" 
                  animate="visible" 
                  exit="exit" 
                  className="w-full pr-8"
                >
                  <p className="font-semibold mb-1">{addresses[currentIndex].title}</p>
                  <div className="flex items-start gap-2 mb-1">
                    <MapPin size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                    <p>{addresses[currentIndex].address}</p>
                  </div>
                  {addresses[currentIndex].phone && (
                    <div className="flex items-start gap-2 mb-1">
                      <Phone size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                      <div className="text-sm leading-relaxed">
                        {Array.isArray(addresses[currentIndex].phone) 
                          ? addresses[currentIndex].phone.map((line, idx) => <p key={idx}>{line}</p>)
                          : <p>{addresses[currentIndex].phone}</p>
                        }
                      </div>
                    </div>
                  )}
                  {addresses[currentIndex].email && (
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="text-brand-gold flex-shrink-0" />
                      <p>{addresses[currentIndex].email}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Right-side arrow button only */}
              <button 
                onClick={handleNext} 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-brand-navy text-white p-1 rounded-full hover:bg-brand-gold transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="text-center text-gray-600 mt-10 text-sm">
          &copy; {new Date().getFullYear()} GGL USA - All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

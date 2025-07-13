import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Linkedin, ChevronRight } from "lucide-react";
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
  const addresses: AddressInfo[] = [{
    title: "Chennai Office",
    address: "Old No. G1, New G3, KAIZEN, 2nd & 3rd Floor, Plot No. 565Q, G Block, Anna Nagar East, Chennai, Tamil Nadu – 600102",
    phone: "+91 9123523496"
  }, {
    title: "Mumbai Office",
    address: "407, Mayuresh Planet, Plot No. 42 & 43, Sector-15, CBD Belapur, Navi Mumbai, Maharashtra – 400614",
    phone: ["Export: +91 2245174102, +91 2245174109, +91 2245174118", "Export Docs: +91 2245174103, +91 2245174105", "Import Docs: +91 2245174104, +91 2245174106", "Import Support: +91 2245174113, +91 2245174110, +91 2245174107, +91 2245174112"]
  }, {
    title: "New Delhi Office",
    address: "JA 511, DLF Tower A, Jasola District Centre, New Delhi – 110025",
    phone: "+91 9999022030"
  }, {
    title: "Bangalore Office",
    address: "No 2M-216, First Floor, 2nd Main, East Of NGEF Layout, Kasturinagar, Bangalore – 560043",
    phone: "+91 9986949743"
  }, {
    title: "Kolkata Office",
    address: "Room No. 29, 4th Floor, 6, Jawaharlal Nehru Road, Siddha Esplanade, Adjacent to Metro Central (Previously Metro Cinema), Kolkata, West Bengal – 700013",
    phone: "+91 6290921534"
  }];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % addresses.length);
  };
  return <footer className="pt-16 pb-8 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-brand-navy via-brand-gold to-brand-navy rounded-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-4">
          {/* Column 1: About */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} className="flex flex-col items-start">
            <div className="mb-4">
              <img src="/lovable-uploads/GGL.png" alt="GGL Logo" className="h-14 w-auto object-contain" loading="lazy" />
              <img src="/1GlobalEnterprises.png" alt="1 Global Enterprises Logo" className="h-10 w-auto object-contain mt-2" />
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-xs text-left">
              At GGL, we are proud to be one of Singapore's leading logistics companies...
            </p>
            <div className="flex space-x-3 mt-4">
              <motion.a href="https://www.facebook.com/gglusa" target="_blank" rel="noopener noreferrer" className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition" whileHover={{
              y: -3,
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <Facebook size={18} />
              </motion.a>
              <motion.a href="https://www.linkedin.com/company/gglus/" target="_blank" rel="noopener noreferrer" className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition" whileHover={{
              y: -3,
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <Linkedin size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} transition={{
          delay: 0.2
        }} className="flex flex-col items-start md:items-end lg:items-start lg:pl-10 px-[110px]">
            <h3 className="font-bold text-lg text-brand-navy mb-4">Navigation</h3>
            <div className="flex flex-col gap-2 px-0 mx-0">
              {[{
              name: "Home",
              path: "/"
            }, {
              name: "About",
              path: "/about"
            }, {
              name: "Services",
              path: "/services"
            }, {
              name: "Contact Us",
              path: "/contact"
            }, {
              name: "Privacy Policy",
              path: "/privacy-policy"
            }, {
              name: "Terms And Conditions",
              path: "/terms-and-conditions"
            }].map((link, index) => <Link key={index} to={link.path} className="text-gray-600 hover:text-brand-gold transition flex items-center gap-2">
                  <ArrowRight size={14} className="text-brand-gold" />
                  {link.name}
                </Link>)}
            </div>
          </motion.div>

          {/* Column 3: Contact Info with Right Arrow */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} transition={{
          delay: 0.4
        }} className="flex flex-col items-start md:items-end lg:items-start lg:pl-10">
            <h3 className="font-bold text-lg text-brand-navy mb-4">Contact Us</h3>

            <div className="w-full max-w-xs text-gray-600 min-h-[180px] relative">
              <AnimatePresence mode="wait">
                <motion.div key={currentIndex} variants={addressVariants} initial="hidden" animate="visible" exit="exit" className="w-full pr-8">
                  <p className="font-semibold mb-1">{addresses[currentIndex].title}</p>
                  <div className="flex items-start gap-2 mb-1">
                    <MapPin size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                    <p>{addresses[currentIndex].address}</p>
                  </div>
                  {addresses[currentIndex].phone && <div className="flex items-start gap-2 mb-1">
                      <Phone size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                      <div className="text-sm leading-relaxed">
                        {Array.isArray(addresses[currentIndex].phone) ? addresses[currentIndex].phone.map((line, idx) => <p key={idx}>{line}</p>) : <p>{addresses[currentIndex].phone}</p>}
                      </div>
                    </div>}
                  {addresses[currentIndex].email && <div className="flex items-center gap-2">
                      <Mail size={18} className="text-brand-gold flex-shrink-0" />
                      <p>{addresses[currentIndex].email}</p>
                    </div>}
                </motion.div>
              </AnimatePresence>

              {/* Right-side arrow button only */}
              <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-brand-navy text-white p-1 rounded-full hover:bg-brand-gold transition">
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="text-center text-gray-600 mt-10 text-sm">
          &copy; {new Date().getFullYear()} GGL. All Rights Reserved.
        </div>
      </div>
    </footer>;
};
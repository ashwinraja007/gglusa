import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plane, ArrowRight, Truck, Package, Anchor, Droplets, Warehouse } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const EnhancedServiceCard = ({
  image,
  title,
  description,
  icon,
  link
}: {
  image: string;
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group w-full h-full flex flex-col justify-between rounded-lg bg-white border border-gray-200 shadow hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col flex-grow">
        <Link to={link} onClick={() => window.scrollTo(0, 0)} className="block">
          <div className="overflow-hidden">
            <AspectRatio ratio={3 / 2}>
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </AspectRatio>
          </div>
        </Link>
        <div className="p-4 flex flex-col gap-3 flex-grow">
          <div className="flex items-center gap-2 text-brand-navy">
            <div className="w-6 h-6 rounded-full bg-[#f6b100] flex items-center justify-center text-white">
              {React.cloneElement(icon, { size: 14 })}
            </div>
            <h3 className="text-sm font-semibold">{title}</h3>
          </div>
          <p className="text-xs text-gray-600 line-clamp-4 leading-snug">{description}</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link to={link} onClick={() => window.scrollTo(0, 0)}>
          <Button variant="outline" className="w-full text-sm">
            Learn More
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};


export const Services = () => {
  const services = [
    {
      image: "/lovable-uploads/oceanfrieght.jpg",
      title: "Ocean Freight",
      description:
        "GGL's dedicated ocean freight department specialize in the complete range freight management services for LCL and FCL loads, supported thru a well established and reliable partner network around the world, for efficient collection, storage & delivery from shippers door to door.",
      icon: <Anchor />,
      link: "/services/ocean-freight"
    },
    {
      image: "/cargoplane.png",
      title: "Air Freight",
      description:
        "At GGL, we provide a comprehensive range of air freight services designed to meet all your shipping needs. Our expert air freight teams offer seamless air import, export, and express options, all on a convenient door-to-door basis. GGL stands out with competitive rates.",
      icon: <Plane />,
      link: "/services/air-freight"
    },
    {
      image: "/lovable-uploads/cc.jpg",
      title: "Customs Clearance",
      description: "Expert customs clearance services ensuring your shipments move smoothly across borders with accurate documentation and regulatory compliance.",
      icon: <Truck size={20} />,
      link: "/services/customs-clearance"
    },
    {
      image: "/lovable-uploads/warehouse.jpg",
      title: "Warehousing - 3PL",
      description:
        "GGL is a premier supply chain solutions provider in Singapore, addressing the full spectrum of logistics needs for our clients. We facilitate the movement of goods from suppliers to manufacturers (for parts and components), from manufacturers and brand owners to resellers and distributors.",
      icon: <Warehouse />,
      link: "/services/warehousing"
    },
     {
      image: "/hom1.png",
      title: "E-Commerce",
      description:
        "We build and manage customized e-commerce sites for our customers, offering individualized product presentation, pricing modules, customized sales management process, and integration with warehouse and transport modules.",
      icon: <Package />,
      link: "/services/e-commerce"
    },{
      image: "/lovable-uploads/liquid.jpg",
      title: "Liquid Transportation",
      description: "Specialized solutions for transporting liquids safely and efficiently, utilizing ISO tanks, flexitanks, and specialized tankers managed by expert teams.",
      icon: <Droplets size={20} />,
      link: "/services/liquid-transportation"
    },
    {
      image: "/projectcargo3.png",
      title: "Project Cargo",
      description:
        "Project cargo refers to the specialized transportation of large, heavy, high-value, or complex equipment, often associated with large-scale infrastructure or construction projects.",
      icon: <Package />,
      link: "/services/project-cargo"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="py-10 bg-gradient-to-b from-white to-brand-lightGray"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-3">Our Core Services</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Discover our comprehensive range of logistics solutions designed to meet your global shipping needs.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} transition={{ duration: 0.5, delay: index * 0.1 }} className="h-full">
              <EnhancedServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: 0.6, delay: 0.4 }} className="flex justify-center mt-10">
          <Link to="/services" onClick={() => window.scrollTo(0, 0)}>
            <Button variant="navy" className="group transition-all duration-300 text-sm flex items-center gap-2 navy-glow">
              Explore All Services
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const AboutUs = () => {
  return <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7
      }} viewport={{
        once: true
      }} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600 mb-4 text-base text-justify">GGL is a prominent logistics company headquartered in Singapore. It operates with distinct divisions for 3PL, Freight Management (Ocean and Air), Distribution, and Transportation. Our primary mission is to deliver comprehensive end-to-end solutions in supply chain management.</p>
            <p className="text-gray-600 mb-6 text-base text-justify">We employ innovative approaches managed through our network of group offices and trusted partners who specialize in all facets of the supply chain. We constantly strive to cultivate strong and collaborative relationships with our clients, fostering genuine partnerships that drive mutual growth.</p>
            <Link to="/about">
              <Button variant="outline" size="sm" className="text-sm bg-brand-gold my-0 mx-0 rounded-md font-semibold">
                Learn More
              </Button>
            </Link>
          </motion.div>

          {/* Image Section */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-md aspect-square overflow-hidden rounded-lg shadow-lg">
              <img alt="About Us" loading="lazy" className="w-full h-full object-cover rounded-lg" src="/lovable-uploads/7af864aa-40ce-4826-adac-b6604781c459.png" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default AboutUs;
import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Users, TrendingUp, Heart, Globe, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const Careers = () => {
  const benefits = [{
    icon: <Users className="h-6 w-6 text-brand-gold" />,
    title: "Collaborative Culture",
    description: "Work with passionate professionals in a supportive environment that values teamwork and innovation."
  }, {
    icon: <TrendingUp className="h-6 w-6 text-brand-gold" />,
    title: "Career Growth",
    description: "Advance your career with continuous learning opportunities and clear progression paths."
  }, {
    icon: <Heart className="h-6 w-6 text-brand-gold" />,
    title: "Work-Life Balance",
    description: "Enjoy flexible working arrangements and comprehensive benefits that support your well-being."
  }, {
    icon: <Globe className="h-6 w-6 text-brand-gold" />,
    title: "Global Opportunities",
    description: "Be part of an international network with opportunities to work across different markets."
  }, {
    icon: <Award className="h-6 w-6 text-brand-gold" />,
    title: "Recognition",
    description: "Your contributions are valued and recognized through various reward and recognition programs."
  }, {
    icon: <Target className="h-6 w-6 text-brand-gold" />,
    title: "Meaningful Impact",
    description: "Make a real difference in global trade and logistics, connecting businesses worldwide."
  }];
  return <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="from-brand-navy to-blue-700 text-white py-16 bg-[transbrand-navy] bg-brand-navy">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-50">
                Join Our Global Team
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Build your career with one of Singapore's leading logistics companies. 
                We're looking for passionate individuals to join our mission of connecting the world through exceptional logistics solutions.
              </p>
              <Button variant="gold" size="lg" className="font-semibold">
                View Open Positions
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        

        {/* Open Positions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">WORK WITH US</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore exciting career opportunities across our various departments and locations.
              </p>
            </motion.div>

            <div className="grid gap-8 max-w-4xl mx-auto">
              {/* Operations Manager */}
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-brand-navy">Operations Manager</CardTitle>
                  <CardDescription>USA Operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    GGL USA is in search of a dynamic and enterprising Operations Manager – USA. This is an exciting role with a comprehensive set of responsibilities that include full P & L Ownership, Supplier Management and Business Process execution.
                  </p>
                  <Button className="bg-brand-navy text-white hover:bg-brand-navy/90">
                    Know More
                  </Button>
                </CardContent>
              </Card>

              {/* Director-Key Accounts */}
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-brand-navy">Director-Key Accounts</CardTitle>
                  <CardDescription>Chicago Location</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    The Director – Key Accounts is a Commercial role based out of Chicago. GGL USA is looking for a dynamic sales person for developing Mid – to large-sized Accounts, mainly in the Chicago land area.
                  </p>
                  <Button className="bg-brand-navy text-white hover:bg-brand-navy/90">
                    Know More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-brand-navy to-brand-navy text-white bg-brand-navy">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }} className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-slate-50">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Don't see the right position? Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gold" size="lg" className="font-semibold">
                  Submit Your Resume
                </Button>
                <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-brand-navy">
                  Contact HR
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Careers;
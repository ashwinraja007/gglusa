import { motion } from "framer-motion";
import { Globe } from "lucide-react";

import { useContentByPath } from "@/api/hooks";
import type { ContentRecord } from "@/api/types";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type CardItem = { title: string; description: string };

type AboutPageData = {
  heroTitle: string;
  heroSubtitle: string;
  heading: string;
  paragraphs: string[];
  aboutImage: string;
  heroImage: string;
  logisticsTitle: string;
  logisticsItems: CardItem[];
  audienceTitle: string;
  audienceItems: CardItem[];
};

const fallbackData: AboutPageData = {
  heroTitle: "About GGL",
  heroSubtitle:
    "Singapore's premier logistics company, offering specialized expertise across warehousing, freight forwarding, and transportation",
  heading: "About Us",
  paragraphs: [
    "GGL is a prominent logistics company headquartered in Singapore with strong divisions in 3PL, freight management, distribution, and transportation.",
    "Our mission is to deliver complete end-to-end supply chain solutions through strong customer partnerships and regional expertise.",
  ],
  aboutImage: "/lovable-uploads/41795fb5-562d-45d1-a8d3-f26724bc079b.png",
  heroImage: "/lovable-uploads/41795fb5-562d-45d1-a8d3-f26724bc079b.png",
  logisticsTitle: "Comprehensive Logistics Services",
  logisticsItems: [
    { title: "Air & Ocean Freight (LCL & FCL)", description: "Complete import and export solutions for all cargo types." },
    { title: "Dangerous Goods Handling", description: "Specialized expertise in hazardous materials transportation." },
    { title: "Warehousing, Distribution & 3PL", description: "Secure storage and comprehensive third-party logistics solutions." },
    { title: "Domestic & Cross-Border Land Transport", description: "Efficient ground transportation across regions." },
  ],
  audienceTitle: "Who We Serve (Neutral Consolidation)",
  audienceItems: [
    { title: "Freight Forwarders", description: "Trusted partners for global shipping solutions." },
    { title: "Custom Brokers", description: "Reliable consolidation services for customs clearance." },
    { title: "NVOCCs", description: "Neutral support for non-vessel operating common carriers." },
    { title: "3PL Providers", description: "Comprehensive logistics partnership for third-party providers." },
  ],
};

const getSection = (items: ContentRecord[], key: string) => items.find((item) => item.section_key === key);

const asString = (value: unknown, fallback = "") => (typeof value === "string" ? value : fallback);
const asStringArray = (value: unknown, fallback: string[]) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : fallback;

const asCardItems = (value: unknown, fallback: CardItem[]) => {
  if (!Array.isArray(value)) return fallback;

  return value
    .map((item) => {
      if (typeof item !== "object" || !item) return null;
      const record = item as Record<string, unknown>;
      return {
        title: asString(record.title),
        description: asString(record.description),
      };
    })
    .filter((item): item is CardItem => Boolean(item?.title));
};

const mapContentToAboutData = (items: ContentRecord[]): AboutPageData => {
  const hero = getSection(items, "hero");
  const about = getSection(items, "about_us");
  const logistics = getSection(items, "logistics_services");
  const audience = getSection(items, "who_we_serve");

  return {
    heroTitle: asString(hero?.content_json.title, fallbackData.heroTitle),
    heroSubtitle: asString(hero?.content_json.subtitle, fallbackData.heroSubtitle),
    heading: asString(about?.content_json.heading, fallbackData.heading),
    paragraphs: asStringArray(about?.content_json.paragraphs, fallbackData.paragraphs),
    aboutImage: asString(about?.images_json.about_image, fallbackData.aboutImage),
    heroImage: asString(hero?.images_json.hero_image, fallbackData.heroImage),
    logisticsTitle: asString(logistics?.content_json.title, fallbackData.logisticsTitle),
    logisticsItems: asCardItems(logistics?.content_json.items, fallbackData.logisticsItems),
    audienceTitle: asString(audience?.content_json.title, fallbackData.audienceTitle),
    audienceItems: asCardItems(audience?.content_json.items, fallbackData.audienceItems),
  };
};

const CardGrid = ({ title, items }: { title: string; items: CardItem[] }) => (
  <div>
    <h3 className="mb-8 text-center text-3xl font-bold text-gray-900">{title}</h3>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow transition duration-300 hover:shadow-md">
          <h4 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const About = () => {
  const { data } = useContentByPath("/about");
  const aboutData = data?.items?.length ? mapContentToAboutData(data.items) : fallbackData;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <section className="mt-16 bg-gradient-to-r from-brand-navy to-brand-navy px-6 py-20 text-white">
          <div className="mx-auto max-w-7xl text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-4xl font-bold md:text-6xl">
              {aboutData.heroTitle}
            </motion.h1>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl">{aboutData.heroSubtitle}</p>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-4xl font-bold text-brand-navy md:text-5xl">{aboutData.heading}</h2>
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                {aboutData.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img alt="GGL About" className="h-[600px] w-full object-cover" src={aboutData.aboutImage || aboutData.heroImage} />
              </div>
              <div className="absolute -bottom-8 -left-8 max-w-xs rounded-xl bg-white p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Global Network</h4>
                    <p className="text-sm text-gray-600">50+ countries worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl space-y-16">
            <CardGrid title={aboutData.logisticsTitle} items={aboutData.logisticsItems} />
            <CardGrid title={aboutData.audienceTitle} items={aboutData.audienceItems} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type MetaRecord = {
  title: string;
  description: string;
  keywords: string;
};

const defaultMeta: MetaRecord = {
  title: "GGL USA | Global Logistics Solutions",
  description:
    "GGL USA provides global logistics services including air freight, ocean freight, warehousing, transportation, customs clearance, and project cargo.",
  keywords: "GGL, logistics, freight forwarding, warehousing, transportation, customs, cargo",
};

const routeMeta: Record<string, MetaRecord> = {
  "/": {
    title: "GGL USA | Global Logistics Solutions",
    description:
      "Reliable global logistics partner for air, ocean, warehousing, transportation, customs clearance, and integrated supply chain services.",
    keywords: "global logistics, freight forwarding, supply chain, GGL USA",
  },
  "/about": {
    title: "About GGL USA | Logistics & Freight Expertise",
    description:
      "Learn about GGL USA, our global logistics network, service capabilities, and customer-first supply chain solutions.",
    keywords: "about GGL, logistics company, freight expertise, global network",
  },
  "/services": {
    title: "Logistics Services | GGL USA",
    description:
      "Explore GGL USA logistics services including air freight, ocean freight, warehousing, project cargo, and transportation.",
    keywords: "logistics services, air freight, ocean freight, warehousing, project cargo",
  },
  "/global-presence": {
    title: "Global Presence | GGL USA",
    description:
      "Discover GGL USA's international logistics footprint across key countries and trade lanes with trusted partner networks.",
    keywords: "global presence, international logistics, trade lanes, freight network",
  },
  "/contact": {
    title: "Contact GGL USA | Logistics Support",
    description:
      "Get in touch with GGL USA for freight, warehousing, transportation, customs clearance, and integrated logistics inquiries.",
    keywords: "contact GGL, logistics inquiry, freight support, shipping support",
  },
  "/privacy-policy": {
    title: "Privacy Policy | GGL USA",
    description: "Read the GGL USA privacy policy and how we collect, use, and protect your information.",
    keywords: "privacy policy, GGL USA privacy, data protection",
  },
  "/terms-and-conditions": {
    title: "Terms and Conditions | GGL USA",
    description: "Review the terms and conditions for using GGL USA website and services.",
    keywords: "terms and conditions, website terms, GGL USA",
  },
  "/services/transportation": {
    title: "Transportation Services | GGL USA",
    description: "Efficient domestic and cross-border transportation services tailored for timely and secure cargo movement.",
    keywords: "transportation services, cross-border transport, logistics transport",
  },
  "/services/liquid-transportation": {
    title: "Liquid Transportation | GGL USA",
    description: "Specialized liquid transportation solutions with compliance, safety, and reliability across routes.",
    keywords: "liquid transportation, tank logistics, hazardous transport",
  },
  "/services/air-freight": {
    title: "Air Freight Services | GGL USA",
    description: "Fast and reliable air freight solutions for import and export shipments with full visibility.",
    keywords: "air freight, air cargo, import export logistics",
  },
  "/services/ocean-freight": {
    title: "Ocean Freight Services | GGL USA",
    description: "Comprehensive ocean freight solutions including FCL and LCL for international shipping.",
    keywords: "ocean freight, sea freight, FCL, LCL, shipping",
  },
  "/services/lcl-consolidation": {
    title: "LCL Consolidation | GGL USA",
    description: "Cost-effective LCL consolidation services for smaller cargo volumes across global trade routes.",
    keywords: "LCL consolidation, less than container load, ocean logistics",
  },
  "/services/project-cargo": {
    title: "Project Cargo | GGL USA",
    description: "End-to-end project cargo handling for oversized and complex industrial shipments.",
    keywords: "project cargo, heavy lift, oversized cargo logistics",
  },
  "/services/customs-clearance": {
    title: "Customs Clearance | GGL USA",
    description: "Smooth customs clearance services with documentation expertise and regulatory compliance.",
    keywords: "customs clearance, import customs, export customs",
  },
  "/services/warehousing": {
    title: "Warehousing Services | GGL USA",
    description: "Secure warehousing, inventory control, and distribution solutions to optimize your supply chain.",
    keywords: "warehousing, inventory management, distribution, 3PL",
  },
  "/services/e-commerce": {
    title: "E-Commerce Logistics | GGL USA",
    description: "Scalable e-commerce logistics services for fulfillment, shipping, and last-mile support.",
    keywords: "e-commerce logistics, fulfillment, last mile, online retail shipping",
  },
  "/careers": {
    title: "Careers | GGL USA",
    description: "Join GGL USA and build your career in global logistics, freight operations, and supply chain management.",
    keywords: "careers logistics, freight jobs, supply chain careers",
  },
  "/admin": {
    title: "Admin Panel | GGL USA",
    description: "Admin interface for managing dynamic website content and configuration records.",
    keywords: "admin panel, content management, website admin",
  },
};

const setMetaTag = (name: string, content: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[name=\"${name}\"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routeMeta[pathname] ?? defaultMeta;
    document.title = meta.title;
    setMetaTag("description", meta.description);
    setMetaTag("keywords", meta.keywords);
  }, [pathname]);

  return null;
}

-- Seed SEO metadata for all core routes
INSERT INTO seo_records (path, title, description, keywords, extra_meta_json)
VALUES
  (
    '/',
    'GGL USA | Global Logistics Solutions',
    'Reliable global logistics partner for air, ocean, warehousing, transportation, customs clearance, and integrated supply chain services.',
    'global logistics, freight forwarding, supply chain, GGL USA',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/about',
    'About GGL USA | Logistics & Freight Expertise',
    'Learn about GGL USA, our global logistics network, service capabilities, and customer-first supply chain solutions.',
    'about GGL, logistics company, freight expertise, global network',
    JSON_OBJECT('og:type', 'article')
  ),
  (
    '/services',
    'Logistics Services | GGL USA',
    'Explore GGL USA logistics services including air freight, ocean freight, warehousing, project cargo, and transportation.',
    'logistics services, air freight, ocean freight, warehousing, project cargo',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/contact',
    'Contact GGL USA | Logistics Support',
    'Get in touch with GGL USA for freight, warehousing, transportation, customs clearance, and integrated logistics inquiries.',
    'contact GGL, logistics inquiry, freight support, shipping support',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/global-presence',
    'Global Presence | GGL USA',
    'Discover GGL USA''s international logistics footprint across key countries and trade lanes with trusted partner networks.',
    'global presence, international logistics, trade lanes, freight network',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/privacy-policy',
    'Privacy Policy | GGL USA',
    'Read the GGL USA privacy policy and how we collect, use, and protect your information.',
    'privacy policy, GGL USA privacy, data protection',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/terms-and-conditions',
    'Terms and Conditions | GGL USA',
    'Review the terms and conditions for using GGL USA website and services.',
    'terms and conditions, website terms, GGL USA',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/services/transportation',
    'Transportation Services | GGL USA',
    'Efficient domestic and cross-border transportation services tailored for timely and secure cargo movement.',
    'transportation services, cross-border transport, logistics transport',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/services/liquid-transportation',
    'Liquid Transportation | GGL USA',
    'Specialized liquid transportation solutions with compliance, safety, and reliability across routes.',
    'liquid transportation, tank logistics, hazardous transport',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/services/air-freight',
    'Air Freight Services | GGL USA',
    'Fast and reliable air freight solutions for import and export shipments with full visibility.',
    'air freight, air cargo, import export logistics',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/services/ocean-freight',
    'Ocean Freight Services | GGL USA',
    'Comprehensive ocean freight solutions including FCL and LCL for international shipping.',
    'ocean freight, sea freight, FCL, LCL, shipping',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/services/lcl-consolidation',
    'LCL Consolidation | GGL USA',
    'Cost-effective LCL consolidation services for smaller cargo volumes across global trade routes.',
    'LCL consolidation, less than container load, ocean logistics',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/services/project-cargo',
    'Project Cargo | GGL USA',
    'End-to-end project cargo handling for oversized and complex industrial shipments.',
    'project cargo, heavy lift, oversized cargo logistics',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/services/customs-clearance',
    'Customs Clearance | GGL USA',
    'Smooth customs clearance services with documentation expertise and regulatory compliance.',
    'customs clearance, import customs, export customs',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/services/warehousing',
    'Warehousing Services | GGL USA',
    'Secure warehousing, inventory control, and distribution solutions to optimize your supply chain.',
    'warehousing, inventory management, distribution, 3PL',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/services/e-commerce',
    'E-Commerce Logistics | GGL USA',
    'Scalable e-commerce logistics services for fulfillment, shipping, and last-mile support.',
    'e-commerce logistics, fulfillment, last mile, online retail shipping',
    JSON_OBJECT('og:type', 'website')
  ),
  (
    '/admin',
    'Admin Panel | GGL USA',
    'Admin interface for managing dynamic website content and configuration records.',
    'admin panel, content management, website admin',
    JSON_OBJECT('robots', 'noindex,nofollow')
  )
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  description = VALUES(description),
  keywords = VALUES(keywords),
  extra_meta_json = VALUES(extra_meta_json);

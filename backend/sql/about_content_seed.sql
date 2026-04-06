-- Seed data for /about dynamic content
INSERT INTO pages (path, component_key)
VALUES ('/about', 'about_dynamic')
ON DUPLICATE KEY UPDATE component_key = VALUES(component_key);

INSERT INTO content (page_path, section_key, content_json, images_json)
VALUES
(
  '/about',
  'hero',
  JSON_OBJECT(
    'title', 'About GGL',
    'subtitle', 'Singapore''s premier logistics company, offering specialized expertise across warehousing, freight forwarding, and transportation'
  ),
  JSON_OBJECT('hero_image', '/lovable-uploads/41795fb5-562d-45d1-a8d3-f26724bc079b.png')
),
(
  '/about',
  'about_us',
  JSON_OBJECT(
    'heading', 'About Us',
    'paragraphs', JSON_ARRAY(
      'GGL is a prominent logistics company headquartered in Singapore. It operates with distinct divisions for 3PL, Freight Management (Ocean and Air), Distribution, and Transportation.',
      'We employ innovative approaches managed through our network of group offices and trusted partners who specialize in all facets of the supply chain.',
      'Our commitment extends beyond mere forwarding and logistics. It revolves around building customer trust by consistently providing world-class services and solutions.',
      'Through our in-house IT capabilities, we develop customized solutions and seamlessly integrate them with our clients'' systems and processes.',
      'With our extensive presence across 15 countries and a strong partner network, GGL is well positioned to deliver global logistics solutions.'
    )
  ),
  JSON_OBJECT('about_image', '/lovable-uploads/41795fb5-562d-45d1-a8d3-f26724bc079b.png')
),
(
  '/about',
  'logistics_services',
  JSON_OBJECT(
    'title', 'Comprehensive Logistics Services',
    'items', JSON_ARRAY(
      JSON_OBJECT('title', 'Air & Ocean Freight (LCL & FCL)', 'description', 'Complete import and export solutions for all cargo types.'),
      JSON_OBJECT('title', 'Dangerous Goods Handling', 'description', 'Specialized expertise in hazardous materials transportation.'),
      JSON_OBJECT('title', 'Warehousing, Distribution & 3PL', 'description', 'Secure storage and comprehensive third-party logistics solutions.'),
      JSON_OBJECT('title', 'Domestic & Cross-Border Land Transport', 'description', 'Efficient ground transportation across regions.')
    )
  ),
  JSON_OBJECT()
),
(
  '/about',
  'who_we_serve',
  JSON_OBJECT(
    'title', 'Who We Serve (Neutral Consolidation)',
    'items', JSON_ARRAY(
      JSON_OBJECT('title', 'Freight Forwarders', 'description', 'Trusted partners for global shipping solutions.'),
      JSON_OBJECT('title', 'Custom Brokers', 'description', 'Reliable consolidation services for customs clearance.'),
      JSON_OBJECT('title', 'NVOCCs', 'description', 'Neutral support for non-vessel operating common carriers.'),
      JSON_OBJECT('title', '3PL Providers', 'description', 'Comprehensive logistics partnership for third-party providers.')
    )
  ),
  JSON_OBJECT()
)
ON DUPLICATE KEY UPDATE content_json = VALUES(content_json), images_json = VALUES(images_json);

export type GalleryImage = { src: string; alt: string }

export type EventData = {
  slug: string
  name: string
  heroImage: string
  heroAlt: string
  tagline: string
  description: string[]
  highlights: string[]
  gallery: GalleryImage[]
}

export const EVENTS: EventData[] = [
  {
    slug: 'weddings',
    name: 'Weddings',
    heroImage: '/images/wedding.jpg',
    heroAlt: 'Elegant wedding at Aurum Events',
    tagline: "Say 'I Do' at Freehold's Most Stunning Venue",
    description: [
      "Your wedding day deserves a venue as extraordinary as your love story. Nestled in the heart of Freehold, NJ, Aurum Events & Catering is a one-of-a-kind NYC loft-inspired space where modern romance meets timeless elegance. Our exposed brick walls, soaring ceilings, and state-of-the-art LED wall lighting create a backdrop that photographers dream about and guests never forget.",
      "We offer flexible spaces that adapt seamlessly to your vision — whether you envision an intimate ceremony, a grand ballroom reception, a cocktail hour on our outdoor patio, or dancing under the stars on our 400 sq ft rooftop deck. Our team, led by owners Dave and Jay with Ryan on-site, guides you through every detail from your first site visit to your last dance.",
      "Executive Chef Chris Harammis and his celebrated kitchen team craft a personalized wedding menu that reflects your unique tastes. From elegantly passed hors d'oeuvres to action stations and plated desserts, every bite tells the story of your day. With Aurum, your wedding isn't just an event — it's a masterpiece.",
    ],
    highlights: [
      "Stunning NYC loft atmosphere with exposed brick walls and state-of-the-art LED lighting",
      "Multiple event spaces — main ballroom, intimate loft, cocktail patio & 400 sq ft rooftop deck",
      "Fully customizable ceremony, cocktail hour, and reception packages",
      "Executive Chef Chris Harammis designing an exclusive menu just for you",
      "State-of-the-art sound and lighting system for your ceremony and first dance",
      "English & Spanish spoken — welcoming all families and traditions",
    ],
    gallery: [
      { src: '/images/wedding.jpg', alt: 'Wedding ceremony at Aurum' },
      { src: '/images/slide1.jpg', alt: 'Aurum ballroom elegantly set' },
      { src: '/images/champagne.jpg', alt: 'Champagne toast celebration' },
      { src: '/images/slide2.jpg', alt: 'Aurum event space' },
    ],
  },
  {
    slug: 'bar-bat-mitzvahs',
    name: 'Bar & Bat Mitzvahs',
    heroImage: '/images/mitzvah.jpg',
    heroAlt: 'Bar Mitzvah celebration at Aurum Events',
    tagline: 'A Sacred Milestone, Celebrated in Style',
    description: [
      "A Bar or Bat Mitzvah is one of life's most meaningful milestones, and it deserves a celebration as special as the moment itself. At Aurum Events & Catering, we understand the deep significance of this tradition and work closely with families to honor every custom while creating an atmosphere of pure joy, beauty, and celebration.",
      "Our versatile spaces transform to reflect your family's unique style and heritage — from elegant, traditional settings to vibrant, modern celebrations complete with themed décor and entertainment. The unique loft inside our main ballroom creates a stunning VIP space, while our outdoor cocktail patio sets the perfect scene for a Kiddush-style reception.",
      "Our bilingual staff (English and Spanish) ensures every guest feels at home, and Executive Chef Chris Harammis crafts a menu that honors your dietary needs and delights every palate. From passed hors d'oeuvres to a spectacular dessert display, every detail is executed with care and precision — because this is a day your family will talk about for generations.",
    ],
    highlights: [
      "Versatile spaces that adapt to both intimate family gatherings and large celebrations",
      "Custom themed décor coordination for a truly personalized event",
      "Unique loft inside the ballroom — perfect as a VIP lounge or candle lighting stage",
      "Bilingual staff — English and Spanish spoken",
      "Entertainment-ready stage and state-of-the-art sound system",
      "Dedicated event coordinator by your side from planning through the last dance",
    ],
    gallery: [
      { src: '/images/mitzvah.jpg', alt: 'Bar Mitzvah celebration' },
      { src: '/images/food.jpg', alt: 'Aurum catering spread' },
      { src: '/images/patio-night.jpg', alt: 'Outdoor patio event at night' },
      { src: '/images/slide1.jpg', alt: 'Aurum ballroom beautifully decorated' },
    ],
  },
  {
    slug: 'sweet-sixteens',
    name: 'Sweet Sixteens',
    heroImage: '/images/sweet16.jpg',
    heroAlt: 'Sweet Sixteen party at Aurum Events',
    tagline: 'Turn 16 in the Most Unforgettable Way',
    description: [
      "Sixteen only happens once, and it should be celebrated with all the glamour, fun, and unforgettable moments that a milestone birthday deserves. At Aurum Events & Catering, we specialize in Sweet Sixteen celebrations that feel like stepping into a dream — a stunning NYC loft backdrop, dazzling LED wall lighting, and a team dedicated to making the birthday girl or boy feel like royalty.",
      "From the grand entrance to the cake cutting, every moment of your Sweet Sixteen at Aurum is designed for maximum impact. Our spacious main ballroom accommodates large parties with ease, while the unique loft provides an exclusive VIP lounge area. Our outdoor cocktail patio adds another dimension of fun for guests between dances.",
      "Our catering team brings creativity and flair to the menu, crafting dishes and stations that teenagers and adults alike will love. Whether you're envisioning a full dinner with action stations, a passed hors d'oeuvres cocktail celebration, or a late-night dessert extravaganza, Aurum's kitchen delivers with style.",
    ],
    highlights: [
      "Iconic NYC loft venue perfect for themed décor and dramatic entrances",
      "LED wall and state-of-the-art lighting system for a nightclub-quality atmosphere",
      "VIP loft inside the ballroom for an exclusive birthday lounge",
      "Custom menu options for all tastes — from elegant stations to late-night bites",
      "Outdoor cocktail patio for added space and atmosphere between dances",
      "Experienced team that specializes in creating magical milestone moments",
    ],
    gallery: [
      { src: '/images/sweet16.jpg', alt: 'Sweet Sixteen party' },
      { src: '/images/champagne.jpg', alt: 'Celebration drinks' },
      { src: '/images/patio-night.jpg', alt: 'Outdoor patio at night' },
      { src: '/images/food.jpg', alt: 'Aurum catering' },
    ],
  },
  {
    slug: 'corporate-events',
    name: 'Corporate Events',
    heroImage: '/images/corporate.jpg',
    heroAlt: 'Corporate gala at Aurum Events',
    tagline: 'Where Business Meets Brilliance',
    description: [
      "First impressions matter in business, and the venue you choose sends a powerful message. Aurum Events & Catering offers a sophisticated, one-of-a-kind setting that elevates every corporate gathering — whether you're hosting an intimate executive dinner, a company-wide gala, a product launch, or an awards ceremony.",
      "Our NYC loft-inspired venue, with its exposed brick walls, LED-lit feature walls, and flexible floor plans, creates a distinctive environment that energizes attendees and reinforces a culture of excellence. Our state-of-the-art AV and sound systems ensure your presentations, speeches, and entertainment land exactly as intended.",
      "Our culinary team, led by Executive Chef Chris Harammis, offers a full range of corporate dining options — from working lunch stations and passed reception bites to full multi-course dinners. We understand that corporate hospitality is as much about the food as the event itself, and we deliver an experience your clients and colleagues will genuinely remember.",
    ],
    highlights: [
      "Distinctive NYC loft venue that impresses clients and colleagues alike",
      "State-of-the-art AV, sound, and LED lighting systems",
      "Flexible floor plans for dinners, receptions, presentations, and galas",
      "Executive catering from Chef Chris Harammis — stations to full plated dinners",
      "Dedicated event team for seamless, professional execution",
      "Conveniently located in downtown Freehold, NJ — accessible from across the region",
    ],
    gallery: [
      { src: '/images/corporate.jpg', alt: 'Corporate event at Aurum' },
      { src: '/images/slide2.jpg', alt: 'Aurum event space setup' },
      { src: '/images/food.jpg', alt: 'Corporate catering spread' },
      { src: '/images/tradeshow.jpg', alt: 'Corporate trade show setup' },
    ],
  },
  {
    slug: 'fundraisers',
    name: 'Fundraisers',
    heroImage: '/images/fundraiser.jpg',
    heroAlt: 'Fundraiser gala at Aurum Events',
    tagline: 'Make Your Cause Impossible to Forget',
    description: [
      "The most successful fundraisers are the ones that move people — and the right venue is the catalyst. Aurum Events & Catering provides a uniquely captivating backdrop for charity galas, benefit dinners, silent auctions, and community fundraising events. Our stunning NYC loft atmosphere creates an air of prestige and occasion that motivates generosity.",
      "We work closely with nonprofit organizations, community groups, and cause-driven teams to create events that honor your mission while delivering an exceptional guest experience. From the cocktail hour on our outdoor patio to the main gala in our ballroom, every moment is crafted to inspire, connect, and celebrate the cause at hand.",
      "Our Executive Chef and catering team provide elegant dining that matches the caliber of your event. Whether you're hosting a three-course dinner, a cocktail-style reception, or a fully customized gala experience, Aurum ensures that the food and service reflect the importance of your cause — because your guests deserve nothing less than remarkable.",
    ],
    highlights: [
      "Prestigious NYC loft venue that elevates the perception of your cause",
      "Flexible configurations for galas, silent auctions, dinners, and receptions",
      "Outdoor cocktail patio and rooftop deck for multi-space event flow",
      "Expert catering that consistently impresses donors and supporters",
      "Dedicated event team to coordinate logistics so you can focus on your mission",
      "Customizable packages for organizations of all sizes and budgets",
    ],
    gallery: [
      { src: '/images/fundraiser.jpg', alt: 'Fundraiser gala event' },
      { src: '/images/champagne.jpg', alt: 'Champagne toast at gala' },
      { src: '/images/slide3.jpg', alt: 'Aurum venue beautifully lit' },
      { src: '/images/food.jpg', alt: 'Elegant catering spread' },
    ],
  },
  {
    slug: 'holiday-parties',
    name: 'Holiday Parties',
    heroImage: '/images/holiday.jpg',
    heroAlt: 'Holiday party at Aurum Events',
    tagline: 'Make the Season Spectacularly Unforgettable',
    description: [
      "The holiday season calls for something extraordinary, and Aurum Events & Catering delivers exactly that. Whether you're planning a company holiday party, a private seasonal gathering, or a festive community celebration, our NYC loft venue transforms into a warm and magical space that captures the spirit of the season in the most spectacular way.",
      "Imagine arriving to twinkling lights and festive décor amidst the rich texture of exposed brick and glowing LED walls. Our main ballroom, intimate loft space, and outdoor patio come together to create a holiday experience that guests will be talking about long after the tinsel comes down. We handle every detail so you can simply enjoy the celebration.",
      "Our holiday menus are crafted with the season in mind — warm, indulgent, and utterly delicious. Chef Chris Harammis and his team create festive action stations, carving tables, and seasonal passed bites that feel like a gift to your guests' palates. From the first holiday cocktail to the last dessert bite, every moment feels like the most wonderful time of the year.",
    ],
    highlights: [
      "Spectacular venue that transforms beautifully for the holiday season",
      "Festive décor options and fully customizable themes for any holiday celebration",
      "Indoor and outdoor spaces — ballroom, loft, patio, and rooftop deck",
      "Seasonal menus crafted by Executive Chef Chris Harammis",
      "Corporate and private holiday party packages available",
      "Fully private, exclusive buyout of the entire venue",
    ],
    gallery: [
      { src: '/images/holiday.jpg', alt: 'Holiday party celebration' },
      { src: '/images/champagne.jpg', alt: 'Champagne and celebration' },
      { src: '/images/patio-night.jpg', alt: 'Outdoor patio evening event' },
      { src: '/images/food.jpg', alt: 'Holiday catering spread' },
    ],
  },
  {
    slug: 'social-events',
    name: 'Social Events',
    heroImage: '/images/private.jpg',
    heroAlt: 'Private social event at Aurum Events',
    tagline: 'Your Celebration, Entirely Your Own',
    description: [
      "Life's most precious moments deserve a stage worthy of their significance. At Aurum Events & Catering, we host every kind of social celebration — from milestone birthday parties and anniversary dinners to graduation parties, engagement celebrations, retirement soirées, and everything in between. Whatever the occasion, we pour the same passion and expertise into every single event.",
      "Our NYC loft venue is completely private when you book with us — this is entirely your space, your night, your story. The exposed brick walls, LED lighting, and unique loft create an atmosphere that feels both upscale and deeply personal. We work with you to customize every element of the décor, menu, and timing to reflect what makes your celebration unique.",
      "Executive Chef Chris Harammis and the Aurum kitchen team bring the same culinary excellence to your private gathering that they bring to weddings and galas. From elegant multi-course dinners to fun, interactive food stations and indulgent dessert spreads, the food at your event will be a highlight — and a memory — in itself.",
    ],
    highlights: [
      "Completely exclusive venue buyout — the entire space is entirely yours",
      "NYC loft atmosphere that elevates any social celebration",
      "Multiple spaces: ballroom, loft, patio & rooftop deck for dynamic event flow",
      "Fully customizable menu for every taste and occasion",
      "Experienced team that approaches every event with wedding-level care",
      "English and Spanish spoken — welcoming all communities and cultures",
    ],
    gallery: [
      { src: '/images/private.jpg', alt: 'Private social event celebration' },
      { src: '/images/patio-night.jpg', alt: 'Outdoor patio evening' },
      { src: '/images/champagne.jpg', alt: 'Celebration drinks' },
      { src: '/images/slide1.jpg', alt: 'Aurum venue beautifully lit' },
    ],
  },
  {
    slug: 'trade-shows',
    name: 'Trade Shows',
    heroImage: '/images/tradeshow.jpg',
    heroAlt: 'Trade show at Aurum Events',
    tagline: 'Showcase Your Brand at Its Best',
    description: [
      "A trade show is your moment to make a lasting impression, and the venue sets the tone for everything. Aurum Events & Catering offers a unique, memorable setting in the heart of Freehold, NJ that distinguishes your event from the standard convention hall. Our NYC loft-inspired space — with its exposed brick, LED walls, and open floor plans — creates an energizing atmosphere that keeps attendees engaged.",
      "Our flexible main ballroom can be configured with booth layouts, presentation areas, networking zones, and registration stations, while our additional spaces provide room for VIP meetings, breakout sessions, and catered hospitality areas. Our state-of-the-art sound and lighting systems ensure every presentation and demonstration lands with maximum impact.",
      "We understand that trade shows run on hospitality — attendees who are well-fed and comfortable stay longer and engage more. Our catering team provides professional food and beverage service throughout the event, from morning welcome refreshments to lunch stations and afternoon receptions, so your exhibitors and attendees can focus on what matters most.",
    ],
    highlights: [
      "Unique, memorable NYC loft venue that distinguishes your trade show",
      "Flexible floor plans for booth layouts, presentations, and networking zones",
      "State-of-the-art AV, sound, and LED lighting systems for demonstrations",
      "Professional catering service throughout the full event day",
      "Convenient downtown Freehold location with easy regional access",
      "Additional spaces for VIP meetings, breakout sessions, and receptions",
    ],
    gallery: [
      { src: '/images/tradeshow.jpg', alt: 'Trade show event setup' },
      { src: '/images/corporate.jpg', alt: 'Corporate event at Aurum' },
      { src: '/images/slide2.jpg', alt: 'Aurum main ballroom' },
      { src: '/images/food.jpg', alt: 'Professional catering service' },
    ],
  },
]

export function getEventBySlug(slug: string): EventData | undefined {
  return EVENTS.find((e) => e.slug === slug)
}

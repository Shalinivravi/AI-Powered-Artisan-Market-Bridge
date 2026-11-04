import {
  User,
  ArtisanProfile,
  Product,
  Enquiry,
  BuyerRequirement,
  NotificationItem,
  AdminAnalytics,
  CraftCategory
} from '../src/types';

// Pre-seeded Indian artisan products
const initialProducts: Product[] = [
  {
    id: 'prod-1',
    artisanId: 'artisan-1',
    artisanName: 'Rameshwar Lal Varma',
    artisanLocation: 'Chanderi, Ashoknagar',
    artisanState: 'Madhya Pradesh',
    artisanPhone: '+91 98261 44521',
    name: 'Handcrafted Pure Chanderi Zari Border Silk Saree',
    nameHindi: 'शुद्ध चंदेरी ज़री बॉर्डर सिल्क साड़ी (हथकरघा)',
    category: 'Handloom',
    description: 'Woven on traditional pit looms using fine mulberry silk and golden zari thread with traditional peacock (mor) motifs. Lightweight, breathable, and woven over 14 days of meticulous artisan effort.',
    descriptionHindi: 'पारंपरिक गड्ढा करघों (pit loom) पर 14 दिनों में बुनी गई शुद्ध रेशम और सुनहरी ज़री की चंदेरी साड़ी। पारंपरिक मयूर बूटियों से सुसज्जित और अत्यंत मुलायम।',
    shortDescription: '100% Handloom Chanderi Silk Saree with authentic golden Zari work.',
    shortDescriptionHindi: 'प्रामाणिक सुनहरी ज़री काम वाली 100% हथकरघा चंदेरी सिल्क साड़ी।',
    material: 'Mulberry Silk, Metallic Zari Thread',
    colour: 'Royal Peacock Blue & Gold',
    size: '6.5 Meters (with 80cm blouse piece)',
    dimensions: '6.5m x 1.15m',
    price: 4850,
    suggestedPrice: 4900,
    minPrice: 4400,
    maxPrice: 5600,
    pricingExplanation: 'Based on 85 grams pure silk yarn, 14 days handloom labor, and GI tag premium.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    originalImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    imageQualityScore: 94,
    status: 'published',
    tags: ['Chanderi', 'Handloom', 'Silk Saree', 'Zari', 'Traditional Weave', 'GI Tagged'],
    keywords: ['chanderi silk', 'wedding saree', 'handcrafted saree', 'indian handloom'],
    stockQuantity: 4,
    viewsCount: 382,
    enquiriesCount: 14,
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    isVerified: true,
    attributes: [
      { id: 'attr-1', name: 'Weaving Technique', value: 'Pit Loom Extra Weft' },
      { id: 'attr-2', name: 'GI Certification', value: 'GI Tag #Chanderi-2005' },
      { id: 'attr-3', name: 'Wash Care', value: 'Dry Clean Only' }
    ]
  },
  {
    id: 'prod-2',
    artisanId: 'artisan-2',
    artisanName: 'Parvati Devi Kumbhar',
    artisanLocation: 'Patan, Kumharwada',
    artisanState: 'Gujarat',
    artisanPhone: '+91 94280 11928',
    name: 'Earthen Clay Terracotta Water Pot (Matka) with Hand-Carved Floral Relief',
    nameHindi: 'हाथ से नक्काशीदार फूलों वाला शुद्ध मिट्टी का शीतल मटका',
    category: 'Pottery',
    description: 'Natural riverbed terracotta pot thrown on a traditional foot-spun potter wheel and wood-fired in an open earthen kiln. Keeps drinking water naturally alkaline and chilled by evaporative cooling without electricity.',
    descriptionHindi: 'नदी की उपजाऊ काली मिट्टी से चाक पर गढ़ा गया प्राकृतिक मटका। लकड़ी की भट्टी में पकाया गया, जो बिना बिजली के पानी को प्राकृतिक रूप से ठंडा और शीतल रखता है।',
    shortDescription: 'Naturally cooling organic terracotta clay water pot with hand-chiseled motifs.',
    shortDescriptionHindi: 'प्राकृतिक ठंडक देने वाला नक्काशीदार मिट्टी का मटका।',
    material: 'Natural Red Alluvial Clay, Riverbed Silt',
    colour: 'Terracotta Rust Red & Ochre',
    size: '8 Litres Capacity',
    dimensions: '32cm Height x 28cm Diameter',
    price: 650,
    suggestedPrice: 680,
    minPrice: 550,
    maxPrice: 850,
    pricingExplanation: 'Factoring wheel shaping, 3-stage kiln firing, zero chemical glazes, and eco-friendly packing.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    originalImageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    imageQualityScore: 91,
    status: 'published',
    tags: ['Terracotta', 'Clay Pot', 'Organic Cooling', 'Eco Friendly', 'Handmade Pottery'],
    keywords: ['terracotta matka', 'earthen cookware', 'clay water dispenser', 'sustainable home'],
    stockQuantity: 18,
    viewsCount: 520,
    enquiriesCount: 22,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    isVerified: true,
    attributes: [
      { id: 'attr-4', name: 'Firing Method', value: 'Traditional Wood Pit Fired' },
      { id: 'attr-5', name: 'Chemical Free', value: '100% Lead & Cadmium Free' }
    ]
  },
  {
    id: 'prod-3',
    artisanId: 'artisan-3',
    artisanName: 'Biren Murmu',
    artisanLocation: 'Bastar, Jagdalpur',
    artisanState: 'Chhattisgarh',
    artisanPhone: '+91 97705 66201',
    name: 'Dhokra Lost-Wax Cast Brass Tribal Musician Figurine',
    nameHindi: 'ढोकरा लॉस्ट-वैक्स धातु शिल्प - आदिवासी संगीतकार मूर्ति',
    category: 'Metal & Brass',
    description: '4,000-year-old non-ferrous lost-wax metal casting technique preserved by Bastar tribal artisans. Each piece is singular and non-replicable because the clay core mold is shattered upon release.',
    descriptionHindi: '4000 वर्ष पुरानी ढोकरा धातु कला से निर्मित पीतल की मूर्ति। मधुमक्खी के मोम और मिट्टी के सांचे से एक-एक तार जोड़कर तैयार की गई अनूठी कलाकृति।',
    shortDescription: 'Authentic Bastar Bell-Metal tribal folk musician handcrafted statue.',
    shortDescriptionHindi: 'बस्तर की प्राचीन ढोकरा कला से बनी प्रामाणिक पीतल की मूर्ति।',
    material: 'Recycled Bell Metal & Brass, Beeswax Core',
    colour: 'Antique Golden Brass with Patina',
    size: '9 Inches Tall (approx 650g)',
    dimensions: '22cm x 9cm x 6cm',
    price: 1850,
    suggestedPrice: 1950,
    minPrice: 1600,
    maxPrice: 2400,
    pricingExplanation: 'Ancient lost-wax single-cast mold technique, 650g solid brass weight, and master tribal artisan heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    originalImageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    imageQualityScore: 96,
    status: 'published',
    tags: ['Dhokra', 'Tribal Art', 'Brass Craft', 'Lost Wax Metal', 'Bastar', 'Collectible'],
    keywords: ['dhokra sculpture', 'bastar brass craft', 'tribal indian art', 'home decor brass'],
    stockQuantity: 7,
    viewsCount: 440,
    enquiriesCount: 19,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    isVerified: true,
    attributes: [
      { id: 'attr-6', name: 'Casting Technique', value: 'Lost-Wax (Cire Perdue)' },
      { id: 'attr-7', name: 'Weight', value: '650 Grams' }
    ]
  },
  {
    id: 'prod-4',
    artisanId: 'artisan-4',
    artisanName: 'Mohd. Salim Ansari',
    artisanLocation: 'Saharanpur, Woodcraft Hub',
    artisanState: 'Uttar Pradesh',
    artisanPhone: '+91 98971 88390',
    name: 'Carved Sheesham (Indian Rosewood) 9-Compartment Botanical Spice Box with Glass Top',
    nameHindi: 'नक्काशीदार शीशम की लकड़ी का 9 खानों वाला पारंपरिक मसाला डिब्बा',
    category: 'Wooden Craft',
    description: 'Seasoned natural Indian Sheesham wood with brass filigree latch and hand-carved floral vine (Jaali) border. Features 9 removable spice cups and carved wooden tasting spoon.',
    descriptionHindi: 'सहारनपुर के कुशल काष्ठ शिल्पियों द्वारा शीशम की ठोस लकड़ी पर नक्काशी करके बनाया गया सुंदर मसाला बॉक्स। इसमें 9 डिब्बे और एक हस्तनिर्मित चम्मच शामिल है।',
    shortDescription: 'Solid Sheesham wood artisanal spice organizer with brass inlay latch.',
    shortDescriptionHindi: 'पीतल के लॉक के साथ ठोस शीशम की लकड़ी का मसाला बॉक्स।',
    material: 'Seasoned Sheesham Wood, Brass Hardware, Tempered Glass',
    colour: 'Natural Dark Honey Wood Grain',
    size: '8x8 Inches x 2.5 Inches',
    dimensions: '20cm x 20cm x 6.5cm',
    price: 1250,
    suggestedPrice: 1280,
    minPrice: 1100,
    maxPrice: 1600,
    pricingExplanation: 'Grade-A seasoned hardwood, hand-carved fretwork borders, brass hardware fitments.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    originalImageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    imageQualityScore: 92,
    status: 'published',
    tags: ['Saharanpur Woodcraft', 'Sheesham Wood', 'Spice Box', 'Kitchenware', 'Eco Friendly'],
    keywords: ['wooden masala box', 'indian spice container', 'sheesham handicraft', 'kitchen organizer'],
    stockQuantity: 25,
    viewsCount: 610,
    enquiriesCount: 31,
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    isVerified: true,
    attributes: [
      { id: 'attr-8', name: 'Finish', value: 'Food-safe Natural Beeswax Polish' },
      { id: 'attr-9', name: 'Wood Type', value: '100% Solid Indian Rosewood' }
    ]
  },
  {
    id: 'prod-5',
    artisanId: 'artisan-5',
    artisanName: 'Kaveri Borah',
    artisanLocation: 'Majuli Island, Jorhat',
    artisanState: 'Assam',
    artisanPhone: '+91 94350 78210',
    name: 'Handwoven Assam Golden Bamboo Multi-Tier Fruit & Planter Basket',
    nameHindi: 'असमिया सुनहरे बांस की हाथ से बुनी बहुउपयोगी टोकरी',
    category: 'Basketry',
    description: 'Crafted from sustainable mature indigenous Assam bamboo (Bhaluka bansh) split into paper-thin silken reeds. Treated organically with smoke curing for lifelong pest resistance.',
    descriptionHindi: 'माजुली द्वीप के प्राकृतिक सुनहरे बांस से बुनी गई टिकाऊ टोकरी। पर्यावरण-अनुकूल, मजबूत और फल या पौधों को सजाने के लिए सर्वोत्तम।',
    shortDescription: 'Eco-friendly handwoven multi-purpose cane & bamboo storage basket.',
    shortDescriptionHindi: 'पर्यावरण-अनुकूल प्राकृतिक बांस से हस्तनिर्मित बहुउपयोगी टोकरी।',
    material: 'Natural Assam Cane & Bamboo (Bhaluka Bansh)',
    colour: 'Natural Golden Honey Blonde',
    size: 'Medium (12 Inch Diameter x 6 Inch Depth)',
    dimensions: '30cm x 30cm x 15cm',
    price: 580,
    suggestedPrice: 620,
    minPrice: 480,
    maxPrice: 780,
    pricingExplanation: 'Organically treated bamboo strips, 8 hours intricate weaving, zero plastic components.',
    imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80',
    originalImageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80',
    imageQualityScore: 89,
    status: 'published',
    tags: ['Assam Bamboo', 'Cane Basket', 'Sustainable Decor', 'Handwoven', 'Northeast Crafts'],
    keywords: ['bamboo basket', 'cane fruit bowl', 'sustainable home storage', 'northeast handicrafts'],
    stockQuantity: 15,
    viewsCount: 290,
    enquiriesCount: 11,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    isVerified: true,
    attributes: [
      { id: 'attr-10', name: 'Treatment', value: 'Natural Herbal Smoke Treated' },
      { id: 'attr-11', name: 'Biodegradable', value: '100% Organic & Plastic-Free' }
    ]
  },
  {
    id: 'prod-6',
    artisanId: 'artisan-6',
    artisanName: 'Santoshbai Maru',
    artisanLocation: 'Bhujodi, Kutch',
    artisanState: 'Gujarat',
    artisanPhone: '+91 98254 99014',
    name: 'Kutch Rabari Mirror-Work Embroidered Crossbody Sling Bag with Tassels',
    nameHindi: 'कच्छ की पारंपरिक रबारी कढ़ाई और शीशा काम वाला सुंदर स्लिंग बैग',
    category: 'Textile',
    description: 'Dense tribal chain-stitch embroidery and authentic convex Abhala mirrors stitched on hand-dyed organic khadi cotton. Finished with handmade yarn pom-poms and genuine brass bells.',
    descriptionHindi: 'कच्छ के कारीगरों द्वारा खादी सूती कपड़े पर हाथ से की गई रबारी कढ़ाई और असली कांच का काम। रंग-बिरंगे लटकन और पीतल की घंटियों से सजा हुआ।',
    shortDescription: 'Vibrant handcrafted Kutch Rabari embroidery sling bag with authentic glass mirrors.',
    shortDescriptionHindi: 'रंग-बिरंगी कच्छ कढ़ाई और शीशा काम वाला हस्तनिर्मित स्लिंग बैग।',
    material: 'Organic Handspun Khadi Cotton, Glass Mirrors, Woolen Threads',
    colour: 'Festive Crimson Red, Ochre & Indigo',
    size: '10 x 9 Inches (Adjustable 48 Inch Strap)',
    dimensions: '25cm x 23cm x 5cm',
    price: 950,
    suggestedPrice: 980,
    minPrice: 850,
    maxPrice: 1250,
    pricingExplanation: 'Hand-embroidered mirrorwork with over 450 stitches per square inch and durable canvas lining.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    originalImageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    imageQualityScore: 95,
    status: 'published',
    tags: ['Kutch Embroidery', 'Mirror Work', 'Sling Bag', 'Tribal Textile', 'Boho Handbag'],
    keywords: ['kutch bag', 'mirror work purse', 'ethnic sling bag', 'indian handmade tote'],
    stockQuantity: 12,
    viewsCount: 475,
    enquiriesCount: 24,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    isVerified: true,
    attributes: [
      { id: 'attr-12', name: 'Embroidery Style', value: 'Rabari Mirror Chain Stitch' },
      { id: 'attr-13', name: 'Lining', value: 'Double Heavy Cotton Twill' }
    ]
  }
];

const initialArtisanProfiles: Record<string, ArtisanProfile> = {
  'artisan-1': {
    id: 'prof-1',
    userId: 'artisan-1',
    craftType: 'Handloom',
    experienceYears: 24,
    village: 'Chanderi Purana Mohalla',
    district: 'Ashoknagar',
    state: 'Madhya Pradesh',
    bio: '3rd generation master handloom weaver specializing in pure silk and zari weaving. Preserving centuries-old pit-loom traditions.',
    bioHindi: 'तीसरी पीढ़ी के मास्टर बुनकर, जो शुद्ध रेशम और पारंपरिक ज़री बुनाई में सिद्धहस्त हैं।',
    isVerified: true,
    awards: ['State Master Weaver Award 2018', 'GI Tag Registered Artisan'],
    bankLinked: true
  },
  'artisan-2': {
    id: 'prof-2',
    userId: 'artisan-2',
    craftType: 'Pottery',
    experienceYears: 19,
    village: 'Kumharwada',
    district: 'Patan',
    state: 'Gujarat',
    bio: 'Traditional clay artisan crafting eco-friendly kitchenware and porous terracotta water dispensers with natural earth glazes.',
    bioHindi: 'पारंपरिक मिट्टी शिल्पी, जो प्राकृतिक और स्वास्थ्यवर्धक मिट्टी के बर्तन बनाते हैं।',
    isVerified: true,
    bankLinked: true
  }
};

const initialUsers: User[] = [
  {
    id: 'artisan-1',
    name: 'Rameshwar Lal Varma',
    email: 'rameshwar.weaver@artisanbridge.in',
    phone: '+91 98261 44521',
    role: 'artisan',
    language: 'hi',
    location: 'Chanderi, Madhya Pradesh',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString()
  },
  {
    id: 'buyer-1',
    name: 'Pooja Singhania (FabIndia Sourcing)',
    email: 'pooja.sourcing@fabcrafts.com',
    phone: '+91 98112 34567',
    role: 'buyer',
    language: 'en',
    location: 'New Delhi, Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    createdAt: new Date(Date.now() - 40 * 86400000).toISOString()
  },
  {
    id: 'admin-1',
    name: 'Dr. Anita Joshi (SIH Nodal Officer)',
    email: 'admin@artisanbridge.gov.in',
    phone: '+91 94120 99881',
    role: 'admin',
    language: 'en',
    location: 'Bhopal, MP',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    createdAt: new Date(Date.now() - 120 * 86400000).toISOString()
  }
];

const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-1',
    buyerId: 'buyer-1',
    buyerName: 'Pooja Singhania',
    buyerEmail: 'pooja.sourcing@fabcrafts.com',
    buyerPhone: '+91 98112 34567',
    buyerCompany: 'Heritage Retailers & Boutiques Ltd.',
    artisanId: 'artisan-1',
    artisanName: 'Rameshwar Lal Varma',
    productId: 'prod-1',
    productName: 'Handcrafted Pure Chanderi Zari Border Silk Saree',
    productPrice: 4850,
    productImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    quantityRequested: 25,
    targetBudget: 4500,
    message: 'Namaste Rameshwarji, we operate 8 ethnic boutiques in Delhi and Bangalore. We love this peacock blue Chanderi weave. Can you supply 25 pieces before Diwali with custom color borders? Looking forward to direct wholesale terms.',
    status: 'new',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'enq-2',
    buyerId: 'buyer-2',
    buyerName: 'Vikram Malhotra',
    buyerEmail: 'vikram@ecoliving.in',
    buyerPhone: '+91 99881 22334',
    buyerCompany: 'EcoLiving Hotels & Resorts',
    artisanId: 'artisan-1',
    artisanName: 'Rameshwar Lal Varma',
    productId: 'prod-1',
    productName: 'Handcrafted Pure Chanderi Zari Border Silk Saree',
    productPrice: 4850,
    productImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    quantityRequested: 5,
    targetBudget: 4700,
    message: 'Hello, looking for 5 authentic handloom sarees for our VIP corporate guests. Please let us know delivery lead time to Mumbai.',
    status: 'responded',
    responseMessage: 'Thank you Vikramji. Yes, we have 4 in stock and can weave 1 more in 4 days. Ready to dispatch via express courier.',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
  }
];

const initialBuyerRequirements: BuyerRequirement[] = [
  {
    id: 'req-1',
    buyerId: 'buyer-1',
    buyerName: 'Pooja Singhania',
    buyerEmail: 'pooja.sourcing@fabcrafts.com',
    category: 'Handloom',
    budget: 5000,
    material: 'Pure Silk, Zari',
    quantity: 30,
    location: 'Madhya Pradesh or Varanasi',
    preferredStyle: 'Traditional Zari Motifs',
    notes: 'Looking for authentic GI-tagged handloom textiles for festival collection.',
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString()
  },
  {
    id: 'req-2',
    buyerId: 'buyer-1',
    buyerName: 'Pooja Singhania',
    buyerEmail: 'pooja.sourcing@fabcrafts.com',
    category: 'Pottery',
    budget: 750,
    material: 'Clay Terracotta',
    quantity: 100,
    location: 'Gujarat or Rajasthan',
    preferredStyle: 'Hand carved water pots & planters',
    notes: 'Bulk corporate gifting order for sustainable summer campaign.',
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString()
  }
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'artisan-1',
    title: 'New B2B Bulk Enquiry Received! 🎁',
    message: 'Pooja Singhania from Heritage Boutiques requested a quote for 25 units of your Chanderi Silk Saree.',
    isRead: false,
    type: 'enquiry',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
  },
  {
    id: 'notif-2',
    userId: 'artisan-1',
    title: 'Product Verified & Boosted 🌟',
    message: 'Your handicraft was verified by the Ministry Nodal Office. It now has the Verified Artisan Trust Badge!',
    isRead: true,
    type: 'verification',
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString()
  }
];

// In-memory Database Store
class DatabaseStore {
  private products: Product[] = [...initialProducts];
  private users: User[] = [...initialUsers];
  private artisanProfiles: Record<string, ArtisanProfile> = { ...initialArtisanProfiles };
  private enquiries: Enquiry[] = [...initialEnquiries];
  private buyerRequirements: BuyerRequirement[] = [...initialBuyerRequirements];
  private notifications: NotificationItem[] = [...initialNotifications];
  private activeUser: User = initialUsers[0]; // Default to artisan-1 for seamless testing

  // User & Auth
  getActiveUser(): User {
    return this.activeUser;
  }

  setActiveUser(userId: string): User | null {
    const found = this.users.find(u => u.id === userId);
    if (found) {
      this.activeUser = found;
      return found;
    }
    return null;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  registerUser(userData: Partial<User>): User {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'New Artisan',
      email: userData.email || `user${Date.now()}@artisanbridge.in`,
      phone: userData.phone || '+91 98000 00000',
      role: userData.role || 'artisan',
      language: userData.language || 'hi',
      location: userData.location || 'India',
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    if (newUser.role === 'artisan') {
      this.artisanProfiles[newUser.id] = {
        id: `prof-${Date.now()}`,
        userId: newUser.id,
        craftType: 'Handloom',
        experienceYears: 5,
        village: 'Kalyanpur',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        bio: 'Traditional skilled artisan.',
        isVerified: false,
        bankLinked: false
      };
    }
    this.activeUser = newUser;
    return newUser;
  }

  getArtisanProfile(userId: string): ArtisanProfile {
    if (this.artisanProfiles[userId]) {
      return this.artisanProfiles[userId];
    }
    // Return default profile
    const defaultProf: ArtisanProfile = {
      id: `prof-${userId}`,
      userId,
      craftType: 'Handicraft',
      experienceYears: 10,
      village: 'Gram Panchayat',
      district: 'Central',
      state: 'Madhya Pradesh',
      bio: 'Skilled traditional artisan preserving folk heritage.',
      isVerified: true,
      bankLinked: true
    };
    this.artisanProfiles[userId] = defaultProf;
    return defaultProf;
  }

  updateArtisanProfile(userId: string, update: Partial<ArtisanProfile>): ArtisanProfile {
    const current = this.getArtisanProfile(userId);
    const updated = { ...current, ...update };
    this.artisanProfiles[userId] = updated;
    return updated;
  }

  // Products CRUD
  getAllProducts(filters?: { category?: string; search?: string; status?: string; artisanId?: string }): Product[] {
    let result = [...this.products];
    if (filters?.category && filters.category !== 'All Categories' && filters.category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
    }
    if (filters?.status) {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters?.artisanId) {
      result = result.filter(p => p.artisanId === filters.artisanId);
    }
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameHindi.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.artisanLocation.toLowerCase().includes(q) ||
        p.artisanName.toLowerCase().includes(q)
      );
    }
    return result;
  }

  getProductById(id: string): Product | null {
    const prod = this.products.find(p => p.id === id);
    if (prod) {
      prod.viewsCount += 1;
      return prod;
    }
    return null;
  }

  addProduct(productData: Partial<Product>): Product {
    const artisan = this.activeUser;
    const profile = this.getArtisanProfile(artisan.id);
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      artisanId: artisan.id,
      artisanName: artisan.name,
      artisanLocation: `${profile.village}, ${profile.district}`,
      artisanState: profile.state,
      artisanPhone: artisan.phone,
      name: productData.name || 'Handmade Artisan Craft',
      nameHindi: productData.nameHindi || 'हस्तनिर्मित कारीगर उत्पाद',
      category: (productData.category as CraftCategory) || profile.craftType || 'Handloom',
      description: productData.description || 'Authentic handmade product made by master artisan.',
      descriptionHindi: productData.descriptionHindi || 'कुशल कारीगर द्वारा हस्तनिर्मित प्रामाणिक उत्पाद।',
      shortDescription: productData.shortDescription || 'Authentic handmade Indian handicraft.',
      shortDescriptionHindi: productData.shortDescriptionHindi || 'प्रामाणिक भारतीय हस्तशिल्प।',
      material: productData.material || 'Natural Organic Materials',
      colour: productData.colour || 'Natural Earth Tones',
      size: productData.size || 'Standard Size',
      dimensions: productData.dimensions || '25cm x 20cm',
      price: Number(productData.price) || 1200,
      suggestedPrice: Number(productData.suggestedPrice) || 1250,
      minPrice: Number(productData.minPrice) || 1000,
      maxPrice: Number(productData.maxPrice) || 1500,
      pricingExplanation: productData.pricingExplanation || 'Fair trade price benchmarked against artisan labor & materials.',
      imageUrl: productData.imageUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      originalImageUrl: productData.originalImageUrl || productData.imageUrl,
      enhancedImageUrl: productData.enhancedImageUrl || productData.imageUrl,
      imageQualityScore: productData.imageQualityScore || 92,
      status: productData.status || 'published',
      tags: productData.tags || ['Handmade', 'Artisan Direct', 'Authentic'],
      keywords: productData.keywords || ['handcrafted', 'indian art', 'sustainable'],
      stockQuantity: Number(productData.stockQuantity) || 5,
      viewsCount: 1,
      enquiriesCount: 0,
      createdAt: new Date().toISOString(),
      isVerified: true,
      attributes: productData.attributes || [
        { id: `attr-${Date.now()}-1`, name: 'Handcrafted', value: '100% Manual Craft' }
      ]
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates };
    return this.products[idx];
  }

  deleteProduct(id: string): boolean {
    const prevLen = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    return this.products.length < prevLen;
  }

  // Enquiries
  getEnquiries(filters?: { artisanId?: string; buyerId?: string }): Enquiry[] {
    let result = [...this.enquiries];
    if (filters?.artisanId) {
      result = result.filter(e => e.artisanId === filters.artisanId);
    }
    if (filters?.buyerId) {
      result = result.filter(e => e.buyerId === filters.buyerId);
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createEnquiry(enqData: Partial<Enquiry>): Enquiry {
    const product = this.products.find(p => p.id === enqData.productId);
    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      buyerId: enqData.buyerId || this.activeUser.id,
      buyerName: enqData.buyerName || this.activeUser.name,
      buyerEmail: enqData.buyerEmail || this.activeUser.email,
      buyerPhone: enqData.buyerPhone || this.activeUser.phone,
      buyerCompany: enqData.buyerCompany || 'Direct Buyer',
      artisanId: product ? product.artisanId : (enqData.artisanId || 'artisan-1'),
      artisanName: product ? product.artisanName : (enqData.artisanName || 'Master Artisan'),
      productId: enqData.productId || (product?.id || 'prod-1'),
      productName: product ? product.name : (enqData.productName || 'Artisan Product'),
      productPrice: product ? product.price : 1000,
      productImageUrl: product ? product.imageUrl : 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      quantityRequested: Number(enqData.quantityRequested) || 1,
      targetBudget: Number(enqData.targetBudget) || (product ? product.price : 1000),
      message: enqData.message || 'I am interested in placing an order for this handcrafted item.',
      status: 'new',
      createdAt: new Date().toISOString()
    };
    this.enquiries.unshift(newEnquiry);
    if (product) {
      product.enquiriesCount += 1;
    }
    // Add notification for the artisan
    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: newEnquiry.artisanId,
      title: `New B2B Enquiry from ${newEnquiry.buyerName}! 📩`,
      message: `Enquiry for ${newEnquiry.quantityRequested} units of "${newEnquiry.productName}".`,
      isRead: false,
      type: 'enquiry',
      createdAt: new Date().toISOString()
    });
    return newEnquiry;
  }

  updateEnquiryStatus(id: string, status: 'new' | 'responded' | 'quoted' | 'closed', responseMessage?: string): Enquiry | null {
    const enq = this.enquiries.find(e => e.id === id);
    if (!enq) return null;
    enq.status = status;
    if (responseMessage) {
      enq.responseMessage = responseMessage;
    }
    return enq;
  }

  // Buyer Requirements & Match Recommendation Engine
  saveBuyerRequirement(reqData: Partial<BuyerRequirement>): BuyerRequirement {
    const newReq: BuyerRequirement = {
      id: `req-${Date.now()}`,
      buyerId: this.activeUser.id,
      buyerName: this.activeUser.name,
      buyerEmail: this.activeUser.email,
      category: reqData.category || 'Handloom',
      budget: Number(reqData.budget) || 2000,
      material: reqData.material || '',
      quantity: Number(reqData.quantity) || 10,
      location: reqData.location || '',
      preferredStyle: reqData.preferredStyle || '',
      notes: reqData.notes || '',
      createdAt: new Date().toISOString()
    };
    this.buyerRequirements.unshift(newReq);
    return newReq;
  }

  getBuyerRequirements(buyerId: string): BuyerRequirement[] {
    return this.buyerRequirements.filter(r => r.buyerId === buyerId);
  }

  // Calculate recommendation matches for a buyer requirement or custom search criteria
  matchProductsForBuyer(criteria: {
    category?: string;
    budget?: number;
    material?: string;
    location?: string;
    style?: string;
    quantity?: number;
    keywords?: string;
  }) {
    const published = this.products.filter(p => p.status === 'published');
    
    return published.map(product => {
      let categoryFit = 0;
      let attributeFit = 0;
      let priceFit = 0;
      let locationFit = 0;
      let styleFit = 0;
      const reasons: string[] = [];

      // 1. Category Fit (weight 35%)
      if (criteria.category && criteria.category !== 'all' && criteria.category !== 'All Categories') {
        if (product.category.toLowerCase() === criteria.category.toLowerCase()) {
          categoryFit = 35;
          reasons.push(`Exact craft match (${product.category})`);
        } else {
          categoryFit = 10;
        }
      } else {
        categoryFit = 30; // General match
      }

      // 2. Price Fit (weight 25%)
      if (criteria.budget && criteria.budget > 0) {
        const diff = Math.abs(product.price - criteria.budget);
        const ratio = diff / criteria.budget;
        if (ratio <= 0.15) {
          priceFit = 25;
          reasons.push(`Optimal budget alignment (₹${product.price} vs target ₹${criteria.budget})`);
        } else if (ratio <= 0.35) {
          priceFit = 18;
          reasons.push(`Close price compatibility`);
        } else if (product.price <= criteria.budget) {
          priceFit = 22;
          reasons.push(`Well within budget ceiling`);
        } else {
          priceFit = 8;
        }
      } else {
        priceFit = 20;
      }

      // 3. Attribute & Material Fit (weight 20%)
      if (criteria.material && criteria.material.trim()) {
        const mat = criteria.material.toLowerCase();
        if (product.material.toLowerCase().includes(mat)) {
          attributeFit = 20;
          reasons.push(`Authentic ${product.material} raw composition match`);
        } else {
          attributeFit = 8;
        }
      } else {
        attributeFit = 18;
      }

      // 4. Location & Regional Authenticity (weight 10%)
      if (criteria.location && criteria.location.trim()) {
        const loc = criteria.location.toLowerCase();
        if (product.artisanLocation.toLowerCase().includes(loc) || product.artisanState.toLowerCase().includes(loc)) {
          locationFit = 10;
          reasons.push(`Artisan cluster proximity in ${product.artisanState}`);
        } else {
          locationFit = 5;
        }
      } else {
        locationFit = 8;
      }

      // 5. Style & Verified Quality (weight 10%)
      if (product.isVerified) {
        styleFit += 6;
        reasons.push('Verified Artisan GI & Quality Standard');
      } else {
        styleFit += 3;
      }
      if (product.imageQualityScore >= 90) {
        styleFit += 4;
      }

      const totalScore = Math.min(99, Math.round(categoryFit + attributeFit + priceFit + locationFit + styleFit));

      return {
        productId: product.id,
        product,
        matchScore: totalScore,
        matchReasons: reasons.length > 0 ? reasons : ['High customer satisfaction & authentic handmade heritage'],
        matchBreakdown: {
          categoryFit,
          attributeFit,
          priceFit,
          locationFit,
          styleFit
        }
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }

  // Notifications
  getNotifications(userId: string): NotificationItem[] {
    return this.notifications.filter(n => n.userId === userId || n.userId === 'all');
  }

  markNotificationRead(id: string): void {
    const n = this.notifications.find(item => item.id === id);
    if (n) n.isRead = true;
  }

  // Admin Analytics
  getAdminAnalytics(): AdminAnalytics {
    const totalArtisans = this.users.filter(u => u.role === 'artisan').length;
    const totalBuyers = this.users.filter(u => u.role === 'buyer').length;
    const totalProducts = this.products.length;
    const publishedProducts = this.products.filter(p => p.status === 'published').length;
    const totalEnquiries = this.enquiries.length;
    const activeEnquiries = this.enquiries.filter(e => e.status === 'new' || e.status === 'responded').length;
    const avgPrice = Math.round(this.products.reduce((acc, p) => acc + p.price, 0) / (totalProducts || 1));

    // Category distribution
    const catMap: Record<string, number> = {};
    this.products.forEach(p => {
      catMap[p.category] = (catMap[p.category] || 0) + 1;
    });
    const categoryDistribution = Object.entries(catMap).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / totalProducts) * 100)
    }));

    // State distribution
    const stateMap: Record<string, { artisans: Set<string>; products: number }> = {};
    this.products.forEach(p => {
      if (!stateMap[p.artisanState]) {
        stateMap[p.artisanState] = { artisans: new Set(), products: 0 };
      }
      stateMap[p.artisanState].artisans.add(p.artisanId);
      stateMap[p.artisanState].products += 1;
    });
    const stateDistribution = Object.entries(stateMap).map(([state, data]) => ({
      state,
      artisansCount: data.artisans.size,
      productsCount: data.products
    }));

    // Enquiry status breakdown
    const statusMap: Record<string, number> = {};
    this.enquiries.forEach(e => {
      statusMap[e.status] = (statusMap[e.status] || 0) + 1;
    });
    const enquiryStatusBreakdown = Object.entries(statusMap).map(([status, count]) => ({
      status,
      count
    }));

    const recentActivity = [
      {
        id: 'act-1',
        description: 'New B2B bulk enquiry submitted by Pooja Singhania for Chanderi Saree (25 pcs)',
        timestamp: '1 hour ago',
        type: 'enquiry' as const
      },
      {
        id: 'act-2',
        description: 'Artisan Rameshwar Lal Varma published a verified Handloom Chanderi Saree',
        timestamp: '3 hours ago',
        type: 'product' as const
      },
      {
        id: 'act-3',
        description: 'AI Image Studio enhanced 14 handmade craft photographs with 94%+ quality score',
        timestamp: '5 hours ago',
        type: 'product' as const
      },
      {
        id: 'act-4',
        description: 'New Artisan Parvati Devi Kumbhar registered from Patan, Gujarat (Pottery Cluster)',
        timestamp: '1 day ago',
        type: 'artisan' as const
      }
    ];

    return {
      totalArtisans,
      totalBuyers,
      totalProducts,
      publishedProducts,
      totalEnquiries,
      activeEnquiries,
      averageProductPrice: avgPrice,
      categoryDistribution,
      stateDistribution,
      enquiryStatusBreakdown,
      recentActivity
    };
  }
}

export const db = new DatabaseStore();

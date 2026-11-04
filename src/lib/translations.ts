export type Language = 'en' | 'hi';

export const translations = {
  en: {
    appName: 'AI-Powered Artisan Market Bridge',
    appTagline: 'Virtual Business Manager for Indian Artisans',
    artisan: 'Artisan',
    buyer: 'Buyer',
    admin: 'Admin',
    switchRole: 'Switch Role',
    language: 'Language',
    
    // Navigation
    home: 'Home',
    products: 'My Products',
    addProduct: 'Add Product',
    marketplace: 'Marketplace',
    enquiries: 'Enquiries',
    profile: 'Profile',
    analytics: 'Analytics',

    // Artisan actions
    actionAddProduct: '+ Add Product',
    actionEnhanceImage: '📸 Enhance Image',
    actionVoiceCatalog: '🎙️ Create Catalog',
    actionGetPrice: '💰 Get Price',
    actionViewMarket: '🛍️ View Market',

    // Wizard steps
    step1Title: 'Step 1: Photo',
    step1Sub: 'Capture or upload your handmade product photo',
    step2Title: 'Step 2: Voice Description',
    step2Sub: 'Speak in your regional language or Hindi',
    step3Title: 'Step 3: AI Catalog',
    step3Sub: 'Review smart English & Hindi product catalog',
    step4Title: 'Step 4: Price Recommendation',
    step4Sub: 'Get competitive price & fair profit margin',
    step5Title: 'Step 5: Publish & Connect',
    step5Sub: 'List your product for national & B2B buyers',

    // Image Enhancer
    aiEnhancerTitle: 'AI Image Studio & Enhancer',
    before: 'Original Photo',
    after: 'AI Studio Enhanced',
    imageQualityScore: 'Image Quality Score',
    lightingCorrected: 'Lighting & Contrast Balanced',
    bgCleaned: 'Background Cleaned & E-commerce Ready',
    sharpnessBoosted: 'Sharpness & Texture Enhanced',
    uploadPhoto: 'Upload Product Photo',
    takePhoto: 'Take Camera Photo',
    processingAI: 'AI is analyzing & enhancing your photo...',
    
    // Voice
    voicePrompt: 'Tap microphone and speak about your product (e.g., material, time taken, uniqueness)...',
    recording: 'Listening... Please speak now',
    stopRecording: 'Done Speaking',
    orTypeText: 'Or type description here:',
    generateCatalogBtn: '🪄 Generate AI Multilingual Catalog',
    generatingCatalog: 'AI is creating your professional catalog in Hindi & English...',

    // Pricing
    pricingAssistant: 'Dynamic Pricing Assistant',
    suggestedPrice: 'Suggested Price',
    recommendedRange: 'Recommended Market Range',
    rawMaterialCost: 'Raw Material Cost (₹)',
    laborHours: 'Time / Labor Hours',
    hourlyWage: 'Artisan Hourly Rate (₹)',
    pricingConfidence: 'AI Pricing Confidence',
    fairTradeNote: 'Recommendation ensures minimum 35% fair artisan profit margin based on market trends.',

    // Catalog fields
    productName: 'Product Name',
    category: 'Craft Category',
    material: 'Material',
    colour: 'Colour',
    size: 'Size / Dimensions',
    shortDesc: 'Short Description',
    detailedDesc: 'Detailed Story & Description',
    tags: 'Keywords & Tags',
    careInstructions: 'Care Instructions',
    culturalHeritage: 'Cultural Heritage Story',
    publishProduct: '🚀 Publish Product to Market',
    saveDraft: 'Save as Draft',
    productPublishedSuccess: 'Product published successfully to marketplace!',

    // Marketplace
    searchPlaceholder: 'Search handloom sarees, terracotta pots, brass jewellery...',
    filterCategory: 'All Categories',
    allRegions: 'All India',
    sortBy: 'Sort By',
    aiMatchScore: 'AI Match Score',
    sendEnquiry: 'Contact / Send Enquiry',
    verifiedArtisan: 'Verified Artisan',
    b2bWholesale: 'B2B & Bulk Orders Available',
    sendEnquiryTitle: 'Send B2B Enquiry to Artisan',
    quantityNeeded: 'Quantity Needed',
    targetBudget: 'Target Budget per unit (₹)',
    enquiryMessage: 'Message for Artisan',
    enquirySentSuccess: 'Enquiry sent! The artisan will contact you directly via phone or WhatsApp.',

    // Dashboards
    totalProducts: 'Total Products',
    publishedItems: 'Active in Market',
    totalEnquiriesCount: 'Buyer Enquiries',
    marketOpportunities: 'Market Demand Leads',
    recentEnquiries: 'Recent Buyer Enquiries',
    noEnquiriesYet: 'No enquiries yet. Promote your crafts or publish more items!',
    
    // Voice reader
    listenToAudio: '🔊 Listen (Voice Assistant)',
    stopAudio: '⏹ Stop Audio',

    // Admin
    adminTitle: 'SIH26090 Platform Control Center',
    totalArtisans: 'Registered Artisans',
    totalBuyers: 'Active B2B Buyers',
    verificationQueue: 'Artisan Product Verification Queue',
    verifyBtn: 'Verify & Badge',
    rejectBtn: 'Flag for Review',
  },
  hi: {
    appName: 'एआई-संचालित कारीगर बाज़ार सेतु',
    appTagline: 'भारतीय कारीगरों के लिए डिजिटल व्यापार सहायक',
    artisan: 'कारीगर (Artisan)',
    buyer: 'खरीदार (Buyer)',
    admin: 'प्रशासक (Admin)',
    switchRole: 'भूमिका बदलें',
    language: 'भाषा',

    // Navigation
    home: 'होम',
    products: 'मेरे उत्पाद',
    addProduct: 'उत्पाद जोड़ें',
    marketplace: 'बाज़ार',
    enquiries: 'पूछताछ (Enquiries)',
    profile: 'प्रोफ़ाइल',
    analytics: 'एनालिटिक्स',

    // Artisan actions
    actionAddProduct: '+ नया उत्पाद जोड़ें',
    actionEnhanceImage: '📸 फोटो सुंदर बनाएं',
    actionVoiceCatalog: '🎙️ बोलकर कैटलॉग बनाएं',
    actionGetPrice: '💰 सही कीमत जानें',
    actionViewMarket: '🛍️ बाज़ार देखें',

    // Wizard steps
    step1Title: 'चरण 1: फोटो',
    step1Sub: 'अपने हस्तशिल्प उत्पाद की फोटो लें या अपलोड करें',
    step2Title: 'चरण 2: बोलकर बताएं',
    step2Sub: 'अपनी मातृभाषा या हिंदी में उत्पाद के बारे में बोलें',
    step3Title: 'चरण 3: एआई कैटलॉग',
    step3Sub: 'हिंदी और अंग्रेजी में तैयार डिजिटल कैटलॉग देखें',
    step4Title: 'चरण 4: सही मूल्य निर्धारण',
    step4Sub: 'उचित लाभ और बाज़ार के अनुसार सही दाम पाएं',
    step5Title: 'चरण 5: बाज़ार में प्रकाशित करें',
    step5Sub: 'देश भर के खरीदारों और व्यापारियों से सीधे जुड़ें',

    // Image Enhancer
    aiEnhancerTitle: 'एआई फोटो सुधारक और स्टूडियो',
    before: 'साधारण फोटो',
    after: 'एआई स्टूडियो फोटो',
    imageQualityScore: 'फोटो गुणवत्ता स्कोर',
    lightingCorrected: 'रोशनी और कंट्रास्ट संतुलित',
    bgCleaned: 'पृष्ठभूमि साफ और ई-कॉमर्स तैयार',
    sharpnessBoosted: 'बारीकियां और चमक बढ़ाई गई',
    uploadPhoto: 'फोटो अपलोड करें',
    takePhoto: 'कैमरा से फोटो खींचें',
    processingAI: 'एआई आपकी फोटो का विश्लेषण और सुधार कर रहा है...',

    // Voice
    voicePrompt: 'माइक दबाएं और अपने उत्पाद के बारे में बोलें (सामग्री, बनाने में लगा समय, खासियत)...',
    recording: 'सुन रहे हैं... कृपया अब बोलें',
    stopRecording: 'बोलना समाप्त हुआ',
    orTypeText: 'या यहां टाइप करें:',
    generateCatalogBtn: '🪄 एआई से कैटलॉग तैयार करें',
    generatingCatalog: 'एआई हिंदी और अंग्रेजी में विवरण तैयार कर रहा है...',

    // Pricing
    pricingAssistant: 'डायनामिक मूल्य निर्धारण सहायक',
    suggestedPrice: 'सुझाई गई उचित कीमत',
    recommendedRange: 'बाज़ार मूल्य सीमा',
    rawMaterialCost: 'कच्चे माल की लागत (₹)',
    laborHours: 'मेहनत / काम के घंटे',
    hourlyWage: 'कारीगर का प्रति घंटा मूल्य (₹)',
    pricingConfidence: 'एआई मूल्य निर्धारण सटीकता',
    fairTradeNote: 'यह सुझाव कारीगर को बाज़ार की मांग के आधार पर कम से कम 35% उचित लाभ सुनिश्चित करता है।',

    // Catalog fields
    productName: 'उत्पाद का नाम',
    category: 'शिल्प श्रेणी (Category)',
    material: 'सामग्री (Material)',
    colour: 'रंग (Colour)',
    size: 'आकार / माप (Size)',
    shortDesc: 'संक्षिप्त विवरण',
    detailedDesc: 'विस्तृत कहानी और जानकारी',
    tags: 'खोज शब्द (Tags)',
    careInstructions: 'रखरखाव के निर्देश',
    culturalHeritage: 'शिल्प की ऐतिहासिक विरासत',
    publishProduct: '🚀 बाज़ार में उत्पाद प्रकाशित करें',
    saveDraft: 'ड्राफ्ट के रूप में सहेजें',
    productPublishedSuccess: 'बधाई! आपका उत्पाद बाज़ार में सफलतापूर्वक प्रकाशित हो गया है!',

    // Marketplace
    searchPlaceholder: 'हथकरघा साड़ी, मिट्टी के बर्तन, पीतल के गहने खोजें...',
    filterCategory: 'सभी श्रेणियां',
    allRegions: 'पूरा भारत',
    sortBy: 'क्रमबद्ध करें',
    aiMatchScore: 'एआई मैच स्कोर',
    sendEnquiry: 'कारीगर से संपर्क करें',
    verifiedArtisan: 'प्रमाणित कारीगर',
    b2bWholesale: 'थोक एवं B2B ऑर्डर उपलब्ध',
    sendEnquiryTitle: 'कारीगर को थोक / व्यक्तिगत पूछताछ भेजें',
    quantityNeeded: 'मात्रा (Quantity)',
    targetBudget: 'प्रति नग अपेक्षित बजट (₹)',
    enquiryMessage: 'कारीगर के लिए संदेश',
    enquirySentSuccess: 'पूछताछ भेज दी गई है! कारीगर आपसे फोन या व्हाट्सएप पर सीधे संपर्क करेंगे।',

    // Dashboards
    totalProducts: 'कुल उत्पाद',
    publishedItems: 'बाज़ार में सक्रिय',
    totalEnquiriesCount: 'खरीदार पूछताछ',
    marketOpportunities: 'बाज़ार मांग अवसर',
    recentEnquiries: 'हालिया खरीदार पूछताछ',
    noEnquiriesYet: 'अभी कोई पूछताछ नहीं है। और उत्पाद जोड़ें!',

    // Voice reader
    listenToAudio: '🔊 आवाज में सुनें (Voice)',
    stopAudio: '⏹ आवाज रोकें',

    // Admin
    adminTitle: 'SIH26090 प्लेटफ़ॉर्म नियंत्रण केंद्र',
    totalArtisans: 'पंजीकृत कारीगर',
    totalBuyers: 'सक्रिय B2B खरीदार',
    verificationQueue: 'उत्पाद सत्यापन सूची',
    verifyBtn: 'सत्यापित करें',
    rejectBtn: 'जांच के लिए चिह्नित करें',
  },
};

export type UserRole = 'artisan' | 'buyer' | 'admin';

export type CraftCategory =
  | 'Handloom'
  | 'Textile'
  | 'Pottery'
  | 'Jewellery'
  | 'Wooden Craft'
  | 'Home Décor'
  | 'Basketry'
  | 'Handicraft'
  | 'Metal & Brass'
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  language: 'en' | 'hi';
  location: string;
  state?: string;
  companyName?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ArtisanProfile {
  id: string;
  userId: string;
  craftType: CraftCategory;
  experienceYears: number;
  village: string;
  district: string;
  state: string;
  bio: string;
  bioHindi?: string;
  isVerified: boolean;
  awards?: string[];
  bankLinked?: boolean;
  upiId?: string;
  bankAccountNumber?: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
}

export interface Product {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  artisanState: string;
  artisanPhone: string;
  name: string;
  nameHindi: string;
  category: CraftCategory;
  description: string;
  descriptionHindi: string;
  shortDescription: string;
  shortDescriptionHindi: string;
  material: string;
  colour: string;
  size: string;
  dimensions?: string;
  price: number;
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  pricingExplanation?: string;
  imageUrl: string;
  originalImageUrl?: string;
  enhancedImageUrl?: string;
  imageQualityScore: number;
  status: 'published' | 'draft' | 'unlisted';
  tags: string[];
  keywords: string[];
  stockQuantity: number;
  viewsCount: number;
  enquiriesCount: number;
  createdAt: string;
  attributes: ProductAttribute[];
  isVerified: boolean;
}

export interface ImageEnhancementResult {
  originalImage: string;
  enhancedImage: string;
  imageQualityScore: number;
  enhancementsApplied: string[];
  brightnessCorrection: number;
  sharpnessScore: number;
  lightingBalance: number;
  backgroundRemoved: boolean;
  status: 'success' | 'fallback';
}

export interface ProductClassificationResult {
  category: CraftCategory;
  productType: string;
  material: string;
  colour: string;
  style: string;
  craftHeritage: string;
  confidenceScore: number;
  detectedAttributes: Record<string, string>;
}

export interface CatalogGenerationResult {
  name: string;
  nameHindi: string;
  category: CraftCategory;
  shortDescription: string;
  shortDescriptionHindi: string;
  detailedDescription: string;
  detailedDescriptionHindi: string;
  material: string;
  colour: string;
  size: string;
  keywords: string[];
  tags: string[];
  careInstructions: string;
  culturalStory: string;
}

export interface PriceSuggestionResult {
  suggestedPrice: number;
  minRecommendedPrice: number;
  maxRecommendedPrice: number;
  pricingConfidence: number;
  explanation: string;
  explanationHindi: string;
  breakdown: {
    rawMaterialCost: number;
    laborHours: number;
    hourlyWage: number;
    laborCost: number;
    artisanMarginPercentage: number;
    estimatedMarketBenchmark: number;
  };
}

export interface BuyerRequirement {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  category: CraftCategory;
  budget: number;
  material?: string;
  quantity: number;
  location?: string;
  preferredStyle?: string;
  notes?: string;
  createdAt: string;
}

export interface RecommendationMatch {
  productId: string;
  product: Product;
  matchScore: number; // 0-100
  matchReasons: string[];
  matchBreakdown: {
    categoryFit: number;
    attributeFit: number;
    priceFit: number;
    locationFit: number;
    styleFit: number;
  };
}

export interface Enquiry {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCompany?: string;
  artisanId: string;
  artisanName: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantityRequested: number;
  targetBudget?: number;
  message: string;
  status: 'new' | 'responded' | 'quoted' | 'closed';
  responseMessage?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: 'enquiry' | 'price' | 'verification' | 'system';
}

export interface AdminAnalytics {
  totalArtisans: number;
  totalBuyers: number;
  totalProducts: number;
  publishedProducts: number;
  totalEnquiries: number;
  activeEnquiries: number;
  averageProductPrice: number;
  categoryDistribution: { category: string; count: number; percentage: number }[];
  stateDistribution: { state: string; artisansCount: number; productsCount: number }[];
  enquiryStatusBreakdown: { status: string; count: number }[];
  recentActivity: {
    id: string;
    description: string;
    timestamp: string;
    type: 'product' | 'artisan' | 'enquiry';
  }[];
}

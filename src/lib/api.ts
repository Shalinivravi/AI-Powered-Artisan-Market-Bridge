import {
  User,
  ArtisanProfile,
  Product,
  Enquiry,
  ImageEnhancementResult,
  ProductClassificationResult,
  CatalogGenerationResult,
  PriceSuggestionResult,
  RecommendationMatch,
  BuyerRequirement,
  NotificationItem,
  AdminAnalytics,
  CraftCategory
} from '../types';

export const api = {
  // Auth
  async getCurrentUser(): Promise<{ user: User; profile: ArtisanProfile | null }> {
    const res = await fetch('/api/auth/me');
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  async switchRole(role: 'artisan' | 'buyer' | 'admin'): Promise<{ user: User }> {
    const res = await fetch('/api/auth/switch-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    });
    if (!res.ok) throw new Error('Failed to switch role');
    return res.json();
  },

  async login(payload: { email?: string; role?: string; userId?: string }): Promise<{ user: User; token: string }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async register(payload: Partial<User>): Promise<{ user: User; token: string }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  // Artisan Profile
  async getArtisanProfile(): Promise<ArtisanProfile> {
    const res = await fetch('/api/artisan/profile');
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  async updateArtisanProfile(profile: Partial<ArtisanProfile>): Promise<ArtisanProfile> {
    const res = await fetch('/api/artisan/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Products
  async getProducts(params?: { category?: string; search?: string; status?: string; artisanId?: string }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.status) query.append('status', params.status);
    if (params?.artisanId) query.append('artisanId', params.artisanId);
    
    const res = await fetch(`/api/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProductById(id: string): Promise<Product> {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  async deleteProduct(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');
    return res.json();
  },

  // AI Services
  async enhanceImage(payload: {
    image: string;
    autoEnhance?: boolean;
    removeBg?: boolean;
    boostLight?: boolean;
  }): Promise<ImageEnhancementResult> {
    const res = await fetch('/api/ai/enhance-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Image enhancement failed');
    return res.json();
  },

  async classifyProduct(payload: { image?: string; hintText?: string }): Promise<ProductClassificationResult> {
    const res = await fetch('/api/ai/classify-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Product recognition failed');
    return res.json();
  },

  async generateCatalog(payload: {
    voiceTranscription?: string;
    textDescription?: string;
    category?: CraftCategory;
    material?: string;
    artisanName?: string;
    region?: string;
  }): Promise<CatalogGenerationResult> {
    const res = await fetch('/api/ai/generate-catalog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Catalog generation failed');
    return res.json();
  },

  async getPriceSuggestion(payload: {
    category: CraftCategory;
    material: string;
    size?: string;
    rawMaterialCost?: number;
    laborHours?: number;
    hourlyWage?: number;
    artisanStatedPrice?: number;
  }): Promise<PriceSuggestionResult> {
    const res = await fetch('/api/ai/price-suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Pricing suggestion failed');
    return res.json();
  },

  // Recommendations & Matching
  async getRecommendations(criteria: {
    category?: string;
    budget?: number;
    material?: string;
    location?: string;
    style?: string;
  }): Promise<RecommendationMatch[]> {
    const res = await fetch('/api/recommendations/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(criteria)
    });
    if (!res.ok) throw new Error('Failed to match recommendations');
    return res.json();
  },

  async submitBuyerRequirement(reqData: Partial<BuyerRequirement>): Promise<{ requirement: BuyerRequirement; topMatches: RecommendationMatch[] }> {
    const res = await fetch('/api/buyer/requirements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqData)
    });
    if (!res.ok) throw new Error('Failed to submit requirement');
    return res.json();
  },

  // Enquiries
  async getEnquiries(params?: { artisanId?: string; buyerId?: string }): Promise<Enquiry[]> {
    const query = new URLSearchParams();
    if (params?.artisanId) query.append('artisanId', params.artisanId);
    if (params?.buyerId) query.append('buyerId', params.buyerId);
    const res = await fetch(`/api/enquiries?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch enquiries');
    return res.json();
  },

  async createEnquiry(enquiryData: Partial<Enquiry>): Promise<Enquiry> {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
    if (!res.ok) throw new Error('Failed to submit enquiry');
    return res.json();
  },

  async updateEnquiryStatus(id: string, status: 'new' | 'responded' | 'quoted' | 'closed', responseMessage?: string): Promise<Enquiry> {
    const res = await fetch(`/api/enquiries/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, responseMessage })
    });
    if (!res.ok) throw new Error('Failed to update enquiry');
    return res.json();
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    const res = await fetch('/api/notifications');
    if (!res.ok) return [];
    return res.json();
  },

  async markNotificationRead(id: string): Promise<void> {
    await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
  },

  // Admin
  async getAdminAnalytics(): Promise<AdminAnalytics> {
    const res = await fetch('/api/admin/analytics');
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  },

  async verifyProduct(id: string, isVerified: boolean): Promise<Product> {
    const res = await fetch(`/api/admin/products/${id}/verify`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVerified })
    });
    if (!res.ok) throw new Error('Failed to verify product');
    return res.json();
  }
};

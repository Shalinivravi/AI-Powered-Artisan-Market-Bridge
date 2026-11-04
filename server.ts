import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.ts';
import {
  enhanceProductImage,
  classifyProductImage,
  generateProductCatalog,
  calculatePriceSuggestion
} from './server/ai.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for large payload (base64 images from camera / studio)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'AI-Powered Artisan Market Bridge API',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // --- Authentication Routes ---
  app.get('/api/auth/me', (req, res) => {
    const user = db.getActiveUser();
    const profile = user.role === 'artisan' ? db.getArtisanProfile(user.id) : null;
    res.json({ user, profile });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, role, userId } = req.body;
    if (userId) {
      const user = db.setActiveUser(userId);
      if (user) {
        return res.json({ success: true, user, token: `jwt-demo-${user.id}` });
      }
    }
    const allUsers = db.getAllUsers();
    let user = allUsers.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    if (!user && role) {
      user = allUsers.find(u => u.role === role);
    }
    if (user) {
      db.setActiveUser(user.id);
      return res.json({ success: true, user, token: `jwt-demo-${user.id}` });
    }
    res.status(401).json({ error: 'User not found' });
  });

  app.post('/api/auth/register', (req, res) => {
    try {
      const newUser = db.registerUser(req.body);
      res.status(201).json({ success: true, user: newUser, token: `jwt-demo-${newUser.id}` });
    } catch (e: any) {
      res.status(400).json({ error: e.message || 'Registration failed' });
    }
  });

  app.post('/api/auth/switch-role', (req, res) => {
    const { role } = req.body;
    const allUsers = db.getAllUsers();
    const user = allUsers.find(u => u.role === role);
    if (user) {
      db.setActiveUser(user.id);
      return res.json({ success: true, user });
    }
    res.status(404).json({ error: `No user found with role ${role}` });
  });

  // --- Artisan Profile Routes ---
  app.get('/api/artisan/profile', (req, res) => {
    const user = db.getActiveUser();
    const profile = db.getArtisanProfile(user.id);
    res.json(profile);
  });

  app.put('/api/artisan/profile', (req, res) => {
    const user = db.getActiveUser();
    const updated = db.updateArtisanProfile(user.id, req.body);
    res.json(updated);
  });

  // --- Products CRUD Routes ---
  app.get('/api/products', (req, res) => {
    const { category, search, status, artisanId } = req.query;
    const products = db.getAllProducts({
      category: category as string,
      search: search as string,
      status: status as string,
      artisanId: artisanId as string
    });
    res.json(products);
  });

  app.get('/api/products/:id', (req, res) => {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });

  app.post('/api/products', (req, res) => {
    try {
      const product = db.addProduct(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.put('/api/products/:id', (req, res) => {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  });

  app.delete('/api/products/:id', (req, res) => {
    const success = db.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  });

  // --- AI Module Endpoints ---

  // 1. AI Image Enhancement & Studio Quality Audit
  app.post(['/api/products/enhance-image', '/api/ai/enhance-image'], async (req, res) => {
    try {
      const { image, autoEnhance, removeBg, boostLight } = req.body;
      if (!image) {
        return res.status(400).json({ error: 'Image base64 or URL is required' });
      }
      const result = await enhanceProductImage(image, { autoEnhance, removeBg, boostLight });
      res.json(result);
    } catch (e: any) {
      console.error('Enhance Image Error:', e);
      res.status(500).json({
        error: 'Image enhancement encountered an issue',
        fallback: true
      });
    }
  });

  // 2. AI Product Recognition & Classification
  app.post('/api/ai/classify-product', async (req, res) => {
    try {
      const { image, hintText } = req.body;
      const result = await classifyProductImage(image || '', hintText);
      res.json(result);
    } catch (e: any) {
      console.error('Classify Product Error:', e);
      res.status(500).json({ error: 'Product classification failed' });
    }
  });

  // 3. Multilingual Auto-Cataloger (Voice/Text -> Bilingual Catalog)
  app.post('/api/ai/generate-catalog', async (req, res) => {
    try {
      const { voiceTranscription, textDescription, category, material, artisanName, region } = req.body;
      const result = await generateProductCatalog({
        voiceTranscription,
        textDescription,
        category,
        material,
        artisanName,
        region
      });
      res.json(result);
    } catch (e: any) {
      console.error('Generate Catalog Error:', e);
      res.status(500).json({ error: 'Catalog generation failed' });
    }
  });

  // 4. Dynamic Pricing Assistant
  app.post('/api/ai/price-suggestion', async (req, res) => {
    try {
      const { category, material, size, rawMaterialCost, laborHours, hourlyWage, artisanStatedPrice } = req.body;
      const result = await calculatePriceSuggestion({
        category: category || 'Handicraft',
        material: material || 'Handmade',
        size,
        rawMaterialCost,
        laborHours,
        hourlyWage,
        artisanStatedPrice
      });
      res.json(result);
    } catch (e: any) {
      console.error('Price Suggestion Error:', e);
      res.status(500).json({ error: 'Pricing calculation failed' });
    }
  });

  // --- Recommendation Engine & Buyer Matching ---
  app.post('/api/recommendations/match', (req, res) => {
    try {
      const criteria = req.body;
      const matches = db.matchProductsForBuyer(criteria);
      res.json(matches);
    } catch (e: any) {
      res.status(500).json({ error: 'Matching failed' });
    }
  });

  app.post('/api/buyer/requirements', (req, res) => {
    try {
      const reqRecord = db.saveBuyerRequirement(req.body);
      const matches = db.matchProductsForBuyer({
        category: reqRecord.category,
        budget: reqRecord.budget,
        material: reqRecord.material,
        location: reqRecord.location,
        style: reqRecord.preferredStyle
      });
      res.status(201).json({ requirement: reqRecord, topMatches: matches.slice(0, 5) });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.get('/api/buyer/recommendations', (req, res) => {
    const user = db.getActiveUser();
    const requirements = db.getBuyerRequirements(user.id);
    const primaryReq = requirements[0];
    const matches = db.matchProductsForBuyer({
      category: primaryReq?.category,
      budget: primaryReq?.budget,
      material: primaryReq?.material
    });
    res.json({ requirements, recommendations: matches });
  });

  // --- Enquiries & Connection ---
  app.get('/api/enquiries', (req, res) => {
    const { artisanId, buyerId } = req.query;
    const list = db.getEnquiries({
      artisanId: artisanId as string,
      buyerId: buyerId as string
    });
    res.json(list);
  });

  app.post('/api/enquiries', (req, res) => {
    try {
      const enq = db.createEnquiry(req.body);
      res.status(201).json(enq);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put('/api/enquiries/:id/status', (req, res) => {
    const { status, responseMessage } = req.body;
    const updated = db.updateEnquiryStatus(req.params.id, status, responseMessage);
    if (!updated) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json(updated);
  });

  // --- Notifications ---
  app.get('/api/notifications', (req, res) => {
    const user = db.getActiveUser();
    const notifs = db.getNotifications(user.id);
    res.json(notifs);
  });

  app.post('/api/notifications/:id/read', (req, res) => {
    db.markNotificationRead(req.params.id);
    res.json({ success: true });
  });

  // --- Admin Analytics & Management ---
  app.get('/api/admin/analytics', (req, res) => {
    const analytics = db.getAdminAnalytics();
    res.json(analytics);
  });

  app.get('/api/admin/users', (req, res) => {
    res.json(db.getAllUsers());
  });

  app.put('/api/admin/products/:id/verify', (req, res) => {
    const { isVerified } = req.body;
    const updated = db.updateProduct(req.params.id, { isVerified: isVerified ?? true });
    res.json(updated);
  });

  // --- Vite Dev & Production Static Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI-Powered Artisan Market Bridge Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});

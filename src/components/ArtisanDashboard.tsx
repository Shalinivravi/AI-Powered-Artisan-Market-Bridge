import React from 'react';
import { Product, Enquiry, User, ArtisanProfile } from '../types';
import { Language, translations } from '../lib/translations';
import {
  Sparkles,
  Camera,
  Mic,
  IndianRupee,
  ShoppingBag,
  Plus,
  Eye,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Phone,
  Clock,
  ArrowRight,
  Trash2,
  Volume2
} from 'lucide-react';

interface ArtisanDashboardProps {
  user: User;
  profile: ArtisanProfile | null;
  language: Language;
  products: Product[];
  enquiries: Enquiry[];
  onStartAddProduct: () => void;
  onOpenStudio: () => void;
  onOpenVoiceCataloger: () => void;
  onOpenPricingTool: () => void;
  onOpenMarketplace: () => void;
  onSelectProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onOpenEnquiry: (e: Enquiry) => void;
}

export const ArtisanDashboard: React.FC<ArtisanDashboardProps> = ({
  user,
  profile,
  language,
  products,
  enquiries,
  onStartAddProduct,
  onOpenStudio,
  onOpenVoiceCataloger,
  onOpenPricingTool,
  onOpenMarketplace,
  onSelectProduct,
  onDeleteProduct,
  onOpenEnquiry
}) => {
  const t = translations[language];
  const publishedProducts = products.filter(p => p.status === 'published');
  const totalViews = products.reduce((acc, p) => acc + (p.viewsCount || 0), 0);
  const activeEnquiries = enquiries.filter(e => e.status === 'new' || e.status === 'responded');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-[#151619] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#2D2D2D] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-[#5A5A40] text-white border border-[#8A8A70] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5F2ED]" />
                {profile?.craftType || 'Master Artisan'} • {profile?.state || 'India'}
              </span>
              <span className="text-[11px] text-[#D4CFC3] bg-[#2D2D2D] px-2.5 py-0.5 rounded-full border border-[#3E3E3E]">
                {profile?.experienceYears || 20}+ Years Craft Lineage
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {language === 'hi' ? `नमस्ते, ${user.name} जी` : `Welcome back, ${user.name}`}
            </h1>
            <p className="text-xs sm:text-sm text-[#D4CFC3] max-w-2xl leading-relaxed">
              {language === 'hi'
                ? 'आपका डिजिटल व्यापार सहायक सक्रिय है। नए हस्तनिर्मित उत्पाद जोड़ें, फोटो सुधारें या सीधे खरीदारों से जुड़ें।'
                : 'Your Virtual Business Manager is active. Digitize your handmade crafts, auto-enhance photos, and connect with B2B buyers across India.'}
            </p>
          </div>

          {/* Big Quick Add Button */}
          <button
            id="dashboard-main-add-btn"
            onClick={onStartAddProduct}
            className="px-6 py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-black text-sm shadow-lg shadow-[#5A5A4033] flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5 text-white stroke-[3]" />
            <span>{t.actionAddProduct}</span>
          </button>
        </div>
      </div>

      {/* 5 Big Visual Action Tiles (Section 12 of prompt) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* 1. Add Product */}
        <button
          id="action-card-add-product"
          onClick={onStartAddProduct}
          className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D5] hover:border-[#5A5A40] hover:bg-[#ECE8DF] text-left transition-all group shadow-xs flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-[#5A5A40] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#2D2D2D] text-sm">{t.actionAddProduct}</h4>
            <p className="text-[11px] text-[#8A8A70] mt-0.5">5-Step AI wizard</p>
          </div>
        </button>

        {/* 2. Enhance Image */}
        <button
          id="action-card-enhance-photo"
          onClick={onOpenStudio}
          className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D5] hover:border-[#5A5A40] hover:bg-[#ECE8DF] text-left transition-all group shadow-xs flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-[#5A5A40] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#2D2D2D] text-sm">{t.actionEnhanceImage}</h4>
            <p className="text-[11px] text-[#8A8A70] mt-0.5">Studio quality audit</p>
          </div>
        </button>

        {/* 3. Create Voice Catalog */}
        <button
          id="action-card-voice-catalog"
          onClick={onOpenVoiceCataloger}
          className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D5] hover:border-[#C06C50] hover:bg-[#ECE8DF] text-left transition-all group shadow-xs flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-[#C06C50] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#2D2D2D] text-sm">{t.actionVoiceCatalog}</h4>
            <p className="text-[11px] text-[#8A8A70] mt-0.5">Speak in Hindi/dialect</p>
          </div>
        </button>

        {/* 4. Get Price */}
        <button
          id="action-card-get-price"
          onClick={onOpenPricingTool}
          className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D5] hover:border-[#5A5A40] hover:bg-[#ECE8DF] text-left transition-all group shadow-xs flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-[#2D2D2D] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#2D2D2D] text-sm">{t.actionGetPrice}</h4>
            <p className="text-[11px] text-[#8A8A70] mt-0.5">Fair trade markup</p>
          </div>
        </button>

        {/* 5. View Market */}
        <button
          id="action-card-view-market"
          onClick={onOpenMarketplace}
          className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D5] hover:border-[#5A5A40] hover:bg-[#ECE8DF] text-left transition-all group shadow-xs flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-[#8A8A70] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#2D2D2D] text-sm">{t.actionViewMarket}</h4>
            <p className="text-[11px] text-[#8A8A70] mt-0.5">B2B buyer trends</p>
          </div>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D5] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#8A8A70]">{t.totalProducts}</span>
          <p className="text-3xl font-black text-[#2D2D2D] mt-2">{products.length}</p>
          <span className="text-[11px] text-[#5A5A40] font-bold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Digitized Catalogs
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D5] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#8A8A70]">{t.publishedItems}</span>
          <p className="text-3xl font-black text-[#5A5A40] mt-2">{publishedProducts.length}</p>
          <span className="text-[11px] text-[#8A8A70] font-medium mt-1 block">Live on Marketplace</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D5] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#8A8A70]">{t.totalEnquiriesCount}</span>
          <p className="text-3xl font-black text-[#C06C50] mt-2">{enquiries.length}</p>
          <span className="text-[11px] text-[#C06C50] font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> {activeEnquiries.length} Active Leads
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D5] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#8A8A70]">Buyer Views</span>
          <p className="text-3xl font-black text-[#2D2D2D] mt-2">{totalViews}</p>
          <span className="text-[11px] text-[#8A8A70] font-medium mt-1 block">National Discovery</span>
        </div>
      </div>

      {/* Two Column Layout: Recent Enquiries + My Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Enquiries (B2B Leads) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E0D5]">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#F0EEE6] text-[#5A5A40] rounded-xl border border-[#D4CFC3]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="font-black text-[#2D2D2D] text-base">{t.recentEnquiries}</h3>
              </div>
              <span className="text-xs font-bold bg-[#F0EEE6] text-[#5A5A40] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
                {enquiries.length} Total
              </span>
            </div>

            {enquiries.length === 0 ? (
              <div className="text-center py-8 text-[#8A8A70] text-xs">
                <p>{t.noEnquiriesYet}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.slice(0, 3).map(enq => (
                  <div
                    key={enq.id}
                    onClick={() => onOpenEnquiry(enq)}
                    className="p-4 rounded-2xl border border-[#E5E0D5] bg-[#F5F2ED] hover:border-[#5A5A40] cursor-pointer transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-[#2D2D2D]">{enq.buyerName}</span>
                        {enq.buyerCompany && (
                          <p className="text-[11px] text-[#8A8A70]">{enq.buyerCompany}</p>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          enq.status === 'new'
                            ? 'bg-[#FBECE8] text-[#C06C50] border border-[#F0C4B8]'
                            : 'bg-[#F0EEE6] text-[#5A5A40] border border-[#D4CFC3]'
                        }`}
                      >
                        {enq.status === 'new' ? 'New Request' : 'Responded'}
                      </span>
                    </div>

                    <p className="text-xs text-[#5A5A40] line-clamp-2 italic">
                      "{enq.message}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-[#8A8A70] pt-2 border-t border-[#E5E0D5]">
                      <span className="font-semibold text-[#2D2D2D]">
                        Qty: {enq.quantityRequested} units
                      </span>
                      <span className="text-[#8A8A70]">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: My Products Inventory */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E0D5]">
              <div>
                <h3 className="font-black text-[#2D2D2D] text-base">{t.products}</h3>
                <p className="text-xs text-[#8A8A70]">Your digitized catalog inventory</p>
              </div>
              <button
                onClick={onStartAddProduct}
                className="text-xs font-bold text-[#5A5A40] hover:text-[#2D2D2D] flex items-center gap-1 bg-[#F0EEE6] px-3 py-1.5 rounded-xl border border-[#D4CFC3]"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12 text-[#8A8A70]">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-[#D4CFC3]" />
                <p className="text-xs">No products added yet. Click Add Product to start!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map(prod => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-2xl border border-[#E5E0D5] hover:border-[#5A5A40] bg-[#F5F2ED] flex flex-col justify-between space-y-3 transition-all"
                  >
                    <div className="flex gap-3">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-16 h-16 rounded-xl object-cover bg-stone-200 shrink-0 border border-[#D4CFC3]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#F0EEE6] text-[#5A5A40] rounded border border-[#D4CFC3]">
                            {prod.category}
                          </span>
                          <span className="text-[10px] text-[#8A8A70] font-medium">
                            Score: {prod.imageQualityScore}%
                          </span>
                        </div>
                        <h4 className="font-bold text-[#2D2D2D] text-xs mt-1 truncate">
                          {language === 'hi' ? prod.nameHindi || prod.name : prod.name}
                        </h4>
                        <p className="text-sm font-black text-[#5A5A40] mt-0.5">
                          ₹{prod.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E5E0D5] text-xs">
                      <span className="text-[11px] text-[#8A8A70]">
                        {prod.viewsCount || 0} views • {prod.enquiriesCount || 0} leads
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectProduct(prod)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E0D5] hover:bg-[#F0EEE6] text-[#2D2D2D] font-bold text-[11px]"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="p-1 text-[#8A8A70] hover:text-[#C06C50] rounded"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

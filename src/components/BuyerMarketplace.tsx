import React, { useState, useEffect } from 'react';
import { Product, CraftCategory, Enquiry, RecommendationMatch } from '../types';
import { Language, translations } from '../lib/translations';
import { api } from '../lib/api';
import { speechService } from '../lib/speech';
import {
  Search,
  Mic,
  MicOff,
  Filter,
  Sparkles,
  ShieldCheck,
  MapPin,
  IndianRupee,
  ShoppingBag,
  MessageSquare,
  CheckCircle2,
  X,
  Volume2,
  Send,
  Eye
} from 'lucide-react';

interface BuyerMarketplaceProps {
  language: Language;
  onSendEnquirySuccess: () => void;
}

const CATEGORIES: CraftCategory[] = [
  'Handloom',
  'Textile',
  'Pottery',
  'Jewellery',
  'Wooden Craft',
  'Home Décor',
  'Basketry',
  'Handicraft',
  'Metal & Brass'
];

export const BuyerMarketplace: React.FC<BuyerMarketplaceProps> = ({
  language,
  onSendEnquirySuccess
}) => {
  const t = translations[language];
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isVoiceSearching, setIsVoiceSearching] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationMatch[]>([]);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState<boolean>(false);

  // Enquiry Form State
  const [enquiryQty, setEnquiryQty] = useState<number>(10);
  const [targetBudget, setTargetBudget] = useState<number>(0);
  const [enquiryMessage, setEnquiryMessage] = useState<string>('');
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState<boolean>(false);

  // Voice Speech search
  const toggleVoiceSearch = () => {
    if (isVoiceSearching) {
      speechService.stopListening();
      setIsVoiceSearching(false);
    } else {
      setIsVoiceSearching(true);
      speechService.startListening(
        (text, isFinal) => {
          setSearchQuery(text);
          if (isFinal) setIsVoiceSearching(false);
        },
        () => setIsVoiceSearching(false),
        language === 'hi' ? 'hi-IN' : 'en-IN'
      );
    }
  };

  const loadMarketplaceData = async () => {
    setLoading(true);
    try {
      const [prods, recs] = await Promise.all([
        api.getProducts({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          search: searchQuery.trim() || undefined,
          status: 'published'
        }),
        api.getRecommendations({
          category: selectedCategory === 'all' ? undefined : selectedCategory
        })
      ]);
      setProducts(prods);
      setRecommendations(recs);
    } catch (err) {
      console.warn('Failed to load marketplace data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketplaceData();
  }, [selectedCategory, searchQuery]);

  const handleOpenEnquiryModal = (prod: Product) => {
    setSelectedProduct(prod);
    setTargetBudget(prod.price);
    setEnquiryMessage(
      `Hello ${prod.artisanName}, I am interested in sourcing ${enquiryQty} units of your "${prod.name}". Please provide wholesale quotation and dispatch time.`
    );
    setEnquiryModalOpen(true);
  };

  const handleSendEnquiry = async () => {
    if (!selectedProduct) return;
    setIsSubmittingEnquiry(true);
    try {
      await api.createEnquiry({
        productId: selectedProduct.id,
        quantityRequested: enquiryQty,
        targetBudget,
        message: enquiryMessage
      });
      alert(t.enquirySentSuccess);
      setEnquiryModalOpen(false);
      onSendEnquirySuccess();
    } catch (err) {
      console.error('Enquiry error:', err);
      alert('Could not submit enquiry. Please try again.');
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  // Find match score for a product
  const getProductMatch = (prodId: string) => {
    return recommendations.find(r => r.productId === prodId);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Search and AI Recommendation Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A5A40] bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
            Direct Artisan Sourcing
          </span>
          <h1 className="text-2xl font-black text-[#2D2D2D] mt-1.5">
            Indian Artisan Handicraft Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-[#8A8A70]">
            Source authentic handmade crafts directly from verified rural master artisans with zero middleman markups.
          </p>
        </div>

        {/* Search Bar with Voice Input */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#8A8A70] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="marketplace-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-[#F9F7F2] border border-[#D4CFC3] focus:bg-white focus:ring-2 focus:ring-[#5A5A40] focus:border-[#5A5A40] text-sm text-[#2D2D2D] font-medium transition-all"
            />
            <button
              onClick={toggleVoiceSearch}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                isVoiceSearching ? 'bg-[#C06C50] text-white animate-pulse' : 'text-[#8A8A70] hover:bg-[#E5E0D5]'
              }`}
              title="Voice Search"
            >
              {isVoiceSearching ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Craft Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'bg-[#F5F2ED] text-[#2D2D2D] hover:bg-[#ECE8DF] border border-[#E5E0D5]'
            }`}
          >
            {t.filterCategory}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'bg-[#F5F2ED] text-[#2D2D2D] hover:bg-[#ECE8DF] border border-[#E5E0D5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-16">
          <Sparkles className="w-8 h-8 text-[#5A5A40] animate-spin mx-auto mb-2" />
          <p className="text-sm font-bold text-[#2D2D2D]">Loading authentic artisan listings...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#E5E0D5] text-center text-[#8A8A70]">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-[#D4CFC3]" />
          <h3 className="font-bold text-[#2D2D2D] text-base">No crafts found</h3>
          <p className="text-xs text-[#8A8A70] mt-1">Try searching for other materials, categories, or keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => {
            const match = getProductMatch(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#E5E0D5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with Overlay Badges */}
                  <div className="aspect-4/3 relative bg-stone-900 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* AI Match Score Badge */}
                    {match && (
                      <div className="absolute top-3 left-3 bg-[#151619]/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-black text-[#F5F2ED] flex items-center gap-1 border border-[#3E3E3E]">
                        <Sparkles className="w-3.5 h-3.5 text-[#F5F2ED]" />
                        <span>AI Match: {match.matchScore}%</span>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 bg-[#5A5A40] text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.category}
                    </div>

                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-[#2D2D2D] flex items-center gap-1 border border-[#E5E0D5]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span>{product.artisanName}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1 text-[11px] text-[#8A8A70]">
                      <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span>{product.artisanLocation}, {product.artisanState}</span>
                    </div>

                    <h3 className="font-bold text-[#2D2D2D] text-base leading-snug line-clamp-2">
                      {language === 'hi' ? product.nameHindi || product.name : product.name}
                    </h3>

                    <p className="text-xs text-[#8A8A70] line-clamp-2 leading-relaxed">
                      {language === 'hi' ? product.shortDescriptionHindi || product.shortDescription : product.shortDescription}
                    </p>

                    {/* Match reason chip if available */}
                    {match?.matchReasons?.[0] && (
                      <div className="p-2 bg-[#F0EEE6] rounded-xl border border-[#D4CFC3] text-[11px] text-[#5A5A40] font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                        <span className="truncate">{match.matchReasons[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Price & Contact Button */}
                <div className="p-5 pt-3 border-t border-[#E5E0D5] flex items-center justify-between gap-3 bg-[#F9F7F2]">
                  <div>
                    <span className="text-[10px] text-[#8A8A70] uppercase font-bold tracking-wider">Artisan Direct Price</span>
                    <p className="text-xl font-black text-[#5A5A40]">₹{product.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-2.5 rounded-2xl bg-[#E5E0D5] hover:bg-[#D4CFC3] text-[#2D2D2D] transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      id={`enquiry-btn-${product.id}`}
                      onClick={() => handleOpenEnquiryModal(product)}
                      className="px-4 py-2.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t.sendEnquiry}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && !enquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative border border-[#E5E0D5]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F2ED] hover:bg-[#ECE8DF] text-[#2D2D2D]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="aspect-16/9 rounded-2xl overflow-hidden bg-stone-900 relative">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#5A5A40] text-white font-bold text-xs px-3 py-1 rounded-full">
                  {selectedProduct.category}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-[#5A5A40] font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedProduct.artisanLocation}, {selectedProduct.artisanState}</span>
                  <span>•</span>
                  <span>Artisan: {selectedProduct.artisanName}</span>
                </div>
                <h2 className="text-xl font-black text-[#2D2D2D]">
                  {language === 'hi' ? selectedProduct.nameHindi || selectedProduct.name : selectedProduct.name}
                </h2>
              </div>

              <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E5E0D5] text-xs space-y-2">
                <h4 className="font-bold text-[#2D2D2D] text-sm">Cultural Heritage & Story</h4>
                <p className="text-[#5A5A40] leading-relaxed">
                  {language === 'hi'
                    ? selectedProduct.descriptionHindi || selectedProduct.description
                    : selectedProduct.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 bg-[#F9F7F2] rounded-2xl border border-[#E5E0D5]">
                  <span className="text-[#8A8A70] block">Material</span>
                  <span className="font-bold text-[#2D2D2D]">{selectedProduct.material}</span>
                </div>
                <div className="p-3 bg-[#F9F7F2] rounded-2xl border border-[#E5E0D5]">
                  <span className="text-[#8A8A70] block">Colour</span>
                  <span className="font-bold text-[#2D2D2D]">{selectedProduct.colour}</span>
                </div>
                <div className="p-3 bg-[#F9F7F2] rounded-2xl border border-[#E5E0D5]">
                  <span className="text-[#8A8A70] block">Dimensions</span>
                  <span className="font-bold text-[#2D2D2D]">{selectedProduct.size}</span>
                </div>
                <div className="p-3 bg-[#F9F7F2] rounded-2xl border border-[#E5E0D5]">
                  <span className="text-[#8A8A70] block">Stock Available</span>
                  <span className="font-bold text-[#5A5A40]">{selectedProduct.stockQuantity} units</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E0D5] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#8A8A70] font-bold block">Artisan Direct Price</span>
                  <span className="text-2xl font-black text-[#5A5A40]">₹{selectedProduct.price.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => {
                    handleOpenEnquiryModal(selectedProduct);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-[#5A5A4022]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send B2B Enquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B2B Enquiry Sheet / Modal */}
      {enquiryModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 relative border border-[#E5E0D5]">
            <button
              onClick={() => setEnquiryModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F2ED] hover:bg-[#ECE8DF] text-[#2D2D2D]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
                  Direct Artisan Connect
                </span>
                <h3 className="text-lg font-black text-[#2D2D2D] mt-1.5">
                  {t.sendEnquiryTitle}
                </h3>
                <p className="text-xs text-[#8A8A70]">
                  Connecting with {selectedProduct.artisanName} ({selectedProduct.artisanLocation})
                </p>
              </div>

              {/* Product mini card */}
              <div className="p-3 bg-[#F5F2ED] rounded-2xl border border-[#E5E0D5] flex items-center gap-3">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="truncate">
                  <h4 className="font-bold text-xs text-[#2D2D2D] truncate">{selectedProduct.name}</h4>
                  <span className="text-xs font-black text-[#5A5A40]">₹{selectedProduct.price} / unit</span>
                </div>
              </div>

              {/* Quantity & Budget Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2D2D2D] block mb-1">{t.quantityNeeded}</label>
                  <input
                    type="number"
                    min={1}
                    value={enquiryQty}
                    onChange={e => setEnquiryQty(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2.5 rounded-xl border border-[#D4CFC3] font-bold text-sm text-[#2D2D2D] bg-[#F9F7F2]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D2D2D] block mb-1">{t.targetBudget}</label>
                  <input
                    type="number"
                    value={targetBudget}
                    onChange={e => setTargetBudget(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#D4CFC3] font-bold text-sm text-[#2D2D2D] bg-[#F9F7F2]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-bold text-[#2D2D2D] block mb-1">{t.enquiryMessage}</label>
                <textarea
                  rows={4}
                  value={enquiryMessage}
                  onChange={e => setEnquiryMessage(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#D4CFC3] text-xs text-[#2D2D2D] font-medium bg-[#F9F7F2]"
                />
              </div>

              <button
                id="submit-enquiry-btn"
                onClick={handleSendEnquiry}
                disabled={isSubmittingEnquiry}
                className="w-full py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#5A5A4033] transition-all hover:scale-102"
              >
                <Send className="w-4 h-4" />
                <span>Submit Direct Enquiry to Artisan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

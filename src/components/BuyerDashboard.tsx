import React, { useState, useEffect } from 'react';
import { User, BuyerRequirement, RecommendationMatch, Enquiry, CraftCategory } from '../types';
import { Language, translations } from '../lib/translations';
import { api } from '../lib/api';
import {
  Sparkles,
  ShoppingBag,
  Plus,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  IndianRupee,
  MessageSquare,
  ShieldCheck,
  Building,
  Layers,
  ArrowRight
} from 'lucide-react';

interface BuyerDashboardProps {
  user: User;
  language: Language;
  onOpenMarketplace: () => void;
  onSelectProductById: (id: string) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  user,
  language,
  onOpenMarketplace,
  onSelectProductById
}) => {
  const t = translations[language];
  const [requirements, setRequirements] = useState<BuyerRequirement[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationMatch[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [showReqModal, setShowReqModal] = useState<boolean>(false);

  // New Requirement Form State
  const [reqCategory, setReqCategory] = useState<CraftCategory>('Handloom');
  const [reqBudget, setReqBudget] = useState<number>(5000);
  const [reqMaterial, setReqMaterial] = useState<string>('Silk');
  const [reqStyle, setReqStyle] = useState<string>('Traditional Zari');
  const [reqNotes, setReqNotes] = useState<string>('Seeking 20 authentic handwoven sarees for boutique collection.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadData = async () => {
    try {
      const [recData, enqData] = await Promise.all([
        api.getRecommendations({ category: reqCategory }),
        api.getEnquiries({ buyerId: user.id })
      ]);
      setRecommendations(recData);
      setEnquiries(enqData);
    } catch (err) {
      console.warn('Buyer data load error:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePostRequirement = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.submitBuyerRequirement({
        buyerId: user.id,
        category: reqCategory,
        budget: reqBudget,
        material: reqMaterial,
        preferredStyle: reqStyle,
        notes: reqNotes
      });
      setRequirements(prev => [res.requirement, ...prev]);
      setRecommendations(res.topMatches);
      setShowReqModal(false);
      alert('Sourcing Requirement submitted! AI matching engine found top supplier leads.');
    } catch (e) {
      console.error('Requirement submit error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#151619] text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#3E3E3E] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-[#5A5A40]/30 text-[#D4CFC3] border border-[#5A5A40] px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5" />
            B2B Sourcing Hub • Verified Artisans
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome, {user.name} ({user.companyName || 'Boutique Buyer'})
          </h1>
          <p className="text-xs sm:text-sm text-[#D4CFC3] max-w-2xl leading-relaxed">
            Source directly from 100% authentic GI-tagged rural artisan clusters across India with AI-powered quality audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="post-sourcing-req-btn"
            onClick={() => setShowReqModal(true)}
            className="px-5 py-3 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-xs shadow-md shadow-[#5A5A4033] flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post Sourcing Requirement</span>
          </button>
          <button
            onClick={onOpenMarketplace}
            className="px-5 py-3 rounded-2xl bg-[#2D2D2D] hover:bg-[#3E3E3E] text-white font-bold text-xs border border-[#4C4C4C] transition-all"
          >
            Browse All Crafts
          </button>
        </div>
      </div>

      {/* Main Grid: AI Matched Suppliers + Track Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Recommendation Engine Results */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#F0EEE6] text-[#5A5A40] rounded-xl border border-[#D4CFC3]">
                  <Sparkles className="w-4 h-4 text-[#5A5A40]" />
                </div>
                <div>
                  <h3 className="font-black text-[#2D2D2D] text-base">
                    AI Matched Artisan Suppliers
                  </h3>
                  <p className="text-xs text-[#8A8A70]">
                    Calculated using multi-criteria craft matching (category, material, price integrity & region)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {recommendations.map(rec => (
                <div
                  key={rec.productId}
                  className="p-4 rounded-2xl border border-[#E5E0D5] hover:border-[#5A5A40] bg-[#F5F2ED] hover:bg-[#ECE8DF] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={rec.productImage}
                      alt={rec.productName}
                      className="w-16 h-16 rounded-xl object-cover bg-stone-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#F0EEE6] text-[#5A5A40] border border-[#D4CFC3]">
                          {rec.matchScore}% AI Match
                        </span>
                        <span className="text-xs text-[#8A8A70] font-semibold">{rec.artisanLocation}</span>
                      </div>
                      <h4 className="font-bold text-[#2D2D2D] text-sm mt-0.5">{rec.productName}</h4>
                      <p className="text-xs text-[#5A5A40] font-black">₹{rec.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2">
                    <div className="flex flex-wrap gap-1">
                      {rec.matchReasons.map((reason, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-white px-2.5 py-0.5 rounded-lg border border-[#E5E0D5] text-[#2D2D2D] font-medium"
                        >
                          ✓ {reason}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onSelectProductById(rec.productId)}
                      className="px-4 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto"
                    >
                      <span>View & Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Track My Sourcing Enquiries */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#F0EEE6] text-[#5A5A40] rounded-xl border border-[#D4CFC3]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="font-black text-[#2D2D2D] text-base">My Enquiries</h3>
              </div>
              <span className="text-xs font-bold text-[#8A8A70]">{enquiries.length} Total</span>
            </div>

            {enquiries.length === 0 ? (
              <div className="text-center py-10 text-[#8A8A70] text-xs">
                <p>No enquiries sent yet. Browse crafts and tap "Send B2B Enquiry"!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.map(enq => (
                  <div key={enq.id} className="p-3.5 rounded-2xl border border-[#E5E0D5] bg-[#F9F7F2] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2D2D2D]">{enq.artisanName}</span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          enq.status === 'responded'
                            ? 'bg-[#F0EEE6] text-[#5A5A40] border-[#D4CFC3]'
                            : 'bg-[#F5F2ED] text-[#8A8A70] border-[#E5E0D5]'
                        }`}
                      >
                        {enq.status === 'responded' ? 'Artisan Responded' : 'Awaiting Reply'}
                      </span>
                    </div>

                    <p className="text-xs text-[#8A8A70] line-clamp-2 italic">"{enq.message}"</p>

                    {enq.responseMessage && (
                      <div className="p-2.5 bg-[#F0EEE6] rounded-xl border border-[#D4CFC3] text-xs text-[#2D2D2D] font-medium">
                        <span className="font-bold block text-[10px] text-[#5A5A40]">Artisan Quote / Reply:</span>
                        {enq.responseMessage}
                      </div>
                    )}

                    <div className="flex justify-between text-[11px] text-[#8A8A70] pt-1.5 border-t border-[#E5E0D5]">
                      <span>Qty: {enq.quantityRequested} pcs</span>
                      <span>Target: ₹{enq.targetBudget}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Sourcing Requirement Modal */}
      {showReqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-[#E5E0D5]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A5A40] bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
                B2B Sourcing Spec
              </span>
              <h3 className="text-lg font-black text-[#2D2D2D] mt-1.5">
                Post Sourcing Requirement
              </h3>
              <p className="text-xs text-[#8A8A70]">
                Specify your bulk artisan sourcing parameters for automated AI supplier matching.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#2D2D2D] block mb-1">Craft Category</label>
                <select
                  value={reqCategory}
                  onChange={e => setReqCategory(e.target.value as CraftCategory)}
                  className="w-full p-2.5 rounded-xl border border-[#D4CFC3] text-xs font-bold text-[#2D2D2D] bg-[#F9F7F2]"
                >
                  <option value="Handloom">Handloom</option>
                  <option value="Pottery">Pottery</option>
                  <option value="Wooden Craft">Wooden Craft</option>
                  <option value="Metal & Brass">Metal & Brass</option>
                  <option value="Basketry">Basketry</option>
                  <option value="Textile">Textile</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D2D2D] block mb-1">Budget per unit (₹)</label>
                <input
                  type="number"
                  value={reqBudget}
                  onChange={e => setReqBudget(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#D4CFC3] text-xs font-bold text-[#2D2D2D] bg-[#F9F7F2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#2D2D2D] block mb-1">Material Preference</label>
                <input
                  type="text"
                  value={reqMaterial}
                  onChange={e => setReqMaterial(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D4CFC3] text-xs font-medium text-[#2D2D2D] bg-[#F9F7F2]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D2D2D] block mb-1">Style / Motif</label>
                <input
                  type="text"
                  value={reqStyle}
                  onChange={e => setReqStyle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D4CFC3] text-xs font-medium text-[#2D2D2D] bg-[#F9F7F2]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#2D2D2D] block mb-1">Specific Requirements / Notes</label>
              <textarea
                rows={3}
                value={reqNotes}
                onChange={e => setReqNotes(e.target.value)}
                className="w-full p-3 rounded-2xl border border-[#D4CFC3] text-xs text-[#2D2D2D] bg-[#F9F7F2]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowReqModal(false)}
                className="px-4 py-2.5 rounded-xl border border-[#E5E0D5] text-[#2D2D2D] font-bold text-xs bg-[#F5F2ED] hover:bg-[#ECE8DF]"
              >
                Cancel
              </button>
              <button
                onClick={handlePostRequirement}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-xs shadow-md shadow-[#5A5A4033]"
              >
                Submit & Match Suppliers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

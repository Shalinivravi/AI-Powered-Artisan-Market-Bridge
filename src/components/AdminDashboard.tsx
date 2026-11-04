import React, { useState, useEffect } from 'react';
import { AdminAnalytics, Product, User } from '../types';
import { Language, translations } from '../lib/translations';
import { api } from '../lib/api';
import {
  ShieldCheck,
  Users,
  ShoppingBag,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  BarChart3,
  MapPin,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const t = translations[language];
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [analyticsData, allProds] = await Promise.all([
        api.getAdminAnalytics(),
        api.getProducts()
      ]);
      setAnalytics(analyticsData);
      setProducts(allProds);
    } catch (e) {
      console.warn('Admin load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleToggleVerify = async (prodId: string, currentStatus: boolean) => {
    try {
      const updated = await api.verifyProduct(prodId, !currentStatus);
      setProducts(prev => prev.map(p => (p.id === prodId ? updated : p)));
    } catch (err) {
      console.error('Verify error:', err);
    }
  };

  if (loading || !analytics) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <Sparkles className="w-8 h-8 text-[#5A5A40] animate-spin mx-auto mb-2" />
        <p className="text-sm font-bold text-[#2D2D2D]">Loading Smart India Hackathon Nodal Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-[#151619] text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#3E3E3E] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#5A5A40]/30 text-[#D4CFC3] border border-[#5A5A40] px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              SIH26090 Admin & Ministry Oversight
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Artisan Market Bridge National Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#D4CFC3] max-w-2xl leading-relaxed">
            Real-time monitoring of rural artisan onboarding, AI quality certification metrics, and B2B trade volume across Indian states.
          </p>
        </div>

        <button
          onClick={loadAdminData}
          className="px-5 py-3 rounded-2xl bg-[#2D2D2D] hover:bg-[#3E3E3E] text-white font-bold text-xs flex items-center gap-2 border border-[#4C4C4C] transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
          <div className="flex items-center justify-between text-[#8A8A70] mb-2">
            <span className="text-xs font-bold">{t.totalArtisans}</span>
            <Users className="w-4 h-4 text-[#5A5A40]" />
          </div>
          <p className="text-3xl font-black text-[#2D2D2D]">{analytics.totalArtisans}</p>
          <span className="text-[11px] text-[#5A5A40] font-semibold mt-1.5 block">
            Across 5 Key Craft Clusters
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
          <div className="flex items-center justify-between text-[#8A8A70] mb-2">
            <span className="text-xs font-bold">{t.totalBuyers}</span>
            <ShoppingBag className="w-4 h-4 text-[#5A5A40]" />
          </div>
          <p className="text-3xl font-black text-[#2D2D2D]">{analytics.totalBuyers}</p>
          <span className="text-[11px] text-[#8A8A70] font-semibold mt-1.5 block">
            Boutique & Retail Chains
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
          <div className="flex items-center justify-between text-[#8A8A70] mb-2">
            <span className="text-xs font-bold">{t.totalProducts}</span>
            <Award className="w-4 h-4 text-[#5A5A40]" />
          </div>
          <p className="text-3xl font-black text-[#2D2D2D]">{analytics.totalProducts}</p>
          <span className="text-[11px] text-[#5A5A40] font-semibold mt-1.5 block">
            Avg Quality Score: {analytics.avgQualityScore}%
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
          <div className="flex items-center justify-between text-[#8A8A70] mb-2">
            <span className="text-xs font-bold">{t.totalEnquiriesCount}</span>
            <TrendingUp className="w-4 h-4 text-[#5A5A40]" />
          </div>
          <p className="text-3xl font-black text-[#2D2D2D]">{analytics.totalEnquiries}</p>
          <span className="text-[11px] text-[#8A8A70] font-semibold mt-1.5 block">
            Est. GMV: ₹{analytics.estimatedTotalGMV.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Craft Category Distribution Chart */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-[#2D2D2D] text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#5A5A40]" />
              <span>Craft Category Distribution</span>
            </h3>
            <span className="text-xs text-[#8A8A70] font-semibold">Live Inventory</span>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.categoryDistribution.map((item, idx) => {
              const percentage = Math.round((item.count / analytics.totalProducts) * 100) || 0;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#2D2D2D]">{item.category}</span>
                    <span className="text-[#8A8A70]">{item.count} items ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#F5F2ED] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#5A5A40] h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* State-wise Artisan Footprint */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-[#2D2D2D] text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#5A5A40]" />
              <span>State-wise Artisan Footprint</span>
            </h3>
            <span className="text-xs text-[#8A8A70] font-semibold">Geographical Reach</span>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.stateDistribution.map((item, idx) => {
              const percentage = Math.round((item.count / analytics.totalArtisans) * 100) || 0;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#2D2D2D]">{item.state}</span>
                    <span className="text-[#8A8A70]">{item.count} artisans ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#F5F2ED] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#8A8A70] h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Quality & Verification Queue */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-[#2D2D2D] text-base">
              National Product Quality & Authenticity Audit
            </h3>
            <p className="text-xs text-[#8A8A70]">
              Verify artisan listings for GI tag compliance, studio image quality, and fair-wage pricing.
            </p>
          </div>
          <span className="text-xs font-bold bg-[#F0EEE6] text-[#5A5A40] px-3 py-1 rounded-full border border-[#D4CFC3]">
            {products.length} Products Indexed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E0D5] text-[#8A8A70] font-bold">
                <th className="pb-3 pr-4">Craft Product</th>
                <th className="pb-3 px-4">Artisan & Region</th>
                <th className="pb-3 px-4">Category</th>
                <th className="pb-3 px-4">Price (₹)</th>
                <th className="pb-3 px-4">Quality Score</th>
                <th className="pb-3 pl-4 text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D5]">
              {products.map(prod => (
                <tr key={prod.id} className="hover:bg-[#F9F7F2] transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-10 h-10 rounded-xl object-cover bg-[#F5F2ED] shrink-0"
                      />
                      <span className="font-bold text-[#2D2D2D] max-w-[200px] truncate block">
                        {prod.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#2D2D2D]">
                    <div className="font-semibold">{prod.artisanName}</div>
                    <span className="text-[11px] text-[#8A8A70]">{prod.artisanLocation}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold bg-[#F5F2ED] px-2.5 py-1 rounded-lg text-[#2D2D2D] border border-[#E5E0D5]">
                      {prod.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#5A5A40]">
                    ₹{prod.price.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#5A5A40] bg-[#F0EEE6] px-2.5 py-1 rounded-lg border border-[#D4CFC3]">
                      {prod.imageQualityScore}%
                    </span>
                  </td>
                  <td className="py-3.5 pl-4 text-right">
                    <button
                      onClick={() => handleToggleVerify(prod.id, !!prod.isVerified)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                        prod.isVerified
                          ? 'bg-[#F0EEE6] text-[#5A5A40] border border-[#D4CFC3] hover:bg-[#E5E0D5]'
                          : 'bg-[#F5F2ED] text-[#2D2D2D] border border-[#E5E0D5] hover:bg-[#ECE8DF]'
                      }`}
                    >
                      {prod.isVerified ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40]" />
                          <span>Verified</span>
                        </>
                      ) : (
                        <span>Verify Item</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { User, ArtisanProfile, Product, Enquiry, NotificationItem, UserRole } from './types';
import { Language, translations } from './lib/translations';
import { api } from './lib/api';
import { Header } from './components/Header';
import { ArtisanDashboard } from './components/ArtisanDashboard';
import { ProductCreationWizard } from './components/ProductCreationWizard';
import { BuyerMarketplace } from './components/BuyerMarketplace';
import { BuyerDashboard } from './components/BuyerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ImageEnhancerStudio } from './components/ImageEnhancerStudio';
import { EnquiryDetailModal } from './components/EnquiryDetailModal';
import { ArtisanProfileModal } from './components/ArtisanProfileModal';
import { NotificationModal } from './components/NotificationModal';
import { AuthModal } from './components/AuthModal';
import { speechService } from './lib/speech';
import {
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  VolumeX,
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';

export default function App() {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ArtisanProfile | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole>('artisan');
  const [language, setLanguage] = useState<Language>('hi'); // Default to Hindi for inclusive artisan accessibility
  const [activeTab, setActiveTab] = useState<string>('home');

  // Core Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [notifModalOpen, setNotifModalOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Floating Voice Assistant state
  const [isVoiceAssistantActive, setIsVoiceAssistantActive] = useState<boolean>(false);
  const [voiceAssistantText, setVoiceAssistantText] = useState<string>('');

  const t = translations[language];

  // Initial load
  const loadInitialData = async () => {
    try {
      const { user: currentUser, profile: currentProfile } = await api.getCurrentUser();
      setUser(currentUser);
      setProfile(currentProfile);
      setActiveRole(currentUser.role);

      const [prodList, enqList, notifList] = await Promise.all([
        api.getProducts(),
        api.getEnquiries({
          artisanId: currentUser.role === 'artisan' ? currentUser.id : undefined,
          buyerId: currentUser.role === 'buyer' ? currentUser.id : undefined
        }),
        api.getNotifications()
      ]);

      setProducts(prodList);
      setEnquiries(enqList);
      setNotifications(notifList);
    } catch (e) {
      console.warn('Initial load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Handle switching roles
  const handleRoleChange = async (newRole: UserRole) => {
    setActiveRole(newRole);
    try {
      const res = await api.switchRole(newRole);
      setUser(res.user);
      if (newRole === 'artisan') {
        setActiveTab('home');
        const prof = await api.getArtisanProfile();
        setProfile(prof);
      } else if (newRole === 'buyer') {
        setActiveTab('buyer-home');
      } else if (newRole === 'admin') {
        setActiveTab('admin');
      }
      // Refresh relevant enquiries
      const enqList = await api.getEnquiries({
        artisanId: newRole === 'artisan' ? res.user.id : undefined,
        buyerId: newRole === 'buyer' ? res.user.id : undefined
      });
      setEnquiries(enqList);
    } catch (e) {
      console.warn('Role switch error:', e);
    }
  };

  // Product actions
  const handleProductCreated = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    setActiveTab('home');
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  // Floating Voice Assistant logic
  const handleToggleVoiceAssistant = () => {
    if (isVoiceAssistantActive) {
      speechService.stopListening();
      setIsVoiceAssistantActive(false);
    } else {
      setIsVoiceAssistantActive(true);
      setVoiceAssistantText('Listening... Speak command like "Add Product", "Open Studio", "Show Enquiries"');
      speechService.startListening(
        (text, isFinal) => {
          setVoiceAssistantText(text);
          const lower = text.toLowerCase();
          if (lower.includes('add product') || lower.includes('उत्पाद जोड़ें') || lower.includes('नया सामान')) {
            setActiveTab('add-product');
            speechService.speak('Opening 5-step AI product wizard', language);
            setIsVoiceAssistantActive(false);
          } else if (lower.includes('enhance') || lower.includes('photo') || lower.includes('फोटो सुधारें')) {
            setActiveTab('studio');
            speechService.speak('Opening Photo Enhancement Studio', language);
            setIsVoiceAssistantActive(false);
          } else if (lower.includes('market') || lower.includes('बाजार') || lower.includes('खरीदार')) {
            setActiveTab('marketplace');
            speechService.speak('Opening Artisan Marketplace', language);
            setIsVoiceAssistantActive(false);
          }
        },
        () => setIsVoiceAssistantActive(false),
        language === 'hi' ? 'hi-IN' : 'en-IN'
      );
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-[#5A5A40] flex items-center justify-center text-white shadow-lg animate-pulse mb-3">
          <Sparkles className="w-6 h-6 text-[#F5F2ED]" />
        </div>
        <h2 className="text-base font-black text-[#2D2D2D]">
          Smart India Hackathon • SIH26090
        </h2>
        <p className="text-xs text-[#8A8A70] mt-1 font-medium">Starting AI Virtual Business Manager...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2D2D2D] flex flex-col selection:bg-[#D4CFC3]">
      {/* Header */}
      <Header
        user={user}
        activeRole={activeRole}
        language={language}
        onRoleChange={handleRoleChange}
        onLanguageChange={setLanguage}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        notifications={notifications}
        onOpenNotifications={() => setNotifModalOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-16">
        {/* Artisan Views */}
        {activeRole === 'artisan' && (
          <>
            {activeTab === 'home' && (
              <ArtisanDashboard
                user={user}
                profile={profile}
                language={language}
                products={products}
                enquiries={enquiries}
                onStartAddProduct={() => setActiveTab('add-product')}
                onOpenStudio={() => setActiveTab('studio')}
                onOpenVoiceCataloger={() => setActiveTab('add-product')}
                onOpenPricingTool={() => setActiveTab('add-product')}
                onOpenMarketplace={() => setActiveTab('marketplace')}
                onSelectProduct={p => setActiveTab('marketplace')}
                onDeleteProduct={handleDeleteProduct}
                onOpenEnquiry={enq => setSelectedEnquiry(enq)}
              />
            )}

            {activeTab === 'products' && (
              <ArtisanDashboard
                user={user}
                profile={profile}
                language={language}
                products={products}
                enquiries={enquiries}
                onStartAddProduct={() => setActiveTab('add-product')}
                onOpenStudio={() => setActiveTab('studio')}
                onOpenVoiceCataloger={() => setActiveTab('add-product')}
                onOpenPricingTool={() => setActiveTab('add-product')}
                onOpenMarketplace={() => setActiveTab('marketplace')}
                onSelectProduct={p => setActiveTab('marketplace')}
                onDeleteProduct={handleDeleteProduct}
                onOpenEnquiry={enq => setSelectedEnquiry(enq)}
              />
            )}

            {activeTab === 'add-product' && (
              <ProductCreationWizard
                language={language}
                onProductCreated={handleProductCreated}
                onCancel={() => setActiveTab('home')}
                initialCategory={profile?.craftType}
              />
            )}

            {activeTab === 'studio' && (
              <ImageEnhancerStudio
                language={language}
                onClose={() => setActiveTab('home')}
                onUseEnhancedPhoto={url => {
                  setActiveTab('add-product');
                }}
              />
            )}

            {activeTab === 'enquiries' && (
              <div className="max-w-4xl mx-auto py-6 px-4 space-y-4">
                <h2 className="text-2xl font-black text-[#2D2D2D]">Buyer Enquiries & Orders</h2>
                <div className="space-y-3">
                  {enquiries.map(enq => (
                    <div
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className="p-4 rounded-2xl bg-white border border-[#E5E0D5] hover:border-[#5A5A40] cursor-pointer shadow-xs transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-[#2D2D2D]">{enq.buyerName}</h4>
                          <p className="text-xs text-[#8A8A70]">{enq.productName}</p>
                        </div>
                        <span className="text-xs bg-[#F0EEE6] text-[#5A5A40] font-bold px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
                          Qty: {enq.quantityRequested}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A5A40] italic mt-2">"{enq.message}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'marketplace' && (
              <BuyerMarketplace
                language={language}
                onSendEnquirySuccess={() => {
                  loadInitialData();
                }}
              />
            )}
          </>
        )}

        {/* Buyer Views */}
        {activeRole === 'buyer' && (
          <>
            {activeTab === 'buyer-home' && (
              <BuyerDashboard
                user={user}
                language={language}
                onOpenMarketplace={() => setActiveTab('marketplace')}
                onSelectProductById={id => setActiveTab('marketplace')}
              />
            )}

            {activeTab === 'marketplace' && (
              <BuyerMarketplace
                language={language}
                onSendEnquirySuccess={() => {
                  loadInitialData();
                }}
              />
            )}

            {activeTab === 'buyer-enquiries' && (
              <BuyerDashboard
                user={user}
                language={language}
                onOpenMarketplace={() => setActiveTab('marketplace')}
                onSelectProductById={id => setActiveTab('marketplace')}
              />
            )}
          </>
        )}

        {/* Admin Views */}
        {activeRole === 'admin' && (
          <>
            {activeTab === 'admin' && <AdminDashboard language={language} />}
            {activeTab === 'marketplace' && (
              <BuyerMarketplace
                language={language}
                onSendEnquirySuccess={() => loadInitialData()}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Voice Assistant Button (Low-Literacy Friendly) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        {isVoiceAssistantActive && (
          <div className="bg-[#151619] text-[#F5F2ED] text-xs px-3.5 py-2.5 rounded-2xl shadow-xl max-w-xs animate-bounce border border-[#2D2D2D]">
            {voiceAssistantText}
          </div>
        )}
        <button
          id="floating-voice-assistant-btn"
          onClick={handleToggleVoiceAssistant}
          className={`p-4 rounded-full text-white shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isVoiceAssistantActive
              ? 'bg-[#C06C50] ring-4 ring-[#C06C5066] animate-pulse scale-110'
              : 'bg-[#C06C50] hover:bg-[#AC5D43] hover:scale-105 ring-4 ring-[#C06C5033]'
          }`}
          title="Voice Assistant (Hindi / English)"
        >
          {isVoiceAssistantActive ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
      </div>

      {/* Modals */}
      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          language={language}
          onClose={() => setSelectedEnquiry(null)}
          onUpdated={updated => {
            setEnquiries(prev => prev.map(e => (e.id === updated.id ? updated : e)));
          }}
        />
      )}

      {profileModalOpen && (
        <ArtisanProfileModal
          user={user}
          profile={profile}
          language={language}
          onClose={() => setProfileModalOpen(false)}
          onProfileUpdated={p => setProfile(p)}
        />
      )}

      {notifModalOpen && (
        <NotificationModal
          notifications={notifications}
          language={language}
          onClose={() => setNotifModalOpen(false)}
          onMarkRead={id => {
            api.markNotificationRead(id);
            setNotifications(prev =>
              prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
            );
          }}
        />
      )}

      {authModalOpen && (
        <AuthModal
          language={language}
          onClose={() => setAuthModalOpen(false)}
          onAuthenticated={u => {
            setUser(u);
            setActiveRole(u.role);
            loadInitialData();
          }}
        />
      )}
    </div>
  );
}

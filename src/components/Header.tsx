import React from 'react';
import { UserRole, User, NotificationItem } from '../types';
import { Language, translations } from '../lib/translations';
import {
  Sparkles,
  Globe,
  Bell,
  UserCheck,
  ShoppingBag,
  ShieldCheck,
  Menu,
  X,
  Volume2
} from 'lucide-react';

interface HeaderProps {
  user: User;
  activeRole: UserRole;
  language: Language;
  onRoleChange: (role: UserRole) => void;
  onLanguageChange: (lang: Language) => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeRole,
  language,
  onRoleChange,
  onLanguageChange,
  onOpenProfile,
  onOpenAuth,
  notifications,
  onOpenNotifications,
  activeTab,
  onTabChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = translations[language];
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const roleColors: Record<UserRole, { bg: string; text: string; badge: string; border: string }> = {
    artisan: {
      bg: 'bg-[#5A5A40]',
      text: 'text-[#5A5A40]',
      badge: 'bg-[#F0EEE6] text-[#5A5A40] border-[#D4CFC3]',
      border: 'border-[#5A5A40]'
    },
    buyer: {
      bg: 'bg-[#C06C50]',
      text: 'text-[#C06C50]',
      badge: 'bg-[#FBECE8] text-[#C06C50] border-[#F0C4B8]',
      border: 'border-[#C06C50]'
    },
    admin: {
      bg: 'bg-[#2D2D2D]',
      text: 'text-[#2D2D2D]',
      badge: 'bg-[#F0EEE6] text-[#2D2D2D] border-[#D4CFC3]',
      border: 'border-[#2D2D2D]'
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E0D5] shadow-xs">
      {/* Top Notification Banner / SIH Nodal Strip */}
      <div className="bg-[#151619] text-[#E5E0D5] px-3 py-1.5 text-xs font-medium flex items-center justify-between border-b border-[#2D2D2D]">
        <div className="flex items-center gap-2">
          <span className="bg-[#5A5A40] text-white font-bold px-2 py-0.5 rounded-md tracking-wider text-[10px] uppercase">
            SIH26090
          </span>
          <span className="hidden sm:inline text-[#D4CFC3] font-medium">
            Smart India Hackathon • AI-Powered Artisan Market Bridge
          </span>
          <span className="sm:hidden text-[#D4CFC3]">Artisan Market Bridge</span>
        </div>

        {/* Quick Role Switcher Buttons */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#8A8A70] hidden md:inline uppercase tracking-wider">{t.switchRole}:</span>
          <button
            id="role-btn-artisan"
            onClick={() => onRoleChange('artisan')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
              activeRole === 'artisan'
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'text-[#D4CFC3] hover:text-white hover:bg-[#2D2D2D]'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            {t.artisan}
          </button>
          <button
            id="role-btn-buyer"
            onClick={() => onRoleChange('buyer')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
              activeRole === 'buyer'
                ? 'bg-[#C06C50] text-white shadow-xs'
                : 'text-[#D4CFC3] hover:text-white hover:bg-[#2D2D2D]'
            }`}
          >
            <ShoppingBag className="w-3 h-3" />
            {t.buyer}
          </button>
          <button
            id="role-btn-admin"
            onClick={() => onRoleChange('admin')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
              activeRole === 'admin'
                ? 'bg-[#D4CFC3] text-[#151619] shadow-xs font-bold'
                : 'text-[#D4CFC3] hover:text-white hover:bg-[#2D2D2D]'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            {t.admin}
          </button>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onTabChange('home')}
            className="cursor-pointer flex items-center gap-2.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#5A5A40] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5 text-[#F5F2ED]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-[#2D2D2D] tracking-tight text-base sm:text-lg">
                  Artisan<span className="text-[#5A5A40]">Bridge</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#F0EEE6] text-[#5A5A40] rounded border border-[#D4CFC3]">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-[#8A8A70] hidden sm:block leading-tight uppercase tracking-wider font-medium">
                {t.appTagline}
              </p>
            </div>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F0EEE6] p-1 rounded-xl border border-[#E5E0D5]">
          {activeRole === 'artisan' && (
            <>
              <button
                id="nav-home"
                onClick={() => onTabChange('home')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'home' ? 'bg-white text-[#5A5A40] shadow-xs font-bold' : 'text-[#8A8A70] hover:text-[#2D2D2D]'
                }`}
              >
                {t.home}
              </button>
              <button
                id="nav-products"
                onClick={() => onTabChange('products')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'products' ? 'bg-white text-[#5A5A40] shadow-xs font-bold' : 'text-[#8A8A70] hover:text-[#2D2D2D]'
                }`}
              >
                {t.products}
              </button>
              <button
                id="nav-add-product"
                onClick={() => onTabChange('add-product')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === 'add-product'
                    ? 'bg-[#5A5A40] text-white shadow-xs'
                    : 'bg-[#5A5A40] text-white hover:bg-[#4C4C36]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F5F2ED]" />
                {t.addProduct}
              </button>
              <button
                id="nav-enquiries"
                onClick={() => onTabChange('enquiries')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors relative ${
                  activeTab === 'enquiries' ? 'bg-white text-[#5A5A40] shadow-xs font-bold' : 'text-[#8A8A70] hover:text-[#2D2D2D]'
                }`}
              >
                {t.enquiries}
                {unreadCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-[#C06C50] text-white rounded-full font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                id="nav-marketplace"
                onClick={() => onTabChange('marketplace')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'marketplace' ? 'bg-white text-[#5A5A40] shadow-xs font-bold' : 'text-[#8A8A70] hover:text-[#2D2D2D]'
                }`}
              >
                {t.marketplace}
              </button>
            </>
          )}

          {activeRole === 'buyer' && (
            <>
              <button
                id="nav-buyer-home"
                onClick={() => onTabChange('buyer-home')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'buyer-home' ? 'bg-white text-[#C06C50] shadow-xs font-bold' : 'text-[#8A8A70] hover:text-[#2D2D2D]'
                }`}
              >
                {t.home}
              </button>
              <button
                id="nav-marketplace-buyer"
                onClick={() => onTabChange('marketplace')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'marketplace' ? 'bg-white text-[#C06C50] shadow-xs font-bold' : 'text-[#8A8A70] hover:text-[#2D2D2D]'
                }`}
              >
                {t.marketplace}
              </button>
              <button
                id="nav-buyer-enquiries"
                onClick={() => onTabChange('buyer-enquiries')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'buyer-enquiries' ? 'bg-white text-[#C06C50] shadow-xs font-bold' : 'text-[#8A8A70] hover:text-[#2D2D2D]'
                }`}
              >
                {t.enquiries}
              </button>
            </>
          )}

          {activeRole === 'admin' && (
            <>
              <button
                id="nav-admin-dashboard"
                onClick={() => onTabChange('admin')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'admin' ? 'bg-white text-[#2D2D2D] shadow-xs font-bold' : 'text-[#8A8A70] hover:text-[#2D2D2D]'
                }`}
              >
                {t.analytics}
              </button>
              <button
                id="nav-admin-marketplace"
                onClick={() => onTabChange('marketplace')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'marketplace' ? 'bg-white text-[#2D2D2D] shadow-xs font-bold' : 'text-[#8A8A70] hover:text-[#2D2D2D]'
                }`}
              >
                {t.marketplace}
              </button>
            </>
          )}
        </nav>

        {/* Right Tools: Language Toggle, Notifications, User Avatar */}
        <div className="flex items-center gap-2">
          {/* Language Selector (English / Hindi) */}
          <div className="flex items-center bg-[#F0EEE6] p-0.5 rounded-lg border border-[#E5E0D5]">
            <button
              id="lang-btn-en"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white text-[#2D2D2D] shadow-xs font-bold'
                  : 'text-[#8A8A70] hover:text-[#2D2D2D]'
              }`}
            >
              English
            </button>
            <button
              id="lang-btn-hi"
              onClick={() => onLanguageChange('hi')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-[#5A5A40] text-white shadow-xs font-bold'
                  : 'text-[#8A8A70] hover:text-[#2D2D2D]'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Notifications Button */}
          <button
            id="notifications-bell-btn"
            onClick={onOpenNotifications}
            className="relative p-2 text-[#5A5A40] hover:text-[#2D2D2D] hover:bg-[#F0EEE6] rounded-xl transition-colors border border-[#E5E0D5]"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C06C50] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* User Profile Pill */}
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-[#F5F2ED] border border-[#E5E0D5] hover:bg-[#EBE7DF] cursor-pointer transition-colors"
          >
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-[#D4CFC3]"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-[#2D2D2D] leading-tight truncate max-w-[110px]">
                {user.name}
              </p>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-1 rounded border ${roleColors[activeRole].badge}`}>
                {activeRole}
              </span>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5A5A40] hover:text-[#2D2D2D] hover:bg-[#F0EEE6] rounded-xl border border-[#E5E0D5]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E0D5] bg-white px-4 pt-3 pb-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="space-y-1">
            {activeRole === 'artisan' && (
              <>
                <button
                  onClick={() => { onTabChange('home'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  {t.home}
                </button>
                <button
                  onClick={() => { onTabChange('products'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  {t.products}
                </button>
                <button
                  onClick={() => { onTabChange('add-product'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold bg-[#5A5A40] text-white"
                >
                  {t.actionAddProduct}
                </button>
                <button
                  onClick={() => { onTabChange('enquiries'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F2ED] flex justify-between"
                >
                  <span>{t.enquiries}</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-[#C06C50] text-white rounded-full font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => { onTabChange('marketplace'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  {t.marketplace}
                </button>
              </>
            )}

            {activeRole === 'buyer' && (
              <>
                <button
                  onClick={() => { onTabChange('buyer-home'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  {t.home}
                </button>
                <button
                  onClick={() => { onTabChange('marketplace'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  {t.marketplace}
                </button>
                <button
                  onClick={() => { onTabChange('buyer-enquiries'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  {t.enquiries}
                </button>
              </>
            )}

            {activeRole === 'admin' && (
              <>
                <button
                  onClick={() => { onTabChange('admin'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  {t.analytics}
                </button>
                <button
                  onClick={() => { onTabChange('marketplace'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  {t.marketplace}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

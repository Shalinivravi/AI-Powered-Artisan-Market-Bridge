import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Language, translations } from '../lib/translations';
import { api } from '../lib/api';
import { UserCheck, ShoppingBag, ShieldCheck, X, Sparkles, Phone, Mail } from 'lucide-react';

interface AuthModalProps {
  language: Language;
  onClose: () => void;
  onAuthenticated: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  language,
  onClose,
  onAuthenticated
}) => {
  const t = translations[language];
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole>('artisan');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [state, setState] = useState<string>('Madhya Pradesh');
  const [companyName, setCompanyName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        const res = await api.register({
          name: name || 'Demo User',
          phone: phone || '+91 98765 43210',
          email: email || `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
          role,
          state,
          companyName: role === 'buyer' ? companyName : undefined
        });
        onAuthenticated(res.user);
      } else {
        const res = await api.login({ role });
        onAuthenticated(res.user);
      }
      onClose();
    } catch (err) {
      console.error('Auth error:', err);
      alert('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative border border-[#E5E0D5]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F2ED] hover:bg-[#ECE8DF] text-[#2D2D2D]"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A5A40] bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
            SIH26090 Access
          </span>
          <h2 className="text-xl font-black text-[#2D2D2D] mt-1.5">
            {isRegister ? 'Create Your Account' : 'Sign In to Portal'}
          </h2>
          <p className="text-xs text-[#8A8A70]">
            Choose your portal role: Marginalized Artisan, Sourcing Buyer, or Ministry Admin.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setRole('artisan')}
            className={`p-3 rounded-2xl border text-center transition-all ${
              role === 'artisan'
                ? 'border-[#5A5A40] bg-[#F0EEE6] text-[#2D2D2D] ring-2 ring-[#5A5A40]/20 font-bold'
                : 'border-[#E5E0D5] text-[#2D2D2D] hover:bg-[#F9F7F2]'
            }`}
          >
            <UserCheck className="w-5 h-5 mx-auto mb-1 text-[#5A5A40]" />
            <span className="text-xs">{t.artisan}</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`p-3 rounded-2xl border text-center transition-all ${
              role === 'buyer'
                ? 'border-[#5A5A40] bg-[#F0EEE6] text-[#2D2D2D] ring-2 ring-[#5A5A40]/20 font-bold'
                : 'border-[#E5E0D5] text-[#2D2D2D] hover:bg-[#F9F7F2]'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mx-auto mb-1 text-[#5A5A40]" />
            <span className="text-xs">{t.buyer}</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`p-3 rounded-2xl border text-center transition-all ${
              role === 'admin'
                ? 'border-[#5A5A40] bg-[#F0EEE6] text-[#2D2D2D] ring-2 ring-[#5A5A40]/20 font-bold'
                : 'border-[#E5E0D5] text-[#2D2D2D] hover:bg-[#F9F7F2]'
            }`}
          >
            <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-[#5A5A40]" />
            <span className="text-xs">{t.admin}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {isRegister && (
            <>
              <div>
                <label className="font-bold text-[#2D2D2D] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Rameshwar Lal Varma"
                  className="w-full p-2.5 rounded-xl border border-[#D4CFC3] font-medium bg-[#F9F7F2] text-[#2D2D2D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D2D2D] block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 rounded-xl border border-[#D4CFC3] font-medium bg-[#F9F7F2] text-[#2D2D2D]"
                />
              </div>

              {role === 'buyer' && (
                <div>
                  <label className="font-bold text-[#2D2D2D] block mb-1">Retail / Boutique Brand Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. FabCraft India Ltd."
                    className="w-full p-2.5 rounded-xl border border-[#D4CFC3] font-medium bg-[#F9F7F2] text-[#2D2D2D]"
                  />
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-sm shadow-md shadow-[#5A5A4033] transition-all hover:scale-102"
          >
            {loading ? 'Please wait...' : isRegister ? 'Complete Registration' : `Instant Enter as ${role}`}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs font-semibold text-[#8A8A70] hover:text-[#5A5A40]"
          >
            {isRegister ? 'Already registered? Sign in instantly' : "New artisan or buyer? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
};

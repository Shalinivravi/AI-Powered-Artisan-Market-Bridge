import React, { useState } from 'react';
import { User, ArtisanProfile, CraftCategory } from '../types';
import { Language, translations } from '../lib/translations';
import { api } from '../lib/api';
import {
  UserCheck,
  MapPin,
  Award,
  CreditCard,
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ArtisanProfileModalProps {
  user: User;
  profile: ArtisanProfile | null;
  language: Language;
  onClose: () => void;
  onProfileUpdated: (p: ArtisanProfile) => void;
}

export const ArtisanProfileModal: React.FC<ArtisanProfileModalProps> = ({
  user,
  profile,
  language,
  onClose,
  onProfileUpdated
}) => {
  const t = translations[language];
  const [craftType, setCraftType] = useState<CraftCategory>(profile?.craftType || 'Handloom');
  const [experienceYears, setExperienceYears] = useState<number>(profile?.experienceYears || 22);
  const [village, setVillage] = useState<string>(profile?.village || 'Pranpur Village');
  const [district, setDistrict] = useState<string>(profile?.district || 'Ashoknagar');
  const [state, setState] = useState<string>(profile?.state || 'Madhya Pradesh');
  const [upiId, setUpiId] = useState<string>(profile?.upiId || 'rameshwar.artisan@upi');
  const [bankAccount, setBankAccount] = useState<string>(profile?.bankAccountNumber || '9876543210123');
  const [bio, setBio] = useState<string>(
    profile?.bio ||
      'Fourth-generation master Chanderi handloom weaver specializing in pure mulberry silk with real gold zari work.'
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await api.updateArtisanProfile({
        craftType,
        experienceYears,
        village,
        district,
        state,
        upiId,
        bankAccountNumber: bankAccount,
        bio
      });
      onProfileUpdated(updated);
      alert('Profile updated successfully!');
      onClose();
    } catch (err) {
      console.error('Save profile error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5 relative border border-[#E5E0D5]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F2ED] hover:bg-[#ECE8DF] text-[#2D2D2D]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt={user.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4CFC3] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-black text-[#2D2D2D]">{user.name}</h2>
              <ShieldCheck className="w-4 h-4 text-[#5A5A40]" />
            </div>
            <p className="text-xs text-[#8A8A70]">{user.phone} • {user.email}</p>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#2D2D2D] block mb-1">Craft Specialization</label>
              <select
                value={craftType}
                onChange={e => setCraftType(e.target.value as CraftCategory)}
                className="w-full p-2.5 rounded-xl border border-[#D4CFC3] font-semibold text-[#2D2D2D] bg-[#F9F7F2]"
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
              <label className="font-bold text-[#2D2D2D] block mb-1">Experience (Years)</label>
              <input
                type="number"
                value={experienceYears}
                onChange={e => setExperienceYears(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[#D4CFC3] font-semibold text-[#2D2D2D] bg-[#F9F7F2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="font-bold text-[#2D2D2D] block mb-1">Village / Town</label>
              <input
                type="text"
                value={village}
                onChange={e => setVillage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#D4CFC3] text-[#2D2D2D] bg-[#F9F7F2]"
              />
            </div>
            <div>
              <label className="font-bold text-[#2D2D2D] block mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#D4CFC3] text-[#2D2D2D] bg-[#F9F7F2]"
              />
            </div>
            <div>
              <label className="font-bold text-[#2D2D2D] block mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#D4CFC3] text-[#2D2D2D] bg-[#F9F7F2]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#2D2D2D] block mb-1">Artisan Bio & Craft Lineage</label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full p-3 rounded-2xl border border-[#D4CFC3] text-[#2D2D2D] leading-relaxed bg-[#F9F7F2]"
            />
          </div>

          {/* Payment & Payouts */}
          <div className="p-4 bg-[#F5F2ED] rounded-2xl border border-[#E5E0D5] space-y-2">
            <span className="font-bold text-[#2D2D2D] block">Direct Artisan Bank & UPI Payouts</span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-[#8A8A70] block mb-0.5">UPI ID (GPay / PhonePe)</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  className="w-full p-2.5 bg-[#F9F7F2] rounded-xl border border-[#D4CFC3] font-mono text-[#2D2D2D]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#8A8A70] block mb-0.5">Bank Account No.</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={e => setBankAccount(e.target.value)}
                  className="w-full p-2.5 bg-[#F9F7F2] rounded-xl border border-[#D4CFC3] font-mono text-[#2D2D2D]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#E5E0D5] text-[#2D2D2D] font-bold text-xs bg-[#F5F2ED] hover:bg-[#ECE8DF]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-xs shadow-md shadow-[#5A5A4033]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Enquiry } from '../types';
import { Language, translations } from '../lib/translations';
import { api } from '../lib/api';
import {
  MessageSquare,
  Phone,
  Send,
  X,
  CheckCircle2,
  Clock,
  IndianRupee,
  Building,
  UserCheck
} from 'lucide-react';

interface EnquiryDetailModalProps {
  enquiry: Enquiry;
  language: Language;
  onClose: () => void;
  onUpdated: (updated: Enquiry) => void;
}

export const EnquiryDetailModal: React.FC<EnquiryDetailModalProps> = ({
  enquiry,
  language,
  onClose,
  onUpdated
}) => {
  const t = translations[language];
  const [responseMsg, setResponseMsg] = useState<string>(
    enquiry.responseMessage ||
      `Namaste ${enquiry.buyerName}, thank you for your order interest. We can prepare ${enquiry.quantityRequested} pieces in 10-12 days at ₹${enquiry.targetBudget || 2000} per unit. Shipping from Madhya Pradesh.`
  );
  const [status, setStatus] = useState<any>(enquiry.status);
  const [saving, setSaving] = useState<boolean>(false);

  const handleSaveResponse = async () => {
    setSaving(true);
    try {
      const updated = await api.updateEnquiryStatus(enquiry.id, 'responded', responseMsg);
      onUpdated(updated);
      alert('Quotation & reply sent to buyer successfully!');
      onClose();
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setSaving(false);
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Hello ${enquiry.buyerName}, this is regarding your enquiry for ${enquiry.productName} on Artisan Market Bridge: ${responseMsg}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative border border-[#E5E0D5]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F2ED] hover:bg-[#ECE8DF] text-[#2D2D2D]"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A5A40] bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
            B2B Buyer Inquiry
          </span>
          <h3 className="text-lg font-black text-[#2D2D2D] mt-1.5">
            Enquiry for "{enquiry.productName}"
          </h3>
          <p className="text-xs text-[#8A8A70]">
            From {enquiry.buyerName} {enquiry.buyerCompany ? `(${enquiry.buyerCompany})` : ''}
          </p>
        </div>

        {/* Lead Details Banner */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-[#F9F7F2] p-4 rounded-2xl border border-[#E5E0D5]">
          <div>
            <span className="text-[#8A8A70] block">Requested Units</span>
            <span className="font-bold text-[#2D2D2D] text-sm">{enquiry.quantityRequested} pieces</span>
          </div>
          <div>
            <span className="text-[#8A8A70] block">Target Budget</span>
            <span className="font-bold text-[#5A5A40] text-sm">₹{enquiry.targetBudget || 'Negotiable'}</span>
          </div>
        </div>

        {/* Buyer Original Message */}
        <div className="p-4 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D5] text-xs">
          <span className="font-bold text-[#2D2D2D] block mb-1">Buyer Message:</span>
          <p className="text-[#5A5A40] italic leading-relaxed">"{enquiry.message}"</p>
        </div>

        {/* Artisan Reply Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#2D2D2D]">Your Quotation & Reply:</label>
          <textarea
            rows={3}
            value={responseMsg}
            onChange={e => setResponseMsg(e.target.value)}
            className="w-full p-3 rounded-2xl border border-[#D4CFC3] text-xs text-[#2D2D2D] font-medium bg-[#F9F7F2]"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleSaveResponse}
            disabled={saving}
            className="w-full py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#5A5A4033] transition-all hover:scale-102"
          >
            <Send className="w-4 h-4" />
            <span>Send Quotation to Buyer</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-2xl bg-[#2D2D2D] hover:bg-[#3E3E3E] text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-[#4C4C4C] transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Connect on WhatsApp / Call</span>
          </a>
        </div>
      </div>
    </div>
  );
};

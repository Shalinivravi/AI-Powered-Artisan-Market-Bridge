import React from 'react';
import { NotificationItem } from '../types';
import { Language, translations } from '../lib/translations';
import { Bell, CheckCircle2, MessageSquare, Sparkles, X, Clock } from 'lucide-react';

interface NotificationModalProps {
  notifications: NotificationItem[];
  language: Language;
  onClose: () => void;
  onMarkRead: (id: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  language,
  onClose,
  onMarkRead
}) => {
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative border border-[#E5E0D5]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F2ED] hover:bg-[#ECE8DF] text-[#2D2D2D]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-[#F0EEE6] text-[#5A5A40] rounded-2xl border border-[#D4CFC3]">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-[#2D2D2D] text-lg">Notifications</h3>
            <p className="text-xs text-[#8A8A70]">Live order leads and platform updates</p>
          </div>
        </div>

        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <p className="text-xs text-[#8A8A70] text-center py-8">No notifications yet.</p>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => onMarkRead(notif.id)}
                className={`p-3.5 rounded-2xl border text-xs transition-all cursor-pointer space-y-1 ${
                  notif.isRead
                    ? 'bg-[#F9F7F2] border-[#E5E0D5] text-[#8A8A70]'
                    : 'bg-[#F0EEE6] border-[#D4CFC3] text-[#2D2D2D] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{notif.title}</span>
                  {!notif.isRead && (
                    <span className="w-2 h-2 bg-[#5A5A40] rounded-full" />
                  )}
                </div>
                <p className="text-[#2D2D2D] leading-relaxed">{notif.message}</p>
                <span className="text-[10px] text-[#8A8A70] block pt-0.5">
                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

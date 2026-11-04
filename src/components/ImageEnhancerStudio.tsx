import React, { useState } from 'react';
import { ImageEnhancementResult } from '../types';
import { Language, translations } from '../lib/translations';
import { api } from '../lib/api';
import {
  Camera,
  Upload,
  Sparkles,
  Sliders,
  CheckCircle2,
  Download,
  Sun,
  Eye,
  Layers,
  ArrowLeft
} from 'lucide-react';

interface ImageEnhancerStudioProps {
  language: Language;
  onClose: () => void;
  onUseEnhancedPhoto?: (photoUrl: string) => void;
}

const sampleCrafts = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
];

export const ImageEnhancerStudio: React.FC<ImageEnhancerStudioProps> = ({
  language,
  onClose,
  onUseEnhancedPhoto
}) => {
  const t = translations[language];
  const [selectedImage, setSelectedImage] = useState<string>(sampleCrafts[0]);
  const [brightness, setBrightness] = useState<number>(110);
  const [contrast, setContrast] = useState<number>(115);
  const [saturation, setSaturation] = useState<number>(105);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ImageEnhancementResult | null>(null);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  const handleEnhance = async (img = selectedImage) => {
    setLoading(true);
    try {
      const res = await api.enhanceImage({
        image: img,
        autoEnhance: true,
        removeBg: true,
        boostLight: true
      });
      setResult(res);
    } catch (e) {
      console.warn('Enhance error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setSelectedImage(url);
        handleEnhance(url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Studio Header */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5E0D5] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-[#E5E0D5] text-[#2D2D2D] bg-[#F5F2ED] hover:bg-[#ECE8DF]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#2D2D2D]">
              AI Artisan Photo Enhancement Studio
            </h1>
            <p className="text-xs text-[#8A8A70]">
              Transform low-light mobile phone photos into studio-grade e-commerce catalog images.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="px-4 py-2.5 rounded-xl bg-[#F5F2ED] hover:bg-[#ECE8DF] text-[#2D2D2D] border border-[#D4CFC3] font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all">
            <Upload className="w-4 h-4 text-[#5A5A40]" />
            <span>Upload My Craft</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
          <button
            onClick={() => handleEnhance()}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#5A5A4033] transition-all hover:scale-102"
          >
            <Sparkles className="w-4 h-4 text-[#D4CFC3]" />
            <span>{loading ? 'Enhancing...' : 'Auto-Enhance Photo'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Canvas & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Preview */}
        <div className="lg:col-span-8 bg-[#2D2D2D] rounded-3xl p-4 overflow-hidden flex flex-col items-center justify-center min-h-[420px] relative shadow-inner border border-[#3E3E3E]">
          <img
            src={selectedImage}
            alt="Enhancement preview"
            style={{
              filter: showOriginal
                ? 'none'
                : `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
            }}
            className="max-h-[380px] w-auto object-contain rounded-2xl shadow-2xl transition-all duration-200"
          />

          {/* Toggle Original / Enhanced */}
          <div className="absolute bottom-4 left-4 bg-[#1E1E1E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 border border-white/10">
            <span className="text-[#D4CFC3]">Viewing:</span>
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                showOriginal ? 'bg-[#3E3E3E] text-[#D4CFC3]' : 'bg-[#5A5A40] text-white'
              }`}
            >
              {showOriginal ? 'Original Raw Photo' : 'AI Enhanced Studio'}
            </button>
          </div>

          <div className="absolute top-4 right-4 bg-[#5A5A40]/90 text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#D4CFC3]/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4CFC3]" />
            <span>Score: {result?.imageQualityScore || 94}/100</span>
          </div>
        </div>

        {/* Studio Fine-Tuning Controls */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-[#E5E0D5] shadow-xs space-y-5">
          <div>
            <h3 className="font-black text-[#2D2D2D] text-sm flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#5A5A40]" />
              <span>Studio Lighting Controls</span>
            </h3>
            <p className="text-[11px] text-[#8A8A70] mt-0.5">Custom adjustments</p>
          </div>

          <div className="space-y-4 text-xs font-bold text-[#2D2D2D]">
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-[#5A5A40]" /> Brightness
                </span>
                <span className="text-[#5A5A40]">{brightness}%</span>
              </div>
              <input
                type="range"
                min={70}
                max={150}
                value={brightness}
                onChange={e => setBrightness(Number(e.target.value))}
                className="w-full accent-[#5A5A40]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Contrast</span>
                <span className="text-[#5A5A40]">{contrast}%</span>
              </div>
              <input
                type="range"
                min={80}
                max={150}
                value={contrast}
                onChange={e => setContrast(Number(e.target.value))}
                className="w-full accent-[#5A5A40]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Color Vibrancy</span>
                <span className="text-[#5A5A40]">{saturation}%</span>
              </div>
              <input
                type="range"
                min={80}
                max={160}
                value={saturation}
                onChange={e => setSaturation(Number(e.target.value))}
                className="w-full accent-[#5A5A40]"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-3 border-t border-[#E5E0D5]">
            <span className="text-[11px] font-bold text-[#8A8A70] block mb-2">Preset Filters:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setBrightness(115);
                  setContrast(120);
                  setSaturation(110);
                }}
                className="p-2.5 rounded-xl bg-[#F5F2ED] hover:bg-[#ECE8DF] text-[#2D2D2D] text-xs font-bold border border-[#E5E0D5] transition-all"
              >
                Daylight Studio
              </button>
              <button
                onClick={() => {
                  setBrightness(105);
                  setContrast(130);
                  setSaturation(125);
                }}
                className="p-2.5 rounded-xl bg-[#F5F2ED] hover:bg-[#ECE8DF] text-[#2D2D2D] text-xs font-bold border border-[#E5E0D5] transition-all"
              >
                Rich Textures
              </button>
            </div>
          </div>

          {onUseEnhancedPhoto && (
            <button
              onClick={() => onUseEnhancedPhoto(selectedImage)}
              className="w-full py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#5A5A4033] transition-all hover:scale-102"
            >
              <CheckCircle2 className="w-4 h-4 text-[#D4CFC3]" />
              <span>Use in Product Catalog</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

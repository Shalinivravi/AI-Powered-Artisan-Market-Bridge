import React, { useState, useRef, useEffect } from 'react';
import { Product, CraftCategory, ImageEnhancementResult, ProductClassificationResult, CatalogGenerationResult, PriceSuggestionResult } from '../types';
import { Language, translations } from '../lib/translations';
import { api } from '../lib/api';
import { speechService } from '../lib/speech';
import confetti from 'canvas-confetti';
import {
  Camera,
  Upload,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  IndianRupee,
  ShieldCheck,
  RefreshCw,
  Eye,
  Sliders,
  Tag,
  Info,
  Layers,
  FileCheck
} from 'lucide-react';

interface WizardProps {
  language: Language;
  onProductCreated: (product: Product) => void;
  onCancel: () => void;
  initialCategory?: CraftCategory;
}

// Sample preset artisan photos for instant testing without camera access
const sampleArtisanImages = [
  {
    title: 'Chanderi Silk Saree',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    category: 'Handloom' as CraftCategory,
    speechHint: 'यह 100% शुद्ध चंदेरी सिल्क साड़ी है, इसमें हाथ से मयूर ज़री बॉर्डर और सोने का काम किया गया है। 14 दिन में तैयार हुई।'
  },
  {
    title: 'Terracotta Clay Pot',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    category: 'Pottery' as CraftCategory,
    speechHint: 'काली नदी की मिट्टी से चाक पर बना शुद्ध शीतल मटका, बिना बिजली के पानी प्राकृतिक रूप से ठंडा रहता है।'
  },
  {
    title: 'Dhokra Brass Art',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    category: 'Metal & Brass' as CraftCategory,
    speechHint: 'बस्तर की 4000 साल पुरानी ढोकरा कला से बनी पीतल की आदिवासी संगीतकार मूर्ति।'
  },
  {
    title: 'Sheesham Wooden Box',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    category: 'Wooden Craft' as CraftCategory,
    speechHint: 'सहारनपुर की ठोस शीशम की लकड़ी पर नक्काशीदार 9 खानों वाला मसाला डिब्बा पीतल के लॉक के साथ।'
  },
  {
    title: 'Assam Bamboo Basket',
    url: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80',
    category: 'Basketry' as CraftCategory,
    speechHint: 'माजुली द्वीप के सुनहरे बांस से हाथ से बुनी गई टिकाऊ और पर्यावरण अनुकूल टोकरी।'
  }
];

export const ProductCreationWizard: React.FC<WizardProps> = ({
  language,
  onProductCreated,
  onCancel,
  initialCategory
}) => {
  const t = translations[language];
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');

  // Step 1: Photo & Studio Enhancer State
  const [selectedImage, setSelectedImage] = useState<string>(sampleArtisanImages[0].url);
  const [enhancementResult, setEnhancementResult] = useState<ImageEnhancementResult | null>(null);
  const [classificationResult, setClassificationResult] = useState<ProductClassificationResult | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [splitSliderPos, setSplitSliderPos] = useState<number>(50);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Step 2: Voice & NLP State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>(sampleArtisanImages[0].speechHint);
  const [voiceLang, setVoiceLang] = useState<'hi-IN' | 'en-IN'>('hi-IN');
  const [isSpeakingAudio, setIsSpeakingAudio] = useState<boolean>(false);

  // Step 3: AI Multilingual Catalog State
  const [catalog, setCatalog] = useState<CatalogGenerationResult | null>(null);
  const [catalogLanguageView, setCatalogLanguageView] = useState<'both' | 'hi' | 'en'>('both');

  // Step 4: Dynamic Pricing State
  const [rawCost, setRawCost] = useState<number>(450);
  const [laborHours, setLaborHours] = useState<number>(12);
  const [hourlyWage, setHourlyWage] = useState<number>(90);
  const [pricingResult, setPricingResult] = useState<PriceSuggestionResult | null>(null);
  const [customPrice, setCustomPrice] = useState<number>(0);

  // Step 5: Stock & Publish State
  const [stockQuantity, setStockQuantity] = useState<number>(5);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  // Camera stream handler
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn('Camera access denied:', err);
      alert('Unable to open camera. You can upload a photo or pick one of the sample artisan craft photos below.');
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUri = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUri);
      stopCamera();
      runAIEnhancementAndVision(dataUri);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        runAIEnhancementAndVision(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run initial AI analysis when step 1 loads
  const runAIEnhancementAndVision = async (imageSrc: string) => {
    setLoadingAI(true);
    setLoadingText(t.processingAI);
    try {
      const [enhanced, classified] = await Promise.all([
        api.enhanceImage({ image: imageSrc, autoEnhance: true, removeBg: true }),
        api.classifyProduct({ image: imageSrc })
      ]);
      setEnhancementResult(enhanced);
      setClassificationResult(classified);
    } catch (err) {
      console.warn('AI analysis fallback:', err);
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    runAIEnhancementAndVision(selectedImage);
    return () => {
      stopCamera();
      speechService.stopSpeaking();
    };
  }, []);

  // Step 2: Voice recording trigger
  const toggleVoiceRecording = () => {
    if (isRecording) {
      speechService.stopListening();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      speechService.startListening(
        (text, isFinal) => {
          setVoiceTranscript(prev => (isFinal ? `${prev} ${text}`.trim() : `${prev} ${text}`.trim()));
        },
        errorMsg => {
          console.warn('Voice recognition error:', errorMsg);
          setIsRecording(false);
        },
        voiceLang
      );
    }
  };

  // Step 3: Generate Catalog
  const handleGenerateCatalog = async () => {
    setLoadingAI(true);
    setLoadingText(t.generatingCatalog);
    try {
      const result = await api.generateCatalog({
        voiceTranscription: voiceTranscript,
        category: classificationResult?.category || initialCategory || 'Handloom',
        material: classificationResult?.material,
        artisanName: 'Rameshwar Lal Varma',
        region: 'Chanderi, Madhya Pradesh'
      });
      setCatalog(result);
      setCurrentStep(3);

      // Also trigger pricing suggestion for step 4 in background
      const priceRes = await api.getPriceSuggestion({
        category: result.category,
        material: result.material,
        rawMaterialCost: rawCost,
        laborHours,
        hourlyWage
      });
      setPricingResult(priceRes);
      setCustomPrice(priceRes.suggestedPrice);
    } catch (err) {
      console.error('Catalog creation error:', err);
    } finally {
      setLoadingAI(false);
    }
  };

  // Step 4: Recalculate price when inputs change
  const handleRecalculatePrice = async (cost = rawCost, hours = laborHours, wage = hourlyWage) => {
    try {
      const priceRes = await api.getPriceSuggestion({
        category: catalog?.category || classificationResult?.category || 'Handloom',
        material: catalog?.material || 'Natural Materials',
        rawMaterialCost: cost,
        laborHours: hours,
        hourlyWage: wage
      });
      setPricingResult(priceRes);
      setCustomPrice(priceRes.suggestedPrice);
    } catch (e) {
      console.warn('Price calculation fallback:', e);
    }
  };

  // Voice Reader for Catalog / Rationale
  const toggleSpeakText = (text: string, lang: 'hi' | 'en') => {
    if (isSpeakingAudio) {
      speechService.stopSpeaking();
      setIsSpeakingAudio(false);
    } else {
      setIsSpeakingAudio(true);
      speechService.speak(text, lang, () => setIsSpeakingAudio(false));
    }
  };

  // Step 5: Final Publish to Marketplace
  const handleFinalPublish = async (status: 'published' | 'draft') => {
    setIsPublishing(true);
    try {
      const newProductPayload: Partial<Product> = {
        name: catalog?.name || 'Handcrafted Indian Artisan Craft',
        nameHindi: catalog?.nameHindi || 'हस्तनिर्मित भारतीय कारीगर कृति',
        category: catalog?.category || classificationResult?.category || 'Handloom',
        description: catalog?.detailedDescription || 'Handcrafted by master artisan.',
        descriptionHindi: catalog?.detailedDescriptionHindi || 'मास्टर कारीगर द्वारा हस्तनिर्मित।',
        shortDescription: catalog?.shortDescription || 'Authentic handmade craft.',
        shortDescriptionHindi: catalog?.shortDescriptionHindi || 'प्रामाणिक हस्तशिल्प उत्पाद।',
        material: catalog?.material || classificationResult?.material || 'Natural Materials',
        colour: catalog?.colour || classificationResult?.colour || 'Natural',
        size: catalog?.size || 'Standard Size',
        price: customPrice || pricingResult?.suggestedPrice || 1200,
        suggestedPrice: pricingResult?.suggestedPrice || customPrice || 1200,
        minPrice: pricingResult?.minRecommendedPrice || Math.round(customPrice * 0.85),
        maxPrice: pricingResult?.maxRecommendedPrice || Math.round(customPrice * 1.25),
        pricingExplanation: pricingResult?.explanation,
        imageUrl: selectedImage,
        imageQualityScore: enhancementResult?.imageQualityScore || 94,
        status,
        tags: catalog?.tags || ['Handmade', 'Artisan Direct'],
        keywords: catalog?.keywords || ['handicraft', 'indian art'],
        stockQuantity,
        isVerified: true
      };

      const created = await api.createProduct(newProductPayload);

      // Fireworks celebration for publishing!
      if (status === 'published') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      onProductCreated(created);
    } catch (err) {
      console.error('Publishing failed:', err);
      alert('Failed to publish product. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-3 sm:px-6">
      {/* Wizard Header & Step Progress Bar */}
      <div className="mb-6 bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A5A40] bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
              {t.appName}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#2D2D2D] mt-1.5 tracking-tight">
              {currentStep === 1 && t.step1Title}
              {currentStep === 2 && t.step2Title}
              {currentStep === 3 && t.step3Title}
              {currentStep === 4 && t.step4Title}
              {currentStep === 5 && t.step5Title}
            </h2>
            <p className="text-xs sm:text-sm text-[#8A8A70]">
              {currentStep === 1 && t.step1Sub}
              {currentStep === 2 && t.step2Sub}
              {currentStep === 3 && t.step3Sub}
              {currentStep === 4 && t.step4Sub}
              {currentStep === 5 && t.step5Sub}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-xs font-bold text-[#8A8A70] hover:text-[#2D2D2D] px-3.5 py-1.5 rounded-xl border border-[#E5E0D5] hover:bg-[#F5F2ED]"
          >
            Cancel
          </button>
        </div>

        {/* 5 Step Indicator */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {[
            { step: 1, label: 'Photo' },
            { step: 2, label: 'Voice' },
            { step: 3, label: 'Catalog' },
            { step: 4, label: 'Price' },
            { step: 5, label: 'Publish' }
          ].map(item => (
            <div key={item.step} className="flex flex-col items-center">
              <div
                className={`w-full h-2 rounded-full transition-all duration-300 ${
                  currentStep >= item.step ? 'bg-[#5A5A40]' : 'bg-[#E5E0D5]'
                }`}
              />
              <span
                className={`text-[10px] sm:text-xs font-bold mt-1.5 ${
                  currentStep === item.step
                    ? 'text-[#5A5A40]'
                    : currentStep > item.step
                    ? 'text-[#2D2D2D]'
                    : 'text-[#8A8A70]'
                }`}
              >
                {item.step}. {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Loading Overlay */}
      {loadingAI && (
        <div className="bg-[#F5F2ED] border-2 border-[#D4CFC3] p-6 rounded-3xl mb-6 text-center animate-pulse">
          <Sparkles className="w-8 h-8 text-[#5A5A40] mx-auto mb-2 animate-spin" />
          <p className="text-sm font-bold text-[#2D2D2D]">{loadingText}</p>
          <p className="text-xs text-[#8A8A70] mt-1">
            Analyzing textures, regional craft attributes, and generating bilingual descriptions...
          </p>
        </div>
      )}

      {/* ================= STEP 1: PHOTO CAPTURE & AI STUDIO ENHANCER ================= */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Main Photo Studio Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#F0EEE6] text-[#5A5A40] rounded-xl border border-[#D4CFC3]">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-[#2D2D2D] text-base">{t.aiEnhancerTitle}</h3>
                  <p className="text-xs text-[#8A8A70]">Auto-balanced lighting, contrast & background isolation</p>
                </div>
              </div>

              {/* Action Buttons: Camera & Upload */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  id="take-photo-btn"
                  onClick={cameraActive ? capturePhoto : startCamera}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Camera className="w-4 h-4 text-[#F5F2ED]" />
                  {cameraActive ? 'Snap Picture' : t.takePhoto}
                </button>
                <button
                  id="upload-photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#F0EEE6] hover:bg-[#E5E0D5] text-[#5A5A40] border border-[#D4CFC3] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  {t.uploadPhoto}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Live Camera View if Active */}
            {cameraActive && (
              <div className="relative mb-4 rounded-2xl overflow-hidden bg-black aspect-video max-h-80 flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-4 flex items-center gap-3">
                  <button
                    onClick={capturePhoto}
                    className="px-5 py-2.5 bg-[#5A5A40] text-white font-bold rounded-full shadow-lg flex items-center gap-2 text-sm hover:bg-[#4C4C36] ring-4 ring-white/30"
                  >
                    <Camera className="w-5 h-5" />
                    Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 bg-[#2D2D2D] text-white text-xs rounded-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Before / After Image Studio Preview */}
            {!cameraActive && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 relative rounded-2xl overflow-hidden bg-stone-900 aspect-4/3 max-h-[380px] shadow-inner group border border-[#E5E0D5]">
                  <img
                    src={selectedImage}
                    alt="Handmade craft"
                    className="w-full h-full object-contain filter contrast-105 brightness-105"
                  />
                  {/* Quality Badge Overlay */}
                  <div className="absolute top-3 left-3 bg-[#151619]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#3E3E3E]">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5F2ED]" />
                    <span>Quality: {enhancementResult?.imageQualityScore || 94}/100</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-[#5A5A40]/90 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border border-[#8A8A70]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F5F2ED]" />
                    <span>E-Commerce Ready</span>
                  </div>
                </div>

                {/* AI Quality Audit Breakdown */}
                <div className="md:col-span-4 space-y-3">
                  <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E5E0D5]">
                    <span className="text-[11px] font-bold text-[#8A8A70] uppercase tracking-wider">
                      {t.imageQualityScore}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-[#5A5A40]">
                        {enhancementResult?.imageQualityScore || 94}
                      </span>
                      <span className="text-xs text-[#8A8A70] font-medium">/ 100 Grade A</span>
                    </div>

                    <div className="space-y-2.5 mt-3 text-xs">
                      <div>
                        <div className="flex justify-between text-[#5A5A40] mb-1 font-medium">
                          <span>Lighting Balance</span>
                          <span className="font-bold text-[#2D2D2D]">{enhancementResult?.lightingBalance || 94}%</span>
                        </div>
                        <div className="w-full bg-[#E5E0D5] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#5A5A40] h-full rounded-full"
                            style={{ width: `${enhancementResult?.lightingBalance || 94}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#5A5A40] mb-1 font-medium">
                          <span>Sharpness & Weave Detail</span>
                          <span className="font-bold text-[#2D2D2D]">{enhancementResult?.sharpnessScore || 91}%</span>
                        </div>
                        <div className="w-full bg-[#E5E0D5] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#5A5A40] h-full rounded-full"
                            style={{ width: `${enhancementResult?.sharpnessScore || 91}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Computer Vision Recognition Summary */}
                  {classificationResult && (
                    <div className="bg-[#F0EEE6] p-4 rounded-2xl border border-[#D4CFC3] text-xs">
                      <div className="flex items-center gap-1.5 text-[#5A5A40] font-bold mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#5A5A40]" />
                        <span>AI Recognized Craft</span>
                      </div>
                      <p className="text-[#2D2D2D] font-bold">{classificationResult.category} • {classificationResult.material}</p>
                      <p className="text-[11px] text-[#5A5A40] mt-0.5">{classificationResult.craftHeritage}</p>
                      <div className="mt-2 text-[10px] text-[#8A8A70] bg-white p-2 rounded-xl border border-[#E5E0D5]">
                        Confidence: {(classificationResult.confidenceScore * 100).toFixed(0)}% Match
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Demo Sample Crafts Selector */}
            <div className="mt-5 pt-4 border-t border-[#E5E0D5]">
              <span className="text-xs font-bold text-[#8A8A70] block mb-2 uppercase tracking-wide">
                Or select a sample artisan craft for quick demo:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {sampleArtisanImages.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(sample.url);
                      setVoiceTranscript(sample.speechHint);
                      runAIEnhancementAndVision(sample.url);
                    }}
                    className={`p-2 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                      selectedImage === sample.url
                        ? 'border-[#5A5A40] bg-[#F0EEE6] ring-2 ring-[#5A5A4033]'
                        : 'border-[#E5E0D5] bg-[#F5F2ED] hover:bg-[#ECE8DF]'
                    }`}
                  >
                    <img
                      src={sample.url}
                      alt={sample.title}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="truncate">
                      <p className="text-[11px] font-bold text-[#2D2D2D] truncate">{sample.title}</p>
                      <span className="text-[10px] text-[#8A8A70]">{sample.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Next Step Bar */}
          <div className="flex justify-end">
            <button
              id="wizard-step1-next"
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#5A5A4022] transition-all"
            >
              <span>Continue to Step 2: Voice Description</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: VOICE DESCRIPTION & REGIONAL NLP ================= */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D5] shadow-xs">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
                Voice-First Simplicity
              </span>
              <h3 className="text-xl font-black text-[#2D2D2D] mt-2">
                {t.voicePrompt}
              </h3>
              <p className="text-xs text-[#8A8A70] mt-1 leading-relaxed">
                Speak naturally in Hindi, English, or your regional dialect. AI will transform it into a professional bilingual catalog!
              </p>
            </div>

            {/* Giant Microphone Button */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="relative">
                {isRecording && (
                  <div className="absolute -inset-4 rounded-full bg-[#C06C50]/30 animate-ping" />
                )}
                <button
                  id="voice-record-btn"
                  onClick={toggleVoiceRecording}
                  className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all duration-300 z-10 relative ${
                    isRecording
                      ? 'bg-[#C06C50] scale-110 ring-8 ring-[#C06C5033]'
                      : 'bg-[#C06C50] hover:bg-[#AC5D43] hover:scale-105 ring-8 ring-[#C06C5022]'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-8 h-8 text-white animate-pulse" />
                      <span className="text-[10px] font-bold mt-1">Recording</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-8 h-8 text-white" />
                      <span className="text-[10px] font-bold mt-1">Tap to Speak</span>
                    </>
                  )}
                </button>
              </div>

              {/* Language Selector for Speech */}
              <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-[#5A5A40]">
                <span>Spoken Language:</span>
                <button
                  onClick={() => setVoiceLang('hi-IN')}
                  className={`px-3 py-1 rounded-xl border ${
                    voiceLang === 'hi-IN' ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'bg-[#F5F2ED] text-[#2D2D2D] border-[#E5E0D5]'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
                <button
                  onClick={() => setVoiceLang('en-IN')}
                  className={`px-3 py-1 rounded-xl border ${
                    voiceLang === 'en-IN' ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'bg-[#F5F2ED] text-[#2D2D2D] border-[#E5E0D5]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Transcript & Text Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#2D2D2D]">{t.orTypeText}</label>
                <span className="text-[11px] text-[#8A8A70]">Edit or type directly anytime</span>
              </div>
              <textarea
                id="voice-transcript-input"
                rows={4}
                value={voiceTranscript}
                onChange={e => setVoiceTranscript(e.target.value)}
                placeholder="उदा. यह शुद्ध रेशम की चंदेरी साड़ी है, जिसे बनाने में 14 दिन लगे हैं..."
                className="w-full p-4 rounded-2xl border border-[#D4CFC3] focus:ring-2 focus:ring-[#5A5A40] focus:border-[#5A5A40] text-sm text-[#2D2D2D] font-medium bg-[#F9F7F2]"
              />
            </div>

            {/* Suggested Audio Prompts Chips */}
            <div className="mt-4 pt-3 border-t border-[#E5E0D5]">
              <span className="text-xs font-bold text-[#8A8A70] block mb-2 uppercase tracking-wide">
                Or tap a sample artisan voice transcript:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'यह 100% शुद्ध रेशम की चंदेरी साड़ी है, जिसमें सुनहरी ज़री मयूर बॉर्डर बुना गया है।',
                  'प्राकृतिक नदी की मिट्टी से बना शीतल मटका जो बिना बिजली पानी ठंडा रखता है।',
                  'सहारनपुर की ठोस शीशम की लकड़ी पर नक्काशीदार 9 खानों वाला मसाला डिब्बा।',
                  'माजुली द्वीप के सुनहरे असमिया बांस से बनी मजबूत हस्तनिर्मित टोकरी।'
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setVoiceTranscript(sample)}
                    className="text-left text-xs bg-[#F5F2ED] hover:bg-[#F0EEE6] hover:text-[#2D2D2D] border border-[#E5E0D5] hover:border-[#5A5A40] px-3.5 py-1.5 rounded-xl text-[#5A5A40] transition-colors"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-2xl border border-[#E5E0D5] text-[#2D2D2D] font-bold text-xs bg-[#F5F2ED] hover:bg-[#ECE8DF] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              id="generate-catalog-action-btn"
              onClick={handleGenerateCatalog}
              disabled={!voiceTranscript.trim()}
              className="px-6 py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-[#5A5A4022] transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#F5F2ED]" />
              <span>{t.generateCatalogBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: AI MULTILINGUAL SMART CATALOG ================= */}
      {currentStep === 3 && catalog && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
            {/* Header with Bilingual Toggle & TTS Speaker */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E0D5]">
              <div>
                <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
                  AI Auto-Cataloger Ready
                </span>
                <h3 className="text-lg font-black text-[#2D2D2D] mt-1">
                  Professional E-Commerce Catalog (English & हिन्दी)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Audio Voice Assistant Button */}
                <button
                  id="listen-catalog-audio-btn"
                  onClick={() =>
                    toggleSpeakText(
                      catalogLanguageView === 'hi'
                        ? `${catalog.nameHindi}. ${catalog.detailedDescriptionHindi}`
                        : `${catalog.name}. ${catalog.detailedDescription}`,
                      catalogLanguageView === 'hi' ? 'hi' : 'en'
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-[#F0EEE6] text-[#5A5A40] font-bold text-xs flex items-center gap-1.5 hover:bg-[#E5E0D5] transition-colors border border-[#D4CFC3]"
                >
                  {isSpeakingAudio ? <VolumeX className="w-4 h-4 text-[#C06C50] animate-pulse" /> : <Volume2 className="w-4 h-4 text-[#5A5A40]" />}
                  <span>{isSpeakingAudio ? t.stopAudio : t.listenToAudio}</span>
                </button>

                {/* View toggle: Both / Hindi / English */}
                <div className="flex bg-[#F5F2ED] p-1 rounded-xl border border-[#E5E0D5] text-xs">
                  <button
                    onClick={() => setCatalogLanguageView('both')}
                    className={`px-2.5 py-1 font-bold rounded-lg ${
                      catalogLanguageView === 'both' ? 'bg-white text-[#2D2D2D] shadow-xs' : 'text-[#8A8A70]'
                    }`}
                  >
                    Both
                  </button>
                  <button
                    onClick={() => setCatalogLanguageView('hi')}
                    className={`px-2.5 py-1 font-bold rounded-lg ${
                      catalogLanguageView === 'hi' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#8A8A70]'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => setCatalogLanguageView('en')}
                    className={`px-2.5 py-1 font-bold rounded-lg ${
                      catalogLanguageView === 'en' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#8A8A70]'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>

            {/* Catalog Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-5">
              {/* Product Visual Card Preview */}
              <div className="md:col-span-4 space-y-3">
                <div className="rounded-2xl overflow-hidden border border-[#E5E0D5] bg-stone-900 aspect-square shadow-xs relative">
                  <img src={selectedImage} alt={catalog.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-[#5A5A40] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs">
                    {catalog.category}
                  </div>
                </div>
                <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E5E0D5] text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#8A8A70]">Material:</span>
                    <span className="font-bold text-[#2D2D2D]">{catalog.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A8A70]">Colour:</span>
                    <span className="font-bold text-[#2D2D2D]">{catalog.colour}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A8A70]">Dimensions:</span>
                    <span className="font-bold text-[#2D2D2D]">{catalog.size}</span>
                  </div>
                </div>
              </div>

              {/* Editable Bilingual Catalog Content */}
              <div className="md:col-span-8 space-y-4">
                {/* Hindi Title & Description */}
                {(catalogLanguageView === 'both' || catalogLanguageView === 'hi') && (
                  <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E5E0D5] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wide">
                        उत्पाद शीर्षक (Hindi Title)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={catalog.nameHindi}
                      onChange={e => setCatalog({ ...catalog, nameHindi: e.target.value })}
                      className="w-full p-3 bg-white rounded-xl border border-[#D4CFC3] font-bold text-base text-[#2D2D2D]"
                    />

                    <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wide block mt-2">
                      विस्तृत कहानी और विवरण (Hindi Story)
                    </span>
                    <textarea
                      rows={3}
                      value={catalog.detailedDescriptionHindi}
                      onChange={e => setCatalog({ ...catalog, detailedDescriptionHindi: e.target.value })}
                      className="w-full p-3 bg-white rounded-xl border border-[#D4CFC3] text-xs text-[#2D2D2D] leading-relaxed font-medium"
                    />
                  </div>
                )}

                {/* English Title & Description */}
                {(catalogLanguageView === 'both' || catalogLanguageView === 'en') && (
                  <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E5E0D5] space-y-2">
                    <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wide">
                      English Product Title
                    </span>
                    <input
                      type="text"
                      value={catalog.name}
                      onChange={e => setCatalog({ ...catalog, name: e.target.value })}
                      className="w-full p-3 bg-white rounded-xl border border-[#D4CFC3] font-bold text-base text-[#2D2D2D]"
                    />

                    <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wide block mt-2">
                      Detailed E-Commerce Description & Story
                    </span>
                    <textarea
                      rows={3}
                      value={catalog.detailedDescription}
                      onChange={e => setCatalog({ ...catalog, detailedDescription: e.target.value })}
                      className="w-full p-3 bg-white rounded-xl border border-[#D4CFC3] text-xs text-[#2D2D2D] leading-relaxed font-medium"
                    />
                  </div>
                )}

                {/* SEO Tags & Cultural Heritage */}
                <div className="bg-[#F5F2ED] p-3 rounded-2xl border border-[#E5E0D5] flex flex-wrap gap-1.5 items-center">
                  <Tag className="w-3.5 h-3.5 text-[#8A8A70]" />
                  <span className="text-xs font-bold text-[#5A5A40]">Tags:</span>
                  {catalog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold bg-white px-2.5 py-0.5 rounded-lg border border-[#E5E0D5] text-[#2D2D2D]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-2xl border border-[#E5E0D5] text-[#2D2D2D] font-bold text-xs bg-[#F5F2ED] hover:bg-[#ECE8DF] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              id="wizard-step3-next"
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-[#5A5A4022] transition-all"
            >
              <span>Continue to Step 4: Dynamic Price Recommendation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: DYNAMIC PRICING ASSISTANT ================= */}
      {currentStep === 4 && pricingResult && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D5] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D5]">
              <div>
                <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
                  {t.pricingAssistant}
                </span>
                <h3 className="text-xl font-black text-[#2D2D2D] mt-1.5">
                  AI-Powered Fair Trade Price Discovery
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-[#5A5A40] bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
                  Confidence: 94%
                </span>
              </div>
            </div>

            {/* Main Price Recommendation Hero Block */}
            <div className="my-6 p-6 sm:p-8 rounded-3xl bg-[#F5F2ED] border-2 border-[#D4CFC3] text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A8A70]">
                {t.suggestedPrice}
              </span>
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-black text-[#2D2D2D] my-2">
                <span>₹{pricingResult.suggestedPrice.toLocaleString()}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#E5E0D5] text-xs font-bold text-[#2D2D2D] shadow-xs">
                <span>{t.recommendedRange}:</span>
                <span className="text-[#5A5A40] font-black">
                  ₹{pricingResult.minRecommendedPrice.toLocaleString()} – ₹{pricingResult.maxRecommendedPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-[#5A5A40] mt-3 max-w-lg mx-auto font-medium leading-relaxed">
                {language === 'hi' ? pricingResult.explanationHindi : pricingResult.explanation}
              </p>
            </div>

            {/* Interactive Cost & Labor Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Raw Material Cost */}
              <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E5E0D5]">
                <div className="flex justify-between items-center text-xs font-bold text-[#2D2D2D] mb-2">
                  <span>{t.rawMaterialCost}</span>
                  <span className="text-[#5A5A40] font-black text-sm">₹{rawCost}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={3000}
                  step={50}
                  value={rawCost}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setRawCost(v);
                    handleRecalculatePrice(v, laborHours, hourlyWage);
                  }}
                  className="w-full accent-[#5A5A40]"
                />
                <span className="text-[10px] text-[#8A8A70] mt-1 block">Silk yarn, clay, brass, wood</span>
              </div>

              {/* Labor Hours */}
              <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E5E0D5]">
                <div className="flex justify-between items-center text-xs font-bold text-[#2D2D2D] mb-2">
                  <span>{t.laborHours}</span>
                  <span className="text-[#5A5A40] font-black text-sm">{laborHours} hrs</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={48}
                  step={1}
                  value={laborHours}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setLaborHours(v);
                    handleRecalculatePrice(rawCost, v, hourlyWage);
                  }}
                  className="w-full accent-[#5A5A40]"
                />
                <span className="text-[10px] text-[#8A8A70] mt-1 block">Handloom weaving & sculpting</span>
              </div>

              {/* Artisan Rate per hour */}
              <div className="bg-[#F5F2ED] p-4 rounded-2xl border border-[#E5E0D5]">
                <div className="flex justify-between items-center text-xs font-bold text-[#2D2D2D] mb-2">
                  <span>{t.hourlyWage}</span>
                  <span className="text-[#5A5A40] font-black text-sm">₹{hourlyWage}/hr</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={250}
                  step={10}
                  value={hourlyWage}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setHourlyWage(v);
                    handleRecalculatePrice(rawCost, laborHours, v);
                  }}
                  className="w-full accent-[#5A5A40]"
                />
                <span className="text-[10px] text-[#8A8A70] mt-1 block">Fair Artisan Wage Standard</span>
              </div>
            </div>

            {/* Custom Final Price Setting */}
            <div className="mt-5 p-4 rounded-2xl bg-[#F0EEE6] border border-[#D4CFC3] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#2D2D2D]">Your Final Listing Price (₹):</span>
                <p className="text-[11px] text-[#8A8A70]">You can adopt the AI recommendation or set your own price.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#2D2D2D]">₹</span>
                <input
                  type="number"
                  value={customPrice}
                  onChange={e => setCustomPrice(Number(e.target.value))}
                  className="w-32 p-2.5 bg-white rounded-xl border border-[#D4CFC3] font-bold text-lg text-[#2D2D2D]"
                />
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-2xl border border-[#E5E0D5] text-[#2D2D2D] font-bold text-xs bg-[#F5F2ED] hover:bg-[#ECE8DF] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              id="wizard-step4-next"
              onClick={() => setCurrentStep(5)}
              className="px-6 py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-[#5A5A4022] transition-all"
            >
              <span>Continue to Step 5: Publish & Connect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 5: SMART PUBLISH & LISTING ================= */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D5] shadow-xs">
            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider bg-[#F0EEE6] px-2.5 py-0.5 rounded-full border border-[#D4CFC3]">
                Ready for National & B2B Buyers
              </span>
              <h3 className="text-xl font-black text-[#2D2D2D] mt-2">
                Preview & Publish Your Listing
              </h3>
              <p className="text-xs text-[#8A8A70] mt-1">
                Your product will be instantly indexed for buyer AI recommendations and wholesale search.
              </p>
            </div>

            {/* Marketplace Card Preview */}
            <div className="max-w-md mx-auto bg-[#F5F2ED] rounded-3xl border border-[#E5E0D5] overflow-hidden shadow-xs">
              <div className="aspect-4/3 relative bg-stone-900">
                <img
                  src={selectedImage}
                  alt={catalog?.name || 'Artisan product'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#2D2D2D] flex items-center gap-1 shadow-xs border border-[#E5E0D5]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Verified Artisan</span>
                </div>
                <div className="absolute top-3 right-3 bg-[#5A5A40] text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-xs">
                  {catalog?.category || 'Handicraft'}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h4 className="font-bold text-[#2D2D2D] text-base leading-snug">
                  {language === 'hi' ? catalog?.nameHindi || catalog?.name : catalog?.name}
                </h4>
                <p className="text-xs text-[#8A8A70] line-clamp-2">
                  {language === 'hi' ? catalog?.shortDescriptionHindi || catalog?.shortDescription : catalog?.shortDescription}
                </p>

                <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8A8A70] uppercase font-bold tracking-wider">Listing Price</span>
                    <p className="text-2xl font-black text-[#5A5A40]">₹{customPrice.toLocaleString()}</p>
                  </div>
                  <span className="text-xs bg-[#F0EEE6] text-[#5A5A40] border border-[#D4CFC3] font-bold px-3 py-1 rounded-xl">
                    In Stock: {stockQuantity}
                  </span>
                </div>
              </div>
            </div>

            {/* Available Stock Counter */}
            <div className="max-w-md mx-auto mt-4 p-3.5 bg-[#F0EEE6] rounded-2xl flex items-center justify-between border border-[#D4CFC3]">
              <span className="text-xs font-bold text-[#2D2D2D]">Initial Available Inventory Units:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStockQuantity(Math.max(1, stockQuantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white border border-[#D4CFC3] font-bold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  -
                </button>
                <span className="font-bold text-[#2D2D2D] text-sm px-2">{stockQuantity}</span>
                <button
                  onClick={() => setStockQuantity(stockQuantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white border border-[#D4CFC3] font-bold text-[#2D2D2D] hover:bg-[#F5F2ED]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Final Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              onClick={() => setCurrentStep(4)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl border border-[#E5E0D5] text-[#2D2D2D] font-bold text-xs bg-[#F5F2ED] hover:bg-[#ECE8DF] flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pricing
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id="save-draft-btn"
                onClick={() => handleFinalPublish('draft')}
                disabled={isPublishing}
                className="flex-1 sm:flex-none px-5 py-3.5 rounded-2xl border border-[#E5E0D5] text-[#2D2D2D] font-bold text-xs hover:bg-[#F5F2ED] bg-white"
              >
                {t.saveDraft}
              </button>
              <button
                id="publish-product-btn"
                onClick={() => handleFinalPublish('published')}
                disabled={isPublishing}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#4C4C36] text-white font-bold text-sm shadow-lg shadow-[#5A5A4033] flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-[#F5F2ED]" />
                <span>{t.publishProduct}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

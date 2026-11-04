// Web Speech API wrapper for Speech Recognition & Text-To-Speech Audio Voice Assistant

export interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

class SpeechService {
  private recognition: any = null;
  private isListening = false;
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
      }
    }
  }

  isSupported(): boolean {
    return !!this.recognition;
  }

  startListening(
    onResult: (text: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    language: 'hi-IN' | 'en-IN' | 'en-US' = 'hi-IN'
  ): void {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser. You can type directly.');
      return;
    }

    try {
      this.recognition.lang = language;
      this.recognition.onresult = (event: any) => {
        let interim = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        onResult(finalTranscript || interim, !!finalTranscript);
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error !== 'no-speech') {
          onError(`Mic error: ${event.error}`);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
      this.isListening = true;
    } catch (err: any) {
      console.warn('Recognition start failed:', err);
      onError('Microphone already active or permission denied.');
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }

  // Text-To-Speech (reads catalog or price out loud for low-literacy artisans)
  speak(text: string, lang: 'hi' | 'en' = 'hi', onEnd?: () => void): void {
    if (!this.synth) return;
    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95; // slightly slower for maximum clarity
    utterance.pitch = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = () => onEnd();
    }

    // Try finding natural voices
    const voices = this.synth.getVoices();
    const targetVoice = voices.find(v => (lang === 'hi' ? v.lang.startsWith('hi') : v.lang.startsWith('en')));
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    this.synth.speak(utterance);
  }

  stopSpeaking(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }

  isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking);
  }
}

export const speechService = new SpeechService();

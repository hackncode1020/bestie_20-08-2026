import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FloatingParticles from './components/FloatingParticles';
import BirthdayCurtains from './components/BirthdayCurtains';
import HeroProtectionSection from './components/HeroProtectionSection';
import BestieRoadmapSection from './components/BestieRoadmapSection';
import BirthdayCakeSection from './components/BirthdayCakeSection';
import SurpriseGiftSection from './components/SurpriseGiftSection';
import DrawingStudioSection from './components/DrawingStudioSection';
import PhotoScrapbookSection from './components/PhotoScrapbookSection';
import AiBirthdayStudio from './components/AiBirthdayStudio';
import BestieReasonsSection from './components/BestieReasonsSection';
import { PinnedDrawing } from './types';
import { sound } from './utils/audio';
import { fireFireworks, fireBirthdayConfetti } from './utils/confetti';
import { Sparkles, Disc, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [bestieName, setBestieName] = useState('Bestie');
  const [activeSection, setActiveSection] = useState('shrine');
  const [pinnedDrawings, setPinnedDrawings] = useState<PinnedDrawing[]>([]);
  const [isCurtainsOpen, setIsCurtainsOpen] = useState(false);
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);

  useEffect(() => {
    // Check initial playing state
    setIsLofiPlaying(sound.getIsLofiPlaying());
  }, []);

  const handlePinDrawing = (drawing: PinnedDrawing) => {
    setPinnedDrawings((prev) => [drawing, ...prev]);
    // Smoothly scroll to scrapbook so the user can see their pinned card!
    const scrapbookEl = document.getElementById('photos');
    if (scrapbookEl) {
      scrapbookEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCurtainOpen = () => {
    setIsCurtainsOpen(true);
    setIsLofiPlaying(true);
  };

  const handleCurtainClose = () => {
    setIsCurtainsOpen(false);
  };

  const toggleLofiMusic = () => {
    sound.playPop();
    sound.toggleLofiMusic((playing) => {
      setIsLofiPlaying(playing);
    });
  };

  return (
    <div className="min-h-screen bg-[#E0F2FE] text-[#075985] selection:bg-[#0EA5E9] selection:text-white relative overflow-x-hidden font-sans">
      {/* Grand Birthday Welcome Curtains */}
      <BirthdayCurtains
        bestieName={bestieName}
        isOpen={isCurtainsOpen}
        onOpen={handleCurtainOpen}
        onClose={handleCurtainClose}
      />

      {/* Floating Animated Emojis & Nazar Charms */}
      <FloatingParticles />

      {/* Top Navbar */}
      <Navbar
        bestieName={bestieName}
        setBestieName={setBestieName}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenCurtains={() => setIsCurtainsOpen(false)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. 🧿 Evil Eye Protection Shrine & Hero Greeting */}
        <HeroProtectionSection bestieName={bestieName} />

        {/* Decorative Divider */}
        <div className="max-w-4xl mx-auto px-4 my-4">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#0369A1]/30 to-transparent" />
        </div>

        {/* 2. 🗺️ Bestie Friendship Roadmap & Cosmic Lucky Charm Wheel */}
        <BestieRoadmapSection bestieName={bestieName} />

        {/* Decorative Divider */}
        <div className="max-w-4xl mx-auto px-4 my-4">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#0369A1]/30 to-transparent" />
        </div>

        {/* 3. 🎂 Birthday Cake, Flickering Candles & Wishing Ceremony */}
        <BirthdayCakeSection bestieName={bestieName} />

        {/* Decorative Divider */}
        <div className="max-w-4xl mx-auto px-4 my-4">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#0369A1]/30 to-transparent" />
        </div>

        {/* 4. 🎁 Interactive Surprise Gift Boxes & Golden VIP Passbook */}
        <SurpriseGiftSection bestieName={bestieName} />

        {/* Decorative Divider */}
        <div className="max-w-4xl mx-auto px-4 my-4">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#0369A1]/30 to-transparent" />
        </div>

        {/* 5. 🎨 Interactive Drawing Studio & Card Creator */}
        <DrawingStudioSection
          bestieName={bestieName}
          onPinDrawing={handlePinDrawing}
        />

        {/* Decorative Divider */}
        <div className="max-w-4xl mx-auto px-4 my-4">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#0369A1]/30 to-transparent" />
        </div>

        {/* 6. 📸 Polaroid Photo Scrapbook & Pinned Art Wall */}
        <PhotoScrapbookSection
          bestieName={bestieName}
          pinnedDrawings={pinnedDrawings}
        />

        {/* Decorative Divider */}
        <div className="max-w-4xl mx-auto px-4 my-4">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#0369A1]/30 to-transparent" />
        </div>

        {/* 7. ✨ AI Bestie Birthday Studio (Gemini 3.7 Flash) */}
        <AiBirthdayStudio bestieName={bestieName} />

        {/* Decorative Divider */}
        <div className="max-w-4xl mx-auto px-4 my-4">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#0369A1]/30 to-transparent" />
        </div>

        {/* 8. 💙 100 Reasons Why You're the World's Greatest Bestie */}
        <BestieReasonsSection bestieName={bestieName} />
      </main>

      {/* Floating Bottom-Right Lo-Fi Music Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={toggleLofiMusic}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border-3 border-[#0369A1] shadow-[4px_4px_0px_#0369A1] hover:shadow-[6px_6px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
            isLofiPlaying
              ? 'bg-[#0EA5E9] text-white ring-4 ring-[#38BDF8]/40'
              : 'bg-white text-[#0369A1] hover:bg-[#E0F2FE]'
          }`}
          title="Toggle Lo-Fi Birthday Beats"
          id="floating-bottom-lofi-btn"
        >
          <Disc
            className={`w-5 h-5 text-[#FDE047] ${
              isLofiPlaying ? 'animate-spin' : ''
            }`}
          />

          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-black tracking-wider opacity-80 leading-none">
              Audio API Synth
            </span>
            <span className="text-xs font-black leading-tight">
              {isLofiPlaying ? 'Lo-Fi Birthday Beats 🎶' : 'Play Lo-Fi Music 🎵'}
            </span>
          </div>

          {isLofiPlaying ? (
            <div className="flex items-end gap-0.5 h-4 w-4 ml-1">
              <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-full" />
              <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_300ms] h-3/5" />
              <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_200ms] h-4/5" />
            </div>
          ) : (
            <Play className="w-3.5 h-3.5 fill-current text-[#0EA5E9] ml-1" />
          )}
        </button>
      </div>

      {/* Grand Finale Footer (Vibrant Palette Theme) */}
      <footer className="relative z-10 border-t-3 border-[#0369A1] bg-[#F0F9FF] py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#BAE6FD] border-3 border-[#0369A1] shadow-[4px_4px_0px_#0369A1] flex items-center justify-center text-3xl mx-auto animate-bounce">
            🧿
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-[#0369A1] tracking-tight">
            Here's to Your Best Year Yet, {bestieName}! 💙🩵
          </h3>

          <p className="text-[#075985] text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed">
            Protected from every negative vibe by the sacred Nazar charm 🧿. Filled with laughter, health, endless prosperity, and unforgettable memories.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playCurtainOpen();
                setIsCurtainsOpen(false);
              }}
              className="px-5 py-3.5 rounded-2xl bg-white hover:bg-[#BAE6FD] text-[#0369A1] font-black text-sm border-3 border-[#0369A1] shadow-[4px_4px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Replay Entrance Curtains 🎭</span>
            </button>

            <button
              onClick={() => {
                sound.playPartyFanfare();
                fireFireworks();
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-sm border-3 border-[#0369A1] shadow-[4px_4px_0px_#0369A1] hover:shadow-[6px_6px_0px_#0369A1] transition-all active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
              id="grand-finale-fireworks-btn"
            >
              <Sparkles className="w-4 h-4 text-[#FDE047]" />
              <span>Launch Grand Finale Fireworks! 🎆</span>
            </button>
          </div>

          <div className="pt-8 border-t-2 border-[#0369A1]/20 text-xs text-[#0284C7] font-black flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#0369A1] rounded-full" />
            <span>Fully Working Bestie Link Activated</span>
            <span className="text-sm">🧿 💙 🩵 🧿</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

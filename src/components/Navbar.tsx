import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Music, Edit3, Check, Disc, Play, Pause } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireBirthdayConfetti } from '../utils/confetti';

interface NavbarProps {
  bestieName: string;
  setBestieName: (name: string) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onOpenCurtains: () => void;
}

export default function Navbar({
  bestieName,
  setBestieName,
  activeSection,
  setActiveSection,
  onOpenCurtains,
}: NavbarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(bestieName);

  useEffect(() => {
    // Keep state in sync with audio engine
    setIsPlayingLofi(sound.getIsLofiPlaying());
  }, []);

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setMuted(nextState);
    if (nextState) setIsPlayingLofi(false);
  };

  const handleLofiToggle = () => {
    sound.playPop();
    sound.toggleLofiMusic((playing) => {
      setIsPlayingLofi(playing);
    });
  };

  const handleConfetti = () => {
    sound.playPartyFanfare();
    fireBirthdayConfetti();
  };

  const saveName = () => {
    if (tempName.trim()) {
      setBestieName(tempName.trim());
    }
    setIsEditingName(false);
    sound.playSparkle();
  };

  const navItems = [
    { id: 'shrine', label: '🧿 Nazar Shrine' },
    { id: 'roadmap', label: '🗺️ Roadmap' },
    { id: 'cake', label: '🎂 Birthday Cake' },
    { id: 'surprises', label: '🎁 Surprises' },
    { id: 'drawing', label: '🎨 Drawing Studio' },
    { id: 'photos', label: '📸 Scrapbook' },
    { id: 'ai-studio', label: '✨ AI Tributes' },
    { id: 'reasons', label: '💙 100 Reasons' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#F0F9FF]/95 border-b-3 border-[#0369A1] text-[#075985] shadow-md shadow-[#0369A1]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 text-left" id="brand-logo-container">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('shrine');
              }}
              className="w-10 h-10 rounded-2xl bg-[#BAE6FD] border-2 border-[#0369A1] flex items-center justify-center shadow-[3px_3px_0px_#0369A1] text-xl hover:rotate-6 transition-transform cursor-pointer"
              title="Scroll to top"
              id="brand-logo-btn"
            >
              🧿
            </button>
            <div>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveSection('shrine');
                }}
                className="flex items-center gap-1.5 font-black text-lg sm:text-xl tracking-tight text-[#0369A1] hover:opacity-90 text-left cursor-pointer leading-tight"
              >
                <span>Happy Birthday</span>
                <span className="text-[#0EA5E9]">Bestie!</span>
              </button>
              <div className="text-[11px] text-[#0284C7] font-bold flex items-center gap-1">
                <span>Celebrating</span>
                {isEditingName ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveName()}
                      className="bg-white text-[#0369A1] text-xs px-2 py-0.5 rounded-lg border-2 border-[#0369A1] font-bold focus:outline-none w-24"
                      autoFocus
                    />
                    <button
                      onClick={saveName}
                      className="p-1 rounded-lg bg-[#0EA5E9] text-white hover:bg-[#0284C7] border border-[#0369A1] cursor-pointer"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditingName(true);
                      setTempName(bestieName);
                    }}
                    className="text-[#0EA5E9] font-black underline decoration-wavy decoration-[#F97316] hover:text-[#0369A1] flex items-center gap-1 cursor-pointer"
                    title="Click to change Bestie's name"
                  >
                    <span>{bestieName}</span>
                    <Edit3 className="w-3 h-3 opacity-80" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Pills (Desktop/Tablet) */}
        <nav className="hidden xl:flex items-center gap-1 bg-white p-1 rounded-full border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1] text-xs font-bold">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playPop();
                setActiveSection(item.id);
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                activeSection === item.id
                  ? 'bg-[#0EA5E9] text-white border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1] font-black'
                  : 'text-[#075985] hover:text-[#0369A1] hover:bg-[#E0F2FE]'
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls & Music Toggle Pill */}
        <div className="flex items-center gap-2">
          {/* Replay Curtains Reveal */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenCurtains();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#BAE6FD] text-[#0369A1] text-xs font-black border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            title="Replay Welcome Curtains"
            id="replay-curtains-nav-btn"
          >
            <span>🎭 Curtains</span>
          </button>

          {/* Floating Lo-Fi Music Toggle */}
          <button
            onClick={handleLofiToggle}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black transition-all border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
              isPlayingLofi
                ? 'bg-[#0EA5E9] text-white ring-2 ring-[#38BDF8]'
                : 'bg-white text-[#0369A1] hover:bg-[#E0F2FE]'
            }`}
            title="Toggle Upbeat Lo-Fi Birthday BGM"
            id="floating-lofi-music-toggle"
          >
            {/* Spinning Vinyl Disc / Play Icon */}
            <Disc
              className={`w-4 h-4 text-[#FDE047] ${
                isPlayingLofi ? 'animate-spin' : ''
              }`}
            />

            {/* Equalizer Visualizer Bars */}
            {isPlayingLofi ? (
              <div className="flex items-end gap-0.5 h-3.5 w-4">
                <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-full" />
                <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_300ms] h-2/3" />
                <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_200ms] h-4/5" />
              </div>
            ) : (
              <Play className="w-3 h-3 fill-current text-[#0EA5E9]" />
            )}

            <span>{isPlayingLofi ? 'Lo-Fi Beats 🎶' : 'Play Lo-Fi 🎵'}</span>
          </button>

          {/* Confetti Cannon */}
          <button
            onClick={handleConfetti}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-black border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            id="party-confetti-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            <span className="hidden sm:inline">Party! 🎊</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-white text-[#0369A1] hover:bg-[#E0F2FE] border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
            id="sound-mute-btn"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-[#0369A1]" />}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Scroll */}
      <div className="xl:hidden flex items-center gap-1 px-3 pb-2 overflow-x-auto no-scrollbar border-t border-[#0369A1]/20 pt-1 text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              sound.playPop();
              setActiveSection(item.id);
              const el = document.getElementById(item.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold transition-all ${
              activeSection === item.id
                ? 'bg-[#0EA5E9] text-white border border-[#0369A1] shadow-sm font-black'
                : 'text-[#075985] hover:bg-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}

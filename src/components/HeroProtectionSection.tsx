import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, RefreshCw, Star, Heart, Flame } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireEvilEyeBlueBurst, fireBirthdayConfetti } from '../utils/confetti';

interface HeroProtectionProps {
  bestieName: string;
}

const PROTECTION_BLESSINGS = [
  {
    title: "🧿 Ultimate Nazar Energy Shield",
    desc: "All fake vibes, petty drama, and negative energy are instantly reflected into cosmic dust! Only unconditional love, pure laughter, and sparkling opportunities can enter your aura this year!",
  },
  {
    title: "🩵 Infinite Glow-Up & Manifestation Blessing",
    desc: "May every goal you whisper to the stars manifest twice as fast. Your skin will glow, your bank account will smile, and your confidence will be at an all-time high!",
  },
  {
    title: "💙 The Ride-or-Die Bestie Protection Bond",
    desc: "Guaranteed 24/7 telepathic understanding, 3 AM emergency life pep talks, and unconditional hype whenever you walk into any room. You are never alone!",
  },
  {
    title: "✨ Cosmic Prosperity & Unstoppable Luck",
    desc: "The universe aligns to bring you spontaneous road trips, serendipitous wins, delicious birthday treats, and unforgettable memories for every month of your new year!",
  },
];

export default function HeroProtectionSection({ bestieName }: HeroProtectionProps) {
  const [tapsCount, setTapsCount] = useState(108);
  const [activeBlessingIndex, setActiveBlessingIndex] = useState(0);
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const eyeRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for realistic Evil Eye pupil movement
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!eyeRef.current) return;
    const rect = eyeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    const maxOffset = 18;
    setMousePos({
      x: Math.max(-maxOffset, Math.min(maxOffset, deltaX * maxOffset)),
      y: Math.max(-maxOffset, Math.min(maxOffset, deltaY * maxOffset)),
    });
  };

  const handleEyeClick = (e: MouseEvent<HTMLDivElement>) => {
    sound.playEvilEyeProtection();
    setTapsCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (rect.left + rect.width / 2) / window.innerWidth;
    const clickY = (rect.top + rect.height / 2) / window.innerHeight;
    fireEvilEyeBlueBurst(clickX, clickY);

    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((prev) => [...prev.slice(-4), newRipple]);
  };

  const triggerShieldRitual = () => {
    sound.playSparkle();
    sound.playPartyFanfare();
    setIsShieldActive(true);
    fireBirthdayConfetti();
    setActiveBlessingIndex((prev) => (prev + 1) % PROTECTION_BLESSINGS.length);
    setTimeout(() => {
      setIsShieldActive(false);
    }, 3500);
  };

  return (
    <section
      id="shrine"
      onMouseMove={handleMouseMove}
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden bg-[#E0F2FE] text-[#075985]"
    >
      {/* Background Decorative Nazar & Heart Watermarks from Vibrant Palette */}
      <div className="absolute top-6 right-8 text-5xl opacity-40 select-none pointer-events-none">🧿</div>
      <div className="absolute bottom-10 left-6 text-5xl opacity-40 rotate-12 select-none pointer-events-none">🧿</div>
      <div className="absolute top-1/2 right-10 text-6xl opacity-30 select-none pointer-events-none">🩵</div>
      <div className="absolute top-20 left-8 text-4xl opacity-30 -rotate-12 select-none pointer-events-none">💙</div>

      {/* Badge Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border-2 border-[#0369A1] text-[#0284C7] text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#0369A1] mb-5"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
        <span>Today is all about you! • Sacred Nazar Ward 🧿</span>
        <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
      </motion.div>

      {/* Main Title Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-[#0369A1] mb-3"
      >
        HAPPY BIRTHDAY <br />
        <span className="text-[#0EA5E9] inline-flex items-center gap-2">
          <span>{bestieName.toUpperCase()}!</span>
          <span className="text-4xl sm:text-6xl inline-block animate-bounce">🎂</span>
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[#075985] max-w-2xl text-base sm:text-lg mb-8 font-medium leading-relaxed"
      >
        To my absolute favorite human, soulmate, and partner in crime.
        Keeping away all the bad vibes 🧿 and filling your brand new year with infinite sunshine, laughing fits, and golden luck!
      </motion.p>

      {/* Interactive 3D Evil Eye Talisman */}
      <div className="relative my-2 select-none">
        {/* Ripple Wave effects */}
        {ripples.map((rip) => (
          <motion.div
            key={rip.id}
            initial={{ scale: 0.8, opacity: 0.9 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-4 border-[#0EA5E9] pointer-events-none"
          />
        ))}

        {/* Ambient Ring / Pop Outer Border */}
        <div
          className={`w-64 h-64 sm:w-72 sm:h-72 rounded-full p-3 bg-white border-4 border-[#0369A1] shadow-[8px_8px_0px_#0369A1] transition-transform duration-200 cursor-pointer ${
            isShieldActive ? 'scale-105 ring-8 ring-[#38BDF8] animate-pulse' : 'hover:scale-105'
          }`}
          onClick={handleEyeClick}
          ref={eyeRef}
          title="Click to activate 🧿 protection blessing & burst confetti!"
          id="interactive-evil-eye-shrine"
        >
          {/* Outer Deep Royal Blue Ring */}
          <div className="w-full h-full rounded-full bg-[#0369A1] border-2 border-white p-6 sm:p-7 flex items-center justify-center shadow-inner relative overflow-hidden">
            {/* Shimmer Glass Reflection */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/30 rounded-full blur-sm pointer-events-none" />

            {/* Middle Pure White Enamel Ring */}
            <div className="w-full h-full rounded-full bg-white p-5 sm:p-6 flex items-center justify-center shadow-md relative">
              {/* Turquoise / Sky Blue Iris */}
              <div className="w-full h-full rounded-full bg-[#0EA5E9] border border-[#0369A1] p-4 sm:p-5 flex items-center justify-center shadow-inner relative">
                {/* Iris texture ring */}
                <div className="absolute inset-2 rounded-full border border-white/60 opacity-80" />

                {/* Deep Onyx Pupil that tracks mouse */}
                <motion.div
                  animate={{
                    x: mousePos.x,
                    y: mousePos.y,
                  }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0f172a] border border-[#0369A1] flex items-center justify-center relative shadow-lg"
                >
                  {/* Specular Highlight Dot */}
                  <div className="absolute top-2 left-2.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  <div className="absolute bottom-2.5 right-3 w-1.5 h-1.5 rounded-full bg-white/80" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Tap Counter Pill */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="px-4 py-1.5 rounded-full bg-white border-2 border-[#0369A1] text-xs text-[#0369A1] font-black shadow-[2px_2px_0px_#0369A1]">
            🧿 Blessings Sealed: <strong className="text-[#0EA5E9] font-black">{tapsCount}</strong>
          </span>
          <span className="text-xs text-[#0369A1] font-bold italic">
            (Tap eye to charge energy!)
          </span>
        </div>
      </div>

      {/* Ritual Shield Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 z-10">
        <button
          onClick={triggerShieldRitual}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-sm sm:text-base border-3 border-[#0369A1] shadow-[4px_4px_0px_#0369A1] hover:shadow-[6px_6px_0px_#0369A1] transition-all active:translate-x-0.5 active:translate-y-0.5"
          id="activate-ward-shield-btn"
        >
          <Shield className="w-5 h-5 fill-current text-white" />
          <span>Cast 🧿 Nazar Protection Ward</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveBlessingIndex((prev) => (prev + 1) % PROTECTION_BLESSINGS.length);
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-[#F0F9FF] text-[#0369A1] font-black text-sm border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] transition-all active:translate-x-0.5 active:translate-y-0.5"
          id="next-blessing-btn"
        >
          <RefreshCw className="w-4 h-4 text-[#0EA5E9]" />
          <span>Next Blessing</span>
        </button>
      </div>

      {/* Active Protection Blessing Card (Vibrant Pop Style) */}
      <div className="mt-8 max-w-xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBlessingIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-[2rem] bg-white border-4 border-[#0369A1] shadow-[8px_8px_0px_#0369A1] text-left relative overflow-hidden rotate-[-1deg]"
          >
            <div className="absolute top-2 right-3 p-2 opacity-20 text-5xl select-none">
              🧿
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-xl bg-[#BAE6FD] border border-[#0369A1] text-[#0369A1]">
                <Star className="w-4 h-4 fill-current text-[#0369A1]" />
              </span>
              <h3 className="font-black text-[#0369A1] text-lg sm:text-xl">
                {PROTECTION_BLESSINGS[activeBlessingIndex].title}
              </h3>
            </div>
            <p className="text-[#075985] text-sm sm:text-base leading-relaxed font-medium">
              {PROTECTION_BLESSINGS[activeBlessingIndex].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bestie Stats & Badges Grid (Inspired by Vibrant Palette Stats block) */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
        {[
          { icon: '🧿', title: 'Bad Vibe Shield', stat: '100% Guarded', text: 'Zero negative drama allowed' },
          { icon: '📞', title: 'Late Night Calls', stat: '4,821+ Hrs', text: '3AM philosophy & laughter' },
          { icon: '🍕', title: 'Food & Snack Runs', stat: '92 Pizza Nights', text: 'Extra fries always ordered' },
          { icon: '⭐', title: 'Bestie Rating', stat: '10/10 Perfect', text: 'Undefeated partnership' },
        ].map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              sound.playSparkle();
              fireEvilEyeBlueBurst();
            }}
            className="p-4 rounded-2xl bg-[#F0F9FF] hover:bg-white border-3 border-[#0369A1] shadow-[4px_4px_0px_#0369A1] text-center transition-all cursor-pointer group active:translate-x-0.5 active:translate-y-0.5"
          >
            <div className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-150">
              {item.icon}
            </div>
            <p className="text-xs uppercase font-black text-[#0284C7] tracking-wider">{item.title}</p>
            <h4 className="font-black text-sm text-[#0369A1] mt-0.5">{item.stat}</h4>
            <p className="text-[11px] text-[#075985] font-medium leading-tight mt-0.5">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

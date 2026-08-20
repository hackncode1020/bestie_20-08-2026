import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Trophy, Star, Gift, Check, Flame } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireBirthdayConfetti, fireEvilEyeBlueBurst, fireFireworks } from '../utils/confetti';

interface RoadmapProps {
  bestieName: string;
}

interface Milestone {
  id: number;
  year: string;
  badge: string;
  title: string;
  desc: string;
  emoji: string;
  status: 'completed' | 'unlocked';
}

const getMilestones = (bestieName: string): Milestone[] => [
  {
    id: 1,
    year: 'Chapter 1',
    badge: 'DAY 1 DESTINY',
    title: 'The Spark of Infinite Chaos',
    desc: 'The exact moment our paths crossed and we immediately bonded over random humor and zero filter.',
    emoji: '✨',
    status: 'completed',
  },
  {
    id: 2,
    year: 'Chapter 2',
    badge: 'UNBREAKABLE BOND',
    title: 'Late Night Pep Talks & Food Runs',
    desc: 'Countless drives, blasting favorite tracks, solving life crises at 3 AM, and always picking each other up.',
    emoji: '🍕',
    status: 'completed',
  },
  {
    id: 3,
    year: 'Chapter 3',
    badge: 'NAZAR SHIELD 🧿',
    title: 'Warding Off Bad Energy Together',
    desc: 'Becoming each other’s ultimate bodyguard against drama, doubts, and negativity. Pure loyalty.',
    emoji: '🧿',
    status: 'completed',
  },
  {
    id: 4,
    year: 'Chapter 4 (TODAY)',
    badge: 'ROYAL BIRTHDAY 👑',
    title: `${bestieName}'s Golden New Era`,
    desc: 'Stepping into a year of wild success, glowing aura, effortless happiness, and endless adventures!',
    emoji: '🎂',
    status: 'unlocked',
  },
];

const CHARM_PRIZES = [
  { text: '🧿 100% Negative Vibes Shielded for 365 Days!', color: 'bg-[#0EA5E9]' },
  { text: '✈️ Spontaneous Beach or Mountain Road Trip Guaranteed!', color: 'bg-[#0284C7]' },
  { text: '🍕 Lifetime Supply of Bestie Snack Deliveries!', color: 'bg-[#0369A1]' },
  { text: '👑 Main Character Royalty Status Everywhere You Go!', color: 'bg-[#F59E0B]' },
  { text: '💎 Wish Granted from the Cosmic Nazar Vault!', color: 'bg-[#10B981]' },
];

export default function BestieRoadmapSection({ bestieName }: RoadmapProps) {
  const [activePrize, setActivePrize] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  const spinLuckyWheel = () => {
    if (isSpinning) return;
    sound.playSparkle();
    setIsSpinning(true);
    setActivePrize(null);

    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const prizeIndex = Math.floor(Math.random() * CHARM_PRIZES.length);
    const targetDeg = wheelRotation + extraSpins * 360 + prizeIndex * 72;

    setWheelRotation(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setActivePrize(CHARM_PRIZES[prizeIndex].text);
      sound.playPartyFanfare();
      fireBirthdayConfetti();
      fireFireworks();
    }, 2400);
  };

  return (
    <section id="roadmap" className="py-16 px-4 max-w-6xl mx-auto text-center relative">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border-2 border-[#0369A1] text-[#0284C7] text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#0369A1] mb-3">
        <Compass className="w-3.5 h-3.5 text-[#0EA5E9]" />
        <span>🗺️ Friendship Roadmap & Lucky Charm Wheel</span>
      </div>
      <h2 className="text-4xl sm:text-6xl font-black text-[#0369A1] tracking-tight mb-2">
        Our Epic Journey & Destiny 🧿
      </h2>
      <p className="text-[#075985] max-w-xl mx-auto text-sm sm:text-base mb-12 font-medium">
        From our humble beginning to today's glorious birthday celebration with {bestieName}!
      </p>

      {/* 4-Step Milestone Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left mb-16 relative">
        {getMilestones(bestieName).map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col justify-between relative ${
              m.status === 'unlocked'
                ? 'bg-[#0EA5E9] text-white border-[#0369A1] shadow-[8px_8px_0px_#0369A1] rotate-[1deg]'
                : 'bg-white text-[#075985] border-[#0369A1] shadow-[6px_6px_0px_#0369A1] rotate-[-1deg]'
            }`}
          >
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    m.status === 'unlocked'
                      ? 'bg-white text-[#0369A1] border-white'
                      : 'bg-[#F0F9FF] text-[#0284C7] border-[#0369A1]/30'
                  }`}
                >
                  {m.badge}
                </span>
                <span className="text-2xl">{m.emoji}</span>
              </div>
              <h4
                className={`font-black text-lg sm:text-xl tracking-tight mb-2 ${
                  m.status === 'unlocked' ? 'text-white' : 'text-[#0369A1]'
                }`}
              >
                {m.title}
              </h4>
              <p
                className={`text-xs sm:text-sm font-medium leading-relaxed ${
                  m.status === 'unlocked' ? 'text-white/90' : 'text-[#075985]'
                }`}
              >
                {m.desc}
              </p>
            </div>

            {/* Footer status */}
            <div
              className={`mt-4 pt-3 border-t-2 flex items-center justify-between text-xs font-black ${
                m.status === 'unlocked'
                  ? 'border-white/30 text-white'
                  : 'border-[#0369A1]/10 text-[#0284C7]'
              }`}
            >
              <span>{m.year}</span>
              <span>{m.status === 'unlocked' ? '🔥 Active Celebration' : '✓ Accomplished'}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lucky Birthday Nazar Charm Spin Wheel */}
      <div className="max-w-xl mx-auto p-8 rounded-[2.5rem] bg-white border-4 border-[#0369A1] shadow-[8px_8px_0px_#0369A1] text-center">
        <div className="flex items-center justify-center gap-2 text-2xl mb-1">
          <span>🧿</span>
          <span className="text-xl font-black text-[#0369A1]">COSMIC LUCKY WHEEL</span>
          <span>🩵</span>
        </div>
        <p className="text-xs text-[#075985] font-medium mb-6">
          Spin to unlock a special birthday blessing from the universe for {bestieName}:
        </p>

        {/* Wheel Graphic */}
        <div className="relative w-56 h-56 mx-auto mb-6 flex items-center justify-center select-none">
          {/* Arrow indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-3xl text-[#F97316] drop-shadow">
            ▼
          </div>

          <motion.div
            animate={{ rotate: wheelRotation }}
            transition={{ duration: 2.4, ease: 'easeOut' }}
            className="w-full h-full rounded-full border-4 border-[#0369A1] bg-gradient-to-tr from-[#BAE6FD] via-[#38BDF8] to-[#0284C7] shadow-xl relative overflow-hidden flex items-center justify-center p-2"
          >
            {/* Center Hub */}
            <div className="w-16 h-16 rounded-full bg-white border-3 border-[#0369A1] shadow-md flex items-center justify-center text-2xl z-10">
              🧿
            </div>

            {/* Spokes text */}
            <div className="absolute top-2 text-xs font-black text-[#0369A1]">LUCK 🌟</div>
            <div className="absolute bottom-2 text-xs font-black text-white">LOVE 💙</div>
            <div className="absolute left-2 text-xs font-black text-[#0369A1]">FUN 🎉</div>
            <div className="absolute right-2 text-xs font-black text-white">TRIPS ✈️</div>
          </motion.div>
        </div>

        {/* Spin Trigger Button */}
        <button
          onClick={spinLuckyWheel}
          disabled={isSpinning}
          className="px-8 py-3.5 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-sm sm:text-base border-3 border-[#0369A1] shadow-[4px_4px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
          id="spin-lucky-wheel-btn"
        >
          {isSpinning ? '🌀 Spinning the Cosmic Wheel...' : 'SPIN FOR BIRTHDAY LUCK! 🎰'}
        </button>

        {/* Prize Reveal Modal / Box */}
        <AnimatePresence>
          {activePrize && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="mt-6 p-4 rounded-2xl bg-[#F0F9FF] border-3 border-[#0369A1] shadow-inner text-center"
            >
              <span className="text-xs uppercase font-black text-[#0284C7]">
                🎉 YOUR BIRTHDAY BLESSING UNLOCKED!
              </span>
              <p className="text-base font-black text-[#0369A1] mt-1">{activePrize}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

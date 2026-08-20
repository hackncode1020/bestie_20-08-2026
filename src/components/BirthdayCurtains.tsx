import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Crown, Play } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireBirthdayConfetti, fireFireworks, fireEvilEyeBlueBurst } from '../utils/confetti';

interface BirthdayCurtainsProps {
  bestieName: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function BirthdayCurtains({
  bestieName,
  isOpen,
  onOpen,
  onClose,
}: BirthdayCurtainsProps) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleOpenCurtains = () => {
    sound.playCurtainOpen();
    sound.playPartyFanfare();
    sound.startLofiMusic();
    fireBirthdayConfetti();
    fireFireworks();
    fireEvilEyeBlueBurst();
    setHasInteracted(true);
    onOpen();
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 1.2, duration: 0.6 } }}
            className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center select-none bg-[#0369A1]"
          >
            {/* Top Theatrical Valance Pelmet with Golden Scallops */}
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: '-100%', transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } }}
              className="absolute top-0 left-0 right-0 z-40 h-28 sm:h-36 bg-gradient-to-b from-[#075985] to-[#0369A1] border-b-4 border-[#FBBF24] shadow-2xl flex items-center justify-between px-8"
            >
              {/* Scalloped Gold Fabric Drape Details */}
              <div className="w-full flex justify-around items-end h-full pb-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-16 sm:w-28 h-12 rounded-b-full bg-gradient-to-b from-[#0284C7] to-[#0369A1] border-b-3 border-x-2 border-[#FDE047] shadow-lg flex items-center justify-center text-lg sm:text-xl"
                  >
                    {i % 2 === 0 ? '🧿' : '🩵'}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Left Velvet Curtain Panel */}
            <motion.div
              initial={{ x: 0, scaleX: 1 }}
              exit={{
                x: '-105%',
                scaleX: 0.2,
                originX: 0,
                transition: { duration: 1.3, ease: [0.77, 0, 0.175, 1] },
              }}
              className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#0EA5E9] shadow-[15px_0px_35px_rgba(0,0,0,0.4)] border-r-4 border-[#FBBF24] flex items-center justify-end pr-4 sm:pr-10 z-30"
            >
              {/* Vertical Fold pleats & rich fabric texture */}
              <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,#075985_0px,#075985_30px,#38BDF8_60px,#0369A1_90px)] pointer-events-none" />

              {/* Left Golden Tassel Rope & Charm */}
              <div className="relative z-10 hidden sm:flex flex-col items-center">
                <div className="w-4 h-28 bg-gradient-to-b from-[#FDE047] to-[#F59E0B] rounded-full border-2 border-white shadow-lg" />
                <div className="w-12 h-12 rounded-full bg-[#BAE6FD] border-3 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] flex items-center justify-center text-2xl -mt-2 animate-bounce">
                  🧿
                </div>
              </div>
            </motion.div>

            {/* Right Velvet Curtain Panel */}
            <motion.div
              initial={{ x: 0, scaleX: 1 }}
              exit={{
                x: '105%',
                scaleX: 0.2,
                originX: 1,
                transition: { duration: 1.3, ease: [0.77, 0, 0.175, 1] },
              }}
              className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#0369A1] via-[#0284C7] to-[#0EA5E9] shadow-[-15px_0px_35px_rgba(0,0,0,0.4)] border-l-4 border-[#FBBF24] flex items-center justify-start pl-4 sm:pl-10 z-30"
            >
              {/* Vertical Fold pleats */}
              <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,#0369A1_0px,#38BDF8_30px,#075985_60px,#075985_90px)] pointer-events-none" />

              {/* Right Golden Tassel Rope & Charm */}
              <div className="relative z-10 hidden sm:flex flex-col items-center">
                <div className="w-4 h-28 bg-gradient-to-b from-[#FDE047] to-[#F59E0B] rounded-full border-2 border-white shadow-lg" />
                <div className="w-12 h-12 rounded-full bg-[#BAE6FD] border-3 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] flex items-center justify-center text-2xl -mt-2 animate-bounce">
                  💙
                </div>
              </div>
            </motion.div>

            {/* Center Golden Invitation Seal & Opening Trigger */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.2, opacity: 0, transition: { duration: 0.6 } }}
              className="relative z-40 max-w-lg mx-4 p-8 sm:p-10 rounded-[3rem] bg-white border-4 border-[#0369A1] shadow-[12px_12px_0px_#0369A1] text-center"
            >
              {/* Floating Charms */}
              <div className="flex items-center justify-center gap-3 text-4xl mb-3">
                <span>🧿</span>
                <span className="animate-pulse">👑</span>
                <span>🩵</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#E0F2FE] border-2 border-[#0369A1] text-[#0284C7] text-xs font-black uppercase tracking-widest mb-3">
                <Crown className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>EXCLUSIVE ROYAL ACCESS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-[#0369A1] tracking-tight mb-2 leading-tight">
                A Birthday Surprise <br />
                <span className="text-[#0EA5E9]">For {bestieName}!</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#075985] font-medium max-w-sm mx-auto mb-8 leading-relaxed">
                Step inside your VIP celebration sanctuary! Protected by 🧿 Nazar charms, packed with memories, music, cake, and love.
              </p>

              {/* Big Interactive "Pull Curtains" Button */}
              <button
                onClick={handleOpenCurtains}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-black text-base sm:text-lg border-3 border-[#0369A1] shadow-[5px_5px_0px_#0369A1] hover:shadow-[7px_7px_0px_#0369A1] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer group"
                id="pull-curtains-btn"
              >
                <Play className="w-5 h-5 fill-current text-[#FDE047] group-hover:scale-125 transition-transform" />
                <span>PULL OPEN CURTAINS 🎭</span>
                <Sparkles className="w-5 h-5 text-[#FDE047]" />
              </button>

              <div className="mt-4 text-[11px] font-bold text-[#0284C7] flex items-center justify-center gap-2">
                <span>🔊 Turns on Lo-Fi Birthday Beats</span>
                <span>•</span>
                <span>Confetti Blast 🎊</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, Wind, RotateCcw, Utensils, Send, Star, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireBirthdayConfetti, fireFireworks, fireEvilEyeBlueBurst } from '../utils/confetti';

interface BirthdayCakeProps {
  bestieName: string;
}

export default function BirthdayCakeSection({ bestieName }: BirthdayCakeProps) {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);
  const [wishText, setWishText] = useState('');
  const [wishesList, setWishesList] = useState<string[]>([
    "Endless travel, peace, and unbreakable laughter 🧿",
  ]);
  const [cakeCut, setCakeCut] = useState(false);

  const toggleSingleCandle = (index: number) => {
    sound.playPop();
    const updated = [...candlesLit];
    updated[index] = !updated[index];
    setCandlesLit(updated);

    if (updated.every((lit) => !lit)) {
      triggerWishCelebration();
    }
  };

  const blowAllCandles = () => {
    sound.playPop();
    fireEvilEyeBlueBurst();
    setCandlesLit([false, false, false, false, false]);
    setTimeout(() => {
      triggerWishCelebration();
    }, 400);
  };

  const triggerWishCelebration = () => {
    setIsBlownOut(true);
    sound.playPartyFanfare();
    fireBirthdayConfetti();
    fireFireworks();
    setShowWishModal(true);
  };

  const relightCandles = () => {
    sound.playSparkle();
    setCandlesLit([true, true, true, true, true]);
    setIsBlownOut(false);
    setCakeCut(false);
  };

  const submitWish = (e: FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    sound.playSparkle();
    fireBirthdayConfetti();
    setWishesList((prev) => [wishText.trim(), ...prev]);
    setWishText('');
    setShowWishModal(false);
  };

  const cutCake = () => {
    sound.playSparkle();
    sound.playPop();
    fireBirthdayConfetti();
    setCakeCut(true);
  };

  return (
    <section id="cake" className="py-16 px-4 max-w-5xl mx-auto text-center relative">
      {/* Badge Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border-2 border-[#0369A1] text-[#0284C7] text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#0369A1] mb-3">
        <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
        <span>🎂 The Grand Candle Ceremony</span>
      </div>

      <h2 className="text-4xl sm:text-6xl font-black text-[#0369A1] tracking-tight mb-2">
        Make a Wish, {bestieName}! 🩵
      </h2>
      <p className="text-[#075985] max-w-xl mx-auto text-sm sm:text-base mb-10 font-medium">
        Click individual candles or tap "Blow Out Candles" to make your deepest dreams come true!
      </p>

      {/* Main Cake Stage Card (Vibrant Palette Pop style) */}
      <div className="relative max-w-xl mx-auto p-8 rounded-[2.5rem] bg-white border-4 border-[#0369A1] shadow-[8px_8px_0px_#0369A1] mb-10 overflow-hidden">
        {/* Decorative corner charms */}
        <div className="absolute top-4 left-4 text-2xl select-none">🧿</div>
        <div className="absolute top-4 right-4 text-2xl select-none">💙</div>

        {/* Cake Container Area */}
        <div className="relative pt-6 pb-4 flex flex-col items-center justify-center">
          {/* Candles Row */}
          <div className="flex items-end justify-center gap-4 sm:gap-7 mb-2 z-20">
            {candlesLit.map((lit, idx) => (
              <div
                key={idx}
                onClick={() => toggleSingleCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title="Click candle to extinguish / ignite"
              >
                {/* Flame */}
                <div className="h-9 flex items-center justify-center">
                  <AnimatePresence>
                    {lit ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                          scale: [1, 1.25, 0.95, 1.15, 1],
                          rotate: [-3, 3, -2, 2, 0],
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 0.9 }}
                        className="w-5 h-7 rounded-full bg-gradient-to-t from-[#F97316] via-[#FBBF24] to-[#FEF08A] shadow-[0_0_15px_#F59E0B] border border-white/60"
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0.8, y: 0 }}
                        animate={{ opacity: 0, y: -16 }}
                        transition={{ duration: 1 }}
                        className="text-xs text-slate-400 font-bold"
                      >
                        💨
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Stick */}
                <div
                  className={`w-3.5 h-12 rounded-t-md border-2 border-[#0369A1] shadow-sm transition-all ${
                    idx % 2 === 0
                      ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7]'
                      : 'bg-gradient-to-b from-[#BAE6FD] to-[#38BDF8]'
                  }`}
                >
                  <div className="w-full h-1.5 bg-white/60 my-1.5" />
                  <div className="w-full h-1.5 bg-white/60 my-1.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Tier 1 (Top Tier) */}
          <div className="w-44 sm:w-56 h-14 rounded-t-3xl bg-gradient-to-r from-[#BAE6FD] via-white to-[#BAE6FD] border-3 border-[#0369A1] relative flex items-center justify-center shadow-md">
            {/* Frosting drips */}
            <div className="absolute -bottom-1 left-0 right-0 flex justify-around text-[#0EA5E9] text-xs select-none">
              <span>🩵</span>
              <span>🧿</span>
              <span>🩵</span>
              <span>🧿</span>
              <span>🩵</span>
            </div>
            <span className="text-xs font-black text-[#0369A1] tracking-wider uppercase">
              {bestieName}'s Tier
            </span>
          </div>

          {/* Tier 2 (Middle Tier) */}
          <div className="w-64 sm:w-80 h-16 rounded-t-3xl bg-gradient-to-r from-[#38BDF8] via-[#7DD3FC] to-[#38BDF8] border-3 border-[#0369A1] relative flex items-center justify-center shadow-md -mt-1">
            <div className="absolute top-2 left-0 right-0 flex justify-evenly text-xs opacity-90">
              <span>✨</span>
              <span>🎂</span>
              <span>🧿</span>
              <span>💙</span>
              <span>✨</span>
            </div>
            <span className="text-sm font-black text-white drop-shadow-sm uppercase tracking-widest mt-3">
              Happy Birthday!
            </span>
          </div>

          {/* Tier 3 (Bottom Big Tier) */}
          <div className="w-80 sm:w-96 h-20 rounded-t-3xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#0284C7] border-3 border-[#0369A1] relative flex items-center justify-center shadow-lg -mt-1">
            {cakeCut && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 bg-white/90 rounded-t-3xl flex items-center justify-center gap-2 border-2 border-dashed border-[#0369A1]"
              >
                <span className="text-2xl">🍰</span>
                <span className="text-xs font-black text-[#0369A1]">
                  Delicious slice served for {bestieName}! 😋
                </span>
              </motion.div>
            )}
            <div className="flex items-center gap-3 text-white font-black text-xs sm:text-sm">
              <span>🧿</span>
              <span>Protected Forever • Pure Joy & Happiness</span>
              <span>🧿</span>
            </div>
          </div>

          {/* Cake Stand Base */}
          <div className="w-96 sm:w-[26rem] h-6 rounded-b-3xl bg-white border-3 border-[#0369A1] shadow-[4px_4px_0px_#0369A1] flex items-center justify-center">
            <div className="w-24 h-2 bg-[#0369A1] rounded-full" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={blowAllCandles}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-sm border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            id="blow-candles-btn"
          >
            <Wind className="w-4 h-4" />
            <span>Blow Out Candles 💨</span>
          </button>

          <button
            onClick={cutCake}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-[#F0F9FF] text-[#0369A1] font-black text-sm border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            id="cut-cake-btn"
          >
            <Utensils className="w-4 h-4 text-[#0EA5E9]" />
            <span>Cut the Cake 🍰</span>
          </button>

          <button
            onClick={relightCandles}
            className="p-2.5 rounded-2xl bg-white hover:bg-[#F0F9FF] text-[#0369A1] font-black border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            title="Relight Candles"
            id="relight-candles-btn"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Saved Wishes Wall */}
      {wishesList.length > 0 && (
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-white border-3 border-[#0369A1] shadow-[6px_6px_0px_#0369A1] text-left">
          <div className="flex items-center justify-between mb-3 border-b-2 border-[#0369A1]/20 pb-2">
            <span className="text-xs font-black uppercase text-[#0369A1] flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current text-[#F59E0B]" />
              <span>{bestieName}'s Birthday Wishes Vault</span>
            </span>
            <button
              onClick={() => setShowWishModal(true)}
              className="text-xs font-black text-[#0EA5E9] hover:underline"
            >
              + Add Wish
            </button>
          </div>
          <div className="space-y-2">
            {wishesList.map((wish, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs font-bold text-[#075985] bg-[#F0F9FF] p-2.5 rounded-xl border border-[#0369A1]/30"
              >
                <span className="text-sm">🧿</span>
                <span className="flex-1">{wish}</span>
                <CheckCircle className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Make a Wish Pop-Up Modal */}
      <AnimatePresence>
        {showWishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0369A1]/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white border-4 border-[#0369A1] rounded-3xl p-6 shadow-[10px_10px_0px_#0369A1] text-left relative overflow-hidden"
            >
              <div className="text-center mb-4">
                <span className="text-4xl inline-block mb-1">🌟</span>
                <h3 className="text-2xl font-black text-[#0369A1]">Candles Blown Out!</h3>
                <p className="text-xs text-[#075985] font-medium">
                  Type your birthday wish to seal it into the cosmic Nazar vault 🧿:
                </p>
              </div>

              <form onSubmit={submitWish} className="space-y-3">
                <textarea
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="e.g. May this year bring endless adventures, boundless laughter, and dreams realized!"
                  className="w-full h-24 bg-[#F0F9FF] border-2 border-[#0369A1] text-[#0369A1] font-bold rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] placeholder-[#0284C7]/50 resize-none"
                  autoFocus
                  required
                />

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWishModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#075985] hover:bg-[#E0F2FE]"
                  >
                    Skip for now
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1]"
                  >
                    <Send className="w-3 h-3" />
                    <span>Seal Wish 🧿</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

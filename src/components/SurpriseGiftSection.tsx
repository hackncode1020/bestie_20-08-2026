import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Award, Ticket, Heart, Volume2, X } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireBirthdayConfetti, fireFireworks, fireEvilEyeBlueBurst } from '../utils/confetti';

interface SurpriseGiftProps {
  bestieName: string;
}

interface GiftItem {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  icon: string;
  boxColor: string;
  ribbonColor: string;
  isOpened: boolean;
}

export default function SurpriseGiftSection({ bestieName }: SurpriseGiftProps) {
  const [gifts, setGifts] = useState<GiftItem[]>([
    {
      id: 1,
      title: "VIP Bestie Passbook",
      subtitle: "Lifetime Redeemable Coupons",
      tag: "PRESENT #1 🎟️",
      icon: "🎫",
      boxColor: "bg-[#0EA5E9]",
      ribbonColor: "bg-white",
      isOpened: false,
    },
    {
      id: 2,
      title: "Hall of Fame Trophy",
      subtitle: "Official #1 Best Friend Cert",
      tag: "PRESENT #2 🏆",
      icon: "👑",
      boxColor: "bg-[#0284C7]",
      ribbonColor: "bg-[#FDE047]",
      isOpened: false,
    },
    {
      id: 3,
      title: "Celebration Soundboard",
      subtitle: "Zero-Latency Sound Effects",
      tag: "PRESENT #3 🔊",
      icon: "🎉",
      boxColor: "bg-[#0369A1]",
      ribbonColor: "bg-[#38BDF8]",
      isOpened: false,
    },
    {
      id: 4,
      title: "Wax-Sealed Time Capsule",
      subtitle: "A Secret Heartfelt Letter",
      tag: "PRESENT #4 💌",
      icon: "🧿",
      boxColor: "bg-[#0284C7]",
      ribbonColor: "bg-white",
      isOpened: false,
    },
  ]);

  const [activeModalGift, setActiveModalGift] = useState<number | null>(null);

  // VIP Coupons State
  const [coupons, setCoupons] = useState([
    { id: 'c1', title: '1x Free Late-Night Food Run', desc: 'Any hour, anywhere. Fries & dessert on me!', used: false },
    { id: 'c2', title: '1x Complete Drama Free Pass', desc: 'You choose the movie, restaurant, and playlist all day.', used: false },
    { id: 'c3', title: '1x 24/7 Emergency Pep Talk', desc: 'Unlimited venting with zero judgment & maximum hype.', used: false },
    { id: 'c4', title: '1x Spontaneous Road Trip', desc: 'Gas tank full, snacks packed, aux cord ready!', used: false },
  ]);

  const openGift = (id: number) => {
    sound.playPop();
    sound.playPartyFanfare();
    fireBirthdayConfetti();
    fireFireworks();

    setGifts((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isOpened: true } : g))
    );
    setActiveModalGift(id);
  };

  const redeemCoupon = (id: string) => {
    sound.playSparkle();
    fireEvilEyeBlueBurst();
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, used: true } : c))
    );
  };

  return (
    <section id="surprises" className="py-16 px-4 max-w-6xl mx-auto text-center relative">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border-2 border-[#0369A1] text-[#0284C7] text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#0369A1] mb-3">
        <Gift className="w-3.5 h-3.5 text-[#0EA5E9]" />
        <span>🎁 Mystery Surprises & Goodies</span>
      </div>
      <h2 className="text-4xl sm:text-6xl font-black text-[#0369A1] tracking-tight mb-2">
        Unwrap Your Gifts, {bestieName}! 🧿
      </h2>
      <p className="text-[#075985] max-w-xl mx-auto text-sm sm:text-base mb-10 font-medium">
        Tap the wrapped surprise boxes to untie the ribbons and claim your birthday gifts!
      </p>

      {/* Main Surprise Box Hero Banner from Vibrant Palette */}
      <div className="mb-10 p-6 sm:p-8 rounded-[3rem] bg-[#0EA5E9] border-4 border-[#0369A1] shadow-[8px_8px_0px_#0369A1] text-white text-center">
        <h3 className="text-3xl font-black mb-6 tracking-tight flex items-center justify-center gap-2">
          <span>SURPRISE BOXES! 🎁</span>
          <span className="text-xl bg-white/20 px-3 py-1 rounded-full border border-white/40">🧿 💙 🩵</span>
        </h3>

        {/* 4 Interactive Gift Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {gifts.map((gift) => (
            <motion.div
              key={gift.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openGift(gift.id)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-3xl border-2 border-white/60 shadow-lg cursor-pointer transition-all flex flex-col justify-between min-h-[190px]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white text-[#0369A1] px-2.5 py-0.5 rounded-full border border-white">
                    {gift.tag}
                  </span>
                  <span className="text-2xl">{gift.icon}</span>
                </div>
                <h4 className="font-black text-white text-base mt-2">
                  {gift.title}
                </h4>
                <p className="text-white/80 text-xs font-medium mt-1">
                  {gift.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <span className="font-bold">
                  {gift.isOpened ? '✓ Claimed' : '🎁 Tap to Open'}
                </span>
                <span className="text-lg">🧿</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Modal Pop-Up Dialog for Claimed Gifts */}
      <AnimatePresence>
        {activeModalGift !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0369A1]/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="w-full max-w-lg bg-white border-4 border-[#0369A1] rounded-[2.5rem] p-6 sm:p-8 shadow-[10px_10px_0px_#0369A1] text-left relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModalGift(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0369A1] border-2 border-[#0369A1] transition-all"
                id="close-surprise-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Gift 1: VIP Friendship Coupon Passbook */}
              {activeModalGift === 1 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket className="w-6 h-6 text-[#0EA5E9]" />
                    <h3 className="text-2xl font-black text-[#0369A1]">
                      VIP Bestie Coupons 🎟️
                    </h3>
                  </div>
                  <p className="text-xs text-[#075985] font-medium mb-4">
                    Exclusive lifetime vouchers for {bestieName}! Click "Redeem" whenever you wish:
                  </p>

                  <div className="space-y-3">
                    {coupons.map((c) => (
                      <div
                        key={c.id}
                        className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                          c.used
                            ? 'bg-slate-100 border-slate-300 opacity-60'
                            : 'bg-[#F0F9FF] border-[#0369A1] shadow-[2px_2px_0px_#0369A1]'
                        }`}
                      >
                        <div>
                          <h4 className="font-black text-sm text-[#0369A1]">{c.title}</h4>
                          <p className="text-xs text-[#075985] font-medium">{c.desc}</p>
                        </div>
                        <button
                          onClick={() => redeemCoupon(c.id)}
                          disabled={c.used}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 border-2 transition-all ${
                            c.used
                              ? 'bg-slate-200 border-slate-300 text-slate-500'
                              : 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white border-[#0369A1] shadow-[2px_2px_0px_#0369A1]'
                          }`}
                        >
                          {c.used ? 'Redeemed ✓' : 'Redeem 🧿'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gift 2: Bestie Hall of Fame Certificate */}
              {activeModalGift === 2 && (
                <div className="text-center p-4 bg-[#F0F9FF] rounded-3xl border-3 border-[#0369A1] shadow-inner">
                  <div className="text-4xl mb-2">🏆</div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#0284C7] bg-white px-3 py-1 rounded-full border border-[#0369A1]">
                    OFFICIAL CERTIFICATE OF EXCELLENCE
                  </span>
                  <h3 className="text-2xl font-black text-[#0369A1] mt-3">
                    BEST FRIEND OF THE CENTURY
                  </h3>
                  <p className="text-sm font-bold text-[#0EA5E9] mt-1">
                    Awarded with Honor to: <strong>{bestieName}</strong> 🧿💙
                  </p>
                  <p className="text-xs text-[#075985] leading-relaxed mt-3 font-medium px-4">
                    For undefeated humor, unwavering loyalty, elite music curation, and always making every moment 1000x brighter.
                  </p>
                  <div className="mt-4 pt-3 border-t-2 border-[#0369A1]/20 flex justify-between items-center text-xs font-black text-[#0369A1]">
                    <span>Seal of Authenticity 🧿</span>
                    <span className="text-[#0EA5E9]">Valid for Infinity ♾️</span>
                  </div>
                </div>
              )}

              {/* Gift 3: Interactive Soundboard */}
              {activeModalGift === 3 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="w-6 h-6 text-[#0EA5E9]" />
                    <h3 className="text-2xl font-black text-[#0369A1]">
                      Celebration Soundboard 🔊
                    </h3>
                  </div>
                  <p className="text-xs text-[#075985] font-medium mb-4">
                    Tap any pad to fire instant synthesized celebration sound effects:
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: '🎉 Party Horn', action: () => { sound.playPartyFanfare(); fireBirthdayConfetti(); } },
                      { label: '🧿 Nazar Shield', action: () => { sound.playEvilEyeProtection(); fireEvilEyeBlueBurst(); } },
                      { label: '✨ Sparkle Magic', action: () => { sound.playSparkle(); fireBirthdayConfetti(); } },
                      { label: '🎂 Happy Song Chimes', action: () => { sound.toggleBirthdayTune(); } },
                    ].map((pad, i) => (
                      <button
                        key={i}
                        onClick={pad.action}
                        className="p-4 rounded-2xl bg-[#F0F9FF] hover:bg-[#BAE6FD] border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] text-xs font-black text-[#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center"
                      >
                        {pad.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gift 4: Wax-Sealed Secret Letter */}
              {activeModalGift === 4 && (
                <div className="p-5 rounded-3xl bg-[#F0F9FF] border-3 border-[#0369A1] relative">
                  <div className="flex items-center justify-between border-b-2 border-[#0369A1]/20 pb-2 mb-3">
                    <span className="font-black text-xs uppercase text-[#0369A1]">
                      From: Your #1 Bestie 💙
                    </span>
                    <span className="text-sm">🧿</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#075985] leading-relaxed font-medium italic">
                    "Dearest {bestieName},<br/><br/>
                    I want to remind you how deeply special and loved you are. Thank you for being the person who knows all my secrets and still likes me anyway. You are the sunshine in my life. Let's make this year our most adventurous and protected chapter yet!"
                  </p>
                  <p className="text-right font-black text-[#0369A1] text-xs mt-3">
                    — Love, Your BFF Forever 💙🩵
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

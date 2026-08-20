import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Plus, Star } from 'lucide-react';
import { BestieReason } from '../types';
import { sound } from '../utils/audio';
import { fireBirthdayConfetti, fireEvilEyeBlueBurst } from '../utils/confetti';

interface BestieReasonsProps {
  bestieName: string;
}

const INITIAL_REASONS: BestieReason[] = [
  {
    id: 'reason-1',
    title: 'Telepathic Eye Contact',
    emoji: '🧿',
    description: 'We can look at each other across a crowded room and have an entire 15-minute conversation without speaking a single word.',
    isRevealed: true,
    category: 'iconic',
  },
  {
    id: 'reason-2',
    title: 'Zero Judgment Zone',
    emoji: '💙',
    description: 'I can confess the most embarrassing, unhinged things to you and you just laugh and say "same honestly".',
    isRevealed: true,
    category: 'heartfelt',
  },
  {
    id: 'reason-3',
    title: 'The Ultimate Car DJ',
    emoji: '🎶',
    description: 'Your aux cord curation is undefeated. Every road trip feels like our own private arena concert tour.',
    isRevealed: false,
    category: 'iconic',
  },
  {
    id: 'reason-4',
    title: 'Hype Person of the Century',
    emoji: '👑',
    description: 'Whenever I doubt myself, you boost my confidence from 0 to 1,000,000 in two seconds.',
    isRevealed: false,
    category: 'heartfelt',
  },
  {
    id: 'reason-5',
    title: 'Unmatched 3AM Wisdom',
    emoji: '🩵',
    description: 'Our deep late-night philosophy sessions have solved 99% of all life problems and personal crises.',
    isRevealed: false,
    category: 'unhinged',
  },
  {
    id: 'reason-6',
    title: 'Shared Braincell Moments',
    emoji: '🧠',
    description: 'Blurting out the exact same word, sentence, or meme at the exact identical microsecond.',
    isRevealed: false,
    category: 'unhinged',
  },
  {
    id: 'reason-7',
    title: 'Food Partner for Life',
    emoji: '🍕',
    description: 'Never asking "are you hungry?" because the answer is always yes, and ordering extra fries is non-negotiable.',
    isRevealed: false,
    category: 'iconic',
  },
  {
    id: 'reason-8',
    title: 'My Eternal Safe Harbor',
    emoji: '🧿',
    description: 'No matter how chaotic the world gets, hanging out with you instantly recharges my entire soul with peace and laughter.',
    isRevealed: false,
    category: 'heartfelt',
  },
];

export default function BestieReasonsSection({ bestieName }: BestieReasonsProps) {
  const [reasons, setReasons] = useState<BestieReason[]>(INITIAL_REASONS);
  const [filter, setFilter] = useState<'all' | 'iconic' | 'heartfelt' | 'unhinged'>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleReveal = (id: string) => {
    sound.playPop();
    setReasons((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          if (!r.isRevealed) fireEvilEyeBlueBurst();
          return { ...r, isRevealed: !r.isRevealed };
        }
        return r;
      })
    );
  };

  const revealAll = () => {
    sound.playSparkle();
    fireBirthdayConfetti();
    setReasons((prev) => prev.map((r) => ({ ...r, isRevealed: true })));
  };

  const handleAddReason = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    sound.playSparkle();
    fireBirthdayConfetti();

    const created: BestieReason = {
      id: `custom-reason-${Date.now()}`,
      title: newTitle.trim(),
      emoji: '🧿',
      description: newDesc.trim(),
      isRevealed: true,
      category: 'heartfelt',
    };

    setReasons((prev) => [created, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  return (
    <section id="reasons" className="py-16 px-4 max-w-6xl mx-auto text-center relative">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border-2 border-[#0369A1] text-[#0284C7] text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#0369A1] mb-3">
        <Heart className="w-3.5 h-3.5 fill-current text-[#0EA5E9]" />
        <span>💙 Why You're The GOAT</span>
      </div>
      <h2 className="text-4xl sm:text-6xl font-black text-[#0369A1] tracking-tight mb-2">
        Reasons Why You're the Best Bestie 🧿
      </h2>
      <p className="text-[#075985] max-w-xl mx-auto text-sm sm:text-base mb-8 font-medium">
        Tap the cards to flip and reveal the truth about why {bestieName} is 1 of 1 in this universe!
      </p>

      {/* Filter and Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white border-3 border-[#0369A1] p-4 rounded-2xl shadow-[4px_4px_0px_#0369A1]">
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          {['all', 'iconic', 'heartfelt', 'unhinged'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playPop();
                setFilter(cat as any);
              }}
              className={`px-3.5 py-1.5 rounded-xl capitalize font-black transition-all ${
                filter === cat
                  ? 'bg-[#0EA5E9] text-white border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1]'
                  : 'bg-[#F0F9FF] text-[#0369A1] border border-[#0369A1]/30 hover:bg-[#BAE6FD]'
              }`}
            >
              {cat === 'all' ? 'All Reasons' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={revealAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F0F9FF] hover:bg-[#BAE6FD] border-2 border-[#0369A1] text-[#0369A1] text-xs font-black shadow-[2px_2px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>Reveal All ✨</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setShowAddForm(!showAddForm);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs font-black border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Reason ✍️</span>
          </button>
        </div>
      </div>

      {/* Add Custom Reason Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 rounded-3xl bg-white border-4 border-[#0369A1] text-left max-w-xl mx-auto shadow-[8px_8px_0px_#0369A1]"
          >
            <h3 className="font-black text-[#0369A1] text-base mb-3 flex items-center gap-2">
              <span>Write a Custom Reason for {bestieName}</span>
              <span>🧿💙</span>
            </h3>
            <form onSubmit={handleAddReason} className="space-y-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Reason title (e.g. Always knowing what to order, best hugs...)"
                className="w-full bg-[#F0F9FF] border-2 border-[#0369A1] text-[#0369A1] font-bold rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                required
              />
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Elaborate on why this makes them the greatest best friend..."
                className="w-full h-20 bg-[#F0F9FF] border-2 border-[#0369A1] text-[#0369A1] font-bold rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] resize-none"
                required
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-black text-[#075985] hover:bg-[#E0F2FE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1]"
                >
                  Save Reason 🧿
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reasons
          .filter((r) => (filter === 'all' ? true : r.category === filter))
          .map((reason, idx) => (
            <motion.div
              key={reason.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleReveal(reason.id)}
              className="cursor-pointer select-none"
            >
              <div
                className={`p-6 rounded-3xl border-3 transition-all min-h-[220px] flex flex-col justify-between text-left relative overflow-hidden ${
                  reason.isRevealed
                    ? 'bg-white border-[#0369A1] shadow-[6px_6px_0px_#0369A1]'
                    : 'bg-[#F0F9FF] border-[#0369A1] hover:bg-[#BAE6FD]/40 shadow-[4px_4px_0px_#0369A1]'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{reason.emoji}</span>
                  <span className="text-[10px] uppercase font-black text-[#0284C7] bg-[#E0F2FE] px-2.5 py-0.5 rounded-full border border-[#0369A1]/30">
                    #{idx + 1} {reason.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="my-3">
                  <h3 className="font-black text-[#0369A1] text-base tracking-tight mb-1.5">
                    {reason.title}
                  </h3>

                  {reason.isRevealed ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[#075985] text-xs font-medium leading-relaxed"
                    >
                      {reason.description}
                    </motion.p>
                  ) : (
                    <div className="py-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#BAE6FD] text-[#0369A1] text-xs font-black border border-[#0369A1] shadow-sm animate-pulse">
                        🧿 Tap to Reveal!
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer status */}
                <div className="pt-2 border-t-2 border-[#0369A1]/10 flex items-center justify-between text-[11px] text-[#0284C7] font-bold">
                  <span>Protected by 🧿</span>
                  <span>{reason.isRevealed ? '✓ Revealed' : '🔒 Locked'}</span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}

import { useState, type MouseEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Heart, Plus, Trash2 } from 'lucide-react';
import { BestiePhoto, PinnedDrawing } from '../types';
import { sound } from '../utils/audio';
import { fireEvilEyeBlueBurst } from '../utils/confetti';

interface PhotoScrapbookProps {
  bestieName: string;
  pinnedDrawings: PinnedDrawing[];
}

const DEFAULT_PHOTOS: BestiePhoto[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    title: 'Beach Day & Golden Laughter 🏖️',
    date: 'Summer Highlights',
    caption: 'Laughing until our stomachs hurt over the most random inside joke ever!',
    rotation: -2,
    likes: 42,
    tags: ['Trips', 'Iconic'],
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    title: 'Partners in Crime 💙',
    date: '3 AM Chaos',
    caption: 'Spontaneous late night drive, blast music, and zero regrets. Ride-or-die forever!',
    rotation: 2,
    likes: 58,
    tags: ['Late Night', 'Chaos'],
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    title: 'Iconic Birthday Glam 👑',
    date: 'Forever Friends',
    caption: 'Serving looks, radiant aura, and main character energy everywhere we go. Stay protected 🧿',
    rotation: -1,
    likes: 89,
    tags: ['Glam', 'Bestie'],
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    title: 'Concert & Music Vibes 🎶',
    date: 'Festival Season',
    caption: 'Screaming the lyrics at the top of our lungs until our voices were completely gone!',
    rotation: 1.5,
    likes: 64,
    tags: ['Trips', 'Music'],
  },
];

export default function PhotoScrapbookSection({
  bestieName,
  pinnedDrawings,
}: PhotoScrapbookProps) {
  const [photos, setPhotos] = useState<BestiePhoto[]>(DEFAULT_PHOTOS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);

  const handleLike = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    sound.playSparkle();
    fireEvilEyeBlueBurst();
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    sound.playSparkle();
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newPhoto: BestiePhoto = {
        id: `user-photo-${Date.now()}`,
        url: reader.result as string,
        title: `Memory with ${bestieName} 🩵`,
        date: 'Special Moment',
        caption: 'Added fresh from our gallery of adventures!',
        rotation: Math.floor(Math.random() * 4) - 2,
        likes: 1,
        tags: ['Custom Upload'],
      };
      setPhotos((prev) => [newPhoto, ...prev]);
    };
    reader.readAsDataURL(file);
  };

  const deletePhoto = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    sound.playPop();
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section id="photos" className="py-16 px-4 max-w-7xl mx-auto text-center relative">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border-2 border-[#0369A1] text-[#0284C7] text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#0369A1] mb-3">
        <Camera className="w-3.5 h-3.5 text-[#0EA5E9]" />
        <span>📸 Memory Scrapbook & Gallery</span>
      </div>
      <h2 className="text-4xl sm:text-6xl font-black text-[#0369A1] tracking-tight mb-2">
        Timeless Memories with {bestieName} 🧿💙
      </h2>
      <p className="text-[#075985] max-w-xl mx-auto text-sm sm:text-base mb-8 font-medium">
        A Polaroid scrapbook of our greatest triumphs, funniest moments, and custom birthday card doodles!
      </p>

      {/* Filter and Upload Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 bg-white border-3 border-[#0369A1] p-4 rounded-2xl shadow-[4px_4px_0px_#0369A1]">
        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {['all', 'Trips', 'Chaos', 'Doodles'].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                sound.playPop();
                setActiveFilter(filter);
              }}
              className={`px-3 py-1.5 rounded-xl capitalize font-black transition-all ${
                activeFilter === filter
                  ? 'bg-[#0EA5E9] text-white border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1]'
                  : 'bg-[#F0F9FF] text-[#0369A1] border border-[#0369A1]/30 hover:bg-[#BAE6FD]'
              }`}
            >
              {filter === 'all' ? 'All Memories' : filter}
            </button>
          ))}
        </div>

        {/* Upload Custom Bestie Photo */}
        <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs sm:text-sm cursor-pointer border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] transition-all active:translate-x-0.5 active:translate-y-0.5">
          <Plus className="w-4 h-4" />
          <span>Upload Bestie Photo 📸</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Polaroid Grid Layout with Vibrant Palette Neo-Brutalist Frame */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Render Pinned Drawings first */}
        {pinnedDrawings.map((draw) => (
          <motion.div
            key={draw.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            style={{ transform: `rotate(1.5deg)` }}
            className="bg-white p-4 border-4 border-[#0369A1] rounded-[2rem] shadow-[8px_8px_0px_#0369A1] text-left relative flex flex-col justify-between group"
          >
            {/* Washi tape pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#BAE6FD] -rotate-2 rounded-sm border-2 border-[#0369A1] shadow-sm" />
            <div className="absolute top-2 right-2 text-xl select-none">🧿</div>

            <div className="rounded-2xl overflow-hidden bg-[#7DD3FC] border-2 border-[#0369A1] aspect-square flex items-center justify-center p-2 mb-3 shadow-inner">
              <img
                src={draw.dataUrl}
                alt={draw.caption}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <span className="text-[10px] uppercase font-black text-[#0284C7] tracking-wider bg-[#F0F9FF] px-2 py-0.5 rounded-full border border-[#0369A1]/30">
                Handmade Doodle 🎨
              </span>
              <h4 className="font-black text-[#0369A1] text-sm mt-1">{draw.caption}</h4>
              <div className="flex items-center justify-between text-xs text-[#075985] mt-2 pt-2 border-t border-[#0369A1]/20 font-bold">
                <span>By {draw.author}</span>
                <span className="text-[#0EA5E9]">🧿 #1 Bestie</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Regular Photos */}
        {photos
          .filter((p) =>
            activeFilter === 'all'
              ? true
              : activeFilter === 'Doodles'
              ? false
              : p.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
          )
          .map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{ transform: `rotate(${photo.rotation}deg)` }}
              onClick={() => setActiveLightbox(photo.url)}
              className="bg-white p-4 pb-5 rounded-[2rem] border-4 border-[#0369A1] shadow-[8px_8px_0px_#0369A1] text-left relative flex flex-col justify-between group cursor-pointer transition-transform"
            >
              {/* Top Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#BAE6FD] rotate-1 rounded-sm border-2 border-[#0369A1] shadow-sm" />

              {/* Photo Image Frame */}
              <div className="rounded-2xl overflow-hidden bg-[#7DD3FC] border-2 border-[#0369A1] aspect-square mb-3 relative shadow-inner">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Floating 🧿 Badge */}
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 border border-[#0369A1] flex items-center justify-center text-sm shadow">
                  🧿
                </div>
              </div>

              {/* Caption & Metadata */}
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-[#0369A1] text-base tracking-tight">
                    {photo.title}
                  </h4>
                  <span className="text-[10px] font-black text-[#0284C7] bg-[#F0F9FF] border border-[#0369A1]/30 px-2 py-0.5 rounded-full">
                    {photo.date}
                  </span>
                </div>
                <p className="text-[#075985] text-xs mt-1 font-medium italic leading-relaxed">
                  "{photo.caption}"
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t-2 border-[#0369A1]/10">
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="flex items-center gap-1.5 text-xs font-black text-[#0369A1] bg-[#F0F9FF] hover:bg-[#BAE6FD] border border-[#0369A1] px-3 py-1 rounded-full shadow-[2px_2px_0px_#0369A1] transition-all active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-[#0EA5E9]" />
                    <span>{photo.likes} 💙</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#0284C7] font-bold">
                      🧿 Protected
                    </span>
                    <button
                      onClick={(e) => deletePhoto(photo.id, e)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-full"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0369A1]/60 backdrop-blur-md cursor-pointer"
            onClick={() => setActiveLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="max-w-3xl max-h-[85vh] rounded-[2.5rem] overflow-hidden border-4 border-[#0369A1] shadow-[10px_10px_0px_#0369A1] relative bg-white p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeLightbox}
                alt="Full memory"
                className="w-full h-full object-contain max-h-[75vh] rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-5 right-5 bg-white text-[#0369A1] border-2 border-[#0369A1] font-black rounded-full p-2 hover:bg-[#E0F2FE]"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

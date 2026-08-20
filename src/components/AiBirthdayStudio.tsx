import { useState } from 'react';
import { Bot, Sparkles, Copy, Check, Music, Shield, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireBirthdayConfetti, fireEvilEyeBlueBurst } from '../utils/confetti';

interface AiBirthdayStudioProps {
  bestieName: string;
}

export default function AiBirthdayStudio({ bestieName }: AiBirthdayStudioProps) {
  const [activeTab, setActiveTab] = useState<'tribute' | 'fortune' | 'song'>('tribute');
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Form Inputs
  const [vibe, setVibe] = useState<'heartfelt' | 'funny' | 'hype' | 'poem'>('hype');
  const [memories, setMemories] = useState('');
  const [zodiac, setZodiac] = useState('Cosmic Star');
  const [songGenre, setSongGenre] = useState('Pop Anthem');

  // Generate Tribute
  const generateTribute = async () => {
    setLoading(true);
    sound.playSparkle();
    try {
      const res = await fetch('/api/gemini/generate-tribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bestieName,
          vibe,
          memories: memories || 'Late night laughter, always having my back, elite music taste',
        }),
      });
      const data = await res.json();
      setResultText(data.text || data.fallback || 'Happy Birthday Bestie! 🧿💙');
      sound.playPartyFanfare();
      fireBirthdayConfetti();
    } catch (err) {
      console.error(err);
      setResultText(
        `Happy Birthday to the most iconic best friend, ${bestieName}! 🧿💙 May your year be completely protected from negative vibes and overflow with endless joy!`
      );
    } finally {
      setLoading(false);
    }
  };

  // Generate Fortune
  const generateFortune = async () => {
    setLoading(true);
    sound.playEvilEyeProtection();
    try {
      const res = await fetch('/api/gemini/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bestieName,
          zodiacSign: zodiac,
          dreams: memories || 'Traveling the world, achieving big goals, pure happiness',
        }),
      });
      const data = await res.json();
      setResultText(data.fortune || 'The 🧿 Nazar talisman shields you from all doubt!');
      sound.playSparkle();
      fireEvilEyeBlueBurst();
    } catch (err) {
      console.error(err);
      setResultText(
        `🧿 COSMIC EVIL EYE PROPHECY 🧿\n\nFor ${bestieName}: The stars reveal a phenomenal year ahead! Every ounce of bad energy is repelled into light, bringing you effortless success and love 💙🩵.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Generate Song
  const generateSong = async () => {
    setLoading(true);
    sound.playSparkle();
    try {
      const res = await fetch('/api/gemini/generate-song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bestieName,
          musicGenre: songGenre,
          insideJokes: memories || 'Iconic laugh, always fashionably late, ride or die partner',
        }),
      });
      const data = await res.json();
      setResultText(data.lyrics || 'Happy Birthday to you, Bestie! 🎶🧿');
      sound.playPartyFanfare();
      fireBirthdayConfetti();
    } catch (err) {
      console.error(err);
      setResultText(
        `[Intro] Turn up the sound today! It's ${bestieName}'s birthday! 🧿💙\n[Verse] From 3AM calls to spontaneous fun, you'll always be number one!`
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    sound.playPop();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-studio" className="py-16 px-4 max-w-5xl mx-auto text-center relative">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border-2 border-[#0369A1] text-[#0284C7] text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#0369A1] mb-3">
        <Bot className="w-3.5 h-3.5 text-[#0EA5E9]" />
        <span>✨ AI Bestie Studio</span>
      </div>
      <h2 className="text-4xl sm:text-6xl font-black text-[#0369A1] tracking-tight mb-2">
        Custom Birthday Tributes & Prophecies 🧿
      </h2>
      <p className="text-[#075985] max-w-xl mx-auto text-sm sm:text-base mb-8 font-medium">
        Generate personalized heartfelt messages, rap lyrics, and 🧿 evil eye cosmic fortunes tailored specially for {bestieName}!
      </p>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 max-w-md mx-auto mb-8 bg-white p-1.5 rounded-2xl border-3 border-[#0369A1] shadow-[4px_4px_0px_#0369A1]">
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('tribute');
            setResultText('');
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'tribute'
              ? 'bg-[#0EA5E9] text-white border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1]'
              : 'text-[#075985] hover:bg-[#F0F9FF]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hype & Tribute</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('fortune');
            setResultText('');
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'fortune'
              ? 'bg-[#0EA5E9] text-white border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1]'
              : 'text-[#075985] hover:bg-[#F0F9FF]'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>🧿 Fortune</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('song');
            setResultText('');
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'song'
              ? 'bg-[#0EA5E9] text-white border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1]'
              : 'text-[#075985] hover:bg-[#F0F9FF]'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>Song Lyrics</span>
        </button>
      </div>

      {/* Main Studio Card (Vibrant Palette Pop style) */}
      <div className="bg-white border-4 border-[#0369A1] rounded-[2.5rem] p-6 sm:p-8 shadow-[8px_8px_0px_#0369A1] text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls Form Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[#0369A1] text-lg">
                Configure Birthday Vibe
              </h3>
              <span className="text-xs bg-[#F0F9FF] border border-[#0369A1]/30 text-[#0284C7] px-2.5 py-0.5 rounded-full font-black">
                Gemini 3.7 Flash
              </span>
            </div>

            {/* Tribute Options */}
            {activeTab === 'tribute' && (
              <div>
                <label className="block text-xs font-black text-[#0369A1] mb-1.5">
                  Choose Tribute Tone:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'hype', label: '👑 Main Character Hype' },
                    { id: 'heartfelt', label: '🥹 Emotional Tear-Jerker' },
                    { id: 'funny', label: '😂 Playful Bestie Roast' },
                    { id: 'poem', label: '📜 Rhyming Poem' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setVibe(t.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-black border-2 text-left transition-all ${
                        vibe === t.id
                          ? 'bg-[#BAE6FD] border-[#0369A1] text-[#0369A1] shadow-[2px_2px_0px_#0369A1]'
                          : 'bg-[#F0F9FF] border-[#0369A1]/30 text-[#075985] hover:bg-[#BAE6FD]/40'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fortune Options */}
            {activeTab === 'fortune' && (
              <div>
                <label className="block text-xs font-black text-[#0369A1] mb-1.5">
                  Bestie Zodiac or Energy Vibe:
                </label>
                <select
                  value={zodiac}
                  onChange={(e) => setZodiac(e.target.value)}
                  className="w-full bg-[#F0F9FF] border-2 border-[#0369A1] text-[#0369A1] font-bold rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                >
                  <option value="Aries (Fire / Bold Leader)">♈ Aries (Fire / Bold Leader)</option>
                  <option value="Taurus (Earth / Unshakeable Loyalty)">♉ Taurus (Earth / Unshakeable Loyalty)</option>
                  <option value="Gemini (Air / Chaotic Fun)">♊ Gemini (Air / Chaotic Fun)</option>
                  <option value="Cancer (Water / Pure Golden Heart)">♋ Cancer (Water / Pure Golden Heart)</option>
                  <option value="Leo (Fire / Radiant Royalty)">♌ Leo (Fire / Radiant Royalty)</option>
                  <option value="Virgo (Earth / Elite Mastermind)">♍ Virgo (Earth / Elite Mastermind)</option>
                  <option value="Libra (Air / Iconic Charm)">♎ Libra (Air / Iconic Charm)</option>
                  <option value="Scorpio (Water / Mystic Defender 🧿)">♏ Scorpio (Water / Mystic Defender 🧿)</option>
                  <option value="Sagittarius (Fire / Wild Adventurer)">♐ Sagittarius (Fire / Wild Adventurer)</option>
                  <option value="Capricorn (Earth / Boss Energy)">♑ Capricorn (Earth / Boss Energy)</option>
                  <option value="Aquarius (Air / Free Spirit)">♒ Aquarius (Air / Free Spirit)</option>
                  <option value="Pisces (Water / Dreamer Extraordinaire)">♓ Pisces (Water / Dreamer Extraordinaire)</option>
                </select>
              </div>
            )}

            {/* Song Options */}
            {activeTab === 'song' && (
              <div>
                <label className="block text-xs font-black text-[#0369A1] mb-1.5">
                  Music Genre:
                </label>
                <select
                  value={songGenre}
                  onChange={(e) => setSongGenre(e.target.value)}
                  className="w-full bg-[#F0F9FF] border-2 border-[#0369A1] text-[#0369A1] font-bold rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                >
                  <option value="Pop Anthem (Catchy, Dance, High Energy)">✨ Upbeat Pop Anthem</option>
                  <option value="90s Hip Hop Rap (Punchy rhymes, swagger)">🎤 90s Hip-Hop & Rap</option>
                  <option value="Acoustic Indie (Warm, emotional, sweet)">🎸 Acoustic Indie Folk</option>
                  <option value="Broadway Musical (Dramatic & grand)">🎭 Broadway Musical Showstopper</option>
                </select>
              </div>
            )}

            {/* Memories & Inside jokes */}
            <div>
              <label className="block text-xs font-black text-[#0369A1] mb-1.5">
                Inside Jokes or Memories:
              </label>
              <textarea
                value={memories}
                onChange={(e) => setMemories(e.target.value)}
                placeholder="e.g. Always singing in the car, obsession with iced matcha, unforgettable roadtrip..."
                className="w-full h-24 bg-[#F0F9FF] border-2 border-[#0369A1] text-[#0369A1] font-bold rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] placeholder-[#0284C7]/50 resize-none"
              />
            </div>

            {/* Action Trigger Button */}
            <button
              onClick={() => {
                if (activeTab === 'tribute') generateTribute();
                else if (activeTab === 'fortune') generateFortune();
                else generateSong();
              }}
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-sm border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Channeling Cosmic Vibes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#FDE047]" />
                  <span>
                    {activeTab === 'tribute'
                      ? `Generate Tribute for ${bestieName} ✨`
                      : activeTab === 'fortune'
                      ? `Cast 🧿 Evil Eye Fortune`
                      : `Write Birthday Song 🎶`}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Result Output Column */}
          <div className="flex flex-col justify-between bg-[#F0F9FF] border-3 border-[#0369A1] rounded-2xl p-5 min-h-[300px] shadow-inner">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#0369A1]/20 mb-3">
                <span className="text-xs font-black text-[#0369A1] flex items-center gap-1.5">
                  <span>🧿 Output Preview</span>
                  {resultText && <span className="text-emerald-600 font-bold">● Ready</span>}
                </span>

                {resultText && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-xs text-[#0369A1] hover:bg-white bg-[#BAE6FD] px-2.5 py-1 rounded-lg border border-[#0369A1] font-black transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                )}
              </div>

              {resultText ? (
                <div className="text-[#075985] text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap font-sans max-h-[320px] overflow-y-auto pr-1">
                  {resultText}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center text-[#0284C7]">
                  <span className="text-4xl mb-2">🧿</span>
                  <p className="text-xs font-bold">
                    Choose your vibe and hit generate to create magical birthday words for {bestieName}!
                  </p>
                </div>
              )}
            </div>

            {resultText && (
              <div className="mt-4 pt-3 border-t-2 border-[#0369A1]/20 flex items-center justify-between text-[11px] text-[#0284C7] font-black">
                <span>Protected by the Blue Eye 🧿</span>
                <span className="text-[#0369A1]">Happy Birthday {bestieName}! 💙🩵</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

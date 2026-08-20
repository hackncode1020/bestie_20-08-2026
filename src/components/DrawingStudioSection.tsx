import { useRef, useState, useEffect, type MouseEvent, type TouchEvent } from 'react';
import { motion } from 'motion/react';
import {
  Paintbrush,
  Sparkles,
  Eraser,
  RotateCcw,
  Download,
  Pin,
  Smile,
  Palette,
  Check,
} from 'lucide-react';
import { PinnedDrawing } from '../types';
import { sound } from '../utils/audio';
import { fireBirthdayConfetti, fireEvilEyeBlueBurst } from '../utils/confetti';

interface DrawingStudioProps {
  bestieName: string;
  onPinDrawing: (drawing: PinnedDrawing) => void;
}

type DrawTool = 'pen' | 'glow' | 'eraser' | 'sticker';

const COLOR_PALETTE = [
  '#0284C7', // Ocean Blue
  '#0EA5E9', // Electric Cyan
  '#38BDF8', // Sky Blue
  '#0369A1', // Deep Cerulean
  '#F97316', // Tangerine
  '#FBBF24', // Golden Yellow
  '#10B981', // Emerald Mint
  '#EC4899', // Pink
  '#0F172A', // Dark Slate
  '#FFFFFF', // White
];

const STICKERS = ['🧿', '💙', '🩵', '🎂', '👑', '✨', '🎈', '⭐', '🍕', '🎉'];

export default function DrawingStudioSection({
  bestieName,
  onPinDrawing,
}: DrawingStudioProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<DrawTool>('glow');
  const [color, setColor] = useState<string>('#0284C7');
  const [brushSize, setBrushSize] = useState<number>(8);
  const [selectedSticker, setSelectedSticker] = useState<string>('🧿');
  const [isDrawing, setIsDrawing] = useState(false);
  const [caption, setCaption] = useState(`Happy Birthday ${bestieName}! 🧿💙`);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [canvasBg, setCanvasBg] = useState<'white' | 'sky' | 'dark'>('white');

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution canvas dimensions
    const width = 800;
    const height = 500;
    canvas.width = width;
    canvas.height = height;

    fillCanvasBackground(canvasBg);
    saveState();
  }, [canvasBg]);

  const fillCanvasBackground = (bg: 'white' | 'sky' | 'dark') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (bg === 'white') ctx.fillStyle = '#FFFFFF';
    else if (bg === 'sky') ctx.fillStyle = '#BAE6FD';
    else ctx.fillStyle = '#0369A1';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), imgData]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    sound.playPop();
    const newHist = [...history];
    newHist.pop();
    const prevData = newHist[newHist.length - 1];
    setHistory(newHist);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || !prevData) return;

    ctx.putImageData(prevData, 0, 0);
  };

  const handleClear = () => {
    sound.playPop();
    fillCanvasBackground(canvasBg);
    saveState();
  };

  // Coordinates helper
  const getCoordinates = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * (canvas.width / rect.width),
        y: (touch.clientY - rect.top) * (canvas.height / rect.height),
      };
    }
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    const { x, y } = getCoordinates(e);

    if (tool === 'sticker') {
      sound.playSparkle();
      stampSticker(x, y);
      saveState();
      return;
    }

    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing || tool === 'sticker') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (tool === 'eraser') {
      ctx.shadowBlur = 0;
      ctx.strokeStyle =
        canvasBg === 'white' ? '#FFFFFF' : canvasBg === 'sky' ? '#BAE6FD' : '#0369A1';
    } else if (tool === 'glow') {
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = brushSize * 1.5;
    } else {
      ctx.shadowBlur = 0;
      ctx.strokeStyle = color;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  const stampSticker = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = `${brushSize * 4.5 + 24}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.fillText(selectedSticker, x, y);
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    sound.playSparkle();
    fireBirthdayConfetti();

    const link = document.createElement('a');
    link.download = `Birthday-Card-for-${bestieName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const pinToScrapbook = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    sound.playSparkle();
    sound.playPartyFanfare();
    fireEvilEyeBlueBurst();

    const newDrawing: PinnedDrawing = {
      id: `drawing-${Date.now()}`,
      dataUrl: canvas.toDataURL('image/png'),
      author: 'Bestie Squad',
      caption: caption || `Birthday Card for ${bestieName} 🧿`,
      timestamp: new Date().toLocaleDateString(),
      stickersCount: 1,
    };

    onPinDrawing(newDrawing);
  };

  return (
    <section id="drawing" className="py-16 px-4 max-w-6xl mx-auto text-center">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border-2 border-[#0369A1] text-[#0284C7] text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#0369A1] mb-3">
        <Paintbrush className="w-3.5 h-3.5 text-[#0EA5E9]" />
        <span>🎨 Interactive Drawing & Card Studio</span>
      </div>
      <h2 className="text-4xl sm:text-6xl font-black text-[#0369A1] tracking-tight mb-2">
        Doodle a Birthday Card 🧿
      </h2>
      <p className="text-[#075985] max-w-xl mx-auto text-sm sm:text-base mb-8 font-medium">
        Draw custom art, stamp 🧿 Nazar charms, write a sweet message, and pin it to {bestieName}'s memory wall!
      </p>

      {/* Main Studio Frame (Vibrant Palette Pop style) */}
      <div className="bg-white border-4 border-[#0369A1] rounded-[2.5rem] p-5 sm:p-7 shadow-[8px_8px_0px_#0369A1] text-left">
        {/* Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#0369A1]/20">
          {/* Tool selectors */}
          <div className="flex items-center gap-2">
            {[
              { id: 'glow', label: 'Neon Glow ✨', icon: Sparkles },
              { id: 'pen', label: 'Ink Pen 🖊️', icon: Paintbrush },
              { id: 'sticker', label: 'Stickers 🧿', icon: Smile },
              { id: 'eraser', label: 'Eraser 🧽', icon: Eraser },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  sound.playPop();
                  setTool(t.id as any);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
                  tool === t.id
                    ? 'bg-[#0EA5E9] text-white border-[#0369A1] shadow-[2px_2px_0px_#0369A1]'
                    : 'bg-[#F0F9FF] text-[#0369A1] border-[#0369A1] hover:bg-[#BAE6FD]'
                }`}
              >
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Canvas Background toggle & Undo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = canvasBg === 'white' ? 'sky' : canvasBg === 'sky' ? 'dark' : 'white';
                sound.playPop();
                setCanvasBg(next);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#F0F9FF] border-2 border-[#0369A1] text-[#0369A1] font-black text-xs shadow-[2px_2px_0px_#0369A1]"
              title="Toggle Canvas Theme"
            >
              Canvas: {canvasBg === 'white' ? 'White' : canvasBg === 'sky' ? 'Sky Blue' : 'Royal Blue'}
            </button>

            <button
              onClick={handleUndo}
              className="p-1.5 rounded-xl bg-[#F0F9FF] hover:bg-[#BAE6FD] text-[#0369A1] border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1]"
              title="Undo last stroke"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-600 font-black text-xs"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Secondary Sub-Bar: Colors or Stickers */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-4">
          {tool === 'sticker' ? (
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-xs font-black text-[#0369A1]">Pick Sticker:</span>
              {STICKERS.map((stk) => (
                <button
                  key={stk}
                  onClick={() => {
                    sound.playPop();
                    setSelectedSticker(stk);
                  }}
                  className={`text-xl p-1.5 rounded-xl border-2 transition-all ${
                    selectedSticker === stk
                      ? 'bg-[#BAE6FD] border-[#0369A1] shadow-[2px_2px_0px_#0369A1] scale-110'
                      : 'bg-white border-[#0369A1]/30 hover:border-[#0369A1]'
                  }`}
                >
                  {stk}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-xs font-black text-[#0369A1]">Color:</span>
              {COLOR_PALETTE.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    sound.playPop();
                    setColor(c);
                  }}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    color === c ? 'border-[#0369A1] ring-2 ring-[#0EA5E9] scale-110' : 'border-slate-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Brush Size Slider */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#0369A1]">Size:</span>
            <input
              type="range"
              min="2"
              max="28"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-24 accent-[#0EA5E9]"
            />
            <span className="text-xs font-bold text-[#075985] w-6">{brushSize}px</span>
          </div>
        </div>

        {/* HTML5 Canvas Stage */}
        <div className="relative rounded-2xl overflow-hidden border-3 border-[#0369A1] bg-white shadow-inner flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-auto max-h-[460px] aspect-[16/10] cursor-crosshair touch-none"
          />
        </div>

        {/* Footer Actions & Pin to Scrapbook Wall */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-[#0369A1]/20">
          <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Card caption..."
              className="w-full bg-[#F0F9FF] text-[#0369A1] font-bold text-xs p-2.5 rounded-xl border-2 border-[#0369A1] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadCard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#F0F9FF] text-[#0369A1] font-black text-xs border-2 border-[#0369A1] shadow-[2px_2px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG</span>
            </button>

            <button
              onClick={pinToScrapbook}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs border-2 border-[#0369A1] shadow-[3px_3px_0px_#0369A1] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Pin className="w-3.5 h-3.5" />
              <span>Pin to Memory Wall 📌</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

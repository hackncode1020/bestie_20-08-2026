import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Birthday Tribute / Message Generator
  app.post("/api/gemini/generate-tribute", async (req, res) => {
    try {
      const { bestieName, vibe, memories, tone } = req.body;
      const ai = getAIClient();

      if (!ai) {
        // High quality fallback if no API key is set yet
        const defaultMessages: Record<string, string> = {
          heartfelt: `Happy Birthday to my absolute favorite human, ${bestieName || "Bestie"}! 💙🩵 From all our late-night chaos to unspoken telepathic glances, you make this world a trillion times brighter. May you stay protected from all negative energy 🧿 and blessed with boundless happiness!`,
          funny: `Happy Birthday ${bestieName || "Bestie"}! 🧿 Another year hotter, wiser, and still tolerating my nonsense. I promise not to tell anyone how weird you truly are... as long as you share your birthday cake with me! 💙🎂`,
          hype: `HAPPY BIRTHDAY TO THE ICON, THE LEGEND, THE MAIN CHARACTER: ${bestieName || "BESTIE"}! 🩵👑 Turn the music up, throw the confetti, and let everyone know that royalty was born today! 🧿✨`,
          poem: `To my dearest friend, my ride or die,
Under every starlit sky.
Through every storm and sunny weather,
We face this crazy life together.
Happy Birthday, my shining light 🧿💙,
May all your days be sweet and bright!`
        };
        const selected = defaultMessages[vibe || "heartfelt"] || defaultMessages.heartfelt;
        return res.json({ text: selected, source: "crafted-local" });
      }

      const prompt = `Write a personalized, creative, and memorable birthday message for a best friend named "${bestieName || "Bestie"}".
Vibe/Style requested: "${vibe || "heartfelt"}" (e.g. funny roast & hype, deeply emotional & poetic, chaotic best friend energy, cute rhyming poem).
Special traits or memories to reference: "${memories || "Being partners in crime, late night laughs, endless support, deep talks"}".
Include protective evil eye emoji 🧿, blue hearts 💙🩵, and celebration vibes.
Keep it authentic, punchy, warm, and deeply personal. Keep length between 2 to 4 engaging paragraphs or a poetic verse.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the ultimate bestie birthday message creator. You write lively, heartfelt, humorous, and culturally trendy birthday tributes full of warmth, genuine camaraderie, and 🧿💙🩵 energy.",
        },
      });

      return res.json({ text: response.text || "Happy Birthday Bestie! 🧿💙", source: "gemini" });
    } catch (error: any) {
      console.error("Gemini Tribute Error:", error);
      res.status(500).json({
        error: "Failed to generate tribute",
        fallback: "Happy Birthday to the most amazing bestie ever! 🧿💙 May your year be filled with immense joy, endless laughter, and boundless blessings!"
      });
    }
  });

  // AI Fortune & Crystal Ball Predictor 🧿
  app.post("/api/gemini/fortune", async (req, res) => {
    try {
      const { bestieName, zodiacSign, dreams } = req.body;
      const ai = getAIClient();

      if (!ai) {
        return res.json({
          fortune: `🧿 THE EVIL EYE SHIELD PROPHECY 🧿\n\nFor ${bestieName || "Bestie"}: The stars and the mystical Nazar talisman reveal a monumental year ahead! 🩵 You will attract unexpected financial blessings, unforgettable spontaneous road trips, and an aura so magnetic that every door opens smoothly. All negative vibes are instantly repelled! 🧿✨`,
          luckyNumber: Math.floor(Math.random() * 88) + 7,
          powerVibe: "Radiant & Unstoppable 💙",
          source: "crafted-local"
        });
      }

      const prompt = `Generate a mystical, fun, and empowering Birthday Cosmic Fortune & Evil Eye Blessing 🧿 for ${bestieName || "my bestie"}.
Zodiac/Vibe: "${zodiacSign || "Cosmic Queen"}".
Their big dreams: "${dreams || "Success, travels, endless happiness, great memories"}".
Include:
1. 🧿 The Nazar Talisman Ward (What bad vibes are blocked).
2. 💫 3 Big Cosmic Birthday Predictions for their next year of life (fun, exciting, uplifting).
3. 🍀 A Lucky Power Color & Lucky Birthday Number.
4. 💙 An empowering Bestie Affirmation.
Format with clean bullet points and aesthetic emoji styling.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      return res.json({
        fortune: response.text || "You are shielded by the blue eye 🧿. Abundance and joy await you!",
        luckyNumber: Math.floor(Math.random() * 88) + 7,
        powerVibe: "Sapphire Protection & Boundless Joy 🩵",
        source: "gemini"
      });
    } catch (error: any) {
      console.error("Gemini Fortune Error:", error);
      res.status(500).json({
        fortune: "🧿 The mystical talisman shields you from all doubt! Your upcoming year is ordained with sparkling triumphs, genuine love, and laughter.",
        source: "fallback"
      });
    }
  });

  // AI Birthday Song / Rap generator
  app.post("/api/gemini/generate-song", async (req, res) => {
    try {
      const { bestieName, musicGenre, insideJokes } = req.body;
      const ai = getAIClient();

      if (!ai) {
        return res.json({
          lyrics: `[Intro - Upbeat Synth Pop 🩵]
Yo, turn the volume up, drop the beat today!
It's ${bestieName || "Bestie"}'s birthday, we gonna celebrate! 🧿

[Verse 1]
From 2 AM talks to the coffee shop runs,
Nobody got energy matching your fun!
Styled out in blue, with the Nazar in sight 🧿
Ward off the bad vibes, we glowing all night! 💙

[Chorus]
Happy, Happy Birthday to the best in the game!
No one in this world could ever match your name!
Shout it to the stars, let the whole room cheer,
This is gonna be your absolute favorite year! 🩵✨

[Outro]
Blow the candles, make a wish, eat the biggest slice! 🎂
Having you as my bestie is beyond paradise! 🧿💙`,
          source: "crafted-local"
        });
      }

      const prompt = `Write custom catchy birthday song lyrics/rap for ${bestieName || "my bestie"}.
Genre style: "${musicGenre || "Pop Anthem / Fun Rap"}".
Inside jokes/context: "${insideJokes || "Always late but fabulous, iconic laughs, best listener, elite music taste"}".
Include verses, a catchy chorus, and an energetic outro. Include blue hearts 💙🩵 and evil eye 🧿 touches.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      return res.json({ lyrics: response.text, source: "gemini" });
    } catch (error: any) {
      console.error("Gemini Song Error:", error);
      res.status(500).json({ error: "Failed to generate song" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

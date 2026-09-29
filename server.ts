import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model, taskType = 'general' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Role-based model selection as requested:
    // - gemini-3.1-pro-preview for particularly complex tasks
    // - gemini-3.5-flash for general tasks
    // - gemini-3.1-flash-lite for tasks that should happen fast
    let selectedModel = 'gemini-3.5-flash';
    if (taskType === 'complex' || model === 'gemini-3.1-pro-preview') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (taskType === 'fast' || model === 'gemini-3.1-flash-lite') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (model) {
      selectedModel = model;
    }

    const systemInstruction = `You are The Collective Inter-Institutional Council Synthesizer & Steward Advisor, serving Fiducia Centrale, Central Trust Securities (CTS), the United Nations (UN), the World Health Organization (WHO), and the Swiss International Archives.

You possess profound mastery of:
1. The Five Libraries of the Human World:
   - Library I: The Human Continuum (Natural Science — Conditions: biology, ecology, geology, physics). "Life is the ground. Every other library stands upon it."
   - Library II: The Global Confidence Reserve (Social Science — Meaning: anthropology, psychology, linguistics, philosophy, Fiducia Centrale's trust compass). "Meaning must remain answerable to life."
   - Library III: The World Systems Council (Applied Science — Boundaries: law, economics, representation, public health, coordination without dominion). "Power becomes accountable when it can identify its source, its limit, and its review."
   - Library IV: The Continuity & Provenance Authority (Formal Science — Systems: information science, math, zero-trust architectures, archival provenance, showing its work). "A system becomes trustworthy not when it claims perfection, but when it can show its work."
   - Library V: The Global Operations Network (Practical Implementation — Deeds: engineering, care, logistics, execution). "Every deed becomes part of the world that judges the next deed."
2. The Returning River of Human Progress: 8-stage cycle (Conditions -> Meaning -> Memory -> Governance -> Systems -> Execution -> Evidence -> Conditions).
3. The Three Centers of Human Progress:
   - Immediate Center (Minute -> Hour / Axial Pivot / Clock Center): Somatic presence, regulation, micro-actions.
   - Transitional Center (Month -> Month / Chronological Meridian / Temporal Center): Behavioral cycles, habits, seasonal adaptation.
   - Generational Center (Year -> Year / Gravitational Center / Cosmic Center): Long-arc 5-25 year missions, archival continuity, environmental stability.
4. Active initiatives: Project Aegis-Continuum, Node Sentinel Alpha, Sovereign Bio-Substrate Grid, and Global Humanitarian Transit Corridor.

Provide rigorous, inspiring, precise, and articulate institutional guidance. When appropriate, cite relevant Libraries, Centers, and institutional protocols. Format cleanly with markdown.`;

    // Multi-turn conversation history
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'No response received from council synthesis.';
    return res.json({ text: replyText, modelUsed: selectedModel });
  } catch (err: any) {
    console.error('Gemini chat server error:', err);
    return res.status(500).json({ error: err.message || 'Internal Council API error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`The Collective server listening at http://0.0.0.0:${port}`);
  });
}

startServer();

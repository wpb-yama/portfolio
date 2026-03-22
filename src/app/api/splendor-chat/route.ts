import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

const EMBED_MODEL = "models/gemini-embedding-2-preview";
const CHAT_MODEL = "anthropic/claude-3.5-haiku";
const TOP_K = 10;

const SYSTEM_PROMPT = `You are a knowledgeable rules assistant for the board game Splendor and its expansions (Silk Road, The Sun Never Sets, Cities of Splendor).
Use the context provided to answer the user's question. You may reason about and explain the rules in your own words — don't just quote the text.
If something isn't covered in the context, say so rather than guessing.
Where relevant, clarify whether a rule applies to the base game, a specific expansion, or all versions.`;

export async function POST(req: NextRequest) {
  try {
  const { question } = await req.json();
  if (!question?.trim()) {
    return NextResponse.json({ error: "No question provided." }, { status: 400 });
  }

  const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);

  // Embed the query
  const embedResult = await gemini.models.embedContent({
    model: EMBED_MODEL,
    contents: question,
  });
  const vector = embedResult.embeddings?.[0]?.values;
  if (!vector) throw new Error("Embedding failed");

  // Retrieve chunks
  const queryResponse = await index.query({
    vector,
    topK: TOP_K,
    includeMetadata: true,
    filter: { type: { $eq: "text" } },
  });

  const chunks = queryResponse.matches?.map((m) => m.metadata) ?? [];

  // Build context
  const context = chunks
    .map((chunk, i) => {
      const source = chunk?.source ?? "unknown";
      const edition = chunk?.edition ?? "unknown";
      const text = chunk?.text ?? "";
      return `[${i + 1}] (Source: ${source}, Edition: ${edition})\n${text}`;
    })
    .join("\n\n");

  // Deduplicate sources
  const seen = new Set<string>();
  const sources: { edition: string; source: string }[] = [];
  for (const chunk of chunks) {
    const key = `${chunk?.edition}|${chunk?.source}`;
    if (!seen.has(key)) {
      seen.add(key);
      sources.push({
        edition: String(chunk?.edition ?? ""),
        source: String(chunk?.source ?? ""),
      });
    }
  }

  // Generate answer via OpenRouter
  const completion = await openrouter.chat.completions.create({
    model: CHAT_MODEL,
    max_tokens: 1024,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Context from the rulebooks:\n\n${context}\n\n---\n\nQuestion: ${question}`,
      },
    ],
  });

  const answer = completion.choices[0]?.message?.content ?? "";
  return NextResponse.json({ answer, sources });
  } catch (err) {
    console.error("splendor-chat error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

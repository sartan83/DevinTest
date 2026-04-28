import Groq from "groq-sdk";
import OpenAI from "openai";

type Provider = "groq" | "openai" | "deepseek";

interface LLMConfig {
  provider: Provider;
  model: string;
  fallbackModels: string[];
}

function getConfig(): LLMConfig {
  const provider = (process.env.LLM_PROVIDER ?? "groq") as Provider;

  switch (provider) {
    case "openai":
      return {
        provider: "openai",
        model: process.env.LLM_MODEL ?? "gpt-4o",
        fallbackModels: ["gpt-4o-mini", "gpt-3.5-turbo"],
      };
    case "deepseek":
      return {
        provider: "deepseek",
        model: process.env.LLM_MODEL ?? "deepseek-chat",
        fallbackModels: [],
      };
    case "groq":
    default:
      return {
        provider: "groq",
        model: process.env.LLM_MODEL ?? "llama-3.3-70b-versatile",
        fallbackModels: ["llama-3.1-8b-instant"],
      };
  }
}

async function callGroq(
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });
  return response.choices[0]?.message?.content ?? "{}";
}

async function callOpenAI(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  baseURL?: string,
  apiKey?: string,
): Promise<string> {
  const client = new OpenAI({
    apiKey: apiKey ?? process.env.OPENAI_API_KEY,
    ...(baseURL ? { baseURL } : {}),
  });
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });
  return response.choices[0]?.message?.content ?? "{}";
}

async function callWithModel(
  provider: Provider,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  switch (provider) {
    case "groq":
      return callGroq(model, systemPrompt, userPrompt);
    case "deepseek":
      return callOpenAI(
        model,
        systemPrompt,
        userPrompt,
        "https://api.deepseek.com",
        process.env.DEEPSEEK_API_KEY,
      );
    case "openai":
    default:
      return callOpenAI(model, systemPrompt, userPrompt);
  }
}

let lastCallTime = 0;
const MIN_DELAY_MS = Number(process.env.LLM_RATE_LIMIT_MS ?? "2000");

async function rateLimit(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastCallTime;
  if (elapsed < MIN_DELAY_MS) {
    await new Promise((r) => setTimeout(r, MIN_DELAY_MS - elapsed));
  }
  lastCallTime = Date.now();
}

export async function callLLM(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const config = getConfig();
  const models = [config.model, ...config.fallbackModels];

  let lastError: unknown;
  for (const model of models) {
    try {
      await rateLimit();
      return await callWithModel(
        config.provider,
        model,
        systemPrompt,
        userPrompt,
      );
    } catch (err) {
      lastError = err;
      const status = (err as { status?: number }).status;
      if (status === 429 || status === 413 || status === 503) {
        await new Promise((r) => setTimeout(r, 5000));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

import Groq from 'groq-sdk';
import OpenAI from 'openai';

export interface StreamEvent {
  type: 'delta' | 'done' | 'error';
  content?: string;
  model?: string;
  message?: string;
}

interface ProviderResult {
  success: boolean;
  error?: string;
  model?: string;
}

async function* tryGroq(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  systemPrompt: string
): AsyncGenerator<StreamEvent> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    yield {
      type: 'error',
      message: 'Groq API key not configured',
    };
    return;
  }

  try {
    const client = new Groq({ apiKey });
    const stream = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 2048,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || '';
      if (delta) {
        yield {
          type: 'delta',
          content: delta,
        };
      }
    }

    yield {
      type: 'done',
      model: 'groq/llama-3.3-70b-versatile',
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    yield {
      type: 'error',
      message: `Groq failed: ${errorMsg}`,
    };
  }
}

async function* tryOpenRouter(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  systemPrompt: string
): AsyncGenerator<StreamEvent> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    yield {
      type: 'error',
      message: 'OpenRouter API key not configured',
    };
    return;
  }

  try {
    const client = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost',
        'X-Title': 'AIOS CreatorOS',
      },
    });

    const stream = await client.chat.completions.create({
      model: 'meta-llama/llama-3.1-70b-instruct:free',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 2048,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || '';
      if (delta) {
        yield {
          type: 'delta',
          content: delta,
        };
      }
    }

    yield {
      type: 'done',
      model: 'openrouter/llama-3.1-70b-instruct',
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    yield {
      type: 'error',
      message: `OpenRouter failed: ${errorMsg}`,
    };
  }
}

async function* tryMetaLlama(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  systemPrompt: string
): AsyncGenerator<StreamEvent> {
  // Meta Llama would use same OpenAI compat but with different endpoint
  // For now, this is a placeholder
  yield {
    type: 'error',
    message: 'Meta Llama support not yet implemented',
  };
}

export async function* streamChat(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  systemPrompt: string
): AsyncGenerator<StreamEvent> {
  // Try providers in order: Groq → OpenRouter → Meta
  const providers = [
    { name: 'Groq', stream: tryGroq },
    { name: 'OpenRouter', stream: tryOpenRouter },
    { name: 'MetaLlama', stream: tryMetaLlama },
  ];

  for (const provider of providers) {
    let hasContent = false;
    let hasError = false;
    const events: StreamEvent[] = [];

    for await (const event of provider.stream(messages, systemPrompt)) {
      if (event.type === 'error') {
        hasError = true;
        // Don't yield yet, try next provider
      } else {
        hasContent = true;
        events.push(event);
      }
    }

    // If provider succeeded (had content), yield all events
    if (hasContent) {
      for (const event of events) {
        yield event;
      }
      return;
    }
    // If error, continue to next provider
  }

  // All providers failed
  yield {
    type: 'error',
    message:
      'All LLM providers failed. Check API keys: GROQ_API_KEY, OPENROUTER_API_KEY',
  };
}

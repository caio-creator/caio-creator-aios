export interface StreamEvent {
  type: 'delta' | 'done' | 'error';
  content?: string;
  model?: string;
  sessionId?: string;
  message?: string;
}

export async function* streamChat(response: Response): AsyncGenerator<StreamEvent> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Split by double newlines (SSE event separator)
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      for (const line of lines) {
        if (!line.trim()) continue;

        // Parse SSE format: "data: {...}"
        if (line.startsWith('data: ')) {
          const jsonStr = line.substring('data: '.length).trim();
          try {
            const event = JSON.parse(jsonStr) as StreamEvent;
            yield event;
          } catch (err) {
            console.error('Failed to parse SSE event:', jsonStr, err);
          }
        }
      }
    }

    // Process any remaining buffer
    if (buffer.trim()) {
      if (buffer.startsWith('data: ')) {
        const jsonStr = buffer.substring('data: '.length).trim();
        try {
          const event = JSON.parse(jsonStr) as StreamEvent;
          yield event;
        } catch (err) {
          console.error('Failed to parse final SSE event:', jsonStr, err);
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

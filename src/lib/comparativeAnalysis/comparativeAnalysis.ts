import type { Message } from '@/types/message';
import { simulateReadableStream } from 'ai';
import { comparativeAnalysisMessages } from './fakeSteps';
import { comparativeAnalysisMessagesAmgen } from './fakeStepsAmgen';
import { Plus } from '@/types/plus';

// utils/dedent.ts   (or wherever you keep the helper)
function dedent(str: string): string {
  const lines = str.replace(/\t/g, '    ').split('\n');

  // NEW ➜ drop the first non-blank line when measuring
  const candidates = lines.slice(1).filter(l => l.trim());

  const indent = candidates.length
  ? Math.min(
      ...candidates.map(l => (l.match(/^\s*/)?.[0].length ?? 0))
    )
  : 0;

  return [
    lines[0],                                // keep line 0 as-is
    ...lines.slice(1).map(l => l.slice(indent)),
  ].join('\n');
}

// =============================================================
//  comparative-analysis.ts  ‒ streams VERBATIM scripted text
// =============================================================

export async function comparativeAnalysis({
  messages,
  plus,
}: {
  messages: Message[];
  plus: Plus;
}) {
  const assistantCount = messages.filter(m => m.role === 'assistant').length;

  let nextMessage;
  // Plus can be: oncology, neurology, hematology, cardiology, immunology -> check type
  switch (plus) {
    case 'lung-cancer':
      nextMessage = comparativeAnalysisMessages[assistantCount];
      break;
    case 'colorectal-cancer':
      nextMessage = comparativeAnalysisMessagesAmgen[assistantCount];
      break;
    default:
      nextMessage = comparativeAnalysisMessages[assistantCount];
      break;
  }

  if (!nextMessage) {
    return new Response(null, {
      status: 204,
      headers: {
        'X-End-Of-Stream': 'true',
      },
    });
  }

  const { content, tool_used, auto_continue, timer } = nextMessage;

  const raw = content
  const markdown = dedent(raw);

  // -----------------------------------------------------------------
  // 1.  Build a ReadableStream from the hard-coded script
  //     (word-by-word so you still get the “typing” animation)
  // -----------------------------------------------------------------
  const stream = simulateReadableStream({
    chunks: markdown.split(/(\s+)/),   // keeps the spacing
    chunkDelayInMs: 20,               // feel free to tweak
  });

  // -----------------------------------------------------------------
  // 2.  Wrap the stream in an HTTP Response
  // -----------------------------------------------------------------
  const response = new Response(stream, {
    headers: {
      // `useChat` will autodetect this as a **text** stream
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });

  // Preserve the custom headers your frontend relies on
  response.headers.set('X-Auto-Continue', auto_continue ? 'true' : 'false');
  if (timer)     response.headers.set('X-Auto-Timer', timer.toString());
  if (tool_used) response.headers.set('X-Tool-Name', tool_used);

  return response;
}

import { NextRequest, NextResponse } from 'next/server';
import { getAISummary } from '@/lib/ai';

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const { query, messages } = await req.json();
  
  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  // Build conversation context for follow-up questions
  let contextQuery = query;
  if (messages && messages.length > 0) {
    const conversationHistory = messages
      .map((msg: Message) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
    contextQuery = `Previous conversation:\n${conversationHistory}\n\nCurrent question: ${query}`;
  }
  
  try {
    const summary = await getAISummary(contextQuery);
    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error('AI Summary Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

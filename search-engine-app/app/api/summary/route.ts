import { NextRequest, NextResponse } from 'next/server';
import { generateAISummary } from '@/lib/ai-summary';

export async function POST(req: NextRequest) {
  const { query, results } = await req.json();

  if (!query || !results) {
    return NextResponse.json({ error: 'Query and results are required' }, { status: 400 });
  }

  try {
    const summary = await generateAISummary(query, results);
    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error('AI Summary Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

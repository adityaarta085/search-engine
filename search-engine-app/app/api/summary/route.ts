import { NextRequest, NextResponse } from 'next/server';
import { getAISummary } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const summary = await getAISummary(query);
    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error('AI Summary Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

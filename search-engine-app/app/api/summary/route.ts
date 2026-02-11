import { NextRequest, NextResponse } from 'next/server';
import { getBraveSummary } from '@/lib/brave-summary';

export async function POST(req: NextRequest) {
  const { key } = await req.json();

  if (!key) {
    return NextResponse.json({ error: 'Summarizer key is required' }, { status: 400 });
  }

  try {
    const summary = await getBraveSummary(key);
    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error('Brave Summary Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

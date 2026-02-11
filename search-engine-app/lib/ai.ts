const API_BASE = "https://api.termai.cc";

export async function getAISummary(query: string): Promise<string> {
  const apiKey = process.env.XTERM_API_KEY;

  if (!apiKey) {
    throw new Error('XTerm API key is missing');
  }

  const endpoint = `${API_BASE}/api/chat/bard?query=${encodeURIComponent(query)}&key=${apiKey}`;

  const response = await fetch(endpoint, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI summary');
  }

  const data = await response.json();

  if (!data.status) {
    throw new Error('AI API returned an error');
  }

  return data.chatUi || 'No summary available.';
}

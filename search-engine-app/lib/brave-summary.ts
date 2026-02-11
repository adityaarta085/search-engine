export async function getBraveSummary(key: string): Promise<string> {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    throw new Error('Brave Search API key is missing');
  }

  const url = new URL('https://api.search.brave.com/res/v1/summarizer/search');
  url.searchParams.append('key', key);
  url.searchParams.append('entity_info', '1');
  url.searchParams.append('inline_references', '1');

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': apiKey,
    },
    // We might want to avoid long caching for summaries if they are dynamic
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch Brave summary');
  }

  const data = await response.json();

  if (data.status === 'failed') {
    throw new Error('Brave Summarizer failed to generate a summary');
  }

  // Use enrichments.raw if available, otherwise try to reconstruct from summary messages
  if (data.enrichments?.raw) {
    return data.enrichments.raw;
  }

  if (data.summary && Array.isArray(data.summary)) {
    return data.summary
      .map((msg: any) => {
        if (msg.type === 'token') return msg.data;
        // Basic handling for other types, can be expanded
        return '';
      })
      .join('');
  }

  return 'No summary available.';
}

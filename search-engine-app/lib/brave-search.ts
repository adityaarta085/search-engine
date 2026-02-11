export interface BraveThumbnail {
  src: string;
}

export type SearchType = 'web' | 'image' | 'video' | 'news';

export async function performSearch(
  query: string,
  searchType: SearchType = 'web',
  gogglesId?: string
): Promise<any> {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    throw new Error('Brave Search API key is missing');
  }

  let endpoint = 'https://api.search.brave.com/res/v1/web/search';
  if (searchType === 'image') {
    endpoint = 'https://api.search.brave.com/res/v1/images/search';
  } else if (searchType === 'video') {
    endpoint = 'https://api.search.brave.com/res/v1/videos/search';
  } else if (searchType === 'news') {
    endpoint = 'https://api.search.brave.com/res/v1/news/search';
  }

  const url = new URL(endpoint);
  url.searchParams.append('q', query);

  if (gogglesId) {
    url.searchParams.append('goggles_id', gogglesId);
  }

  // For web search, enable additional features
  if (searchType === 'web') {
    url.searchParams.append('summary', '1');
    url.searchParams.append('extra_snippets', '1');
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': apiKey,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    let errorMsg = 'Failed to fetch Brave search results';
    try {
      const error = await response.json();
      errorMsg = error.message || errorMsg;
    } catch (e) {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

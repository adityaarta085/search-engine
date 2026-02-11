export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  pagemap?: {
    cse_thumbnail?: { src: string }[];
    cse_image?: { src: string }[];
    metatags?: Record<string, string>[];
  };
}

export interface GoogleSearchResponse {
  items?: SearchResult[];
  searchInformation: {
    totalResults: string;
    formattedTotalResults: string;
    searchTime: number;
    formattedSearchTime: string;
  };
}

export async function performSearch(query: string, searchType?: 'image' | 'video' | 'web'): Promise<GoogleSearchResponse> {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (!apiKey || !searchEngineId) {
    throw new Error('Google Search API key or Search Engine ID is missing');
  }

  const url = new URL('https://www.googleapis.com/customsearch/v1');
  url.searchParams.append('key', apiKey);
  url.searchParams.append('cx', searchEngineId);
  url.searchParams.append('q', query);

  if (searchType === 'image') {
    url.searchParams.append('searchType', 'image');
  }

  // Note: Standard Custom Search doesn't have a direct 'video' type,
  // but we can add site restrict or use standard web results which include video snippets.

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch search results');
  }

  return response.json();
}

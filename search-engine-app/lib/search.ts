export type SearchType = 'web' | 'image' | 'video' | 'news';

export interface SearchResult {
  title: string;
  url: string;
  description: string;
  thumbnail?: { src: string };
  profile?: { name: string; url: string; img: string };
}

export interface SearchResponse {
  results: SearchResult[];
  web?: {
    results: SearchResult[];
  };
}

const API_BASE = "https://api.termai.cc";

export async function performSearch(
  query: string,
  searchType: SearchType = 'web'
): Promise<SearchResponse> {
  const apiKey = process.env.XTERM_API_KEY;

  if (!apiKey) {
    throw new Error('XTerm API key is missing');
  }

  let endpoint = "";
  if (searchType === 'web' || searchType === 'news') {
    endpoint = `${API_BASE}/api/search/google?query=${encodeURIComponent(query)}&key=${apiKey}`;
  } else if (searchType === 'image') {
    endpoint = `${API_BASE}/api/search/google-image?query=${encodeURIComponent(query)}&key=${apiKey}`;
  } else if (searchType === 'video') {
    endpoint = `${API_BASE}/api/search/pinterest-video?query=${encodeURIComponent(query)}&key=${apiKey}`;
  }

  const response = await fetch(endpoint, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data = await response.json();

  if (!data.status && !Array.isArray(data.data)) {
    throw new Error('API returned an error or invalid format');
  }

  if (searchType === 'web' || searchType === 'news') {
    const items = data.data?.items || [];
    const results = items.map((item: { title: string; link: string; snippet: string; pagemap?: { cse_thumbnail?: { src: string }[]; metatags?: { [key: string]: string }[] } }) => {
      const thumbnailSrc = item.pagemap?.cse_thumbnail?.[0]?.src ||
                          item.pagemap?.metatags?.[0]?.['og:image'];

      return {
        title: item.title,
        url: item.link,
        description: item.snippet,
        thumbnail: thumbnailSrc ? { src: thumbnailSrc } : undefined,
      };
    });

    return {
      web: { results },
      results: results // for compatibility
    };
  } else if (searchType === 'image') {
    const imageUrls = Array.isArray(data.data) ? data.data : [];
    const results = imageUrls.map((url: string) => ({
      title: 'Image',
      url: url,
      description: '',
      thumbnail: { src: url }
    }));
    return { results };
  } else if (searchType === 'video') {
    const pins = data.data?.pins || [];
    const results = pins.map((pin: { title?: string; link: string }) => ({
      title: pin.title || 'Pinterest Video',
      url: pin.link,
      description: 'Video found on Pinterest',
      thumbnail: undefined
    }));
    return { results };
  }

  return { results: [] };
}

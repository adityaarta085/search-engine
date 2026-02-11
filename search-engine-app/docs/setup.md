# Setup Instructions

## Prerequisites

- Node.js 18+
- [Brave Search API Key](https://api.search.brave.com/app/dashboard)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env.local` file in the root directory (or add to Vercel Environment Variables):

```env
# Brave Search API (Required for both search and AI summaries)
BRAVE_SEARCH_API_KEY=your_brave_search_api_key
```

## Development

Run the development server with Turbopack:

```bash
npm run dev
```

## Deployment

This project is optimized for [Vercel](https://vercel.com). Simply connect your repository and add the `BRAVE_SEARCH_API_KEY` environment variable in the Vercel dashboard.

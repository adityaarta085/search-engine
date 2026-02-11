# Setup Instructions

## Prerequisites

- Node.js 18+
- Google Cloud Project with Custom Search API enabled
- Google Search Engine ID (CX)
- Google AI Studio API Key (for Gemini)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env.local` file in the root directory:

```env
# Google Search API
GOOGLE_SEARCH_API_KEY=your_google_search_api_key
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id

# AI Integration (Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

## Development

Run the development server with Turbopack:

```bash
npm run dev
```

## Deployment

This project is optimized for [Vercel](https://vercel.com). Simply connect your repository and add the environment variables mentioned above.

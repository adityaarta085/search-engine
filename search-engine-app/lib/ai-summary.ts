import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function generateAISummary(query: string, searchResults: Array<{ title: string; snippet: string }>) {
  const context = searchResults
    .slice(0, 5)
    .map((res, i) => `Result ${i + 1} (${res.title}): ${res.snippet}`)
    .join('\n\n');

  const { text } = await generateText({
    model: google('gemini-1.5-flash'),
    prompt: `
      You are an AI search assistant. Based on the following search results for the query "${query}",
      provide a concise, high-quality summary that answers the user's intent.

      Highlight key facts and provide a direct answer if possible.
      Use Markdown for formatting.

      Search Results:
      ${context}
    `,
  });

  return text;
}

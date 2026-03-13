import { RESPONSES, FALLBACK } from './chatResponses';

export function getReply(input: string): string {
  const lower = input.toLowerCase().trim();

  for (const { keywords, reply } of RESPONSES) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return reply;
    }
  }

  return FALLBACK;
}

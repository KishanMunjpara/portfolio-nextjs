/** One-line blurb for portfolio cards (full text stays in data / resume). */
export function projectSummary(description: string, maxLength = 110): string {
  const firstSentence = description.match(/^[^.!?]+[.!?]/)?.[0]?.trim();
  const base = firstSentence && firstSentence.length <= maxLength ? firstSentence : description;
  if (base.length <= maxLength) return base;
  return `${base.slice(0, maxLength).trim()}…`;
}

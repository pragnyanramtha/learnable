export const CODE_SIMILARITY_PASS_THRESHOLD = 0.52;

function normalizeCode(value: string) {
  return value
    .replace(/#.*$/gm, '')
    .replace(/("""|''')[\s\S]*?\1/g, ' string ')
    .replace(/(["']).*?\1/g, ' string ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function tokenizeCode(value: string) {
  return normalizeCode(value).match(/[a-z_][a-z0-9_]*|\d+(?:\.\d+)?|==|!=|<=|>=|\+=|-=|\*=|\/=|[+\-*/%<>=()[\]{},.:]/g) ?? [];
}

function countTokens(tokens: string[]) {
  return tokens.reduce<Record<string, number>>((counts, token) => {
    counts[token] = (counts[token] ?? 0) + 1;
    return counts;
  }, {});
}

function multisetDice(leftTokens: string[], rightTokens: string[]) {
  if (leftTokens.length === 0 || rightTokens.length === 0) return 0;

  const leftCounts = countTokens(leftTokens);
  const rightCounts = countTokens(rightTokens);
  const overlap = Object.entries(leftCounts).reduce((total, [token, leftCount]) => {
    return total + Math.min(leftCount, rightCounts[token] ?? 0);
  }, 0);

  return (2 * overlap) / (leftTokens.length + rightTokens.length);
}

function getCharacterBigrams(value: string) {
  const normalized = normalizeCode(value).replace(/\s+/g, '');
  if (normalized.length < 2) return new Set(normalized ? [normalized] : []);

  const bigrams = new Set<string>();
  for (let index = 0; index < normalized.length - 1; index += 1) {
    bigrams.add(normalized.slice(index, index + 2));
  }

  return bigrams;
}

function jaccard(left: Set<string>, right: Set<string>) {
  if (left.size === 0 || right.size === 0) return 0;

  let intersection = 0;
  for (const value of left) {
    if (right.has(value)) intersection += 1;
  }

  return intersection / (left.size + right.size - intersection);
}

export function getCodeSimilarity(submission: string, reference: string) {
  const submissionTokens = tokenizeCode(submission);
  const referenceTokens = tokenizeCode(reference);
  const tokenSimilarity = multisetDice(submissionTokens, referenceTokens);
  const structureSimilarity = jaccard(getCharacterBigrams(submission), getCharacterBigrams(reference));
  const score = tokenSimilarity * 0.7 + structureSimilarity * 0.3;

  return Math.round(score * 10000) / 10000;
}

export function isSimilarCodeAnswer(submission: string, reference: string) {
  if (!submission.trim() || !reference.trim()) return false;
  return getCodeSimilarity(submission, reference) >= CODE_SIMILARITY_PASS_THRESHOLD;
}

import type { Question, SourceGroundedQuestion } from "../types";

export function normalizeQuestionText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(a|an|the|and|or|to|of|for|in|on|with)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function questionFingerprint(question: Pick<Question | SourceGroundedQuestion, "cert" | "stem" | "options">) {
  const optionSet = question.options
    .map((option) => normalizeQuestionText(option.text))
    .sort()
    .join("|");

  return `${question.cert}::${normalizeQuestionText(question.stem)}::${optionSet}`;
}

export function duplicateFingerprints<T extends Pick<Question | SourceGroundedQuestion, "id" | "cert" | "stem" | "options">>(records: T[]) {
  const seen = new Map<string, T>();
  const duplicates: Array<{ key: string; first: T; second: T }> = [];

  for (const record of records) {
    const key = questionFingerprint(record);
    const first = seen.get(key);
    if (first) duplicates.push({ key, first, second: record });
    else seen.set(key, record);
  }

  return duplicates;
}

export function duplicateValues<T>(records: T[], valueFor: (record: T) => string) {
  const seen = new Map<string, T>();
  const duplicates: Array<{ key: string; first: T; second: T }> = [];

  for (const record of records) {
    const key = normalizeQuestionText(valueFor(record));
    const first = seen.get(key);
    if (first) duplicates.push({ key, first, second: record });
    else seen.set(key, record);
  }

  return duplicates;
}

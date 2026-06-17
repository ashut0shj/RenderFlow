export function safeGet<T>(obj: unknown, path: string, fallback?: T): T | undefined {
  if (obj === null || obj === undefined) {
    return fallback;
  }
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return fallback;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current === undefined ? fallback : (current as T);
}

/**
 * Serialize a value as a stable JSON string
 */
export function toJSON(value: unknown): string {
  function sort(current: unknown): unknown {
    if (Array.isArray(current)) {
      return current.map(sort);
    }

    if (current !== null && typeof current === 'object') {
      return Object.fromEntries(
        Object.keys(current)
          .sort()
          .map(key => [key, sort((current as Record<string, unknown>)[key])])
      );
    }

    return current;
  }

  return JSON.stringify(sort(value), null, 2);
}

/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric'
  });
}

/**
 * Get the UTC date in ISO 8601 form
 */
export function getISODate(reference?: Date): string {
  const date = reference ?? new Date();
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Report whether a string is a valid ISO 8601 date
 */
export function isISODate(date: string): boolean {
  return /^(\d{4}-\d{2}-\d{2})$/.test(date)
    && !Number.isNaN(new Date(date).getTime());
}

/**
 * Parse an ISO 8601 calendar date as a UTC date
 */
export function parseISODate(iso: string): Date {
  if (!isISODate(iso)) {
    throw new Error(`Invalid ISO date: ${iso}`);
  }

  const parts = iso.split('-').map(Number);
  const [year, month, day] = parts as [number, number, number];

  return new Date(Date.UTC(year, month - 1, day));
}

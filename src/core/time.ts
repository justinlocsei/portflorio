/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Get the current date in ISO 8601 format
 */
export function getISODate(reference?: Date): string {
  const iso = (reference ?? new Date()).toISOString();
  const [date] = iso.split('T');

  if (!date) {
    throw new Error(`Could not extract the date from ISO string: ${iso}`);
  }

  return date;
}

/**
 * Report whether a string is a valid ISO 8601 date
 */
export function isISODate(date: string): boolean {
  return /^(\d{4}-\d{2}-\d{2})$/.test(date)
    && !Number.isNaN(new Date(date).getTime());
}

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

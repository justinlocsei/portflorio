declare const ISODateBrand: unique symbol;
declare const UTCDateBrand: unique symbol;

/**
 * An UTC date in ISO 8601 format
 */
export type ISODate = string & {
  readonly [ISODateBrand]: typeof ISODateBrand;
};

/**
 * A UTC calendar date with no time component
 */
export type UTCDate = Date & {
  readonly [UTCDateBrand]: typeof UTCDateBrand;
};

/**
 * Format a UTC calendar date for display
 */
export function formatDate(date: UTCDate): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric'
  });
}

/**
 * Get the current UTC date in ISO 8601 form
 */
export function getISODate(reference?: UTCDate): ISODate {
  const date = reference ?? utcNow();

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}` as ISODate;
}

/**
 * Report whether a string is a valid ISO 8601 date
 */
export function isISODate(date: string): date is ISODate {
  return isValidISODate(date);
}

/**
 * Convert an ISO 8601 date string to a UTC date
 */
export function parseDate(iso: ISODate): UTCDate {
  const [year, month, day] = iso.split('-').map(Number) as [
    number,
    number,
    number
  ];

  return utcFromParts(year, month, day);
}

/**
 * Use a valid ISO 8601 date string
 */
export function useDate(date: string): ISODate {
  if (!isValidISODate(date)) {
    throw new Error(`Invalid ISO date: ${date}`);
  }

  return date as ISODate;
}

/**
 * Determine whether a string is a valid ISO 8601 date
 */
function isValidISODate(date: string): boolean {
  if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(date)) {
    return false;
  }

  const [year, month, day] = date.split('-').map(Number);

  if (year === undefined || month === undefined || day === undefined) {
    return false;
  }

  const utc = utcFromParts(year, month, day);

  return utc.getUTCFullYear() === year
    && utc.getUTCMonth() === month - 1
    && utc.getUTCDate() === day;
}

/**
 * Build a UTC date from parts
 */
function utcFromParts(year: number, month: number, day: number): UTCDate {
  return new Date(Date.UTC(year, month - 1, day)) as UTCDate;
}

/**
 * Get the current UTC date
 */
function utcNow(): UTCDate {
  const now = new Date();

  return utcFromParts(
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate()
  );
}

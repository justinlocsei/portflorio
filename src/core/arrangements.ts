import { getISODate, isISODate } from './time.ts';

/**
 * Define a selector for an arrangement
 */
type IsArrangementSelector<D, I> = {
  date: D;
  id: I;
};

/**
 * A standardized arrangement selector
 */
export type ArrangementSelector = IsArrangementSelector<string, string>;

/**
 * A flexible request for an arrangement selector
 */
export type ArrangementSelectorRequest = IsArrangementSelector<
  Date | string,
  number | string
>;

/**
 * Treat a number as an arrangement ID
 */
export function asID(index: number): string {
  return String(index).padStart(2, '0');
}

/**
 * Convert an arrangement selector to a GUID
 */
export function selectorToGUID(
  { date, id }: ArrangementSelectorRequest
): string {
  const dateString = typeof date === 'string'
    ? date
    : getISODate(date);

  if (!isISODate(dateString)) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  const idString = typeof id === 'string'
    ? id
    : asID(id);

  return `${dateString}-${idString}`;
}

/**
 * Attempt to extract an arrangement selector from a GUID
 */
export function guidToSelector(
  guid: string
): ArrangementSelector | null {
  const parts = guid.split('-');
  const idString = parts.pop();

  const dateString = parts.join('-');
  const id = idString ? parseInt(idString, 10) : undefined;

  if (
    dateString && id && isISODate(dateString)
    && Number.isInteger(id)
  ) {
    return { date: dateString, id: asID(id) };
  } else {
    return null;
  }
}

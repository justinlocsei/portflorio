import type { Arrangement, View, ViewFilter, ViewFilterID } from './types.ts';

/**
 * Filter arrangements based on a view
 */
export function filterArrangements(
  all: Arrangement[],
  { colors, flowers }: View
): Arrangement[] {
  let arrangements = all;

  if (flowers.length) {
    arrangements = arrangements.filter(a =>
      flowers.every(flower => a.flowers.some(f => f.name === flower))
    );
  }

  if (colors.length) {
    arrangements = arrangements.filter(a =>
      colors.every(color => a.flowers.some(f => f.colors.includes(color)))
    );
  }

  return arrangements;
}

/**
 * Create filters to manage a slice of a view
 */
export function createViewFilter<T extends string>(
  view: View,
  setView: (view: (current: View) => View) => void,
  key: ViewFilterID
): ViewFilter<T> {
  const set = new Set(view[key] as string[]);

  return {
    active: set.size > 0,
    clear: () => setView(v => ({ ...v, [key]: [] })),
    has: (item: T) => set.has(item),
    toggle: item =>
      setView(current => {
        const values = current[key] as T[];

        return {
          ...current,
          [key]: values.includes(item)
            ? values.filter(value => value !== item)
            : [...values, item]
        };
      })
  };
}

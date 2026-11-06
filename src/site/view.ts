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
  setView: (view: View | ((current: View) => View)) => void,
  key: ViewFilterID
): ViewFilter<T> {
  const set = new Set(view[key] as string[]);

  return {
    active: set.size > 0,
    add: (...items: T[]) => {
      setView(current => ({
        ...current,
        [key]: [...current[key], ...items],
        focus: null
      }));
    },
    clear: () => {
      setView(current => ({ ...current, [key]: [], focus: null }));
    },
    has: (item: T) => {
      return set.has(item);
    },
    remove: (...items: T[]) => {
      setView(current => ({
        ...current,
        [key]: current[key].filter(item => !items.includes(item as T)),
        focus: null
      }));
    },
    toggle: (item, options) => {
      setView(current => {
        const values = current[key] as T[];

        return {
          ...current,
          [key]: values.includes(item)
            ? values.filter(value => value !== item)
            : [...values, item],
          focus: options?.focus ?? null
        };
      });
    }
  };
}

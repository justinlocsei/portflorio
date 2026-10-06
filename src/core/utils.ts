// biome-ignore-all lint/suspicious/noExplicitAny: inclusive mapping functions

/**
 * An object that transforms a member of a string union
 */
type StringMapper<I extends string> = {
  to: <O>(handlers: Record<I, O | (() => O)>) => O;
};

/**
 * Create a mapper for all members of a string union
 */
function mapString<T extends string>(input: T): StringMapper<T> {
  return {
    to: handlers => {
      if (input in handlers) {
        const handler = handlers[input];
        return typeof handler === 'function' ? handler() : handler;
      } else {
        throw new Error(`No handler was found for string variant: ${input}`);
      }
    }
  };
}

/**
 * The discriminator for a tagged union
 */
type TaggedUnion<T extends string = string> = Record<T, string>;

/**
 * An object that transforms a member of a tagged union
 */
type TaggedUnionMapper<U extends TaggedUnion, T extends keyof U> = {
  to: <O>(
    handlers: {
      [P in U[T]]: O | ((member: Extract<U, Record<T, P>>) => O);
    }
  ) => O;
};

/**
 * Create a mapper for all members of a tagged union
 */
function mapTaggedUnion<U extends TaggedUnion, T extends keyof U>(
  input: U,
  field: T
): TaggedUnionMapper<U, T> {
  return {
    to: handlers => {
      const key = input[field];

      if (key && key in handlers) {
        const handler = handlers[key];
        return typeof handler === 'function' ? handler(input) : handler;
      } else {
        throw new Error(
          `No handler was found for ${String(field)} variant: ${key}`
        );
      }
    }
  };
}

/**
 * Map a member of a union type to an output value
 */
export function map<T extends string>(input: T): StringMapper<T>;
export function map<T extends TaggedUnion<'type'>>(
  input: T
): TaggedUnionMapper<T, 'type'>;
export function map<T extends Record<any, any>, U extends keyof T>(
  input: T,
  tag: U
): TaggedUnionMapper<T, U>;
export function map(input: any, field?: any): any {
  if (typeof input === 'string') {
    return mapString(input);
  } else if (typeof field === 'string') {
    return mapTaggedUnion(input, field);
  } else {
    return mapTaggedUnion(input, 'type');
  }
}

/**
 * A value that can be used for sorting
 */
type Sortable = number | string;

/**
 * Compare two sortable values
 */
function compareSortable(a: Sortable, b: Sortable): number {
  return (typeof a === 'number' && typeof b === 'number')
    ? a - b
    : String(a).localeCompare(String(b));
}

/**
 * Sort a list by one or more selectors
 */
export function sortBy<T>(
  items: readonly T[],
  ...selectors: Array<(item: T) => Sortable>
): T[] {
  return items.toSorted((a, b) => {
    for (const selector of selectors) {
      const order = compareSortable(selector(a), selector(b));

      if (order !== 0) {
        return order;
      }
    }

    return 0;
  });
}

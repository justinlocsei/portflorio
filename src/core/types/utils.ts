/**
 * Produce a narrower type from a subset of an object's properties
 */
export type Subset<T extends object, K extends keyof T> = Pick<T, K>;

/**
 * Define a variant keyed by a type field with optional extensions
 */
export type Variant<T extends string, U = object> = { type: T } & U;

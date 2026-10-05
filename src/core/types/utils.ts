/**
 * Define a variant keyed by a type field with optional extensions
 */
export type Variant<T extends string, U = object> = { type: T } & U;

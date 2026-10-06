import { getISODate } from './time.ts';
import type { StoredArrangement } from './types.ts';

const routes = {
  arrangement: (a: StoredArrangement): string =>
    `/${getISODate(a.date)}/${a.id}`,
  home: () => '/'
};

export default routes;

/**
 * Produce a list of all supported routes
 */
export function listRoutes(arrangements: StoredArrangement[]): string[] {
  return [
    routes.home(),
    ...arrangements.map(a => routes.arrangement(a))
  ].sort();
}

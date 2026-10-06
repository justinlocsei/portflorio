import type {
  ArrangementSelector,
  ArrangementSelectorRequest
} from './arrangements.ts';
import { guidToSelector, selectorToGUID } from './arrangements.ts';
import type { StoredArrangement } from './types.ts';

const routes = {
  arrangement: (a: ArrangementSelectorRequest): string =>
    `/${selectorToGUID(a)}`,
  home: () => '/'
};

export default routes;

/**
 * The ID of a known route
 */
type RouteID = keyof typeof routes;

/**
 * Define a matched route
 */
type IsMatchedRoute<T extends RouteID, U = object> = U & {
  type: T;
};

/**
 * A matched route
 */
type MatchedRoute =
  | IsMatchedRoute<'home'>
  | IsMatchedRoute<'arrangement', { arrangement: ArrangementSelector }>;

/**
 * Produce a list of all supported routes
 */
export function listRoutes(arrangements: StoredArrangement[]): string[] {
  return [
    routes.home(),
    ...arrangements.map(a => routes.arrangement(a))
  ].sort();
}

/**
 * Match a route against a URL path
 */
export function matchRoute(path: string): MatchedRoute | null {
  if (path === routes.home()) {
    return { type: 'home' };
  }

  const selector = guidToSelector(path.slice(1));

  if (selector) {
    return {
      arrangement: selector,
      type: 'arrangement'
    };
  }

  return null;
}

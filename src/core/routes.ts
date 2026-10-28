import type { Arrangement } from './types.ts';

const routes = {
  arrangement: (id: number): string => `/arrangements/${id}`,
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
  | IsMatchedRoute<'arrangement', { id: number }>;

/**
 * Produce a list of all supported routes
 */
export function listRoutes(arrangements: Arrangement[]): string[] {
  return [
    routes.home(),
    ...arrangements.map(a => routes.arrangement(a.id))
  ].sort();
}

/**
 * Match a route against a URL path
 */
export function matchRoute(path: string): MatchedRoute | null {
  if (path === routes.home()) {
    return { type: 'home' };
  }

  const match = path.match(/^\/arrangements\/(\d+)$/);
  const id = match?.[1];

  if (id) {
    return {
      id: parseInt(id, 10),
      type: 'arrangement'
    };
  }

  return null;
}

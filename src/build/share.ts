import { listItems } from '../core/text.ts';
import type { Arrangement } from '../core/types.ts';

// All supported platform IDs
export const PLATFORM_IDS = ['facebook', 'instagram'] as const;

/**
 * A platform ID
 */
export type PlatformID = typeof PLATFORM_IDS[number];

/**
 * A social platform
 */
type Platform = {
  formatPost?: (post: string) => string;
};

// Tags to include in all Instagram posts
const IG_TAGS = [
  'floralart',
  'floraldesign',
  'floralphotography',
  'flowerarrangements',
  'flowerphotography',
  'stilllifephotography'
].map(t => `#${t}`);

const PLATFORMS: Record<PlatformID, Platform> = {
  facebook: {},
  instagram: { formatPost: p => `${p}\n\n${IG_TAGS.join(' ')}` }
};

/**
 * A shared arrangement
 */
type SharedArrangement = {
  post: string;
};

/**
 * Export an arrangement for sharing
 */
export async function shareArrangement(
  arrangement: Arrangement,
  platformID: PlatformID
): Promise<SharedArrangement> {
  const [first, ...rest] = arrangement.details.flowers.toSorted();

  const post = listItems(
    [first ?? '', ...rest.map(r => r.toLocaleLowerCase())].filter(Boolean),
    'and'
  );

  const { formatPost } = PLATFORMS[platformID];

  return {
    post: formatPost?.(post) ?? post
  };
}

import { COLORS } from '../core/colors.ts';
import { listItems, sentenceCase } from '../core/text.ts';
import { formatDate } from '../core/time.ts';
import type {
  Arrangement,
  Color,
  Dimensions,
  Mechanic
} from '../core/types.ts';

const MECHANIC_LABELS: Record<Mechanic, string> = {
  foam: 'Floral Foam',
  kenzan: 'Kenzan',
  wire: 'Chicken Wire'
};

/**
 * Produce a readable label for a color
 */
export function labelColor(id: Color): string {
  return COLORS[id].name;
}

/**
 * Produce a description of an arrangement
 */
export function describeArrangement(
  arrangement: Arrangement,
  { colors }: { colors: boolean }
): string {
  const flowers = arrangement.flowers.flatMap(f => {
    return colors
      ? f.colors.map(c => `${labelColor(c)} ${f.name}`)
      : [f.name];
  });

  return sentenceCase(listItems(flowers, 'and'));
}

/**
 * Produce a short label for an arrangement
 */
export function labelArrangement(arrangement: Arrangement): string {
  return [
    formatDate(arrangement.date),
    labelMechanic(arrangement.mechanic)
  ].join(' / ');
}

/**
 * Produce a readable label for a mechanic
 */
export function labelMechanic(id: Mechanic): string {
  return MECHANIC_LABELS[id];
}

/**
 * Scale dimensions by a factor
 */
export function scaleBy(dimensions: Dimensions, factor: number): Dimensions {
  return {
    height: dimensions.height * factor,
    width: dimensions.width * factor
  };
}

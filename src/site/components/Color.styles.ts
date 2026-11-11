import type { StyleFragment } from 'ruscus';
import { component } from 'ruscus';

import type { Color } from '../../core/colors.ts';
import { COLORS } from '../../core/colors.ts';
import { rhythm, transition } from './styles.ts';

const size = rhythm(0.9);

export default component('Color')
  .identifiers({ color: 'variable' })
  .css({
    backgroundColor: 'transparent',
    borderRadius: '50%',
    display: 'block',
    height: size,
    transform: 'scale(1.25)',
    width: size,
    ...transition('opacity')
  })
  .nested((s, { ids }) => ({
    '&': s({
      backgroundColor: `var(${ids.color})`
    })
  }))
  .variants((s, { ids }) => ({
    ...Object.fromEntries(
      Object.entries(COLORS).map(([id, color]) => [
        id.toLocaleLowerCase(),
        s({ [ids.color]: `#${color.hex}` })
      ])
    ) as Record<Color, StyleFragment>
  }))
  .apply();

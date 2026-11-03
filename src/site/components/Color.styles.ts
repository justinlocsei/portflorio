import type { StyleFragment } from 'ruscus';
import { component } from 'ruscus';

import type { Color } from '../../core/colors.ts';
import { COLORS } from '../../core/colors.ts';
import { focusable, rhythm, transition, views } from './styles.ts';

const size = rhythm(0.9);

export default component('Color')
  .identifiers({ color: 'variable' })
  .css({
    backgroundColor: 'transparent',
    border: `1px solid transparent`,
    borderRadius: '50%',
    boxSizing: 'content-box',
    display: 'block',
    opacity: 0.5,
    height: size,
    width: size,
    ...transition('opacity')
  })
  .is(focusable({
    opacity: 1,
    transform: 'scale(1.3)'
  }))
  .nested((s, { ids }) => ({
    '&': s({
      borderColor: `var(${ids.color})`
    })
  }))
  .variants((s, { ids }) => ({
    ...Object.fromEntries(
      Object.entries(COLORS).map(([id, color]) => [
        id.toLocaleLowerCase(),
        s({ [ids.color]: `#${color.hex}` })
      ])
    ) as Record<Color, StyleFragment>,

    selectable: s().nested({
      '&:hover': s({
        opacity: 1
      })
    }),

    selected: s({
      backgroundColor: `var(${ids.color})`,
      opacity: 0.75,
      transform: 'scale(1.25)'
    })
  }))
  .global((s, { els, ids }) =>
    views({
      stacked: {
        [els.root()]: s({
          backgroundColor: `var(${ids.color})`,
          opacity: 0.25
        })
      }
    })
  )
  .apply();

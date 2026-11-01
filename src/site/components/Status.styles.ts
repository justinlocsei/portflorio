import { component } from 'ruscus';

import { colors, focusable, rhythm, sansSerif, transition } from './styles.ts';

export default component('Status')
  .is(sansSerif)
  .elements(e => ({
    section: e({
      display: 'flex',
      gap: '0.75em',
      position: 'relative'
    }).children({
      title: e({
        color: colors.accent,
        letterSpacing: '0.05ex',
        textTransform: 'uppercase',
        width: '9em'
      }),

      content: e({
        flex: 1
      })
    }).nested(s => ({
      '& + &': s({
        marginTop: rhythm(0.75)
      })
    })).variants((s, { els }) => ({
      count: s().nested({
        [els.title]: s({
          letterSpacing: '0.1ex'
        })
      }),

      mode: s()
    })),

    counts: e({
      alignItems: 'baseline',
      display: 'flex',
      gap: rhythm(0.375),
      position: 'relative'
    }).children({
      visible: e(),

      joiner: e({
        fontSize: '0.8em',
        opacity: 0.5
      }),

      reset: e({
        border: `1px solid ${colors.border}`,
        borderRadius: '0.5em',
        fontSize: '0.75em',
        opacity: 0.5,
        letterSpacing: '0.1ex',
        padding: '0.375em 1em',
        position: 'absolute',
        right: '-1em',
        top: '-0.25em',
        textTransform: 'uppercase',
        ...transition('opacity')
      }).nested(s => ({
        '&:hover': s({
          opacity: 1
        })
      })).is(focusable({
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        opacity: 1
      })),

      count: e()
    }),

    modes: e({
      display: 'flex',
      gap: '1em'
    }),

    mode: e().children({
      select: e({
        display: 'block',
        ...transition('color')
      }).is(focusable({
        color: colors.textAccent,
        borderBottom: `1px solid ${colors.accent}`,
        paddingBottom: '0.25em'
      }))
    }).variants(s => ({
      selected: s({
        borderBottom: `2px solid ${colors.accent}`,
        color: colors.textAccent,
        paddingBottom: '0.25em'
      }),

      selectable: s().nested({
        '&:hover': s({
          color: colors.textAccent
        })
      })
    }))
  }))
  .apply();

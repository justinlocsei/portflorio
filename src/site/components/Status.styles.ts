import { component } from 'ruscus';

import { colors, rhythm, sansSerif } from './styles.ts';

export default component('Status')
  .is(sansSerif)
  .elements(e => ({
    section: e({
      display: 'flex',
      gap: '0.75em'
    }).children({
      title: e({
        color: colors.accent,
        letterSpacing: '0.05ex',
        textTransform: 'uppercase',
        width: '9em'
      }),

      content: e()
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
      alignItems: 'center',
      display: 'flex',
      gap: rhythm(0.375)
    }).children({
      visible: e(),

      joiner: e({
        fontSize: '0.8em',
        opacity: 0.5
      }),

      count: e()
    }),

    modes: e({
      display: 'flex',
      gap: '1em'
    }),

    mode: e().children({
      select: e()
    }).variants(s => ({
      selected: s({
        borderBottom: `2px solid ${colors.accent}`,
        color: colors.textAccent,
        paddingBottom: '0.25em'
      }),

      selectable: s()
    }))
  }))
  .apply();

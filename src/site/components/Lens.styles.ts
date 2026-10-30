import { component } from 'ruscus';

import { colors, rhythm } from './styles.ts';

export default component('Lens')
  .identifiers({
    swatch: 'variable'
  })
  .elements((e, { ids }) => ({
    section: e().children({
      title: e({
        color: colors.accent,
        fontWeight: 300,
        fontSize: '1.25em',
        letterSpacing: '0.05em',
        marginBottom: rhythm(0.75),
        textTransform: 'uppercase'
      }),

      content: e()
    }).nested(s => ({
      '& + &': s({
        marginTop: rhythm(2)
      })
    })),

    flowers: e(),

    flower: () => {
      const gutter = '0.5em';

      return e({
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        lineHeight: 3,
        justifyContent: 'space-between',
        margin: `0 -${gutter}`,
        padding: `0 ${gutter}`
      }).nested(s => ({
        '& + &': s({
          borderTop: `1px solid ${colors.borderDark}`
        })
      })).children({
        name: e(),

        count: e({
          fontSize: '0.9em',
          fontWeight: 300,
          textAlign: 'center',
          width: '2em'
        })
      }).variants(s => ({
        available: s(),

        unavailable: s({
          color: colors.muted
        })
      }));
    },

    colors: e({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      columnGap: '1em',
      rowGap: rhythm(1.5)
    }),

    color: e().children({
      swatch: e({
        backgroundColor: `var(${ids.swatch})`,
        borderRadius: '0.5em',
        display: 'block',
        height: '4em',
        width: '4em'
      }),

      count: e({
        fontSize: '0.9em',
        fontWeight: 300,
        marginTop: rhythm(0.5),
        textAlign: 'center'
      })
    })
  }))
  .apply();

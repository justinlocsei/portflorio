import { component } from 'ruscus';

import { colors, rhythm, weights } from './styles.ts';

export default component('Lens')
  .identifiers({
    swatch: 'variable'
  })
  .elements((e, { ids }) => ({
    section: e().children({
      header: () => {
        const pull = '0.825rem';

        return e({
          alignItems: 'center',
          display: 'flex',
          gap: '0.5em',
          marginBottom: rhythm(0.75),
          marginLeft: `-${pull}`
        }).children({
          title: e({
            color: colors.accent,
            fontWeight: weights.light,
            fontSize: '1.25em',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }),

          icon: e({
            fontWeight: weights.bold,
            transform: 'rotate(90deg)'
          })
        });
      },

      content: e()
    }).nested(s => ({
      '& + &': s({
        marginTop: rhythm(2)
      })
    })).variants((s, { els }) => ({
      collapsed: s().nested({
        [els.content]: s({
          display: 'none'
        })
      }),

      expanded: s()
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
          fontWeight: weights.light,
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
        fontWeight: weights.light,
        marginTop: rhythm(0.5),
        textAlign: 'center'
      })
    })
  }))
  .apply();

import { component } from 'ruscus';

import { colors, rhythm, weights } from './styles.ts';

export default component('Arrangement')
  .identifiers({
    swatch: 'variable'
  })
  .css({
    display: 'flex',
    gap: rhythm(3)
  })
  .elements((e, { ids }) => ({
    media: e({
      flex: 'none'
    }),

    image: e(),

    meta: e({
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    }),

    details: e({
      fontWeight: weights.light,
      padding: `${rhythm(1)} 0`
    }).children({
      date: e({
        fontSize: '1.75em'
      }),

      mechanic: e({
        color: colors.accent,
        fontSize: '0.9em',
        letterSpacing: '0.075em',
        lineHeight: rhythm(2),
        textTransform: 'uppercase'
      })
    }),

    flowers: e({
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      fontSize: '1.125em',
      lineHeight: 1.25,
      justifyContent: 'center'
    }),

    flower: e({
      alignItems: 'center',
      display: 'flex',
      gap: '0.5em',
      justifyContent: 'space-between'
    }).children({
      colors: () => {
        const size = rhythm(0.5);

        return e({
          display: 'flex'
        }).children({
          color: e({
            backgroundColor: 'transparent',
            borderRadius: '50%',
            display: 'block',
            opacity: 0.5,
            outline: `1px solid var(${ids.swatch})`,
            outlineOffset: '1px',
            height: size,
            width: size
          }).variants(s => ({
            selected: s({
              backgroundColor: `var(${ids.swatch})`,
              outlineOffset: 0,
              outlineWidth: '2px',
              opacity: 0.75
            })
          }))
        });
      },

      name: e({
        position: 'relative'
      })
    }).nested(s => ({
      '& + &': s({
        marginTop: rhythm(1)
      })
    })).variants((s, { els }) => ({
      selected: s({
        color: colors.textAccent,
        fontWeight: weights.bold
      }).nested({
        [els.name]: s().nested({
          '&::before': s({
            backgroundColor: colors.accent,
            bottom: 0,
            content: '""',
            height: '2px',
            left: 0,
            marginBottom: '-0.125em',
            position: 'absolute',
            right: 0
          })
        })
      })
    }))
  }))
  .apply();

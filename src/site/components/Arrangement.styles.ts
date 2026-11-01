import { component } from 'ruscus';

import { colors, rhythm, sansSerif, transition, weights } from './styles.ts';

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
        fontWeight: weights.light,
        letterSpacing: '0.075em',
        lineHeight: rhythm(2),
        textTransform: 'uppercase'
      }).is(sansSerif)
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
        const size = rhythm(0.9);

        return e({
          display: 'flex'
        }).children({
          color: e({
            backgroundColor: 'transparent',
            border: `1px solid var(${ids.swatch})`,
            borderRadius: '50%',
            boxSizing: 'content-box',
            display: 'block',
            opacity: 0.5,
            height: size,
            width: size,
            ...transition('opacity')
          }).nested(s => ({
            '& + &': s({
              marginLeft: '-0.25em'
            })
          })).variants(s => ({
            selectable: s().nested({
              '&:hover': s({
                opacity: 1
              })
            }),

            selected: s({
              backgroundColor: `var(${ids.swatch})`,
              opacity: 0.75,
              transform: 'scale(1.25)'
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
  .variants((s, { els }) => ({
    grid: s({
      display: 'block'
    }).nested({
      [els.meta]: s({
        display: 'none'
      })
    })
  }))
  .apply();

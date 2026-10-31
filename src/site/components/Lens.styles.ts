import { component } from 'ruscus';

import { colors, rhythm, transition, weights } from './styles.ts';

export default component('Lens')
  .identifiers({
    swatch: 'variable'
  })
  .elements((e, { ids }) => ({
    section: e({
      position: 'relative'
    }).children({
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

      clear: () => {
        const size = '1.375em';

        return e({
          border: `1px solid ${colors.accent}`,
          borderRadius: '50%',
          height: size,
          fontSize: '0.9em',
          lineHeight: size,
          opacity: 0,
          position: 'absolute',
          right: '0.375em',
          top: '0.05em',
          width: size,
          ...transition('opacity')
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

      expanded: s(),

      filtered: s().nested({
        [els.clear]: s({
          opacity: 0.75
        }).nested({
          '&:hover': s({
            opacity: 1
          })
        })
      })
    })),

    flowers: e(),

    flower: () => {
      const gutter = '0.5em';

      return e({
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        margin: `0 -${gutter}`,
        position: 'relative',
        ...transition('color')
      }).children({
        toggle: e({
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          lineHeight: 3,
          padding: `0 ${gutter}`,
          width: '100%'
        }),

        name: e(),

        count: e({
          fontSize: '0.9em',
          fontWeight: weights.light,
          textAlign: 'center',
          width: '2em'
        })
      }).nested(s => ({
        '& + &': s({
          boxShadow: `inset 0 1px 0 0 ${colors.borderDark}`
        }),

        '&::before': s({
          color: colors.accent,
          content: '"›"',
          fontWeight: weights.light,
          left: `-${gutter}`,
          opacity: 0,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-55%)',
          ...transition('font-size', 'margin', 'opacity')
        })
      })).variants((s, { els }) => ({
        active: s({
          color: colors.textAccent
        }).nested({
          '&::before': s({
            fontSize: '1.25em',
            fontWeight: weights.bold,
            marginLeft: '-0.125em',
            opacity: 1
          }),

          [els.count]: s({
            fontWeight: weights.normal
          })
        }),

        available: s().nested({
          '&:hover': s({
            color: colors.textAccent
          }).nested({
            '&::before': s({
              opacity: 1
            })
          })
        }),

        unavailable: s({
          color: colors.muted
        })
      }));
    },

    colors: e({
      columnGap: '1em',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      justifyItems: 'center',
      margin: `0 -0.25em`,
      rowGap: rhythm(1.5)
    }),

    color: e({
      ...transition('opacity')
    }).children({
      swatch: () => {
        const size = '4em';

        return e({
          backgroundColor: `var(${ids.swatch})`,
          border: `1px solid var(${ids.swatch})`,
          borderRadius: '0.5em',
          display: 'block',
          opacity: 0.9,
          outline: `0 solid var(${ids.swatch})`,
          height: size,
          width: size,
          ...transition('border-color', 'opacity', 'outline')
        });
      },

      count: e({
        fontSize: '0.9em',
        fontWeight: weights.light,
        marginTop: rhythm(0.5),
        textAlign: 'center',
        ...transition('color', 'font-size', 'transform')
      })
    }).variants((s, { els }) => {
      const shift = 2;

      return {
        active: s().nested({
          [els.swatch]: s({
            borderColor: 'rgba(0, 0, 0, 0.75)',
            opacity: 1,
            outlineWidth: `${shift}px`
          }),

          [els.count]: s({
            color: colors.textAccent,
            fontSize: '1em',
            fontWeight: weights.normal,
            transform: `translateY(${shift}px)`
          })
        }),

        available: s().nested({
          [`${els.swatch}:hover`]: s({
            opacity: 1
          })
        }),

        unavailable: s({
          opacity: 0.25
        })
      };
    })
  }))
  .apply();

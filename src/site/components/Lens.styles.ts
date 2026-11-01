import { component } from 'ruscus';

import {
  colors,
  focusable,
  rhythm,
  sansSerif,
  transition,
  weights
} from './styles.ts';

const focusBG = 'rgba(255, 255, 255, 0.075)';

export default component('Lens')
  .identifiers({
    swatch: 'variable'
  })
  .elements((e, { ids }) => ({
    title: e({
      paddingBottom: rhythm(3),
      paddingTop: rhythm(1.25)
    }).children({
      image: e({
        display: 'block',
        margin: '0 auto',
        maxWidth: '100%',
        opacity: 0.9
      })
    }),

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
        }).is(focusable()).children({
          title: e({
            color: colors.accent,
            fontWeight: weights.light,
            fontSize: '1.125em',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }).is(sansSerif),

          icon: e({
            fontWeight: weights.bold,
            transform: 'rotate(90deg)',
            textDecoration: 'none !important'
          })
        }).nested((s, { els }) => ({
          '&:focus-visible': s().nested({
            [els.title]: s({
              textDecoration: 'underline',
              textUnderlineOffset: '0.25em'
            })
          })
        }));
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
        }).is(focusable({
          backgroundColor: focusBG,
          opacity: '1 !important'
        }));
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
        }).is(focusable({
          backgroundColor: focusBG
        })),

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
            marginLeft: '-0.05em',
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
      paddingTop: rhythm(1),
      rowGap: rhythm(1.5)
    }),

    color: () => {
      const radius = '0.375rem';

      return e({
        position: 'relative',
        ...transition('opacity')
      }).children({
        swatch: () => {
          const size = '4.25em';

          return e({
            backgroundColor: `var(${ids.swatch})`,
            border: `1px solid var(${ids.swatch})`,
            borderRadius: radius,
            display: 'block',
            opacity: 0.9,
            outline: `0 solid var(${ids.swatch})`,
            height: size,
            width: size,
            ...transition('border-color', 'opacity', 'outline')
          }).nested(s => ({
            '&:focus-visible': s({
              boxShadow: `0 0 0 2px inset ${colors.bg}`
            })
          }));
        },

        count: () => {
          return e({
            backgroundColor: colors.bg,
            borderRadius: radius,
            bottom: '1px',
            display: 'flex',
            flexDirection: 'column',
            fontSize: '0.8em',
            fontWeight: weights.light,
            justifyContent: 'center',
            padding: '0.5em',
            pointerEvents: 'none',
            position: 'absolute',
            right: '1px',
            textAlign: 'center',
            width: '2.25em',
            ...transition('color', 'transform')
          });
        }
      }).variants((s, { els }) => {
        const transform = 'scale(1.025)';

        return {
          active: s().nested({
            [els.swatch]: s({
              borderColor: 'rgba(0, 0, 0, 0.75)',
              opacity: 1,
              outlineWidth: '2px',
              transform
            }),

            [els.count]: s({
              color: colors.textAccent,
              fontWeight: weights.bold,
              transform: 'translate(-1px, -1px)'
            })
          }),

          available: s().nested({
            [`${els.swatch}:hover`]: s({
              opacity: 0.95,
              transform
            })
          }),

          unavailable: s({
            opacity: 0.25
          })
        };
      });
    }
  }))
  .apply();

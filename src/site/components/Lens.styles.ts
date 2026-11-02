import { component, css } from 'ruscus';

import angleIcon from '../images/icons/angle.svg?url';
import checkIcon from '../images/icons/check.svg?url';
import chevronIcon from '../images/icons/chevron.svg?url';
import closeIcon from '../images/icons/close.svg?url';
import {
  colors,
  focusable,
  rhythm,
  sansSerif,
  transition,
  weights
} from './styles.ts';

const focusBG = 'rgba(255, 255, 255, 0.075)';

const icon = (url: string, size = 'contain') =>
  css({
    backgroundImage: `url("${url}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: size
  });

export default component('Lens')
  .identifiers({
    swatch: 'variable'
  })
  .elements((e, { ids }) => ({
    title: e({
      paddingBottom: rhythm(3),
      paddingTop: rhythm(1.25)
    }).children({
      link: e({
        display: 'block'
      }),

      image: e({
        display: 'block',
        margin: '0 auto',
        maxWidth: '100%',
        opacity: 0.9,
        ...transition('opacity')
      })
    }).variants((s, { els }) => ({
      linked: s().nested({
        [`${els.link}:hover`]: s().nested({
          [els.image]: s({
            opacity: 1
          })
        }),

        [`${els.link}:focus-visible`]: s({
          backgroundColor: focusBG,
          outline: `4px solid ${focusBG}`,
          outlineOffset: 0
        })
      })
    })),

    section: e({
      position: 'relative'
    }).children({
      header: e().children({
        title: () => {
          const pull = '0.825rem';
          const iconSize = '0.65rem';

          return e({
            color: colors.accent,
            fontWeight: weights.light,
            fontSize: '1.125em',
            letterSpacing: '0.05em',
            marginBottom: rhythm(0.75),
            marginLeft: `-${pull}`,
            paddingLeft: pull,
            position: 'relative',
            textTransform: 'uppercase'
          }).is(sansSerif).nested(s => ({
            '&::before': s({
              ...icon(chevronIcon),
              content: '""',
              height: iconSize,
              left: '-0.25em',
              position: 'absolute',
              top: `calc(50% - ${iconSize} / 2)`,
              width: iconSize
            })
          }));
        },

        toggle: e({
          display: 'block',
          textAlign: 'left',
          width: '100%'
        }).is(focusable({}, s => ({
          '&:focus-visible': s({
            textDecoration: 'underline',
            textUnderlineOffset: '0.25em'
          })
        })))
      }),

      clear: () => {
        const size = '1.375em';

        return e({
          ...icon(closeIcon, '70%'),
          border: `1px solid ${colors.accent}`,
          borderRadius: '50%',
          height: size,
          opacity: 0,
          position: 'absolute',
          right: '0.375em',
          top: '-0.2em',
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

      expanded: s().nested({
        [`${els.header.title}::before`]: s({
          transform: 'rotate(180deg)'
        })
      }),

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
      const iconSize = '0.75rem';

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
          ...icon(angleIcon),
          content: '""',
          height: iconSize,
          left: `-${gutter}`,
          opacity: 0,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: iconSize,
          ...transition('margin', 'opacity', 'transform')
        })
      })).variants((s, { els }) => ({
        active: s({
          color: colors.textAccent
        }).nested({
          '&::before': s({
            marginLeft: '-0.1em',
            opacity: 1,
            transform: 'translateY(-50%) scale(1.5)'
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
              opacity: 0.75
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
      rowGap: rhythm(1)
    }),

    color: () => {
      const radius = '0.375rem';

      return e({
        position: 'relative',
        ...transition('opacity')
      }).children({
        swatch: () => {
          const sizeRems = 3.75;
          const size = `${sizeRems}rem`;

          return e({
            backgroundColor: `var(${ids.swatch})`,
            border: `1px solid var(${ids.swatch})`,
            borderRadius: radius,
            display: 'block',
            height: size,
            width: size,
            ...transition('opacity', 'transform')
          }).is(focusable({
            boxShadow: `0 0 0 3px inset ${colors.bg}`
          })).nested(s => {
            const checkSizeRems = 1.75;
            const size = `${checkSizeRems}rem`;

            return {
              '&::before': s({
                ...icon(checkIcon, '60%'),
                backgroundColor: colors.bg,
                borderRadius: '50%',
                content: '""',
                display: 'none',
                left: '50%',
                top: `${(sizeRems - checkSizeRems) / 2}rem`,
                opacity: 0.825,
                position: 'absolute',
                transform: 'translateX(-50%)',
                height: size,
                width: size
              })
            };
          });
        },

        count: e({
          fontSize: '0.9em',
          lineHeight: '1.25rem',
          paddingTop: rhythm(0.5),
          textAlign: 'center',
          ...transition('color', 'font-size')
        })
      }).variants((s, { els }) => {
        const transform = 'scale(1.025)';

        return {
          active: s().nested({
            [els.swatch]: s({
              opacity: 1,
              transform: 'scale(1.0825) !important'
            }).nested({
              '&::before': s({
                display: 'block'
              })
            }),

            [els.count]: s({
              color: colors.textAccent,
              fontSize: '1em',
              fontWeight: weights.bold
            })
          }),

          available: s().nested({
            [`${els.swatch}:hover`]: s({
              transform
            })
          }),

          dark: s(),

          light: s(),

          unavailable: s({
            opacity: 0.25
          })
        };
      });
    }
  }))
  .apply();

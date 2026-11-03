import { component } from 'ruscus';

import { IMAGE_DIMENSIONS } from '../../core/site.ts';
import { scaleBy } from '../display.ts';
import {
  colors,
  focusable,
  rhythm,
  sansSerif,
  transition,
  views,
  weights
} from './styles.ts';

const previewWidth = `${scaleBy(IMAGE_DIMENSIONS.preview, 0.5).width}.px`;

export default component('Arrangement')
  .identifiers({
    swatch: 'variable'
  })
  .css({
    alignItems: 'flex-start',
    display: 'flex',
    gap: rhythm(3)
  })
  .elements((e, { ids }) => ({
    media: e({
      display: 'block',
      flex: `0 1 ${previewWidth}`,
      maxWidth: previewWidth,
      minWidth: 0,
      padding: 0
    }).is(focusable({
      outline: `2px solid ${colors.accent}`
    })),

    image: e(),

    meta: e({
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minWidth: '14rem'
    }),

    details: e({
      fontWeight: weights.light,
      padding: `${rhythm(1)} 0`
    }).children({
      date: e({
        fontSize: '1.75em',
        lineHeight: 1.25
      }),

      mechanic: e({
        color: colors.accent,
        fontSize: '0.9em',
        fontWeight: weights.light,
        letterSpacing: '0.075em',
        marginTop: rhythm(0.5),
        textTransform: 'uppercase'
      }).is(sansSerif)
    }),

    flowers: e({
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      fontSize: '1.125em',
      lineHeight: 1.25,
      justifyContent: 'center',
      marginTop: rhythm()
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
          }).is(focusable({
            opacity: 1,
            transform: 'scale(1.3)'
          })).nested(s => ({
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
        position: 'relative',
        ...transition('color')
      }).is(focusable({}, s => ({
        '&::after': s({
          backgroundColor: colors.accent,
          bottom: 0,
          content: '""',
          height: '3px',
          left: 0,
          marginBottom: '-0.125em',
          position: 'absolute',
          right: 0
        })
      }))).nested(s => ({
        '&:hover': s({
          color: colors.textAccent
        })
      }))
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
  .global((s, { els, ids }) =>
    views({
      compact: {
        [els.details.root]: s({
          paddingTop: 0
        })
      },

      feed: {
        [els.meta]: s({
          fontSize: '0.9em'
        })
      },

      stacked: {
        [els.root()]: s({
          display: 'block'
        }),

        [els.media]: s({
          display: 'block',
          margin: '0 auto'
        }),

        [els.meta]: s({
          marginTop: rhythm(2)
        }),

        [els.flower.colors.color()]: s({
          backgroundColor: `var(${ids.swatch})`,
          opacity: 0.25
        })
      }
    })
  )
  .apply();

import { component } from 'ruscus';

import {
  colors,
  feedGutter,
  focusable,
  rhythm,
  sansSerif,
  transition,
  views
} from './styles.ts';

const statusHeight = rhythm(6);

export default component('Explorer')
  .identifiers({
    sidebarGutter: 'variable',
    sidebarWidth: 'variable'
  })
  .css({
    position: 'relative',
    zIndex: 1
  })
  .elements((e, { ids }) => {
    const sidebarGutter = `var(${ids.sidebarGutter})`;
    const sidebarWidth = `var(${ids.sidebarWidth})`;

    return {
      lens: e({
        bottom: statusHeight,
        left: 0,
        top: 0,
        overflow: 'auto',
        padding: `${rhythm(2)} ${sidebarGutter}`,
        position: 'fixed',
        width: sidebarWidth,
        zIndex: 2
      }),

      gallery: e({
        marginLeft: sidebarWidth,
        padding: rhythm(2),
        paddingTop: rhythm(3),
        position: 'relative',
        zIndex: 1
      }),

      status: e({
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        fontSize: '0.9rem',
        height: statusHeight,
        justifyContent: 'center',
        left: 0,
        padding: `${rhythm(0.5)} ${sidebarGutter}`,
        position: 'fixed',
        width: sidebarWidth,
        zIndex: 3
      }),

      arrangement: e({
        backgroundColor: 'rgb(0 0 0 / 0.75)',
        position: 'fixed',
        left: 0,
        overflow: 'auto',
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 4
      }).children({
        image: e({
          margin: `${rhythm(2)} 5%`,
          position: 'relative'
        }),

        photo: e(),

        close: e({
          backgroundColor: colors.bg,
          borderRadius: '0.375em',
          color: colors.textAccent,
          fontSize: '0.9em',
          opacity: 0.8,
          padding: `${rhythm(0.75)} 1.5em`,
          position: 'absolute',
          right: '1em',
          top: '1em',
          ...transition('opacity')
        }).is(
          sansSerif,
          focusable({
            outline: `2px solid ${colors.accent}`
          })
        ).nested(s => ({
          '&:hover': s({
            opacity: 1
          })
        }))
      })
    };
  })
  .nested((s, { ids }) => ({
    '&': s({
      [`${ids.sidebarGutter}`]: rhythm(3),
      [`${ids.sidebarWidth}`]: '22rem'
    })
  }))
  .global((s, { els, ids }) =>
    views({
      compact: {
        [els.root]: s({
          [`${ids.sidebarGutter}`]: rhythm(2),
          [`${ids.sidebarWidth}`]: '18rem'
        }),

        [els.gallery]: s({
          paddingLeft: '1rem'
        })
      },

      feed: {
        [els.root]: s({
          [`${ids.sidebarWidth}`]: 0
        }),

        [els.lens]: s({
          display: 'none'
        }),

        [els.gallery]: s({
          paddingBottom: rhythm(6),
          paddingLeft: feedGutter,
          paddingRight: feedGutter
        }),

        [els.status]: s({
          backgroundColor: colors.bg,
          borderTop: `1px solid ${colors.borderDark}`,
          boxShadow: '0 -1em 2em 0.5em rgba(0, 0, 0, 0.5)',
          left: 0,
          right: 0,
          height: 'auto',
          padding: 0,
          width: 'auto'
        })
      },

      stacked: {
        [els.arrangement.close]: s({
          marginTop: rhythm(),
          right: '50%',
          top: '100%',
          transform: 'translateX(50%)'
        })
      }
    })
  )
  .apply();

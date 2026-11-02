import { component } from 'ruscus';

import {
  colors,
  focusable,
  rhythm,
  sansSerif,
  transition,
  views
} from './styles.ts';

const statusHeight = rhythm(6);
const gutter = rhythm(3);

export default component('Explorer')
  .identifiers({
    sidebarWidth: 'variable'
  })
  .css({
    position: 'relative',
    zIndex: 1
  })
  .elements((e, { ids }) => {
    const sidebar = `var(${ids.sidebarWidth})`;

    return {
      lens: e({
        bottom: statusHeight,
        left: 0,
        top: 0,
        overflow: 'auto',
        padding: `${rhythm(2)} ${gutter}`,
        position: 'fixed',
        width: sidebar
      }),

      gallery: e({
        marginLeft: sidebar,
        padding: rhythm(2),
        paddingTop: rhythm(3)
      }),

      status: e({
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        fontSize: '0.9rem',
        height: statusHeight,
        justifyContent: 'center',
        left: 0,
        padding: `${rhythm(0.5)} ${gutter}`,
        position: 'fixed',
        width: sidebar
      }),

      arrangement: e({
        backgroundColor: 'rgb(0 0 0 / 0.75)',
        position: 'fixed',
        left: 0,
        overflow: 'auto',
        right: 0,
        bottom: 0,
        top: 0
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
      [`${ids.sidebarWidth}`]: '22rem'
    })
  }))
  .global((s, { els, ids }) =>
    views({
      compact: {
        [els.root]: s({
          [`${ids.sidebarWidth}`]: '18rem'
        }),

        [els.gallery]: s({
          paddingLeft: 0
        })
      }
    })
  )
  .apply();

import { component } from 'ruscus';

import { colors, rhythm, sansSerif, transition } from './styles.ts';

const sidebarWidth = '22rem';
const statusHeight = rhythm(6);
const gutter = rhythm(3);

export default component('Explorer')
  .css({
    gap: rhythm(4),
    position: 'relative',
    zIndex: 1
  })
  .elements(e => ({
    lens: e({
      bottom: statusHeight,
      left: 0,
      top: 0,
      overflow: 'auto',
      padding: `${rhythm(2)} ${gutter}`,
      position: 'fixed',
      width: sidebarWidth
    }),

    gallery: e({
      marginLeft: sidebarWidth,
      padding: rhythm(2)
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
      width: sidebarWidth
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
      }).is(sansSerif).nested(s => ({
        '&:hover': s({
          opacity: 1
        })
      }))
    })
  }))
  .apply();

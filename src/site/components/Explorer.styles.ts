import { component } from 'ruscus';

import { rhythm } from './styles.ts';

const sidebarWidth = '22rem';
const statusHeight = rhythm(6);
const gutter = rhythm(3);

export default component('Explorer')
  .css({
    gap: rhythm(4),
    position: 'relative'
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
    })
  }))
  .apply();

import { component } from 'ruscus';

export default component('Explorer')
  .css({
    display: 'flex'
  })
  .elements(e => ({
    lens: e({
      flex: '0 0 15rem'
    }),

    gallery: e({
      flex: 1
    })
  }))
  .apply();

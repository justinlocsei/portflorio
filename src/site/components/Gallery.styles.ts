import { component } from 'ruscus';

export default component('Gallery')
  .elements(e => ({
    overviews: e({
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(30rem, 1fr))',
      gap: '1em'
    }),

    overview: e()
  }))
  .apply();

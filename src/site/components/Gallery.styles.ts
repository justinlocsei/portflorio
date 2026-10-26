import { component } from 'ruscus';

export default component('Gallery')
  .elements(e => ({
    overviews: e(),

    overview: e()
  }))
  .apply();

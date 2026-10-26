import { component } from 'ruscus';

export default component('Explorer')
  .elements(e => ({
    lens: e(),

    gallery: e()
  }))
  .apply();

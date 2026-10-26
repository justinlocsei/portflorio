import { component } from 'ruscus';

export default component('Header')
  .elements(e => ({
    title: e()
  }))
  .apply();

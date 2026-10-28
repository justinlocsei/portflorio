import { component } from 'ruscus';

export default component('Detail')
  .elements(e => ({
    image: e(),

    flowers: e(),

    flower: e()
  }))
  .apply();

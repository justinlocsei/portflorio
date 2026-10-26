import { component } from 'ruscus';

export default component('Overview')
  .elements(e => ({
    media: e(),

    image: e(),

    meta: e(),

    date: e(),

    flowers: e(),

    flower: e()
  }))
  .apply();

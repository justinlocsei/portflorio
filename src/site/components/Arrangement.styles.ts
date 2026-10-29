import { component } from 'ruscus';

export default component('Arrangement')
  .elements(e => ({
    media: e(),

    image: e(),

    meta: e(),

    details: e().children({
      date: e(),

      mechanic: e()
    }),

    flowers: e(),

    flower: e()
  }))
  .apply();

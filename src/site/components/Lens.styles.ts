import { component } from 'ruscus';

export default component('Lens')
  .elements(e => ({
    section: e().children({
      title: e(),

      content: e()
    }),

    flowers: e(),

    flower: e()
  }))
  .apply();

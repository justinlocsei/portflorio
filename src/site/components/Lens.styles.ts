import { component } from 'ruscus';

export default component('Lens')
  .elements(e => ({
    section: e().children({
      title: e(),

      content: e()
    }),

    flowers: e(),

    flower: e({
      display: 'flex',
      justifyContent: 'space-between'
    }).children({
      name: e(),

      count: e()
    }).variants(s => ({
      available: s(),
      unavailable: s()
    }))
  }))
  .apply();

import { component } from 'ruscus';

export default component('Arrangement')
  .elements(e => ({
    media: e(),

    image: e(),

    meta: e(),

    details: e({
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '0.5em'
    }).children({
      date: e(),

      mechanic: e()
    }),

    flowers: e({
      display: 'flex',
      columnGap: '1em',
      flexWrap: 'wrap',
      marginTop: '1em',
      rowGap: '0.25em'
    }),

    flower: e()
  }))
  .apply();

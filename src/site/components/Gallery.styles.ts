import { component } from 'ruscus';

import { rhythm } from './styles.ts';

export default component('Gallery')
  .elements(e => ({
    overviews: e(),

    overview: e().nested(s => ({
      '& + &': s({
        marginTop: rhythm(4)
      })
    }))
  }))
  .apply();

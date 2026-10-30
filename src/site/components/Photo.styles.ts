import { component } from 'ruscus';

export default component('Photo')
  .css({
    borderRadius: '0.25em',
    boxShadow: '0 0.25em 2em rgb(0 0 0 / 40%)',
    display: 'block',
    height: 'auto',
    maxWidth: '100%'
  })
  .apply();

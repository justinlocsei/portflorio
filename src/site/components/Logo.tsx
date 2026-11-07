import type { VariantsFor } from 'ruscus';

import logoImage from '../images/logo.svg';
import C from './Logo.styles.ts';

export default function Logo({
  variant
}: {
  variant?: VariantsFor<typeof C['root']>;
}) {
  return (
    <a href='/' className={C.root(variant)}>
      <img
        alt='Portflorio'
        className={C.image}
        height={24}
        src={logoImage}
        width={250}
      />
    </a>
  );
}

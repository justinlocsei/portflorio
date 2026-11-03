import logoImage from '../images/logo.svg';
import C from './Logo.styles.ts';

export default function Logo({
  className
}: {
  className: string;
}) {
  return (
    <img
      alt='Portflorio'
      className={`${C.root} ${className}`}
      height={24}
      src={logoImage}
      width={250}
    />
  );
}

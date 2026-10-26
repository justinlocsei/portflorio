import type { Children } from '../react.ts';
import Header from './Header.tsx';
import C from './Page.styles.ts';

export default function Page({ children }: { children: Children }) {
  return (
    <div className={C.root}>
      <header className={C.header}>
        <Header />
      </header>

      <div className={C.body}>
        {children}
      </div>
    </div>
  );
}

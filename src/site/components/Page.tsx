import type { Children } from '../react.ts';
import C from './Page.styles.ts';

export default function Page({ children }: { children: Children }) {
  return (
    <main className={C.root}>
      <div className={C.body}>
        {children}
      </div>
    </main>
  );
}

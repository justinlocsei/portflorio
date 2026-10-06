import type { Children } from '../react.ts';
import C from './Page.module.css';

export default function Page({ children }: { children: Children }) {
  return (
    <main className={C.root}>
      {children}
    </main>
  );
}

import type { Children } from '../ui.ts';
import C from './Page.styles.ts';

export default function Page({ children }: { children: Children }) {
  return (
    <div className={C.root}>
      <div className={C.body}>
        {children}
      </div>
    </div>
  );
}

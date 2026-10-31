import '@fontsource/bitter/300.css';
import '@fontsource/bitter/400.css';
import '@fontsource/bitter/600.css';

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

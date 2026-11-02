import '@fontsource/bitter/latin-300.css';
import '@fontsource/bitter/latin-400.css';
import '@fontsource/bitter/latin-600.css';
import '@fontsource/bitter/latin-ext-300.css';
import '@fontsource/bitter/latin-ext-400.css';
import '@fontsource/bitter/latin-ext-600.css';
import '@fontsource/poppins/latin-300.css';
import '@fontsource/poppins/latin-ext-300.css';

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

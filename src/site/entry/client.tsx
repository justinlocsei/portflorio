import { createRoot, hydrateRoot } from 'react-dom/client';

import { ROOT_ELEMENT_ID } from '../../core/site.ts';
import App from '../App.tsx';

const root = document.getElementById(ROOT_ELEMENT_ID);

if (root) {
  if (import.meta.env.DEV) {
    createRoot(root).render(<App />);
  } else {
    hydrateRoot(root, <App />);
  }
}

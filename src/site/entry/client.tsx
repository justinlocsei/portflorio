import { hydrateRoot } from 'react-dom/client';

import { ROOT_ELEMENT_ID } from '../../core/site.ts';
import App from '../App.tsx';

const root = document.getElementById(ROOT_ELEMENT_ID);

if (root) {
  hydrateRoot(root, <App />);
}

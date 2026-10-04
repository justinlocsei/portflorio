import { renderToString } from 'react-dom/server';

import App from '../App.tsx';

export default function renderPage(): string {
  return renderToString(<App />);
}

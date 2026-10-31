import { renderToString } from 'react-dom/server';

import App from '../App.tsx';

export default function renderApp(): string {
  return renderToString(<App />);
}

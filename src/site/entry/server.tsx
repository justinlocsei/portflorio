import { renderToString } from 'react-dom/server';

import App from '../App.tsx';

export default function renderPage(path: string): string {
  return renderToString(<App path={path} />);
}

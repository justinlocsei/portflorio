import { matchRoute } from '../core/routes.ts';
import { map } from '../core/utils.ts';
import { selectArrangement } from './arrangements.ts';
import Arrangement from './pages/Arrangement.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';

export default function App({ path }: { path: string }) {
  const route = matchRoute(path);

  return !route ? <NotFound /> : map(route).to({
    arrangement: r => {
      const arrangement = selectArrangement(r.arrangement);

      return arrangement
        ? <Arrangement arrangement={arrangement} />
        : <NotFound />;
    },
    home: () => <Home />
  });
}

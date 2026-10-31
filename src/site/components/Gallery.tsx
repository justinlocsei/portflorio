import type { Arrangement as ArrangementType, ViewProps } from '../types.ts';
import Arrangement from './Arrangement.tsx';
import C from './Gallery.styles.ts';

export default function Gallery({
  arrangements,
  view
}: ViewProps & {
  arrangements: ArrangementType[];
}) {
  return (
    <div className={C.root}>
      <ul className={C.overviews}>
        {arrangements.map(arrangement => (
          <li className={C.overview} key={arrangement.id}>
            <Arrangement
              arrangement={arrangement}
              type='overview'
              view={view}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

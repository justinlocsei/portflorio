import type { Arrangement as ArrangementType } from '../types.ts';
import Arrangement from './Arrangement.tsx';
import C from './Gallery.styles.ts';

export default function Gallery({
  arrangements
}: {
  arrangements: ArrangementType[];
}) {
  return (
    <div className={C.root}>
      <ul className={C.overviews}>
        {arrangements.map(arrangement => (
          <li className={C.overview} key={arrangement.id}>
            <Arrangement arrangement={arrangement} type='overview' />
          </li>
        ))}
      </ul>
    </div>
  );
}

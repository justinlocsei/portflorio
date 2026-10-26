import type { Arrangement } from '../types.ts';
import C from './Gallery.styles.ts';
import Overview from './Overview.tsx';

export default function Gallery({
  arrangements
}: {
  arrangements: Arrangement[];
}) {
  return (
    <div className={C.root}>
      <ul className={C.overviews}>
        {arrangements.map(arrangement => (
          <li className={C.overview} key={arrangement.guid}>
            <Overview arrangement={arrangement} />
          </li>
        ))}
      </ul>
    </div>
  );
}

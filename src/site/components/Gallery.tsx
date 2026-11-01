import type {
  Arrangement as ArrangementType,
  ViewMode,
  ViewProps
} from '../types.ts';
import Arrangement from './Arrangement.tsx';
import C from './Gallery.styles.ts';

export default function Gallery({
  arrangements,
  mode,
  view
}: ViewProps & {
  arrangements: ArrangementType[];
  mode: ViewMode;
}) {
  return (
    <div className={C.root(mode)}>
      <ul className={C.overviews}>
        {arrangements.map(arrangement => (
          <li className={C.overview} key={arrangement.id}>
            <Arrangement arrangement={arrangement} mode={mode} view={view} />
          </li>
        ))}
      </ul>
    </div>
  );
}

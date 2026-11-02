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
  onRequestArrangement,
  view
}: ViewProps & {
  arrangements: ArrangementType[];
  onRequestArrangement: (arrangement: ArrangementType) => void;
  mode: ViewMode;
}) {
  return (
    <div className={C.root(mode)}>
      <ul className={C.overviews}>
        {arrangements.map(arrangement => (
          <li className={C.overview} key={arrangement.id}>
            <Arrangement
              arrangement={arrangement}
              mode={mode}
              onSelect={() =>
                onRequestArrangement(arrangement)}
              view={view}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

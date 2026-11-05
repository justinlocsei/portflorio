import type {
  Arrangement as ArrangementType,
  ViewMode,
  ViewProps
} from '../types.ts';
import Arrangement from './Arrangement.tsx';
import C from './Gallery.styles.ts';
import Logo from './Logo.tsx';

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
      <h2 className={C.logo.root}>
        <Logo className={C.logo.image} />
      </h2>

      <ul className={C.overviews}>
        {arrangements.map((arrangement, index) => {
          const anchor = arrangement.id.toString();

          return (
            <li className={C.overview} id={anchor} key={arrangement.id}>
              <Arrangement
                anchor={anchor}
                arrangement={arrangement}
                index={index}
                mode={mode}
                onSelect={() => onRequestArrangement(arrangement)}
                view={view}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

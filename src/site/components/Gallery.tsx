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
  onToggleFlower,
  onRequestArrangement,
  view
}: ViewProps & {
  arrangements: ArrangementType[];
  onRequestArrangement: (arrangement: ArrangementType) => void;
  onToggleFlower: (arrangementID: number, flower: string) => void;
  mode: ViewMode;
}) {
  return (
    <div className={C.root(mode)}>
      <h2 className={C.logo}>
        <Logo variant='header' />
      </h2>

      <ul className={C.overviews}>
        {arrangements.map((arrangement, index) => {
          const { id } = arrangement;
          const anchor = id.toString();

          return (
            <li className={C.overview} id={anchor} key={id}>
              <Arrangement
                anchor={anchor}
                arrangement={arrangement}
                index={index}
                mode={mode}
                onSelect={() => onRequestArrangement(arrangement)}
                onToggleFlower={flower => onToggleFlower(id, flower)}
                view={view}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

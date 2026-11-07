import type { Color } from '../../core/colors.ts';
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
  onToggleColor,
  onToggleFlower,
  onRequestArrangement,
  view
}: ViewProps & {
  arrangements: ArrangementType[];
  onRequestArrangement: (arrangement: ArrangementType) => void;
  onToggleColor: (arrangementID: number, color: Color) => void;
  onToggleFlower: (arrangementID: number, flower: string) => void;
  mode: ViewMode;
}) {
  return (
    <div className={C.root(mode)}>
      <h2 className={C.logo.root}>
        <Logo className={C.logo.image} />
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
                onToggleColor={color => onToggleColor(id, color)}
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

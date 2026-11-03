import { formatDate, getISODate } from '../../core/time.ts';
import { labelMechanic } from '../display.ts';
import type {
  Arrangement as ArrangementType,
  ViewMode,
  ViewProps
} from '../types.ts';
import { useId } from '../ui.ts';
import C from './Arrangement.styles.ts';
import Color from './Color.tsx';
import Photo from './Photo.tsx';

export default function Arrangement({
  arrangement,
  mode,
  onSelect,
  view
}: ViewProps & {
  arrangement: ArrangementType;
  mode: ViewMode;
  onSelect: () => void;
}) {
  const titleId = useId();

  return (
    <article
      aria-labelledby={titleId}
      className={C.root(mode === 'grid' && 'grid')}
    >
      <button
        className={C.media}
        onClick={onSelect}
        type='button'
      >
        <Photo arrangement={arrangement} type='preview' />
      </button>

      <div className={C.meta}>
        <header className={C.details.root}>
          <h3 className={C.details.date}>
            <time dateTime={getISODate(arrangement.date)} id={titleId}>
              {formatDate(arrangement.date)}
            </time>
          </h3>

          <p className={C.details.mechanic}>
            {labelMechanic(arrangement.mechanic)}
          </p>
        </header>

        <ul className={C.flowers}>
          {arrangement.flowers.map(flower => {
            const { name } = flower;
            const flowerActive = view.flowers.has(name);

            return (
              <li
                className={C.flower.root(flowerActive && 'selected')}
                key={name}
              >
                <button
                  className={C.flower.name}
                  onClick={() => view.flowers.toggle(name)}
                  type='button'
                >
                  {name}
                </button>

                <ul className={C.flower.colors}>
                  {flower.colors.map(color => (
                    <li className={C.flower.color} key={color}>
                      <Color
                        active={view.colors.has(color)}
                        id={color}
                        onClick={() =>
                          view.colors.toggle(color)}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

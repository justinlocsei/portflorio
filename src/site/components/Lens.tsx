import { identifiers } from 'ruscus';

import type { DisplayColor } from '../../core/colors.ts';
import { displayColors } from '../../core/colors.ts';
import { summarizeFlowers } from '../../core/flowers.ts';
import type {
  Color as ColorType,
  Flower as FlowerType
} from '../../core/types.ts';
import type { Arrangement, ExplorerView } from '../types.ts';
import type { Children } from '../ui.ts';
import C from './Lens.styles.ts';

type ViewProps = {
  setView: (view: ExplorerView) => void;
  view: ExplorerView;
};

export default function Lens({
  arrangements,
  flowers: allFlowers,
  setView,
  view
}: ViewProps & {
  arrangements: Arrangement[];
  flowers: FlowerType[];
}) {
  const flowers = summarizeFlowers(arrangements);

  return (
    <div className={C.root}>
      <Section title='Flowers'>
        <Flowers
          all={allFlowers}
          available={flowers}
          setView={setView}
          view={view}
        />
      </Section>

      <Section title='Colors'>
        <Colors
          arrangements={arrangements}
          setView={setView}
          view={view}
        />
      </Section>
    </div>
  );
}

function Section({
  children,
  title
}: {
  children: Children;
  title: string;
}) {
  const S = C.section;

  return (
    <section className={S.root}>
      <h2 className={S.title}>{title}</h2>

      <div className={S.content}>
        {children}
      </div>
    </section>
  );
}

function Flowers({
  all,
  available,
  setView,
  view
}: ViewProps & {
  all: FlowerType[];
  available: FlowerType[];
}) {
  const { flowers } = view;

  const inUse = new Map<string, number>(
    available.map(f => [f.name, f.usedIn.length])
  );

  return (
    <ul className={C.flowers}>
      {all.map(flower => {
        const count = inUse.get(flower.name);
        const { name } = flower;

        return (
          <Flower
            available={count !== undefined}
            count={count ?? 0}
            key={name}
            name={name}
            onToggle={() => {
              setView({
                ...view,
                flowers: flowers.includes(name)
                  ? flowers.filter(f => f !== name)
                  : [...flowers, name]
              });
            }}
          />
        );
      })}
    </ul>
  );
}

function Flower({
  available,
  count,
  name,
  onToggle
}: {
  available: boolean;
  count: number;
  name: string;
  onToggle: () => void;
}) {
  const S = C.flower;

  return (
    <li className={S.root(available ? 'available' : 'unavailable')}>
      <button
        className={S.name}
        onClick={onToggle}
        type='button'
      >
        {name}
      </button>

      <span className={S.count}>{count}</span>
    </li>
  );
}

function Colors({
  arrangements,
  setView,
  view
}: ViewProps & {
  arrangements: Arrangement[];
}) {
  const { colors } = view;

  const counts = arrangements.reduce<Record<ColorType, number>>(
    (counts, arrangement) => {
      const colors = new Set(arrangement.flowers.flatMap(f => f.colors));

      for (const color of colors) {
        counts[color] = (counts[color] ?? 0) + 1;
      }
      return counts;
    },
    {} as Record<ColorType, number>
  );

  return (
    <ul className={C.colors}>
      {displayColors().map(color => {
        const { id } = color;

        return (
          <Color
            count={counts[color.id]}
            key={color.id}
            color={color}
            onToggle={() => {
              setView({
                ...view,
                colors: colors.includes(id)
                  ? colors.filter(c => c !== id)
                  : [...colors, id]
              });
            }}
          />
        );
      })}
    </ul>
  );
}

function Color({
  color,
  count,
  onToggle
}: {
  color: DisplayColor;
  count: number;
  onToggle: () => void;
}) {
  const S = C.color;
  const swatch = identifiers(C).swatch;

  return (
    <li className={S.root} style={{ [swatch]: `#${color.hex}` }}>
      <button
        className={S.swatch}
        onClick={onToggle}
        title={color.name}
        type='button'
      />

      <p className={S.count}>{count}</p>
    </li>
  );
}

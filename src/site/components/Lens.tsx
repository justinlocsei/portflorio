import { summarizeFlowers } from '../../core/flowers.ts';
import type { Flower as FlowerType } from '../../core/types.ts';
import type { Arrangement, ExplorerView } from '../types.ts';
import type { Children } from '../ui.ts';
import C from './Lens.styles.ts';

type ViewProps = {
  setView: (view: ExplorerView) => void;
  view: ExplorerView;
};

export default function Lens({
  arrangements,
  flowers,
  setView,
  view
}: ViewProps & {
  arrangements: Arrangement[];
  flowers: FlowerType[];
}) {
  return (
    <div className={C.root}>
      <Section title='Flowers'>
        <Flowers
          all={flowers}
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
  arrangements,
  setView,
  view
}: ViewProps & {
  all: FlowerType[];
  arrangements: Arrangement[];
}) {
  const { flowers } = view;
  const available = summarizeFlowers(arrangements);

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

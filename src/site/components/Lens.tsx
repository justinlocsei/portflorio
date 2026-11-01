import { identifiers } from 'ruscus';

import type { DisplayColor } from '../../core/colors.ts';
import { COLORS, displayColors } from '../../core/colors.ts';
import { summarizeFlowers } from '../../core/flowers.ts';
import type {
  Color as ColorType,
  Flower as FlowerType
} from '../../core/types.ts';
import logo from '../images/logo.svg';
import type { Arrangement, ViewProps } from '../types.ts';
import type { Children } from '../ui.ts';
import { useState } from '../ui.ts';
import C from './Lens.styles.ts';

export default function Lens({
  arrangements,
  flowers: allFlowers,
  view
}: ViewProps & {
  arrangements: Arrangement[];
  flowers: FlowerType[];
}) {
  const flowers = summarizeFlowers(arrangements);
  const filtered = view.flowers.active || view.colors.active;

  return (
    <div className={C.root}>
      <h1 className={C.title.root(filtered && 'linked')}>
        <a
          className={C.title.link}
          href={filtered ? '/' : undefined}
        >
          <img
            alt='Portflorio'
            className={C.title.image}
            height={24}
            src={logo}
            width={250}
          />
        </a>
      </h1>

      <Section
        filtered={view.flowers.active}
        onClear={view.flowers.clear}
        title='Flowers'
      >
        <Flowers
          all={allFlowers}
          available={flowers}
          view={view}
        />
      </Section>

      <Section
        filtered={view.colors.active}
        onClear={view.colors.clear}
        title='Colors'
      >
        <Colors
          arrangements={arrangements}
          view={view}
        />
      </Section>
    </div>
  );
}

function Section({
  children,
  filtered,
  onClear,
  title
}: {
  children: Children;
  filtered: boolean;
  onClear: () => void;
  title: string;
}) {
  const S = C.section;
  const [expanded, setExpanded] = useState(true);

  return (
    <section
      className={S.root(
        expanded ? 'expanded' : 'collapsed',
        filtered && 'filtered'
      )}
    >
      <button
        className={S.header.root}
        onClick={() => setExpanded(!expanded)}
        type='button'
      >
        <span className={S.header.icon}>{expanded ? '‹' : '›'}</span>
        <h2 className={S.header.title}>{title}</h2>
      </button>

      <button
        className={S.clear}
        disabled={!filtered}
        onClick={onClear}
        type='button'
      >
        ×
      </button>

      <div className={S.content}>
        {children}
      </div>
    </section>
  );
}

function Flowers({
  all,
  available,
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
        const { name } = flower;

        const count = inUse.get(name);
        const active = flowers.has(name);

        return (
          <Flower
            active={active}
            available={count !== undefined}
            count={count ?? 0}
            key={name}
            name={name}
            onToggle={() => {
              view.flowers.toggle(name);
            }}
          />
        );
      })}
    </ul>
  );
}

function Flower({
  active,
  available,
  count,
  name,
  onToggle
}: {
  active: boolean;
  available: boolean;
  count: number;
  name: string;
  onToggle: () => void;
}) {
  const S = C.flower;

  return (
    <li
      className={S.root(
        available ? 'available' : 'unavailable',
        active && 'active'
      )}
    >
      <button
        className={S.toggle}
        disabled={!available}
        onClick={onToggle}
        type='button'
      >
        <span className={S.name}>
          {name}
        </span>

        <span className={S.count}>
          {count}
        </span>
      </button>
    </li>
  );
}

function Colors({
  arrangements,
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
        const active = colors.has(id);

        return (
          <Color
            active={active}
            count={counts[color.id] ?? 0}
            key={color.id}
            color={color}
            onToggle={() => view.colors.toggle(id)}
          />
        );
      })}
    </ul>
  );
}

function Color({
  active,
  color,
  count,
  onToggle
}: {
  active: boolean;
  color: DisplayColor;
  count: number;
  onToggle: () => void;
}) {
  const S = C.color;

  const swatch = identifiers(C).swatch;
  const available = count > 0;

  return (
    <li
      className={S.root(
        available ? 'available' : 'unavailable',
        active && 'active',
        COLORS[color.id].lightness
      )}
      style={{ [swatch]: `#${color.hex}` }}
    >
      <button
        className={S.swatch}
        disabled={!available}
        onClick={onToggle}
        title={color.name}
        type='button'
      />

      <p className={S.count}>{count}</p>
    </li>
  );
}

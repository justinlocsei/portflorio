import { summarizeFlowers } from '../../core/flowers.ts';
import type { Children } from '../react.ts';
import type { Arrangement } from '../types.ts';
import C from './Lens.styles.ts';

type Props = {
  arrangements: Arrangement[];
};

export default function Lens({
  arrangements
}: Props) {
  return (
    <div className={C.root}>
      <Section title='Flowers'>
        <Flowers arrangements={arrangements} />
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

function Flowers({ arrangements }: Props) {
  const flowers = summarizeFlowers(arrangements);

  return (
    <ul className={C.flowers}>
      {flowers.map(flower => (
        <li key={flower.name}>
          {flower.name}
        </li>
      ))}
    </ul>
  );
}

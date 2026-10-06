import type { Arrangement as ArrangementType } from '../types.ts';

export default function Arrangement(
  { arrangement }: { arrangement: ArrangementType }
) {
  return (
    <main>
      <article>
        {arrangement.flowers.join(' - ')}
      </article>
    </main>
  );
}

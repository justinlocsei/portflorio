import Page from '../components/Page.tsx';
import type { Arrangement as ArrangementType } from '../types.ts';

export default function Arrangement(
  { arrangement }: { arrangement: ArrangementType }
) {
  return (
    <Page>
      <article>
        <img alt='' src={arrangement.images.full} />
        {arrangement.flowers.join(' - ')}
      </article>
    </Page>
  );
}

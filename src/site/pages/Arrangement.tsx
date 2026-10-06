import Page from '../components/Page.tsx';
import type { Arrangement as ArrangementType } from '../types.ts';

export default function Arrangement(
  { arrangement }: { arrangement: ArrangementType }
) {
  return (
    <Page>
      <article>
        <img
          alt=''
          height={arrangement.images.full.height}
          src={arrangement.images.full.url}
          width={arrangement.images.full.width}
        />
        {arrangement.flowers.join(' - ')}
      </article>
    </Page>
  );
}

import { IMAGE_DIMENSIONS } from '../../core/site.ts';
import Page from '../components/Page.tsx';
import type { Arrangement as ArrangementType } from '../types.ts';

const IMAGE = IMAGE_DIMENSIONS.full;

export default function Arrangement(
  { arrangement }: { arrangement: ArrangementType }
) {
  return (
    <Page>
      <article>
        <img
          alt=''
          height={IMAGE.height}
          src={arrangement.images.full}
          width={IMAGE.width}
        />
        {arrangement.flowers.join(' - ')}
      </article>
    </Page>
  );
}

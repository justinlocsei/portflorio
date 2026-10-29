import Arrangement from '../components/Arrangement.tsx';
import Page from '../components/Page.tsx';
import type { Arrangement as ArrangementType } from '../types.ts';

export default function ArrangementPage(
  { arrangement }: { arrangement: ArrangementType }
) {
  return (
    <Page>
      <Arrangement arrangement={arrangement} type='detail' />
    </Page>
  );
}

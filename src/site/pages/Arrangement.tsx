import Detail from '../components/Detail.tsx';
import Page from '../components/Page.tsx';
import type { Arrangement as ArrangementType } from '../types.ts';

export default function Arrangement(
  { arrangement }: { arrangement: ArrangementType }
) {
  return (
    <Page>
      <Detail arrangement={arrangement} />
    </Page>
  );
}

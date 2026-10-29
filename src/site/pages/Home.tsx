import { arrangements } from '../arrangements.ts';
import Explorer from '../components/Explorer.tsx';
import Page from '../components/Page.tsx';

export default function HomePage() {
  return (
    <Page>
      <Explorer arrangements={arrangements} />
    </Page>
  );
}

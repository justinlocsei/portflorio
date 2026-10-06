import { formatDate, getISODate } from '../../core/time.ts';
import { arrangements } from '../arrangements.ts';
import Page from '../components/Page.tsx';

export default function Home() {
  return (
    <Page>
      <h1>Portflorio</h1>
      <ul>
        {arrangements.map(arrangement => (
          <li key={arrangement.guid}>
            <a href={arrangement.route}>
              <img
                alt=''
                decoding='async'
                loading='lazy'
                src={arrangement.images.thumbnail}
              />
              <time dateTime={getISODate(arrangement.date)}>
                {formatDate(arrangement.date)}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </Page>
  );
}

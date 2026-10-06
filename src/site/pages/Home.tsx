import { formatDate, getISODate } from '../../core/time.ts';
import { arrangements } from '../arrangements.ts';

export default function Home() {
  return (
    <main>
      <h1>Portflorio</h1>
      <ul>
        {arrangements.map(arrangement => (
          <li key={arrangement.guid}>
            <a href={arrangement.route}>
              <time dateTime={getISODate(arrangement.date)}>
                {formatDate(arrangement.date)}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

import type { Arrangement } from '../types.ts';
import C from './Detail.styles.ts';
import Photo from './Photo.tsx';

export default function Detail(
  { arrangement }: { arrangement: Arrangement }
) {
  return (
    <div className={C.root}>
      <div className={C.image}>
        <Photo arrangement={arrangement} type='full' />
      </div>

      <div className={C.flowers}>
        {arrangement.flowers.map(flower => (
          <div className={C.flower} key={flower.name}>
            {flower.name}
          </div>
        ))}
      </div>
    </div>
  );
}

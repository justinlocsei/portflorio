import { IMAGE_DIMENSIONS } from '../../core/site.ts';
import type { ImageID } from '../../core/types.ts';
import { describeArrangement, scaleBy } from '../display.ts';
import type { Arrangement } from '../types.ts';
import C from './Photo.styles.ts';

export default function Photo({
  arrangement,
  type
}: {
  arrangement: Arrangement;
  type: ImageID;
}) {
  const image = arrangement.images[type];
  const size = scaleBy(IMAGE_DIMENSIONS[type], 0.5);

  return (
    <img
      alt={describeArrangement(arrangement)}
      className={C.root}
      decoding='async'
      height={size.height}
      loading='lazy'
      src={image}
      width={size.width}
    />
  );
}

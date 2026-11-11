import type { Color as ColorType } from '../../core/types.ts';
import { labelColor } from '../display.ts';
import C from './Color.styles.ts';

export default function Color({ id }: { id: ColorType }) {
  return (
    <span
      className={C.root(id)}
      title={labelColor(id)}
    />
  );
}

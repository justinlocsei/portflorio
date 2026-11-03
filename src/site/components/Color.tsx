import type { Color as ColorType } from '../../core/types.ts';
import C from './Color.styles.ts';

export default function Color({
  active,
  id,
  onClick
}: {
  active: boolean;
  id: ColorType;
  onClick: () => void;
}) {
  return (
    <button
      className={C.root(active ? 'selected' : 'selectable', id)}
      onClick={onClick}
      type='button'
    />
  );
}

import type { ArrangementImages, Dimensions } from './types.ts';

export const ROOT_ELEMENT_ID = 'root';

export const IMAGE_DIMENSIONS: ArrangementImages<Dimensions> = {
  full: {
    height: 2000,
    width: 3000
  },
  preview: {
    height: 984,
    width: 1476
  }
};

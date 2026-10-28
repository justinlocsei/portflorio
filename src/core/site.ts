import type { ArrangementImages, Dimensions } from './types.ts';

export const ROOT_ELEMENT_ID = 'root';

export const IMAGE_DIMENSIONS: ArrangementImages<Dimensions> = {
  full: {
    height: 3000,
    width: 2000
  },
  preview: {
    height: 1500,
    width: 1000
  }
};

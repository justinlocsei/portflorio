import { assert, describe, it } from 'vitest';

import { getISODate } from './time.ts';

describe('getISODate', () => {
  it('uses an ISO date format', () => {
    assert.equal(
      getISODate(new Date('2026-01-01')),
      '2026-01-01'
    );
  });

  it('returns the current date in ISO format', () => {
    assert.match(getISODate(), /^\d{4}-\d{2}-\d{2}$/);
  });
});

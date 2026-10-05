import { assert, describe, it } from 'vitest';

import { getISODate, isISODate } from './time.ts';

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

describe('isISODate', () => {
  it('reports valid ISO 8601 dates', () => {
    assert.isTrue(isISODate('2026-01-01'));
  });

  it('reports valid ISO 8601 dates with the correct form', () => {
    assert.isFalse(isISODate('2026-01-41'));
  });

  it('reports invalid ISO 8601 dates', () => {
    assert.isFalse(isISODate('2026-01-01-01'));
  });
});

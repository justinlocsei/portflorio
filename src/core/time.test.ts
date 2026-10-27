import { assert, describe, it } from 'vitest';

import { formatDate, getISODate, isISODate, parseISODate } from './time.ts';

describe('formatDate', () => {
  it('uses US date formatting in UTC', () => {
    assert.equal(
      formatDate(parseISODate('2026-01-01')),
      'January 1, 2026'
    );
  });
});

describe('getISODate', () => {
  it('uses an ISO date format', () => {
    assert.equal(
      getISODate(parseISODate('2026-01-01')),
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

describe('parseISODate', () => {
  it('parses calendar dates as UTC midnight', () => {
    const date = parseISODate('2026-01-01');

    assert.equal(date.toISOString(), '2026-01-01T00:00:00.000Z');
  });

  it('rejects invalid calendar dates', () => {
    assert.throws(
      () => parseISODate('2026-2-28'),
      /Invalid ISO date: 2026-2-28/
    );
  });
});

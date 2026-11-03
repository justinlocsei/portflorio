import { assert, describe, it } from 'vitest';

import {
  listArrangementIDs,
  loadArrangements,
  pickArrangement,
  tryStoredID
} from './arrangements.ts';

describe('listArrangementIDs', () => {
  it('returns the storage IDs of all available arrangements', async () => {
    const ids = await listArrangementIDs();

    assert.isNotEmpty(ids);
    assert.include(ids.map(String), '0001');
  });
});

describe('loadArrangements', () => {
  it('returns the stored arrangements', async () => {
    const arrangements = await loadArrangements();

    assert.isNotEmpty(arrangements);

    assert.deepEqual(
      arrangements.map(a => a.storedID),
      await listArrangementIDs()
    );
  });
});

describe('pickArrangement', () => {
  it('returns the arrangement with the given stored ID', async () => {
    const arrangements = await loadArrangements();

    const arrangement = arrangements[0];
    assert.isDefined(arrangement);

    assert.deepEqual(
      pickArrangement(arrangements, arrangement.storedID),
      arrangement
    );
  });

  it('throws an error when the arrangement is not found', async () => {
    const arrangements = await loadArrangements();

    assert.throws(
      () => pickArrangement(arrangements, tryStoredID('0000')),
      Error
    );
  });
});

describe('tryStoredID', () => {
  it('returns the stored ID when it is valid', () => {
    assert.deepEqual(tryStoredID('0001'), '0001');
  });

  it('throws an error when the stored ID is invalid', () => {
    assert.throws(() => tryStoredID('x001'), Error);
  });
});

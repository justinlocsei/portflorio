#!/usr/bin/env node

import { run } from 'larkspur';

import arrangements from './arrangements.ts';
import check from './check.ts';
import components from './components.ts';
import format from './format.ts';
import site from './site.ts';
import test from './test.ts';

await run({
  arrangements,
  check,
  components,
  format,
  site,
  test
});

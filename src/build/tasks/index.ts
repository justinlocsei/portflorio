#!/usr/bin/env node

import { run } from 'larkspur';

import arrangements from './arrangements.ts';
import check from './check.ts';
import test from './test.ts';

await run({ arrangements, check, test });

#!/usr/bin/env node

import { run } from 'larkspur';

import arrangements from './arrangements.ts';
import test from './test.ts';

await run({ arrangements, test });

# Agent instructions

## ID spelling

When referring to an identifier in **prose** (comments, docs, commit messages, test descriptions), write **ID**, not `id`.

In **new code names**, use **ID** as the abbreviation, not `Id`:

- Prefer `arrangementID`, `storedID`, `flowerID`, `ViewFilterID`, `listArrangementIDs`.
- Avoid `arrangementId`, `storedId`, `flowerId`, `viewFilterId`.

Keep lowercase `id` only where an external contract requires it, for example:

- DOM / React: `id`, `useId`, `aria-labelledby`
- Existing data shapes already named `id` (e.g. `arrangement.id`) unless a rename is requested
- Loop variables over manifest keys when mirroring upstream naming (`manifest[id]`)

In tests and comments about identifiers, say **ID** (e.g. “sorts by descending ID”, “invalid color ID”).

## Test layout

In Vitest files, order top-level **`describe` blocks alphabetically** by their title string (e.g. `describe('flowers', …)` before `describe('unpackFlowers', …)`). Keep nested `describe` / `it` blocks in a sensible order within each group; when adding a new top-level suite, insert it in sorted position rather than appending at the end.

# Fleet Dispatch — text in, right lane acts

One message fans out to the right lane. Three slices, three agents, one gate.

## Prefixes (the contract)

| Prefix | Lane | Meaning |
|---|---|---|
| `a:` | A-anthem | music / audio lane |
| `b:` | B-seaglass | visual / finishing lane |
| `c:` | C-ochre | photo / capture lane |
| `f:` | F | craft / unity lane |
| `fleet:` | all lanes | broadcast |
| `me:` | self | note to operator log |
| `status` | — | watch overview request |
| `help` | — | prefix listing |

No prefix = `me:` (operator note). Unknown prefix = `help` response, never a guess.

## Slices

- `parser/` — string in, RouteRequest out. Pure, no I/O.
- `router/` — RouteRequest + lane context in, DispatchPlan out. No sends, only plans.
- `overview/` — LaneStatus[] in, digest text out. The morning check-in formatter.

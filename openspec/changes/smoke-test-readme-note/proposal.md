## Why

The agentic-build pipeline (`.github/workflows/agentic-build.yml`, see `docs/AGENTIC_BUILD.md`) was just wired up and has never been run end-to-end. Before trusting it with a real feature change, it needs a trivial, low-risk change to prove the full loop — propose, review, trigger, headless apply, PR, preview — actually works.

## What Changes

- Add a one-sentence status note to `README.md` mentioning that the unattended agentic-build pipeline is live, linking to `docs/AGENTIC_BUILD.md`.

## Capabilities

Pure documentation change, no spec-level behavior changes. `skip_specs: true` is set in this change's `.openspec.yaml`.

### New Capabilities
(none)

### Modified Capabilities
(none)

## Impact

- `README.md` only. No application code, no dependencies, no build output affected.

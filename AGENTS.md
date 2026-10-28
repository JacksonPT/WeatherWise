# WeatherWise Agent and Contributor Guide

This file is the living operating guide for agents and contributors working in
the WeatherWise repository. Keep it accurate as the project evolves. Update
the repository map, active-change snapshot, and workflow rules in the same
change that introduces a structural or process change.

## Project Overview

WeatherWise is a static, single-page weather application for the CS 555 / SSW
555 Agile Methods Scrum Simulation Project. It uses semantic HTML, CSS, and
vanilla JavaScript to call the OpenWeatherMap API from the browser. There is no
build step, package manager, server, or automated test suite currently in the
repository.

## Current Work Snapshot

- **Active branch:** `feat/sprint-1`
- **Active OpenSpec change:** `sprint-1-weather-mvp`
- **OpenSpec status:** Proposal, design, capability spec, and task artifacts are complete; implementation is next.
- **Baseline:** `main` contains the initial WeatherWise application commit.
- **Working rule:** Do not place a real API key in source control. `config.js` currently contains a placeholder and is required by `index.html`.

Update this snapshot when the active branch, OpenSpec change, or implementation
phase changes. Do not treat it as a substitute for `git status` or OpenSpec
status commands.

## Repository Map

```text
WeatherWise/
├── index.html                         # Semantic application shell and script entry points
├── app.js                              # Browser state, API calls, rendering, events, and persistence
├── style.css                           # Mobile-first design system, layout, themes, and component styles
├── config.js                           # OpenWeatherMap endpoint, API-key placeholder, and defaults
├── README.md                           # Setup, features, structure, and project overview
├── ROADMAP.md                          # Product roadmap and future direction
├── SPRINT_1.md                         # Sprint 1 goal, backlog, tasks, DoD, and retrospective
├── SPRINT_2.md                         # Sprint 2 backlog and follow-on features
├── REPORT.md                           # Scrum report and project artifacts
├── AGENTS.md                           # This guide; update it as the project changes
├── .gitignore                          # OS/editor files, local environment files, and local config
└── openspec/
    ├── config.yaml                     # OpenSpec project configuration
    └── changes/
        └── sprint-1-weather-mvp/
            ├── proposal.md              # Why and scope of the Sprint 1 change
            ├── design.md                # Technical approach and trade-offs
            ├── tasks.md                 # Ordered implementation checklist
            └── specs/
                └── current-weather/
                    └── spec.md          # Observable current-weather requirements
```

### Source-of-truth boundaries

- User-facing behavior belongs in the OpenSpec capability spec and the
  application source files.
- Product direction and sprint planning belong in `ROADMAP.md`, `SPRINT_*.md`,
  and `REPORT.md`.
- Setup and operational instructions belong in `README.md`.
- Agent/contributor workflow belongs here in `AGENTS.md`.
- Do not create parallel files that duplicate an existing source of truth.

## Working in the Codebase

### Before changing code

1. Read this guide and the relevant `README.md`, sprint file, or OpenSpec
   artifact.
2. Check the current branch and working tree:

   ```bash
   git status --short --branch
   ```

3. Inspect existing code before changing it. Preserve unrelated user work.
4. For OpenSpec work, use the change artifacts as the contract and keep
   `proposal.md`, `design.md`, `spec.md`, and `tasks.md` consistent.

### Implementing changes

- Keep the app framework-free unless a separate approved change introduces a
  dependency or build system.
- Preserve the current static-file startup path: `index.html` should remain
  usable with a simple static server.
- Keep API configuration explicit and never commit real credentials.
- Use browser storage only for client preferences and local app state that the
  current product requirements permit.
- Prefer small, focused edits that match the surrounding naming and style.
- Update the relevant README, sprint artifact, OpenSpec task, or this guide
  when behavior or project structure changes.

### Validation expectations

At minimum, validate the changed behavior in a browser or with a documented
manual check. For weather changes, cover valid city search, invalid city
handling, loading behavior, unit changes, keyboard submission, and a 375px
viewport when relevant. Before completing an OpenSpec change, run:

```bash
openspec validate "<change-name>" --type change --strict
git status --short --branch
```

If no automated test or build command exists, say so explicitly in the final
summary rather than implying one was run.

## Commenting and Documentation Standards

Comments should preserve context that is easy to lose, not narrate code that is
already self-explanatory.

### Good comments

- Explain **why** a non-obvious decision exists, especially API constraints,
  browser compatibility choices, accessibility behavior, or data conversions.
- Use short section comments to group meaningful areas of `app.js`, such as
  state, request handling, rendering, and event wiring.
- Document externally visible configuration assumptions and security risks.
- Add JSDoc only when a function's inputs, outputs, side effects, or browser
  constraints are not clear from its name and implementation.

### Avoid

- Comments that merely restate a line of code, such as `// increment i`.
- Large commented-out code blocks. Remove obsolete code or record the reason in
  the relevant OpenSpec/design artifact.
- Vague TODOs with no owner, scope, or follow-up context.
- Comments that claim behavior the code does not implement.

### TODO format

Use a searchable, actionable format when unfinished work must remain in code:

```js
// TODO(owner): Move API requests behind a backend proxy before production use.
```

Link the TODO to an issue or OpenSpec change when one exists. Remove or update
TODOs when the work is completed.

## Branch Naming Convention

Create branches from the current target branch using a lowercase type, a slash,
and a concise kebab-case work name:

```text
feat/<work>
fix/<work>
docs/<work>
chore/<work>
refactor/<work>
test/<work>
```

Examples:

- `feat/sprint-1`
- `feat/city-search`
- `fix/unit-toggle-persistence`
- `docs/update-contributor-guide`

Use `feat/` for new behavior, `fix/` for a defect, and the other prefixes for
their clearly named work. Keep the work portion specific and use hyphens, not
spaces or parentheses. Avoid vague names such as `feat/updates`.

## Commit Naming Convention

Use a Conventional Commit-style message with the same type vocabulary. The
branch uses a slash; the commit uses an optional parenthesized scope:

```text
<type>(<scope>): <imperative summary>
```

Examples:

- `feat(weather): add city search`
- `fix(units): persist Fahrenheit selection`
- `docs(agents): document branch conventions`
- `chore(openspec): add Sprint 1 change artifacts`

Rules:

- Use `feat` for user-visible capability, `fix` for a bug, `docs` for
  documentation, `chore` for maintenance, `refactor` for behavior-preserving
  restructuring, and `test` for test-only work.
- Use an accurate scope when it helps, such as `weather`, `units`, `ui`,
  `openspec`, or `docs`.
- Write the summary in the imperative mood, keep it concise, and do not end it
  with a period.
- Keep each commit focused on one logical change. Do not mix unrelated cleanup
  into a feature or fix commit.
- Do not commit secrets, generated files, editor settings, or local API keys.

## OpenSpec Workflow

For planned behavior changes:

1. Create or select a change under `openspec/changes/<change-name>/`.
2. Keep the proposal focused on why and what changes.
3. Keep the design focused on how and technical trade-offs.
4. Keep specs focused on observable requirements and scenarios.
5. Keep tasks ordered, small, and verifiable.
6. Validate the change before implementation or handoff.
7. Apply tasks on the feature branch and update task checkboxes as work lands.

The current Sprint 1 change is `sprint-1-weather-mvp`. Use `/opsx-apply` when
ready to implement it. Do not mark tasks complete without verifying the stated
behavior.

## Updating This Guide

Update `AGENTS.md` when any of the following changes:

- A file or directory is added, removed, or repurposed.
- The runtime, build process, test process, or API integration changes.
- Branch or commit conventions change.
- A new recurring contributor or agent workflow is established.
- The active OpenSpec change or implementation phase changes.

Keep the guide concise enough to consult during normal work. Prefer updating
the existing section over appending a duplicate rule. Include the guide update
in the same focused commit as the process or structure change when practical.

---
title: AI Dev SDK Project Starter Wizard
description: Turn a fresh clone of a Spryker demoshop into a customer project — one developer interview, then nine orchestrated steps to a verified running shop
last_updated: Aug 11, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, project-starter-wizard, project setup, onboarding, demoshop
template: concept-topic-template
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

## What the skill does

`project-starter-wizard` turns a fresh, un-booted clone of a Spryker B2B or B2B Marketplace demoshop into your customer project. It asks everything once in a developer interview, records your answers in a resumable state file, and then drives nine specialist skills in the one order that works.

The wizard owns the conversation and the flow — it writes almost nothing itself. Each step delegates to a sibling skill that does the transformation work.

Invoke it at the very start of a new project: *"turn this demoshop into our project"*, *"start the project setup"*. It is also the resume entry point — if a previous run left a state file, invoking the skill again skips the interview and continues from the first unfinished step.

## The interview

The interview collects nine sections up front so the run needs no further configuration decisions:

- Project identity — project name, development domain, and Docker namespace
- Namespace — whether to keep `Pyz` or register a custom namespace
- Services — database, search, broker, key-value store, and optional development services
- Stores and region
- Data mode — adapt, clean, generate, or leave the demo data
- Catalog scope
- Localization
- CI setup
- Run mode

## The nine steps

Steps 1 to 7 run before the first boot, because each one changes files the boot reads.

| Step | Skill | What it does |
|------|-------|--------------|
| 1 | `project-ci-generator` | Rebuilds the inherited product CI into a single lean project pipeline |
| 2 | `configure-codebase` | Registers the custom namespace and wires autoload, frontend build, and Codeception. Skipped when the project keeps `Pyz` |
| 3 | `brand-project` | Applies the project identity — name, domain, Docker namespace |
| 4 | `configure-services` | Writes the chosen engines, development services, and applications into `deploy.dev.yml` |
| 5 | `define-stores` | Creates the region and store definitions. Skipped when the data mode is `leave` |
| 6 | `project-data` | Adapts, cleans, generates, or leaves the import data |
| 7 | `cypress-migration` | Replaces the demoshop test suites with a project-owned Cypress baseline. Last pre-boot step, because it reads the output of steps 1, 3, 4, 5, and 6 |
| 8 | `boot-and-verify` | First boot and per-store verification, plus the theming half of step 3 |
| 9 | `translate-content` | Translates storefront content. Runs only when you selected locales to localize |

## Run modes

You choose the run mode in the interview, and the wizard honors it again on resume:

- **Autonomous** — steps 1 to 9 run as one continuous pass. At a reversible decision point the wizard picks the best option and records it in a decision log.
- **Supervised** — the wizard reports a one-line result and asks *"Continue to the next step?"* at each step boundary.

Neither mode relaxes the hard stops. A required manual action, any deletion or data wipe, and any step failure all return control to you in both modes.

## Run artifacts

The run writes four files into the clone's own tree under `.ai-dev/`:

| File | Role |
|------|------|
| `project-setup.md` | The state — interview answers and a step table with per-step status. Resume reads this file |
| `run.log` | The timeline — step boundaries, conditional skips with their reason, hard stops, and every resume |
| `decision-log.md` | The rationale — each autonomous decision with its evidence and how to reverse it |

## What you get at the end

A transformed clone with the project identity and branding, a registered namespace, the chosen services and stores, project-shaped import data, a lean CI pipeline, and a vendored Cypress suite — booted and verified per store by an independent verifier agent, with all changes staged but never committed.

The closing summary flags what still needs a human before go-live, such as a git remote that still points at the demoshop upstream, a still-shipped Spryker logo, or translation debt from locales left as English copies.

## Requirements

- A fresh, un-booted clone of a Spryker B2B or B2B Marketplace demoshop
- An AI tool with the SDK's skills loaded — either through the [Claude Code plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html) or via `ai-dev:setup` for another supported tool

## Related

- [`project-starter-wizard` README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/project-starter-wizard/README.md) — the skill's own reference in the plugin repository
- [AI Dev SDK Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html) — the full reference of every skill and agent this wizard composes
- [AI Dev SDK Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html) — build features on the project once it runs
- [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) — module and `ai-dev:setup` command

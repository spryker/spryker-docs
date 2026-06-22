---
title: AI Dev SDK Customization Workflow
description: Turn a feature idea into a working, reviewed Spryker feature on a committed branch — driven by the spryker-customization orchestrator
last_updated: Jun 22, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, spryker-customization, workflow, prd, customization, automation
template: concept-topic-template
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

## What the skill does

`spryker-customization` is the AI Dev SDK's orchestrator skill. It takes a feature idea and walks it to a working, committed branch in your Spryker project by delegating focused work to the SDK's other skills and agents.

You describe what you want in one sentence. From there, `spryker-customization` invokes the right specialist at each step — for example, `spryker-feature-expert` to research which Spryker primitives apply, `product-requirement-document` to write the spec, `spryker-refresher` to run the post-change commands, `spryker-verifier` to check the feature against the running app. It stops at a commit gate where you approve the diff before it is saved to git.

You do not write code during the run. You make three decisions: what quality bar you want, whether the plan looks right, and whether the final diff goes in.

## Workflow at a glance

![AI Dev SDK customization workflow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/customization-workflow.png)

Each phase delegates to specific skills (pale yellow) and agents (deep amber) — for example, the `spryker-feature-expert` agent researches the relevant Spryker domain during planning, and the `spryker-verifier` agent drives the running storefront and back office to confirm the feature actually works.

## What you get at the end

- A new branch (`ai-customize/<slug>`) with the feature implemented
- Code in your project layer only — your vendor directory is never edited
- A clean refresh — caches, transfers, and frontend builds are all up to date
- Per-criterion verification results with real evidence from the running app — what passed, what did not, why
- A code-review report against the staged diff
- Tests (when you pick the MVP bar)
- The commit waits for your approval; nothing is pushed

If you wanted a product requirement document too, the skill can produce one — by delegating to `product-requirement-document` — as a reusable document under `resources/plan/PRD/` before the build starts.

## Choose your output: PoC or production

You pick one of two bars at the start. The skill asks once and shapes the rest of the run accordingly.

**PoC** — the fastest path to a feature that works. The orchestrator collapses the implementation into the minimum number of classes, lets values be hardcoded where convenient, sticks to a single locale, and skips test generation. Pick this for demos, sales conversations, and quick experiments.

**MVP** — production-grade output. The orchestrator uses Spryker's canonical extension chain (plugin stacks, factory expanders, dependency injection, project-layer transfer and schema XML), covers every configured locale, adds ACL where the feature touches the back office, and writes tests for non-trivial logic. Pick this for code you intend to ship.

Both bars produce a visually integrated feature — new UI elements reuse the project's atomic design components, never raw HTML pasted onto a styled page.

## Where you decide

The skill runs autonomously between three decision points where it pauses for you:

1. **Before planning** — you pick PoC or MVP, and which optional phases run (tests, demo screenshots, etc.).
2. **Before any code is written** — the orchestrator presents the acceptance criteria, the list of files it intends to edit, and one consolidated round of clarifying questions. Nothing touches the disk until you confirm.
3. **Before the commit** — the final diff is staged for you to review. You approve, refuse, or adjust. Branches stay local; pushing is your call.

If verification fails on an acceptance criterion and the skill cannot fix it after a few tries, it surfaces what was attempted and asks you how to proceed rather than silently giving up.

## Requirements

- A running Spryker project (Docker SDK up) with the [AI Dev SDK](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) installed
- An AI tool with the SDK's skills loaded — either through the [Claude Code plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html) or via `ai-dev:setup` for another supported tool

## Related

- [AI Dev SDK Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html) — the full reference of every skill and agent this orchestrator composes
- [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) — module and `ai-dev:setup` command
- [Claude Code Plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html) — how to install the SDK for Claude Code

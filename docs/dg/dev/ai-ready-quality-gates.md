---
title: AI-ready quality gates
description: Bring your Spryker project to the Spryker CI and test standard so that AI can change and upgrade it safely — 3 to 5 times faster and cheaper, with fewer incidents.
last_updated: Nov 17, 2026
template: concept-topic-template
keywords: AI-ready, quality gates, CI, continuous integration, tests, end-to-end tests, Cypress, Playwright, upgrades, upgradability, AI Dev SDK, cost of change, incidents
related:
  - title: Continuous Integration
    link: docs/dg/dev/ci.html
  - title: Upgrade Workflow
    link: docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html
  - title: Workflows, Skills, and Agents
    link: docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html
  - title: Testing Guidelines
    link: docs/dg/dev/guidelines/testing-guidelines/testing-guidelines.html
  - title: Cypress Testing
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: AI Dev SDK installation
    link: docs/dg/dev/ai/ai-dev/ai-dev-installation.html
---

**AI writes the change. Your quality gates prove that it works.**

AI can upgrade a Spryker project, fix a bug, or build a feature in hours instead of weeks. But AI speed is only useful when something confirms that the shop still works after each change. That something is your quality gates: the automatic code checks and tests that run in CI on every change.

This page explains what an AI-ready project looks like, why it costs less to run, and how to get there step by step.

{% info_block infoBox "In 30 seconds" %}

- **The problem:** without quality gates, every change — made by a developer or by AI — must be verified by hand. Upgrades are slow, and customers find the bugs.
- **The fix:** standard Spryker code checks and tests in CI, and every check blocks the change when it fails.
- **The result:** new features, bugfixes, hotfixes, and upgrades become 3 to 5 times faster and cheaper. You also get fewer production incidents and a project that AI can work on safely.

{% endinfo_block %}

## Same AI, two outcomes

The diagram shows the same AI change in two projects. The only difference is the quality gates.

{% include diagrams/dg/ai-ready-quality-gates/two-outcomes.svg %}

Without gates, a person must review every line, and the real test happens in production. With gates, the pipeline rejects a broken change in minutes, and AI fixes it in the same session. A person reviews a change that is already proven to work.

## Why now

Two things changed, and together they make quality gates the best investment in a Spryker project today:

- **Tests became cheap to build.** A strong test base used to take months of manual work. Skills of the [AI Dev SDK](/docs/dg/dev/ai/ai-dev/ai-dev.html) now generate functional and end-to-end tests that follow Spryker patterns, so your team reviews tests instead of writing them from scratch.
- **Verification became the bottleneck.** AI produces code faster than a team can review it by hand. Without automatic checks, you must either slow AI down or accept the risk.

Quality gates turn AI speed into safe delivery.

## The AI multiplier: 3 to 5 times faster

AI alone makes only one part of a task faster: writing the code. In most projects, the larger part of each task is verification by hand and fixes after the release. Quality gates remove these parts. Together, AI and quality gates make a typical development task 3 to 5 times faster and cheaper.

{% include diagrams/dg/ai-ready-quality-gates/multiplier.svg %}

<div class="width-100">

| Task | Without quality gates | With AI and quality gates |
|------|-----------------------|---------------------------|
| New feature | The team builds the feature, then tests the whole shop by hand before the release. Side effects show up in production. | AI builds the feature and its tests with the [Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html). The gates prove that the rest of the shop still works. |
| Bugfix or hotfix | A developer reproduces the bug by hand, fixes it, and hopes that nothing else breaks. A hotfix waits for a manual test. | AI reproduces the bug in a test, fixes it, and the pipeline proves the fix with the [Bugfix Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow.html). A hotfix goes live in hours. |
| Upgrade | Weeks of regression hunting, so the team postpones the upgrade. The gap to the current release grows. | The [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html) updates the code, and the tests catch silent damage before the release. Small, frequent upgrades become routine. |

</div>

The gain grows with each level: a project at level 1 gets almost nothing from AI, because every AI change still needs a full test by hand. See [Where is your project today](#where-is-your-project-today).

## What you get

| Outcome | For the business | For developers |
|---------|------------------|----------------|
| Faster, cheaper upgrades | The upgrade budget goes to new features, not to regression hunting. | The [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html) verifies each step against your tests, not against your memory. |
| Fewer incidents | Customers do not find the bugs. Fewer hotfixes and lost orders. | A failed gate stops a broken change before the merge. |
| Faster security fixes | You apply a Spryker security release in days, not in a full release cycle. | The pipeline proves that the patch breaks nothing. |
| Lower cost of every change | Each change costs less to verify and to release. | AI fixes failed checks in the same session, before a person reviews. |
| Less dependency on individuals | Project knowledge lives in tests, not only in the heads of team members. | New developers and AI agents get fast, exact feedback. |

## Where is your project today

Find the level that describes your project best. Each level up lowers the cost of every future change.

{% include diagrams/dg/ai-ready-quality-gates/maturity-levels.svg %}

<div class="width-100">

| Level | What you see | Your next move |
|-------|--------------|----------------|
| 1 — Unguarded | No automatic checks in CI. The team tests by hand before each release. | Generate a project CI pipeline with the standard Spryker code checks. |
| 2 — Partial | Some checks run, but they are optional or easy to skip. Few project tests. | Make every check block the merge. Add tests for the most critical shop flows. |
| 3 — Guarded | The standard checks run in CI. Some tests exist, with gaps. | Close the gaps. Remove every bypass. |
| 4 — Strict | Every gate blocks. Critical shop flows have functional and end-to-end tests. | Run an AI-driven upgrade and confirm that the pipeline stays green. |
| 5 — AI-ready | AI upgrades and changes the project, and the pipeline proves the result. | Keep the level: every new feature comes with its tests. |

</div>

### Quick self-check

Answer each question with yes or no. Each "no" is a gap to close.

- Does CI run on every pull request, and does a failed check block the merge?
- Do the standard Spryker code checks run: [Code Sniffer](/docs/dg/dev/sdks/sdk/development-tools/code-sniffer.html), [Architecture Sniffer](/docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html), [PHPStan](/docs/dg/dev/sdks/sdk/development-tools/phpstan.html), and the [Evaluator](/docs/dg/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html)?
- Do functional tests cover your custom business logic?
- Do end-to-end tests cover your critical shop flows — for example, login, search, cart, checkout, and order handling in the Back Office? The framework is your choice, for example Cypress or Playwright.
- Is the pipeline free of bypasses, such as `continue-on-error`, optional jobs, skip labels, or a narrowed scope?

For the full list of pipeline stages, see [Continuous Integration](/docs/dg/dev/ci.html#pipeline-structure).

## The path to AI-ready

You do not need a big-bang project. Five steps take a project to the standard, and each step gives value on its own.

{% include diagrams/dg/ai-ready-quality-gates/path.svg %}

1. **Assess.** Use the self-check to find your level and list the gaps.
2. **Plan.** Agree on the gates to restore and on the critical shop flows that need tests first. Start with the flows that make money: checkout and order handling.
3. **Restore gates.** Run `project-ci-generator` to turn the inherited demo shop CI into a lean project pipeline. Then make every check block the merge. Run `static-validation` and `code-review` before each push, so developers and AI agents see the same findings as CI. For details, see [Generate your project CI with the AI Dev SDK](/docs/dg/dev/ci.html#generate-your-project-ci-with-the-ai-dev-sdk).
4. **Add tests.** Run `codecept-functional` for your custom business logic. For end-to-end tests, keep the framework that your project already uses, for example Cypress or Playwright, and make it a blocking gate. If your project has no end-to-end tests yet, start from the Spryker reference: `cypress-migration` creates a project-owned Cypress baseline, and `cypress-tests` covers the agreed flows. `spryker-qa-coverage` turns acceptance criteria into test cases — happy path, negative, authorization, and edge cases.
5. **Prove it.** Run the [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html). An upgrade that ends with a green pipeline is the proof that your project is AI-ready.

All skills are part of the AI Dev SDK. For the full list, see [Workflows, Skills, and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html).

## Strict for new code, ratchet for old code

A project with years of history has old code that fails the new checks. Do not fix everything before you turn on the gates, and do not let the old findings block every change. Use a ratchet instead: the gate is strict for new code, and the list of old findings only becomes smaller.

{% include diagrams/dg/ai-ready-quality-gates/ratchet.svg %}

- **Freeze the old findings.** Record the current findings in a baseline, for example a [PHPStan baseline](/docs/dg/dev/sdks/sdk/development-tools/phpstan.html#baseline) or an [Architecture Sniffer violation baseline](/docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html#violation-baseline). The gate then fails only on new findings.
- **Check the changed code.** Run the `static-validation` skill on the diff, so a developer or AI agent sees only the findings in the code they touched.
- **Make the baseline smaller.** Fix old findings when you touch a module, or let AI fix them in small batches. Never add new entries to the baseline.

## Who does the work

The path is the same for your own team, for your implementation partner, and for Spryker. The AI Dev SDK and the gates are the same for everyone.

Quality gates also make good work visible. A green pipeline at handover is objective proof of quality for the customer and for the partner who built the project.

## FAQ

**Must we fix all old code before we turn on the gates?**
No. Use the [ratchet](#strict-for-new-code-ratchet-for-old-code): strict gates for new code and a baseline for old findings that becomes smaller over time.

**Does this slow down our delivery?**
At the start, a failed gate stops some changes that went through before. After that, delivery becomes faster, because fewer bugs return from production and AI fixes most failed checks before a person reviews.

**Do we need GitHub?**
No. `project-ci-generator` also produces pipelines for GitLab and Bitbucket. For platform setup, see [Set up CI in your repository](/docs/dg/dev/ci.html#set-up-ci-in-your-repository).

**Which tests come first?**
Tests for the flows that make money and the flows that you customized most: login, cart, checkout, and order handling. The coverage check of the [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html) also shows the customizations that have no tests.

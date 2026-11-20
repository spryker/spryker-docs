---
title: Feature Install Workflow
description: Install a Spryker feature into an existing project from its integration guide, checked against the reference demo shop, covered by tests, and with proven release steps — driven by the spryker-feature-install skill
last_updated: Nov 20, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, copilot, spryker-feature-install, find-existing-capability, yves-twig-integration, feature integration, integration guide, release steps, definition of done
template: concept-topic-template
related:
  - title: Workflows, Skills, and Agents
    link: docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html
  - title: Upgrade Workflow
    link: docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html
  - title: Installation
    link: docs/dg/dev/ai/ai-dev/ai-dev-installation.html
---

## Availability

The `spryker-feature-install`, `find-existing-capability`, and `yves-twig-integration` skills are available from version 0.10.0 of the `spryker-ai-dev-sdk` plugin.

To update the plugin, run `/plugin` in Claude Code and update `spryker-ai-dev-sdk` from the `spryker-plugins-official` marketplace. In GitHub Copilot, run `copilot plugin update spryker-ai-dev-sdk@spryker-plugins-official`. For installation instructions, see [Installation](/docs/dg/dev/ai/ai-dev/ai-dev-installation.html).

## What the skill does

`spryker-feature-install` installs a Spryker feature into an existing project: from "not in the project" to "installed, wired, verified, covered by tests, and releasable". It works on any project type — B2B or B2C, with or without marketplace.

Invoke it with *"install the Recurring Orders feature"*, *"add `spryker-feature/x`"*, *"integrate feature X"*, or *"install the X Glue API"*. The `find-existing-capability` skill and the [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html) also hand features to it.

![feature-install](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/feature-install-v2.png)

For the full flow, the design decisions, and the scripts, see the [`spryker-feature-install` README](https://github.com/spryker-sdk/ai-dev/blob/master/plugins/spryker-ai-dev-sdk/skills/spryker-feature-install/README.md) in the plugin repository.

## Why an integration guide alone is not enough

An integration guide lists the steps for a fresh demo shop at the latest release. A real project differs from that in several ways, and a step-by-step copy of the guide fails silently:

- **The guide lists plugins for every scenario.** A project needs only the plugins for its own product type and options.
- **A guide snippet sets a value for a fresh project.** A literal copy replaces the value the project already has. For example, a new secured URL pattern can remove the login protection from all other customer pages.
- **The guide does not name every file.** A feature also changes templates, other modules' dependency providers, OMS processes, data files, and deploy files.
- **The guide is written for a fresh install.** An existing environment does not run its imports, installers, and republish commands on deploy.
- **The guide does not say what the project's modules can take.** A `composer require` can move many more modules than the feature needs, and a module update the feature does not need can break a project customization.

The skill turns the guide into a checklist, compares every step with the reference demo shop, and measures the result.

## How the skills work together

<div class="width-100">

| Skill | Role |
|-------|------|
| `find-existing-capability` | The reuse gate before any new feature work. It searches the Spryker [capability map](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html#capability-map), reads the install status from `composer.lock`, and gives one verdict per capability: extend it, install the missing part, install the feature and then extend it, build only the gap, or build new. It only reports. For an install, it hands over to `spryker-feature-install`. |
| `spryker-feature-install` | Installs the feature, with the phases below. |
| `yves-twig-integration` | The optional storefront step. Integration guides register widgets but do not place them in the project's Twig templates. The skill suggests where each widget belongs, using the vendor templates for what goes where and the project's design for how it looks, and applies only the placements the developer picks. |

</div>

`spryker-feature-install` also uses `project-data` for all data rows, `spryker-refresher` for the commands after each change, the `spryker-verifier` agent for the guide's verification checks, `codecept-functional` and `cypress-tests` for tests, and the detector scripts of `spryker-upgrade`.

## The phases

1. **Preflight and baselines** — checks the environment: the stack, the container's view of the files, `vendor/` against `composer.lock`, and the frontend dependencies. Records baselines of PHPStan, the code sniffer, the tests, the Back Office pages, and the storage and search tables. A baseline that cannot run is a blocker.
2. **Resolve the feature and its release** — finds the feature package and its required features from the capability map, and the release to install:
    - The feature exists at the project's release: it installs at that release.
    - The feature exists only in a later release: the skill moves only the modules the feature needs. When another feature package or a third-party root pin must move, the skill stops and offers the [Upgrade Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow.html).

    The skill always does a Composer dry run and shows every module move before the install.
3. **Collect the sources** — the integration guide and its prerequisite and linked guides, the feature package, and the reference demo shop at the install release, with its history.
4. **Checklist and confirmation** — turns the guide into a checklist with one row per step. A step the parser cannot classify becomes a row that is decided by hand, so no step is lost. Prerequisites that the guide marks as optional are asked about, not installed. Then the skill asks one confirmation question: the feature, the release, the update mode, the optional parts, demo data, the branch, the planned tests, and the commits.
5. **Reconcile with the reference** — compares each row with `b2b-demo-marketplace` at the same release. The reference decides which plugins and in which order; the project's existing configuration is merged, never overwritten. The skill finds the reference's change for the feature in its history and adds every file the guide does not name.
6. **Install** — installs the feature package, moves back every module the feature does not need, and checks the project's overrides against the modules that moved. Then it applies the guide one section at a time and runs the needed commands after each section.
7. **Optional: storefront placement** — the `yves-twig-integration` step.
8. **Verify** — the `spryker-verifier` agent checks each verification step of the guide in the running shop. The baseline tools run again and are compared with the baselines.
9. **Tests** — covers the feature with tests in the suites the project already runs: Codeception functional tests, Glue API tests, or Cypress. The skill ports the reference demo shop's tests for the feature and adds one test per behavior the feature adds.
10. **Release steps** — finds and proves the steps that existing environments need. See [Release steps](#release-steps).
11. **Report** — writes the install report. See [The install report](#the-install-report).

## Definition of Done

A feature install is **done** only when all ten items hold. The `check-dod.php` script decides it from evidence — tool output, lock files, the checklist, and the project files — not from what the assistant writes down. While it says **not done**, the assistant does not call the feature installed, working, or ready, and offers nothing for review.

1. The developer confirmed the scope: the feature, the release, the update mode, and the branch.
2. Every baseline ran and holds a result.
3. Only modules the feature needs moved; every other move has the developer's reason.
4. Every checklist row is decided, and done or skipped with a reason.
5. The decided plugin wiring is in place.
6. Nothing regressed against the baselines, and the frontend builds pass.
7. Every verification step of the guide passed.
8. Passing tests cover the feature, or the developer waived them with a reason.
9. Every data file the install wrote is imported by a manifest that a deploy recipe runs, and every text the assistant wrote is listed for review.
10. Every release step is proven, or the developer accepted shipping it unproven.

**Blockers stop the run when they are found.** A blocker is anything that stops an item from being met and that the install itself cannot fix: a failed login, a baseline that cannot run, missing frontend dependencies, or a decision only the developer can make. The assistant stops in the phase where it finds the blocker and asks: fix it, waive the item with a reason, or stop the run.

## What the scripts check

Every script is a standalone CLI that runs on host PHP, with no Spryker bootstrap.

<div class="width-100">

| Script | What it checks |
|--------|----------------|
| `parse-integration-guide.php` | Turns a guide into checklist rows: composer lines, configuration, schema, transfers, glossary, plugins, navigation, data, console commands, verification steps, and optional scenarios. Reads both guide styles. |
| `check-feature-installed.php` | Which modules and plugin wiring the project already has; whether the decided wiring is in place; which plugins belong to modules the project does not install. |
| `find-feature-change.php` | The pull request that brought the feature into the reference demo shop, and every file of it that no checklist row names. |
| `check-checklist.php` | Whether every row is decided before the install, and done or skipped before the report. |
| `check-needed-moves.php` | For every moved package: whether the feature needs the new version, or whether its old version still satisfies every package that requires it. |
| `check-lock-diff.php` | Packages that moved outside the feature's dependency tree, and dev constraints on the feature. |
| `glossary-key-check.php` | Translation keys that the feature uses or ships and that have no glossary row for a project locale, including mail subjects set in PHP. |
| `check-data-manifests.php` | Whether every data file the install wrote is imported by a manifest that a deploy recipe runs. |
| `compare-baselines.php` | Whether each baseline holds a result, and whether PHPStan, the code sniffer, the tests, the Back Office pages, the storage and search tables, or a frontend build regressed. |
| `diff-release-steps.php` | The commands, imports, republish steps, and environment variables that the deploy recipe does not cover. |
| `dump-state.php` | Dumps every database table and search index without IDs and timestamps, and compares two dumps. |
| `check-dod.php` | The Definition of Done: done or not done, item by item. |

</div>

## Release steps

An integration guide runs its imports, installers, and republish commands by hand on a fresh local install. An existing environment gets only what its deploy recipe runs. The skill lists every command and data file that the recipe does not cover, then proves the list locally:

1. Reset the project to the production branch.
2. Deploy the feature branch with only the normal deployment commands, and dump the state.
3. Reset to a fresh install of the feature branch, and dump the state.
4. Compare the two dumps. Each difference that a command removes is a release step.

The skill asks before each reset, because a reset deletes the local data. The report recommends each proven step either as a recipe entry or as a one-time job.

## The install report

When the Definition of Done is met, the skill writes a short report that the developer can share with the team. It contains:

- The versions: the project's release, the installed feature release, and the latest available feature release.
- What was done, from the customer's and the Back Office user's point of view.
- The branch and the pull request.
- The steps after the deploy.
- A link to the exact version of the integration guide that was followed.
- The guide steps that were not installed, and why.
- What was validated and how, including the texts the assistant wrote that need a review.
- What upgrading the project to the latest release would add to the feature.

Problems found in the project that the install did not cause are not in the report. The skill lists them for the developer as ticket candidates.

## Requirements

- A Spryker project with Composer installed, and host PHP to run the scripts
- A running Docker environment of the project (`docker/sdk`)
- `git` and the GitHub CLI (`gh`), to read the reference demo shop and the integration guides
- An AI tool with the SDK's skills loaded — either through the plugin in Claude Code or GitHub Copilot CLI, or via `ai-dev:setup` for another supported tool. See [Installation](/docs/dg/dev/ai/ai-dev/ai-dev-installation.html).

## Known limits

- The reference is `b2b-demo-marketplace`. For another project type, the skill skips the plugins of capabilities the project does not have, and the reconcile decisions need more review.
- When the reference demo shop never had the feature, the guide is the only source for the files to change.
- The docs site shows only the latest version of each integration guide. When the install release is older, guide steps for module versions the project does not have are skipped, and `check-feature-installed.php` names them.

---
title: AI Dev SDK Upgrade Workflow
description: Upgrade a heavily customized Spryker project to a newer release — driven by the spryker-upgrade skill and its deterministic damage detectors
last_updated: Aug 14, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, spryker-upgrade, upgrade, migration, composer, release
template: concept-topic-template
---

{% info_block warningBox "Experimental module" %}

The AiDev module is experimental and not stable. There is no backward compatibility promise for this module. We welcome your feedback and contributions as we continue to develop and improve this module.

{% endinfo_block %}

## Availability

The `spryker-upgrade` skill is available from `spryker-sdk/ai-dev` version 0.6.4, which ships version 0.4.0 of the `spryker-ai-dev-sdk` Claude Code plugin.

To update the package in your project:

```bash
composer require spryker-sdk/ai-dev:^0.6.4 --dev
```

To update the Claude Code plugin, run `/plugin` in Claude Code and update `spryker-ai-dev-sdk` from the `spryker-plugins-official` marketplace to version 0.4.0 or later. For installation instructions, see [Claude Code Plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html).

## What the skill does

![upgrade](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/upgrade.png)

`spryker-upgrade` upgrades your project's modules and features to a newer Spryker release. It is built for projects with heavy `src/Pyz` customization, where the dangerous part of an upgrade is not the code that stops compiling but the code that keeps running while doing nothing.

The skill combines an orchestrated workflow with a set of deterministic detector scripts. Each script is a standalone CLI that runs on host PHP using reflection or static parsing only, with no Spryker bootstrap — so they also work in CI.

Invoke it with *"upgrade the project"*, *"update to the latest release"*, or any request to bump `spryker-feature/*` or `spryker/*` packages.

## Why silent damage is the real problem

Everything a Spryker project overrides fails quietly when core moves. A dead override still loads, a replaced plugin stack still boots, and a stale template still renders. Nothing errors — the customization simply stops taking effect.

The workflow therefore starts with a different question than "which modules changed". It asks which of your customizations would notice if they stopped working, and whether the upgrade can be verified at all.

## The phases

1. **Coverage check** — measures your override surface against the tests that cover it, and offers to write characterization tests for the gaps. These must be written before the upgrade; written afterwards they pin the upgraded behavior and can no longer detect that it changed.
2. **Preflight and baselines** — records snapshots of overrides and shadowed frontend files, checks for constraint styles that block resolution, and captures pre-existing damage so it is not misattributed to the upgrade.
3. **Constraint resolution** — relaxes patch-locked constraints, then resolves conflicts iteratively. Conflicts arrive in waves, each root bump revealing the next transitive layer.
4. **Detection** — after Composer completes, runs the detectors that find the silent damage.
5. **Resolution** — merges shadowed files, rewires replaced plugin stacks, fixes broken configuration references, and requires a migration guide for every major module bump.

## What the detectors find

| Detector | Damage it catches |
|----------|-------------------|
| `check-test-coverage.php` | Customizations with no test over them, ranked by risk, with the test type that would catch each gap |
| `check-vendor-class-replacement.php` | Project files that declare a vendor namespace and replace a core class outright, so the vendor implementation never loads |
| `check-constraint-style.php` | Patch-locked or exactly pinned constraints that make a feature bump unresolvable |
| `check-typed-members.php` | Untyped overrides of constants and properties that core has since typed — a fatal on class load that aborts the console itself |
| `check-dead-overrides.php` | Project methods overriding a vendor method that the new version deleted, so the project logic stops being called |
| `twig-shadow-map.php` | Shadowed Twig, SCSS, and TypeScript files whose vendor counterparts changed upstream |
| `merge-shadowed-files.php` | Runs a three-way merge for every shadowed file and sorts the outcomes into clean, identical, conflicted, and removed |
| `check-plugin-usage.php` | Vendor plugins that are missing or deprecated after the upgrade, and project plugins implementing a removed interface |
| `check-config-constants.php` | Configuration referencing a vendor constants interface or constant that no longer exists, which breaks bootstrap of every application |
| `list-major-bumps.php` | Every major module bump, with a documentation search URL, changelog URL, and compare URL per package |
| `resolve-constraints.php` | Runs Composer, parses root conflicts, raises the constraints the tree demands, and repeats |
| `unpin-feature-driven-modules.php` | Breaks a cohort deadlock, where a group of modules sharing a dependency must move together |

The detectors keep their snapshots and reports in `.spryker-upgrade/state/` inside the project, created self-gitignoring on first use.

{% info_block infoBox "Order matters" %}

The dependency between the detectors is real. The skill runs them in the correct order — coverage and replacement checks first, then baselines and constraint preflight, then resolution, then post-Composer detection. Running them out of order wastes time on phantom findings.

{% endinfo_block %}

## Run the detectors in CI

Two detectors are cheap enough to gate every pull request, and both catch damage that is otherwise invisible until runtime:

```bash
php $UP/check-typed-members.php     # fatals on class load
php $UP/check-plugin-usage.php      # missing plugins
```

Neither needs a snapshot, a database, or a search backend — only an installed `vendor/` directory. Failing the build on exit code 1 turns "the Back Office returns 500 after deploy" into a red pipeline.

For dependency-bumping pull requests, also wrap the change in a snapshot and verify pair for `check-dead-overrides.php` and `twig-shadow-map.php`, because those compare against pre-upgrade state and cannot work from a single point in time.

You can also gate `check-test-coverage.php` in CI, but gate it on a ratchet rather than on zero: fail when a pull request increases the number of untested overrides. New customization then arrives with a test, instead of the project needing a coverage project before anyone can merge.

## Known limits

No detector covers Propel schema merges, glossary keys, ACL and navigation for new Back Office routes, or pure behavioral change. Those remain process gates and tests, and the skill marks them as such.

Published migration guides are also sometimes stale or absent, so the skill treats the tag diff, not the guide, as the source of truth.

## Requirements

- A Spryker project with Composer installed, and host PHP available to run the detector scripts
- An AI tool with the SDK's skills loaded — either through the [Claude Code plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html) or via `ai-dev:setup` for another supported tool

## Related

- [`spryker-upgrade` README](https://github.com/spryker-sdk/ai-dev/blob/project-setup-wizard/plugins/spryker-ai-dev-sdk/skills/spryker-upgrade/README.md) — the skill's own reference in the plugin repository
- [AI Dev SDK Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html) — the full reference of every skill and agent
- [Upgrade and migrate](/docs/dg/dev/upgrade-and-migrate/upgrade-and-migrate.html) — the manual upgrade and migration guides
- [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) — module and `ai-dev:setup` command

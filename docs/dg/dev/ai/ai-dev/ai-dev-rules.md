---
title: Rules
description: Full reference of the Spryker-specific coding rules that the AI Dev SDK plugin and the ai-dev-setup skill install into your project.
last_updated: Oct 23, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, copilot, github copilot, rules, spryker
template: concept-topic-template
---

The AI Dev SDK installs a set of [Spryker-specific coding rules](https://github.com/spryker-sdk/ai-dev/tree/master/plugins/spryker-ai-dev-sdk/rules) into your project. These rules guide the AI to follow Spryker conventions automatically, without requiring you to explain them in every prompt.

## How the rules reach your project

- **When a session starts** — in a Spryker project without the rules, the plugin offers once to install them. If you accept, the coding agent installs them. The offer does not show in CI, outside a Spryker project, or when the project has a `.ai-dev/no-rules-sync` file.
- **With the `ai-dev-setup` skill** — the full setup installs the rules together with the project context file and the MCP server. Ask for *"only the rules"* to install only the rules; this flow needs no Docker environment and no Composer.
- **With the `ai-dev:setup` console command** — for assistants without the plugin. See [Set up with another assistant](/docs/dg/dev/ai/ai-dev/ai-dev-installation.html#set-up-with-another-assistant).

The rules go to the folder that your coding agent reads:

| Coding agent | Rules folder | Scope by file path |
|--------------|--------------|--------------------|
| Claude Code | `.claude/rules/<rule>.md` | `paths` |
| GitHub Copilot | `.github/instructions/<rule>.instructions.md` | `applyTo` |

A refresh never overwrites a rule file that you changed. Commit the rule files, so that the whole team works with the same rules.

## Rule files


| Rule file | What it enforces |
|-----------|-----------------|
| `business-models.md` | Business model structure and responsibilities |
| `client-zed-communication.md` | Client–Zed gateway communication patterns |
| `controller.md` | Controller conventions and responsibilities, including translatable flash messages |
| `dependency-provider.md` | Dependency provider wiring and plugin stacks |
| `enforce-constants-for-control-flow.md` | Use of constants instead of magic strings in control flow |
| `expander-pattern.md` | Expander pattern for extending transfer objects |
| `factory-pattern.md` | Factory class structure and dependency injection |
| `form-data-loading-performance.md` | Performant data loading in Zed forms |
| `layer-communication.md` | Cross-layer call rules (Presentation → Communication → Business → Persistence) |
| `mapper-pattern.md` | Mapper pattern for transfer-to-transfer and entity-to-transfer mappings |
| `merchant-portal-angular.md` | Merchant Portal Angular components: reuse of installed `@spryker/*` UI components, project-side extension of core, and validation with the `mp:*` scripts |
| `module-config.md` | Module configuration class conventions |
| `naming-conventions.md` | Class, method, and variable naming standards |
| `owasp.md` | OWASP security guidelines applied to Spryker code |
| `performance.md` | Performance best practices (query optimization, caching) |
| `persistence.md` | Persistence layer conventions (repositories, entity managers) |
| `php-code-style.md` | PHP code style rules (PSR compliance, formatting) |
| `plugins.md` | Plugin and plugin interface implementation patterns |
| `table.md` | Back Office table and query container conventions |
| `transfer-object.md` | Transfer object usage and immutability rules |
| `upgradability.md` | Backward compatibility and upgradability guidelines |
| `yves-frontend.md` | Yves storefront Twig, SCSS, and TypeScript: project-level overrides of core components, BEM and JavaScript hook conventions, and validation with the project's npm lint scripts |
| `zed-backoffice-frontend.md` | Back Office Twig, JavaScript, SCSS, and navigation: overrides that extend core blocks, Bootstrap 5 markup, no new jQuery, translated text, safe escaping, and server-side ACL |

The frontend rules — `yves-frontend.md`, `zed-backoffice-frontend.md`, and `merchant-portal-angular.md` — are scoped by file path, so the coding agent loads each one only when you work on files of that frontend.

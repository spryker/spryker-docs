---
title: Project Starter Wizard
description: Turn a fresh clone of a Spryker demoshop into a customer project — one developer interview, then nine orchestrated steps to a verified running shop
last_updated: Oct 23, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, copilot, project-starter-wizard, project setup, onboarding, demoshop
template: concept-topic-template
related:
  - title: Workflows, Skills, and Agents
    link: docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html
  - title: Customization Workflow
    link: docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html
  - title: Installation
    link: docs/dg/dev/ai/ai-dev/ai-dev-installation.html
---

Every Spryker project starts from a demoshop — a complete, working reference shop that you reshape into your customer's project. Doing that by hand means changes across CI configuration, namespaces, deploy files, stores, and demo data, in an order that is easy to get wrong. The `project-starter-wizard` skill handles it for you: one developer interview, then a single orchestrated run that ends in a booted shop, verified store by store.

## What the skill does

![starter](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/setup-v2.png)

`project-starter-wizard` turns a fresh, un-booted clone of the Spryker B2B Marketplace demoshop into your customer project. It collects everything once up front — in a developer interview, or from a setup questionnaire you fill instead. Either way, the answers land in a resumable state file, and the wizard then drives nine specialist skills in the one order that works.

The wizard owns the conversation and the flow — it writes almost nothing itself. Each step delegates to a sibling skill that does the transformation work.

It is also the resume entry point — if a previous run left a state file, invoking the skill again skips the interview and continues from the first unfinished step.

For the full flow, the design decisions, and the known limits, see the [`project-starter-wizard` README](https://github.com/spryker-sdk/ai-dev/blob/master/plugins/spryker-ai-dev-sdk/skills/project-starter-wizard/README.md) in the plugin repository.

## Before you start

The wizard needs the SDK's skills loaded into your AI tool. If you have not done that yet, [install the AI Dev SDK](/docs/dg/dev/ai/ai-dev/ai-dev-installation.html) first.

For this wizard, use the AI Dev SDK plugin in Claude Code or GitHub Copilot: it installs into the coding agent itself and needs nothing from the project, so your tooling is ready on a fresh clone. The `ai-dev:setup` console command is the alternative for other assistants, but it requires an installed project — which a fresh clone is not yet.

The wizard requires plugin version 0.4.0 or later. The demo fast path requires version 0.7.0 or later, and GitHub Copilot requires version 0.8.0 or later. If the plugin is already installed, update it: run `/plugin` in Claude Code, or `copilot plugin update spryker-ai-dev-sdk@spryker-plugins-official` for GitHub Copilot.

{% info_block infoBox "Verify the installation" %}

Type `/spryker-ai-dev-sdk:project-starter-wizard` in Claude Code. The command autocompletes when the plugin is loaded; if it does not appear, run `/reload-plugins` and check the plugin with `/plugin`.

{% endinfo_block %}

## Choose a demo-data strategy

Before starting the wizard, think about which strategy best fits your goal — the choice determines what you need to prepare in advance:

- **Generate demo data.** Prepare product images and a logo before you start; this is optional, but highly recommended because the wizard can use the logo colors in the project theme.
- **Adapt the existing demo data** to the new store structure. For example, existing products receive new prices and store relations.
- **Clean the demo data** so that everything is removed except the minimum required for the project setup.

The wizard does everything itself, except one thing: in generate mode, you supply the images and the logo — the wizard never fabricates them.

{% info_block warningBox "Time and tokens" %}

Adapt and clean are the smoothest options: one boot and a handful of confirmations. Data generation is the most resource-intensive option and requires a significant number of tokens. Real localization — including glossary and catalog translations rather than English stubs — is also resource-intensive and time-consuming. These options are worthwhile when needed, but choose them deliberately.

{% endinfo_block %}

## Start the wizard

Clone the [Marketplace B2B Demo Shop](/docs/about/all/spryker-marketplace/marketplace-b2b-suite.html) and start Claude Code in the clone, without booting or installing the project first:

```text
git clone https://github.com/spryker-shop/b2b-demo-marketplace.git my-project
cd my-project
claude
```

Then describe your project. For example:

```text
We need to set up a project.
Ostrem sells marine hardware to boatyards and refit shops: brass compasses, brass handrails, brass cleats and ropes.
The logo is supplied as SVG in more than one color, with several variants: an icon, a horizontal lock-up with wordmark, a dark app tile, and a simplified favicon.
The images and logo are inside the ostrem-images folder.
```

A shorter prompt such as *"We need to set up a project."* is also sufficient — you can provide the remaining details during the interview.

## The interview

The wizard asks nine short questions and needs no further configuration decisions after them. Each question shows the demo's current default; accept it with one click or override it. Accepting every default is valid.

- **Project identity** — project name, local development domain, one or two brand colors, and an optional logo.
- **Code area (namespace)** — keep the demo's `Pyz` namespace or choose your own private area to keep your code safe from Spryker updates. The wizard proposes a valid name.
- **Services and applications** — everything is enabled by default. Choose what to turn off or replace, including headless mode, the Merchant Portal, Storybook, the Storefront API, and the Backend API. Keep the infrastructure defaults unless your hosting requires otherwise.
- **Stores and region** — describe your stores, including languages, currencies, countries, and timezone. The wizard proposes one region for confirmation; a multi-region setup requires manual follow-up.
- **Demo-data strategy** — confirm the strategy you chose earlier. Adapt asks for a currency exchange-rate table, clean asks nothing extra, and generate asks for your theme, products, categories, prices, image folders, and content language.
- **Catalog scope** (adapt only) — choose the entire demo catalog or a subset.
- **Localization** — off by default, with each language starting as an English copy. Enable it only when you need real translation.
- **Automatic quality checks (CI)** — set up a lightweight check for every change, skip it, or let a developer tune it later.
- **Run mode** — choose autonomous or supervised; see [Run modes](#run-modes).

The wizard summarizes the configuration and asks for confirmation before making any changes. After you confirm, the setup runs without further configuration questions.

### Demo fast path

When the project is for a demo, the wizard asks at most five questions without technical terms. Each question shows a recommended option. When the brief answers a question, the recommended option comes from the brief:

- Is this for a demo? The wizard skips this question when the brief already says so.
- What should the shop be called?
- Which countries, languages, and currencies should the demo show?
- What should happen to the sample products: keep them, replace them with the customer's products, or keep only some categories?
- Should the wizard run through and report when the shop is ready, or check in after each step?

The wizard derives every technical value — namespace, services, region, domain, brand color, and logo — and shows it in the confirmation. When the [Demo Preparation Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-demo-prep-wizard.html) runs the setup, the wizard asks nothing: it takes the answers that the demo preparation already confirmed.

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
| 7 | `cypress-migration` | Replaces the demoshop test suites with a project-owned Cypress baseline |
| 8 | `boot-and-verify` | First boot and per-store verification, including applying the theme |
| 9 | `translate-content` | Translates storefront content. Runs only when you selected locales to localize |

## Run modes

You choose the run mode in the interview, and the wizard honors it again on resume:

- **Autonomous** — steps 1 to 9 run as one continuous pass. At a reversible decision point the wizard picks the best option and records it in a decision log.
- **Supervised** — the wizard reports a one-line result and asks *"Continue to the next step?"* at each step boundary. A good choice for your first run.

In an autonomous run, a plugin hook keeps the run going until all steps are done. When the coding agent tries to end its turn while the state file still has open steps, the hook refuses and names the next step. The hook lets the turn end when the message asks a question that only you can answer, or starts with `NEEDS YOU:`. After three refusals in a row, the hook lets the turn end. The hook needs `php` on the host; without it, the hook does nothing. Each refusal is written to `.ai-dev/hooks.log`.

## When the wizard stops for you

Neither run mode relaxes the hard stops. During the run, the wizard may print `⚠ ACTION NEEDED` and wait for something only you can do:

- **Start Docker or OrbStack** — the wizard cannot start it for you.
- **Update `/etc/hosts`** — this requires sudo. If you skip it, the setup still completes, but browser checks are marked as blocked.
- **Approve destructive actions** — the wizard shows exactly what will be removed and waits for your confirmation.
- **Supply your own images and logo** in generate mode.
- **Point Git at your repository and commit when ready** — the wizard stages files but never commits or pushes.

Any step failure also returns control to you, in both modes.

## Run artifacts

The run writes three files into the clone's own tree under `.ai-dev/`:

| File | Role |
|------|------|
| `project-setup.md` | The state — interview answers and a step table with per-step status. Resume reads this file |
| `run.log` | The timeline — step boundaries, conditional skips with their reason, hard stops, and every resume |
| `decision-log.md` | The rationale — each autonomous decision with its evidence and how to reverse it |

## What you get at the end

A transformed clone with:

- The project identity and branding applied
- A registered custom namespace
- The services and stores you chose
- Project-shaped import data
- A lean, project-owned CI pipeline
- A vendored Cypress test suite

All of it booted and verified per store by an independent verifier agent, with all changes staged but never committed — you review everything before it enters the project's history.

The closing summary flags what still needs a human before go-live, such as a git remote that still points at the demoshop upstream, a still-shipped Spryker logo, or translation debt from locales left as English copies.

## Troubleshooting

- **The wizard has stopped and appears to be waiting.** Look for a line beginning `⚠ ACTION NEEDED`. The wizard is waiting for an action only you can perform, such as starting Docker or OrbStack, adding the `/etc/hosts` entry, or approving a destructive action. Complete the requested action and the wizard continues.
- **The boot fails or the shop does not start.** Check that Docker or OrbStack is running, ports 80 and 443 are available, and your disk has enough free space. A GitHub rate limit may also have interrupted the installation. Follow the wizard's message, fix the issue on your machine, and ask Claude Code to retry. Do not edit project files to force the boot; the wizard is designed to handle this.
- **Data from a previous project appears, or a name or volume collision is reported.** Another project on your machine may already use the same name. Choose a different project name, or remove the previous project's leftover Docker volumes using the safe options provided by the wizard.
- **The storefront does not open in the browser, although the checks passed.** The `/etc/hosts` entry is probably missing. Add the exact entry provided by the wizard, or accept the browser-check limitation. The setup itself has still completed.
- **I selected the wrong stores or demo-data strategy.** Before the boot starts, tell Claude Code what to change. On a fresh clone, the wizard can undo and rerun the configuration from the appropriate point. After the boot, changing stores or the catalog requires the data to be wiped and reloaded; the wizard explains what will be removed before asking for approval.
- **The session closed, or I interrupted the run.** Reopen Claude Code in the same project directory and say *"Continue the project setup."* The wizard reads the completed work and resumes from where it stopped; it does not start over.
- **The setup is slow or uses many tokens.** This is expected in generate mode or with real translation enabled. If you do not need these options, adapt or clean is considerably lighter.
- **The wizard will not start: "not a fresh clone" or "wrong shop".** It runs only on an untouched, un-booted B2B Marketplace demoshop. Start with a clean clone, or ask Claude Code to guide you through restoring the project to a fresh state.
- **A step has failed.** The wizard stops at the failed step and records what happened; it never continues past a failure. Share the exact message with Claude Code so it can check the known issues before attempting a fix.

## Requirements

- A fresh, un-booted clone of the [Spryker B2B Marketplace demoshop](/docs/about/all/spryker-marketplace/marketplace-b2b-suite.html)
- An AI tool with the SDK's skills loaded — see [Before you start](#before-you-start)

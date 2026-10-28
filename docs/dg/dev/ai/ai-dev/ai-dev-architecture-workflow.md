---
title: Architecture Workflow
description: Turn project discovery into a filled architecture/ folder — arc42 sections, C4 diagrams, and a shareable HTML document — driven by the architecture-prep skill
last_updated: Oct 23, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, copilot, architecture-prep, architecture as code, arc42, C4, documentation
template: concept-topic-template
related:
  - title: Architecture as Code
    link: docs/dg/dev/architecture/architecture-as-code.html
  - title: Workflows, Skills, and Agents
    link: docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html
  - title: Installation
    link: docs/dg/dev/ai/ai-dev/ai-dev-installation.html
---

## Availability

The `architecture-prep` skill ships in the `spryker-architecture` plugin, which is separate from `spryker-ai-dev-sdk`. Install it the same way, and alongside it — the architecture skill uses skills from the SDK plugin where they are available. For installation steps, including setup with assistants other than Claude Code, see [Installation](/docs/dg/dev/ai/ai-dev/ai-dev-installation.html).

## What the skill does

[Architecture as Code](/docs/dg/dev/architecture/architecture-as-code.html) applies the idea behind Infrastructure as Code to architecture: it lives in your project as code, built on proven industry standards — arc42 for the structure, the C4 model for the views, and Mermaid for diagrams as code — instead of in a slide deck or a wiki page. Spryker ships it as the `architecture/` folder.

The `architecture-prep` skill maps your project's architecture knowledge onto that standard.

## Why run it

**It gets you to a shareable architecture record fast.** You do not have to work out where to start, learn what each section is for, or decide where a given fact belongs. Bring what you already have — a wiki page, a PDF, a requirements document — or nothing at all, and the skill asks you instead. Either way you end up with a consistent, readable `architecture/` folder you can take to your architecture stakeholders.

**It tells you what to work on next.** The skill is built for Spryker commerce projects, so it knows the areas every project has to settle. As it maps your knowledge onto the structure, it marks what is still open: the gaps you need answers to, the architectural risks your requirements already imply, and the topics that need their own solution design. You come away with a draft and a clear view of where to deep dive to keep the architecture under control.

## How to invoke

Run it from the root of your Spryker project. If the project has no `architecture/` folder yet, the skill creates one from the reference structure before it starts.

Describe what you want in your own words:

```text
Prepare the architecture folder for this project
```

```text
Document the system context and the integrations
```

You can also name the skill directly with `/architecture-prep`.

## Three ways to provide input

| Input | What happens |
|---|---|
| Nothing prepared | The skill interviews you in batched questions |
| Documents you already have | The skill reads them first and asks only about genuine gaps |
| A target architecture document | The document replaces the interview |

If you provide requirements documents, an RFP, discovery notes, or a target architecture write-up, the skill mines them for answers before asking anything. It shows you what it derived, with the evidence behind each answer, so you can correct it. Answers you do not confirm stay marked as assumptions in the finished document.

## Progressive questions

The question bank has four levels of depth, and you answer only as far as your project needs:

| Level | Covers | Questions |
|---|---|---|
| 1 | Vision, actors, external systems, markets, quality goals | 9 |
| 2 | Hosting, pricing, availability, payment, integrations, volumes, migration | 21 |
| 3 | Detail behind any topic Level 2 flagged as non-standard | 21 |
| 4 | Glossary and release cadence | 2 |

Most questions are conditional: they open only when an earlier answer calls for them. A single-market project with standard pricing and stock skips most of Level 3.

Four capability gates — pricing, availability, payment, and assortment — each ask one question at Level 2. Detail follows at Level 3 only where you answer that the topic is not standard, so depth is chosen per topic rather than once for the whole project.

## What it produces

In the `architecture/` folder:

- The 12 arc42 sections, filled with your project's content.
- A C4 system context diagram and a C4 container diagram, as Mermaid.
- Sequence diagrams for the flows you identify as important or risky.
- Stubs for the Solution Designs and architecture decisions the project needs, each holding its own open questions.
- `preview.html` and `preview-standalone.html` for review, and a PDF export for sign-off.

The standalone preview is one self-contained file with every section and diagram baked in. It opens by double-click, which makes it the artifact to share with stakeholders who do not work in the repository.

## What it does not do

The skill establishes the architecture. It does not design solutions.

It documents actors, systems, their containers, and the connections between them. Roles, scopes, message sequences between components, field mappings, and error handling need design work and more context than an architecture intake carries. Where a topic needs that depth, the skill creates a Solution Design stub and records the open questions in it, rather than guessing.

Solution Designs and architecture decision records are identified, never authored, and never marked as accepted on your behalf.

## Honest gaps over invented content

A gap is one line naming what is missing and who can answer it. The skill does not derive missing figures, size anything against numbers you did not give, or fill a section with plausible content.

Expect plenty of them on a first pass. A record full of named gaps is more useful than one that reads as complete but is not.

## Modes

| Mode | Behavior |
|---|---|
| Gated | Confirms with you before writing each batch of sections |
| Autonomous | Interviews once, then writes everything and logs its decisions |

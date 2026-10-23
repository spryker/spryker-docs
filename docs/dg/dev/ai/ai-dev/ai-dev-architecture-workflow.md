---
title: Architecture Workflow
description: Turn project discovery into a filled architecture/ folder — arc42 sections, C4 diagrams, and a shareable HTML document — driven by the architecture-prep skill
last_updated: Oct 23, 2026
label: early-access
keywords: ai, ai-dev, claude, claude code, architecture-prep, architecture as code, arc42, C4, documentation
template: concept-topic-template
---

## Availability

The `architecture-prep` skill ships in the `spryker-architecture` Claude Code plugin, which is separate from `spryker-ai-dev-sdk`. Install it from the same marketplace:

```text
/plugin marketplace add spryker-sdk/ai-dev
/plugin install spryker-architecture@spryker-plugins-official
```

Restart your Claude Code session after installing. For general installation instructions, see [Claude Code](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code.html).

## What the skill does

Every Spryker project carries an `architecture/` folder: the project's architecture as version-controlled Markdown and diagrams-as-code, following the arc42 template and the C4 model. For the standard itself, see [Architecture as Code](/docs/dg/dev/architecture/architecture-as-code.html).

Filling that folder by hand is slow, and the result depends on who does it. The `architecture-prep` skill interviews you about the project, grounds what it learns in Spryker documentation, and writes the folder for you.

Run it from the root of any Spryker project or demoshop. If the project has no `architecture/` folder yet, the skill creates one from the standard template before it starts.

## How to invoke

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

Where you do not have an answer, the document says so: a single line naming what is missing and who can answer it. The skill does not derive missing figures, size tests against numbers you did not give, or fill a section with plausible content.

A document full of named gaps is the expected outcome of an early interview, and it is more useful than one that reads as complete but is not.

## Modes

| Mode | Behavior |
|---|---|
| Gated | Confirms with you before writing each batch of sections |
| Autonomous | Interviews once, then writes everything and logs its decisions |

## Related

- [Architecture as Code](/docs/dg/dev/architecture/architecture-as-code.html)
- [Workflows, Skills, and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html)
- [Claude Code](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code.html)

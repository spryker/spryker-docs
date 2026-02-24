---
title: Architecture as Code
description: Learn how to implement Architecture as Code in your Spryker project using industry standards like arc42, C4 Model, and diagrams-as-code to maintain living, version-controlled documentation.
keywords: Architecture as Code,arc42,C4 Model,diagrams-as-code,diagram
last_updated: Feb 20, 2026
template: concept-topic-template
related:
  - title: Architectural Convention
    link: /docs/dg/dev/architecture/architectural-convention.html
  - title: Modules and Application Layers
    link: /docs/dg/dev/architecture/modules-and-application-layers.html
---

Well-documented project architecture enables faster internal and external onboarding, passes audits cleanly and aligns teams on requirements. Without it, your system becomes a black box that only the original developers understand.

**Architecture as Code** treats architecture documentation like code, similarly to the Infrastructure-as-Code concept. Instead of storing architecture in binary formats or external tools (Word, PowerPoint, Visio, Confluence) that become outdated quickly, you store and maintain architecture documentation in version control alongside your implementation.

Spryker ships the architecture/ folder with a complete Architecture as Code structure with its demoshop codebase. You can refer to `architecture/README.md` that describes how to work with it. Below, you find all the general information about the structure and principles. We go into the details of each aspect to help you understand and extend this architecture documentation in your project.

{% info_block infoBox "Existing projects" %}

If your project is based on a Spryker release before 202602.0, refer to the [Spryker B2B Demo Marketplace](https://github.com/spryker/b2b-demo-marketplace) master branch source code to see how the Architecture as Code structure is implemented and to copy the "architecture/" folder into your project.

{% endinfo_block %}

## Why Architecture as Code

Traditional architecture documentation suffers from several challenges:

- **Documentation drift** - Binary formats stored separately from code become outdated quickly
- **Version control gaps** - Specialized tools do not integrate with Git workflows
- **Collaboration barriers** - Requires specialized software and binary file merging
- **AI limitations** - AI tools understand code and Markdown effectively but struggle with proprietary formats and binary documents

Architecture as Code solves these problems:

- **Version controlled** - Store in Git alongside implementation. Track every change with full history.
- **AI-ready** - Markdown and diagrams-as-code enable AI assistance, automated validation, and intelligent analysis.
- **Standard formats** - Use industry standards (arc42, C4, ADRs, Mermaid) that external teams understand immediately.
- **Collaborative** - Review through pull requests. No special tools required—only a text editor.
- **Living documentation** - Update during development, not after. Documentation evolves with your system.

## Core Principles

**Standards over invention** - Use industry-proven formats and standards (arc42, C4, ADRs, Mermaid) instead of custom documentation.

**Minimal but sufficient** - Start simple. Prioritize clarity and expansion over completeness on day one.

**Architecture is code** - Write in plain text, store in Git, review through pull requests, deploy automatically.

## Concepts and Choices

### arc42

[arc42](https://arc42.org/) is a proven template for architecture documentation used globally across industries.

**Why arc42 fits Spryker projects:**

Spryker projects vary dramatically in complexity—from simple B2C shops to complex B2B marketplaces with extensive integrations and order management systems. arc42 is flexible enough to cover architecture of any complexity and scales as your Spryker implementation grows. You can start simple with minimal sections and expand as your architecture requires more detail.

The template includes 12 sections (described below) covering all architectural aspects. Section 4 (Solution Designs) provides RFC-style exploration templates. Section 9 (Architecture Decisions) uses ADRs to document decisions with context and consequences. This workflow—explore with Solution Designs, then document decisions with ADRs—ensures thoughtful architecture evolution.

### C4 Model

[C4 Model](https://c4model.com/) provides a hierarchical approach to system visualization with four levels of abstraction.

**Why C4 fits Spryker architecture:**

Spryker architecture unfolds naturally through C4 layers—start with the system context, zoom into containers (Yves, Zed, Client, databases, services), then dive deeper into layers and components as needed. This progressive detail matches how Spryker complexity reveals itself. The entire Spryker feature set can be shown using this unfolding approach.

**Flexibility advantage:**

You control the depth. Start at C1 (context) and continue only as deep as your documentation needs require. Given limited architect time, this flexibility is essential—stop at the level appropriate for your stakeholders and complexity.

### Mermaid and PlantUML

**Mermaid** - Our primary choice for diagramming-as-code:

- Renders automatically in GitHub and GitLab, and can be rendered via plugins in popular IDEs
- No proprietary tools required
- Covers 90% of diagram needs: flowcharts, sequences, C4 diagrams
- Online editor at [mermaid.live](https://mermaid.live/) for convenient editing and better visualization than most IDEs

**PlantUML** - For precision when needed:

- Essential for Entity-Relationship Diagrams where field-level precision matters
- Online editor at [plantuml.com](https://www.plantuml.com/plantuml/) for live editing and preview

## What Comes Out of the Box

We provide templates with clear structure and minimal context, plus examples of the most common diagram types (C4, data flow, integration, sequence) and documentation patterns (ADRs, Solution Designs). AI tools work most efficiently when they see the methodology (like arc42), understand the structure, and have examples to follow. This approach enables you to generate architecture documentation much faster with AI assistance.

Templates provide examples and structural guidance—you should adapt content to your project's context. You do not need to implement all sections immediately; remove or keep unused sections based on your documentation strategy.

### Folder Structure

```text
architecture/
├── 01-introduction-and-goals.md           # Requirements, quality goals, stakeholders
├── 02-constraints.md                      # Technical, organizational constraints
├── 03-system-scope-and-context.md         # System boundaries, external interfaces
│                                          # Includes: External systems and integration tables
├── 04-solution-designs/                   # RFC-style exploration documents
│   ├── README.md                          # Workflow explanation
│   └── sd-000-template.md                 # Solution design template
├── 05-building-block-view.md              # System decomposition
├── 06-runtime-view.md                     # Behavior and interactions
├── 07-deployment-view.md                  # Infrastructure topology
├── 08-crosscutting-concepts.md            # Patterns spanning components
├── 09-architecture-decisions/             # Architecture decision records
│   ├── README.md                          # ADR workflow and sources
│   └── adr-000-template.md                # ADR template
├── 10-quality-requirements.md             # Performance, scalability, testing
│                                          # Includes: Volume planning, testing strategy
├── 11-risks-and-technical-debt.md         # Known issues and mitigation
├── 12-glossary.md                         # Domain terminology
├── diagrams/
│   ├── c4/
│   │   ├── c1-system-context.mmd          # System context diagram
│   │   ├── c2-spryker-container.mmd       # Container diagram
│   │   └── c3-component-diagram.mmd       # Component diagram
│   ├── data-flow/
│   │   └── product-price-data-flow.mmd    # Price data flow example
│   ├── integration/
│   │   └── product-price-integration.mmd  # Integration overview with protocols
│   ├── sequence/
│   │   ├── api-payment.mmd                # Payment flow
│   │   ├── publish-sync.mmd               # Publish and Sync process
│   │   └── punchout-greenwing-integration.mmd  # PunchOut example
│   └── erd/                               # Entity-relationship diagrams (PlantUML)
└── README.md                              # Quick start and overview
```

### Diagram Organization and Best Practices

You have two approaches to managing diagrams. Choose based on your documentation use case.

**Approach 1: Inline Diagrams**

Write diagram code directly in markdown using code fences:

```mermaid
flowchart LR
    A --> B
```

**Pros:** Diagrams are visible immediately; self-contained

**Cons:** Increases file size; duplicates code if reused

**Approach 2: External Diagram Files**

Store diagram code in `/diagrams/` folder and reference via links:

```markdown
[C1 System Context](diagrams/c4/c1-system-context.mmd)
```

**Pros:** Single source-of-truth; cleaner markdown; scalable

**Cons:** Requires clicking to view (less immediate)

**Choosing Your Approach**

This template uses **Approach 2** for scalability and maintainability, but projects can mix both—use external files for core views, inline for one-off diagrams.

**Universal Color Scheme:**

All diagrams use colors optimized for both light and dark modes:

- Orange `#E67E22` - Communication layer
- Blue `#2980B9` - Backend services, APIs
- Green `#27AE60` - Web apps, external systems
- Purple `#9B59B6` - Storage (databases, caches)
- Gray `#95A5A6` - Infrastructure

### Templates and Guidelines

**Solution Design Template** (`04-solution-designs/sd-000-template.md`):

- Metadata section (status, date, stakeholders)
- Problem statement
- Goals and requirements
- Proposed solution with diagrams
- Implementation plan
- Trade-offs and alternatives

**ADR Template** (`09-architecture-decisions/adr-000-template.md`):

- Standard ADR structure
- Status tracking
- Context, decision, consequences
- Links to related decisions

**Volume Planning Table** (Section 10):

Pre-structured table for capacity planning covering:

- Catalog entities (products, categories, prices)
- Cart constraints
- User load projections
- B2B customers structure
- Marketplace metrics
- Internationalization requirements
- Orders and infrastructure

## Getting Help

### Resources

- **arc42 Documentation**: [https://arc42.org/](https://arc42.org/)
- **C4 Model Guide**: [https://c4model.com/](https://c4model.com/)
- **Mermaid Syntax**: [https://mermaid.js.org/](https://mermaid.js.org/)
- **ADR Guidelines**: [https://adr.github.io/](https://adr.github.io/)

### Common Questions

**Q: Do I need to fill in every arc42 section?**

A: No. Fill in what is relevant for your project. Some sections may remain minimal.

**Q: Can I add custom sections?**

A: First, check all 12 arc42 sections — the standard format covers most architectural concerns. If no existing section fits your content, you can add a custom section. Ensure the section purpose is clear and describe it in the README.md file.

**Q: How detailed should diagrams be?**

A: For C4 diagrams, follow the levels: Context (high-level), Container (more detail), Component (detailed). For other diagram types (data flow, integration, sequence), follow industry standards for that specific notation.

**Q: When should I create an ADR vs Solution Design?**

A: Use Solution Design for exploration. Use ADR for documenting the final decision.

**Q: Can I use different diagram notations?**

A: Yes. The choice is yours—we do not limit you to Mermaid or PlantUML. Ensure your notation follows the core principles: viewable by people, understandable by AI tools, and ideally diagrams-as-code (text-based format in version control).

**Q: Will diagrams-as-code replace whiteboards and visual editing tools?**

A: No. The art of creating and drawing diagrams — whether on whiteboards, visual tools, or pen and paper — remains valuable. Diagrams-as-code is for documenting what you have drawn and decided. Use whatever tools help you think and collaborate, then capture the final result as code for version control and documentation.

**Q: Can I use images as diagrams instead of diagrams-as-code?**

A: Yes, it is better to have image diagrams than no diagrams at all, but understand the trade-off. Hand-drawn or visually edited diagrams often look more polished than generated ones. However, images are not as understandable or generable by AI (at least currently) and lack version control benefits. You can use both: include beautiful images for presentations and stakeholder communication, alongside diagrams-as-code for AI assistance and documentation processes.

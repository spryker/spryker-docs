---
name: writing-external-integration-guidelines
description: Use when asked to write architecture guidance, an integration guideline, or a decision document for
  integrating a class of external system with Spryker — CMS, EDI, ERP, PIM, search, or similar — especially when
  sales, a CTO, and solution architects each need their own version.
---

# Writing External Integration Guidelines

## Global conventions

Diagrams are authored as Mermaid, published as SVG, with the Mermaid source kept beside the image in a
`{% comment %}` block so it stays editable. The docs site renders neither Mermaid nor kramdown attributes.

## Overview

An integration guideline answers one question for a customer who already runs a system of a given class: how does
it fit together with Spryker, and what has to be decided along the way. It is not one document but a set — one per
audience, each a lossy view of the same facts. The deepest document holds the facts; the shorter ones compress it.

**The subject is the class, never a product.** The guideline covers a class of external systems, like CMS, or EDI,
or ERP. It's not about a specific one like Storyblok or SAP.
Everything that generalizes across the class belongs in it; everything true of only one vendor does not,
unless selected as an example and asked for.
The bridge from class to instance is the capability assessment: the guideline states what to establish about whichever
instance the customer runs, and what each answer rules out.

**Core principle: write the deepest document first and compress downward.** Writing short-first, or writing the set
in parallel, produces documents that contradict each other — a claim survives in the short one after it was cut from
the deep one. Order: SA/TL, then CTO, then sales.

**Assume an expert reader.** These audiences run projects for a living. The guideline carries what is specific to
integrating this class of system, and nothing about how to run a project — no phase plans, no sign-off checklists, no
guidance on stakeholder communication or estimation practice.

Two tests, pulling in opposite directions, and content has to pass both:

- **Does it generalize across every product in the class?** If it is true of one vendor only, it does not belong.
- **Would it read the same in a guideline about a different class of system entirely?** If yes, it is generic
  delivery advice and does not belong either.

## Step 1: Interview

Ask all eight before writing anything.

| # | Question | Default if the user has no preference |
| --- | --- | --- |
| 1 | **The class of external system** — CMS, EDI, ERP, PIM, search, or another; what is in scope, what is out of scope, and any specific requirements | none, must be answered |
| 2 | **The constants** — what holds true in every strategy, and *why*: which system owns which data, and which capabilities never move to the external system. Also its inverse: what is negotiable | none, must be answered |
| 3 | **The discriminating question, and its answers** — the one question whose answers *are* the strategies | none; "derive it from the sources" is a valid answer |
| 4 | **Target audience** — which groups get their document | Three: internal sales; CTO; solution architect and tech lead |
| 5 | **Sources** — which existing documents, repositories, or vendor docs are providing initial details | none, must be answered |
| 6 | **A fully installed Spryker project to investigate** — the checkout path whose `vendor/` holds the modules to verify extension points against | none; without it the plug-in inventory cannot be written, only guessed |
| 7 | **Size per audience** | Only if matches audience: Sales 2 pages, CTO 2 pages, SA/TL 10 pages. 1 page ≈ 600 words. |
| 8 | **Destination and visibility per role** | Sales → internal, published in Jira. Technical roles (CTO, SA/TL) → public documentation. Ask where, or propose the location /docs/pbc/all/miscellaneous/third-party-integrations/ |

**Constants derive from what the class is, not from what any product does.** A constant is only credible with its
reason attached, and the reason is a property of the class.

**Strategies are answers, not a list.** Derive them from one discriminating question, so they are mutually exclusive
and cover the space. A list gathered without an axis produces overlapping options nobody can choose between, and
leaves the deciding section with nothing to stand on.

**Sources are an allow-list.** Anything not named in the answer to question 5 is off-limits, including documents that
look relevant and drafts of the same topic. Superseded drafts are the main source of contradictions.

**The installed project is a separate source, and the only one for code.** A documentation repository has no
`vendor/` tree, so extension points cannot be verified where the writing happens. Ask for the checkout up front: it is
the difference between an inventory that was derived and one that was recalled.

**Record who "you" is, per document — in your notes, not in the document.** This is the most expensive thing to get
wrong, because fixing it is a rewrite rather than an edit.

- Sales: "you" is the seller in the conversation; "the customer" is the other side.
- CTO and SA/TL: "you" is the reader at the customer — their CTO, their architect.
- Spryker is "Spryker", never "we".

**State the convention in the document only when the text refers to more than one person.** Sales does: the seller and
the customer are both present, so "you" is ambiguous and one line settles it. In the CTO and SA/TL documents "you" is
the only person on the page — the reader — and announcing it tells them something they already know.

**Every document opens on the subject, never on itself.** No sentence describing who the document is for, what it
will cover, or how to read it. The first paragraph states the situation the reader is in.

## Step 2: The three documents

Every document walks the same beats. Only the depth and audience changes, which is what keeps the set consistent. A document is
finished when it contains its beats tuned for the selected audience and nothing else.

| Beat | Sales | CTO | SA/TL |
| --- | --- | --- | --- |
| Premise | one sentence, stated as settled | stated as settled | stated as settled |
| Constants | one sentence the seller can say | table, with the reason each holds | table, plus what each constant forces per layer |
| Capability assessment | what to establish before proposing anything | — | what to establish, and what each answer rules out |
| Strategies | names and one line each | a paragraph each: fits when, and what it costs | a full section each: contract, variants, risks |
| Flow diagram | none | one per strategy | one per strategy, plus one per delivery variant |
| Named systems | the table of products in the class | the table of products in the class | — |
| Deciding | the discriminating question, and what each answer means commercially | defaults and the triggers to deviate | elimination first, then defaults and triggers |
| Cross-cutting concerns | — | — | each with one named owner |
| Where the work lands in Spryker | — | — | inventory of plug-in points always; a flow for one named system on request |
| Phasing | — | — | how scope widens under each strategy, and how to roll back from each |
| Handoff | the traps, and what to send to whom | a cross-link into SA/TL wherever a reader wants depth | — |

**Sales carries no technical detail.** No interface, class, or module names, no code, no configuration keys, no file
paths. Capability-level statements only.

**Named systems appear in sales and CTO, never in SA/TL.** 3 to 10 widely used products in the class: what each
typically delivers, and which strategy it usually lands in. In sales it also carries what to ask about the product in
the call. Ask for the names or research them; a researched claim carries its source and the date checked.

The SA/TL document uses the capability assessment instead. Its reader already knows which product they run, a product
name cannot pick a strategy, and vendor capabilities drift — the table would rot while the rest of that document stays
true. **This table is the one place a shorter document may hold something the SA/TL document does not.**

## Step 3: Writing budget before drafting

Convert each document's page count to words at 600 words per page, then **allocate that budget across its beats and
record the allocation before writing.** An unallocated budget is not a constraint — it gets discovered at the end,
when the text is already written and expensive to cut.

Default allocation for the SA/TL document:

| Beat | Share |
| --- | --- |
| Premise, constants, capability assessment | 15% |
| Strategies, in full | 35% |
| Deciding | 5% |
| Cross-cutting concerns | 15% |
| Where the work lands in Spryker | 20% |
| Phasing and rollback | 10% |

**When a beat runs over, cut in this order:** examples, then anything already stated elsewhere, then sections that
inform without changing a decision, then depth within what remains. Raising the budget is a decision for the person
who set it, not a fix to apply while drafting.

## The strategy chapter

At the depth the beat table gives that document.

- **Overview** — each strategy as an answer to the discriminating question.
- **Fits when, and what it costs.** Two separate things: the triggers say when to choose it, the cost is what the
  customer takes on by choosing it. The cost is usually what decides.
- **One comparison table across strategies**, not use-case lists per strategy.
- **A flow diagram per strategy — required, not optional.** Every strategy is drawn as well as described. The
  diagram and the prose carry the same flow; a reader who scans rather than reads still gets it. Restating what a
  table already says is fine here — the second form is the point.
- **Deciding** happens by two mechanisms and no others: elimination — what the customer's system rules out before
  anyone expresses a preference — then a default with explicit triggers to deviate. No decision tree; it becomes a
  third restatement of both.

## Where the work lands in Spryker

Two parts. The first is always written. The second is written only when asked for.

### The inventory — always

Every place in Spryker where a system of this class can plug in, and **why that point exists**. This is class-level:
it holds whatever product the customer runs.

- **The layer map** — which layer carries which responsibility for this class of integration.
- **Each plug-in point**: the extension point, what it is for, what it lets an external system do, and what it does
  not reach. The "why" is what lets a reader judge whether it fits their case.
- **Where no extension point exists, say so plainly** and name the fallback — a project module, an API resource, a
  console command. Never invent a plausible-looking plugin name.
- **Mark every entry core-provided or project-built.** That split is what makes the section estimable.

### The integration flow — on request, for one named system

**Ask whether a flow is wanted, and for which system.** Settle it before allocating the budget: it changes this
section's share substantially.

**A flow describes one named system, never the class.** The sequence depends on that system's delivery API, its
events, and its preview mechanism — so a flow written for a class is invented rather than derived. If no system is
named, there is no flow, and the inventory stands alone.

When requested, for that system:

- **The request path** as an ordered walk: trigger → layer → extension point → what the project implements → what it
  hands on.
- **A table behind it**: step, layer, extension point, core-provided or project-built.
- **The off-request paths** — inbound event receipt, queue consumption, projection writes, publish and synchronize,
  scheduled reconciliation. Most of the real work is here.
- **Registration** — which dependency provider each plugin is registered in.
- **The implementation checklist** — the plugin list in build order. This is what phasing then schedules.

### Research contract

Applies to both parts. Deriving this section is the writer's job, not the reader's.

- Every interface, module, and dependency provider named is **verified present in the project given in question 6**.
  Never carry names over from an earlier plan document or from memory.
- **Verification is recorded in your notes, not in the document.** A checkout path means nothing to the reader and
  dates immediately. What may appear on the page is one factual line naming the Spryker version the inventory was
  built against — never an instruction to the reader to go and check.
- Prefer `*Extension` module interfaces over extending concrete classes.

**Done test.** Inventory: every plug-in point verified, every entry says why it exists and who builds it. Flow, where
one was requested: it names its system, and every step says who builds it. A section that tells the reader to "verify
before implementing" has pushed its own job onto them.

## Step 4: Publish

Follow `references/docs-conventions.md` for front matter, headings, links, sidebar, and diagrams. Then run the
`spryker-ci` skill for Vale, markdownlint, and the sidebar checker.

## Step 5: Review

Every gate below is enforced before the set is handed over. A failure is fixed, not noted.

**Reviewing a set written before this skill existed?** The Inputs gates and "a flow was asked and answered" record how
the work was run, not what is on the page. No edit can satisfy them retroactively — report them as not applicable,
and ask the author what was actually done rather than marking a false failure.

**Inputs**

- [ ] All eight interview questions answered by the user, none inferred.
- [ ] No source used that was not named in question 5.

**Set**

- [ ] Written deepest-first: SA/TL, then CTO, then sales.
- [ ] No document opens by describing itself or naming its audience.
- [ ] The voice convention is stated only where the text refers to more than one person.
- [ ] Each document contains its beats from the table, and nothing else.
- [ ] No claim in a shorter document that is absent from the SA/TL document, the named-systems table excepted.
- [ ] Every rule, table, and diagram appears once across the set — no content stated in three forms.

**Class discipline**

- [ ] No product named in the SA/TL document, unless a worked example was explicitly requested.
- [ ] Every constant holds for the class, not for one vendor.
- [ ] Sales contains no interface, class, or module name, no code, no config key, no file path.

**Budget**

- [ ] Word count per document reported against its budget.
- [ ] Any document over budget cut — in the stated order — or the overrun approved by whoever set the budget.

**Where the work lands in Spryker**

- [ ] Inventory present, with the reason each plug-in point exists.
- [ ] Every named interface, module, and dependency provider verified in the project from question 6.
- [ ] Every entry marked core-provided or project-built.
- [ ] Gaps stated as gaps, with the fallback named. No invented plugin names.
- [ ] Whether a flow is wanted was asked and answered. If yes, it names one system; no flow generalized to the class.

**Publication**

- [ ] No numbered section headings.
- [ ] No duplicate heading slugs.
- [ ] Every strategy has a flow diagram, and every delivery variant in SA/TL has one.
- [ ] Diagrams published as SVG with Mermaid source in a `{% comment %}` block.
- [ ] Every internal link resolves; every cross-document link points at a heading that exists.
- [ ] `spryker-ci` clean: Vale, markdownlint, sidebar checker.
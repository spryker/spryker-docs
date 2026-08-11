---
title: Workflows feature
description: Learn how the Workflow feature lets Back Office users build and run state machines, and how developers extend it with commands, conditions, and triggers.
last_updated: Aug 7, 2026
template: concept-topic-template
related:
  - title: Workflows feature overview
    link: docs/pbc/all/back-office/latest/base-shop/workflow-feature-overview.html
  - title: Install the Workflow feature
    link: docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html
---

## What it does

The Workflows feature lets you build a *state machine* - a process that moves a subject through a sequence of states — and manage it from the Back Office instead of from code. A Back Office user creates the process, defines its states and transitions, and changes it later, all without a developer or a deployment.

States, transitions, commands, conditions, timeouts, and history logging work exactly as they do for the file-based State machine. The one difference is *where the process lives and who controls it*: a workflow is stored in the database, edited in the Back Office (**Administration > Workflows**), and versioned so it can change safely over time.

Reach for the Workflow feature when a process needs to be:

- editable by non-developers,
- changed over time without a code deployment,
- attached to any subject you choose — a company, a customer, a product, or your own entity.

## How a workflow works

The clearest way to understand the feature is to follow one small workflow from start to finish. The example below is a company-onboarding process: a new company moves from `created` to `approved`, passing a verification check and an automatic waiting step along the way.

A workflow definition is an XML document in the `state-machine-01` format. It has three parts — `states`, `transitions`, and `events`:

```xml
<statemachine xmlns="spryker:state-machine-01">
    <process name="CompanyOnboarding" main="true">

        <states>
            <state name="created"/>
            <state name="business verification"/>
            <state name="approved"/>
            <state name="denied"/>
        </states>

        <transitions>
            <!-- A plain event transition: the "initiate" event moves the subject forward. -->
            <transition happy="true">
                <source>created</source>
                <target>business verification</target>
                <event>initiate</event>
            </transition>

            <!-- A guarded transition: it fires only if the condition returns true. -->
            <transition happy="true" condition="CompanyOnboarding/IsBusinessVerified">
                <source>business verification</source>
                <target>approved</target>
                <event>verify business</event>
            </transition>

            <!-- The same event with no condition sends the subject the other way. -->
            <transition>
                <source>business verification</source>
                <target>denied</target>
                <event>verify business</event>
            </transition>
        </transitions>

        <events>
            <event name="initiate" onEnter="true"/>
            <event name="verify business" timeout="3 second"/>
        </events>

    </process>
</statemachine>
```

Here is how a company travels through this definition:

1. **The instance starts.** A trigger (configured separately, see [Triggers](#triggers)) starts an instance for a new company. The instance begins in the initial state you set when you author the version — here, `created`.
2. **An `onEnter` event fires automatically.** The `initiate` event is marked `onEnter="true"`, so the engine fires it as soon as the instance is in `created`, moving the company to `business verification`.
3. **A timeout waits, then a condition decides.** The `verify business` event has a `timeout="3 second"`. After the timeout elapses, the engine evaluates the two `verify business` transitions in order. The first is guarded by the `CompanyOnboarding/IsBusinessVerified` condition: if it returns `true`, the company moves to `approved`. If not, the unguarded transition sends it to `denied`.

Three ideas in that trace do the heavy lifting, and each maps to a piece of project code you can plug in:

| In the definition | What it means | You provide |
|-------------------|---------------|-------------|
| `event` | A named step. It can fire automatically (`onEnter`), after a delay (`timeout`), on a user action (`manual`), or from application code. | Nothing — events are declared in the XML. |
| `condition="…"` | A guard that lets a transition fire only when a business rule is true. | A [condition plugin](#conditions). |
| `command="…"` | Project logic to run during a transition (not shown above — for example, "mark the company approved"). | A [command plugin](#commands). |

## Core concepts

A workflow is built from four entities. The example above is a *version* of a *process*; running it for one company creates an *instance*; and what starts that instance is a *trigger*.

| Concept | What it is |
|---------|------------|
| Process | The workflow itself: a named process bound to a subject type (for example `Company`). It is created once and never replaced. |
| Version | One complete definition of the process at a point in time (the XML above): its states, transitions, and events, plus the initial state. A process can have many versions, but only one is *active* at a time. |
| Trigger | Connects an application event (for example "a company was created") to the process, so that event automatically starts a new instance. |
| Instance | One subject running through the workflow — for example one specific company being onboarded. It tracks the subject's current state. |

### Why versions matter

Every instance is pinned to the version it started on. When you activate a newer version, running instances do **not** jump to it — they finish on the version they began with. Only *new* instances start on the newly active version.

This is what makes editing a live process safe. You publish an improved version for future subjects, while in-flight subjects complete on the exact rules they started with — no half-migrated instances and no transitions that suddenly point at states that no longer exist.

## Subjects

A workflow is attached to a *subject type*, which you choose when you create the process. It is not limited to companies: the subject type is a label you define — `Company`, `Customer`, `Product`, or anything your project needs. The trigger you configure decides which application event starts an instance for that subject.

For example, a process with subject type `Company` and a trigger on company creation starts one instance per created company, and each company then runs its own instance independently.

## Extending a workflow

The definition references project code by name in two places: `condition="…"` and `command="…"`. You implement each as a plugin and register it in the project `WorkflowDependencyProvider` (see the [installation guide](/docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html)). The engine matches a plugin to a definition by two values: its `getName()` (the string used in the XML) and its `getSubjectType()` (so the same name can behave differently for different subjects).

### Commands

A *command* runs project logic during a transition — for example, marking a company approved when it enters the `approved` state. Reference it in the definition as `command="CompanyOnboarding/MarkCompanyActiveAndApproved"`, then implement `WorkflowCommandPluginInterface` so `getName()` returns that same string:

```php
interface WorkflowCommandPluginInterface extends CommandPluginInterface
{
    public function getName(): string;

    public function getSubjectType(): string;
}
```

### Conditions

A *condition* guards a transition: the workflow takes that transition only when the condition returns `true` — for example, "the business is verified." Reference it as `condition="CompanyOnboarding/IsBusinessVerified"`, then implement `WorkflowConditionPluginInterface`:

```php
interface WorkflowConditionPluginInterface extends ConditionPluginInterface
{
    public function getName(): string;

    public function getSubjectType(): string;
}
```

### Triggers

A *trigger* is what starts an instance. Unlike commands and conditions — which are named inside the definition XML — a trigger is chosen in the Back Office when you configure the process (**Administration > Workflows**, then the process's **Triggers**). A trigger plugin binds an application event (`getEventName()`, for example `Entity.spy_company.create`) to a subject type, so that whenever that event fires for that subject, a new instance starts. Implement `StateMachineProcessTriggerPluginInterface`:

```php
interface StateMachineProcessTriggerPluginInterface
{
    public function getEventName(): string;

    public function getName(): string;

    public function getSubjectType(): string;

    public function getDescription(): string;
}
```


## What advances automatic transitions

Two of the transition kinds in the example — conditions and timeouts — have no incoming event to push them, so something must check them on a schedule. Two console commands do this:

- `workflow:check-condition` — advances every condition transition whose condition has become `true`.
- `workflow:check-timeout` — advances every timeout transition whose timeout has elapsed.

Without them, an instance that reaches a condition or timeout transition waits forever. They are **not** scheduled out of the box; the [installation guide](/docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html) shows how to register them as recurring jobs so workflows progress on their own.

---
title: Workflows feature overview
description: The Workflows feature lets Back Office users build, version, and run state machines for any process, and lets developers extend them with commands, conditions, and triggers.
last_updated: Aug 17, 2026
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/back-office/base-shop/workflow-feature-overview.html
related:
  - title: Install the Workflow feature
    link: docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html
---

The Workflows feature lets Back Office users design and operate state machines directly from the Back Office. A workflow describes how a subject moves through a sequence of states as events occur, conditions are met, or timeouts elapse.

A subject can be anything — a company, a user, a product, or any custom entity. A workflow starts when its subject reaches a specific application event, defined in a trigger: for example a company being created, a user registering, or a merchant being updated. From then on, each subject runs through the workflow independently.

Unlike classic state machines, which are defined in XML files and require a deployment to change, a workflow is created and adjusted by a Back Office user. This puts process design in the hands of the people who own the process.

## An example

Consider the onboarding process of a new B2B company. When a new company is created, a workflow starts and walks it through a series of states: *business verification*, then *contract agreement*, then *customer group assignment*, and finally *approved*. Some steps advance on their own once a condition is met (for example, the business has been verified); others wait for a Back Office user to confirm; and a step can time out if nothing happens. The whole process — its states, the order of the steps, and the rules between them — is defined and adjusted in the Back Office, not in code.

## How a workflow works

The clearest way to understand the feature is to follow one small workflow from start to finish. The example below is a company-onboarding process: a new company moves from `created` to `approved`, passing a verification check and an automatic waiting step along the way.

A workflow definition is an XML document in the `state-machine-01` format. It has three parts: `states`, `transitions`, and `events`:

```xml
{% raw %}<statemachine xmlns="spryker:state-machine-01">
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
</statemachine>{% endraw %}
```

Here is how a company travels through this definition:

1. **The instance starts.** A trigger (see [Triggers](#triggers)) starts an instance for a new company. The instance begins in the initial state you set when you author the version — here, `created`.
2. **An `onEnter` event fires automatically.** The `initiate` event is marked `onEnter="true"`, so the engine fires it as soon as the instance is in `created`, moving the company to `business verification`.
3. **A timeout waits, then a condition decides.** The `verify business` event has a `timeout="3 second"`. After the timeout elapses, the engine evaluates the two `verify business` transitions in order. The first is guarded by the `CompanyOnboarding/IsBusinessVerified` condition: if it returns `true`, the company moves to `approved`. If not, the unguarded transition sends it to `denied`.

Three ideas in that trace do the heavy lifting, and each maps to a piece of project code a developer can plug in:

| In the definition | What it means | You provide |
|-------------------|---------------|-------------|
| `event` | A named step. It can fire automatically (`onEnter`), after a delay (`timeout`), on a user action (`manual`), or from application code. | Nothing — events are declared in the XML. |
| `condition="…"` | A guard that lets a transition fire only when a business rule is true. | A [condition plugin](#conditions). |
| `command="…"` | Project logic to run during a transition (not shown above — for example, "mark the company approved"). | A [command plugin](#commands). |

## Core concepts

A workflow is built from four entities. The example above is a *version* of a *process*; running it for one company creates an *instance*; and what starts that instance is a *trigger*. You manage all of them in the Back Office under **Administration > Workflows**.

| Concept | What it is |
|---------|------------|
| Process | The workflow itself: a named process bound to a subject type (for example `Company`). It is created once and never replaced — all versions and instances belong to it. |
| Version | One complete definition of the process at a point in time (the XML above): its states, transitions, and events, plus the initial state. A process can have many versions, but only one is *active* at a time. |
| Trigger | Connects an application event (for example "a company was created") to the process, so that event automatically starts a new instance. |
| Instance | One subject running through the workflow — for example one specific company being onboarded. It tracks the subject's current state. |

### Why versions matter

Every instance is pinned to the version it started on. When you activate a newer version, running instances do **not** jump to it — they finish on the version they began with. Only *new* instances start on the newly active version.

This is what makes editing a live process safe. You publish an improved version for future subjects, while in-flight subjects complete on the exact rules they started with — no half-migrated instances and no transitions that suddenly point at states that no longer exist.

## Subjects

A workflow is attached to a *subject type*, which you choose when you create the process. It is not limited to companies: the subject type is a label you define — `Company`, `Customer`, `Product`, or anything your project needs. The trigger you configure decides which application event starts an instance for that subject.

For example, a process with subject type `Company` and a trigger on company creation starts one instance per created company, and each company then runs its own instance independently.

## Instances

An *instance* is a single subject running through a workflow — for example one specific company being onboarded. Each instance is pinned to the version it started on and tracks its current state. In the Back Office you can inspect instances, see their current state, and trigger any manual actions the workflow defines (for example, a step that a Back Office user must confirm before the workflow continues).

{% info_block infoBox "Instance history retention" %}

Each instance and its transition history are kept in the database. This MVP does not ship an automated cleanup or retention job, so plan for periodic housekeeping if you expect a high volume of instances.

{% endinfo_block %}

## Transitions

A workflow advances through three kinds of transitions:

- **Event transitions**: triggered by an application event or a manual action in the Back Office.
- **Condition transitions**: advance automatically once a business condition becomes true.
- **Timeout transitions**: advance automatically after a defined period elapses.

Condition and timeout transitions have no incoming event to push them, so two console commands advance them on a schedule:

- `workflow:check-condition` — advances every condition transition whose condition has become `true`.
- `workflow:check-timeout` — advances every timeout transition whose timeout has elapsed.

Without them, an instance that reaches a condition or timeout transition waits forever. These commands are **not** scheduled out of the box; the [installation guide](/docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html) shows how to register them as recurring jobs so workflows progress on their own.

## Triggers

A *trigger* connects an application event to a workflow so that a new instance starts automatically. For example, creating a company can trigger a new onboarding instance. You select the trigger event in the Back Office when you configure the process; the available events are provided by trigger plugins (see [Extending a workflow](#extending-a-workflow)).

## Extending a workflow

The definition references project code by name in two places: `condition="…"` and `command="…"`. A developer implements each as a plugin and registers it in the project `WorkflowDependencyProvider` (see the [installation guide](/docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html)). The engine matches a plugin to a definition by two values: its `getName()` (the string used in the XML) and its `getSubjectType()` (so the same name can behave differently for different subjects).

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

### Trigger plugins

A trigger plugin provides an application event that can start an instance. Unlike commands and conditions — which are named inside the definition XML — a trigger is chosen in the Back Office when you configure the process. A trigger plugin binds an application event (`getEventName()`, for example `Entity.spy_company.create`) to a subject type, so that whenever that event fires for that subject, a new instance starts. Implement `StateMachineProcessTriggerPluginInterface`:

```php
interface StateMachineProcessTriggerPluginInterface
{
    public function getEventName(): string;

    public function getName(): string;

    public function getSubjectType(): string;

    public function getDescription(): string;
}
```

## Provisioning workflows on installation

Workflows can be shipped with a project and provisioned automatically during installation through data import. This means a demo or production workflow is available immediately after setup, and re-importing the same workflow does not create duplicates. See the [installation guide](/docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html) for details.

---
title: Workflows feature overview
description: The Workflows feature lets Back Office users build, version, and run state machines for any process, without a code deployment.
last_updated: Aug 7, 2026
template: concept-topic-template
related:
  - title: Workflows feature
    link: docs/dg/dev/backend-development/workflow.html
  - title: Install the Workflow feature
    link: docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html
---

The Workflow feature lets Back Office users design and operate state machines directly from the Back Office. A workflow describes how a subject moves through a sequence of states as events occur, conditions are met, or timeouts elapse.

A subject can be anything — a company, a user, a product, or a custom entity. A workflow starts when its subject reaches a specific application event, defined in a trigger: for example a company being created, a user registering, or a merchant being updated. From then on, each subject runs through the workflow independently.

Unlike classic state machines, which are defined in XML files and require a deployment to change, a workflow is created and adjusted by a Back Office user. This puts process design in the hands of the people who own the process.

### An example

Consider onboarding a new B2B company. When a company is created, a workflow starts and walks it through a series of states: *business verification*, then *contract agreement*, then *customer group assignment*, and finally *approved*. Some steps advance on their own once a condition is met (for example, the business has been verified); others wait for a Back Office user to confirm; and a step can time out if nothing happens. The whole process — its states, the order of the steps, and the rules between them — is defined and adjusted in the Back Office, not in code.

## Workflows

A *workflow* is a named process attached to a subject type. It stays stable over its lifetime: creating a new version never replaces the workflow itself, only the rules it runs. You manage workflows in the Back Office under **Administration > Workflows**.

## Versions

Each workflow can have many *versions*. A version captures a complete definition of the states and transitions at a point in time. Exactly one version is *active* at a time:

- New subjects start on the active version.
- Subjects that are already running stay on the version they started on, even after a newer version is activated, and finish on that version.

This lets you evolve a process safely: publish a new version for future subjects while in-flight subjects finish on the rules they began with.

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

Condition and timeout transitions are advanced by scheduled jobs, so a workflow can progress on its own without a user action. These jobs are set up during installation.

## Triggers

A *trigger* connects an application event to a workflow so that a new instance starts automatically. For example, creating a company can trigger a new onboarding instance.

## Provisioning workflows on installation

Workflows can be shipped with a project and provisioned automatically during installation through data import. This means a demo or production workflow is available immediately after setup, and re-importing the same workflow does not create duplicates.

## Related Developer articles

- [Workflow feature](/docs/dg/dev/backend-development/workflow.html)
- [Install the Workflow feature](/docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html)

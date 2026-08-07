---
title: Workflow feature overview
description: The Workflow feature lets business users model, version, and run state machines directly from the Back Office, without a code deployment.
last_updated: Aug 6, 2026
template: concept-topic-template
related:
  - title: Workflow feature
    link: docs/dg/dev/backend-development/workflow.html
  - title: Install the Workflow feature
    link: docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html
---

The Workflow feature lets business users design and operate workflows from the Back Office. A workflow describes how a subject—such as a company during onboarding—moves through a sequence of states as events occur, conditions are met, or timeouts elapse.

Unlike classic state machines, which are defined in XML files and require a deployment to change, a workflow is authored, versioned, and activated entirely in the Back Office. This puts process design in the hands of the people who own the process.

## Workflows

A *workflow* is a named process attached to a subject type. It stays stable over its lifetime: creating a new version never replaces the workflow itself, only the rules it runs. You manage workflows in the Back Office under **Administration > Workflows**.

## Versions

Each workflow can have many *versions*. A version captures a complete definition of the states and transitions at a point in time. Exactly one version is *active* at a time:

- New subjects start on the active version.
- Subjects that are already running stay on the version they started on, even after a newer version is activated.

This lets you evolve a process safely: publish a new version for future subjects while in-flight subjects finish on the rules they began with.

## Instances

An *instance* is a single subject running through a workflow—for example one specific company being onboarded. Each instance is pinned to the version it started on and tracks its current state. You can inspect instances and their current state in the Back Office.

## Transitions

A workflow advances through three kinds of transitions:

- **Event transitions**: triggered by an application event or a manual action.
- **Condition transitions**: advance automatically once a business condition becomes true.
- **Timeout transitions**: advance automatically after a defined period elapses.

Condition and timeout transitions are evaluated by scheduled jobs, so a workflow can progress on its own without a user action.

## Triggers

A *trigger* connects an application event to a workflow so that a new instance starts automatically. For example, creating a company can trigger a new onboarding instance.

## Provisioning workflows on installation

Workflows can be shipped with a project and provisioned automatically during installation through data import. This means a demo or production workflow is available immediately after setup, and re-importing the same workflow does not create duplicates.

## Related Developer articles

- [Workflow feature](/docs/dg/dev/backend-development/workflow.html)
- [Install the Workflow feature](/docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html)

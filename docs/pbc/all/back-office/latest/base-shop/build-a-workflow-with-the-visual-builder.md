---
title: Build a workflow with the visual builder
description: Learn how to design a workflow version visually in the Back Office — adding states, linking them with transitions, and setting the initial state — instead of writing state-machine XML by hand.
last_updated: Sep 14, 2026
template: back-office-user-guide-template
label: early-access
related:
  - title: Workflows feature overview
    link: docs/pbc/all/back-office/base-shop/workflows-feature-overview.html
  - title: Install the Workflows feature
    link: docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html
---

{% info_block warningBox "Early Access" %}

This feature is in Early Access. We'd love for you to try it out and share feedback as we work toward general availability.

{% endinfo_block %}

This topic describes how to design a workflow version in the Back Office using the visual builder—a diagram editor where you add states, link them with transitions, and set the workflow's properties directly on a canvas.

The visual builder replaces hand-writing the `state-machine-01` XML: you draw the process, and the builder keeps the underlying definition in sync. For teams that prefer to work with the raw definition, the builder still exposes the XML through an [advanced panel](#edit-the-raw-xml).

To start working with the visual builder, go to **Administration&nbsp;<span aria-label="and then">></span> Workflows**, open a workflow, and create or edit a version.

## Prerequisites

Before you start, review the reference information, or look up the necessary information as you go through the process.

- The [Workflows feature](/docs/pbc/all/back-office/latest/base-shop/workflows-feature-overview.html) is installed and you understand its core concepts—*states*, *transitions*, *events*, and *versions*.
- You have a workflow to add a version to. To create one, on the **Workflows** page, select **Create Workflow**.

## Open the visual builder

1. Go to **Administration&nbsp;<span aria-label="and then">></span> Workflows**.
1. In the row of the workflow you want to change, select **Versions**.
1. Select **Create Version**.

The **Create Version** screen opens with the visual builder: a canvas on the left and a properties inspector on the right.

![The Create Version screen with the visual state-machine builder: a canvas with states on the left and the properties inspector on the right](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/back-office/base-shop/build-a-workflow-with-the-visual-builder/builder-overview.png)

Each new version is a fresh, editable copy. Activating it does not change any version already running—see [Why versions matter](/docs/pbc/all/back-office/latest/base-shop/workflows-feature-overview.html#why-versions-matter).

## Add and link states

A *state* is a step in the process. A *transition* is a directed link from one state to another that the subject follows when an event fires or a condition is met.

To build the flow on the canvas:

1. **Add a state**: select **Add state** in the toolbar, or hover over an existing state and select the **+** to add a state already connected to it.
1. **Rename a state**: select the state's name and type a new one. Press <kbd>Enter</kbd> to save, or <kbd>Escape</kbd> to cancel.
1. **Link two states**: drag from the edge of the source state onto the target state. This creates a transition between them.
1. **Move states**: drag a state to reposition it. Positions are visual only and do not change the definition.

**Tips and tricks**

- Select several elements at once with <kbd>Shift</kbd>-click or a <kbd>Shift</kbd>-drag, then drag any selected state to move them together, or press <kbd>Delete</kbd> to remove them.
- Select **Auto-arrange** to re-run the automatic layout over the whole diagram. Like moving states by hand, this changes only positions, never the definition.
- Use **Zoom in**, **Zoom out**, and **Fit to screen** to navigate large workflows. **Undo** reverts your last change.

## Set the initial state

Every workflow needs exactly one *initial state*—the step a subject enters when its workflow starts. A version cannot be activated without one.

To set the initial state:

1. Select the state on the canvas.
1. In the inspector, select the **Initial state** checkbox.

If no initial state is set, activating the version fails with the message *The initial state is not specified. Mark one state as the initial state.*

## Configure a state

Select a state to edit its properties in the inspector.

### Reference information: state properties

The following table describes the attributes you set for a state:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | The technical name of the state, used in the definition. Required and unique within the workflow. |
| Display name | An optional human-readable label shown in the diagram and monitoring views. |
| Initial state | Marks this state as the entry point of the workflow. Exactly one state must be marked. |

## Configure a transition

Select a transition to edit how the subject moves along it. A transition can be driven by an *event*, gated by a *condition*, or both. Leaving the event empty makes it a *condition-only* transition, which the system evaluates automatically.

### Reference information: transition properties

The following table describes the attributes you set for a transition:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Event | The name of the event that moves the subject along this transition. Leave it empty for a condition-only transition. Events are named per transition. |
| Event type | How the event fires: **None** (triggered by the application), **On enter (automatic)**, **Timeout**, or **Manual** (fired by a Back Office user). |
| Timeout | For a timeout event, how long the subject waits in the source state before the event fires—for example, `3 seconds`, `1 day`. |
| Command | An optional action run when the event fires. Available commands come from the workflow's subject type. See [Commands](/docs/pbc/all/back-office/latest/base-shop/workflows-feature-overview.html#commands). |
| Condition | An optional rule that must be true for the transition to be taken. Available conditions come from the workflow's subject type. See [Conditions](/docs/pbc/all/back-office/latest/base-shop/workflows-feature-overview.html#conditions). |
| Happy path | Marks this transition as the expected, successful route through the process, which the diagram highlights. |

![The transition inspector, showing the event name, event type, command, and condition fields for the selected transition](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/back-office/base-shop/build-a-workflow-with-the-visual-builder/transition-inspector.png)

## Validate the definition

At any point, select **Validate definition** to check the workflow without saving. The builder reports problems such as an unreachable state, a transition to an undefined state, an unknown command or condition, or a missing initial state.

Validation also runs when you activate a version. If a version is invalid, activation is rejected and the errors are listed so you can fix them in a new version.

## Save and activate the version

1. Select **Save** to store the version. A saved version is inactive and safe to review—it does not affect anything running.
1. To make the version live, select **Activate** in the version's row. Activating a version deactivates the previously active one; running subjects are not affected.

For how activation and versioning interact, see [Why versions matter](/docs/pbc/all/back-office/latest/base-shop/workflows-feature-overview.html#why-versions-matter).

## Edit the raw XML

The builder and the `state-machine-01` XML are two views of the same definition. To work with the definition directly, expand **Advanced: raw XML**.

- Edits you make in the XML are parsed and applied to the canvas as you type; valid changes update the diagram live.
- If the XML cannot be parsed, the builder keeps the last valid diagram and shows *The XML could not be parsed. Fix the definition to update the canvas.* so your work is not lost.

This is useful for pasting an existing definition, reviewing exactly what will be saved, or making a precise edit that is faster in text than on the canvas.

## View a version

Opening a saved version shows the same diagram in read-only mode. You can select a state or transition to inspect its properties and use the zoom and pan controls, but you cannot edit it. To change a read-only version, create a new version from it.

![A saved workflow version shown read-only in the visual builder, with the inspector displaying a selected state's properties](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/back-office/base-shop/build-a-workflow-with-the-visual-builder/read-only-view.png)

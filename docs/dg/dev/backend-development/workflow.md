---
title: Workflow feature
description: Learn how to use the Workflow feature to model and run database-authored state machines in a Spryker project.
last_updated: Aug 6, 2026
template: concept-topic-template
related:
  - title: Install the Workflow feature
    link: docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html
---

## What It Does

The Workflow feature lets business users model and run workflow that are authored in the Back Office instead of in static XML process files. A workflow is created and versioned in the Back Office, then attached to a subject (for example a company). When the subject reaches a trigger event, an instance starts and moves through the states defined by the active version. The feature is built on top of the core StateMachine engine, so commands, conditions, timeouts, and transition logging behave the same way as file-based processes.

Use it when the transitions of a process must be editable by non-developers, versioned over time, and driven by data rather than a code deployment.

## Concepts

| Concept | Persistence | Description |
|---------|-------------|-------------|
| Process | `spy_state_machine_process` | One stable row per workflow (keyed by name and subject type). A new version never creates a new process row. |
| Definition (version) | `spy_state_machine_process_definition` | A compiled version of the process. Natural key: `(process, version)`. Holds the definition XML, initial state, and status (`active`/`inactive`). |
| Trigger | `spy_state_machine_process_definition_trigger` | The start events that launch a new instance for the process. |
| Instance | `spy_state_machine_process_definition_instance` | A running subject pinned to a specific version; tracks the current state. |

Only one version of a process is `active` at a time. New instances start on the active version; existing instances stay pinned to the version they started on.

## Quick Start

### 1. Author a workflow in the Back Office

In the Back Office, go to **Administration > Workflows** and create a process. Add a version by pasting a `state-machine-01` definition XML, set the initial state, and activate the version.

### 2. Or import a workflow from a CSV

The feature ships a data importer so a workflow can be provisioned on installation. Each CSV row defines one workflow version. The `definition` column holds a path to the definition XML file relative to the project root:

```csv
name,subject_type,description,initial_state,version,definition,trigger_events,is_active
CompanyOnboarding,Company,B2B company onboarding demo workflow,created,1,data/import/common/common/workflow/company_onboarding.xml,"Entity.spy_company.create",1
```

```bash
docker/sdk cli console data:import workflow
```

The importer upserts on `(name/process, version)`, so re-running it does not create duplicate versions. Bump the `version` column to author a new version.

### 3. Advance event-less transitions with the crons

Condition and timeout transitions have no event, so they are advanced by scheduled commands:

```bash
docker/sdk cli console workflow:check-condition
docker/sdk cli console workflow:check-timeout
```

## Integration Requirements

### Required modules

| Module | Purpose |
|--------|---------|
| `spryker/workflow` | The feature: process/definition/instance persistence, Back Office UI, importer, crons. |
| `spryker/state-machine` | Core engine that executes the compiled definitions. |
| `spryker/data-import` | Runs the workflow CSV importer. |

### Register command, condition, and trigger plugins

Project-specific commands, conditions, and start triggers are registered by the plugin stacks in the project `WorkflowDependencyProvider`:

```php
namespace Pyz\Zed\Workflow;

use Pyz\Zed\ExampleWorkflow\Communication\Plugin\StateMachine\CompanyCreateStateMachineProcessTriggerPlugin;
use Pyz\Zed\ExampleWorkflow\Communication\Plugin\StateMachine\CompanyIsBusinessVerifiedConditionPlugin;
use Pyz\Zed\ExampleWorkflow\Communication\Plugin\StateMachine\CompanyMarkActiveAndApprovedCommandPlugin;
use Spryker\Zed\Workflow\WorkflowDependencyProvider as SprykerWorkflowDependencyProvider;

class WorkflowDependencyProvider extends SprykerWorkflowDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Workflow\Dependency\Plugin\WorkflowCommandPluginInterface>
     */
    protected function getCommandPlugins(): array
    {
        return [
            new CompanyMarkActiveAndApprovedCommandPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\Workflow\Dependency\Plugin\WorkflowConditionPluginInterface>
     */
    protected function getConditionPlugins(): array
    {
        return [
            new CompanyIsBusinessVerifiedConditionPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\Workflow\Dependency\Plugin\StateMachineProcessTriggerPluginInterface>
     */
    protected function getTriggerPlugins(): array
    {
        return [
            new CompanyCreateStateMachineProcessTriggerPlugin(),
        ];
    }
}
```

## Key Facades & Methods

| Facade | Method | Purpose |
|--------|--------|---------|
| WorkflowFacade | `createStateMachineProcessCollection()` | Creates workflow processes. |
| WorkflowFacade | `createStateMachineProcessDefinitionCollection()` | Adds a version (upserts when a version is supplied). |
| WorkflowFacade | `updateStateMachineProcessDefinitionCollection()` | Activates or deactivates a version. |
| WorkflowFacade | `validateStateMachineProcessDefinition()` | Validates a definition XML before saving. |
| WorkflowFacade | `startStateMachineInstance()` | Starts an instance for a subject on the active version. |
| WorkflowFacade | `triggerStateMachineInstanceEvent()` | Fires a manual event on a running instance. |
| WorkflowFacade | `checkDynamicConditions()` | Advances event-less condition transitions. Returns the affected count. |
| WorkflowFacade | `checkDynamicTimeouts()` | Advances event-less timeout transitions. Returns the affected count. |

## Extension Points

Commands and conditions are resolved by `getName()` (the registry key used in the definition XML, for example `command="CompanyOnboarding/MarkCompanyActiveAndApproved"`) and `getSubjectType()`.

### WorkflowCommandPluginInterface

**When to implement:** the definition XML runs a command on entering a state or on an event.

```php
interface WorkflowCommandPluginInterface extends CommandPluginInterface
{
    public function getName(): string;

    public function getSubjectType(): string;
}
```

### WorkflowConditionPluginInterface

**When to implement:** a transition is guarded by a condition (`condition="..."`).

```php
interface WorkflowConditionPluginInterface extends ConditionPluginInterface
{
    public function getName(): string;

    public function getSubjectType(): string;
}
```

### StateMachineProcessTriggerPluginInterface

**When to implement:** an application event should start a new instance (for example a company is created).

```php
interface StateMachineProcessTriggerPluginInterface
{
    public function getEventName(): string;

    public function getName(): string;

    public function getSubjectType(): string;

    public function getDescription(): string;
}
```

## Key dependencies

- StateMachine: compiles each version's XML and executes transitions, commands, and conditions.
- DataImport: provisions workflows from CSV.

---
title: Install the Workflows feature
description: Learn how to integrate and configure the Workflows feature in a Spryker project.
last_updated: Aug 7, 2026
template: howto-guide-template

related:
  - title: Workflows feature overview
    link: docs/pbc/all/back-office/latest/base-shop/workflow-feature-overview.html
---

This document describes how to install the Workflow feature.

## Prerequisites

Install the required modules:

| MODULE | VERSION |
|--------|---------|
| spryker/workflow | ^1.0.0 |
| spryker/state-machine | ^2.26.0 |
| spryker/data-import | ^1.27.1 |
| spryker/gui | ^5.3.2 |
| spryker/kernel | ^3.84.0 |

## Install feature core

### 1) Install the required modules

Install the Workflow module and update its dependencies to the required versions:

```bash
composer require spryker/workflow:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules are available in `vendor/spryker/`:

| MODULE |
|--------|
| spryker/workflow |
| spryker/state-machine |
| spryker/data-import |
| spryker/gui |

{% endinfo_block %}

### 2) Set up the database schema and transfer objects

Apply the database changes and generate the transfer objects:

```bash
docker/sdk cli console propel:install
docker/sdk cli console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following tables exist in the database:

| DATABASE ENTITY | TYPE | EVENT |
|-----------------|------|-------|
| spy_state_machine_process | table | created |
| spy_state_machine_process_definition | table | created |
| spy_state_machine_process_definition_instance | table | created |
| spy_state_machine_process_definition_trigger | table | created |

{% endinfo_block %}

### 3) Configure navigation

The Workflow Back Office menu entry is added under **Administration**. Add the following node to `config/Zed/navigation.xml`:

```xml
<workflows>
    <label>Workflows</label>
    <title>Workflows</title>
    <bundle>workflow</bundle>
    <controller>process</controller>
    <action>index</action>
</workflows>
```

Rebuild the navigation cache:

```bash
docker/sdk cli console navigation:build-cache
docker/sdk cli console cache:empty-all
```

{% info_block warningBox "Verification" %}

In the Back Office, go to **Administration > Workflows** and make sure the page opens.

{% endinfo_block %}

### 4) Create a workflow in the Back Office

Once the feature is installed, a Back Office user can author a workflow through the UI:

1. Go to **Administration > Workflows** and create a process. Give it a name and a subject type (for example `Company`).
2. Open the process's **Workflow Versions**, then **Create Version**: paste the definition XML (in the `state-machine-01` format) and set the initial state, which is the process's entry point. Save the version.
3. **Activate** the version.
4. Open the process's **Workflow Triggers**. The page lists the trigger events registered for the process's subject type ("Select events that start this workflow"). Select one or more and **Save Triggers**.
5. **Activate** the process.

The workflow is now live: whenever a selected trigger event fires for a subject of the configured type, a new instance starts on the active version.

{% info_block infoBox "Provisioning instead of manual authoring" %}

To ship a ready-made workflow with your project instead of creating it by hand, use the data import in the following steps. The two approaches are interchangeable — both produce the same process, versions, and triggers.

{% endinfo_block %}

### 5) Register command, condition, and trigger plugins

Register your project's commands, conditions, and start triggers by extending the core `WorkflowDependencyProvider`.

**src/Pyz/Zed/Workflow/WorkflowDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Workflow;

use Spryker\Zed\Workflow\WorkflowDependencyProvider as SprykerWorkflowDependencyProvider;

class WorkflowDependencyProvider extends SprykerWorkflowDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Workflow\Dependency\Plugin\WorkflowCommandPluginInterface>
     */
    protected function getCommandPlugins(): array
    {
        return [
            // new MyCommandPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\Workflow\Dependency\Plugin\WorkflowConditionPluginInterface>
     */
    protected function getConditionPlugins(): array
    {
        return [
            // new MyConditionPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\Workflow\Dependency\Plugin\StateMachineProcessTriggerPluginInterface>
     */
    protected function getTriggerPlugins(): array
    {
        return [
            // new MyProcessTriggerPlugin(),
        ];
    }
}
```

For the plugin interfaces and how the engine resolves them, see [Extending a workflow](/docs/pbc/all/back-office/latest/base-shop/workflow-feature-overview.html#extending-a-workflow).

### 6) Register the data importer

Register the Workflow data import plugin so workflows can be provisioned from CSV.

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
use Spryker\Zed\Workflow\Communication\Plugin\DataImport\WorkflowDataImportPlugin;

/**
 * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
 */
protected function getDataImporterPlugins(): array
{
    return [
        new WorkflowDataImportPlugin(),
    ];
}
```

### 7) Provide the import data

The import uses two files: a definition XML file that describes the state machine (its states, transitions, and events, in the same `state-machine-01` format used by the OMS), and a CSV that provisions the workflow and points at that XML file. Storing the definition in its own file keeps the CSV readable and lets you edit the state machine like any other XML process.

The `definition` column in the CSV holds the path to the XML file, relative to the project root.

**data/import/common/common/workflow/company_onboarding.xml**

```xml
{% raw %}<?xml version="1.0"?>
<statemachine
    xmlns="spryker:state-machine-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:state-machine-01 http://static.spryker.com/state-machine-01.xsd"
>
    <process name="CompanyOnboarding" main="true">
        <!-- states, transitions, and events -->
    </process>
</statemachine>{% endraw %}
```

**data/import/common/common/workflow.csv**

```csv
name,subject_type,description,initial_state,version,definition,trigger_events,is_active
CompanyOnboarding,Company,B2B company onboarding demo workflow,created,1,data/import/common/common/workflow/company_onboarding.xml,"Entity.spy_company.create,Entity.spy_company.update",1
```

| COLUMN | REQUIRED | DESCRIPTION |
|--------|----------|-------------|
| name | yes | Workflow (process) name. |
| subject_type | yes | The subject the workflow applies to, for example `Company`. |
| description | no | Human-readable description. |
| initial_state | yes | The state a new instance starts in. |
| version | yes | Version number. The importer upserts on `(name, version)`, so re-imports do not create duplicates. |
| definition | yes | Path to the definition XML file, relative to the project root — for example `data/import/common/common/workflow/company_onboarding.xml`. |
| trigger_events | no | The Publish & Synchronize event names custom type of triggers that start an instance, for example `Entity.spy_company.create`. To list several events, separate them with commas and wrap the whole cell in double quotes so the commas are not read as CSV column separators: `"Entity.spy_company.create,Entity.spy_company.update"`. |
| is_active | no | `1` activates this version and its process. |

Run the importer directly to verify:

```bash
docker/sdk cli console data:import workflow
```

### 8) Add the importer to the install recipe

Register the workflow importer in the data import configuration so it runs during deployment. Add it to the region import config that the install recipes invoke through `data:import`.

Add the following entry to the import config of **every region and environment you deploy** — the local files (`data/import/local/full_<REGION>.yml`) and the production files (`data/import/production/full_<REGION>.yml`). Adding it to only one file provisions the workflow only for that region and environment.

**data/import/local/full_EU.yml** (and the other `full_<REGION>.yml` files, local and production)

```yaml
    - data_entity: workflow
      source: data/import/common/common/workflow.csv
```

Place the entry after the modules whose subjects the workflow attaches to (for example `company`), so those subjects exist before the workflow is provisioned. The install recipes already call `data:import` with the region import config, so no recipe change is required beyond this entry.

{% info_block warningBox "Verification" %}

Run the install recipe and make sure the workflow with its versions appears under **Administration > Workflows**.

{% endinfo_block %}

### 9) Schedule the condition and timeout jobs

Condition and timeout transitions have no event, so they must be advanced by two console commands: `workflow:check-condition` and `workflow:check-timeout`. These commands are **not** scheduled out of the box — register them as recurring jobs the same way the OMS and state machine checks are scheduled. Add the following jobs to `config/Zed/cronjobs/jenkins.php`:

```php
$jobs[] = [
    'name' => 'workflow-check-conditions',
    'command' => '$PHP_BIN vendor/bin/console workflow:check-condition',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];

$jobs[] = [
    'name' => 'workflow-check-timeouts',
    'command' => '$PHP_BIN vendor/bin/console workflow:check-timeout',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```

{% info_block warningBox "Verification" %}

Start an instance, then run `docker/sdk cli console workflow:check-condition` and confirm the instance advances in `spy_state_machine_process_definition_instance`.

{% endinfo_block %}

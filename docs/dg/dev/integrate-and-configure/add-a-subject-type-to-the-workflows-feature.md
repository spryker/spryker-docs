---
title: Add a subject type to the Workflows feature
description: Learn how to start a workflow for a new subject type, such as a merchant relationship, by adding a trigger plugin and an event listener in your Spryker project.
last_updated: Oct 22, 2026
template: howto-guide-template
label: early-access
related:
  - title: Workflows feature overview
    link: docs/pbc/all/back-office/latest/base-shop/workflows-feature-overview.html
  - title: Install the Workflows feature
    link: docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html
---

A workflow runs for one *subject type* — for example `Company` or `Merchant`. The Workflows feature does not ship subject types of its own: a Back Office user can select a subject type on the **Create workflow** page only after your project registers at least one trigger plugin for it. This document describes how to add a subject type and start a workflow instance whenever an application event fires for it.

The steps use the `MerchantRelationship` subject type as an example. The same pattern applies to any entity in your project.

## Prerequisites

Install the Workflows feature. For details, see [Install the Workflows feature](/docs/dg/dev/integrate-and-configure/integrate-workflow-feature.html).

## How a subject type is wired

Three pieces of project code connect an application event to a workflow:

| PIECE | PURPOSE |
|-------|---------|
| Trigger plugin | Makes the subject type and its event selectable in the Back Office. |
| Event listener | Receives the application event and asks the Workflows feature to start an instance. |
| Event subscriber | Registers the listener for the event in the event dispatcher. |

When the event fires, `WorkflowFacade::startStateMachineInstance()` finds every active workflow that has this event as a trigger and starts an instance on its active version. If an instance already exists for the same subject, no new instance is started.

## 1) Define the event and subject type

Keep the event name and the subject type in one place, so the trigger plugin and the listener use the same values.

**src/Pyz/Zed/ExampleWorkflow/ExampleWorkflowConfig.php**

```php
<?php

namespace Pyz\Zed\ExampleWorkflow;

use Spryker\Zed\Kernel\AbstractBundleConfig;

class ExampleWorkflowConfig extends AbstractBundleConfig
{
    /**
     * Requires the Propel event behavior on spy_merchant_relationship.
     */
    public const EVENT_MERCHANT_RELATIONSHIP_CREATE = 'Entity.spy_merchant_relationship.create';

    public const SUBJECT_TYPE_MERCHANT_RELATIONSHIP = 'MerchantRelationship';
}
```

## 2) Enable entity events for the table

`Entity.*` events are published only for tables that have the Propel `event` behavior. If your event is an entity event and the table does not publish it yet, add the behavior in the project schema. Skip this step for events that a module already publishes, such as `Merchant.created`.

**src/Pyz/Zed/MerchantRelationship/Persistence/Propel/Schema/spy_merchant_relationship.schema.xml**

```xml
<table name="spy_merchant_relationship">
    <behavior name="event">
        <parameter name="spy_merchant_relationship_all" column="*"/>
    </behavior>
</table>
```

Apply the schema change:

```bash
docker/sdk cli console propel:install
```

## 3) Add the trigger plugin

The trigger plugin binds the event to the subject type. Its name and description are shown in the **Triggers** field on the **Create workflow** page.

**src/Pyz/Zed/ExampleWorkflow/Communication/Plugin/StateMachine/MerchantRelationshipCreateStateMachineProcessTriggerPlugin.php**

```php
<?php

namespace Pyz\Zed\ExampleWorkflow\Communication\Plugin\StateMachine;

use Pyz\Zed\ExampleWorkflow\ExampleWorkflowConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Workflow\Dependency\Plugin\StateMachineProcessTriggerPluginInterface;

class MerchantRelationshipCreateStateMachineProcessTriggerPlugin extends AbstractPlugin implements StateMachineProcessTriggerPluginInterface
{
    public function getEventName(): string
    {
        return ExampleWorkflowConfig::EVENT_MERCHANT_RELATIONSHIP_CREATE;
    }

    public function getName(): string
    {
        return 'Merchant relationship created';
    }

    public function getSubjectType(): string
    {
        return ExampleWorkflowConfig::SUBJECT_TYPE_MERCHANT_RELATIONSHIP;
    }

    public function getDescription(): string
    {
        return 'Fired when a new merchant relationship is created.';
    }
}
```

Register the plugin:

**src/Pyz/Zed/Workflow/WorkflowDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Workflow;

use Pyz\Zed\ExampleWorkflow\Communication\Plugin\StateMachine\MerchantRelationshipCreateStateMachineProcessTriggerPlugin;
use Spryker\Zed\Workflow\WorkflowDependencyProvider as SprykerWorkflowDependencyProvider;

class WorkflowDependencyProvider extends SprykerWorkflowDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Workflow\Dependency\Plugin\StateMachineProcessTriggerPluginInterface>
     */
    protected function getTriggerPlugins(): array
    {
        return [
            new MerchantRelationshipCreateStateMachineProcessTriggerPlugin(),
        ];
    }
}
```

## 4) Add the event listener

The listener receives the event and starts the workflow instance. The subject identifier is the ID of the created entity. The listener gets `WorkflowFacadeInterface` from the module's communication factory, which receives it through the module's dependency provider.

**src/Pyz/Zed/ExampleWorkflow/Communication/Plugin/Event/Listener/StateMachineMerchantRelationshipEventListenerPlugin.php**

```php
<?php

namespace Pyz\Zed\ExampleWorkflow\Communication\Plugin\Event\Listener;

use Generated\Shared\Transfer\EventEntityTransfer;
use Generated\Shared\Transfer\StateMachineEventTriggerRequestTransfer;
use Pyz\Zed\ExampleWorkflow\ExampleWorkflowConfig;
use Spryker\Shared\Kernel\Transfer\TransferInterface;
use Spryker\Zed\Event\Dependency\Plugin\EventHandlerInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\ExampleWorkflow\Communication\ExampleWorkflowCommunicationFactory getFactory()
 */
class StateMachineMerchantRelationshipEventListenerPlugin extends AbstractPlugin implements EventHandlerInterface
{
    /**
     * @param string $eventName
     */
    public function handle(TransferInterface $transfer, $eventName): void
    {
        if (!$transfer instanceof EventEntityTransfer || $transfer->getId() === null) {
            return;
        }

        $this->getFactory()->getWorkflowFacade()->startStateMachineInstance(
            (new StateMachineEventTriggerRequestTransfer())
                ->setEventName(ExampleWorkflowConfig::EVENT_MERCHANT_RELATIONSHIP_CREATE)
                ->setSubjectType(ExampleWorkflowConfig::SUBJECT_TYPE_MERCHANT_RELATIONSHIP)
                ->setIdentifier((int)$transfer->getId()),
        );
    }
}
```

## 5) Subscribe the listener to the event

Register the listener as queued, so starting the workflow does not slow down the request that created the entity. Queued listeners run when the `event` queue is processed.

**src/Pyz/Zed/ExampleWorkflow/Communication/Plugin/Event/Subscriber/StateMachineMerchantRelationshipEventSubscriberPlugin.php**

```php
<?php

namespace Pyz\Zed\ExampleWorkflow\Communication\Plugin\Event\Subscriber;

use Pyz\Zed\ExampleWorkflow\Communication\Plugin\Event\Listener\StateMachineMerchantRelationshipEventListenerPlugin;
use Pyz\Zed\ExampleWorkflow\ExampleWorkflowConfig;
use Spryker\Zed\Event\Dependency\EventCollectionInterface;
use Spryker\Zed\Event\Dependency\Plugin\EventSubscriberInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class StateMachineMerchantRelationshipEventSubscriberPlugin extends AbstractPlugin implements EventSubscriberInterface
{
    public function getSubscribedEvents(EventCollectionInterface $eventCollection)
    {
        $eventCollection->addListenerQueued(
            ExampleWorkflowConfig::EVENT_MERCHANT_RELATIONSHIP_CREATE,
            new StateMachineMerchantRelationshipEventListenerPlugin(),
        );

        return $eventCollection;
    }
}
```

Register the subscriber:

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Pyz\Zed\ExampleWorkflow\Communication\Plugin\Event\Subscriber\StateMachineMerchantRelationshipEventSubscriberPlugin;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();

        $eventSubscriberCollection->add(new StateMachineMerchantRelationshipEventSubscriberPlugin());

        return $eventSubscriberCollection;
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Administration > Workflows** and click **Create Workflow**.
2. In **Subject type**, make sure `MerchantRelationship` is available. Select it and make sure **Merchant relationship created** is available in **Triggers**.
3. Create the workflow, then activate it and its version.
4. Create a merchant relationship and process the event queue.
5. Open the workflow's active version and make sure a new instance for the merchant relationship appears in **Workflow activity**.

{% endinfo_block %}

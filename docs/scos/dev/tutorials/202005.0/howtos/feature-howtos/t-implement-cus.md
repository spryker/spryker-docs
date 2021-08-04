---
title: HowTo - Implement Customer Approval Process Based on a Generic State Machine
originalLink: https://documentation.spryker.com/v5/docs/t-implement-customer-approval-process-on-state-machine
redirect_from:
  - /v5/docs/t-implement-customer-approval-process-on-state-machine
  - /v5/docs/en/t-implement-customer-approval-process-on-state-machine
---

## Introduction
There are only few things need to do to implement any business processes based on `StateMachine` module:

1. First of all you need to add table in DB to connect Entity and StateMachine. In our case it's Customer Entity.
2. We need to create CRUD operations for our new table.
3. Implement `StateMachineHandlerInterface` plugin and add into StateMachine module dependencies.
4. Implement some Command and Condition plugins (if need it).
5. Create state machine xml file with customer approve flow.
6. Provide Zed UI presentation.

## Schema Creation
Customer Approve Process Database Schema

```php
<table name="pyz_customer_approve_process_item">
    <column name="id_customer_approve_process_item" required="true" type="INTEGER" autoIncrement="true" primaryKey="true"/>
    <column name="fk_customer" type="INTEGER" required="true"/>
    <column name="fk_state_machine_item_state" type="INTEGER" required="false"/>
    <column name="fk_state_machine_process" type="INTEGER" required="false"/>
 
    <foreign-key name="pyz_customer_approve_process_item-fk_customer" foreignTable="spy_customer">
        <reference local="fk_customer" foreign="id_customer"/>
    </foreign-key>
 
    <foreign-key name="pyz_customer_approve_process_item-fk_state_machine_item_state" foreignTable="spy_state_machine_item_state">
        <reference local="fk_state_machine_item_state" foreign="id_state_machine_item_state"/>
    </foreign-key>
 
    <foreign-key name="pyz_customer_approve_process_item-fk_state_machine_process" foreignTable="spy_state_machine_process">
        <reference local="fk_state_machine_process" foreign="id_state_machine_process"/>
    </foreign-key>
 
    <id-method-parameter value="pyz_customer_approve_process_item_pk_seq"/>
</table>
```

We have added several foreign keys including foreign key to the `spy_customer` table.

## CRUD Implementation
We will need few operations for managing customer approve process:

CustomerApproveProcessFacadeInterface

```php
<?php
 
namespace Pyz\Zed\CustomerApproveProcess\Business;
 
use Generated\Shared\Transfer\CustomerApproveProcessItemTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\StateMachineItemTransfer;
 
interface CustomerApproveProcessFacadeInterface
{
    /**
     * Retrieves all our approve process items. Used for Zed UI presentation.
     *
     * @return \Generated\Shared\Transfer\CustomerApproveProcessItemTransfer[]
     */
    public function getAllCustomerApproveProcessItems(): array;
 
    /**
     * Retrieves approve process items by state ids. Used in `StateMachineHandlerPlugin`.
     *
     * @param int[] $stateIds
     *
     * @return \Generated\Shared\Transfer\CustomerApproveProcessItemTransfer[]
     */
    public function getCustomerApproveProcessItemsByStateIds(array $stateIds = []): array;
 
    /**
     * Creates `SpyCustomerApproveProcessItem` entity based on `CustomerTransfer` (only customer id is used) and saves it into DB.
     *
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerApproveProcessItemTransfer
     */
    public function createCustomerApproveProcessStateMachineItem(CustomerTransfer $customerTransfer): CustomerApproveProcessItemTransfer;
 
    /**
     * Updates `SpyCustomerApproveProcessItem` entity and saves it into DB. Used when we moving item through state machine.
     *
     * @param \Generated\Shared\Transfer\StateMachineItemTransfer $stateMachineItemTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerApproveProcessItemTransfer
     */
    public function updateCustomerApproveProcessStateMachineItem(StateMachineItemTransfer $stateMachineItemTransfer): CustomerApproveProcessItemTransfer;
 
    /**
     * Deletes `SpyCustomerApproveProcessItem` entity from DB.
     *
     * @param int $customerApproveProcessItemId
     *
     * @return void
     */
    public function deleteCustomerApproveProcessStateMachineItem(int $customerApproveProcessItemId): void;
}
```

This is all you need to implement in the business layer.
`CustomerApproveProcessItemTransfer` was implemented to keep all the data in one place for further usage.

transfer.xml

```html
<transfer name="CustomerApproveProcessItem">
    <property name="idCustomerApproveProcessItem" type="int"/>
    <property name="idCustomer" type="int"/>
    <property name="customerName" type="string"/>
    <property name="customerEmail" type="string"/>
    <property name="stateMachineItem" type="StateMachineItem"/>
    <property name="stateHistory" type="StateMachineItem[]"/>
</transfer>
```

## StateMachineHandlerPlugin
CustomerApproveProcessStateMachineHandlerPlugin

```php
<?php
 
namespace Pyz\Zed\CustomerApproveProcess\Communication\Plugin;
 
use Generated\Shared\Transfer\StateMachineItemTransfer;
use Pyz\Zed\CustomerApproveProcess\Communication\Plugin\Command\CustomerApproveProcessCommandPlugin;
use Pyz\Zed\CustomerApproveProcess\Communication\Plugin\Condition\CustomerApproveProcessConditionPlugin;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\StateMachine\Dependency\Plugin\StateMachineHandlerInterface;
 
/**
 * @method \Pyz\Zed\CustomerApproveProcess\Business\CustomerApproveProcessFacadeInterface getFacade()
 */
class CustomerApproveProcessStateMachineHandlerPlugin extends AbstractPlugin implements StateMachineHandlerInterface
{
    /**
     * List of command plugins for this state machine for all processes.
     *
     * @return \Spryker\Zed\StateMachine\Dependency\Plugin\CommandPluginInterface[]
     */
    public function getCommandPlugins(): array
    {
        return [
            'CustomerApproveProcess/CustomerApproveProcessCommand' => new CustomerApproveProcessCommandPlugin(),
        ];
    }
 
    /**
     * List of condition plugins for this state machine for all processes.
     *
     * @return \Spryker\Zed\StateMachine\Dependency\Plugin\ConditionPluginInterface[]
     */
    public function getConditionPlugins(): array
    {
        return [
            'CustomerApproveProcess/CustomerApproveProcessCondition' => new CustomerApproveProcessConditionPlugin(),
        ];
    }
 
    /**
     * Name of state machine used by this handler.
     *
     * @return string
     */
    public function getStateMachineName(): string
    {
        return 'CustomerApproveProcess';
    }
 
    /**
     * List of active processes used for this state machine
     *
     * @return string[]
     */
    public function getActiveProcesses(): array
    {
        return [
            'Process01',
        ];
    }
 
    /**
     * Provide initial state name for item when state machine initialized. Using process name.
     *
     * @param string $processName
     *
     * @throws \InvalidArgumentException
     *
     * @return string
     */
    public function getInitialStateForProcess($processName): string
    {
        return 'new';
    }
 
    /**
     * This method is called when state of item was changed, client can create custom logic for example update it's related table with new state id/name.
     * StateMachineItemTransfer:identifier is id of entity from implementor.
     *
     * @param \Generated\Shared\Transfer\StateMachineItemTransfer $stateMachineItemTransfer
     *
     * @return bool
     */
    public function itemStateUpdated(StateMachineItemTransfer $stateMachineItemTransfer): bool
    {
        $customerApproveProcessItemTransfer = $this->getFacade()
            ->updateCustomerApproveProcessStateMachineItem($stateMachineItemTransfer);
 
        if ($customerApproveProcessItemTransfer->getIdCustomerApproveProcessItem()) {
            return true;
        }
 
        return false;
    }
 
    /**
     * This method should return all list of StateMachineItemTransfer, with (identifier, IdStateMachineProcess, IdItemState)
     *
     * @param array $stateIds
     *
     * @return \Generated\Shared\Transfer\StateMachineItemTransfer[]
     */
    public function getStateMachineItemsByStateIds(array $stateIds = []): array
    {
        $customerApproveProcessItems = $this->getFacade()->getCustomerApproveProcessItemsByStateIds($stateIds);
        $stateMachineItems = [];
        foreach ($customerApproveProcessItems as $customerApproveProcessItem) {
            $stateMachineItems[] = $customerApproveProcessItem->getStateMachineItem();
        }
 
        return $stateMachineItems;
    }
}
```

## Commands and Conditions
CustomerApproveProcessCommandPlugin

```php
<?php
 
namespace Pyz\Zed\CustomerApproveProcess\Communication\Plugin\Command;
 
use Generated\Shared\Transfer\StateMachineItemTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\StateMachine\Dependency\Plugin\CommandPluginInterface;
 
/**
 * @method \Pyz\Zed\ExampleStateMachine\Business\ExampleStateMachineFacade getFacade()
 * @method \Pyz\Zed\ExampleStateMachine\Communication\ExampleStateMachineCommunicationFactory getFactory()
 * @method \Pyz\Zed\ExampleStateMachine\Persistence\ExampleStateMachineQueryContainerInterface getQueryContainer()
 */
class CustomerApproveProcessCommandPlugin extends AbstractPlugin implements CommandPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\StateMachineItemTransfer $stateMachineItemTransfer
     *
     * @return void
     */
    public function run(StateMachineItemTransfer $stateMachineItemTransfer): void
    {
        //Do your business logic here through Facade.
    }
}
```

CustomerApproveProcessConditionPlugin

```php
<?php
 
namespace Pyz\Zed\CustomerApproveProcess\Communication\Plugin\Condition;
 
use Generated\Shared\Transfer\StateMachineItemTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\StateMachine\Dependency\Plugin\ConditionPluginInterface;
 
/**
 * @method \Pyz\Zed\ExampleStateMachine\Business\ExampleStateMachineFacade getFacade()
 * @method \Pyz\Zed\ExampleStateMachine\Communication\ExampleStateMachineCommunicationFactory getFactory()
 * @method \Pyz\Zed\ExampleStateMachine\Persistence\ExampleStateMachineQueryContainerInterface getQueryContainer()
 */
class CustomerApproveProcessConditionPlugin extends AbstractPlugin implements ConditionPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\StateMachineItemTransfer $stateMachineItemTransfer
     *
     * @return bool
     */
    public function check(StateMachineItemTransfer $stateMachineItemTransfer): bool
    {
        //Check your condition here.
         
        return true;
    }
}
```

## Customer Approve Process Flow XML File
There is a simple example of the state machine process, you need to put it into `config/Zed/StateMachine/CustomerApproveProcess/Process01.xml`.

Process01.xml

```html
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:state-machine-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:state-machine-01 http://static.spryker.com/state-machine-01.xsd">
 
    <process name="Process01" main="true">
 
        <states>
            <state name="new" />
            <state name="waiting for approve" />
            <state name="approved" />
            <state name="declined" />
            <state name="closed" />
        </states>
 
        <events>
            <event name="ask for approve" onEnter="true" command="CustomerApproveProcess/CustomerApproveProcessCommand" />
            <event name="approve" manual="true" command="CustomerApproveProcess/CustomerApproveProcessCommand" />
            <event name="decline" manual="true" command="CustomerApproveProcess/CustomerApproveProcessCommand" />
            <event name="close" manual="true" command="CustomerApproveProcess/CustomerApproveProcessCommand" />
        </events>
 
        <transitions>
            <transition happy="true">
                <source>new</source>
                <target>waiting for approve</target>
                <event>ask for approve</event>
            </transition>
 
            <transition happy="true" condition="CustomerApproveProcess/CustomerApproveProcessCondition">
                <source>waiting for approve</source>
                <target>approved</target>
                <event>approve</event>
            </transition>
 
            <transition>
                <source>waiting for approve</source>
                <target>declined</target>
                <event>decline</event>
            </transition>
 
            <transition happy="true">
                <source>approved</source>
                <target>closed</target>
                <event>close</event>
            </transition>
 
            <transition>
                <source>declined</source>
                <target>closed</target>
                <event>close</event>
            </transition>
 
        </transitions>
 
    </process>
 
</statemachine>
```

## Zed UI presentation
For representing our process items in Zed UI we need only two things: controller and template.
Controller includes list of all items, add new item, delete item actions:

StateMachineItemsController

```php
<?php
 
namespace Pyz\Zed\CustomerApproveProcess\Communication\Controller;
 
use Generated\Shared\Transfer\CustomerTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Spryker\Zed\StateMachine\Business\StateMachineFacadeInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
 
/**
 * @method \Pyz\Zed\CustomerApproveProcess\Communication\CustomerApproveProcessCommunicationFactory getFactory()
 * @method \Pyz\Zed\CustomerApproveProcess\Business\CustomerApproveProcessFacadeInterface getFacade()
 */
class StateMachineItemsController extends AbstractController
{
    /**
     * @return array
     */
    public function listAction(): array
    {
        $customerApproveProcessStateItems = $this->getFacade()
            ->getAllCustomerApproveProcessItems();
 
        $processedStateMachineItems = $this->getStateMachineFacade()
            ->getProcessedStateMachineItems(
                $this->getStateMachineItems($customerApproveProcessStateItems)
            );
 
        $manualEvents = $this->getStateMachineFacade()
            ->getManualEventsForStateMachineItems($processedStateMachineItems);
 
        return [
            'customerApproveProcessItems' => $customerApproveProcessStateItems,
            'manualEvents' => $manualEvents,
            'stateMachineItems' => $this->createCustomerApproveProcessItemsLookupTable($processedStateMachineItems),
        ];
    }
 
    /**
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function addItemAction(): RedirectResponse
    {
        $customerTransfer = (new CustomerTransfer())
            ->setIdCustomer(mt_rand(1, 26));
 
        $this->getFacade()->createCustomerApproveProcessStateMachineItem($customerTransfer);
 
        return $this->redirectResponse('/customer-approve-process/state-machine-items/list');
    }
 
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteItemAction(Request $request): RedirectResponse
    {
        $idCustomerApproveProcessItem = $this->castId($request->query->get('id'));
        $this->getFacade()->deleteCustomerApproveProcessStateMachineItem($idCustomerApproveProcessItem);
 
        return $this->redirectResponse('/customer-approve-process/state-machine-items/list');
    }
 
    /**
     * @param \Generated\Shared\Transfer\CustomerApproveProcessItemTransfer[] $customerApproveProcessStateItems
     *
     * @return \Generated\Shared\Transfer\StateMachineItemTransfer[]
     */
    protected function getStateMachineItems(array $customerApproveProcessStateItems): array
    {
        $stateMachineItems = [];
        foreach ($customerApproveProcessStateItems as $customerApproveProcessStateItem) {
            $stateMachineItems[] = $customerApproveProcessStateItem->getStateMachineItem();
        }
 
        return $stateMachineItems;
    }
 
    /**
     * @param \Generated\Shared\Transfer\StateMachineItemTransfer[] $stateMachineItems
     *
     * @return \Generated\Shared\Transfer\StateMachineItemTransfer[]
     */
    protected function createCustomerApproveProcessItemsLookupTable(array $stateMachineItems): array
    {
        $lookupIndex = [];
        foreach ($stateMachineItems as $stateMachineItemTransfer) {
            $lookupIndex[$stateMachineItemTransfer->getIdentifier()] = $stateMachineItemTransfer;
        }
 
        return $lookupIndex;
    }
 
    /**
     * @return \Spryker\Zed\StateMachine\Business\StateMachineFacadeInterface
     */
    protected function getStateMachineFacade(): StateMachineFacadeInterface
    {
        return $this->getFactory()->getStateMachineFacade();
    }
}
```

We need the template only for the list action, there is an example:

transfer.xml

```html
{% raw %}{%{% endraw %} extends '@Cms/Layout/layout.twig' {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} set widget_title = 'Customer Approve Process State Machine' {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block head_title widget_title {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} block section_title widget_title {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    <a href="/customer-approve-process/state-machine-items/add-item">Add item</a>  <br />
    <table class="table table-striped table-bordered table-hover gui-table-data dataTable">
        <tr>
            <th>Id</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>State Machine Name</th>
            <th>Process Name</th>
            <th>State</th>
            <th>Trigger</th>
            <td>Action</td>
        </tr>
    {% raw %}{%{% endraw %} for customerApproveProcessItem in customerApproveProcessItems {% raw %}%}{% endraw %}
        <tr>
            <td>{% raw %}{{{% endraw %} customerApproveProcessItem.idCustomerApproveProcessItem {% raw %}}}{% endraw %}</td>
            <td>
                <a href="{% raw %}{{{% endraw %} url('/customer/view', { 'id-customer' : customerApproveProcessItem.idCustomer }) {% raw %}}}{% endraw %}">
                    {% raw %}{{{% endraw %} customerApproveProcessItem.customerName {% raw %}}}{% endraw %}
                </a>
            </td>
            <td>{% raw %}{{{% endraw %} customerApproveProcessItem.customerEmail {% raw %}}}{% endraw %}</td>
            <td>{% raw %}{{{% endraw %} customerApproveProcessItem.stateMachineItem.stateMachineName {% raw %}}}{% endraw %}</td>
            <td>{% raw %}{{{% endraw %} customerApproveProcessItem.stateMachineItem.processName {% raw %}}}{% endraw %}</td>
            <td>
                {% raw %}{%{% endraw %} if stateMachineItems | length > 0 and stateMachineItems[customerApproveProcessItem.idCustomerApproveProcessItem] is defined {% raw %}%}{% endraw %}
                    <a href="{% raw %}{{{% endraw %} url(
                      '/state-machine/graph/drawItem',
                      {
                          process: stateMachineItems[customerApproveProcessItem.idCustomerApproveProcessItem].getProcessName,
                          'state-machine': stateMachineItems[customerApproveProcessItem.idCustomerApproveProcessItem].getStateMachineName,
                          'highlight-state' : stateMachineItems[customerApproveProcessItem.idCustomerApproveProcessItem].getStateName
                      }) {% raw %}}}{% endraw %}"
                    >
                        {% raw %}{{{% endraw %} stateMachineItems[customerApproveProcessItem.idCustomerApproveProcessItem].getStateName {% raw %}}}{% endraw %}
                    </a>
                {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} if customerApproveProcessItem.stateHistory | length > 1 {% raw %}%}{% endraw %}
                    <div id="history_details_{% raw %}{{{% endraw %} customerApproveProcessItem.idCustomerApproveProcessItem {% raw %}}}{% endraw %}">
                        {% raw %}{%{% endraw %} for stateHistory in customerApproveProcessItem.stateHistory | slice(1) {% raw %}%}{% endraw %}
                            <div>{% raw %}{{{% endraw %} stateHistory.stateName {% raw %}}}{% endraw %} ({% raw %}{{{% endraw %} stateHistory.createdAt | formatDateTime {% raw %}}}{% endraw %})</div>
                        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                    </div>
                {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
            </td>
            <td>
                {% raw %}{%{% endraw %} if manualEvents | length > 0 and manualEvents[customerApproveProcessItem.idCustomerApproveProcessItem] is defined {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} for event in manualEvents[customerApproveProcessItem.idCustomerApproveProcessItem] {% raw %}%}{% endraw %}
                        <a class="btn btn-primary btn-sm trigger-order-single-event"
                           href="{% raw %}{{{% endraw %} url('/state-machine/trigger/trigger-event',
                           {
                               'event' : event,
                               'identifier': customerApproveProcessItem.idCustomerApproveProcessItem,
                               'id-state' : customerApproveProcessItem.stateMachineItem.idItemState,
                               redirect : '/customer-approve-process/state-machine-items/list'
                           }) {% raw %}}}{% endraw %}"
                        >
                            {% raw %}{{{% endraw %} event {% raw %}}}{% endraw %}
                        </a>
                    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} else -{% raw %}%}{% endraw %}
                    No manual events
                {% raw %}{%{% endraw %}- endif {% raw %}%}{% endraw %}
            </td>
            <td>
                <a href="{% raw %}{{{% endraw %} url('/customer-approve-process/state-machine-items/delete-item', { id : customerApproveProcessItem.idCustomerApproveProcessItem }) {% raw %}}}{% endraw %}">
                    Delete
                </a>
            </td>
        </tr>
    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
    </table>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

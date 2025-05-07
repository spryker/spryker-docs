---
title: State machine console commands
description: This document presents the console commands for state machine that you can use to help manage the Spryker State Machine within your Spryker Projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/state-machine-cronjob
originalArticleId: 0a565727-43ef-4484-ae01-a0384a70e4d6
redirect_from:
  - /2021080/docs/state-machine-cronjob
  - /2021080/docs/en/state-machine-cronjob
  - /docs/state-machine-cronjob
  - /docs/en/state-machine-cronjob
  - /v6/docs/state-machine-cronjob
  - /v6/docs/en/state-machine-cronjob
  - /v5/docs/state-machine-cronjob
  - /v5/docs/en/state-machine-cronjob
  - /v4/docs/state-machine-cronjob
  - /v4/docs/en/state-machine-cronjob
  - /v3/docs/state-machine-cronjob
  - /v3/docs/en/state-machine-cronjob
  - /v2/docs/state-machine-cronjob
  - /v2/docs/en/state-machine-cronjob
  - /v1/docs/state-machine-cronjob
  - /v1/docs/en/state-machine-cronjob
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/state-machine-console-commands.html  
related:
  - title: Order management system multi-thread
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/state-machine/order-management-system-multi-thread.html
  - title: Order process modelling via state machines
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html
  - title: Common pitfalls in OMS design
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.html
  - title: Create an Order Management System - Spryker Commerce OS
    link: docs/scos/dev/back-end-development/data-manipulation/create-an-order-management-system-spryker-commerce-os.html
---

There are three console commands dedicated for the state machine:

**state-machine:check-condition** - checks all the states that have a condition without event and triggers them.
**state-machine:check-timeout** - check timeout expired items and triggers event for them.
**state-machine:clear-locks** - clears expired lock items. State machine triggers are encapsulated in lock, this lock is to prevent concurrent access to same item processing. Each lock has defined expiration time for 1 min. Sometimes lock cannot be released, (error in execution or premature termination). This commands does garbage collections and cleans all those locks.
State machine event trigger sequence diagram

A low level sequence diagram of what happens when trigger method is being invoked.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data-Payload+Conversion/Stata+Machine/state_machine_event_trigger_sequence.png)

## State Machine Handler Interface

StateMachineHandlerInterface

```php
<?php
interface StateMachineHandlerInterface
{

    /**
     * List of command plugins for this state machine for all processes. Array key is identifier in SM XML file.
     *
     * [
     *   'Command/Plugin' => new Command(),
     *   'Command/Plugin2' => new Command2(),
     * ]
     *
     * @return \Spryker\Zed\StateMachine\Dependency\Plugin\CommandPluginInterface[]
     */
    public function getCommandPlugins();

    /**
     * List of condition plugins for this state machine for all processes. Array key is identifier in SM XML file.
     *
     *  [
     *   'Condition/Plugin' => new Condition(),
     *   'Condition/Plugin2' => new Condition2(),
     * ]
     *
     * @return \Spryker\Zed\StateMachine\Dependency\Plugin\ConditionPluginInterface[]
     */
    public function getConditionPlugins();

    /**
     * Name of state machine used by this handler.
     *
     * @return string
     */
    public function getStateMachineName();

    /**
     * List of active processes used for this state machine.
     *
     * [
     *   'ProcessName',
     *   'ProcessName2 ,
     * ]
     *
     * @return string[]
     */
    public function getActiveProcesses();

    /**
     * Provide initial state name for item when state machine initialized. Using process name.
     *
     * @param string $processName
     *
     * @return string
     */
    public function getInitialStateForProcess($processName);

    /**
     * This method is called when state of item was changed, client can create custom logic for example update it's related table with new stateId and processId.
     * StateMachineItemTransfer:identifier is id of entity from client.
     *
     * @param \Generated\Shared\Transfer\StateMachineItemTransfer $stateMachineItemTransfer
     *
     * @return bool
     */
    public function itemStateUpdated(StateMachineItemTransfer $stateMachineItemTransfer);

    /**
     * This method should return all list of StateMachineItemTransfer, with (identifier, IdStateMachineProcess, IdItemState)
     *
     * @param int[] $stateIds
     *
     * @return \Generated\Shared\Transfer\StateMachineItemTransfer[]
     */
    public function getStateMachineItemsByStateIds(array $stateIds = []);

}
```

## Condition Plugin Interface

```php
<?php
interface ConditionPluginInterface
{
    /**
     * This method is called when transition in SM xml file have concrete condition assigned.
     *
     * @param \Generated\Shared\Transfer\StateMachineItemTransfer $stateMachineItemTransfer
     *
     * @return bool
     */
    public function check(StateMachineItemTransfer $stateMachineItemTransfer);

}
```

## Command Plugin Interface

```
<?php
interface CommandPluginInterface
{

    /**
     * This method is called when event have concrete command assigned.
     *
     * @param \Generated\Shared\Transfer\StateMachineItemTransfer $stateMachineItemTransfer
     *
     * @return void
     */
    public function run(StateMachineItemTransfer $stateMachineItemTransfer);

}
```

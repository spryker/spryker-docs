---
title: State Machine Console Commands
originalLink: https://documentation.spryker.com/v5/docs/state-machine-cronjob
redirect_from:
  - /v5/docs/state-machine-cronjob
  - /v5/docs/en/state-machine-cronjob
---

There are three console commands dedicated for the state machine:

**state-machine:check-condition** - checks all the states that have a condition without event and triggers them.
**state-machine:check-timeout** - check timeout expired items and triggers event for them.
**state-machine:clear-locks** - clears expired lock items. State machine triggers are encapsulated in lock, this lock is to prevent concurrent access to same item processing. Each lock has defined expiration time for 1 min. Sometimes lock cannot be released, (error in execution or premature termination). This commands does garbage collections and cleans all those locks.
State machine event trigger sequence diagram

A low level sequence diagram of what happens when trigger method is being invoked.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data-Payload+Conversion/Stata+Machine/state_machine_event_trigger_sequence.png){height="" width=""}

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



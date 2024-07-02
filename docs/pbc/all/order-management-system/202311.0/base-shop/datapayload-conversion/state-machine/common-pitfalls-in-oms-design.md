---
title: Common pitfalls in OMS design
description: This document explains the common pitfalls in OMS design in the Spryker Commerce OS.
last_updated: Mar 24, 2024
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.html
related:
  - title: Order management system multi-thread
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/state-machine/order-management-system-multi-thread.html
  - title: Order process modelling via state machines
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html
  - title: State machine console commands
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/state-machine/state-machine-console-commands.html
  - title: Create an Order Management System - Spryker Commerce OS
    link: docs/scos/dev/back-end-development/data-manipulation/create-an-order-management-system-spryker-commerce-os.html
---


Implementing OMS processes can be challenging when they're complex or requirements aren't trivial. This can lead to hidden issues, which are hard to debug. An example of such issues is race conditions.

In some cases, OMS works incorrectly. In most cases, a *correct* flow can be run successfully, but the first run of a wrong path might reveal a problem. In other cases, there might be known limitations that can lead to incorrect transitions. There can also be cases that are valid but should be rewritten into a more readable process. If you discover more edge cases, send them to our [support team](https://spryker.force.com/support/s/).

This document describes the most common issues with OMS design and how you can fix them.

## More than one onEnter event from one state

**Issue**: If there is more than one onEnter transition event from state A, only one is executed.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-1.png)

**Reason**: This behavior isn't supported because there must always be only one state after an event execution.

**Solution**: If you have different commands, you can chain them:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-1-fixed.png)

If you have the same commands, give one of them a condition:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-1-solution-2.png)



## Defining states with names

**Issue:** States with the same names are declared in several processes.

**Reason:** When a process or a sub-process is read, transitions are assigned to the *from*-state in the current process or sub-process. In case of several declarations, these are be different *from*-states.

**Solution**: Define states only with unique names. We recommend defining the state in the process which introduces it. You can define transition in other states.

**Tip:** Declare the state in the process where it has outgoing transitions.

## Duplicate events

**Issue:** Events with the same name are declared in multiple processes.

In the OMS drawing, you see the last *read* event definition, but during the execution, any can be defined.

**Solutions:**

- Rename one of the events.
- Keep only one event. We recommend having reusable events in the main process rather than using those from sub-processes.

## States with only outgoing transitions

**Issue**: There are many states with only outgoing transitions.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-2.png)

**Reason**: Function `OmsConfig:getInitialStatus` has only one return value, so it's impossible to start from another "initial" state.

**Solution**: In most cases, this is a mistake, and the transition between some states is missing. Adding a transition makes the process correct. For example, adding the `payment done` → `shipped`  transition with the `ship` event brings the whole process to a correct state.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-2-fixed.png)

{% info_block infoBox "" %}

You can change order items' states using a manual call, which lets you use the states without inbound transitions. This prevents overwhelming the process with 10+ transitions to a cancellation process. However, this makes the process definition incomplete, so this approach is not recommended.

{% endinfo_block %}

## More than one main process

```xml
<statemachine>
    <process name="No" main="true">
        <subprocesses>
            <process>No2</process>
        </subprocesses>
    </process>

    <process name="No2" main="true">
    ...
    </process>
</statemachine>
```


**Issue:** Having more than one main process can lead to incorrect process rendering and execution:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-7.png)

When placing an order, this issue causes an error like the following:

```php
Exception - Unknown state: new in "/data/vendor/spryker/oms/src/Spryker/Zed/Oms/
Business/Process/Process.php::198" {"exception":"[object] (Exception(code: 0):
Unknown state: new at /data/vendor/spryker/oms/src/Spryker/Zed/Oms/Business/
Process/Process.php:198)
```

**Solution:** Removing the duplicate `main` flag fixes the process rendering and processing:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-7-fixed.png)

## More than one transition with the same events and without a condition

**Issue**: It's impossible to guess which transition is expected, so the first one read is executed.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-5.png)

**Solution 1:** Add a condition to one of the transitions:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-5-fixed.png)

**Solution 2:** Change event to one transition:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-5-fixed-2.png)

## Conditional, timeout, and manual transitions from the same state

**Issue**: Creating a condition and a timeout, or a manual event and a condition, or a manual event and a timeout from the same state leads to errors.

**Reason**: Condition check and timeout execution happen in different console commands, and the order of the execution is not defined by the OMS but by a scheduler. The execution of the manual event can also happen during the console command execution, which makes the resulting state of the order items unpredictable.

**Solution:**

1. Rewrite the process to check the condition after the timeout.
2. Use `TimeoutProcessor`. It significantly decreases the probability of simultaneous execution.

## Using an asynchronous break without command and condition

**Issue:** Adding a timeout pauses the execution process and unblocks external systems.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-9.png)

**Reasons**:

- Timeout triggers the DB update, namely—the creation of a timeout entry for each order item in the `spy_oms_event_timeout` table.
- Timeout check requires a DB query to find the affected entries.

**Solution**: Use an event (`pause`) without command and without condition. The event doesn't interact with the DB and it's executed with the next run of the `oms:check-condition` command.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/image-20210924-103858.png)

## Unused events or states

**Issue:** A process contains a declaration of a state that's never used:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-15.png)

The unused state may have a missing transition.

**Solution:** Delete the state or add a transition:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-15-solution.png)


## Long timeouts

**Example:** *Export finished* is the final state from the business perspective, but, from the OMS perspective, the final state is *closed*. That's because the business wants to create a return or refund anytime after an order is completed. In the timeout processor, the system has a configurable value in days, 9999 in this example, to manage how many days an order is moved to the closed state.
![huge_timeouts](https://github.com/xartsiomx/spryker-docs/assets/110463030/b3038a9a-564e-47de-9b09-397137d4a02e)

**Issue:** After the order is pushed to the `export finished`, for every order item, a record is created in the `spy_oms_event_timeout` table. For example, if you have 10000 orders per day each containing 100 items, approximately one million records are created. Because of a long timeout, the system is storing this data for a long time. This causes storage issues and slows down OMS processes.

**Solution:** In the described scenario, you might not need the final state closed at all. Replace timeout with a manual trigger if an automatic transition is needed. Try to avoid timeouts with a duration of more than seven days.

## Long chain onEnter

**Example:** When a recalculation is started by `oms:check-condition`, it triggers a chain of `onEnter` events with more than eight transitions in it.
![long-chain-on-enter](https://github.com/xartsiomx/spryker-docs/assets/110463030/2cafb0fe-1388-434e-a783-7838535a69e7)

**Issue:** Long chains of `onEnter` events can be “fragile”. It increases the time of execution, memory consumption, and the risk of having an error in the middle of the process, which results in a stuck order item.

**Solution:** Remove unnecessary states and `onEnter` transitions. If you have an event with `onEnter` that doesn’t have any command or condition, consider removing it. Split long chains into several smaller ones. This especially applies to chains that are starting from `check*` commands, like condition and timeout.

## Slow order creation

**Issue:** Orders start processing directly after placement. The checkout endpoint contains the execution of all `onEnter` transitions in OMS.
![slow-order-creation](https://github.com/xartsiomx/spryker-docs/assets/110463030/02892077-3d8d-432e-a6a4-281dcdb9824d)

**Solution:** Configure the checkout endpoint logic to finish after an order is created with all items in starting states—for example, `new`. The transition from the `new` state shouldn’t have an event and is processed by the `oms:check-condition` command.

## Stuck onEnter

**Issue:** In most cases, if you have an order item stuck during the `onEnter` transition, there's an unexpected error during execution.

**Solution 1:** If you aren't in a hurry, we recommend checking and fixing each issue individually.

**Solution 2:** Use this solution if you have many stuck items and you need to fix them quickly. Create a console command that triggers `onEnter` events. We recommend creating a list of OMS states which you want to check and move order items from. Set limits for orders (not items) and time windows. For example, check stuck order items only if their last state update was after two hours.

## Saving states per item transaction

**Example:** The system has a callback that moves order items from `picking started` to `ready for recalculation`. After that, a check-condition moves the order to the `recalculation` step.
![saving-states-1](https://github.com/xartsiomx/spryker-docs/assets/110463030/bc4d581b-d587-4f84-bb17-3452d4573ae4)

**Issue:** During the last transition in the callback from `picking finished` to `ready for recalculation`, a Jenkins job starts the `check-condition` command. Because of the command, the check-condition takes only a part of order items and pushes them forward. The next job executes the remaining order items with a delay, so many commands are triggered twice.
![saving-states-2](https://github.com/xartsiomx/spryker-docs/assets/110463030/1fd1b30f-00dc-49eb-8d35-37583e140f5e)

**Solution:** This is possible because, during the execution of `\Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachine::saveOrderItems`, the system stores data per item. That's because the core logic expects that there may be more than one order in transition. To avoid blocking all of them due to a potential failed order, transition is executed per item. To change that, group order items per order and change the transaction behavior to store all order items per one transaction. Then, a check-condition or any other command can’t take order items partially.

## LockedStateMachine

When multiple processes can push forward an order from one source state, we recommend using LockedStateMachine. For example, a manual transition can be triggered by different entry points. LockedStateMachine key features:

1. It implements the same interface as a common StateMachine and has locks for all methods except the `check-condition` command.

2. Lock works based on `spy_state_machine_lock` table. Due to the nature of MySQL, you may face deadlocks, which you need to [handle properly](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html). Also, the same operation in MySQL takes more time than memory storage, like Redis. By default, locking works on the order item level, but, in most cases, using locks on the order level is more efficient.

## Speed up oms:check-condition: parallel execution and run often than once per minute

When the execution of `check-condition` once per minute isn't enough, you can increase the frequency as follows:

* Increase the number of threads:
  1. Update the config:
    ```php
    $config[OmsMultiThreadConstants::OMS_PROCESS_WORKER_NUMBER] = 10; // IMPORTANT: if you change this value do not forget to update the number of Jenkins jobs in jenkins.php
    ```
  2. Create 10 Jenkins jobs for every processor. Use the `processor-id` option to define which identifiers to process in a job. Processes are assigned when order items are created. For more details, see [Order management system multi-thread
](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/state-machine/order-management-system-multi-thread.html).

* Create a wrapper console command that runs `check-condition` in a loop. Tips for the wrapper command:
  * Don’t run subprocesses in parallel because it results in more complexity in logic than profits.
  * Run the real command (check-condition) in a subprocess to speed up memory cleanup after the execution.
  * Implement timeouts for subprocesses and the wrapper. To prevent items from being stuck in the `onEnter` transitions, avoid hard limits with the killing process. Instead, analyze the execution time of subprocesses to figure out if you should run a new child process or finish the execution of the wrapper.

## PerOrder or PerItem command and condition

**Issue:** Core has different ways of executing OMS commands: per order and per item. However, for conditions, OMS commands are executed only per item.
![per-order-or-per-item-command-and-condition](https://github.com/xartsiomx/spryker-docs/assets/110463030/2dbe96ae-0a59-48cb-8653-ee104201f63c)

**Solution:** Extend `ConditionInterface` without changing the signature:
1. Create the `ConditionPerOrderInterface` interface and extend it from `ConditionInterface`.
2. Overwrite `\Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachine::checkCondition` with the caching mechanism inside a static property to execute the logic only for the first item and return results from cache for the rest of the items.

The logic in the `ConditionPlugin` should work around Order (not Item). This provides the correct value to the cache.



## Incorrect event definition

**Issue:** Mixing  `onEnter="true"` and `manual="true"` in the same event.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-10.png)

Event does not appear as manual unless the previous command execution fails with an exception.

**Solution:** Create separate transitions: one with the `onEnter` command, the other with the `manual` command.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-10-fixed.png)

{% info_block infoBox "Tip" %}

Keeping both `onEnter` and `manual` commands can only be used for backup for the failed automated execution of the `onEnter` command with a manual event.

{% endinfo_block %}

## Calling OMS processing functions within a custom DB transaction

**Issue:** You want to enclose complex processing, including OMS processing functions, inside a transaction.

OMS processing functions, like triggerEvent*, checkConditions and checkTimeouts, use lock on the order item level to prevent processing of the same item more than once at the same time. The lock information is stored as an entry in the `spy_oms_state_machine_lock` table.
Running this code inside a DB transaction make the lock entries inaccessible. This may lead to an undetermined resulting state of the item or even to a DB deadlock in rare cases.

**Solution:** Avoid OMS processing function calls inside DB transactions.

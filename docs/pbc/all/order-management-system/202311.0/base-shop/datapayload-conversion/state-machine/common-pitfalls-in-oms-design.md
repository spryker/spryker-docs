---
title: Common pitfalls in OMS design
description: This document explains the common pitfalls in OMS design in the Spryker Commerce OS.
last_updated: Jan 13, 2022
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


Implementing OMS processes can be challenging when they are complex, or requirements are not trivial. This can lead to hidden issues which are hard to debug. An example of such issues is race conditions.

In some cases, OMS works incorrectly. In most cases, a *correct* flow can be run successfully, but the first run of a wrong path might reveal a problem. In other cases, there might be known limitations that can lead to incorrect transitions. There can also be cases that are valid but should be rewritten into a better readable process. If you discover more edge cases, please send those to our [support team](https://spryker.force.com/support/s/).

This document describes the most common issues with OMS design and how you can fix them.

## More than one onEnter event from one state

**Issue**: If there is more than one onEnter transition event from state A, only one is executed.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-1.png)

**Reason**: This behavior is not supported because there must always be only one state after an event execution.

**Solution**: If you have different commands, you can chain those:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-1-fixed.png))

If you have the same commands, then one of the commands could get a condition:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-1-solution-2.png)



## Defining states with names

**Issue:** States with the same names are declared in several processes.

**Reason:** When a process or a sub-process is read, transitions are assigned to the *from*-state in the current process or sub-process. In case of several declarations, these will be different *from*-states.

**Solution**: Define states with unique names only. We recommend defining the state in the process which introduces it. You can define transition in other states.

**Tip:** Declare the state in the process where it has outgoing transitions.

## Duplicate events

**Issue:** Events with the same names are declared in multiple processes.

In the OMS drawing, you will see the last *read* event definition, but during the execution, any might be defined.

**Solutions:**

- Rename one of the events.
- Keep only one event. We recommend having reusable events in the main process rather than using those from some sub-processes.

## States with only outgoing transitions

**Issue**: There are many states with only outgoing transitions.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-2.png)

**Reason**: Function `OmsConfig:getInitialStatus` has only one return value, so it's impossible to start from another "initial" state.

**Solution**: In most cases, this is a mistake, and the transition between some states is missing. Adding transition makes the process correct. For example, adding transition `payment done` → `shipped` with the `ship` event brings the whole process to a correct state.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-2-fixed.png)

{% info_block infoBox "Info" %}

You can change order items' states through a manual call, and this way, use the states without inbound transitions. On the one hand, this helps not to overwhelm the process with 10+ transitions to a cancellation process. On the other hand, though, this makes the process definition incomplete and, thus, this approach is not recommended.

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

When placing an order, this issue entails an error like this one:

```php
Exception - Unknown state: new in "/data/vendor/spryker/oms/src/Spryker/Zed/Oms/
Business/Process/Process.php::198" {"exception":"[object] (Exception(code: 0):
Unknown state: new at /data/vendor/spryker/oms/src/Spryker/Zed/Oms/Business/
Process/Process.php:198)
```

**Solution:** Removing duplicate flag  `main` fixes the process rendering and processing:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-7-fixed.png)

## More than one transition with the same events and without condition

**Issue**: It's impossible to guess which transition is expected, so the first one read is executed.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-5.png)

**Solution 1:**  Add a condition to one of the transitions:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-5-fixed.png)

**Solution 2:**  Change event on one transition:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-5-fixed-2.png)

## Conditional, timeout, and manual transitions mixture from the same state

**Issue**: Creating a condition and a timeout, or a manual event and a condition, or a manual event and a timeout from the same state leads to errors.

**Reason**: Condition check and timeout execution happen in different console commands, and the order of the execution is not defined by the OMS but by a scheduler.

Execution of the manual event could also happen during the console command execution, and the resulting state of the order items, in this case, is unpredictable.

**Solution:**

1. Rewrite the process and check the condition after the timeout.
2. Use `TimeoutProcessor`. It significantly decreases the probability of the same-time execution.

## Use asynchronous break without command and condition

**Issue:** Adding timeout pauses the execution process and unblocks external systems.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-9.png)

**Reasons**:

- Timeout triggers the DB update, namely—the creation of a timeout entry for each order item in the `spy_oms_event_timeout` table.
- Timeout check requires a DB query to find the affected entries.

**Solution**: We recommend using an event (`pause`) without command and without condition. The event will not interact with the DB and will also be executed with the next run of the `oms:check-condition` command.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/image-20210924-103858.png)

## Not used events or states

**Issue:** Process contains a declaration of a state which is never used:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-15.png)


The unused state could have a missing transition.

**Solution:** Delete a state, or add a missing transition:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-15-solution.png)


## Huge timeouts

**Example:** Export finished is a final state from a business perspective, but not from an OMS perspective(from OMS, the final state is closed). The reason behind this is that the business wants to create a return/refund anytime after the order is completed. In the timeout processor, the system has a configurable value in days(9999 in this example) - to manage how many days an order will be moved to the closed state.
![huge_timeouts](https://github.com/xartsiomx/spryker-docs/assets/110463030/b3038a9a-564e-47de-9b09-397137d4a02e)

**The issue:** After the order is pushed to export finished for every single order item will be created a record in the spy_oms_event_timeout table. For example, if you have 10k orders per day with 100 items inside, you will end up with approx. 1 million of new records… for nothing. Because of the huge timeout, the system is storing this data for a long time - which is not only a storage issue but also slows down OMS processes.

**Solution:** In the described scenario, you probably don’t need the final state closed at all. The best approach would be to replace timeout with a manual trigger if an automatic transition is needed. Try to avoid timeouts with a duration of more than 7 days.

## Long chain onEnter

**Example:** When recalculation is started by oms:check-condition it will trigger a chain of onEnter events with more than 8 transitions in it.
![long-chain-on-enter](https://github.com/xartsiomx/spryker-docs/assets/110463030/2cafb0fe-1388-434e-a783-7838535a69e7)

**The issue:** Long chains onEnter events can be “fragile”. It will increase the time of execution, memory consumption as well as the risk of having an error in the middle of the process and ending up with a stuck order item.

**Solution:** Remove unnecessary states/onEnter transition in your process. If you have an event with onEnter that doesn’t have any command/condition - probably it’s redundant. Split long chains into several smaller ones. Especially for chains that are starting from check* (condition, timeout) commands.

## Slow order creation

**The issue:** Order starting processing directly after placement. The checkout endpoint contains the execution of all onEnter transitions in OMS.
![slow-order-creation](https://github.com/xartsiomx/spryker-docs/assets/110463030/02892077-3d8d-432e-a6a4-281dcdb9824d)

**Solution:** Checkout endpoint logic should finish after the order was created with all items in starting states(new for example). The transition from the new state shouldn’t have an event (Which means it will be processed by oms:check-condition command)

## Stuck on-enter

**The issue:** In most cases, if you have an order item stuck during the onEnter transition it means you have an unexpected error during execution. I highly recommend checking those issues individually and properly fixing them.

**Solution:** (if you have many of them due to infra, timeouts etc. and you need to fix them ASAP). Create a console command that will trigger onEnter events. I recommend creating a list of OMS states from which you want to check and move order items. Also, set limits for orders (not items!) and time windows. For example, check stuck order items only if they have the last update of the state after 2 hours.

## Saving states (per item transaction)

**Example:** The system has a callback that should move order items from picking started to ready for recalculation. After that, check-condition will move the order further to the recalculation step.
![saving-states-1](https://github.com/xartsiomx/spryker-docs/assets/110463030/bc4d581b-d587-4f84-bb17-3452d4573ae4)


**The issue:** During the last transition in the callback from picking finished to ready for recalculation - Jenkins job started the check-condition command. Because of that check-condition takes not all order items from the order and pushes them forward. Only the next job started executing the remaining order items with the delay, because of that many commands (per Order) were triggered twice.
![saving-states-2](https://github.com/xartsiomx/spryker-docs/assets/110463030/1fd1b30f-00dc-49eb-8d35-37583e140f5e)

**Solution:** This is possible because during the execution of \Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachine::saveOrderItems system stores data per item. It was done like this because Core logic expects that you may have more than 1 order in transition. And to not block all of them due to potential failed orders - executing transactions per item. To change that you should first group your order items per order and after that, you can change transaction behavior - to store all order items per only 1 transaction. In this case, check-condition or any other command can’t take order items partially.

## LockedStateMachine

**Example:** In case when multiple processes can push forward an order from one source state it’s recommended to use LockedStateMachine. For example: manual transition, which can be triggered by a different entry points. Important to understand:

1. It implements the same interface as common StateMachine and has locks for all methods except the check-condition command.

2. Lock works based on MySQL table spy_state_machine_lock. Due to the nature of MySQL sometimes you can face deadlocks (you have to [handle them properly](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html)). Also, the same operation in MySQL will take more time than memory storage (redis for example). Finally, OOTB locking works on the order item level, but in most cases more efficient will be using them on the order level.

## Speed-up oms:check-condition (parallel execution & run often than once per minute)

**Example:** When execution for check-condition once per minute is not enough for business, you can increase frequency with two approaches:

1. Do that more in more threads. For example, you can increase the number of threads in your config
```php
$config[OmsMultiThreadConstants::OMS_PROCESS_WORKER_NUMBER] = 10; // IMPORTANT: if you change this value do not forget to update the number of Jenkins jobs in jenkins.php
```
and then create 10 Jenkins jobs for every processor. The console command has the option processor-id where you can define which identifiers will be processed in this job. Assignment of process happens during order creation for every order item.
You can find more details in this [article](https://docs.spryker.com/docs/pbc/all/order-management-system/202311.0/base-shop/datapayload-conversion/state-machine/order-management-system-multi-thread.html).

2. Start a job more often than once per minute. You may create a wrapper console command that will run check-condition command in a loop. A few hints for wrapper command:
a) Don’t run subprocesses in parallel. It will bring more complexity in logic than profits 
b) Run real command (check-condition) in subprocess - it will help with clean-up memory after ending execution.
c) Have timeouts for subprocesses and the wrapper. Avoid hard limits with the killing process - it may lead to items stuck in onEnter transitions. Instead - do analyze the previous execution time of subprocesses - should you run a new child process or finish the execution of the wrapper?

## PerOrder / PerItem command & condition

**The issue:** Core has different ways of executing the OMS commands (per order and item). However, it doesn’t have such separation for conditions - we have only one option - per item.
![per-order-or-per-item-command-and-condition](https://github.com/xartsiomx/spryker-docs/assets/110463030/2dbe96ae-0a59-48cb-8653-ee104201f63c)

**Solution:** Extending ConditionInterface without changing the signature.
1. Create a new interface ConditionPerOrderInterface and extend it from ConditionInterface
2. Overwrite \Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachine::checkCondition with the caching mechanism inside (static property) to execute logic only for the first item, for all others - return result from cache.

Logic inside your ConditionPlugin should be around Order (not Item) - in this case, you have the correct value in the cache. However, the signature allows a developer to create logic around the item.

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

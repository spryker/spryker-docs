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

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.md/oms-processing-1.png)

**Reason**: This behavior is not supported because there must always be only one state after an event execution.

**Solution**: If you have different commands, you can chain those:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.md/oms-processing-2.png)

If you have the same commands, then one of the commands could get a condition:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.md/oms-processing-3.png)



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

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.md/oms-processing-4.png)

**Reason**: Function `OmsConfig:getInitialStatus` has only one return value, so it's impossible to start from another "initial" state.

**Solution**: In most cases, this is a mistake, and the transition between some states is missing. Adding transition makes the process correct. For example, adding transition `payment done` → `shipped` with the `ship` event brings the whole process to a correct state.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/common-pitfalls-in-oms-design/oms-issue-2-fixed.png)

{% info_block infoBox "Info" %}

You can change order items' states through a manual call, and this way, use the states without inbound transitions. On the one hand, this helps not to overwhelm the process with 10+ transitions to a cancellation process. On the other hand, though, this makes the process definition incomplete and, thus, this approach is not recommended.

{% endinfo_block %}

## More than one main process

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

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.md/oms-processing-5.png)

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

## OMS configuration changes not applied

**Issue:** You updated OMS configuration in an XML file, but the changes are not applied.

**Solution:** OMS processes are cached by default. If `OmsConstants::ENABLE_PROCESS_CACHE` is not set to false in configuration files, you need to regenerate the cache every time you update OMS configuration.


To regenerate the cache, run the following command:
```bash
vendor/bin/console oms:process-cache:warm-up
```

## Slow checkout endpoint

**Issue:** During the checkout process, order items are created in the `new` status by default and immediately become part of the OMS workflow. Any `onEnter` event with command from the state `new` is executed within the same PHP process as the checkout.
This can significantly increase processing time of checkout requests.

![coupled_new_state_to_command](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.md/coupled_new_state_to_command.png)

**Solution:** Postpone all subsequent transitions from the `new` state. Configure transitions to be executed in the background by Jenkins triggering `console oms:check-condition`.

![decoupled_new_state_from_command](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.md/decoupled_new_state_from_command.png)

```xml
<transitions>
    <transition happy="true">
        <source>new</source>
        <target>ready for confirmation</target>
    </transition>
    <transition happy="true">
        <source>ready for confirmation</source>
        <target>confirmation sent</target>
        <event>confirmation</event>
    </transition>
</transitions>
<events>
    <event name="confirmation" onEnter="true" command="Oms/SendOrderConfirmation"/>
</events>
```



## Optimize order placement performance

To speed up order placement, you can configure OMS to be executed asynchronously with order placement. After an order is created, OMS processing stops, enabling the order to be created quicker. The OMS processing of the order happens after the `oms:check-condition` command is executed.

![optimized-oms-for-order-placement](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.md/oms-slow-order-placement.png)

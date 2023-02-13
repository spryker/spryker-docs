---
title: How to process incoming HTTP requests from external ERP services for order updates
description: How to process incoming HTTP requests from external ERP services for order updates
template: howto-guide-template
---

# How to process incoming HTTP requests from external ERP services for order updates 

## Problem statement

Spryker Applications should receive information about Orders from external systems. It can be done in very different ways. This document suggests possible solutions for processing incoming HTTP requests, describes their Advantages and Disadvantages and highlights pitfalls. The essence of such requests can be various (request from User’s browser, push-notification from a delivery company, butch update request from ERP system, etc.), like a solution for them.

## Suggested solutions

### Synchronous handling of incoming requests

The most popular and evident way of processing incoming requests is the synchronous way. This solution means keeping an active HTTP connection till the Application process the request and returns a response.

**Pros**

* Easy to implement, understand, maintain

**Cons**

* Long-run requests can fail due to HTTP connection timeout
* Heavy operations require scale hardware for the application in general which can lead to extra costs
* Retry mechanism should be implemented on a Caller-side

### Asynchronous incoming request handling

When the application receives an incoming request, it stores the context and responds successful HTTP code. In this case, the application takes the whole responsibility on its side for handling this request. Different types of workers and storage engines and their combinations can affect quality attributes in various ways.

#### Processing with oms:check-condition worker

Spryker application OOTB has oms:check-condition worker. It can be used to process requests and run application logic. The worker strongly depends on a State Machine graph. “oms:check-condition” job moves order items through the OMS graph and runs OMS plugins (commands, conditions, timeouts). It means the processing logic must be represented in OMS. The additional restriction is the OMS plugins cannot trigger OMS events for the same order. Also, better to avoid creating new Order items because it contradicts the OMS philosophy and may lead to hidden pitfalls.

{% info_block infoBox "Info" %}

**Important point:** An incoming request handler must store not only the event context but also trigger an OMS event. It is necessary to pass control to oms:check-condition worker. If the event must affect several orders then the handler must trigger OMS event for each order.

{% endinfo_block %}

**Pros**

* The worker is available OOTB
* More transparency with the logic that is represented in OMS
* Easy understand, maintain, support
* OOTB fault-tolerance and supports retry logic

**Cons**

* Can run a logic in OMS Plugins only
* Cannot trigger OMS events for the same Order
* Extra OMS elements may make the graph more complex to understand and maintain

##### Incoming request handling and passing control to the worker

The incoming request handler should validate a Request structure, save it in some Storage and then trigger an OMS event. E.g. “start processing”. OMS will stop order items in the next state. On the next tick, “oms:check-condition” worker will move them forward and run subsequent commands and logic.

![Incoming request handling and passing control to the worker](docs/scos/dev/drafts-dev/Incoming request handling and passing control to the worker.png)

{% info_block warningBox "Warning" %}

**Potential pitfall:** The worker can process the requests only when an order is in a specific OMS state. If OMS cannot apply “start processing” event to any item then it returns an error. It means that the event can’t be processed right now. The request handler should decide what to do: store it for further processing, ignore it, or return an error response to the caller.

{% endinfo_block %}

Another way to check the order items' status is to check the current state of all items in the Database (spy_sales_order_item_state). It can be useful in some cases. This way can be a bit faster but prone to the issue of a concurrent request and not recommended.

#### Processing with a dedicated Jenkins worker

The Jenkins worker listens to the Storage. When an event appears, the worker starts to process it. It is a high-level logic. Depending on requirements, the worker logic can be very different and cover quality attributes differently.

| Quality attribute                                     | Suggestions                                                                                                                                                                                                     |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Availability / Degradability                          | Jenkins can configure how often and when the job should be runned                                                                                                                                               |
| Performance                                           | Batch size of events per run can be configurable                                                                                                                                                                |
| Testability / Maintability / Monitoring / Operability | Background jobs should write logs not only about errors, but about normal work progress. Good logs help to create effective monitoring and alerts. It can save dozens hours of a problem investigation.         |
| Fault-tolerance / Correctness / Recoverability        | The worker should be designed to be able to re-run and retry some requests or continue the process on restart. It should not lost data in exceptional cases. The logic should be in DB transaction if possible. |
| Scaleability                                          | The worker should support to be run in several instances.                                                                                                                                                       |

**Pros**

* Can handle any kind of logic (Trigger OMS event, work with several orders, process non-OMS-related logic)

**Cons**

* Needs custom implementation on the Project level
* Requires custom monitoring and operating tools and procedures 

If the worker works with OMS then it can be like this:

![Processing with a dedicated Jenkins worker](docs/scos/dev/drafts-dev/Processing with a dedicated Jenkins worker.png)

## Conclusion

If the processing logic is simple and fast, or the caller can handle errors and retry, then the synchronous processing solution is better.

If the process may take a long time or is sensitive to errors (no retry, potential loose data, unacceptable UX), then recommend to represent the logic in OMS and use oms:check-condition worker if possible.

In other cases, implement a dedicated worker to process the requests asynchronously.

## Solutions quality attributes comparison table

:white_check_mark: Good or Bonus.

:question_mark: Unknown or depends on project specific.

:info: Moderate. Need attention, but can be handled.

:cross_mark: Absent or Impossible.

| Quality attribute                                     | Synchronous handling                                                                                                                                                                                                                                                     | OMS check-condition worker                                                                                                                                                             | Jenkins job                                                                                                                                                                                                                             |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Availability / Degradability                          | :question_mark: Depends on load balancers and availability of all sub-components and applications                                                                                                                                                                        | :question_mark: Depends on OMS worker load                                                                                                                                             | :white_check_mark:                                                                                                                                                                                                                      |
| Modifiability / Flexibility                           | :white_check_mark:                                                                                                                                                                                                                                                       | :cross_mark: Order must be in a specific OMS state<br>:cross_mark: OMS worker cannot trigger OMS events<br>:cross_mark: Cannot run logic what is not represented in OMS                | :white_check_mark:                                                                                                                                                                                                                      |
| Performance                                           | :question_mark: Depends on the application performance and hardware                                                                                                                                                                                                      | :white_check_mark:                                                                                                                                                                     | :white_check_mark:                                                                                                                                                                                                                      |
| Testability / Maintability / Monitoring / Operability | :white_check_mark:                                                                                                                                                                                                                                                       | :info: Limited amount of tools are available OOTB                                                                                                                                      | :info: No OOTB tools                                                                                                                                                                                                                    |
| Usability / Understandability / Simplicity            | :white_check_mark:                                                                                                                                                                                                                                                       | :info: Needs experience with OMS engine                                                                                                                                                | :info: Needs experience with Jenkins and CLI                                                                                                                                                                                            |
| Fault-tolerance / Correctness / Recoverability        | :cross_mark: HTTP connection usually has timeout.<br>:cross_mark: Needs extra efforts to make an application recoverable (can be impossible).<br>:cross_mark: Needs extra efforts to implement retry mechanism (can be impossible).<br>:info: Lock mechanism is required | :white_check_mark: Put transition command into DB transaction to be able to retry (if possible)<br>:white_check_mark: Retry transitions can trigger retry logic manually or by timeout | :white_check_mark: Retry transitions can trigger retry logic manually or by timeout<br>:white_check_mark: Event handler logic should be inside of DB transaction to be able to retry (if possible)<br>:info: Lock mechanism is required |
| Scaleability                                          | :white_check_mark:                                                                                                                                                                                                                                                       | :white_check_mark: Static scaling of OMS check-condition job                                                                                                                           | :white_check_mark: Static scaling of Jenkins job                                                                                                                                                                                        |
| Upgradability                                         | :white_check_mark:                                                                                                                                                                                                                                                       | :white_check_mark:                                                                                                                                                                     | :white_check_mark: No upgradability issues due to no OOTB functionality usage                                                                                                                                                           |

## Storage engines quality attributes comparison table

| Quality attribute                                     | DB Storage                                                                          | RabbitMQ Storage                                                      | Redis                                                  |
|-------------------------------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------|--------------------------------------------------------|
| Modifiability / Flexibility                           | -                                                                                   | :white_check_mark: Supports TTL if needed                             | :white_check_mark: Supports TTL if needed              |
| Performance                                           | :info: Can lead to performance issues with huge amount of data or huge message size | :white_check_mark:                                                    | :white_check_mark:                                     |
| Usability / Understandability / Simplicity            | :white_check_mark:                                                                  | :info: Needs experience                                               | :info: Needs experience                                |
| Fault-tolerance / Correctness / Recoverability        | :white_check_mark:                                                                  | :info: DLQ can be used to implement retry logic, but no OOTB solution | :cross_mark: Cannot store messages long period of time | :cross_mark: Can lost messages on cluster failure | :cross_mark: Lost messages on restart |

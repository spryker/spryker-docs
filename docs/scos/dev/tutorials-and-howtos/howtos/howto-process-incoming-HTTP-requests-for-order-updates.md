---
title: How to process incoming HTTP requests from external ERP services for order updates
description: Learn how you can process incoming HTTP requests from external ERP services for order updates
template: howto-guide-template
---

Spryker applications can receive information about orders from external systems in many different ways. The essence of such requests can be various—request from user's browser, push-notification from a delivery company, butch update request from an ERP system, etc., like a solution for them. This document suggests possible solutions for processing incoming HTTP requests, describes their advantages and disadvantages, and highlights pitfalls.

## Suggested solutions

You can process incoming requests synchronously and asynchronously.

### Synchronous handling of incoming requests

The most popular and evident way of processing incoming requests is the synchronous way. This solution means keeping an active HTTP connection till the application processes the request and returns a response.

**Pros**

Easy to implement, understand, and maintain.

**Cons**

* Long-run requests can fail due to an HTTP connection timeout.
* Heavy operations require scaling the  hardware for the application, which can lead to extra costs.
* Retry mechanism should be implemented on the caller's side.

### Asynchronous handling of incoming requests

Upon receiving an incoming request, the application stores the context and responds that the request succeeded. In this case, the application takes the full responsibility for handling this request. Various types of workers and storage engines, and their combinations, can affect quality attributes in different ways.

#### Processing with the oms:check-condition worker

By default, Spryker application has the `oms:check-condition` worker that can be used to process requests and run application logic. The worker relies on a state machine graph. The `oms:check-condition` job moves order items through the OMS graph and runs OMS plugins such as Commands, Conditions, and timeouts. Therefore, the processing logic must be represented in OMS. An additional restriction is that the OMS plugins cannot trigger OMS events for the same order, as they cannot call `OmsFacade::triggerEvent methods.

{% info_block infoBox "Info" %}

An incoming request handler must store not only the event context but also trigger an OMS event. It is necessary to pass control to `oms:check-condition worker`. If the event must affect several orders, then the handler must trigger an OMS event for each order.

{% endinfo_block %}

**Pros**

* The worker is available by default.
* More transparency with the logic that is represented in OMS.
* Easy to understand, maintain, and support.
* Default fault-tolerance and retry logic support.

**Cons**

* Can run logic in OMS plugins only.
* Cannot trigger OMS events for the same order.
* Extra OMS elements can make the graph harder to understand and maintain.

##### Incoming request handling and passing control to the worker

The incoming request handler should validate a request structure, save it to some storage, and then trigger an OMS event, for example, *start processing*. OMS will stop order items in the next state. On the next run, `oms:check-condition` worker will move them forward and run subsequent commands and logic.

![Incoming request handling and passing control to the worker](docs/scos/dev/drafts-dev/Incoming request handling and passing control to the worker.png)

{% info_block warningBox "Potential pitfall" %}

The worker can process the requests only when an order is in a specific OMS state. If OMS cannot apply the `start processing` event to any item, then it returns an error. It means that the event can’t be processed right now. The request handler should decide what to do: store it for further processing, ignore it, or return an error response to the caller.

{% endinfo_block %}

Triggering an OMS event and checking if it affected some items is one possible way to determine whether the order was in a proper state. Another way to check the order items' state is to check the current state of all items in the database, in the `spy_sales_order_item_state` table. This way can be a bit faster but prone to the issue of a concurrent request and is therefore not recommended.

#### Processing with a dedicated Jenkins worker

The Jenkins worker listens to the storage. When an event appears, the worker starts to process it. It is a high-level logic. Depending on requirements, the worker logic can be very different and cover quality attributes differently.

| Quality attribute                                     | Suggestions                                                                                                                                                                                                     |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Availability / Degradability                          | Jenkins can configure how often and when the job should be run.                                                                                                                                             |
| Performance                                           | Batch size of events per run can be configurable.                                                                                                                                                                |
| Testability / Maintainability / Monitoring / Operability | Background jobs should write logs not only about errors, but also about normal work progress. Good logs help to create effective monitoring and alerts. This approach can save many hours of a problem investigation.         |
| Fault-tolerance / Correctness / Recoverability        | The worker should be designed to be able to re-run and retry some requests or continue the process on restart. It should not loose data in exceptional cases. The logic should be in DB transaction if possible. |
| Scalability                                          | The worker should support running in several instances.                                                                                                                                                       |

**Pros**

* Can handle any kind of logic, for example, triggering an OMS event, working with several orders, and processing non-OMS-related logic.

**Cons**

* Needs custom implementation on the project level.
* Requires custom monitoring, operating tools, and procedures.

If the worker works with OMS the workflow is as follows:

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;ac.draw.io\&quot; modified=\&quot;2023-03-03T15:26:50.879Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\&quot; etag=\&quot;cIv1duNjpG3XFYUcnCto\&quot; version=\&quot;20.8.21\&quot; type=\&quot;embed\&quot;&gt;&lt;diagram id=\&quot;5E4LnKRoknYNzPARRc5W\&quot; name=\&quot;Page-1\&quot;&gt;&lt;mxGraphModel dx=\&quot;1036\&quot; dy=\&quot;501\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;827\&quot; pageHeight=\&quot;1169\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;&lt;root&gt;&lt;mxCell id=\&quot;0\&quot;/&gt;&lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot;/&gt;&lt;mxCell id=\&quot;yPjIjGwtRVZ6zKwRPITz-1\&quot; value=\&quot;\&quot; style=\&quot;ellipse;html=1;shape=startState;fillColor=#000000;strokeColor=#ff0000;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;330\&quot; y=\&quot;200\&quot; width=\&quot;30\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;yPjIjGwtRVZ6zKwRPITz-2\&quot; value=\&quot;\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;rounded=0;\&quot; parent=\&quot;1\&quot; source=\&quot;yPjIjGwtRVZ6zKwRPITz-1\&quot; target=\&quot;yPjIjGwtRVZ6zKwRPITz-3\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;345\&quot; y=\&quot;290\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;yPjIjGwtRVZ6zKwRPITz-3\&quot; value=\&quot;get an event from Storage\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;arcSize=40;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;285\&quot; y=\&quot;270\&quot; width=\&quot;120\&quot; height=\&quot;40\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;yPjIjGwtRVZ6zKwRPITz-4\&quot; value=\&quot;\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;rounded=0;\&quot; parent=\&quot;1\&quot; source=\&quot;yPjIjGwtRVZ6zKwRPITz-3\&quot; target=\&quot;dRIlF1k3-qNrcenuG-wj-1\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;345\&quot; y=\&quot;370\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;dRIlF1k3-qNrcenuG-wj-1\&quot; value=\&quot;validate event\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;arcSize=40;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;285\&quot; y=\&quot;350\&quot; width=\&quot;120\&quot; height=\&quot;40\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;dRIlF1k3-qNrcenuG-wj-2\&quot; value=\&quot;\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;rounded=0;\&quot; parent=\&quot;1\&quot; source=\&quot;dRIlF1k3-qNrcenuG-wj-1\&quot; target=\&quot;dRIlF1k3-qNrcenuG-wj-3\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;345\&quot; y=\&quot;450\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;dRIlF1k3-qNrcenuG-wj-3\&quot; value=\&quot;validate order item states\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;arcSize=40;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;285\&quot; y=\&quot;430\&quot; width=\&quot;120\&quot; height=\&quot;40\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;dRIlF1k3-qNrcenuG-wj-4\&quot; value=\&quot;\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;rounded=0;\&quot; parent=\&quot;1\&quot; source=\&quot;dRIlF1k3-qNrcenuG-wj-3\&quot; target=\&quot;dRIlF1k3-qNrcenuG-wj-5\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;345\&quot; y=\&quot;530\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;dRIlF1k3-qNrcenuG-wj-5\&quot; value=\&quot;process event\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;arcSize=40;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;285\&quot; y=\&quot;510\&quot; width=\&quot;120\&quot; height=\&quot;40\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;dRIlF1k3-qNrcenuG-wj-6\&quot; value=\&quot;\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;rounded=0;\&quot; parent=\&quot;1\&quot; source=\&quot;dRIlF1k3-qNrcenuG-wj-5\&quot; target=\&quot;dRIlF1k3-qNrcenuG-wj-7\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;345\&quot; y=\&quot;610\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;dRIlF1k3-qNrcenuG-wj-7\&quot; value=\&quot;trigger OMS event &amp;quot;process event&amp;quot;\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;arcSize=40;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;285\&quot; y=\&quot;590\&quot; width=\&quot;120\&quot; height=\&quot;40\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;dRIlF1k3-qNrcenuG-wj-8\&quot; value=\&quot;\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;rounded=0;\&quot; parent=\&quot;1\&quot; source=\&quot;dRIlF1k3-qNrcenuG-wj-7\&quot; target=\&quot;dRIlF1k3-qNrcenuG-wj-9\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;345\&quot; y=\&quot;690\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;dRIlF1k3-qNrcenuG-wj-9\&quot; value=\&quot;\&quot; style=\&quot;ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#ff0000;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;330\&quot; y=\&quot;675\&quot; width=\&quot;30\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;/root&gt;&lt;/mxGraphModel&gt;&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>


## Solutions quality attributes comparison

The following comparison table illustrates quality attributes of the synchronous requests handling and asynchronous request handling with the OMS `check-condition` worker and the Jenkins job.

| Quality attribute                                     | Synchronous handling                                                                                                                                                                                                                                                     | OMS check-condition worker                                                                                                                                                             | Jenkins job                                                                                                                                                                                                                             |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Availability / Degradability                          | ❓ Depends on load balancers and availability of all sub-components and applications                                                                                                                                                                        | ❓ Depends on OMS worker load                                                                                                                                             | &#9989;                                                                                                                                                                                                                     |
| Modifiability / Flexibility                           | &#9989;                                                                                                                                                                                                                                                       | ❌ Order must be in a specific OMS state<br>❌ OMS worker cannot trigger OMS events<br>❌ Cannot run logic that is not represented in OMS                | &#9989;                                                                                                                                                                                                                      |
| Performance                                           | ❓ Depends on the application performance and hardware                                                                                                                                                                                                      | &#9989;                                                                                                                                                                     | &#9989;                                                                                                                                                                                                                     |
| Testability / Maintainability / Monitoring / Operability | &#9989;                                                                                                                                                                                                                                                       | &#10071; Limited amount of tools are available OOTB                                                                                                                                      | &#10071; No OOTB tools                                                                                                                                                                                                                    |
| Usability / Understandability / Simplicity            | &#9989;                                                                                                                                                                                                                                                       | &#10071; Experience with OMS engine is required                                                                                                                                                | &#10071; Experience with Jenkins and CLI is required                                                                                                                                                                                            |
| Fault-tolerance / Correctness / Recoverability        | ❌ HTTP connection usually has timeout.<br>❌ Extra efforts to make an application recoverable are required (may be impossible).<br>❌ Extra efforts to implement retry mechanism are required (may be impossible).<br>&#10071; Lock mechanism is required | &#9989; Put transition command into DB transaction to be able to retry (if possible)<br>&#9989; Retry transitions can trigger retry logic manually or by timeout | &#9989; Retry transitions can trigger retry logic manually or by timeout<br>&#9989; Event handler logic should be inside of DB transaction to be able to retry (if possible)<br>&#10071; Lock mechanism is required |
| Scaleability                                          | &#9989;                                                                                                                                                                                                                                                      | &#9989;Static scaling of OMS check-condition job                                                                                                                           | &#9989; Static scaling of Jenkins job                                                                                                                                                                                        |
| Upgradability                                         | &#9989;                                                                                                                                                                                                                                                      | &#9989;                                                                                                                                                                    | &#9989; No upgradability issues due to no OOTB functionality usage                                                                                                                                                           |

&#9989; good or bonus

❓unknown or depends on a project

&#10071; moderate, requires attention, but can be handled

❌  absent or impossible

## Storage engines quality attributes comparison table

| Quality attribute                                     | DB Storage                                                                          | RabbitMQ Storage                                                      | Redis                                                  |
|-------------------------------------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------|--------------------------------------------------------|
| Modifiability / Flexibility                           | -                                                                                   | &#9989; Supports TTL if needed                             | &#9989; Supports TTL if needed              |
| Performance                                           | &#10071; Can lead to performance issues with huge amount of data or huge message size | &#9989;                                                    | &#9989;                                    |
| Usability / Understandability / Simplicity            | &#9989;                                                                 | &#10071; Needs experience                                               | &#10071; Needs experience                                |
| Fault-tolerance / Correctness / Recoverability        | &#9989;                                                                 | &#10071; DLQ can be used to implement retry logic, but no OOTB solution | ❌ Cannot store messages long period of time | ❌ Can lost messages on cluster failure | ❌ Lost messages on restart |

## Conclusion

If the processing logic is simple and fast, or the caller can handle errors and retry, then the [synchronous processing solution](#synchronous-handling-of-incoming-requests) is more suitable.

If the process may take a long time or is sensitive to errors—for example, there is no retry, potential loose of data, unacceptable UX, we then recommend to represent the logic in OMS and use the [oms:check-condition worker](#processing-with-the-omscheck-condition-worker) if possible.

In other cases, we recommend implementing a [dedicated worker](#processing-with-a-dedicated-jenkins-worker) to process the requests asynchronously.
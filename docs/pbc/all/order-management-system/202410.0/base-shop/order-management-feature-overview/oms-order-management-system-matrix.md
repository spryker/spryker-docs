---
title: OMS (Order management system) matrix
description: Efficiently keep track of orders and their states with the Spryker Order Management System Matrix Feature.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/oms-matrix
originalArticleId: 756b7c08-cc99-41f8-83f6-09e6eba4780b
redirect_from:
  - /2021080/docs/oms-matrix
  - /2021080/docs/en/oms-matrix
  - /docs/oms-matrix
  - /docs/en/oms-matrix
  - /docs/scos/user/features/202200.0/order-management-feature-overview/oms-order-management-system-matrix.html
  - /docs/scos/user/features/202311.0/order-management-feature-overview/oms-order-management-system-matrix.html
  - /docs/scos/user/features/202204.0/order-management-feature-overview/oms-order-management-system-matrix.html
---

The *OMS Matrix* gives you a quick overview of all orders and their current statuses taken from the State Machine. It lets you see how many order items currently exist in each status and for how long they have been there. From this overview, you can easily go into details per status and order page.

It is a view into all sales order items and their current states. The matrix shows how many items exist per state and how long they stay here already.

They have started highly manually: every step from order to fulfillment was done by a support team. A typical culture of heroes. With the increasing amount of sales orders, the entire process or subprocesses have been automated—for example with a lot of if-then-else statements. This easily ends up in unmaintainable spaghetti code. Others have introduced an ERP system, which results in a distributed logic between shop and ERP. In both cases, the documentation of the implemented process can only be found in the code and development efficiency decreases with the increasing complexity. But this has also an effect on operations: Support teams need to use many tools to understand the flow of a sales order. Process insight and process performance indicators are missing. Typically, there is a set of KPI aggregated in a data warehouse, but KPI reflects a result, if you want to understand why a specific result was realized, Process Performance Indicators let you dig deeper.

## Process Management

Business Process Management is a management discipline that focuses on processes rather than on departments or functional units. Processes describe how and where value is created for a customer. Typically, processes start outside of the company and then are processed within to finally end outside again.

Order 2 Cash is an important process that describes all activities needed that an incoming sales order needs to go through to finally end in a positive cash flow. So rather than managing a single department (finance, fulfillment, logistics), the entire flow of tasks is in focus. Because only a well-orchestrated collaboration of all departments and third parties like logistics leads to efficient value creation for the customer. The process is the link between customers, departments, suppliers, and logistics.

![Process management](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/OMS+matrix/process_management.png)

### How to manage a business process

First of all, it's important to understand what tasks are executed in which order. Defining the "to be" process ensures common understanding for all involved parties. A process model helps make implicit knowledge of an individual player explicitly understandable for everyone involved. This understanding helps align everyone and execute tasks in a standardized fashion.

If a "to be" process is established, it needs to be monitored. Does the idea of how a sales order should be processed reflects the reality? Process performance indicators help measure how efficiently a process creates value for the customer. Together with the process model, they give the basis to improve the process. If a process is executed more often, aspects that were an edge case at the beginning, are now worth to be explicitly modeled in the next version.

{% info_block infoBox "Managing the sales process" %}

The goal of continuous process improvement is to enter a cycle of redesign, execution, and monitoring. That means a specific process is actively managed. Ideally, an improvement iteration can be done in a very short time.

{% endinfo_block %}

## Sales order processing in the ecommerce world

Processes in the ecommerce world have the potential to be highly automated. That means that the different tasks are executed in the IT landscape. Often spanning different IT systems. Creation of sales order in a shop system, fulfillment with the help of fulfillment provider, finance, and controlling in an ERP system. To actively manage these processes, an understanding of the implemented processes is needed as well as a possibility to measure their performance. During my time as a consultant, we did often archeology projects, as I used to call them. To understand the current implementation we had to analyze the code. Documentation was typically only maintained until the mid of a project. Process performance indicators were nearly always missing. Only indirect measurements were possible. This is not a good basis for continuous improvement. If you don't know where you are, you can't tell where to go next.

At the same time processes are highly individual. If you sell concert tickets, music, or other digital products, you need totally different processes than someone who sells physical goods. And if you have a make-to-order process installed, it looks different again.

So the driving forces are the need to design and execute highly individual processes and manage them continuously to increase process efficiency. A classical approach with specification and implementation is slow and error-prone. Spryker takes a totally different approach, instead of writing specifications and implementing them, process model are executed. That is right: the process model itself is understood by the Spryker engine.

## Sales order process management with Spryker

A typical improvement cycle with Spryker looks like this: first, the "to be" processes are modeled involving process and technical experts. This makes sure business and its aspects are reflected. Misunderstandings can be identified very fast and a common understanding of the order processing process can be established in the company. The process model is then transferred into a technical notation that the Spryker engine can execute. The process model lets you add hooks that execute PHP coding. Examples are sending a shipment notification email, creating a credit card pre-authorization, or registering a shipment with the logistic provider. The process model itself orchestrates these technical functions. It tells in which order which technical building blocks have to be executed.

![Sales order process](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/OMS+matrix/sales_order_process.png)

Every state in the process model can be mapped to a business state. This lets you measure process performance. How many processes are in the pick pack ship subprocess? How much time does it typically take? How many credit card authorizations have failed? How long does it take to process a return? Furthermore, the Spryker user interface lets you track where in the process every sales order item is. This gives a process insight to support teams that talk with customers. How many processes fail? Is a problem an edge case, or is it worth to be automated? All kinds of Process Performance Indicators (PPI) can be defined.

If it's about to start the next process improvement iteration, the current process model is already available. No need to look into the coding to understand what the engine actually executes. The process model combined with the performance indicator forms the basis for the next improvement. Which can also be realized in a very short time. The process models need to be updated, and new hooks are implemented. Then the new process can be executed and monitored again.

The advantages are clear: highly individual processes can be designed with a model that allows a common understanding of all stakeholders. The process itself can be measured and weak spots identified. This lets the company do what is actually supposed to do: continuously improve the way how customer value is created.

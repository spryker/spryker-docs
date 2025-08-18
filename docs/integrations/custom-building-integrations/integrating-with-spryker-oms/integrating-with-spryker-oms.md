---
title: Integrating With Spryker Oms
description: Learn how to integrate Spryker OMS with third-party systems using event-driven
  and API-driven approaches to manage order lifecycles effectively.
last_updated: July 9, 2025
template: default
layout: custom_new
---

OMS (Order Management System) in Spryker is a built-in workflow engine that manages the lifecycle of an order - from placement to delivery. It defines each step (for example payment, shipping, cancellation) as part of a process, with clear transitions and conditions.

For third party integrations, you primarily use OMS in two ways:

**Event-driven integration (OMS as the Source):**

- OMS can be used to publish events (for example Order.Paid, Order.Shipped) when an order transitions to a specific state.
- Your 3rd party integration can then subscribe to these events (for example via a message queue like RabbitMQ) to trigger actions in an external system (for example update ERP, notify logistics partner, send customer email).

**API-Driven Integration (OMS as the Target):**

- You can expose Glue API endpoints that trigger specific OMS commands or state transitions (for example set order status to shipped, initiate return).
- This allows external systems (for example a Warehouse Management System, a Call Center application) to update the order status or trigger actions within Spryker's OMS.
- You can also extend the OMS process with custom states and transitions specifically designed for your 3rd party's workflow.

**Setting up an Order Management System**

<a class="fl_cont" href="/docs/integrations/custom_building_integrations/data_exchange/integrating_with_spryker_oms/set-up-an-order-management-system.html">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong>Setting up an Order Management System</div>
</a>
---
title: Security release notes for RabbitMQ Update
description: Security release notes for RabbitMQ Update
last_updated: October 24, 2025
template: concept-topic-template
publish_date: "2025-10-24"
---

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

We are upgrading one of our key services at Spryker—RabbitMQ—to version 4.1. This update provides several important benefits, including enhanced performance, improved scalability, and continued security patch support.

During the upgrade, the **RabbitMQ service restarts**, which may take **up to 30 minutes**. While core touchpoints such as the **product catalog, search, and order placement** remain unaffected, **asynchronous processes** such as **product information updates** might experience temporary delays. To avoid disruptions, **do not run product information updates during the maintenance window**.

Before your scheduled maintenance slot, complete these two steps:
1. **Update your Docker SDK** to [**version 1.68 or higher**](https://github.com/spryker/docker-sdk/releases/tag/1.68.0) for local development environments.
2. Minimize unprocessed RabbitMQ messages by:
    1. [Checking and purging **error queues**](https://docs.spryker.com/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-moved-to-error-queues#cause).
    2. Pausing **external data import processes** for the duration of the maintenance window.

## Key benefits of RabbitMQ 4.1

- Up to **30% faster message publishing** (based on internal testing)
- **Ongoing security updates** and **long-term support**


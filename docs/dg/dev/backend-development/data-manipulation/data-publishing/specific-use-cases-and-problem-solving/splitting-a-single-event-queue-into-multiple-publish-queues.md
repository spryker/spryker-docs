---
title: Splitting a Single Event Queue into Multiple Publish Queues
description: Improve event processing by splitting a single event queue into multiple publish queues. Reduce bottlenecks, speed up processing, and enhance observability at scale.
last_updated: Jun 16, 2025
template: howto-guide-template
---

When you handle a high volume of event messages, processing them through a single event queue can quickly become a bottleneck. As the system scales and the number of messages increases, you may encounter:

- Performance degradation

- Delayed message processing

- Difficulty tracking and analyzing message flows

To address these issues and improve both processing efficiency and observability, you can introduce multiple publish queues, each dedicated to a specific entity or domain. This separation allows messages to be processed independently, reducing contention and improving throughput.


You can explore [Integrating multi-queue publish structure](/docs/dg/dev/integrate-and-configure/integrate-multi-queue-publish-structure) for more information.
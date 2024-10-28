---
title: Expert Chunk Size Calculation
description: Gives an overview over the expert chunk size calculation
last_updated: Oct 25, 2024
template: concept-topic-template
redirect_from:
  - /docs/dg/dev/backend-development/data-manipulation/queue/chunk-size-calculation.html
related:
  - title: Basic Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/basic-chunk-size-calculation.html
  - title: Advanced Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/advanced-chunk-size-calculation.html
  - title: Queue
    link: docs/dg/dev/backend-development/data-manipulation/queue/queue.html

---

## Expert Chunk Size Calculation

### Overview

The **Expert Chunk Size Calculator** is designed for developers working with heavily customized entities within the project. Whether it's a single entity or multiple entities, when these entities are significantly customized in terms of size, relationships, or data complexity, this calculator provides the granular control needed to fine-tune each queue's performance.

As the complexity of an entity increases, so does the denormalization time, which can slow down the entire system. Developers using the **Expert Chunk Size Calculator** must have a solid understanding of how containerization works in the project, how resources like memory and CPU are distributed among containers, workers, and tasks, as well as the limitations of the receiving side services (such as search and storage) and the provider systems (like the database). The message broker, which delivers messages and imposes throughput limits, is also a critical component of the overall system architecture that needs to be considered.

The **Expert Chunk Size Calculator** is available [here](link to google spreadsheet).

### Problem Statement

In highly customized systems, Basic or Advanced queue chunk size configurations may not suffice. Complex entities with large data sets and relationships demand more fine-tuned control over how tasks are processed, how resources are allocated, and how messages are handled. The **Expert Chunk Size Calculator** is needed to provide detailed, queue-by-queue configuration for developers who need to optimize the project's performance under these conditions.

### Input Parameters

The **Expert Chunk Size Calculator** requires a wide range of detailed inputs to properly configure chunk sizes. Developers need to provide in-depth information about the production environment, including:

- **Entity Customization**: The size and cardinality of the entities, which affects how much memory and CPU is consumed during the denormalization process.
- **Message Handling**: Specific configuration data regarding the size of messages that will be processed by the system and the limits imposed by the message broker and receiving systems.

The expert calculator offers the ability to set individual performance and resource consumption metrics for each queue, making it possible to precisely optimize the entire **publish and synchronize** process.

### Output

The result of the **Expert Chunk Size Calculator** is a set of optimized queue chunk sizes for each individual queue in the project.

> For instructions on how to set up chunk sizes for the queues, [click here](https://docs.spryker.com/docs/dg/dev/backend-development/data-manipulation/queue/queue.html#configuration-for-chunk-size).

### Important Notes

- The **Expert Chunk Size Calculator** is intended for projects that have significant customizations at the entity level. If your system follows a more standard setup, consider using the **Basic** or **Advanced Chunk Size Calculators**.
- This calculator requires an in-depth understanding of how system components interact, including containerization, message brokers, search and storage, and resource distribution across workers and tasks.
- For systems that require individual configuration of queues and detailed customization of message handling, consider using the **Expert Chunk Size Calculator**.

### Additional Knowledge Required

To effectively use the **Expert Chunk Size Calculator**, developers must have a strong grasp of several key concepts related to resource management and system architecture.

#### 1. Container-Worker-Task Resource Relationship

This section will cover how resources (memory, CPU, etc.) are allocated between containers, workers, and tasks. It will explain how container boundaries are defined and the importance of understanding how these resources are distributed across the system to maintain healthy processing.

#### 2. Publish and Synchronize Queues

This section will explain how queues work in the publish and synchronize middleware, how they process multiple entities, and how factors like entity size and denormalization times impact CPU and memory consumption. Understanding these relationships is key to optimizing each queue’s performance through the expert calculator.

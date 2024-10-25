---
title: Chunk Size Calculation
description: Describes the challenges and solutions of selecting proper chunk sizes for project requirements
last_updated: Oct 25, 2024
template: concept-topic-template
redirect_from:
  - /docs/dg/dev/backend-development/data-manipulation/queue/queue.html#concepts
related:
  - title: Basic Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/basic-chunk-size-calculation.html
  - title: Advanced Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/advanced-chunk-size-calculation.html
  - title: Expert Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/expert-chunk-size-calculation.html

---

## Chunk Size Calculation

### Problem Statement

In an e-commerce framework, selecting the correct chunk size for processing data is critical for ensuring optimal performance and efficient resource usage. The challenge arises from the diversity of business entities, stores, and locales, each with different memory and CPU requirements for denormalization. Furthermore, the frequency of updates, data sizes, and the specific configurations of various system services (e.g., Redis, Elasticsearch, RabbitMQ) make it difficult to determine the appropriate chunk size for each queue.

Without proper chunk size configuration, systems can either overconsume resources, leading to crashes or lag, or underutilize resources, resulting in slow performance. This is where the **Chunk Size Calculator** comes in—offering a solution that helps developers fine-tune their chunk sizes based on the specific characteristics of their system.

### What is the Chunk Size Calculator?

The **Chunk Size Calculator** is a tool that helps developers determine the appropriate chunk sizes for processing data across different queues in a resource-efficient way. It ensures that memory and CPU usage are optimized and prevents the system from being overwhelmed during data processing tasks. This tool is designed to handle the variability in entity sizes, stores, locales, and update frequencies, giving developers confidence that their system will run smoothly in production environments.

### The Three Levels of the Chunk Size Calculator

The **Chunk Size Calculator** is divided into three levels: **Basic**, **Advanced**, and **Expert**. Each level is designed to accommodate different degrees of system complexity and customization. Below is an overview of each:

#### 1. Basic Chunk Size Calculator

The **Basic Chunk Size Calculator** is designed for small to medium B2C webshops or systems with minimal customization. It assumes that the default configuration of business entities, stores, and locales is sufficient, and that the resource consumption patterns are predictable.

With the Basic calculator, developers only need to provide a minimal set of inputs, such as high level store configuration and high traffic entity counts. The calculator uses these inputs to recommend chunk sizes for each queue. This is ideal for developers who are working with out-of-the-box setups and need a simple, reliable way to configure their system. 

**When to use**: This is the default starting point for any project. If your system has not been heavily customized, this calculator will give you the necessary chunk sizes with minimal effort.

Find more details on the [Basic Chunk Size Calculation](#docs/dg/dev/backend-development/data-manipulation/queue/basic-chunk-size-calculation.html) page.

#### 2. Advanced Chunk Size Calculator

The **Advanced Chunk Size Calculator** builds upon the basic level, requiring developers to have a deeper understanding of the services that make up the system. In addition to understanding the basic chunk size concepts, developers will need to account for service elements like:

- **Persistence** (Relational Database Service)
- **Storage** (Redis)
- **Search** (Elasticsearch)
- **Message Broker** (RabbitMQ)
- **Scheduler**

The Advanced calculator allows developers to select from AWS container types and configure memory sizes for each service. It also exposes additional performance metrics, such as the average number of triggered events per second and message size limits in RabbitMQ. While the calculator provides recommendations, developers will need to input detailed configuration data to fine-tune the system.

**When to use**: The Advanced calculator is suited for systems that have been moderately customized or when developers need more precise control over performance and resource usage.

Find more details on the [Advanced Chunk Size Calculation](#docs/dg/dev/backend-development/data-manipulation/queue/advanced-chunk-size-calculation.html) page.

#### 3. Expert Chunk Size Calculator

The **Expert Chunk Size Calculator** is designed for highly customized systems where one or more entities deviate significantly from the norm. This includes scenarios where entities are unusually large or where the system handles massive data volumes that require frequent updates.

In this case, developers need a deep understanding of how the system’s components interact, including the scheduler’s worker, and the memory distribution across workers, and tasks. The Expert calculator gives full visibility into all performance metrics, allowing developers to tweak each queue individually.

Despite the complexity, the calculator still ensures that the entire system remains balanced, preventing one queue from consuming too many resources at the expense of others.

**When to use**: The Expert calculator is reserved for production environments with complex, heavily customized setups that require fine-tuning of every performance metric.

Find more details on the [Expert Chunk Size Calculation](#docs/dg/dev/backend-development/data-manipulation/queue/expert-chunk-size-calculation.html) page.

### Summary

The **Chunk Size Calculator** provides developers with a powerful tool for optimizing their system’s resource consumption. Each level of the calculator is designed to address different use cases, from simple out-of-the-box configurations to highly customized, complex environments. Developers are encouraged to start with the **Basic Chunk Size Calculator** and, if necessary, progress to the **Advanced** or **Expert** calculators as the complexity of their system grows.

#### Access the Calculators

- [Basic Chunk Size Calculator](#)
- [Advanced Chunk Size Calculator](#)
- [Expert Chunk Size Calculator](#)

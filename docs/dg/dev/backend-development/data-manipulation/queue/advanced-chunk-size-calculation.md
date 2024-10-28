---
title: Advanced Chunk Size Calculation
description: Gives an overview over the advanced chunk size calculation
last_updated: Oct 25, 2024
template: concept-topic-template
redirect_from:
  - /docs/dg/dev/backend-development/data-manipulation/queue/chunk-size-calculation.html
related:
  - title: Basic Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/basic-chunk-size-calculation.html
  - title: Expert Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/expert-chunk-size-calculation.html
  - title: Queue
    link: docs/dg/dev/backend-development/data-manipulation/queue/queue.html

---

## Advanced Chunk Size Calculation

The **Advanced Chunk Size Calculator** builds upon the Basic level by allowing to fine-tune chunk sizes based on custom hardware limitations and custom performance metrics.

### The Advanced Chunk Size Calculator
The **Advanced Chunk Size Calculator** is available [here](link to google spreadsheet).

### Problem Overview

While the **Basic Chunk Size Calculator** offers a starting point, it doesn’t account for the nuances of resource allocations (like container sizes, CPU, and memory limits) or performance-sensitive variables such as application warm-up time and event message size. The **Advanced Chunk Size Calculator** addresses these issues by incorporating these additional metrics, enabling a more precise configuration that enhances stability and performance in production environments.

### Input Parameters

To calculate the correct queue chunk sizes, developers must provide the following information based on their specific production environment:
- **Scheduler and Worker Setup**: Provide details on any non-standard configurations, such as environments with multiple containers or distinct worker distributions within containers, if your scheduler setup differs from the boilerplate defaults.
- **Resource Configuration**: Provide information on your hardware setup, including instance types, CPU, and memory limits for services like Persistence, Storage, Search, or Message Broker, to allow the **Advanced Calculator** to optimize chunk sizes based on actual resource availability.
- **Detailed Product Configuration**: Provide specific metrics related to products, the highest-traffic entity. This supports more precise chunk sizing for products without requiring an in-depth understanding of Publish & Synchronize.
- **Event and Message Processing Metrics**: Provide expected event processing metrics, including deviations from default settings such as message trigger rates, custom application warm-up times, event size limits, and data division rate multipliers, to enable configuration adjustments that align with real-world performance.

### Output

Once the required data is entered into the **Basic Chunk Size Calculator** and **Advanced Chunk Size Calculator**, it will compute the optimal queue chunk sizes for each queue. Developers will need to configure these queue chunk sizes in their project to align with the calculated values.

> For instructions on how to set up chunk sizes for the queues, [click here](https://docs.spryker.com/docs/dg/dev/backend-development/data-manipulation/queue/queue.html#configuration-for-chunk-size).


### Important Notes

- The **Advanced Chunk Size Calculator** allows to further configure chunk sizes based on custom hardware limitations and custom performance metrics.
- For systems that require individual configuration of queues and detailed customisation of message setups, consider using the **Expert Chunk Size Calculator**.
- Always ensure that the chunk sizes provided by the calculator are properly configured to avoid system performance issues.

---

For more detailed information about the different levels of the **Chunk Size Calculator**, see the [overview here](https://docs.spryker.com/docs/dg/dev/backend-development/data-manipulation/queue/chunk-size-calculation.html).

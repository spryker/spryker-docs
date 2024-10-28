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

### Additional Fine Tuning Configuration

- This tool is ideal for scenarios where your system's resource consumption and performance vary from the standard configurations provided by the e-commerce framework. For example, if your **scheduler setup** differs from the default—such as running multiple containers or distributing workers differently within containers.
- Additionally, the **Advanced Calculator** is essential when you are working with a customized hardware environment. If you're using different instance types or have specific memory and CPU limits for your services (Persistence, Storage, Search, or Message Broker) the Advanced Calculator enables you to fine-tune the chunk sizes based on the actual hardware configuration.
- Beyond hardware, this calculator is also useful if your system processes events at a rate that deviates from the default settings. For example, if you need to adjust the rate at which messages are triggered into queues, or if your application has a custom warm-up time, you can modify these parameters to better reflect your system’s real-world performance.
- This tool is also ideal for fine-tuning memory and CPU allocation for tasks, especially in environments where specific performance thresholds are important. For instance, you can control how much of the scheduler’s resources are dedicated to processing tasks versus how much is reserved for the scheduler’s core operations. If your tasks are more resource-intensive than the default configuration assumes, this calculator allows you to ensure that the chunk size is set to avoid overwhelming system resources while still maximizing throughput.

### Important Notes

- The **Advanced Chunk Size Calculator** allows to further configure chunk sizes based on custom hardware limitations and custom performance metrics.
- For systems that require individual configuration of queues and detailed customisation of message setups, consider using the **Expert Chunk Size Calculator**.
- Always ensure that the chunk sizes provided by the calculator are properly configured to avoid system performance issues.

---

For more detailed information about the different levels of the **Chunk Size Calculator**, see the [overview here](https://docs.spryker.com/docs/dg/dev/backend-development/data-manipulation/queue/chunk-size-calculation.html).

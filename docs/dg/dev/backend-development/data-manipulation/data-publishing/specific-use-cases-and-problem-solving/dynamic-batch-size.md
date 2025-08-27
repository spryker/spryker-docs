---
title: Dynamic Batch Size
description: Optimize large data imports with dynamic batch sizing to manage memory efficiently, prevent overload, and ensure stable, reliable processing during high-volume operations.
last_updated: Jun 16, 2025
template: howto-guide-template
---

During large-scale data imports - such as loading customer orders, product details, and pricing data - the process can take several hours and consume significant system memory. This may lead to memory exhaustion, application crashes, or degraded performance.

Moreover, memory usage is often uneven, with spikes of high consumption followed by low-usage periods. To address these challenges, you can implement a dynamic batch size strategy.

This approach continuously adjusts the batch size based on the available memory for the current thread. As a result, it helps:

- Optimize memory utilization

- Prevent memory overload

- Ensure a more stable and efficient import process

By dynamically adapting to the system’s capacity, this method improves reliability and makes large imports more predictable and resource-friendly.


You can explore [RAM-aware batch processing](/docs/dg/dev/guidelines/performance-guidelines/elastic-computing/ram-aware-batch-processing) and Integrate RAM-aware batch processing for more information.






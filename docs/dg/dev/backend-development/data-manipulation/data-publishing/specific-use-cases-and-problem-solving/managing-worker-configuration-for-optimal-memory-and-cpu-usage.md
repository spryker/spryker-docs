---
title: "Managing worker configuration for optimal memory and CPU usage"
description: Improve queue processing by running multiple workers per queue while managing PHP memory limits, CPU usage, and Jenkins executors to maintain system stability.
last_updated: Jun 16, 2025
template: howto-guide-template
---



As the volume of messages grows, the demand for efficient queue processing increases. To improve throughput, you can run multiple queue workers per queue, allowing messages to be processed in parallel.

However, this approach introduces new considerations:

- Memory management: Each worker may consume up to the maximum memory defined by PHP's `memory_limit`. Running too many workers can lead to excessive memory usage and potential out-of-memory errors.

- Jenkins executors: If you are using Jenkins to manage jobs, ensure that the number of executors is configured appropriately to avoid overloading the host system.

- CPU utilization: Align the number of workers with the number of available CPU cores. Oversubscribing the CPU can degrade performance and lead to system instability.

By carefully balancing memory limits, CPU resources, and Jenkins executor settings, you can scale message processing efficiently without compromising system stability. 


For more information, see [Best practices: Jenkins stability](/docs/ca/dev/best-practices/best-practises-jenkins-stability).
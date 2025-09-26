---
title: Stable workers
description: Learn about Stable Workers architecture for enhanced Publish and Synchronize functionality in Spryker.
last_updated: Sep 23, 2025
template: howto-guide-template
related:
  - title: Cronjobs
    link: docs/dg/dev/backend-development/cronjobs/cronjobs.html
  - title: Jenkins stability best practices
    link: docs/ca/dev/best-practices/best-practises-jenkins-stability.html
  - title: Jenkins operational best practices
    link: docs/ca/dev/best-practices/jenkins-operational-best-practices.html
---

While Jenkins manages non-P&S tasks, Publish and Synchronize (P&S) functionality uses a Stable Worker architecture with enhanced features. This architecture addresses stability challenges, ensuring more reliable data synchronization, such as products, prices, assets, especially for large catalogs and frequent updates. The architecture provides isolated worker contexts, automatic retries, and better error handling for a more robust P&S operation.


Key characteristics:

- Isolated worker contexts: Each worker operates in its own dedicated environment, preventing interference between different processes
- Automatic retries: Built-in retry mechanisms ensure that temporary failures don't result in data loss
- Enhanced error handling: Improved error detection and recovery mechanisms
- Optimized for P&S workloads: Specifically tuned for the memory and processing patterns of P&S operations
- Resource optimization: Intelligent distribution of computational resources among parallel processes
- Configurable capacity: Support for customizable capacity providers and auto-scaling groups for optimal performance

## Scalable architecture

The enhanced Stable Workers architecture incorporates advanced features designed to handle varying workloads efficiently.

### Dynamic worker scaling

- Capacity providers: Configurable Auto Scaling Groups with custom capacity providers for optimal resource allocation
- ECS integration: Seamless integration with Amazon ECS for container-based worker management

### Resource management

- Thread pool optimization: Configurable `THREAD_POOL_SIZE` parameter for parallel process management
- Queue prioritization: `QUEUE_PRIORITY` settings allow fine-tuning of resource allocation per queue
- Memory distribution: Intelligent RAM allocation across workers to prevent memory limit issues

### Load distribution

Workers are distributed across queues using weighted calculations:
- Queue weight = queue length × queue priority
- Number of workers per queue = (queue weight × thread pool size) / total weight
- RAM per worker = total available RAM / thread pool size

This ensures optimal resource utilization and prevents bottlenecks during high-volume P&S operations.

## Business benefits

Stable Workers provide several significant advantages for your Spryker application:

- Improved P&S performance and stability: Faster, more stable catalog data refreshes and timely frontend updates ensure that your customers always see the most current product information, prices, and availability.
- Reliable data synchronization: More robust P&S with isolated task processing eliminates the risk of one failed process affecting others, ensuring consistent data flow across your application.
- Better handling of complex scenarios: Efficiently manage large, frequently updated catalogs common in B2B and Marketplace scenarios without performance degradation or system instability.
- Reduced operational disruptions: Minimized downtime and manual P&S interventions due to enhanced resilience reduce the operational burden on your development and operations teams.
- Enhanced logging: Better visibility for logs (CloudWatch) for quicker resolution of P&S issues, enabling faster troubleshooting and reduced time to resolution.

## Configuration

To enable Stable Workers for your Spryker application, [contact us](https://spryker.com/en/support).

### Advanced configuration options

#### Scalable workers infrastructure

- Custom capacity providers: Configure Auto Scaling Groups (ASG) for dynamic worker scaling
- ECS cluster integration: Leverage Amazon ECS for container-based worker management
- Resource optimization: Fine-tune thread pool sizes and queue priorities based on specific workload requirements

#### Configuration parameters

- `THREAD_POOL_SIZE`: Maximum number of parallel processes (default: 0 = disabled)
- `QUEUE_PRIORITY`: Configurable ratio per queue for resource allocation (default: 1)
- `DEFAULT_MAX_QUEUE_WORKER`: Disabled when thread pool size > 0























































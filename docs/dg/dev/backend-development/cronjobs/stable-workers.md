---
title: Stable Workers
description: Learn about Stable Workers architecture for enhanced Publish and Synchronize functionality in Spryker with dynamic worker scaling capabilities.
last_updated: Dec 23, 2024
template: howto-guide-template
related:
  - title: Cronjobs
    link: docs/dg/dev/backend-development/cronjobs/cronjobs.html
  - title: Jenkins stability best practices
    link: docs/ca/dev/best-practices/best-practises-jenkins-stability.html
  - title: Jenkins operational best practices
    link: docs/ca/dev/best-practices/jenkins-operational-best-practices.html
---

Introducing a significant enhancement to Publish and Synchronize (P&S) focused on increasing its job processing stability and scalability. While Jenkins continues to manage non-P&S tasks, P&S functionality now uses a new Stable Worker Architecture with enhanced scalability features. This redesign addresses stability challenges from its previous Jenkins-based execution, ensuring more reliable data synchronization (products, prices, assets), especially for large catalogs and frequent updates. The new architecture provides isolated worker contexts, automatic retries, dynamic scaling capabilities, and better error handling for a more robust and scalable P&S operation.

## Stable Workers overview

Stable Workers represent a new architecture for executing Publish and Synchronize (P&S) tasks that replaces the previous Jenkins-based execution model. This architecture is specifically designed to handle the demanding requirements of data synchronization in modern e-commerce environments.

Key characteristics:

- Isolated worker contexts: Each worker operates in its own dedicated environment, preventing interference between different processes
- Automatic retries: Built-in retry mechanisms ensure that temporary failures don't result in data loss
- Enhanced error handling: Improved error detection and recovery mechanisms
- Optimized for P&S workloads: Specifically tuned for the memory and processing patterns of Publish and Synchronize operations
- Dynamic scaling: Automatic scaling of worker instances based on queue length and workload demands
- Resource optimization: Intelligent distribution of computational resources among parallel processes
- Configurable capacity: Support for customizable capacity providers and auto-scaling groups for optimal performance

The Stable Worker Architecture addresses common issues encountered with Jenkins-based P&S execution, such as memory constraints, resource contention, and stability problems during high-load scenarios.

## Scalable Architecture

The enhanced Stable Workers architecture incorporates advanced scaling features designed to handle varying workloads efficiently:

### Dynamic Worker Scaling
- Automatic scaling: Workers scale up and down based on queue length and processing demands
- Capacity providers: Configurable Auto Scaling Groups (ASG) with custom capacity providers for optimal resource allocation
- ECS integration: Seamless integration with Amazon ECS for container-based worker management

### Resource Management
- Thread pool optimization: Configurable `THREAD_POOL_SIZE` parameter for parallel process management
- Queue prioritization: `QUEUE_PRIORITY` settings allow fine-tuning of resource allocation per queue
- Memory distribution: Intelligent RAM allocation across workers to prevent memory limit issues

### Load Distribution
Workers are distributed across queues using weighted calculations:
- Queue weight = Queue length × Queue priority
- Number of workers per queue = (Queue weight × Thread pool size) / Total weight
- RAM per worker = Total available RAM / Thread pool size

This ensures optimal resource utilization and prevents bottlenecks during high-volume P&S operations.

## Business Benefits

Stable Workers provide several significant advantages for your Spryker application:

### Improved P&S Performance & Stability
Faster, more stable catalog data refreshes and timely frontend updates ensure that your customers always see the most current product information, prices, and availability.

### Reliable Data Synchronization
More robust P&S with isolated task processing eliminates the risk of one failed process affecting others, ensuring consistent data flow across your application.

### Better Handling of Complex Scenarios
Efficiently manage large, frequently updated catalogs common in B2B/Marketplace scenarios without performance degradation or system instability. Advanced scaling capabilities automatically adjust resources based on workload demands.

### Optimized Resource Utilization
Dynamic scaling and intelligent resource distribution ensure optimal use of computational resources, reducing costs while maintaining high performance even during peak loads.

### Reduced Operational Disruptions
Minimized downtime and manual P&S interventions due to enhanced resilience reduce the operational burden on your development and operations teams.

### Enhanced Logging
Better visibility for logs (CloudWatch) for quicker resolution of P&S issues, enabling faster troubleshooting and reduced time to resolution.

## Configuration

To enable Stable Workers for your Spryker application, you need to contact Spryker Support. This feature requires infrastructure-level configuration that is managed by the Spryker team.

### How to Enable Stable Workers

1. Contact Spryker Support: Reach out to your Spryker support team to request Stable Workers activation
2. Provide Environment Details: Specify which environments (development, staging, production) should have Stable Workers enabled
3. Review Configuration: Spryker Support will work with you to ensure the configuration aligns with your specific requirements

### What Customers Need to Do

- Reach Spryker's Support: The activation process is managed by Spryker's infrastructure team as highlighted above
- Get this Enabled: Once enabled, Stable Workers will automatically handle your P&S operations without requiring code changes
- Monitor Performance: After activation, monitor your application's P&S performance to validate the improvements


### Advanced Configuration Options

For customers requiring enhanced scalability, additional configuration options are available:

#### Scalable Workers Infrastructure
- Custom capacity providers: Configure Auto Scaling Groups (ASG) for dynamic worker scaling
- ECS cluster integration: Leverage Amazon ECS for container-based worker management
- Resource optimization: Fine-tune thread pool sizes and queue priorities based on specific workload requirements

#### Configuration Parameters
- `THREAD_POOL_SIZE`: Maximum number of parallel processes (default: 0 = disabled)
- `QUEUE_PRIORITY`: Configurable ratio per queue for resource allocation (default: 1)
- `DEFAULT_MAX_QUEUE_WORKER`: Disabled when thread pool size > 0

These advanced features enable automatic scaling based on queue length and workload demands, optimizing resource utilization and processing efficiency.

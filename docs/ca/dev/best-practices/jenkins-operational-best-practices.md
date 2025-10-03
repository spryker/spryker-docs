---
title: Jenkins operational best practices
description: Optimize Jenkins performance in Spryker Cloud Commerce OS with best practices for memory management, CPU settings, and stable job configurations.
template: best-practices-guide-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/best-practices/best-practises-jenkins-stability.html
  - /docs/ca/dev/best-practices/jenkins-operational-best-practices-handbook.html
last_updated: March 11, 2024
---

This document will help you implement Spryker's best practices to enhance the stability and performance of the Jenkins component in your Spryker PaaS environment.
Before raising issues about Jenkins performance and stability with Spryker, make sure you have fully completed the following checklist. If you have concerns or questions about it, raise them with Spryker Support.

{% info_block infoBox "Stable Workers" %}

For enhanced Publish and Synchronize (P&S) stability, consider using Spryker's Stable Workers architecture. This new approach addresses many Jenkins stability challenges by providing isolated worker contexts and better resource management. This new architecture includes configurable capacity providers and intelligent resource distribution to optimize P&S performance while reducing Jenkins load. For more information, see [Stable Workers](/docs/dg/dev/backend-development/cronjobs/stable-workers.html).

{% endinfo_block %}


- Configure a maximum of two executors.
- Set your PHP `memory_limit` value to be less than 2 GB.
- Implement batch processing in your importers and be mindful of maximum memory consumption. For the implementation details, see [Data import optimization guidelines](/docs/dg/dev/data-import/latest/data-import-optimization-guidelines.html) and [Integrate elastic computing](/docs/dg/dev/integrate-and-configure/integrate-elastic-computing.html).
- Fine-tune the chunk size of the queues you work with.
- Make sure that your theoretical maximum memory demand for all planned parallel processes remains below the memory allocation of your Jenkins instance.
- Verify that every PHP job you run consumes less memory than your specified PHP memory limit. There shouldn't be the error "PHP Fatal error: Out of memory".
- Make sure that no jobs are configured with a non-default memory limit or without any memory limit at all in `jenkins.php`. For example,`php -d memory_limit=-1 vendor/bin/console ...`.
- Avoid spawning an excessive number of workers. There should be no more than two workers per queue.
- Profile your jobs locally to understand their normal memory demand, especially when interacting with data.
- In a standard-sized non-production environment, don't run lengthy imports and sync processes lasting more than 1-2 hours.
- Be prepared to lose manually created jobs. Make sure that all critical jobs are persisted in your project (jenkins.php).

## Theoretical max memory demand and memory constraints

In Spryker, Jenkins plays a central role in executing jobs for your application. These jobs can be CLI commands, such as `vendor/bin/console queue:worker:start`. On Spryker PaaS, unlike local developer environments, these commands are currently not executed in a separate CLI container but run inside the Jenkins Docker container. This is a significant difference that can cause issues related to memory constraints.
For example, on your local development machine, you might have noticed that the CLI container, by default, consumes as much RAM as it needs until your machine can no longer provide more. While this behavior is convenient, it conceals potential issues related to memory consumption in your jobs. This can lead to Jenkins instability when your application is deployed on Spryker PaaS. When deployed on Spryker PaaS, your jobs must adhere to several memory constraints as explained in [Best practices: Jenkins stability](/docs/ca/dev/best-practices/best-practises-jenkins-stability.html).

The following diagram showcases different memory constraints you should consider to maximize Jenkins stability.

![memory-constraints](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/jenkins-stability-checklist/memory_constraints.png)

Keep in mind that each Jenkins executor can run one PHP job, which may potentially spawn multiple PHP threads or child processes. Each process can consume RAM up to `memory_limit` value.
The `vendor/bin/console queue:worker:start` CLI command, in particular, is often configured to have multiple workers or threads and is typically the most RAM-intensive job. Hence, we will use it as an example moving forward.

It is crucial to ensure that the combined theoretical maximum memory consumption, estimated using the formula below, is below the total RAM supply of the Jenkins container. By default, the Jenkins container is configured to optimize the use of the total memory supply of its host. You can calculate the Jenkins container's available RAM by deducting 750 MB from the Jenkins memory allocation of your infrastructure package listed in our Service Description.

{% info_block infoBox "Info" %}

In most environments, we have swap enabled to mitigate instability caused by excessive memory demand. While this theoretically helps reduce the impact of memory spikes, it significantly affects performance. To avoid swapping, make sure that your theoretical RAM demand remains within the aforementioned constraints.

{% endinfo_block %}

Formula to estimate your maximum theoretical RAM demand:

Number of executors x (maximum workers and threads spawned by heaviest job * memory_limit) = Theoretical max RAM Demand

As you can see from the multiplicative nature of the threads and executors, you can easily reach a surprisingly high theoretical max RAM demand. However, it's unlikely that you will actually consume this amount. You would need to have multiple heaviest jobs running in parallel and consuming up to the `memory_limit simultaneously`. Nevertheless, calculating it's good practice, as keeping your theoretical maximum RAM demand below the memory supply significantly increases stability as it virtually eliminates the risk of Jenkins crashing because of exhausting its memory supply. This is currently the most common root cause of Jenkins service degradation and outages.

### To-Dos

Make sure the following criteria are met:

- Your theoretical maximum memory demand is below the memory allocation of your Jenkins instance.
- Every PHP job you run consumes less than your specified PHP memory limit.
- You have configured your PHP `memory_limit` to be less than 2 GB.
- You have configured a maximum of two executors.


{% info_block infoBox "Info" %}

If you are running multiple stores, you might notice that jobs "pile up" with only two executors configured. This happens because adding stores usually duplicates all jobs. While most jobs are executed quickly and Jenkins cycles through these jobs rapidly, the `queue:worker:start` jobs might take longer, potentially leading to delays in message propagation for some shops. To mitigate this behavior, you can process all queues by using a single executor slot, as described in [Optimizing Jenkins execution](https://docs.spryker.com/docs/dg/dev/backend-development/cronjobs/optimizing-jenkins-execution.html).

{% endinfo_block %}

## Realistic memory demand and performance considerations

While calculating the theoretical maximum memory demand of your application is a great way to understand your risk for Jenkins instability, examining actual memory demand and job performance helps you better understand performance bottlenecks. XDebug Profiling is a great tool to help you understand what tasks consume how much time and what is causing CPU and memory load. Profiling your most demanding jobs is essential and also straightforward. See [Set up XDebug profiling](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/set-up-xdebug-profiling.html) for details on the steps you need to take to effectively analyze the jobs you are running.

### Queue workers

We have addressed executors in the context of memory demand, but it's also important to understand the impact of executors and the jobs you run with them on the CPU. There is an ongoing discussion regarding the optimal number of executors Jenkins should have per CPU core. While memory constraints are more critical than CPU constraints in Spryker environments, it's essential to configure your application and environment in a manner that avoids threads [waiting for CPU cycles](/docs/ca/dev/best-practices/best-practises-jenkins-stability.html#creating-jobs-in-jenkins-dashboard). Spryker configures Jenkins instances to utilize all available CPU power on the host, which is beneficial for performance. However, this configuration can lead to accidental overload. This issue is commonly observed in projects where `queue:worker:start` is configured with too many workers, and multiple executors are set up to run `queue:worker:start` processes for different stores in parallel. Let's assume that this setup is feasible from a memory constraint perspective (although it often isn't, and memory constraint issues typically manifest before CPU issues). In such cases, all jobs executed by an executor begin to spawn multiple worker threads, competing for CPU cycles on the 2 vCore host (in standard configuration). This can result in a significant slowdown of the host, with CPU load reaching 100%, eventually leading to instability.

The following example shows where you can configure the queue worker count:

```bash
# in config_default.php
$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION] = [

    EventConstants::EVENT_QUEUE => [
        QueueConfig::CONFIG_QUEUE_ADAPTER => RabbitMqAdapter::class,
        QueueConfig::CONFIG_MAX_WORKER_NUMBER => 1,
    ],

    PublisherConfig::PUBLISH_QUEUE => [
        QueueConfig::CONFIG_QUEUE_ADAPTER => RabbitMqAdapter::class,
        QueueConfig::CONFIG_MAX_WORKER_NUMBER => 1,
    ],
];
```

Import jobs, as well as Publish and Sync-related processes, can be taxing on the database. Make sure that you conduct profiling with a realistic dataset. You can take a database dump from your PaaS environments or use AI to generate test data in realistic quantities.

### Imports and Publish and Synchronize

Imports and certain Publish and Sync processes can lead to high computational costs, such as permutation calculations for filters. Therefore, it's crucial to implement [RAM-aware batch processing](/docs/dg/dev/integrate-and-configure/integrate-elastic-computing.html#integrate-ram-aware-batch-processing) and [queue chunk sizes](/docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#chunk-size) that are suitable for the complexity of your data. The former helps prevent loading all import data into RAM, while the latter prevents RabbitMQ pipe timeouts because of lengthy processing times. A chunk or batch size that is too large may result in memory-related exceptions or messages being stuck in queues (with logs indicating RabbitMQ broken pipe exceptions), whereas a chunk or batch size that is too small may lead to subpar import and P&S performance. There is no one-size-fits-all solution, but with profiling, you can find a good balance between stability and performance.

While fine-tuning your chunk size, check out the following articles:
- [Messages are moved to error queues](https://docs.spryker.com/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-moved-to-error-queues.html)
- [Messages are stuck in UNACK state](https://docs.spryker.com/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-in-the-unacked-state.html)
- [Message are stuck without error notification](https://docs.spryker.com/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-without-error-notifications.html)

A valuable general recommendation is to [split up publishing queues](https://docs.spryker.com/docs/dg/dev/integrate-and-configure/integrate-multi-queue-publish-structure.html#set-up-a-publish-queue-for-a-publisher-plugin) for improved performance and precise control. You will observe varying memory and CPU demands for different messages in your queues, and by dividing the queues to accommodate various events, you can establish appropriate chunk sizes for each of them.

### CPU credits

Standard-sized non-production environments aren't intended to handle long periods of high load. Most infrastructure components in this package size operate with a burst configuration, allowing for increased performance during limited periods. However, if these environments are under heavy load for an extended duration, the components will eventually run out of "burst credits" and throttle until the load decreases and the credits can replenish over time. When an instance is throttled, its CPU performance is capped at 20%. Consequently, the instance may struggle to complete standard tasks, resulting in the following common symptoms:

- Deployment-related steps in the Deploy_Scheduler pipeline may encounter issues because of insufficient processing capacity.
- Job execution durations in your APM may sharply increase, or you may encounter RabbitMQ broken pipe exceptions.
- The Jenkins UI may become unresponsive or sluggish.

In such cases, stopping heavy jobs for 2-3 hours often allows CPU credits to recover, facilitating the completion of tasks. If you frequently encounter the aforementioned issues or require sustained high load on your non-production systems, discuss upgrading your environment with your Account Manager. Packages above the standard size typically run with instance types that do not rely on CPU credits for performance.

### To-Dos

Make sure the following criteria are met:

- You are not spawning an excessive number of workers (no more than two per queue).
- You've conducted local profiling of your jobs to determine their typical memory demand when interacting with expected data.
- If using a Standard-sized non-production environment, you run lengthy imports and synchronization processes lasting more than 1-2 hours.
- You've implemented batch processing in your importers and determined the maximum memory consumption of your importer.
- You've configured the chunk size of the queues you are working with to align with the memory constraints of your environment.

## Jenkins job configuration

With all the preparation work listed in this document, you should already notice a significant improvement in Jenkins stability. To further enhance the resilience of your setup, we have gathered the following general recommendations for you.

When the Jenkins host crashes and requires re-provisioning, there is a risk of losing all manually created jobs. To mitigate this risk, we recommend persisting important jobs in code. This ensures that when `vendor/bin/console scheduler:setup` is executed during recovery, all your critical jobs are reinstalled.

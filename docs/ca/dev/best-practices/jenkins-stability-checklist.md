---
title: Jenkins stability checklist
description: Checklist for improved Jenkins stability
template: best-practices-guide-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/best-practices/best-practises-jenkins-stability.html
last_updated: March 11, 2024
---

This checklist will help you implement Spryker’s best practices, enhancing the stability and performance of the Jenkins component in your Spryker PaaS environment. Before raising issues about Jenkins performance and stability with Spryker, make sure you have fully completed the check list. If you have concerns or questions about iy, raise them with Spryker Support.


- [ ] Configure a maximum of 2 executors.
- [ ] Set your PHP memory_limit to be less than 2GB.
- [ ] Implement batch processing (guidelines are here and here) in your importers and be aware of the maximum memory consumption.
- [ ] Fine-tune the chunk size of the queues you work with.
- [ ] Ensure that your theoretical maximum memory demand (for all planned parallel processes) remains below the memory allocation of your Jenkins instance.
- [ ] Verify that every PHP job you run consumes less memory than your specified PHP memory limit. No “PHP Fatal error: Out of memory” errors should occur.
- [ ] Ensure that no jobs are configured with a non-default memory limit or without any memory limit at all in jenkins.php (e.g., php -d memory_limit=-1 vendor/bin/console ...).
- [ ] Avoid spawning an excessive number of workers (not more than 2 per queue).
- [ ] Profile your jobs locally to understand their normal memory demand, especially when interacting with data.
- [ ] In a standard-sized non-production environment, run lengthy imports and sync processes lasting more than 1-2 hours.
- [ ] Refer to troubleshooting instructions for further assistance.
- [ ] Be prepared to lose manually created jobs; ensure that all critical jobs are persisted in your project (jenkins.php).

## Theoretical max memory demand and memory constraints
In Spryker, Jenkins plays a central role in executing jobs for your application. These jobs can be CLI commands, such as `vendor/bin/console queue:worker:start`. On Spryker PaaS, unlike as in local developer environments, these commands are currently not executed in a separate CLI container but run inside the Jenkins Docker container. This is a significant difference that can cause issues related to memory constraints. Let us explore:
On your local development machine, you might have noticed that the CLI container, by default, will consume as much RAM as it requires until your machine can no longer provide more. While this behavior is convenient, it unfortunately conceals potential issues related to memory consumption in your jobs. This can lead to Jenkins instability when your application is deployed on Spryker PaaS. When deployed on Spryker PaaS, your jobs must “fit” within several memory constraints as explained in more detail in this [article](https://docs.spryker.com/docs/ca/dev/best-practices/best-practises-jenkins-stability.html).

![Memory Constraints](https://s3.console.aws.amazon.com/s3/buckets/spryker?region=eu-central-1&bucketType=general&prefix=docs/scos/dev/tutorials-and-howtos/howtos/jenkins-stability-checklist/)

n a nutshell: In the above diagram, we want to showcase the different memory constraints you will need to pay attention to to maximise Jenkins stability.

It is important to understand that each Jenkins executor can run one PHP job (that can potentially spawn multiple PHP threads (child processes) -  each capable of consuming RAM up to memory_limit). 
Especially the `vendor/bin/console queue:worker:start` CLI command is often configured to have multiple “workers” (or threads). OOTB it is often the most RAM-intensive job, so we will use it as an example going forward:

It is crucial that the combined theoretical max memory consumption, which can be estimated by using the formula below, is below the total RAM supply of the Jenkins Container. OOTB, the Jenkins container is configured in a way to make the best use of the total memory supply of its host. You can calculate the Jenkins Container’s available RAM, by deducting 750MB from the Jenkins memory allocation of your infrastructure package listed in our Service Description. 
Note: We have swap enabled in most environments in an effort to  help with instability introduced by excessive memory demand. While this should theoretically help reducing the impact of memory spikes, it has significant impact on performance. To avoid swapping, keep your theoretic RAM demand within the aforementioned constraints

Formula to estimate your max theoretical RAM demand:
Number of Executors x (Max Workers and Threads spawned by heaviest Job * memory_limit) = Theoretical max RAM Demand

As you can see by the multiplicative nature of the threads and executors, you can easily reach a surprisingly high theoretical max RAM demand. Of course, you will need to be very unlucky to actually consume this amount - you would need to be in a situation where you have multiple your heaviest jobs run in parallel and consume up to memory_limit at the same time), but calculating it is a good exercise as keeping your theoretical max RAM Demand below the memory supply will increase stability tremendously as it virtually eliminates the risk of Jenkins crashing due to exhausting its memory supply. This today is the single most common root cause for Jenkins service degradations and outages.

### To Dos
- [ ] My theoretical max memory demand is below the Memory allocation of my Jenkins Instance
- [ ] Every PHP Job I am running consumes less than my specified PHP memory limit.
- [ ] I have configured my php memory_limit to be less than 2GB
- [ ] I have configured a maximum of 2 executors

Additional Info: If you are running multiple stores, you might notice that jobs “pile up” with only 2 executors configured. This is because adding stores usually duplicates all jobs. While most jobs are executed quickly and Jenkins cycles through these jobs quickly enough, the queue:worker:start jobs might take longer and can lead to some shops not propagating messages in a timely manner. To work around this circumstance, we have published this article, that helps you process all queues by just using a [single executor slot](https://docs.spryker.com/docs/dg/dev/backend-development/cronjobs/optimizing-jenkins-execution.html).

## Realistic memory demand and performance considerations
While calculating the theoretical max memory demand of your application is a great way to understand your risk for Jenkins instability, examining your real memory demand and job performance will help you understand performance bottlenecks better. XDebug Profiling is a fantastic tool to help you understand what takes how much time, and what is causing CPU and Memory load. Profiling your most demanding jobs is a must and luckily also very easy. This [article](https://docs.spryker.com/docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/set-up-xdebug-profiling.html) explains all the steps you need to do to be able to quickly and effectively look into the jobs you are running.

### Queue workers
We have discussed executors in the context of memory demand, but it's also important to understand the impact of executors and the jobs we are running with them on the CPU. It is a philosophical debate on how many executors Jenkins should have per CPU core and while with Spryker memory constraints are far more “important” than CPU constraints, we need to pay attention to configuring our application and environment in a way that will not lead to threads [waiting](https://docs.spryker.com/docs/ca/dev/best-practices/best-practises-jenkins-stability.html#creating-jobs-in-jenkins-dashboard) for CPU cycles. Spryker configures Jenkins instances in a way that it can use all the CPU power the host has to give. While this is good for performance, it can lead to accidental overload: We mostly see this in projects where queue:worker:start is configured with too many workers and several executors are configured that run several queue:worker:start processes for different stores in parallel. Let’s assume that this is possible from a memory constraint perspective (it most often is not and you will see memory constraint issues before you see CPU issues): What now happens is, that all these jobs executed by an executor begin to spawn multiple worker threads that all compete for cycles of the 2 vCore host (in standard configuration). This can lead to a tremendous slowdown of the host, which is kept at 100% CPU load up to a point where it becomes unstable.

Below you can find where you are able to configure the queue worker count:

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
Import jobs, but also Publish and Sync related processes can be taxing on the database. Please make sure that you are running profiling with a realistic dataload. You can take a database dump from your PaaS environments, or use AI to generate test data in a realistic quantity.

### Imports and Publish and Synchronize
Imports and some Publish and Sync processes can lead to high compute cost (f.e. Permutation calculations for filters). Its therefore mission critical to implement [RAM aware batch processing](https://docs.spryker.com/docs/dg/dev/integrate-and-configure/integrate-elastic-computing.html#integrate-ram-aware-batch-processing) and implement [queue chunk sizes](https://docs.spryker.com/docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#chunk-size) that are appropriate for the complexity of your data. The former helps to avoid loading all import data into RAM while the latter helps to avoid RabbitMQ pipe timeouts due to lengthy processing times. A chunk/batch size too large will lead to memory related exceptions, or messages stuck in queues (with logs showing RabbitMQ broken pipe exceptions), while a chunk/batch size too small will lead to subpar import and P&S performance. There is not one size fits all, but with profiling you will be able to find a good balance between stability and performance.
During the process of dialling in your chunk size, you might find the following articles helpful:
- [Messages are moved to error queues](https://docs.spryker.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-moved-to-error-queues.html)
- [Messages are stuck in UNACK state](https://docs.spryker.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-in-the-unacked-state.html)
- [Message are stuck without error notification](https://docs.spryker.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-without-error-notifications.html)

A great general advise is to [split up publishing queues](https://docs.spryker.com/docs/dg/dev/integrate-and-configure/integrate-multi-queue-publish-structure.html#set-up-a-publish-queue-for-a-publisher-plugin) for better performance and fine grained control. You will notice that you will varying memory and CPU demand for different messages in your queues and by splitting up the queues to accommodate your various events, you will be able to set appropriate chunk sizes for each of them. 

### CPU credits
Standard-sized non production environments are not designed to work with long and high load. Most infrastructure components in this package size are working with a burst configuration. This setup allows for higher performance for limited periods of time. If such environments are loaded for an extended period of time, the components will eventually run out of “burst credits” and will throttle until the load subsides and the credits can recover over time. When an instance is throttled, its CPU performance is capped at 20%. This generally means that the instance will not or not in time, be able to complete standard tasks. Here are some of its most common symptoms:
- You will experience issues related to Deploy_Scheduler pipeline steps, as the instance simply does not have the processing capacity to complete deployment related steps. 
- You might also experience a sharp incline in job execution durations in your APM, or RabbitMQ broken pipe exceptions. 
- Jenkins UI can be sluggish to respond.
Here, stopping heavy jobs for 2-3 hours will often allow CPU credits to be recovered so that this step can pass. 
If you are regularly running into the aforementioned issues or simply need to run sustained high load on your non production systems, please discuss upgrading your environment with your Account Manager. All packages above standard generally run with instance types that do not require credits for CPU performance. 

### ToDos
- [ ] I am not spawning an excess amount of workers (not more than 2 per queue)
- [ ] I have profiled my jobs locally and know their normal memory demand with the data it is expected to interact with
- [ ] When on a Standard sized non production environment: I am running lengthy imports and sync processes with a duration of more than 1-2hs
- [ ] I have implemented batch processing in my importers and know what the maximum memory consumption of my importer is
- [ ] I have configured in the chunk size of the queues i am working so that they are compatible with the memory constraint of my environment

## Jenkins job configuration
With all the prep work down listed above, you should already see a significant improvement in Jenkins stability. To further improve the resilience of your setup, we gathered the following general recommendations for you.
When the Jenkins host crashes and needs to be re-provisioned, it is likely that all manually created jobs are lost. This is why we are recommending to persist important jobs in [code](https://docs.spryker.com/docs/dg/dev/backend-development/cronjobs/cronjobs.html#using-cronjob-schedulers), so that when vendor/bin/console scheduler:setup is run during recovery, all your important jobs are installed back.
- [ ] I am OK with losing my manually created jobs and have all important jobs persisted in my project

---
title: "Best practices: Jenkins stability"
description: Follow best practices for Jenkins in Spryker Cloud Commerce OS, focusing on stable configurations, efficient resource usage, and optimized build performance.
template: best-practices-guide-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/best-practices/best-practises-jenkins-stability.html
last_updated: Jun 10, 2023
---

Jenkins fulfills the role of a scheduler in the Spryker applications. It is used to run repetitive console commands and jobs. In Spryker Cloud Commerce OS, the Jenkins instance runs the commands configured directly in its container. This means that, when you run a command like the following one, it's executed within the Jenkins container, utilizing its resources:

```bash
/vendor/bin/console queue:worker:start
```

Unlike in cloud, in a local environment, these commands are executed by a CLI container. This difference leads to some side effects where the same code and actions work fine in the local development environment but fail when deployed to cloud.

## Memory management

One of the most common issues encountered with Jenkins is excessive memory usage. In a local development environment, Docker containers are usually set up to use as much RAM as they need as long as they stay within the RAM limit configured in Docker. This limit often corresponds to the total RAM available on the machine. However, when deployed to cloud, the Jenkins container is deployed to its own dedicated server, which limits the available RAM based on the server's configuration. Non-production environments have different RAM configuration tiers, which can be found in our Service Description. Standard environments typically have 2 GB of RAM assigned to Jenkins. This means that the server running Jenkins has a total of 2 GB of RAM.

Considering some overhead for the operating system, Docker, and Jenkins itself, around 1-1.5 GB of memory is usually available for PHP code execution. This shared memory needs to accommodate all console commands run on Jenkins. Therefore, if you set `php memory_limit` to 1 GB and have a job that requires 1 GB at any given time, no other job can run in parallel without risking a memory constraint and potential job failures. The `php memory_limit` does not control the total memory consumption by any PHP process but limits the amount each individual process can take.

We recommend profiling your application to understand how much RAM your Jenkins jobs require. A good way to do this is by utilizing XDebug Profiling in your local development environment. Jobs that may have unexpected memory demands are the `queue:worker:start` commands. These commands are responsible for spawning the `queue:task:start` commands, which consume messages from RabbitMQ. Depending on the complexity and configured chunk size of these messages, these jobs can easily consume multiple GBs of RAM.

## Jenkins executors configuration

Jenkins executors let you orchestrate Jenkins jobs and introduce parallel processing. By default, Jenkins instances have two executors configured, similar to local environment setups. You can adjust the executor count and run many console commands in parallel. While this may speed up processing in your application, it increases the importance of understanding the memory utilization profile of your application. For stable job execution, you need to ensure that no parallelized jobs collectively consume more memory than the amount available to the Jenkins container. Also, it's a common practice to set the number of executors equal to the number of CPUs available to Jenkins. Standard environments are equipped with two vCPUs. Configuring more than the standard two executors risks jobs "fighting" for CPU cycles. This severely limits the performance of all jobs running in parallel and potentially introduces instability to the container itself.

We recommend sticking to the default executor count or the concurrent job limit recommended in the Spryker Service Description for your package. This ensures the stability of Jenkins and prevents instability and crashes.

If it seems like your project needs more executors because of your job or store count, consider configuring all stores's sync jobs to be processed by one executor. For instructions, see [Reduce Jenkins execution without P&S and data importers refactoring](/docs/dg/dev/backend-development/cronjobs/reduce-jenkins-execution-costs-without-p&s-and-data-importers-refactoring.html).

## Queue worker configuration

When configuring multiple queue workers per queue, consider [Memory management](#memory-management) and [Jenkins executors configuration](#jenkins-executors-configuration). Each configured queue worker can consume up to PHP's max_memory, causing a significant increase in total memory demand as they are spawned. Another crucial factor to take into consideration is CPU utilization. If you configure more workers than the number of available cores, it becomes increasingly likely that processes will need to wait for CPU resources. This can  lead to suboptimal performance and stability issues. We recommend avoiding resource contention of this nature by aligning the number of workers with your environment package. Our service description specifies the number of CPU cores available in each package.

## Creating jobs in Jenkins dashboard

While you can create jobs in Jenkins dashboard to quickly run console commands, remember that these jobs are removed when the Jenkins instance is reprovisioned. Jenkins can be reprovisioned during self-healing, recovering from an exception of the underlying instance or container, or during a pipeline execution. For instructions on setting up a job that doesn't get removed, see [Using cronjob schedulers](/docs/dg/dev/backend-development/cronjobs/cronjobs.html#using-cronjob-schedulers).

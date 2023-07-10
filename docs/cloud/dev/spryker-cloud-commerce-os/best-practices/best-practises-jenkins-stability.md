---
 title: "Best practises: Jenkins stability"
 description: Improve the stability of the scheduler component.
 template: best-practices-guide-template
 last_updated: Jun 10, 2023
---

Jenkins fulfills the role of a scheduler in the Spryker Application. It is used to run console commands and jobs on a regular basis. In the PaaS setup, the Jenkins instance currently runs the commands configured directly in its container. This means that when you run a command like the following one, it's executed within the Jenkins container, utilizing its resources:

```bash
/vendor/bin/console queue:worker:start
```

This is different from how Jenkins works in a local development environment, where these commands are executed by a CLI container. This difference leads to some side effects that developers should be aware of because it can cause situations where the same code and actions work fine in the local development environment but fail when deployed to the PaaS environment.

## Memory management

One of the most common issues encountered with Jenkins is excessive memory usage. In a local development environment, Docker containers are usually set up to use as much RAM as they need as long as they stay within the RAM limit configured in Docker. This limit often corresponds to the total RAM available on the developer's machine. However, when deployed on PaaS, the Jenkins container is deployed to its own dedicated server, which limits the available RAM based on the server's configuration. Non-production environments have different RAM configuration tiers, which can be found in our Service Description. Standard environments typically assign 2%nbspGB of RAM to Jenkins. This means that the server running Jenkins has a total of 2%nbspGB of RAM. Considering some overhead for the operating system, Docker, and Jenkins itself, around 1-1.5%nbspGB of memory is usually available for PHP code execution. This shared memory needs to accommodate all console commands run on Jenkins. Therefore, if you configure a `php memory_limit` of 1%nbspGB and have a job that requires 1%nbspGB at any given time, no other job can run in parallel without risking a memory constraint and potential job failures. The `php memory_limit` does not control the total memory consumption by any PHP process but rather limits the amount each individual process can take.

We recommend profiling your application to understand how much RAM your Jenkins Jobs require. A good way to do this is by utilizing XDebug Profiling in your local development environment. Jobs that may have unexpected memory demands are the `queue:worker:start` commands. These commands are responsible for spawning the `queue:task:start` commands, which consume messages from RabbitMQ. Depending on the complexity and configured chunk size of these messages, these jobs can easily consume multiple GB of RAM.

## Jenkins executors configuration

Jenkins executors provide lest you orchestrate Jenkins jobs and introduce parallel processing. By default, Jenkins instances have two executors configured, similar to local environment setups. You can currently adjust the executor count freely and run many console commands in parallel. While this may speed up processing in your application, it increases the importance of understanding the memory utilization profile of your application, as previously explained. For stable job execution, you need to ensure that no parallelized jobs collectively consume more memory than what is available to the Jenkins container. There is another consideration to make when configuring Jenkins executors. It is common practice to set the number of executors to the count of CPUs available to Jenkins. Standard environments are equipped with two vCPUs, which means that configuring more than the standard two executors risks jobs "fighting" for CPU cycles. This severely limits the performance of all jobs run in parallel and potentially introduces instability to the container itself.

We recommend sticking to the default executor count or the concurrent job limit recommended in the Spryker Service Description for your package. This will help ensure the stability of Jenkins, as configuring more Jenkins Executors is the most common cause of Jenkins instability and crashes.

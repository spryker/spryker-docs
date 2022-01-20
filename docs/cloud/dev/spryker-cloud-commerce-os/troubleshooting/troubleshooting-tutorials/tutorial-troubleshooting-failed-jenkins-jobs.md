---
title: Tutorial — Troubleshooting jenkins jobs
description: Learn how to troubleshoot jenkins jobs issues
template: troubleshooting-guide-template
---

A Jenkins jobs failed.

## Checking Jenkins job console output

To analyze the console output of a failed Jenkins job, do the following:

1. In the Jenkins dashboard, select the name of the failed job.
  This takes you to the page of the job.
![jenkins_dashboard]

2. In the *Build History* section, select the latest failed build > **Console Output**.

![jenkins_failed_job_menu]

3. In the *Console Output*, search the logo for an error.

![jenkins_console_output]


## Checking RabbitMQ status

If the console output contains `AMQPProtocolChannelException`, the issue might be related to RabbitMQ virtual host or queue.

Error messages examples:

```text
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPProtocolChannelException - NOT_FOUND no queue 'sync.storage.content' in vhost 'de_queue'
```
```text
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPConnectionClosedException - NOT_ALLOWED - vhost at_queue not found
```

In this case, check RabbitMQ status as follows:

{% include checking-rabbitmq-status.md %} <!-- To edit, see /_includes/checking-rabbitmq-status.md -->

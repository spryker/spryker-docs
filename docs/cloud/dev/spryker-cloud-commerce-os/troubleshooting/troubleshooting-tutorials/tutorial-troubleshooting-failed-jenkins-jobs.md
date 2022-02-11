---
title: Tutorial — Troubleshooting failed Jenkins jobs
description: Learn how to troubleshoot Jenkins jobs issues
template: troubleshooting-guide-template
---

A Jenkins job failed.

## 1. Check the console output of the failed Jenkins job

1. In the Jenkins dashboard, select the name of the failed job.

![jenkins_dashboard]

  This takes you to the page of the job.


2. In the **Build History** section, select the latest failed build number&nbsp;<span aria-label="and then">></span> **Console Output**.

![jenkins_failed_job_menu]

3. In the **Console Output**, search the log for errors.

![jenkins_console_output]

If the log contains `AMQPProtocolChannelException`, the issue can be related to RabbitMQ virtual host or queue.

Error messages examples:

```text
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPProtocolChannelException - NOT_FOUND no queue 'sync.storage.content' in vhost 'de_queue'
```
```text
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPConnectionClosedException - NOT_ALLOWED - vhost at_queue not found
```


In this case, [Check RabbitMQ status](#check-rabbit-mq-status).


## 2. Check RabbitMQ status

{% include checking-rabbitmq-status.md %} <!-- To edit, see /_includes/checking-rabbitmq-status.md -->

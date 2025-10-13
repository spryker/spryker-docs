---
title: Tutorial — Troubleshooting failed Jenkins jobs
description: Troubleshoot failed Jenkins jobs in Spryker by checking console output, RabbitMQ status, and queue errors to resolve issues impacting job execution.
template: troubleshooting-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-failed-jenkins-jobs.html
---

A Jenkins job failed.

## 1. Check the console output of the failed Jenkins job

1. In the Jenkins dashboard, select the name of the failed job.

![jenkins_dashboard](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-failed-jenkins-jobs.md/jenkins_dashboard.png)

  This takes you to the page of the job.


2. In the **Build History** section, select the latest failed build number&nbsp;<span aria-label="and then">></span> **Console Output**.

![jenkins_failed_job_menu](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-failed-jenkins-jobs.md/jenkins_failed_job_menu.png)

3. In the **Console Output**, search the log for errors.

![jenkins_console_output](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-failed-jenkins-jobs.md/jenkins_console_output.png)

If the log contains `AMQPProtocolChannelException`, the issue can be related to RabbitMQ virtual host or queue.

Error message examples:

```text
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPProtocolChannelException - NOT_FOUND no queue 'sync.storage.content' in vhost 'de_queue'
```

```text
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPConnectionClosedException - NOT_ALLOWED - vhost at_queue not found
```


In this case, [Check RabbitMQ status](#check-rabbitmq-status).


## 2. Check RabbitMQ status

To check RabbitMQ status, do the following.

{% include checking-rabbitmq-status.md %} <!-- To edit, see /_includes/checking-rabbitmq-status.md -->

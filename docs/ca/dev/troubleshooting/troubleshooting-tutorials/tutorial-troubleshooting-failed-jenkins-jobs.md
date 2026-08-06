---
title: Tutorial — Troubleshooting failed Jenkins jobs
description: Troubleshoot failed Jenkins jobs in Spryker by checking console output, RabbitMQ status, and queue errors to resolve issues impacting job execution.
template: troubleshooting-guide-template
last_updated: Aug 6, 2026
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

### Check RabbitMQ connection details

To connect to the RabbitMQ Management interface, you need to check the following details:
- `SPRYKER_BROKER_API_USERNAME`
- `SPRYKER_BROKER_API_PASSWORD`
- `SPRYKER_BROKER_API_HOST`
- `SPRYKER_BROKER_API_PORT`

Check the details as follows:
{% include checking-a-service-connection-configuration.md %} <!-- To edit, see /_includes/checking-a-service-connection-configuration.md -->



### Check RabbitMQ node status and errors

1. Using the login details you've checked in the [Check RabbitMQ connection details](#check-rabbitmq-connection-details), log into the RabbitMQ Management interface at `http://rabbitmq.{ENVIRONMENT_NAME}.{SPRYKER_BROKER_API_HOST}:{SPRYKER_BROKER_API_PORT}`
2. In the *Nodes* section of the **Overview** tab, check the node status. If all the columns are green, the node is working properly.

![status-of-nodes](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-rabbitmq-status.md/status-of-nodes.png)

3. Switch to the **Queues** tab.
4. Check the *State* of queues.
5. Check if there are messages in the queues postfixed with `error`. For example, `publish.error`.

![rabbitmq-queue-messages](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-rabbitmq-status.md/rabbitmq-queue-messages.png)

6. If the error count is above zero for an error queue, check the errors as follows:
    a. Select the queue with the error.
    b. On the page of the queue, select **Get messages** > **Get Messages**.

![rabbitmq-get-messages](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-rabbitmq-status.md/rabbitmq-queue-messages.png)

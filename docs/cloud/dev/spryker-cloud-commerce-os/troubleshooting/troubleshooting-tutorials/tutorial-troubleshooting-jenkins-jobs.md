---
title: Tutorial — Troubleshooting jenkins jobs
description: Learn how to troubleshoot jenkins jobs issues
template: troubleshooting-guide-template
---
Jenkins jobs failed

## Checking jenkins job console output

1. Open jenkins dashboard

![jenkins_dashboard]

2. Click on the failed job name
3. Open the failed job menu and click on "Console output"

![jenkins_failed_job_menu]

4. Search for an error in the job output log

![jenkins_console_output]


##  One of the reasons for failed jobs could be a RabbitMQ virtual host or queue issue.

If you have found "**AMQPProtocolChannelException**" exception it means that you have an issue with RabbitMQ

Error messages examples: 

```
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPProtocolChannelException - NOT_FOUND no queue 'sync.storage.content' in vhost 'de_queue'
```
```
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPConnectionClosedException - NOT_ALLOWED - vhost at_queue not found
```

in this case you need to check RabbitMQ status

{% include checking-rabbitmq-status.md %} <!-- To edit, see /_includes/checking-rabbitmq-status.md -->

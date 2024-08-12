---
title: RabbitMQ- Zed.CRITICAL- PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed
description: Learn how to fix the issue when events are not consumed or are consumed slowly.
last_updated: May 3, 2023
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/rabbitmq-zedcritical-phpamqplibexceptionamqpchannelclosedexception-channel-connection-is-closed
originalArticleId: 39daf8b8-9e73-4c76-a6ee-372d3e5bbca6
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbitmq-zed.critical-phpamqplib-exception-amqpchannelclosedexception-channel-connection-is-closed.html
---

## Description

Events are not consumed or are consumed much slower than normal. In RabbitMQ exception.log, the following exception can be found (often also with Broken Pipe reference):

```php
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed.
```

## Cause

There are several potential reasons for this error. The most common cause is that during P&S chunks take too much time to be processed and RabbitMQ is closing its TCP connection as it anticipates either a timeout or no further connection to happen.

## Solution

It is best to profile the job where you are experiencing this error to understand what exactly makes processing the chunks expensive. Temporary mitigation of the issue might be possible as explained below:

**Adjusting CHUNK_SIZE**

Using smaller chunk sizes might help to alleviate the issue because it reduces the time until a chunk is fully processed. If you are running a standard publishing setup, you can adjust the following value in `config_default.php`.

```php
$config[EventConstants::EVENT_CHUNK] = 200;
```

---
title: Exception connecting to Redis
description: Learn how to fix the issue with exception connecting to Redis
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/exception-connecting-to-redis
originalArticleId: dbd20933-512c-4966-955c-d2d235821c78
redirect_from:
  - /2021080/docs/exception-connecting-to-redis
  - /2021080/docs/en/exception-connecting-to-redis
  - /docs/exception-connecting-to-redis
  - /docs/en/exception-connecting-to-redis
  - /v6/docs/exception-connecting-to-redis
  - /v6/docs/en/exception-connecting-to-redis
related:
  - title: My Elasticsearch dies
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/my-elasticsearch-dies.html
  - title: Peer authentication failed for user postgres
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/peer-authentication-failed-for-user-postgres.html
  - title: Setup MySQL Workbench to avoid port clashing with the host system
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system.html
---

## Description

You can get the following exception from Redis:

```php
Exception: stream_socket_client(): unable to connect to tcp://......:10009 (Connection refused)
```

## Cause

This exception means that Redis encountered a corrupted AOF file. The following error will also be logged in Redis logs located in the following folder: `/data/logs/development/redis`:

```
Bad file format reading the append only file: make a backup of your AOF file, then use ./redis-check-aof --fix [filename];
```

## Solution

To fix the exception:

1. Run

   ```bash
   sudo redis-check-aof --fix /data/shop/development/shared/redis/appendonly.aof
   ```

   You should get:

   ```bash
   Successfully truncated AOF
   ```

2. Start Redis server

   ```bash
   sudo service redis-server-development start
   ```

3. Make sure Redis can write log files under: `/data/logs/development/redis/`

   ```bash
   sudo chown redis:redis /data/logs/development/redis/ -R
   ```

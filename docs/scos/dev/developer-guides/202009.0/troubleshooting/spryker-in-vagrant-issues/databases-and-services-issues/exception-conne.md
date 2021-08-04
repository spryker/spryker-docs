---
title: Exception connecting to Redis
originalLink: https://documentation.spryker.com/v6/docs/exception-connecting-to-redis
redirect_from:
  - /v6/docs/exception-connecting-to-redis
  - /v6/docs/en/exception-connecting-to-redis
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


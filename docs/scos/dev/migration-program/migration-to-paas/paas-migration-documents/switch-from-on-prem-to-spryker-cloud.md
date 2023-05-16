---
title: Switch from on prem to Spryker Cloud
description: This document describes how to switch from on prem to Spryker Cloud.
template: howto-guide-template
---

# Switch from on prem to Spryker Cloud

{% info_block infoBox %}

Resources: Backend, DevOps

{% endinfo_block %}

## [Optional] Production switch dry run

Dry run could be performed in order to see unpredictable bottlenecks and get an idea of how long will it take to do
the exact transition and get an idea of downtime.

1. [Execute DB migration](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-existing-db-driver-to-mariadb.html).
2. [Execute ES and Redis restoration](docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/restore-elasticsearch-and-redis.html).
3. Ensure RabbitMQ doesn't have error queues filled with messages.
4. Wait until all messages are successfully consumed and the shop is usable.
5. Run smoke tests, place testing orders and check critical parts of the shop.
6. Re-run destructive deployment before the real switch.

## Production switch WITH downtime

1. Turn on the maintenance page for the existing shop.
2. Ensure that RabbitMQ doesn’t have anything in the queues that won’t be migrated.
3. Stop all background operations:
    * import;
    * export;
    * Jenkins jobs;
    * anything else that is similar in the sense.
4. [Execute DB migration](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-existing-db-driver-to-mariadb.html).
5. [Execute ES and Redis restoration](docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/restore-elasticsearch-and-redis.html).
6. Ensure RabbitMQ doesn’t have error queues filled with messages.
7. Wait until all messages are successfully consumed and the shop is usable.
8. Run smoke tests, place testing orders and check critical parts of the shop.
9. Switch DNS to point to the AWS environment (depends on customer DNS setup and who owns DNS domains)

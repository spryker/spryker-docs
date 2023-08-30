---
title: Switch from on prem to Spryker Cloud
description: This document describes how to switch from on prem to Spryker Cloud.
template: howto-guide-template
---


## Resources for migration

*Backend
* DevOps

## Optional: Dry run the production migration

To check for unpredictable bottlenecks and get an idea of how long it takes to transition and get an idea of downtime, you can dry run the transition as follows:

1. [Execute the DB migration](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-existing-db-driver-to-mariadb.html).
2. [Execute the restoration of  ES and Redis](docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/restore-elasticsearch-and-redis.html).
3. Make sure RabbitMQ doesn't have error queues filled with messages.
    Wait until all messages are successfully consumed and the shop is usable.
5. Run smoke tests, place testing orders and check critical parts of the shop.
6. Run the destructive deployment before doing the final migration.

## Production switch WITH downtime

1. Turn on the maintenance page for the existing shop.
2. Ensure that RabbitMQ doesn’t have anything in the queues.
3. Stop all background operations, like the following:
    * import
    * export
    * Jenkins jobs
4. [Execute DB migration](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-existing-db-driver-to-mariadb.html).
5. [Execute ES and Redis restoration](docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/restore-elasticsearch-and-redis.html).
6. Make sure RabbitMQ doesn’t have error queues filled with messages.
    Wait until all messages are successfully consumed and the shop is usable.
8. Run smoke tests, place testing orders and check critical parts of the shop.
9. Depending on who owns the DNS zone, ask the customer or point the DNS to the AWS environment.

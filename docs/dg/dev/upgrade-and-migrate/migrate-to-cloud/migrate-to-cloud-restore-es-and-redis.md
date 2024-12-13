---
title: 'Migrate to cloud: Restore Elasticsearch and Redis'
description:  Learn how to migrate to Spryker Cloud Commerce OS and restore Elasticsearch and Redis within your Spryker based project.
template: howto-guide-template
redirect_from:
- /docs/scos/dev/migration-concepts/migrate-to-sccos/step-7-restore-es-and-redis.html
last_updated: Dec 6, 2023

---
After you have [defined the environment variables](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud-define-environment-variables.html), you must restore Elasticsearch and Redis.

Restoring Redis and Elasticsearch on a newly deployed infrastructure can be approached in two ways. These approaches involve using the `sync:data` and `publish:trigger-events` commands.
We recommend using `sync:data`, because it directly synchronizes the database with Elasticsearch and Redis without additional steps. However, if there are memory issues or any other complications with `sync:data`, you can use the alternative `publish:trigger-events` command. Keep in mind, though, that this command does extra work while republishing data in `_storage` and `_search` tables.

## The sync:data command

There is a default `vendor/bin/console sync:data` command in Spryker that lets you repopulate Elasticsearch and Redis with the aggregated data from the database. This command must be executed during the migration process to restore Elasticsearch and Redis data on a new Spryker Production environment.

Considering this fact, ensure that the `sync:data` command can restore your Elasticsearch and Redis from scratch in a consistent and resilient way. This especially applies to custom `*Storage` and `*Search` modules, as they should have synchronization plugins implemented and enabled.

Due to the large data size, sometimes the command can't process all the records and fails. In this case, it can be executed per resource as follows:

```bash
console sync:data url
console sync:data product_concrete  
...
```

## The publish:trigger-events command

An alternative method for accomplishing this restoration is by using the `vendor/bin/console publish:trigger-events` command. This command republishes the aggregated data in the database for tables with names ending with `_search` and `_storage`. Additionally, it synchronizes this data with Elasticsearch and Redis. To ensure robustness, ensure that similar validation processes are conducted for `publish:trigger-events` as those performed for `sync:data`.

## Next step

[Adapt the file system-based features](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud-adapt-the-filesystem-based-features.html)

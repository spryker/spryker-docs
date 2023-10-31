---
title: 'Step 7: Elasticsearch and Redis restoration capabilities'
description: 
template: howto-guide-template
---

## sync:data

There is a default `vendor/bin/console sync:data` command in Spryker that gives an opportunity to repopulate Elasticsearch and Redis with the aggregated data from database. This command has to be executed during the migration process to restore Elasticsearch and Redis data on new Spryker Production environment.

Considering this fact it is important to ensure that the `sync:data` command is capable to restore your Elasticsearch and Redis from scratch in consistent and resilient way. Especially it's related to customer `*Storage` and `*Search` modules, they should have synchronization plugins implemented and enabled.

Due to the big size of the data sometimes the command can not process all the records and fails. In this case,
it can be executed per resource:
```bash
console sync:data url
console sync:data product_concrete  
...
```

## publish:trigger-events

An alternative method for accomplishing this restoration is by using the `vendor/bin/console publish:trigger-events` command. This command is responsible for republishing aggregated data in the database for tables with names ending in `_search` and `_storage`. Additionally, it synchronizes this data with Elasticsearch and Redis. Similar validation processes to those applied for `sync:data` must be carried out for `publish:trigger-events` to ensure robustness. 

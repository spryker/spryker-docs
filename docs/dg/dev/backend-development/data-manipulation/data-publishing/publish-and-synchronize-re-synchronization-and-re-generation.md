---
title: "Publish and synchronize: Re-synchronization and re-generation"
description: Learn how to publish and synchronize repeated exports in Spryker. Optimize backend data handling for consistent and efficient data publishing.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronize-repeated-export
originalArticleId: f1d13f30-7763-4804-8674-e87edf95653f
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
  - /docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export
related:
  - title: Publish and Synchronization
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html
  - title: Implement Publish and Synchronization
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html
  - title: Handle data with Publish and Synchronization
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html
  - title: Adding publish events
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/add-publish-events.html
  - title: Implement event trigger publisher plugins
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-event-trigger-publisher-plugins.html
  - title: Implement synchronization plugins
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-synchronization-plugins.html
  - title: Debug listeners
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/debug-listeners.html
  - title: Publish and synchronize and multi-store shop systems
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
  - title: Synchronization behavior - enabling multiple mappings
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/configurartion/mapping-configuration.html
---

The automatic execution of the Publish and Synchronize (P&S) process may not always address all of your use cases. In certain situations, you might need to manually re-synchronize or regenerate published data to ensure the correct information is available in Redis and Elasticsearch.

For example:

- You may want to refresh Redis and Elasticsearch with updated data for your shop frontend.

- You may need to regenerate published data to correct issues after an import, ensuring the Storage and Search modules reflect the latest changes.

You can perform these actions manually using the provided console commands.

## Re-synchronize data

Re-synchronization is useful when Redis or Elasticsearch data is lost (e.g., due to a flush operation). This command re-exports data from the Storage and Search tables into Redis and Elasticsearch.

Command:



vendor/bin/console sync:data
This command performs the following steps:

1. Reads aggregated data from the database tables used by Storage and Search modules.

2. Sends the data to RabbitMQ queues.

3. Proceed RabbitMQ and sync to Redis and Elasticsearch.

To synchronize a specific entity, include the resource name:



```bash
vendor/bin/console sync:data {resource_name}
```

Example:

```bash
vendor/bin/console sync:data cms_block
```

To enable synchronization for a specific resource, a corresponding sync plugin must be implemented.
 See Implement synchronization plugins | Spryker Documentation  for details.

## Regenerate published data

Regenerating data is helpful when you need to completely rebuild published content. For example, after a failed import or data corruption, you may want to overwrite the Storage and Search tables. Updates on Redis and Elasticsearch depend on *storage and *_search entity; if it was changed, data will be synced. If you need to sync all data, use `vendor/bin/console sync:data`.

Command:


```bash
vendor/bin/console publish:trigger-events
```

This command performs the following steps:

Re-generates data in the Storage and Search tables.

Updates records in Redis and Elasticsearch if the entity was changed.

To target a specific resource (entity), use the -r option:


```bash
vendor/bin/console publish:trigger-events -r {resource_name}
```

You can also specify one or more entity IDs using the -i option:


```bash
vendor/bin/console publish:trigger-events -r {resource_name} -i {ids}
```

Example:


```bash
vendor/bin/console publish:trigger-events -r availability -i 1,2
```

A publisher plugin must be implemented for each resource you want to re-publish.
See Implement synchronization plugins | Spryker Documentation  for details.
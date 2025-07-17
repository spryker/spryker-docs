---
title: Publish and synchronize repeated export
description: Learn how to publish and synchronize repeated exports in Spryker. Optimize backend data handling for consistent and efficient data publishing.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronize-repeated-export
originalArticleId: f1d13f30-7763-4804-8674-e87edf95653f
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
related:
  - title: Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html
  - title: Implement Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html
  - title: Handle data with Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html
  - title: Adding publish events
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/add-publish-events.html
  - title: Implement event trigger publisher plugins
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-event-trigger-publisher-plugins.html
  - title: Implement synchronization plugins
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-synchronization-plugins.html
  - title: Debug listeners
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/debug-listeners.html
  - title: Publish and synchronize and multi-store shop systems
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
  - title: Synchronization behavior - enabling multiple mappings
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/synchronization-behavior-enabling-multiple-mappings.html
---

Automatic execution of the [Publish & Synchronize process](/docs/dg/dev/backend-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html) does not always resolve all your tasks. For example, you might want to re-synchronize(re-sync) the published data in the key-value store (Redis or Valkey) and Elasticsearch to display updated information in your shop front end. Or you might want to regenerate the published data and re-write the data of the database tables in the `Storage` and `Search` modules with the subsequent update of key-value store (Redis or Valkey) and Elasticsearch records. This can be done manually by running console commands.

## Data re-synchronization


In some cases, you might want to re-export data into key-value store (Redis or Valkey) and Elasticsearch. For example, if Redis has been flushed and the data in the key-value store (Redis or Valkey) and/or Elasticsearch is lost.

Reexport data:

```bash
vendor/bin/console sync:data
```

This command does the following:
1. Reads the aggregated data from the database tables of `Storage` and `Search` modules.
2. Sends the data to the RabbitMQ queues.
3. Copies the data from the RabbitMQ queues to the key-value store (Redis or Valkey) and Elasticsearch.

You can specify particular `Storage` and `Search` tables by specifying entity names as follows:

```bash
vendor/bin/console sync:data {resource_name}
```

For example, the command to re-sync data for `CMS Block` looks as follows:

```bash
vendor/bin/console sync:data cms_block
```

To trigger data re-sync for a resource, there must be a corresponding sync plugin created for this resource. To learn how to create it, see [Implement synchronization plugins](/docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-synchronization-plugins.html)

## Published data re-generation


You can regenerate published data from scratch. For example, something went wrong during a product import and you want to re-publish the data. In other words, you need to update `Storage` and `Search` tables and sync the data in the key-value store (Redis or Valkey) and Elasticsearch.

Regenerate published data:

```bash
vendor/bin/console publish:trigger-events
```

{% info_block infoBox %}

`vendor/bin/console event:trigger` is deprecated.

{% endinfo_block %}

This command does the following:
1. Reads data from the `Storage` and `Search` tables and re-writes them
2. Updates key-value store (Redis or Valkey) and Elasticsearch records.

You can specify particular `Storage` and `Search` tables by indicating resource names as follows:

```bash
vendor/bin/console publish:trigger-events -r {resource_name}
```

Also, you can add one or more entity IDs:

```bash
vendor/bin/console publish:trigger-events -r {resource_name} -i {ids}
```

For example, the command to regenerate the published data for `CMS Block` and `Availability` resources with IDs 1 and 2 looks as follows:

```bash
vendor/bin/console publish:trigger-events -r cms_block,availability -i 1,2
```

To trigger data re-publish for a resource, there must be a corresponding publisher plugin created for this resource.

To learn how to create it, see [Implement event trigger publisher plugins](/docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-event-trigger-publisher-plugins.html).

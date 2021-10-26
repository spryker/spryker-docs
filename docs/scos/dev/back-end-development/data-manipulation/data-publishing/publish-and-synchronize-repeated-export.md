---
title: Publish and Synchronize repeated export
description: By following the steps from this article, you can re-generate published data and re-write data of database tables in Storage and Search modules with subsequent update of Redis and Elasticsearch records
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronize-repeated-export
originalArticleId: f1d13f30-7763-4804-8674-e87edf95653f
redirect_from:
  - /2021080/docs/publish-and-synchronize-repeated-export
  - /2021080/docs/en/publish-and-synchronize-repeated-export
  - /docs/publish-and-synchronize-repeated-export
  - /docs/en/publish-and-synchronize-repeated-export
  - /v6/docs/publish-and-synchronize-repeated-export
  - /v6/docs/en/publish-and-synchronize-repeated-export
  - /v5/docs/publish-and-synchronize-repeated-export
  - /v5/docs/en/publish-and-synchronize-repeated-export
  - /v4/docs/publish-and-synchronize-repeated-export
  - /v4/docs/en/publish-and-synchronize-repeated-export
  - /v3/docs/publish-and-synchronize-repeated-export
  - /v3/docs/en/publish-and-synchronize-repeated-export
  - /v2/docs/publish-and-synchronize-repeated-export
  - /v2/docs/en/publish-and-synchronize-repeated-export
  - /v1/docs/publish-and-synchronize-repeated-export
  - /v1/docs/en/publish-and-synchronize-repeated-export
---

Automatic execution of the [Publish & Synchronize process](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/handling-data-with-publish-and-synchronization.html) does not always resolve all your tasks. For example, you might want to re-synchronize(re-sync) the published data in Redis and Elasticsearch to display updated information in your shop front end. Or you might want to re-generate the published data and re-write the data of the database tables in the Storage and Search modules with the subsequent update of Redis and Elasticsearch records. This can be done manually by running console commands.

## Data re-synchronization


In some cases, you might want to re-export data into Redis and Elasticsearch. For example, if Redis has been flushed and the data in Redis and/or Elasticsearch is lost.

Run the following command to re-export data:

```bash
vendor/bin/console sync:data
```

This command does the following:

1.  Reads the aggregated data from the database tables of Storage and Search modules.

2.  Sends the data to the RabbitMQ queues.

3.  Copies the data from the RabbitMQ queues to Redis and Elasticsearch.


You can specify particular `Storage` and `Search` tables by specifying entity names as follows:
```bash
vendor/bin/console sync:data {resource_name}
```

For example, the command to re-sync data for `CMS Block` looks as follows:
```bash
vendor/bin/console sync:data cms_block
```

To trigger data re-sync for a resource, there should be a corresponding sync plugin created for this resource. See [Implementing synchronization plugins](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/implementing-synchronization-plugins.html) to learn how to create it.

## Published data re-generation


You can re-generate published data from scratch. For example, something went wrong during a product import and you want to re-publish the data. In other words, you need to update `Storage` and `Search` tables and sync the data in Redis and Elasticsearch.

Run the command to re-generate published data:
```bash
vendor/bin/console publish:trigger-events
```

{% info_block infoBox %}

`vendor/bin/console event:trigger` is deprecated.

{% endinfo_block %}

This command does the following:

1.  Reads data from the `Storage` and `Search` tables and re-writes them

2.  Updates Redis and Elasticsearch records.


You can specify particular `Storage` and `Search` tables by indicating resource names as follows:
```bash
vendor/bin/console publish:trigger-events -r {resource_name}
```

Also, you can add one or more entity IDs:
```bash
vendor/bin/console publish:trigger-events -r {resource_name} -i {ids}
```

For example, the command to re-generate the published data for `CMS Block` and `Availability` resources with IDs 1 and 2 looks as follows:
```bash
vendor/bin/console publish:trigger-events -r cms_block,availability -i 1,2
```

To trigger data re-publish for a resource, there should be a corresponding publisher plugin created for this resource.

See [Implementing event trigger publisher plugins](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/implementing-event-trigger-publisher-plugins.html) to learn how to create it.

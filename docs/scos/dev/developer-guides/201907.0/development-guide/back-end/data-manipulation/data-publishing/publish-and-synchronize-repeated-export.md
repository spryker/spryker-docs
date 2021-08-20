---
title: Publish and Synchronize Repeated Export
description: By following the steps from this article, you can re-generate published data and re-write data of database tables in Storage and Search modules with subsequent update of Redis and Elasticsearch records
originalLink: https://documentation.spryker.com/v3/docs/publish-and-synchronize-repeated-export
originalArticleId: d6303dde-e14b-4b85-9911-eec54c98149c
redirect_from:
  - /v3/docs/publish-and-synchronize-repeated-export
  - /v3/docs/en/publish-and-synchronize-repeated-export
---

Automatic execution of [Publish & Synchronize process](http://documentation.spryker.com/v4/docs/handling-data-publish-and-synchronization) does not always resolve all your tasks, as sometimes you might need to trigger some commands manually. For example, you might want to re-synchronize published data in Redis and Elasticsearch to display updated information in your shop front-end, or you might even want to completely re-generate published data and re-write data of database tables in Storage and Search modules with subsequent update of Redis and Elasticsearch records. All this can be done manually with specific terminal commands, without having to re-run the entire process.

## Data Re-synchronization

Imagine you have flushed Redis or some accident happened and you lost your data that were in Redis and/or Elasticsearch. In such cases, you might want to re-export data into Redis and Elasticsearch. To do so, you can simply run the following command:

```php
console sync:data
```

It will fill up Redis and Elasticsearch in a very short period of time. This command reads aggregated data from Storage and Search modules DB tables, and sends it to RabbitMQ queues. The data in Redis and Elasticsearch is then re-synchronised, i.e. data from Rabbit queues is copied to Redis and Elasticsearch.

The re-synchronization command can also be applied to individual Storage and Search tables by indicating specific entities that should be affected. To specify an entity, indicate its name after the command:

```php
console sync:data {resource_name}
```



For example, to re-synchronize data just for CMS Block, run

```php
sync:data cms_block
```



## Re-generating Published Data

It is also possible to re-generate published data completely. For example, you have run product import, but something went wrong and you want to re-publish data, i.e. update Storage and Search tables, as well as subsequently have the new data in Redis and Elasticsearch. In this case, you would not have to re-run the import, but run the following command instead:

```php
console event:trigger
```
This command not only reads data from Storage and Search tables, but also re-writes their data and then updates Redis and Elasticsearch records.

With this command, you can also specify an entity it should be applied to, by adding -r and entity name and (optionally) IDs:

```php
console event:trigger -r {resource_name} -i {ids}
```

For example, to re-generate published data for CMS Block and Availability entities, run

```php
console event:trigger -r cms_block,availability -i 1,2
```

<!-- Last review date: November 7th, 2018- by Helen Kravchenko, Ruslan Dovhospynyi -->

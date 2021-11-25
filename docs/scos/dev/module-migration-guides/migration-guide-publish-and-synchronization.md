---
title: Migration guide - Publish and ynchronization
description: Use the guide to learn how to update the Publish and Synchronization module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-pub-and-sync
originalArticleId: cf634bb3-f098-4820-8220-16f00e3eda61
redirect_from:
  - /2021080/docs/mg-pub-and-sync
  - /2021080/docs/en/mg-pub-and-sync
  - /docs/mg-pub-and-sync
  - /docs/en/mg-pub-and-sync
  - /v1/docs/mg-pub-and-sync
  - /v1/docs/en/mg-pub-and-sync
  - /v2/docs/mg-pub-and-sync
  - /v2/docs/en/mg-pub-and-sync
  - /v3/docs/mg-pub-and-sync
  - /v3/docs/en/mg-pub-and-sync
  - /v4/docs/mg-pub-and-sync
  - /v4/docs/en/mg-pub-and-sync
  - /v5/docs/mg-pub-and-sync
  - /v5/docs/en/mg-pub-and-sync
  - /v6/docs/mg-pub-and-sync
  - /v6/docs/en/mg-pub-and-sync
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-publish-and-synchronization.html
---

## Upgrading from Version 0.* to Version 1.*

### Version 1 of the Storage and the Search modules

#### Table indexs

In this version, Indexes were added to Storage and Search tables, this will increase the performance of Listeners and workers.

#### Store and Redis keys

Currently, Spryker supports multi-store and this should be adopted for the rest of the module. Some of the Storage and Search modules are not store aware, so for this reason the store column might be removed and this will impact the Redis key. Structure didn't change. For those modules which do not belong to any store, we need to add a new property to `schema.xml` files

```xml
<behavior name="synchronization">
	<parameter name="queue_pool" value="synchronizationPool" />
</behavior>
```
For wiring the stores and sync queues you should configure it in `store.php`

```php
$stores['DE']['queuePools']['synchronizationPool'] = [
	'AT-connection',
	'DE-connection'
];
```
#### Module layers

In Previous version the listener plugins has been extended from Abstract plugin classes and now this has changed due to obey the spryker architecture and moved into business layer and open APIs from Facade classes.

### Version 1 of the EventBehavior modules

#### PropelPlugin

The type of primary key of `spy_event_behavior_entity_change` table (`id_event_behavior_entity_change`) changed from `INTEGER` to `BIGINT`

### Version 1 of the SynchronizationBehaivor modules

#### PropelPlugin

A new property `queue_pool` has been added to `SynchronizationBehavior`, this allows sending the data to specific queue connection pool.

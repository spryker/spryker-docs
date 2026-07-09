---
title: Upgrade Publish and Sync
description: Use the guide to learn how to update the Publish and Synchronization module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
redirect_from:
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/module-migration-guides/migration-guide-publish-and-synchronization.html
  - /docs/scos/dev/migration-concepts/upgrade-publish-and-sync.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}



## Upgrading from version 0.* to version 1.*

### Version 1 of the Storage and the Search modules

#### Table indexes

In this version, Indexes were added to Storage and Search tables, this will increase the performance of Listeners and workers.

#### Store and key-value store keys

Currently, Spryker supports multi-store and this should be adopted for the rest of the module. Some of the Storage and Search modules are not store aware, so for this reason the store column might be removed and this will impact the key-value store (Redis or Valkey) key. Structure didn't change. For those modules which do not belong to any store, we need to add a new property to `schema.xml` files

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

In Previous version the listener plugins has been extended from Abstract plugin classes and now this has changed because of obey the Spryker architecture and moved into business layer and open APIs from Facade classes.

### Version 1 of the EventBehavior modules

#### PropelPlugin

The type of primary key of `spy_event_behavior_entity_change` table (`id_event_behavior_entity_change`) changed from `INTEGER` to `BIGINT`

### Version 1 of the SynchronizationBehavior modules

#### PropelPlugin

A new property `queue_pool` has been added to `SynchronizationBehavior`, this allows sending the data to specific queue connection pool.

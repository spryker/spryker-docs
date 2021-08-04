---
title: Migration Guide - Collector
originalLink: https://documentation.spryker.com/v4/docs/mg-collector
redirect_from:
  - /v4/docs/mg-collector
  - /v4/docs/en/mg-collector
---

## Upgrading from Version 5.* to Version 6.*

1. The general concept of `collectors`, and `collector queries` are enhanced to support multi-store.
The following classes were altered to support the multi-store concept:

* `AbstractCollector`
* `AbstractDatabaseCollector`
* `AbstractPdoCollector`
* `AbstractPropelCollector`
* `AbstractSearchPropelCollector`
* `AbstractStoragePropelCollector`
* `AbstractCollectorQuery`

### Collector multi-store concept overview

1. The primary change affects the `AbstractDatabaseCollector::processBatchForExport()`. Previously this method was responsible for simply exporting all "touch active" touched entities to Storage or Search. In multi-store environment, a multi-store entity does not necessary exist in all stores even though it is "touch active" in all stores. Moreover, an exported "touch active" multi-store entity can become invalid if it is unassigned from a specific store. To achieve the expected behavior, the `AbstractCollector::isStorable()` method is introduced. Whenever this method returns with `true`, the subject entity is considered to be available (in the current store) and will be exported. On the other hand, the `false` return value that the entity is not available (in the current store) and either not should not be exported or should be deleted from Storage or Search if it has already been exported previously.
 
    {% info_block warningBox %}
The `AbstractCollector::isStorable(
{% endinfo_block %}` is not limited to multi-store entities and can be used on demand according to the above description.)

2. The general "touch deleted" logic was updated through the `AbstractCollector::getTouchCollectionToDelete()` method which now always selects those records only from `spy_touch_storage`, and `spy_touch_search`, which are related to the current store.

3. `StoreTransfer` is a new property which has been introduced for `AbstractCollectorQuery` class and for its descendants. This property is populated before the actual query call through the `AbstractPdoCollector`, and `AbstractPropelCollector` classes. The property contains the current store as a transfer object.

4. The propel abstract classes are amended to always select the current store specific `spy_touch_search`, and `spy_touch_storage` records  by amending the general prepare methods in `AbstractSearchPropelCollector::prepareCollectorScope()`, `AbstractStoragePropelCollector::joinStorageTableWithLocale()`, and `AbstractStoragePropelCollector::joinStorageTable()`.

You can find additional details on the [Collector module release page](https://github.com/spryker/collector/releases).

2. Update/install `spryker/touch` to at least `4.0.0` version. For more information, see [Migration Guide - Touch](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-touch).
3. If you have multiple stores: Amend your existing custom `AbstractPdoCollectorQuery` extended queries to always select current store related `spy_touch_storage` and `spy_touch_search` records. This has to be made for all of the queries regardless if they work with a multi-store entity or a single-store entity. You can find additional details regarding collector multi-store concept in the previous step, on the [Collector module release page](https://github.com/spryker/collector/releases), and on our [Demoshop implementation](https://github.com/spryker/demoshop).

**Example of a modified query**
    
```php
<?php

namespace Pyz\Zed\Collector\Persistence\Storage\Pdo\PostgreSql;

use Spryker\Zed\Collector\Persistence\Collector\AbstractPdoCollectorQuery;

class ProductConcreteCollectorQuery extends AbstractPdoCollectorQuery
{
    /**
     * @return void
     */
    protected function prepareQuery()
    {
         $sql = '
SELECT
  ...
FROM spy_touch t
  ...
  LEFT JOIN spy_touch_storage ON (spy_touch_storage.fk_touch = t.id_touch AND spy_touch_storage.fk_locale = spy_locale.id_locale AND spy_touch_storage.fk_store = :id_store)
WHERE
  ...
';

        $this->criteriaBuilder->sql($sql)->setParameter('id_store', $this->storeTransfer->getIdStore());
    }
}
```

{% info_block warningBox %}
It is important to add the condition to the `LEFT JOIN` section so the number of result rows will not change.
{% endinfo_block %}

4. The deprecated `CollectorDependencyProvider::provideLocaleFacade()` is removed, please check your code if you have custom calls or dependencies.

5. The following methods have internal changes, please check if you have customized them:
* `AbstractTouchUpdater::bulkUpdate()`
* `AbstractTouchUpdater::getCollectorKeyFromData()`

You can find additional details on [Collector module release page](https://github.com/spryker/collector/releases).

## Upgrading from Version 3.* to Version 4.*

With version 4 of the Collector module, we fixed the `collector:search:export` and `collector:search:update` console commands to run for all available locales instead of just for the current one. This behavior is now consistent with the storage collector command (`collector:storage:export`).

If you would like to upgrade to this version and you have multiple locales in your store, then you need to make sure that your collector query (in the Spryker Demoshop we use the `ProductCollectorQuery` class) is also correctly filtered by locale, otherwise it could happen that you’ll have inconsistent data in your Elasticsearch.

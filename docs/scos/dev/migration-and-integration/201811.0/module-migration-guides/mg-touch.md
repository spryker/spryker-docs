---
title: Migration Guide - Touch
originalLink: https://documentation.spryker.com/v1/docs/mg-touch
redirect_from:
  - /v1/docs/mg-touch
  - /v1/docs/en/mg-touch
---

## Upgrading from Version 3.* to Version 4.*

1. Update/install `spryker/touch` to at least 4.0.0 version.
2. Install the new database columns by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
3. Run `vendor/bin/console propel:migrate` to apply the database changes.
4. Generate ORM models by running `vendor/bin/console propel:model:build`.
This command will update `spy_touch_storage`, and `spy_touch_search` classes to have the newly created `fk_store` columns and their relations.
5. Populate `fk_store` records respectively to `spy_touch_storage.key`, and `spy_touch_search.key`.
**Example migrations**
    1. If you have a single Store, spy_store contains 1 row which represents your active store. Use its spy_store.id_store value to update touch records.
In our current example the store ID is considered: 1.
```sql
UPDATE spy_touch_storage SET fk_store = 1;
UPDATE spy_touch_search SET fk_store = 1;
```
2. If you have multiple Stores already, you will need to create a query which updates the fk_store values based on the records' key (if it contains the store information).
Example update when the key has the following structure: {STORE_NAME}.{LOCALE_NAME}.{ENTITY_NAME}.{ENTITY_ID}.
```sql
MySql:
      UPDATE spy_touch_storage JOIN spy_store SET spy_touch_storage.fk_store = spy_store.id_store
      WHERE LOWER(spy_store.name) = LOWER(SUBSTR(`key`, 1, LOCATE(`key`, '.') - 1));

      UPDATE spy_touch_search JOIN spy_store SET spy_touch_search.fk_store = spy_store.id_store
      WHERE LOWER(spy_store.name) = LOWER(SUBSTR(`key`, 1, LOCATE(`key`, '.') - 1));

PostgreSql:
      UPDATE spy_touch_storage SET fk_store = spy_store.id_store
      FROM spy_store WHERE LOWER(spy_store.name) = LOWER(SUBSTR(key, 1, STRPOS(key, '.') - 1));

      UPDATE spy_touch_search SET fk_store = spy_store.id_store
      FROM spy_store WHERE LOWER(spy_store.name) = LOWER(SUBSTR(key, 1, STRPOS(key, '.') - 1));
```

6. The following deprecated methods were removed, please check your code if you have custom calls or dependencies:
* `TouchFacadeInterface::bulkTouchActive()`
* `TouchFacadeInterface::bulkTouchInactive()`
* `TouchFacadeInterface::bulkTouchDeleted()`
* `TouchQueryContainerInterface::queryTouchEntries()`
* `TouchInterface::bulkUpdateTouchRecords()`
You can find additional details on the [Touch module release page](https://github.com/spryker/touch/releases).

7. The following methods have internal changes, please check if you have customized them:
* `TouchQueryContainer::queryTouchDeleteStorageAndSearch()`
* `TouchRecord::removeTouchEntriesMarkedAsDeleted()`
You can find additional details on the [Touch module release page](https://github.com/spryker/touch/releases).            
8. Note: Module requires PHP 7.1 from now on.
9. After these steps, your `Touch` module supports multi-store entities.

<!--**See also:**
[Learn more about Touch](https://documentation.spryker.com/module_guide/spryker/touch.htm)-->

<!-- Last review date: Jan 31, 2018 by Karoly Gerner -->

---
title: Storage caching for primary-replica database setups
description: This guideline explains how to setup the Master-Replica database connection.
last_updated: May 16, 2022
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/guidelines/performance-guidelines/elastic-computing/storage-caching-for-primary-replica-db-setups.html
related:
  - title: New Relic transactions grouping by queue names
    link: docs/scos/dev/guidelines/performance-guidelines/elastic-computing/new-relic-transaction-grouping-by-queue-names.html
  - title: RAM-aware batch processing
    link: docs/scos/dev/guidelines/performance-guidelines/elastic-computing/ram-aware-batch-processing.html
---

With database replication enabled, there is a time gap between adding data to the primary database (DB) and transferring data to the replica. So, the application may fail to read the data from the replica.

This issue can occur in the following cases:
* A record is created via Yves request in the primary database, and Zed requests the data from the replica.
* A data insert was just done, and, during requests to Zed, the application must read the  replica.

## Caching mechanism

To cover the cases, Storage is used for caching the type of the records that were recently added to a primary DB.

The approach works as follows:
1. A record is created.
2. The record's type is stored in Storage. For example `User` string for a User model.
3. Storage keeps the record type alive for 3 seconds. The time is configurable and depends on how quickly the data is usually transferred from the primary to the replica DB.
4. When reading data, application checks the Storage for a needed record type and does the following:
    * If the record type is present in Storage, it reads the primary DB.
    * If the record type is not present in the Storage, it reads the replica.

## Integrate Storage caching for primary-replica database setups

For instructions, see [Storage caching for primary-replica database setups](/docs/dg/dev/integrate-and-configure/integrate-elastic-computing.html#integrate-storage-caching-for-primary-replica-database-setups)

## Implementation details

Solution implementation affects all `find*()` methods and `postSave()` hooks of Propel query objects.

We created and updated 3 major modules:

* `PropelReplicationCache`:

  * Stores key in Redis after Propel inserted a data to the primary DB.

  * Checks key in Redis when Propel is about to read data from DB.

  * Contains plugins to extend PropelOrm module.

Plugins can contain any functionality to extend Propel object and query instances.

* `PropelOrm`:

    * Lets extend Propel query objects to adjust save method generation with additional functionality.

    * Lets extend Propel entity objects to adjust `find*()` methods generation with additional functionality.

* `PropelOrmExtension`

    * Lets extend the `PropelOrm` module with plugins to expand its functionality.

    * Introduced a `FindExtensionPluginInterface` to expand data reading from the DB.

    * Introduced a `PostSaveExtensionPluginInterface` to expand data saving to the DB.

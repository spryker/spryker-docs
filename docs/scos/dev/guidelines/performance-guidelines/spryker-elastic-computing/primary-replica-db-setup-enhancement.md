---
title: Storage caching for primary-replica database setups
description: This guideline explains how to setup the Master-Replica database connection.
last_updated: May 16, 2022
template: concept-topic-template
---

With database replication enabled, there is a time gap between adding data to the primary database (DB) and transferring data to the replica. So, the application may fail to read the data from the replica.

This issue can occur in the following cases:
* A record is created via Yves request in the primary database, and Zed requests the data from the replica.
* During parallel requests to Zed, our application must read replica after insert was just done === Please describe in more details.

# Solution

To cover the cases, Storage is used as a caching mechanism for keeping the type of the records that recently were added to a primary DB.

The approach works as follows:
1. Record is created.
2. Record type is stored in Storage. For example `User` string for a User model.
3. Storage keeps the record type alive for 3 seconds. The time is configurable and depends on how quickly the data is usually transferred from the primary to the replica DB.
4. When reading data, application checks the Storage for a needed record type and does the following:
    * If the record type is present in Storage, it reads the primary DB.
    * If the record type is not present in the Storage, it reads the replica.

# Project enablement

Solution implementation affects all `find*()` methods and `postSave()` hooks of Propel query objects.

In order to implement a solution 3 major modules were created/updated:

- **PropelReplicationCache**

Is responsible for storing key in Redis when Propel inserted a data to the primary DB.

Is responsible for checking key in Redis when Propel is about reading data from DB.

Contains plugins to extend PropelOrm module.

Plugins can contain any functionality to extend Propel object and query instances.

- **PropelOrm**

Allows to extend Propel query objects in order to adjust save method generation with additional functionality.

Allows to extend Propel entity objects in order to adjust find*() methods generation with additional functionality.

- **PropelOrmExtension**

Allows to extend PropelOrm module with plugins to expand its functionality.

Introduced a `FindExtensionPluginInterface` to expand data reading from the DB.

Introduced a `PostSaveExtensionPluginInterface` to expand data saving to the DB.

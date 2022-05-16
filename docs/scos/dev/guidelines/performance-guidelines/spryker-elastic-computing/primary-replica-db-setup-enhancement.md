---
title: Primary-Replica DB setup enhancement
description: This guideline explains how to setup the Master-Replica database connection.
last_updated: May 16, 2022
template: concept-topic-template
---

# Status Quo
When database replication is enabled, application may have issues with data reading from replica DB after data just has been inserted in the primary DB. When data is inserted to the primary DB, there is a time gap when data is transferred to replica database.

# Problem statement
If application had enabled database replication then we can easily face an issue when we just wrote data to the **primary** DB and reading from **replica** DB - we don't yet have a data in the replica DB.

Use-cases:
- A record is created via Yves request, but Zed wants to read from replica DB
- During parallel requests to Zed, our application must read replica after insert was just done

# Solution
In order to cover defined use-cases, we use Storage as a caching mechanism to keep  just created records’s type.

The approach works as shown below:
1. Record is created.
2. Record type is stored in Storage (for example “User“ string for a User model).
3. Storage keeps the record type in Storage alive for 3 seconds (configurable).
4. During data read, the Storage is checked for matching record type.
- If record type is present in Storage, primary DB is read.
- Otherwise replica DB is read.

# Project enablement
Solution implementation affects all find*() methods of Propel query objects and postSave() hooks of Propel query objects.

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

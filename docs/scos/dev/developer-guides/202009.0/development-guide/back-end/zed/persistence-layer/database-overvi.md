---
title: Database Overview
originalLink: https://documentation.spryker.com/v6/docs/database-overview
redirect_from:
  - /v6/docs/database-overview
  - /v6/docs/en/database-overview
---

## ORM Directory

The ORM directory contains two folders: Propel and Zed.

The **src/Orm/Propel** is for:

* Configuration in Propel format (generated `propel.json` - don’t touch).
* Copy of merged schema files (don’t touch).
* Migration files (can be on gitignore or can be committed, the decision is made on the project level. We usually recommend to use gitignore, however Propel documentation says: *"On a project using version control, it is important to commit the migration classes to the code repository. That way, other developers checking out the project will just have to run the same migrations to get a database in a similar state".*

**src/Orm/Zed** is for:

* Entities and query-objects which can be adopted in projects. They inherit from the same core-level files. This way we can release methods like `preSave()` as well as allow to adopt them in project-level.
* There are also Base and Map files that are propel-internals (don’t touch).

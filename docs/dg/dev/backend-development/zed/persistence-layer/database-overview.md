---
title: Database overview
description: Overview of the persistence layer. Learn about schema design, entity management, and efficient data handling in Zed backend development.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/back-end-development/zed/persistence-layer/database-overview.html
related:
  - title: Database schema definition
    link: docs/dg/dev/backend-development/zed/persistence-layer/database-schema-definition.html
  - title: Entity
    link: docs/dg/dev/backend-development/zed/persistence-layer/entity.html
  - title: Entity manager
    link: docs/dg/dev/backend-development/zed/persistence-layer/entity-manager.html
  - title: About the query container
    link: docs/dg/dev/backend-development/zed/persistence-layer/query-container/query-container.html
  - title: Query objects - creation and usage
    link: docs/dg/dev/backend-development/zed/persistence-layer/query-objects-creation-and-usage.html
  - title: Repository
    link: docs/dg/dev/backend-development/zed/persistence-layer/repository.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}



## ORM Directory

The `Orm` directory contains two folders: `Propel` and `Zed`.

The `src/Orm/Propel` folder is for the following:

- Configuration in Propel format (generated `propel.json`—don't touch it).
- Copy of merged schema files (don't touch).
- Migration files (can be in `.gitignore` or can be committed; the decision is made on the project level. We recommend using `.gitignore`; however Propel documentation says that "On a project using version control, it's important to commit the migration classes to the code repository. That way, other developers checking out the project just have to run the same migrations to get a database in a similar state".

The `src/Orm/Zed` folder is for the following:

- Entities and the query are objects which can be adopted in projects. They inherit from the same core-level files. This way, we can release methods like `preSave()` as well as allow adopting them on the project level.
- There are also Base and Map files that are propel-internals (don't touch them).

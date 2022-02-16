---
title: Integrating MariaDB database engine
description: Learn how to switch database engine to MariaDB.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mariadb-database-engine
originalArticleId: 5ef5569f-0fab-488d-9c95-3e0c0dbb0ddb
redirect_from:
  - /2021080/docs/mariadb-database-engine
  - /2021080/docs/en/mariadb-database-engine
  - /docs/mariadb-database-engine
  - /docs/en/mariadb-database-engine
  - /v6/docs/mariadb-database-engine
  - /v6/docs/en/mariadb-database-engine
  - /docs/scos/dev/technical-enhancements/mariadb-database-engine.html
related:
  - title: Configuring services
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-services.html
---

[MariaDB](https://mariadb.org/) is a community-developed, commercially supported fork of the [MySQL](https://www.mysql.com/) relational database management system.

See [MariaDB knowledge base](https://mariadb.com/kb/en/) for more details.

## Integration into Docker-based projects

For Docker-based integration instructions, see [MariaDB](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-services.html#mariadb).

## Integration into DevVM-based projects
To integrate MariaDB into a DevVM-based project:

1. Update Vagrant to version 3.2.0 or higher.

2. Update `config_*.php` as follows:

```php
<?php
$config[PropelConstants::ZED_DB_ENGINE] = PropelConfig::DB_ENGINE_MYSQL;
$config[PropelConstants::ZED_DB_PORT] = 3306;
```

You've switched your database engine to MariaDB.

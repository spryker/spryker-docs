---
title: MariaDB database engine
description: Learn how to switch database engine to MariaDB.
originalLink: https://documentation.spryker.com/v6/docs/mariadb-database-engine
originalArticleId: 39c54629-e4ef-4c58-bf26-f4974f3cc884
redirect_from:
  - /v6/docs/mariadb-database-engine
  - /v6/docs/en/mariadb-database-engine
---

[MariaDB](https://mariadb.org/) is a community-developed, commercially supported fork of the [MySQL](https://www.mysql.com/) relational database management system.

See [MariaDB knowledge base](https://mariadb.com/kb/en/) for more details.

## Integration into Docker-based projects

For Docker-based integration instructions, see [MariaDB](/docs/scos/dev/developer-guides/202009.0/docker-sdk/configuring-services.html#mariadb).
  
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



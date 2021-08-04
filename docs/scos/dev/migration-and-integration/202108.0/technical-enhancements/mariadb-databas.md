---
title: MariaDB database engine
originalLink: https://documentation.spryker.com/2021080/docs/mariadb-database-engine
redirect_from:
  - /2021080/docs/mariadb-database-engine
  - /2021080/docs/en/mariadb-database-engine
---

[MariaDB](https://mariadb.org/) is a community-developed, commercially supported fork of the [MySQL](https://www.mysql.com/) relational database management system.

See [MariaDB knowledge base](https://mariadb.com/kb/en/) for more details.

## Integration into Docker-based projects

For Docker-based integration instructions, see [MariaDB](https://documentation.spryker.com/docs/services#mariadb).
  
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



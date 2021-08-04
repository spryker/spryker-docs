---
title: Configuring the database server
originalLink: https://documentation.spryker.com/v6/docs/configure-database-server
redirect_from:
  - /v6/docs/configure-database-server
  - /v6/docs/en/configure-database-server
---

This article describes how you can change your database server.

Spryker supports MySQL, MariaDB, and PostgreSQL as database servers. By default, the virtual machine is configured to use the MariaDB database server, but you can easily switch to PostgreSQL.

To configure the database server you want to use, you have to keep in mind these constants and use them in the corresponding configuration file:

| Database Server |    ZED_DB_ENGINE    | ZED_DB_PORT |
| :-------------: | :-----------------: | :---------: |
| MySQL or MariaDB | ZED_DB_ENGINE_MYSQL |    3306     |
| PostgreSQL | ZED_DB_ENGINE_PGSQL |    5432     |

The configuration files are placed under the `config/Shared/` folder. For example, `config/Shared/config_default-development.php` is the configuration file for the development environment.


## Using MySQL or MariaDB as a DB Server

```php
 <?php

$config[PropelConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];
$config[PropelConstants::ZED_DB_PORT] = 3306;
```

## Using PostgreSQL as a DB Server

```php
<?php

$config[PropelConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_PGSQL];
$config[PropelConstants::ZED_DB_PORT] = 5432;
```

## Creating the database

To create or update the database configuration, run the installation tool using this command:

```php
vendor/bin/install
```

If the application is already installed on your virtual machine and you switch to a different database server, you can also run:

```php
vendor/bin/install
```

Use the `-h` option to see the help page for this command.

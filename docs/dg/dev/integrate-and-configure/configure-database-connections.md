---
title: Configure database connections
description: Learn how you can configure a single or multiple database connections within your Spryker based project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-setup-database-connections
originalArticleId: 0ee28aca-3f03-4747-a037-9ac5e6b13c8a
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-database-connections.html
related:
  - title: Database access credentials
    link: docs/dg/dev/set-up-spryker-locally/database-access-credentials.html
---

Spryker provides flexible database connection configuration.

## Configure a single database connection

The most probable use case and the Zed DB connection are good examples.

For this, open the environment config file (for example, `APP_DIR/config/Shared/config_default-development_DE.php`) and add the following parameters:

```php
$config[PropelConstants::ZED_DB_USERNAME] = 'username';
$config[PropelConstants::ZED_DB_PASSWORD] = 'password';
$config[PropelConstants::ZED_DB_DATABASE] = 'database';
$config[PropelConstants::ZED_DB_HOST] = '127.0.0.1';
$config[PropelConstants::ZED_DB_PORT] = 3306;
$config[PropelConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];
```

By default, Spryker provides configuration for a single connection: two Zed and default, but with the same configuration. The configuration that you can find in `APP_DIR/config/Shared/config_propel.php` can look like the following:

```php
$engine = $config[PropelConstants::ZED_DB_ENGINE];
$config[PropelConstants::PROPEL]['database']['connections']['default'] = $connections[$engine];
$config[PropelConstants::PROPEL]['database']['connections']['zed'] = $connections[$engine];
```

## Configure multiple database connections

Custom case which lets a project have more than one connections to different DBs. To define a new connection find a Propel configuration `APP_DIR/config/Shared/config_propel.php` and add the following (an example for Postgres):

```php
$config[PropelConstants::PROPEL]['database']['connections']['additional_db_connection'] = [
'adapter' => PropelConfig::DB_ENGINE_PGSQL,
'dsn' => 'pgsql:host=127.0.0.1;port=5432;dbname=additional_db',
'user' => 'username',
'password' => 'password',
'settings' => [],
]
```

When a new connection is available, you can use it in your schema file.

---
title: HowTo - Set up Database Connections
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-setup-database-connections
originalArticleId: 0ee28aca-3f03-4747-a037-9ac5e6b13c8a
redirect_from:
  - /2021080/docs/ht-setup-database-connections
  - /2021080/docs/en/ht-setup-database-connections
  - /docs/ht-setup-database-connections
  - /docs/en/ht-setup-database-connections
  - /v6/docs/ht-setup-database-connections
  - /v6/docs/en/ht-setup-database-connections
  - /v5/docs/ht-setup-database-connections
  - /v5/docs/en/ht-setup-database-connections
  - /v4/docs/ht-setup-database-connections
  - /v4/docs/en/ht-setup-database-connections
  - /v3/docs/ht-setup-database-connections
  - /v3/docs/en/ht-setup-database-connections
  - /v2/docs/ht-setup-database-connections
  - /v2/docs/en/ht-setup-database-connections
  - /v1/docs/ht-setup-database-connections
  - /v1/docs/en/ht-setup-database-connections
---

Spryker provides flexible database connection configuration.

## Single connection
Most probable use case and the Zed DB connection is a good example here.

For this you need to open environment config file (eg. `APP_DIR/config/Shared/config_default-development_DE.php`) and add the following parameters:

```
$config[PropelConstants::ZED_DB_USERNAME] = 'username';
$config[PropelConstants::ZED_DB_PASSWORD] = 'password';
$config[PropelConstants::ZED_DB_DATABASE] = 'database';
$config[PropelConstants::ZED_DB_HOST] = '127.0.0.1';
$config[PropelConstants::ZED_DB_PORT] = 3306;
$config[PropelConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];
```

By default Spryker provides configuration for a single connection (two zed and default, but with the same configuration). The configuration you could find in `APP_DIR/config/Shared/config_propel.php` and it will look like the following:

```
$engine = $config[PropelConstants::ZED_DB_ENGINE];
$config[PropelConstants::PROPEL]['database']['connections']['default'] = $connections[$engine];
$config[PropelConstants::PROPEL]['database']['connections']['zed'] = $connections[$engine];
```
## Multi connections
Custom case, which allows a project to have more than one connections to different DBs. To define a new connection find a Propel configuration `APP_DIR/config/Shared/config_propel.php`and add the following (example for Postgres):

```
$config[PropelConstants::PROPEL]['database']['connections']['additional_db_connection'] = [
'adapter' =&gt; PropelConfig::DB_ENGINE_PGSQL,
'dsn' =&gt; 'pgsql:host=127.0.0.1;port=5432;dbname=additional_db',
'user' =&gt; 'username',
'password' =&gt; 'password',
'settings' =&gt; [],
]
```
When a new connection is available you could use it in your schema file.

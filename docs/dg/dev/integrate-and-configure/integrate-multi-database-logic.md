---
title: Integrate multi-database logic
description: Learn how to switch from using a shared database to integrate multi-database logic within your Spryker projects.
last_updated: June 2, 2022
template: howto-guide-template
redirect_from:
- /docs/scos/dev/technical-enhancement-integration-guides/integrate-multi-database-logic.html
---

This document describes how to switch from using a shared database to dedicated databases for stores. In the following instructions, DE and AT stores are used as examples. When following the instructions, adjust the configuration to your needs.

## Prerequisites

Update the Docker SDK to [version 1.48.0](https://github.com/spryker/docker-sdk/releases/tag/1.48.0) or higher.

For cloud environments, make sure your project supports a [separated setup](/docs/ca/dev/multi-store-setups/multi-store-setups.html#separated-setup).

## Define databases

1. Define multiple databases per region.

```yaml
...

regions:
    EU:
        services:
            mail:
                sender:
                    name: Spryker No-Reply
                    email: no-reply@spryker.local
            databases:
                eu-region-db-one:
                eu-region-db-two:

...                
```

2. Bind the defined databases to the needed stores:


```yaml
...

regions:
    ...
       stores:
            DE:
                services:
                    broker:
                        namespace: de-docker
                    key_value_store:
                        namespace: 1
                    search:
                        namespace: de_search
                    database:
                        name: eu-region-db-one
            AT:
                services:
                    broker:
                        namespace: at-docker
                    key_value_store:
                        namespace: 2
                    search:
                        namespace: at_search
                    database:
                        name: eu-region-db-two
```

## Configure databases

Extend `config/Shared/config_default.php` or custom environment configuration which contains database configuration:

```php
$config[PropelConstants::ZED_DB_HOST] = getenv('SPRYKER_DB_HOST');
$config[PropelConstants::ZED_DB_PORT] = getenv('SPRYKER_DB_PORT');
$config[PropelConstants::ZED_DB_USERNAME] = getenv('SPRYKER_DB_USERNAME');
$config[PropelConstants::ZED_DB_PASSWORD] = getenv('SPRYKER_DB_PASSWORD');
$config[PropelConstants::ZED_DB_DATABASE] = getenv('SPRYKER_DB_DATABASE');

$paasServices = json_decode(getenv('SPRYKER_PAAS_SERVICES') ?: '[]', true);
if (!empty($paasServices['databases'])) {
    $databasesConfig = $paasServices['databases'][APPLICATION_CODE_BUCKET] ?? $paasServices['databases']['_default'];
    $config[PropelConstants::ZED_DB_HOST] = $databasesConfig['host'];
    $config[PropelConstants::ZED_DB_PORT] = $databasesConfig['port'];
    $config[PropelConstants::ZED_DB_USERNAME] = $databasesConfig['username'];
    $config[PropelConstants::ZED_DB_PASSWORD] = $databasesConfig['password'];
    $config[PropelConstants::ZED_DB_DATABASE] = $databasesConfig['database'];
}
```

## Configure key-value storage

In `config/Shared/config_default.php`,  extend the key-value configuration:

```php
// >>> STORAGE
...
$keyValueRegionNamespaces = json_decode(getenv('SPRYKER_KEY_VALUE_REGION_NAMESPACES') ?: '[]', true);
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = getenv('SPRYKER_KEY_VALUE_STORE_NAMESPACE') ?: $keyValueRegionNamespaces[APPLICATION_CODE_BUCKET] ?? 1;
...
```

{% info_block infoBox "Edge case with SPRYKER_KEY_VALUE_STORE_NAMESPACE" %}
If the environment variable SPRYKER_KEY_VALUE_STORE_NAMESPACE is set in your setup, and you still want to be able to switch the Redis DB changing only the store, we recommend the following change:

```php
// >>> STORAGE
...
$keyValueRegionNamespaces = json_decode(getenv('SPRYKER_KEY_VALUE_REGION_NAMESPACES') ?: '[]', true);
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = $keyValueRegionNamespaces[APPLICATION_CODE_BUCKET] ?: getenv('SPRYKER_KEY_VALUE_STORE_NAMESPACE') ?? 1;
...
```

{% endinfo_block %}

## Configure stores

In `config/Shared/stores.php`, do the following:

1. Define a dedicated synchronizationPool for each store.

2. Remove all the stores from shared persistence.

3. Add an array that returns the current store:

```php
<?php

$stores = [];

$stores['DE'] = [
    ....
    'queuePools' => [ // 1
        'synchronizationPool' => [
            'DE-connection',
        ],
    ],
    'storesWithSharedPersistence' => [], // 2
    ....
];

$stores['AT'] = [
    ...
    'queuePools' => [
        'synchronizationPool' => [
            'AT-connection',
        ],
    ],
    'storesWithSharedPersistence' => [],
    ....
];

return array_intersect_key($stores, [APPLICATION_STORE => []]); //3
```



## Adjust installation recipes


In `config/install/*`, adjust installation recipes as follows:

1. Adjust `destructive.yml` to execute per defined stores.
2. In all the installation recipes, adjust the `import-demodata:` section to execute per store instead of region.

```yaml
env:
    NEW_RELIC_ENABLED: 0

command-timeout: 7200

stores:
    - DE
    - AT

sections:
    scheduler-clean:
        scheduler-clean:
            command: 'vendor/bin/console scheduler:clean -vvv --no-ansi || true'
            stores: true

    clean-storage:
        clean-storage:
            command: 'vendor/bin/console storage:delete -vvv --no-ansi'
            stores: true

        clean-search:
            command: 'vendor/bin/console elasticsearch:index:delete -vvv --no-ansi'
            stores: true

        clean-db:
            command: 'vendor/bin/console propel:tables:drop -vvv --no-ansi'
            stores: true

    init-storage:
        queue-setup:
            command: 'vendor/bin/console queue:setup'
            stores: true

        setup-search-create-sources:
            command: 'vendor/bin/console search:setup:sources -vvv --no-ansi'
            stores: true

    init-storages-per-store:
        propel-copy-schema:
            command: 'vendor/bin/console propel:schema:copy -vvv --no-ansi'
            stores: true

        propel-postgres-compatibility:
            command: 'vendor/bin/console propel:pg-sql-compat -vvv --no-ansi'
            stores: true

        propel-migration-delete:
            command: 'vendor/bin/console propel:migration:delete -vvv --no-ansi'
            stores: true

        propel-tables-drop:
            command: 'vendor/bin/console propel:tables:drop -vvv --no-ansi'
            stores: true

        propel-diff:
            command: 'vendor/bin/console propel:diff -vvv --no-ansi'

        propel-migrate:
            command: 'vendor/bin/console propel:migrate -vvv --no-ansi'
            stores: true

        propel-migration-cleanup:
            command: 'vendor/bin/console propel:migration:delete -vvv --no-ansi'

        init-database:
            command: 'vendor/bin/console setup:init-db -vvv --no-ansi'
            stores: true

    demodata:
        import-store-demodata:
            command: 'vendor/bin/console data:import --config=data/import/production/full_${APPLICATION_STORE}.yml'
            stores: true

        update-product-labels:
            command: 'vendor/bin/console product-label:relations:update -vvv --no-ansi'
            stores: true

        check-product-validity:
            command: 'vendor/bin/console product:check-validity'
            stores: true

    scheduler-start:
        scheduler-setup:
            command: 'vendor/bin/console scheduler:setup -vvv --no-ansi || true'
            stores: true

```

## Create data import configuration files

In `data/import/local/*`, create dedicated data import configuration files per store. For example, for DE and AT stores, create  `full_DE.yml` and `full_AT.yml`.

{% info_block infoBox "Location for import config files in a production environment" %}

For production environments, the data import files are in `data/import/production/*`.

{% endinfo_block %}

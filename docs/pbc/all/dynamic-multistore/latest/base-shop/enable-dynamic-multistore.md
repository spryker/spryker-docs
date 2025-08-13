---
title: Enable Dynamic Multistore
description: Learn how to enable the Dynamic Store feature on the latest codebase
last_updated: Dec 19, 2024
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/dynamic-multistore/latest/base-shop/enable-dynamic-multistore.html
---


This document describes how to enable [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/dynamic-multistore-feature-overview.html) (DMS).

## Prerequisites

If your project version is below 202307.0, [Install Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html).

### Enable Dynamic Multistore

{% info_block warningBox "Staging environment" %}
To avoid unexpected downtime and data loss, perform and test *all* of the following steps in a staging environment first.
{% endinfo_block %}



1. Replace `StoreClient::getCurrentStore()` and `StoreFacade::getCurrentStore()` methods with `StoreStorageClient:getStoreNames()`, `StoreStorageClient::findStoreByName()`, or `StoreFacade::getStoreCollection()` in the following:
- Back Office
- Merchant Portal
- Console Commands
- Gateway
- BackendAPI

2. Update custom console commands to meet the following rules:
- `Store(Facade|Client)::getCurrentStore()` isn't used in the code a console command executes.
- All store-aware commands implement `Spryker\Zed\Kernel\Communication\Console\StoreAwareConsole` and execute actions for a specific store if a store parameter is provided; if not provided, actions are executed for all the stores in the region.
- Optional: We recommend using the `--store` parameter instead of `APPLICATION_STORE` env variable; both methods are supported.

3. After enabling DMS, the basic domain structure will change from store to region for all the applications. For example, `https://yves.de.mysprykershop.com` will change to `https://yves.eu.mysprykershop.com`. To prevent negative SEO effects, set up the needed redirects.
4. DMS changes the structure of RabbitMQ messages. When you're ready for the migration, wait for all the remaining messages in the queue to be processed. When the queue is empty, enable the maintenance mode.
The downtime associated with the maintenance mode is limited to the deployment time, which usually takes up to an hour.

5. Update AWS deployment files to DMS mode using the example:

Original environment variables section:

```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy.dynamic-store-off -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r production.dynamic-store-off --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive.dynamic-store-off --no-ansi -vvv'
SPRYKER_YVES_HOST_DE: de.{{DOMAIN_ZONE}}
SPRYKER_YVES_HOST_AT: at.{{DOMAIN_ZONE}}
```

Updated environment variables section:

```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r dynamic-store --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive --no-ansi -vvv'
SPRYKER_DYNAMIC_STORE_MODE: true
SPRYKER_YVES_HOST_EU: yves.eu.{{DOMAIN_ZONE}}
```

Original regions section:

```yaml
regions:
  stores:
    DE:
      services:
        broker:
          namespace: de_queue
        key_value_store:
          namespace: 1
        search:
          namespace: de_search
        session:
          namespace: 2
    AT:
      services:
        broker:
          namespace: at_queue
        key_value_store:
          namespace: 3
        search:
          namespace: at_search
        session:
          namespace: 4
```

Updated regions section:

```yaml
regions:
  broker:
    namespace: eu-docker
  key_value_store:
    namespace: 1
  search:
    namespace: eu_search
```

6. Run a normal deploy for your server pipeline.


{% info_block warningBox "Verification" %}
- Make sure your store is available at `https://yves.eu.mysprykershop.com` or `https://backoffice.eu.mysprykershop.com`.
- Make sure the store switcher is displayed on the Storefront.

{% endinfo_block %}

Your shop is now running in DMS mode.

### Check if Dynamic Multistore is enabled

DMS is enabled if at least one of the following applies:
1. Using environment: If the value of `SPRYKER_DYNAMIC_STORE_MODE` environment variable is `true`
2. Using interface: In the Back Office > **Administration** > **Stores**, an **Edit** button is displayed next to each store.

## Disable Dynamic Multistore

{% info_block warningBox "Staging environment" %}
To avoid unexpected downtime and data loss, perform and test *all* of the following steps in a staging environment first.
{% endinfo_block %}





1. After disabling DMS, the basic domain structure will change from region to store for all the applications. To prevent negative SEO effects, set up the needed redirects.
2. DMS changes the structure of RabbitMQ messages. When you're ready for the migration, wait for all the remaining messages in the queue to be processed. When the queue is empty, enable the maintenance mode.
      (Expected downtime is limited to the deployment time, normally it takes less than 1hr)
3. Revert changes in deploy files to disable DMS:

Original environment variables section:

```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r dynamic-store --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive --no-ansi -vvv'
SPRYKER_DYNAMIC_STORE_MODE: true
SPRYKER_YVES_HOST_EU: yves.eu.{{DOMAIN_ZONE}}
```

Updated environment variables section:

```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy.dynamic-store-off -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r production.dynamic-store-off --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive.dynamic-store-off --no-ansi -vvv'
SPRYKER_YVES_HOST_DE: de.{{DOMAIN_ZONE}}
SPRYKER_YVES_HOST_AT: at.{{DOMAIN_ZONE}}
```

Original regions section:

```yaml
regions:
  broker:
    namespace: eu-docker
  key_value_store:
    namespace: 1
  search:
    namespace: eu_search
```

Updated regions section:

```yaml
regions:
  stores:
    DE:
      services:
        broker:
          namespace: de_queue
        key_value_store:
          namespace: 1
        search:
          namespace: de_search
        session:
          namespace: 2
    AT:
      services:
        broker:
          namespace: at_queue
        key_value_store:
          namespace: 3
        search:
          namespace: at_search
        session:
          namespace: 4
```

6. Run a normal deploy for your server pipeline.

{% info_block warningBox "Verification" %}
- Make sure your store is available at `https://yves.de.mysprykershop.com` or `https://backoffice.de.mysprykershop.com`.
- Make sure the store switcher is *not* displayed on the Storefront.
{% endinfo_block %}

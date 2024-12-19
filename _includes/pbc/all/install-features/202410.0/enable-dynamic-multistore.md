This document describes how to enable [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/dynamic-multistore-feature-overview.html).

## Prerequisites

If your project version is below 202307.0, [Install Dynamic Multistore](/docs/pbc/all/dynamic-multistore/202410.0/base-shop/install-dynamic-multistore.html).

### Enable Dynamic Multistore

{% info_block warningBox "Staging environment" %}
To avoid unexpected downtime and data loss, perform and test *all* of the following steps in a staging environment first.
{% endinfo_block %}



1. Replace `StoreClient::getCurrentStore()` and `StoreFacade::getCurrentStore()` methods with `StoreStorageClient:getStoreNames()`, `StoreStorageClient::findStoreByName()`, or `StoreFacade::getStoreCollection()` in the following applications:
  * Backoffice
  * MerchantPortal
  * Console Commands
  * Gateway
  * BackendAPI

2. Update custom console commands to meet the following rules:
  - `Store(Facade|Client)::getCurrentStore()` isn't used in the code a console command executes.
  - All store-aware commands implement `Spryker\Zed\Kernel\Communication\Console\StoreAwareConsole` and execute actions for a specific store if a store parameter is provided; if not provided, actions are executed for all the stores in the region.
  - Optional: We recommend using the `--store` parameter instead of `APPLICATION_STORE` env variable; both methods are supported.

3. After enabling Dynamic Multistore, the basic domain structure will change from store to region for all the applications. For example, `https://yves.de.mysprykershop.com` will change to `https://yves.eu.mysprykershop.com`. To prevent negative SEO effects, set up the needed redirects.
4. The Dynamic Store feature itself does not require any database changes, in case you've already migrated to the latest demoshop version.
5. Dynamic Multistore changes the structure of RabbitMQ messages. When you're ready for the migration, wait for all the remaining messages in the queue to be processed. When the queue is empty, enable the maintenance mode.

   (Expected downtime is limited to the deployment time, normally it takes less than 1hr)
6. Update AWS deployment files to Dynamic Multistore mode using the example:

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

7. Run normal deploy for your server pipeline.


{% info_block warningBox "Verification" %}
- Make sure your store is accessible at `https://yves.eu.mysprykershop.com` or `https://backoffice.eu.mysprykershop.com`.
- Make sure the store switcher is displayed on the Storefront.


Congratulations! Now you have Dynamic Multistore feature up and running.
{% endinfo_block %}

## Rollback

### Rollback procedure is opposite, and contains the following steps:

{% info_block warningBox "Staging environment" %}
Make sure that **all** steps above are performed (and fully tested) on staging before applying it on production setup, to avoid unexpected downtime and data loss.
{% endinfo_block %}

1. Be aware that after disabling Dynamic Multistore mode, your basic domain structure will change from region to store, make sure that it is expected. If external systems are impacted by this - necessary redirects are set, so SEO of your site is not impacted.
2. Disabling Dynamic Store feature itself does not require any database changes.
3. Dynamic Multistore introduce some changes in RabbitMQ messages structure, so it is **important** that:
    - During server migration you do not have unprocessed messages in the queue. Make sure that all messages are processed **before** enabling Maintenance Mode.
    - Make sure that `Maintainance Mode` is enabled during migration to make sure that no new messages are added to the queue before the migration is finished.
      (Expected downtime is limited to the deployment time, normally it takes less than 1hr)
4. Revert changes for you deployment files to Dynamic Multistore OFF mode,
- Environment variable section
```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r dynamic-store --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive --no-ansi -vvv'
SPRYKER_DYNAMIC_STORE_MODE: true
SPRYKER_YVES_HOST_EU: yves.eu.{{DOMAIN_ZONE}}
```
should be changed to:
```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy.dynamic-store-off -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r production.dynamic-store-off --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive.dynamic-store-off --no-ansi -vvv'
SPRYKER_YVES_HOST_DE: de.{{DOMAIN_ZONE}}
SPRYKER_YVES_HOST_AT: at.{{DOMAIN_ZONE}}
```

- Regions section
```yaml
regions:
  broker:
    namespace: eu-docker
  key_value_store:
    namespace: 1
  search:
    namespace: eu_search
```
should be changed to:
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

6. Run normal deploy for your server pipeline.

{% info_block warningBox "Verification" %}
- Make sure your store is accessible at `https://yves.de.mysprykershop.com` or `https://backoffice.de.mysprykershop.com`.
- Make sure the store switcher is **not** displayed on the Storefront.
{% endinfo_block %}

This document describes how to enable [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/dynamic-multistore-feature-overview.html) on the demoshop version 202307.0 or above.

## Enable Dynamic Multistore

{% info_block warningBox "Project version" %}
If your project version is below 202307.0, you need to install Dynamic Multistore feature first, use instructions provided at [Install Dynamic Multistore](/docs/pbc/all/dynamic-multistore/202410.0/base-shop/install-dynamic-multistore.html) page.
{% endinfo_block %}

### Here are the steps that needs to be performed to enable Dynamic Multistore.

{% info_block warningBox "Staging environment" %}
     Make sure that **all** steps below are performed (and fully tested) on staging before applying it on production setup, to avoid unexpected downtime and data loss.
{% endinfo_block %}


1. Methods `StoreClient::getCurrentStore()`, `StoreFacade::getCurrentStore()` are available only in `GlueStorefront` and `Storefront` applications. For other applications (see list below) replace them with the following methods `StoreStorageClient:getStoreNames()`, `StoreStorageClient::findStoreByName()` or `StoreFacade::getStoreCollection()`.
  * Backoffice
  * MerchantPortal
  * Console Commands
  * Gateway
  * BackendAPI

2. Update your custom console commands  (if any) to meet the following rules:
- `Store(Facade|Client)::getCurrentStore()` should never be used in the code that console command executes.
- All store aware commands should implement `Spryker\Zed\Kernel\Communication\Console\StoreAwareConsole` and execute actions for specific store if store parameter is provided, or for all the stores in the region otherwise.
- It is recommended to use `--store` parameter instead of `APPLICATION_STORE` env variable, despite the support of env variable still exists.
3. Be aware that after enabling Dynamic Multistore mode, your basic domain structure will change from store to region for all the applications(Example https://yves.de.mysprykershop.com => https://yves.eu.mysprykershop.com), make sure that it is expected. If external systems are impacted by this - necessary redirects are set, so SEO of your site is not impacted.
4. The Dynamic Store feature itself does not require any database changes, in case you've already migrated to the latest demoshop version.
5. Dynamic Multistore introduce some changes in RabbitMQ messages structure, so it is **important** that:
   - During the migration we do not have unprocessed messages in the queue. Make sure that all messages are processed **before** enabling Maintenance Mode.
   - Make sure that `Maintainance Mode` is enabled during migration to make sure that no new messages are added to the queue before the migration is finished.
   (Expected downtime is limited to the deployment time, normally it takes less than 1hr)
6. Update AWS deployment files to Dynamic Multistore mode, using the example:
- Environment variable section
```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy.dynamic-store-off -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r production.dynamic-store-off --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive.dynamic-store-off --no-ansi -vvv'
SPRYKER_YVES_HOST_DE: de.{{DOMAIN_ZONE}}
SPRYKER_YVES_HOST_AT: at.{{DOMAIN_ZONE}}
```

should be changed to:

```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r dynamic-store --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive --no-ansi -vvv'
SPRYKER_DYNAMIC_STORE_MODE: true
SPRYKER_YVES_HOST_EU: yves.eu.{{DOMAIN_ZONE}}
```
- Regions section
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
should be changed to:

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

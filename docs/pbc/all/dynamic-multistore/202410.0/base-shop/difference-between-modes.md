---
title: Difference in deployment files
description: This document describes the difference between Dynamic Multistore ON and OFF mode.
past_updated: Nov 1, 2024
template: howto-guide-template
last_updated: Nov 1, 2024
---

This document describes the difference between Dynamic Multistore ON and OFF mode.


## Deployment file difference

### What is the difference of how Storefront and GlueStorefront (as well as Glue) vs Backoffice and Merchant Portal works in Dynamic Multistore mode?

In both cases, the applications works with the several stores within the one region, but:
* Backoffice, MerchantPortal operates with data from all the stores within the specific region without requirement to provide the specific store.
* Storefront and GlueStorefront (as well as Glue) requires store to operate, and operates within only one provided store. (If store is not provided explicitly, the default one is used.)


### Environment variable section

```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy.dynamic-store-off -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r production.dynamic-store-off --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive.dynamic-store-off --no-ansi -vvv'
SPRYKER_YVES_HOST_DE: de.{{DOMAIN_ZONE}}
SPRYKER_YVES_HOST_AT: at.{{DOMAIN_ZONE}}
```

changed to:

```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r dynamic-store --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive --no-ansi -vvv'
SPRYKER_DYNAMIC_STORE_MODE: true
SPRYKER_YVES_HOST_EU: yves.eu.{{DOMAIN_ZONE}}
```

### Regions section

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
converted to:

```yaml
regions:
  broker:
    namespace: eu-docker
  key_value_store:
    namespace: 1
  search:
    namespace: eu_search
```


### Applications section

{% info_block infoBox "Info" %}
    The same pattern is valid for all applications
{% endinfo_block %}

```yaml
 mportal:
    application: merchant-portal
    endpoints:
      mp.de.{{DOMAIN_ZONE}}:
        entry-point: MerchantPortal
        store: DE
        primal: true
        services:
          session:
            namespace: 7
      mp.at.{{DOMAIN_ZONE}}:
        entry-point: MerchantPortal
        store: AT
        services:
          session:
            namespace: 8
```

converted to:

```yaml
mportal:
  application: merchant-portal
  endpoints:
    mp.eu.{{DOMAIN_ZONE}}:
      region: EU
      <<: *frontend-auth
      entry-point: MerchantPortal
      primal: true
      services:
        session:
          namespace: 7
```

{% info_block infoBox "Verification" %}
Please make sure that you've migrated all the application by the pattern provided above.
{% endinfo_block %}

{% info_block infoBox "Info" %}
   The domain structure is changed to have an ability to switch between stores withing one domain.
{% endinfo_block %}

## Difference in console commands execution

In disabled Dynamic Multistore mode, console commands which somehow depends on store, were executed with `APPLICATION_STORE` environment variable, example:

```shell
APPLICATION_STORE=DE console search:setup:sources
```

In Dynamic Multistore mode, all the store aware console commands should be executed with `--store` parameter, example:

```shell
console search:setup:sources --store=DE
```

In case if store is not provided as a parameter, the command is executed for all stores within the current region.

For the custom console commands please follow the next rules:
- `Store(Facade|Client)::getCurrentStore()` should never be used in the code that console command executes.
- All store aware commands should implement `Spryker\Zed\Kernel\Communication\Console\StoreAwareConsole` and execute actions for specific store if store parameter is provided, or for all the stores in the region otherwise.
- It is recommended to use `--store` parameter instead of `APPLICATION_STORE` env variable, despite the support of env variable still exists.
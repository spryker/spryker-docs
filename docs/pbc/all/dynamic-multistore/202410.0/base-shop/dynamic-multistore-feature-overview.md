---
title: Dynamic Multistore
description: A list of features that are within Spryker Dynamic Multistore allowing you to create and manage multiple online stores from the Spryker Back Office.
last_updated: Nov 12, 2024
template: concept-topic-template
related:
   - title: Install Dynamic Multistore
     link: docs/pbc/all/dynamic-multistore/page.version/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html
   - title: Import minimum set of data for store
     link: docs/pbc/all/dynamic-multistore/page.version/base-shop/import-stores.html
   - title: Install the Dynamic Multistore Glue API
     link: docs/pbc/all/dynamic-multistore/page.version/base-shop/install-and-upgrade/install-the-dynamic-multistore-glue-api.html
   - title: Install Dynamic Multistore + the Marketplace MerchantPortal Core feature
     link: docs/pbc/all/dynamic-multistore/page.version/marketplace/install-dynamic-multistore-the-marketplace-merchant-portal-core.html    
---

*Dynamic Multistore* (DMS) lets you create and manage multiple stores within the same region in the Back Office. It streamlines the setup and maintenance of distinct stores tailored to various customer segments, regions, or product categories.

In the Back Office, in the **Administration&nbsp;<span aria-label="and then">></span> Stores**, you can view the list of stores in the current region. The **Stores** page shows all the stores within a specific region.

![managing-stores](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/managing-stores.png)

## Creating a store

You can create a new store in the Back Office.

![creating-a-store](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/creating-a-store.png)

## Assigning locales

When creating a store, you can assign locales and specify a default one for the store. This is useful for making the store accessible and user-friendly for different regions.

![assigning-locales](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/adding-locales.png)

## Adding currencies

To define which currencies the customers can you use, you can assign them to the store.

![adding-currencies](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/adding-currencies.png)

## Store settings

To define additional store settings in the **Settings** tab.
When creating a store, you can assign timezone per application or specify a default one.

## Publishing and synchronizing

When the new queue infrastructure is published, the store becomes visible on the Storefront.

## Assigning products and prices to stores

You can assign products and their prices to stores using the Back Office or other methods of creating products.

The following image shows how you can assign a product to a store.

![store-relation](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/store-relation.png)

The following image shows how you can assign a product price to a store.

![product-prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/product-prices.png)

## Viewing stores on the Storefront

The following example shows the store created in the Back Office being available on the Storefront.

![store-switcher](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/store-switcher.png)

The product that was assigned to the store in [Assigning products and prices to stores](#assigning-products-and-prices-to-stores) is available in this store.

![search-suggestions](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/search-suggestions.png)

![assigned-product-searchable-in-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/assigned-product-searchable-in-the-storefront.png)

## Assigning CMS pages

By assigning CMS pages to stores, you can define which stores they are shown in.

![assigning-a-cms-page-to-the-store](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/assigning-a-cms-page-to-the-store.png)

When such a CMS page is published, it's only visible in the store it's assigned to.

![cms-page-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/cms-page-on-the-storefront.png)

## Using the Storefront APIs

Normal storefront APIs can be used to fetch data from stores using the Store HTTP header, allowing access to Catalog Search or product details.

The following image shows the ability to call API endpoints with the exemplary "SECOND" store selected in the API call itself.

![storefront-api](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/storefront-api.png)

## Adding stores using data import


You can add a new store using data import or in the Back Office. Adding a store in the Back Office is easier and faster, but you have to add each store across all environments.

Using data import, you can configure a new store once and deploy it across all environments. For instructions on importing stores, see [Import data](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html#import-data).

When you add a new store, to enable store-related entities for customers, you need to assign them to the store. Some of the store related entities:
- Products
- Categories
- CMS entities
- Prices

To avoid manually assigning entities in the Back Office, you can assign them using data import. For more details, see [Import stores](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/import-stores.html).

## Differences in modes

This section describes the differences in different parts of application in DMS on and off modes.



## Differences between applications with and without Dynamic Multistore

In this example, EU region has DE and AT stores. US region has a US store. Dynamic Multistore introduces the following changes in this setup:

- URLs for Storefront, Back Office, Merchant Portal, and Glue API contain region instead of store name. For example–the URL of the Back Office is `https://backoffice.eu.mysprykershop.com` instead of `https://backoffice.de.mysprykershop.com`.

- RabbitMQ virtual hosts contain region instead of store. For example–`eu-docker` instead of `de-docker`.

![rabbitmq-virtual-hosts-non-dms](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/base-shop/dynamic-multistore-feature-overview.md/rabbitmq-virtual-hosts-non-dms.png)

![rabbitmq-virtual-hosts-dms](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/base-shop/dynamic-multistore-feature-overview.md/rabbitmq-virtual-hosts-dms.png)

- Jenkins job names contain region instead of store. For example–`EU_queue-worker-start` instead of `DE_queue-worker-start`.

![jenkins-jobs-non-dms](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/base-shop/dynamic-multistore-feature-overview.md/jenkins-jobs-non-dms.png)

![jenkins-jobs-dms](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/base-shop/dynamic-multistore-feature-overview.md/jenkins-jobs-dms.png)

- Elasticsearch indexes contain store as a part of the index name for Dynamic Multistore enabled and disabled modes.

![elasticsearch-indexes-non-dms](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/base-shop/dynamic-multistore-feature-overview.md/elasticsearch-indexes-non-dms.png)

![elasticsearch-indexes-dms](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/base-shop/dynamic-multistore-feature-overview.md/elasticsearch-indexes-dms.png)

- Redis keys contain store as a part of the key name for Dynamic Multistore enabled and disabled modes.

- When Dynamic Multistore is enabled, customers can switch between available stores for a region. When a customer changes a store, it's set to the `_store` query parameter. Using the query parameter, the store is added to session under the `current_store` key. It's used for fetching store-related data.

![storefront-store-switcher](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/base-shop/dynamic-multistore-feature-overview.md/storefront-store-switcher.png)



### Store context in different applications with Dynamic Multistore

All the applications work with the several stores within one region with the following differences:
- Back Office and Merchant Portal operate with data from all the stores within a region and don't require a store context.
- Storefront, GlueStorefront, and Glue require a store context and operate within only one provided store. If a store isn't provided, the default one is used.

### Cloud infrastructure differences

DMS doesn't affect cloud infrastructure. The only related changes are in the deployment files, which are described in the following sections.


### Deployment file differences

Applacation configurations are defined differently depending on whether DMS is on or off.

#### Environment variables configuration

DMS off:

```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy.dynamic-store-off -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r production.dynamic-store-off --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive.dynamic-store-off --no-ansi -vvv'
SPRYKER_YVES_HOST_DE: de.{{DOMAIN_ZONE}}
SPRYKER_YVES_HOST_AT: at.{{DOMAIN_ZONE}}
```

DMS on:

```yaml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r dynamic-store --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive --no-ansi -vvv'
SPRYKER_DYNAMIC_STORE_MODE: true
SPRYKER_YVES_HOST_EU: yves.eu.{{DOMAIN_ZONE}}
```

#### Regions configuration

DMS off:

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

DMS on:

```yaml
regions:
  broker:
    namespace: eu-docker
  key_value_store:
    namespace: 1
  search:
    namespace: eu_search
```


#### Applications configuration

The following examples show the difference for the `merchant-portal` application. The difference is similar for all the applications.

DMS off:

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

DMS on:

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

{% info_block infoBox "" %}

The domain structure in DMS on mode enables store switching within the same domain.

{% endinfo_block %}

### Differences in the execution of console commands

With DMS off, store-aware console commands are executed with the `APPLICATION_STORE` environment variable. Example:

```shell
APPLICATION_STORE=DE console search:setup:sources
```

With DMS on, all the store-aware console commands are executed with the `--store` parameter. Example:

```shell
console search:setup:sources --store=DE
```

If a store isn't provided as a parameter, the command is executed for all stores within a current region.

#### Rules for implementing custom console commands in environments with Dynamic Multistore

- `Store(Facade|Client)::getCurrentStore()` must not be used in the code the console command executes.
- All store-aware commands must implement `Spryker\Zed\Kernel\Communication\Console\StoreAwareConsole` and execute actions for a specific store if the store parameter is provided; if not provided, actions are executed for all the stores in the region.
- We recommend using the `--store` parameter instead of `APPLICATION_STORE` env variable; both methods are supported.


### Store-specific entities in Data Exchange API

There're no specific requirements, and the changes you need to make depend on the database structure. These entities should be handled in the same way as any other exposed through Data Exchange API database table.



## Data import performance

The number of stores affects data import speed: the more stores you have, the slower the data import. Importing products for 40 stores takes approximately 5 times longer than for 8 stores.

## Limitations

With Dynamic Multistore, the separated setup is only possible with stores belonging to different regions. To learn about setups, see [Multi-store setups](/docs/ca/dev/multi-store-setups/multi-store-setups.html).

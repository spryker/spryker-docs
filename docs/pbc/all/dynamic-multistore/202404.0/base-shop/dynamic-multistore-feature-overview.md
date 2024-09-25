---
title: Dynamic Multistore
description: Dynamic Multistore lets you create and manage multiple online stores from the Back Office.
last_updated: Sep 25, 2024
template: concept-topic-template
---

The *Dynamic Multistore* feature lets you create and manage multiple stores within the same region in the Back Office. It streamlines the setup and maintenance of distinct stores tailored to various customer segments, regions, or product categories.

{% info_block warningBox %}

Dynamic Multistore is currently running under an *Early Access Release*. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

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

## Adding of a new store via data import

Example for DE store configuration:

**data/import/common/{REGION}/store.csv**

```csv
name
DE
AT
```

| Column     | REQUIRED | Data Type | Data Example | Data Explanation |
|------------| --- | --- | --- | --- |
|name        |mandatory |string | DE | Define store name. |

Configure a new store as described here: [Import configuration for store](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html#import-data)


Adding a new store via the Back Office is easier and faster, but in this case, you should add this store across all environments.
Data import allows you to add and configure a new store once and deploy it across all environments.

Note that when you add a new store you should also assign all store-related entities to it for enabling them for customers:
- Products
- Categories
- CMS entities
- Prices
- etc.

To avoid manual assignment of entities in Back Office to the store you can use the data import for store-related entities as well.

See: [Import minimum set of data for store](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/import-stores.html)


## What is changed when DMS is enabled?

DMS enables the following changes to the project:

In represented examples below there are two regions: EU and US.

EU region has two stores: DE and AT. US region has one store: US.

- Urls for Yves, Back Office, Merchant Portal and Glue contain region instead of store name.
  
  Example for local environment: https://backoffice.eu.mysprykershop.com instead of https://backoffice.de.mysprykershop.com

- RabbitMQ virtual hosts contain region instead of store.
  
  For example eu-docker instead of de-docker.
  ![rabbitmq-virtual-hosts-non-dms]()
  ![rabbitmq-virtual-hosts-dms]()

- Jenkins job names contain region instead of store. 

  For example EU_queue-worker-start instead of DE_queue-worker-start.
  ![jenkins-jobs-non-dms]()
  ![jenkins-jobs-dms]()

- Elasticsearch indexes contain store as a part of the index name for DMS enabled and disabled modes.

- Redis keys contain store as a part of the key name for DMS enabled and disabled modes.

- When DMS is enabled customer can switch between available stores for a region.

  When customer changes a store it's set to a query param `_store`.

  Store is read from query param `_store` and set to session under the key `current_store`. It's used for fetching store-related data.
  ![yves-store-switcher]()

## Performance

The number of stores affects data import speed: the more stores you have the slower data import is.

Take into account data import request body limit when you import data for many stores.

## Related documents

- [Install Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html)

- [Import minimum set of data for store](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/import-stores.html) 

- [Install the Dynamic Multistore Glue API](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/install-the-dynamic-multistore-glue-api.html) 

- [Install Dynamic Multistore + the Marketplace MerchantPortal Core feature](/docs/pbc/all/dynamic-multistore/{{page.version}}/marketplace/install-dynamic-multistore-the-marketplace-merchant-portal-core.html)

---
title: Dynamic Multistore
description: Dynamic Multistore lets you create and manage multiple online stores from the Back Office.
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

The *Dynamic Multistore* feature lets you create and manage multiple stores within the same region in the Back Office. It streamlines the setup and maintenance of distinct stores tailored to various customer segments, regions, or product categories.

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

[Dynamic Multistore mode ON and OFF difference](/docs/pbc/all/dynamic-multistore/202410.0/base-shop/difference-between-modes.html).

## Data import performance

The number of stores affects data import speed: the more stores you have, the slower the data import. Importing products for 40 stores takes approximately 5 times longer than for 8 stores.

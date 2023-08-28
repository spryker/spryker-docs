---
title: Dynamic Multistore
description: Dynamic Multistore lets you create and manage multiple online stores from the Back Office.
last_updated: July 31, 2023
template: concept-topic-template
---

The *Dynamic Multistore* feature lets you create and manage multiple online stores within the same region of the Back Office installation. It streamlines the setup and maintenance of distinct stores tailored to various customer segments, regions, or product categories. 

In the following sections, you can learn more details about the capabilities of Dynamic Multistore.
## Viewing stores

In the Back Office, in the **Administration&nbsp;<span aria-label="and then">></span> Stores**, you can view the list of stores in the current region. The **Stores** page offers a consolidated view of all the stores within a specific region.

![managing-stores](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/managing-stores.png)

## Creating a store

You can create a new store with a specified name. For this, in the Back Office, go to **Administration&nbsp;<span aria-label="and then">></span> Stores** page and click **Create Store**. This functionality simplifies the process of adding new stores to the existing setup.

![creating-a-store](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/creating-a-store.png)

## Assigning locales

When creating a store, you can assign locales and specify a default one for this new store, which ensures that the store is accessible and user-friendly for different regions.

![assigning-locales](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/adding-locales.png)

## Adding currencies

The feature also allows the addition of currencies for the created store, ensuring that transactions can be conducted in various currencies as needed.

![adding-currencies](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/adding-currencies.png)

## Publishing and synchronizing

When the new queue infrastructure is published, the store becomes visible on the storefront.

## Assigning products and prices

You can assign products and their prices to a product using the Back Office UI or other methods of creating a new product in the system. This offers flexibility in managing the product catalog.

The following image shows how you can assign a product to an already existing store.

![store-relation](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/store-relation.png)

The following demonstrates shows how you can assign a product price to a specific store.

![product-prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/product-prices.png)

## Viewing the store on the storefront

The newly created store is viewable on the storefront, complete with the assigned products and prices.

The following example demonstrates the created store from the Back Office being in the store switcher.

![store-switcher](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/store-switcher.png)

The following images show that the assigned products to the newly created store are available on the storefront.

![search-suggestions](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/search-suggestions.png)

![assigned-product-searchable-in-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/assigned-product-searchable-in-the-storefront.png)
 
## Assigning CMS Pages

New stores can have CMS pages assigned, providing rich content experiences tailored to specific store needs.

The following image shows the ability to assign a store to a specific CMS page to be shown on the storefront.

![assigning-a-cms-page-to-the-store](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/assigning-a-cms-page-to-the-store.png)

The assigned CMS page is shown on the selected "SECOND" store that is selected on the Storefront.

![cms-page-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/cms-page-on-the-storefront.png)

## Utilizing storefront APIs

Normal storefront APIs can be used to fetch data from the newly created store via a Store HTTP header, allowing access to Catalog Search or product details.

The following image shows the ability to call API endpoints with the newly created "SECOND" store selected in the API call itself.

![storefront-api](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/storefront-api.png)

## Spryker Cloud compatibility

Spryker Cloud is fully equipped to run the dynamic multistore setup, ensuring a seamless experience across different platforms.

Dynamic Multistore removes the complexity of managing multiple stores, providing an intuitive interface and streamlined processes to manage various store creation and management aspects. It's a key component in enhancing scalability and flexibility in e-commerce operations.
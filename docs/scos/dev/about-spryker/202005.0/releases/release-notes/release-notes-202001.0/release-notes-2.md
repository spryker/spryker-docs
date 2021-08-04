---
title: Release Notes 202001.0
originalLink: https://documentation.spryker.com/v5/docs/release-notes-2020010
redirect_from:
  - /v5/docs/release-notes-2020010
  - /v5/docs/en/release-notes-2020010
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business level description of major new features and enhancements released in January of 2020.

For information about installing the Spryker Commerce OS see [Getting Started Guide](https://documentation.spryker.com/docs/en/dev-getting-started).

Check out our release notes video for the quick illustration of the new features and improvements:
<iframe src="https://fast.wistia.net/embed/iframe/o6ff0j2obk" title="Spryker Release Notes 202001.0" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="640" height="480"></iframe>



## Spryker Commerce OS

### Split Delivery
Spryker now supports **splitting of orders** across multiple delivery addresses during the checkout process.
Starting from this release, besides delivering an order to one address, a customer can choose delivery to multiple addresses as well. 
A back-office user can also **split an order** into multiple shipments or modify shipment data on the order details page.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image12.png){height="" width=""}

#### Compatibility Issues
**Split delivery** is not compatible with the following features:

* Manual Order Entry
* Sales-quantity module with the functionality of order quantity threshold

#### Documentation
[Split Delivery](https://documentation.spryker.com/docs/en/split-delivery)

### Decimal Stock
Spryker now supports product stock definition as **decimal** instead of integer. You can define a product stock as
* 1 or 1.00
* 0.0123456789
* 415.51
* 1000
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image3.png){height="" width=""}

#### Documentation
[Packaging Units](https://documentation.spryker.com/docs/en/packaging-units-202001) 

### Improved Packaging Unit
You can set a **decimal amount** for your packages, which allows you to sell products in flexible quantities.
The requirement is to share your package stock with another concrete product. In the previous implementation of **Packaging Units**, it was required to add the *Lead Concrete Product* that was holding the stock for all other concrete products. With the new release creating the *Lead Concrete Product* is optional.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image5.png){height="" width=""}

#### Documentation
[Packaging Units](https://documentation.spryker.com/docs/en/packaging-units-202001) 

### Improved Scheduled Prices
The **Scheduled Price** feature allows you to define a price for your products that will take effect in the future. Create a scheduled price manually in the Back Office or import them in bulk via CSV files. Starting from this release, you can manage your previously imported **Scheduled Prices** directly in the Back Office.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image1.png){height="" width=""}

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image8.png){height="" width=""}

#### Documentation

* [Scheduled Prices](https://documentation.spryker.com/docs/en/scheduled-prices-201907)
* [Creating Scheduled Prices in the Back Office](https://documentation.spryker.com/docs/en/creating-scheduled-prices-201907)
* [Managing Scheduled Prices in the Back Office](https://documentation.spryker.com/docs/en/managing-scheduled-prices)

### Multi-store Improvements
Spryker increases the number of features that you can manage per store.

* First, you can see your stores in the Back Office.
* Second, you can now decide which Payment Methods your customers can use in the checkout process for a given store.
* Third, decide which Warehouses to assign to which stores.
* Fourth, you can now set which Delivery Methods are available to your customers in the checkout process for a given store.
* Fifth, you can perform all those actions in the Back Office.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image7.png){height="" width=""}

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image9.png){height="" width=""}

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image2.png){height="" width=""}

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image6.png){height="" width=""}

#### Documentation

* [Multiple Stores](https://documentation.spryker.com/docs/en/multiple-stores)
* [Inventory](https://documentation.spryker.com/docs/en/about-inventory)
* [Warehouse Management](https://documentation.spryker.com/docs/en/multiple-warehouse-stock)
* [Managing Payment Methods in the Back Office](https://documentation.spryker.com/docs/en/managing-payment-methods )
* [Managing Delivery Methods in the Back Office](https://documentation.spryker.com/docs/en/creating-and-managing-shipment-methods )

***
## CMS
### CMS Templates with Content Slots
Spryker’s Content Management System had a significant upgrade in this release. Our new feature, **Templates with Slots**, incorporates a coherent and flexible way of managing content across the entire Storefront.  
A **Template with Slots** defines the layout and placement of content with a predefined arrangement of Slots. A Slot is a dedicated area for content in a Template, and the Content Manager can easily embed content - CMS Blocks into Slots of different Templates by using the Back Office. 
When a **Template with Slots** defines multiple storefront pages, the Block assignment to a Slot could be narrowed down using Visibility Conditions (e.g., Product SKU, Category ID, CMS Page Name).
Out-of-the-box, the B2C and the B2B Demos Shops now come with the following Templates: Home Page, Category pages, Product Detail pages, CMS Pages, and Footer. 
Another significant advantage of the **Templates with Slots** feature is that it offers a better integration pattern of a Technology Partner CMS within Spryker. A partner-specific Slot Widget fetches and renders content created in the Technology Partner CMS editor. 
Moreover, a project can mix both e-commerce content created in Spryker, and rich media content created in a 3rd party CMS.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image11.png){height="" width=""}

#### Documentation
[Templates and Slots](https://documentation.spryker.com/docs/en/templates-slots)
***
## B2B
### Adding Shipment Cost for the Approval Process
In the **Approval Process**, previously, it was not possible to add shipment cost before submitting an order for approval. This has been solved by moving the Approval action to the Summary page of the checkout and adding shipment cost for it.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image4.png){height="" width=""}


#### Documentation 
[Approval Process](https://documentation.spryker.com/docs/en/approval-process-202001 )

### Configurable Bundle
Configurable Bundle provides a guiding tool to simplify the purchasing of complex product combinations and brings a smooth shopping experience. It allows companies to sell online complex combinations of products that would otherwise require a physical presence in the store.
Configurable bundles are compatible with both B2B & B2C stores but at this point have been only integrated into the B2B Demo Shop.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+202001.0/image10.png){height="" width=""}

#### Documentation
[Configurable Bundle](https://documentation.spryker.com/docs/en/configurable-bundle) 
***
## Spryker Glue REST API
In this release, we continue exposing the Storefront functionality for both B2C and B2B.
New endpoints and relevant improvements to the existing ones are now available.

### Product Labels API
There are many scenarios where shop owners want to display labels on product items to increase customers’ engagement and conversion. Product labels were already exposed through the Abstract Product API, and now you can make use of them also with concrete products, cart items, both on guest and regular carts, wishlist items, related products, up-selling products, and alternative products.

#### Documentation
[Product Labels API](https://documentation.spryker.com/docs/en/accessing-product-labels) 

### Product Discounts API
Shop owners need to be able to offer their customers discounts according to different conditions related to their shopping cart and also to provide them with vouchers to save money on the purchase of specific products or related to their shopping volume. With this API, we enable you to let your customers redeem vouchers and manage them in their carts and checkout and to apply discount rules to their carts according to the predefined conditions. 

#### Documentation
[Discounts API](https://documentation.spryker.com/docs/en/discounts-and-promotions) 

#### Ratings and Reviews API
Ratings and reviews are critical for the customer’s purchase decision. Shop owners want to display ratings and reviews related to products on the product page and rating averages on product previews.  With this API, you will be able to display the average rating of a product on the product page, to retrieve the existing ratings and reviews with their abstract and concrete products, to let your customers add a review to a product, to display the average rating and the number of reviews with related products, alternative products, up-selling products, wishlist items and on your catalog’s product reviews.

#### Documentation
[Ratings and Reviews API](https://documentation.spryker.com/docs/en/retrieving-ratings-and-reviews)

### Product Options API
With this API, you will be able to display a product with its different options each of them with its own price, product option group, and tax set, to display the item in the cart or guest cart with the selected option and to make use of those through the checkout process.

#### Documentation
[Product Options API](https://documentation.spryker.com/docs/en/retrieving-and-applying-product-options)

### Improved Navigation URLs

Navigation vanity URLs are paramount for marketing purposes. To extend your navigation capabilities and make consistent use of them through all channels and touchpoints, resources such as abstract products and category-nodes now include their vanity URLs in their attributes. The vanity URLs are also included when they appear on search suggestions results. 

#### Documentation
[Search Engine Friendly URLs](https://documentation.spryker.com/docs/en/using-search-engine-friendly-urls)

### Additional API Functionality Provided in this Release:

* Convert guest cart to customer cart on log-in
* Unauthenticated customer permissions
* Spryks for code generation

#### Documentation

* [Assigning Guest Cart to Registered Customer](https://documentation.spryker.com/docs/en/managing-guest-carts#assigning-guest-cart-to-registered-customer)
* [Getting the list of protected resources](https://documentation.spryker.com/docs/en/getting-the-list-of-protected-resources)
* [Managing Customer Access to API Resources](https://documentation.spryker.com/docs/en/managing-customer-access-to-api-resources)

***
## Docker-SDK

There is a new supported service -  **Swagger UI**. The Swagger UI service together with the following existing services now support configuration: 
* Redis
* Swagger UI
* ElasticSearch
* Kibana
* RabbitMQ

It is also possible to choose a specific version of a service to be used.

For production setups, now you can generate optimized docker images. 

#### Documentation

* [Getting Started with Docker](https://documentation.spryker.com/docs/en/getting-started-with-docker#running-production)
* [Deploy File Reference](https://documentation.spryker.com/docs/en/deploy-file-reference-10)
* [Spryker in Docker Services](https://documentation.spryker.com/docs/en/services)


***
## Technical Enhancements
### Elasticsearch 6 Support
The Search module is the main entry point for search customizations boosting sales and emphasizing the best of E-commerce catalog of available products.
With this release, Spryker enabled support for **Elasticsearch 6**, while leaving a room for migration by keeping BC to Elasticsearch 5.6.

Even though Elasticsearch is one of the most powerful search engines available, sometimes its functionalities can not satisfy the most extreme requirements. That’s why from now on Search module supports pluggable search engines. This way, project integrations with Fact Finder, Sphinx, or any other search engine is available and supported by the Spryker infrastructure.

#### Documentation: 
[Search Migration Guides](https://documentation.spryker.com/docs/en/search-migration-concept)

### By-pass KV-storage
Separated Backend and Frontend in Spryker communicate over denormalized distributed datasets with underlying Publish & Synchronize mechanism. This powerful data distribution infrastructure emits data to Storage and Search and enables Frontends’ consumers to reach data without hitting relational DB with the increased performance. Though in some cases (typically B2B), amounts of data are large, and Storage (Redis by default) growth is not justified, especially when a number of customers and RPM is not high.

With this release Publish & Synchronize enables direct access to denormalized data sets stored in a relational DB. Storage consumption could be decreased dramatically with a simple configuration.

To get most of this feature, we recommend to set up master-slave replication and point the Storage to the slave instance, avoiding additional load on the master instance.

#### Documentation
[HowTo - Disable Key-value Storage and use the Database Instead](https://documentation.spryker.com/docs/en/howto-disable-key-value-storage-and-use-the-database-instead)

### Spryker Application
In the previous release, our infrastructure provided **Spryker Application** Instead of deprecated Silex. Spryker Application is served with Application Plugins, which should be used instead of Silex Service Providers. This release completes the migration by providing last missing Application Plugins: security, router, validation, messenger, propel, event dispatcher.

From now on, Silex components become optional, with a clear migration path. A project needs to remove deprecated Service Providers with relevant Application Plugins. Silex Service Providers are still supported until Q3 2020, just make sure your projects depend on a Spryker fork: `spryker/silexphp`, instead of archived `silex/silexphp`.

#### Documentation:
[Silex Migration Guides](https://documentation.spryker.com/docs/en/silex-replacement-201903)

### Health Checks
The Heartbeat functionality is replaced with health checks. There is a new set of endpoints you can use to run health checks for your application services. The endpoints are closed by default for security purposes.

#### Documentation:
[Health Checks](https://documentation.spryker.com/docs/en/health-checks)

### Queue Manager Optimization
The **Queue manager** functionality is extended with the command that makes queue worker exit right after processing a queue. If the queue is empty, the queue worker exits instead of waiting for the configured execution time to pass.

#### Documentation:
[Tutorial - Handling Data - Publish and Synchronization - Spryker Commerce OS](https://documentation.spryker.com/docs/en/t-handling-data-publish-and-sync-scos#7--queue)


### Search Initialization Improvement
To improve usability, the `vendor/bin/console setup:search` command which has been generating two processes, was split into two commands:
    * `console search:create-indexes`
    * `console search:setup:index-map`

#### Documentation
[Search Initialization Improvement](https://documentation.spryker.com/4/docs/search-initialization-improvement)

### PHP Update
PHP continuously develops and gets more exciting features. Also, old versions get deprecated, such as PHP7.1, which lost support by the end of 2019. From now on, Spryker modules will require **>=PHP7.2**. Please make sure your project doesn’t rely on deprecated technology and applies required infrastructural upgrades.
While PHP7.2 is a minimum required version, we recommend looking at 7.3 and 7.4 as 7.2 is close to EOL. Such technology upgrades could require additional project refactoring, so please include them in your planning. For more information on the PHP versions see [here](https://www.php.net/supported-versions.php). 

Check out [Documentation Updates](https://documentation.spryker.com/docs/en/documentation-updates ) for all the updates to documentation made with this release.



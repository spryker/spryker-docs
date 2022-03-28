---
title: Configurable Product feature overview
description: All the details about the Configurable Product feature of Spryker.
last_updated: Aug 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/configurable-product-feature-overview
originalArticleId: 331ffea1-510d-4edc-b059-f3c146549fc9
redirect_from:
  - /2021080/docs/configurable-product-feature-overview
  - /2021080/docs/en/configurable-product-feature-overview
  - /docs/configurable-product-feature-overview
  - /docs/en/configurable-product-feature-overview
---

{% info_block errorBox "Beta version" %}

This is the Beta version of the feature and is therefore subject to changes.

{% endinfo_block %}

The *Configurable Product* feature introduces a new type of product that can be customized by customers—a configurable product.

The feature allows you to sell complex products with modular designs or services. For example, if you sell clothes, you can allow your customers to define the material, color, and add their name to the product. Or, if you are selling a service, you can allow them to select a preferred date and time of the service delivery.

## Configurable product

A *configurable product* is a product that customers can customize based on the parameters provided in a [product configurator](#product-configurator).

For example, if you are selling a workstation installation service, before purchasing it, a customer can select a preferred date and time of installation.

### Configuring a configurable product

To configure a product, from the *Product Details* page, a customer opens a product configurator. After selecting and saving the configuration, the customer is redirected back to the product details page. The selected configuration is displayed on the product details page, and the customer can add the configured product to the cart.

![configure-button-on-product-details-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configure-button-on-product-details-page.png)

After adding a configurable product to cart, a customer can configure the product from the *Cart* page.

![configure-button-on-the-cart-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configure-button-on-the-cart-page.png)

### Creating configurable products

Configurable products are created in two steps:

1. A Back Office user creates regular products or a developer imports them. See [Creating an abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) to learn how they create products in the Back Office or [File details: product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html) to learn about the file they import.
2. A developer converts regular products into configurable products by importing configuration parameters. See [File details: product_concrete_pre_configuration.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/configurable-product-import-category/file-details-product-concrete-pre-configuration.csv.html) to learn about the file they import.


### Managing configurable products

A Back Office user can add configurable products to pages, categories, and content items as regular products.

In the product catalog, they can see which products are configurable ones and edit them as regular products. However, they cannot change configuration parameters.

![configurable-product-entry-in-the-back-office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configurable-product-entry-in-the-back-office.png)

In the orders, they can see which products are configurable ones. They can also see the configuration of each product, but they cannot change the selected parameters.

![order-with-a-configurable-product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/order-with-a-configurable-product.png)


## Product configurator

A *product configurator* is a tool that allows customers to customize the product parameters provided by the shop owner or product manufacturer.

You can create a product configurator as a part of your shop or integrate a third-party one. The feature is shipped with an exemplary product configurator. The exemplary product configurator allows configuring *Date* and *Preferred time of the day* parameters.

![examplary-product-configurator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/examplary-product-configurator.png)


### How Spryker interacts with a product configurator

A Spryker shop interacts with product configurators using parameters. When a customer is redirected from a Spryker shop to a configurator page, the shop passes the parameters related to the customer and the product. When a customer is redirected back to the shop, the configurator passes the updated parameters back.

The behavior of the configurator is based on the parameters passed by a shop. For example, a shop passes the `store_name` parameter. If a customer is redirected from a US store, the language of the configurator is English. Also, the shop passes the URL of the page the customer is redirected from. After the customer saves the configuration, the configurator uses this URL to redirect them back to the same page.

The selected configuration is also passed back to the shop as parameters. The shop uses the parameters to display the selected configuration on all related pages and process the order with the product.

#### Parameter types

There are two parameter types: regular parameters and display parameters.

*Regular parameters* are used by shops to interact with product configurators.

*DIsplay parameters* are used to display product configuration on the Storefront and in the Back Office.

Display parameter values are usually converted from regular parameter values to show data in a user-friendly format. For example, a product configurator passes the regular parameter to a shop: `"time_of_the_day": 3`. Since, in the configurator, `3` stands for `afternoon`, the shop displays **Preferred time of the day: Afternoon**.

![display-data-in-a-configurator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/display-data-in-a-configurator.png)


### Availability calculation in a product configurator

The availability of a configurable product is based on the selected configuration.

A customer selects the quantity of a product in a configurator or in a shop. If a configurator allows a customer to select a product quantity, it passes the selected quantity to the shop as a parameter. Otherwise, it passes the availability as a parameter, and the customer selects the product quantity in the shop.

If a configurator does not pass availability, [regular product availability](/docs/marketplace/user/features/{{page.version}}/marketplace-inventory-management-feature-overview.html) is used.

### Price calculation in a product configurator

The price of a configurable product is based on the selected configuration. When a customer selects a configuration, the price of the product in the selected configuration is displayed. After a customer saves the configuration, the price of the product in the selected configuration is passed to the shop. The customer is redirected back to the shop where they can purchase the product for the price.

If a price is not provided by the configurator, [a regular product price](/docs/scos/user/features/{{page.version}}/prices-feature-overview/prices-feature-overview.html) is used.

### Complete and incomplete configuration

When importing configurable products, a developer defines if configuration is complete for each product.

If configuration is complete, on entering the *Product details* page, a Storefront user sees a message that the configuration is complete. They can purchase the product without opening the configurator and selecting the parameters.

![configurtion-complete-message](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configurtion-complete-message.png)


If configuration is not complete, on entering the *Product details* page, a Storefront user sees a message that the configuration is not complete. To purchase the product, they open the configurator and select a configuration.

![incomplete-configurtion-message](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/incomplete-configurtion-message.png)


Even if all the parameter values are [pre-configured](#pre-configured-parameter-values), but configuration is not complete, a customer has to open the configurator and save the configuration. They are not required to change the pre-configured values though.

![configuration-is-not-complete-message-with-pre-configured-parameters](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configuration-is-not-complete-message-with-pre-configured-parameters.png)

#### Request for quote with a configurable product

The information in [Complete and incomplete configuration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/2117927245/WIP+Configurable+Product+feature+overview#Complete-and-incomplete-configuration) applies to [Quotation Process & RFQ](/docs/scos/user/features/{{page.version}}/quotation-process-feature-overview.html) functionalities. A Storefront user can only request a quote for a product with a complete configuration.

### Pre-configured parameter values

When a developer creates configurable products by importing them, they can pre-configure parameter values. If a Storefront user chooses to configure such a product, they start with the pre-configured parameter values and can change them.

If a developer also defines that the configuration of such a product is complete, on entering the *Product details* page, a Storefront user sees the pre-configured parameter values. They can add the product to cart without adjusting the configuration.

If a developer defines that the configuration of such a product is incomplete, on entering the *Product details* page, a Storefront user does not see the pre-configured parameter values. However, they are still assigned to the product. The Storefront user has to configure the product, but they do not have to change the pre-configured parameter values.

## Configurable product on the Storefront

Storefront users configure a product on the Storefront as follows:

![configurable-product-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configurable-product-on-the-storefront.gif)


{% info_block warningBox "Developer guides" %}

Are you a developer? See [Configurable Product feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/configurable-product-feature-walkthrough.html) for developers.

{% endinfo_block %}

---
title: Configurable Product feature overview
description: All the details about the Configurable Product feature of Spryker.
last_updated: Nov 26, 2021
template: concept-topic-template
---

{% info_block errorBox "Beta version" %}

This is the Beta version of the feature and is therefore subject to changes.

{% endinfo_block %}

The *Configurable Product* feature introduces a new type of product that can be customized by customers—a configurable product.

The feature enables you to sell complex products with modular designs or services. For example, if you sell clothes, you can allow your customers to define the material and color and add their name to the product. Or, if you are selling a service, you can allow them to select a preferred date and time of the service delivery.

## Configurable product

A *configurable product* is a product that customers can customize based on the parameters provided in a [product configurator](#product-configurator).

For example, if you are selling a workstation installation service, before purchasing it, customers can select a preferred date and time of installation.

### Configuring a configurable product

To configure a product, from the *Product Details* page, a customer opens a product configurator by clicking the **Configure** button. Then, they are redirected back to the *Product Details* page and can add the configured product to the wishlist or cart.

![configure-button-on-product-details-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configure-button-on-product-details-page.png)

After adding a configurable product to the cart, a customer can change the product configuration from the *Cart* page.

![configure-button-on-the-cart-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configure-button-on-the-cart-page.png)

### Creating configurable products

Configurable products are created in two steps:

1. A Back Office user creates regular products, or a developer imports them. See [Creating an abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) to learn how they create products in the Back Office or [File details: product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html) to learn about the file they import.
2. A developer converts regular products into configurable products by importing configuration parameters. See [File details: product_concrete_pre_configuration.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/configurable-product-import-category/file-details-product-concrete-pre-configuration.csv.html) to learn about the file they import.


### Managing configurable products

A Back Office user can add configurable products to pages, categories, and content items as regular products.

In the product catalog, they can see which products are configurable ones and edit them as regular products. However, a Back Office user cannot change configuration parameters.

![configurable-product-entry-in-the-back-office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configurable-product-entry-in-the-back-office.png)

In the orders, A Back Office can see which products are configurable ones. They can also see the configuration of each product, but they cannot change the selected parameters.

![order-with-a-configurable-product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/order-with-a-configurable-product.png)


## Product configurator

A *product configurator* is a tool that allows customers to customize the product parameters provided by the shop owner or product manufacturer.

You can create a product configurator as a part of your shop or integrate a third-party one. The feature is shipped with an exemplary product configurator. The exemplary product configurator allows configuring the *Date* and *Preferred time of the day* parameters.

![examplary-product-configurator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/examplary-product-configurator.png)


### How a Spryker shop interacts with a product configurator

A Spryker shop interacts with product configurators using parameters. When a customer is redirected from a Spryker shop to the configurator page, the shop passes the customer and product parameters. When the customer is redirected back to the shop, the configurator passes the updated parameters back.

The behavior of the configurator is based on the parameters passed by a shop. For example, a shop passes the `store_name` parameter. If a customer is redirected from a US store, the language of the configurator is English. Also, the shop passes the URL of the page the customer is redirected from. After they save the configuration, the configurator uses this URL to redirect them back to the same page.

The selected configuration is also passed back to the shop as parameters. The shop uses the parameters to display the selected configuration on all related pages and process the order with the product.

### Parameter types

There are two parameter types: configuration parameters and display parameters.

*Configuration parameters* are used by shops to interact with product configurators.

*Display parameters* are used to display product configuration on the Storefront and in the Back Office.

Display parameter values are usually converted from configuration parameter values to show data in a user-friendly format. For example, a product configurator passes the configuration parameter to a shop: `"time_of_the_day": 3`. Since, in the configurator, `3` stands for `afternoon`, the shop displays **Preferred time of the day: Afternoon**.

![display-data-in-a-configurator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/display-data-in-a-configurator.png)


### Availability calculation in a product configurator

The availability of a configurable product is based on the selected configuration.

A customer selects the quantity of a product in a configurator or in a shop. If a configurator allows them to select a product quantity, it passes the selected quantity to the shop as a parameter. Otherwise, it passes the availability as a parameter, and they select the product quantity in the shop.

If a configurator does not pass availability, [regular product availability](/docs/marketplace/user/features/{{page.version}}/marketplace-inventory-management-feature-overview.html) is used.

### Price calculation in a product configurator

The price of a configurable product is based on the selected configuration. When a customer selects a configuration, the price of the product in the selected configuration is displayed. After they save the configuration, the price of the product in the selected configuration is passed to the shop. The customer is redirected back to the shop where they can purchase the product for the price.

If a price is not provided by the configurator, [a regular product price](/docs/scos/user/features/{{page.version}}/prices-feature-overview/prices-feature-overview.html) is used.

### Complete and incomplete configuration

When [importing configurable products](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/configurable-product-import-category/file-details-product-concrete-pre-configuration.csv.html), a developer defines if the configuration is complete for each product.

If the configuration is complete, on entering the *Product details* page, a customer sees a message that the configuration is complete. By default, the message is followed by the first 3 descriptive attributes set in the configurator. Under the attributes, there are the **Show** and **Hide** buttons, which allow expanding and collapsing the remaining attributes, respectively. In case the configuration is complete, the customer can purchase the product without opening the configurator and selecting parameters.

![configurtion-complete-message](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/Features/Configurable+Product+feature+overview/configurtion-complete-message.png)


If the configuration is not complete, on entering the *Product details* page, a customer sees a message that the configuration is not complete. To purchase the product, they open the configurator and select a configuration. However, they can add a product with incomplete configuration to a wishlist. In this case, they can finish the configuration from the *Wishlist* page.

![incomplete-configurtion-message](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/incomplete-configurtion-message.png)


Even if all the parameter values are [pre-configured](#pre-configured-parameter-values), but configuration is not complete, a customer has to open the configurator and save the configuration. They are not required to change the pre-configured values though.

![configuration-is-not-complete-message-with-pre-configured-parameters](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configuration-is-not-complete-message-with-pre-configured-parameters.png)

#### Request for quote with a configurable product

The information in [Complete and incomplete configuration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/2117927245/WIP+Configurable+Product+feature+overview#Complete-and-incomplete-configuration) applies to [Quotation Process & RFQ](/docs/scos/user/features/{{page.version}}/quotation-process-feature-overview.html) functionalities. A customer can only request a quote for a product with a complete configuration.

### Pre-configured parameter values

When a developer creates configurable products by importing them, they can pre-configure parameter values. If a customer chooses to configure such a product, they start with the pre-configured parameter values and can change them.

If a developer also defines that the configuration of such a product is complete, on entering the *Product details* page, a customer sees the pre-configured parameter values. They can add the product to the cart without adjusting the configuration.

If a developer defines that the configuration of such a product is incomplete, on entering the *Product details* page, a customer does not see the pre-configured parameter values. However, they are still assigned to the product. The customer has to configure the product, but they do not have to change the pre-configured parameter values.

## Configurable product on the Storefront

Customers configure a product on the Storefront as follows:

![configurable-product-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configurable-product-on-the-storefront.gif)


{% info_block warningBox "Developer guides" %}

Are you a developer? See [Configurable Product feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/configurable-product-feature-walkthrough.html) for developers.

{% endinfo_block %}

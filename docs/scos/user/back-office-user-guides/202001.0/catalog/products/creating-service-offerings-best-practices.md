---
title: Creating Service Offerings Best Practices
last_updated: Aug 13, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v4/docs/creating-service-offerings
originalArticleId: e4aa386e-e05c-49eb-8b95-09e5099636f6
redirect_from:
  - /v4/docs/creating-service-offerings
  - /v4/docs/en/creating-service-offerings
---

This article describes how you can create products that can or have to include service assistance.
Imagine the scenarios:

*Scenario 1*: you sell equipment that requires specific installation, and offer optional installation services for this equipment. The installation services can either be free or chargeable.

*Scenario 2*: you sell equipment that requires specific installation, and installation by your service technician is required for the warranty to apply. This means, when buyers add specific products to cart, you want the installation service to be automatically included in the cart as well.

Let’s consider how you can handle both of the scenarios for your store.

## Prerequisites
The first thing you need to do to start selling a product with either free or chargeable service is to create the product.

To create the product, do the following:

1. Go to **Products > Products** section and click Create Product on the top-right corner of the page.
2. Populate the necessary fields in the **General, Price & Tax, Variants, SEO, Image** tabs. See [Creating an Abstract Product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) for details on the tabs and their values.
3. Click **Save**. Your product is now created and will appear in the list of products in the **Products > Products** section.
4. Activate the product:
    1. In the list of products in the **Products > Products** section, find your product and click **Edit** in the *Actions* column for it.
    2. In the **Variants** tab, click **Edit** for the product(s) you want to make active.
    3. On the **Edit Concrete Product** page, click **Activate**. The abstract product will now also become active.
5. Make sure your product is visible searchable in the Storefront by going through the checklist in the HowTo - [Make a Product Searchable and Shown on the Storefront](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-make-a-product-searchable-and-shown-on-the-storefront.html) article.

Now that you have the product, you can proceed with offering services to it.

## Creating a Product with a Service Offering

There are two ways of how you can create a product with a services offering:

* Offer the service as a product option.
* Create a configurable bundle that would include the product and the service.
* Custom solution for your project.

See below for information and step-by-step guides on each of the approaches.

### Service as a Product Option

{% info_block infoBox "Note" %}

This approach is suitable only for Scenario 1 - that is, when the service is optional.

{% endinfo_block %}

You can make the service, in our example, the installation service, a [product option](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-options/product-options.html) of the product you sell. In this case, the installation service will not be a separate product, but an optional part of the product. This means that buyers can decide on their own if they need the service.

To implement this approach, you need to create the Service product option and tie it to the respective product.

To create the product option, do the following:

1. Go to the **Products > Product Options** section and click **Create product option** in the top right corner.
2. Populate all necessary fields in **General** tab. See [Creating a Product Option](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html) for details on the fields and their values.
3. In the **Products** tab, find the product you want to tie the option to, and check the checkbox in the very right column of the table with the product.
4. Click **Save**. The product option is now created and appears in the **Product option list** on the **Products > Product Options** page.
5. Activate the option by clicking **Activate** in the *Actions* column of the **Product option list**.

That’s it. The option appears for the product on the Storefront:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Creating+Service+Offerings/service-as-option-storefront.png)

{% info_block infoBox "Note" %}

Keep in mind that depending on the use case you want to implement for your shop, additional development effort may be required on your project's side. For example, if you don’t want to allow buyers to add the Service option more than once if they have a set of specific products in carts.

{% endinfo_block %}

### Custom Project Solution

{% info_block infoBox "Note" %}

This approach can be applied to both Scenario 1 and Scenario 2 - that is when the service is optional or obligatory.

{% endinfo_block %}

If you need an approach that would best suit your specific business needs, we recommend your development team to implement a custom solution for your project. The custom solution can be handled as follows:

#### 1. Identify the respective products with labels

First of all, you need to somehow identify the products for which the custom solution will be applied. We recommend doing this via product labels. For this, create specific labels for the products that require service from your side. The labels can be, for example, *free service, installation service, 1-day service*, etc. See [Creating a Product Label](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/creating-product-labels.html) for details on how to create labels and assign products to them.

#### 2.  Override the Add to Cart functionality

At this step, you need the development team to change the default *Add to Cart* functionality to meet your project’s needs.

The  *Add to Cart* functionality implies a call to both Yves and Zed, which means the development team can execute a back-end logic for it. This logic could be triggered when products with specific labels are added to the cart. For example, it could automatically add the service product to the cart. It could also imply a check, that if another product with the same label is added to cart, the service product is not added, or another service product (for example, a service of another type with another price) is added to cart instead. You could also have a logic that if they buy more than a specific number of the products, the service product is for free.

Even though this approach requires the most effort, it also the most efficient as it can be tailored to your specific needs.

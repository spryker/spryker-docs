---
title: Creating service offerings- best practices
originalLink: https://documentation.spryker.com/2021080/docs/creating-service-offerings
redirect_from:
  - /2021080/docs/creating-service-offerings
  - /2021080/docs/en/creating-service-offerings
---

This article describes how you can create products that can or have to include service assistance.
Imagine the scenarios:

*Scenario 1*: you sell equipment that requires specific installation, and offer optional installation services for this equipment. The installation services can either be free or chargeable.

*Scenario 2*: you sell equipment that requires specific installation, and installation by your service technician is required for the warranty to apply. This means, when buyers add specific products to cart, you want the installation service to be automatically included in the cart as well.

Let’s consider how you can handle both of the scenarios for your store.

## Prerequisites
The first thing you need to do to start selling a product with either free or chargeable service is to create the product.

To create the product, do the following:

1. Go to **Catalog > Products** section and click Create Product on the top-right corner of the page.
2. Populate the necessary fields in the **General, Price & Tax, Variants, SEO, Image** tabs. See [Creating an Abstract Product](https://documentation.spryker.com/docs/creating-an-abstract-product) for details on the tabs and their values.
3. Click **Save**. Your product is now created and will appear in the list of products in the **Catalog > Products** section.
4. Activate the product:
    1. In the list of products in the **Catalog > Products** section, find your product and click **Edit** in the *Actions* column for it.
    2. In the **Variants** tab, click **Edit** for the product(s) you want to make active.
    3. On the **Edit Concrete Product** page, click **Activate**. The abstract product will now also become active.
5. Make sure your product is visible and searchable in the Storefront by going through the checklist in the HowTo - [Make a Product Searchable and Shown on the Storefront](https://documentation.spryker.com/docs/ht-make-product-shown-on-frontend-by-url#howto---make-a-product-searchable-and-shown-on-the-storefront) article.

Now that you have the product, you can proceed with offering services to it.

## Creating a product with a service offering

There are two ways of how you can create a product with a service offering: 

* Offer the service as a product option.
* Create a configurable bundle that would include the product and the service.
* Custom solution for your project.

See below for information and step-by-step guides on each of the approaches.

### Service as a product option
{% info_block infoBox "Note" %}

This approach is suitable only for Scenario 1 - that is, when the service is optional.

{% endinfo_block %}
You can make the service, in our example, the installation service, a [product option](https://documentation.spryker.com/docs/product-options-management) of the product you sell. In this case, the installation service will not be a separate product, but an optional part of the product. This means that buyers can decide on their own if they need the service. 

To implement this approach, you need to create the Service product option and tie it to the respective product.

To create the product option, do the following:

1. Go to the **Catalog > Product Options** section and click **Create product option** in the top right corner.
2. Populate all necessary fields in **General** tab. See [Creating a Product Option](https://documentation.spryker.com/docs/creating-a-product-option#creating-a-product-option) for details on the fields and their values.
3. In the **Products** tab, find the product you want to tie the option to, and check the checkbox in the very right column of the table with the product.
4. Click **Save**. The product option is now created and appears in the **Product option list** on the **Catalog > Product Options** page.
5. Activate the option by clicking **Activate** in the *Actions* column of the **Product option list**.

That’s it. The option appears for the product on the Storefront:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Creating+Service+Offerings/service-as-option-storefront.png){height="" width=""}
{% info_block infoBox "Note" %}

Keep in mind that depending on the use case you want to implement for your shop, additional development effort may be required on your project's side. For example, if you don’t want to allow buyers to add the Service option more than once if they have a set of specific products in carts.

{% endinfo_block %}
### Service as a part of a configurable bundle list
{% info_block infoBox "Note" %}

This approach is suitable only for Scenario 1 - that is, when the service is optional.

{% endinfo_block %}
One more way to have a product with an optional service offering would be to make the product a [configurable bundle](https://documentation.spryker.com/docs/configurable-bundle). It means that you create a product (for example, equipment) and suggest another product (Installation service) as a bundle. To create such a configurable bundle product, follow the steps below.

1. Create the *Installation Service* product as a usual abstract product, like you did in the [Prerequisites](https://documentation.spryker.com/docs/creating-service-offerings#prerequisites) section. Make sure you set the **Availability** as *Never out of stock*. See [Managing Products Availability](https://documentation.spryker.com/docs/managing-products-availability#managing-products-availability) for details on how to do that.
{% info_block infoBox "Note" %}

If you don’t want to display the Service products in the Storefront so buyers can not find them in the products catalog, don’t check the Searchable checkbox for it in the **General** tab of the **Create/Edit Concrete Product** page.

{% endinfo_block %}
2. Create a [Configurable Bundle Template](https://documentation.spryker.com/docs/configurable-bundle-feature-overview#configurable-bundle-template) with two [slots](https://documentation.spryker.com/docs/configurable-bundle-feature-overview#configurable-bundle-slots) - one for the physical products, and one for the service:
    1. Go to **Merchandising > Configurable Bundle Templates** section and click Create New Template in the top right corner.
    2. On the **Template details** page, enter the name of your bundle template in the **Name** field for the corresponding locale.
    3. Click **Save**. A new tab Slots will appear on the same page.
    4. Click **Add Slot** in the top right corner on the **Template details** page.
    5. Enter the name of your slot in the **Name** field for the corresponding locale.
    6. Click **Save**. Two tabs will be added to the Slot details page: **Assign Categories** and **Assign Products**.
    7. Assign the entire categories or individual physical products to the slot. Make sure to assign all products for which you want to offer the specific service. See [Adding Products to a Slot](https://documentation.spryker.com/docs/managing-configurable-bundle-templates#editing-the-slot-for-a-configurable-bundle-template) for details on how to assign categories and products.
    8. Go back to the **Merchandising > Configurable Bundle Templates** section and click **Edit** for the just created Configurable bundle template.
    9. Click **Add slot** and add the Service product to it.
    10. Click **Save**. The Configurable bundle template with two slots, one for physical products and one for service, is now created.
 3. Activate the Configurable Bundle Template by clicking **Activate** in the *Actions* column of the **Configurable Bundle Templates** page.
 The configurable bundle now appears on the **Configurable Bundle List** page on the Storefront. Buyers can select the products and add the service if they want:
 
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Creating+Service+Offerings/configurable-bundle-list.png){height="" width=""}

{% info_block infoBox "Note" %}

Depending on your specific business needs, you might need additional development effort for your project. For example, if you want to exclude the case when buyers access the service product and add it to the cart without corresponding physical products.

{% endinfo_block %}
### Custom project solution
{% info_block infoBox "Note" %}

This approach can be applied to both Scenario 1 and Scenario 2 - that is when the service is optional or obligatory.

{% endinfo_block %}
If you need an approach that would best suit your specific business needs, we recommend your development team to implement a custom solution for your project. The custom solution can be handled as follows:

#### 1. Identify the respective products with labels
First of all, you need to somehow identify the products for which the custom solution will be applied. We recommend doing this via product labels. For this, create specific labels for the products that require service from your side. The labels can be, for example, *free service, installation service, 1-day service*, etc. See [Creating a Product Label](https://documentation.spryker.com/docs/creating-a-product-label#creating-a-product-label) for details on how to create labels and assign products to them.

#### 2.  Override the Add to Cart functionality
At this step, you need the development team to change the default *Add to Cart* functionality to meet your project’s needs.

The  *Add to Cart* functionality implies a call to both Yves and Zed, which means the development team can execute a back-end logic for it. This logic could be triggered when products with specific labels are added to the cart. For example, it could automatically add the service product to the cart. It could also imply a check, that if another product with the same label is added to cart, the service product is not added, or another service product (for example, a service of another type with another price) is added to cart instead. You could also have a logic that if they buy more than a specific number of the products, the service product is for free.

Even though this approach requires the most effort, it also the most efficient as it can be tailored to your specific needs.


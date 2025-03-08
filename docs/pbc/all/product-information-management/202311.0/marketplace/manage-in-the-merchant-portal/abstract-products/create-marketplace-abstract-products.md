---
title: Create marketplace abstract products
last_updated: May 05, 2022
description: This document describes how to create marketplace abstract products in the Merchant Portal.
template: back-office-user-guide-template
redirect_from:
  - /docs/marketplace/user/merchant-portal-user-guides/202311.0/products/abstract-products/creating-marketplace-abstract-product.html
related:
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-feature-overview.html
---

This document describes how to create marketplace abstract products.

## Prerequisites

To start working with marketplace abstract products, go to **Merchant Portal&nbsp;<span aria-label="and then">></span> Products**.

This document contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Creating a marketplace abstract product

To create a new abstract product:

1. On the **Products** page, click **Create Product**. The **Create Abstract Product** drawer opens.
2. Enter an **SKU Prefix**.
3. Enter a **Name** for the default locale. The rest of the locales are defined once the product is created.
4. Depending on whether your abstract product requires adding variants or no, take one of the following steps:

  - If you are creating an abstract product that doesn't require variants, select **Abstract product has 1 concrete product**. The **Create an Abstract Product with 1 Concrete Product** drawer opens.
      1. On the **Create an Abstract Product with 1 Concrete Product** drawer, enter a **Concrete Product SKU**.
      2. Enter a **Concrete Product Name**.
      3. To finish the product creation, click **Create**.

      ![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/merchant+portal+user+guides/Products/create-abstract-product-with-one-variant-mp.gif)


      {% info_block warningBox "Warning" %}

      You can not save an abstract product unless it's accompanied by at least one concrete product.

      {% endinfo_block %}

    -  If the abstract product that you are creating requires variants, select **Abstract product has multiple concrete products**.
        1. Select a super attribute that defines the variation of your concrete products.
        2. In the field next to the super attribute you've selected, select one or more values for each super attribute. Upon adding the super attribute values, the preview of the concrete products is displayed.

        {% info_block infoBox "Info" %}

        Removing a super attribute or its value removes the related concrete products or concrete product values from the preview.

        {% endinfo_block %}

        3. Optional: Add more super attributes by clicking the **Add** button. Repeat this step until you select at least one value for each selected super attribute.

          ![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/merchant+portal+user+guides/Products/create-abstract-product-with-multiple-variants-mp.gif)

        {% info_block infoBox "Info" %}

        You can remove a concrete product from the preview list by clicking the **Remove** icon.

        {% endinfo_block %}

5. Сlick **Create**.

6. Click **Next**.

Only active marketplace products are displayed on the Marketplace Storefront. To activate your marketplace product, see [Managing marketplace concrete products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/edit-marketplace-concrete-products.html).

### Reference information: Create Abstract Product drawer

The following table describes attributes you select and enter on the **Create Abstract Product** drawer.

| ATTRIBUTE             | DESCRIPTION       |
| ----------------------------- | ------------------------------------ |
| SKU prefix                                      | Unique abstract product identifier that is used to track unique information related to the product.|
| Name                                            | The name of the abstract product that is displayed for the product on the Storefront. |
| Abstract product has 1 concrete product         | Select this option when you want your abstract product to have a single concrete product. |
| Abstract product has multiple concrete products | Select this option when you want your abstract product to have multiple concrete products. |

### Reference information: Create an Abstract Product with 1 Concrete Product drawer

The following table describes attributes you select and enter on the **Create an Abstract Product with 1 Concrete Product** drawer.

| ATTRIBUTE            | DESCRIPTION             |
| --------------------- | ------------------------------------ |
| Concrete Product SKU     | Unique product identifier that is used to track unique information related to the product. |
| Autogenerate SKU         | Select the attribute if you want the SKU to be generated automatically. By default, -1 is added to the abstract product SKU prefix. For example, `product-1` |
| Concrete Product Name    | The name of the concrete product that is displayed for the product on the Storefront. |
| Same as Abstract Product | Select the attribute if you want the name of the abstract product to be used for the concrete product as well. |

### Reference information: Create an Abstract Product with Multiple Concrete Products drawer

This section describes attributes you select and enter on the **Create an Abstract Product with 1 Concrete Product** drawer.

You can select as many super attributes as you need and define one or more values for them. When you select a product attribute value, a concrete product based on this value is displayed. In the **Concrete Products' Preview** pane you can view the products to be created.

By selecting **Autogenerate SKUs**, the SKU numbers for the variants are generated automatically, based on the SKU prefix of their abstract product.

By selecting **Same Name as Abstract Product**, the name of the abstract product is used for the concrete products as well.


### Sending the product for approval

For the new product to be available on the Storefront, it needs to be approved. To send the product for approval, do the following:

1. Next to the abstract product, you want to send approval for, hover over the three dots and click **Manage Product** or just click the line. This takes you to the *[Product name]* drawer, *Abstract Product Details* tab.
2. In the right top corner of the drawer, click **Send for Approval**.

{% info_block infoBox "Info" %}

This button is only displayed if the product status is *Draft*. To learn more about the product statuses, see, [Marketplace Product Approval feature overview](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/marketplace-product-approval-process-feature-overview.html).

{% endinfo_block %}

## Next steps

- [Approve the marketplace product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-products.html#sending-the-product-for-approval)
- [Manage abstract product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-products.html)

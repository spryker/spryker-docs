---
title: General Product Safety Regulation
description: The General product Safety Regulation (GPSR) and how Spryker can help customers meet the requirements for this new regulation.
last_updated: Dec 3, 2024
template: concept-topic-template
---

General Product Safety Regulation (GPSR) is a new key instrument in the EU product safety legal framework, replacing the current General Product Safety Directive and the Food Imitating Product Directive from December 13, 2024. It modernizes the EU general product safety framework and addresses the new challenges posed to product safety by the digitalization of economies.

GPSR requires that all consumer products on the EU markets are safe and establishes specific obligations for businesses to ensure it.

For a full version of regulations, see [General Product Safety Regulation](https://commission.europa.eu/business-economy-euro/doing-business-eu/eu-product-safety-and-labelling/product-safety/general-product-safety-regulation_en).

## Spryker’s GPSR obligations

Spryker doesn't fall into a category of directly obliged parties but Spryker’s customers do. So Spryker’s obligations are limited to enabling its customers to meet the requirements under the regulation. Customers are fully responsible for ensuring compliance with the regulations. However, Spryker has features to help customer with achieving compliance.

For example, using the Product Attributes feature, you can record any required product-specific information, like manufacturer details, product identifiers, or postal and email addresses, including for a responsible person within EU. You can also apply this feature to the warning or safety instructions. If you need to add additional details to multiple Product Details pages, you can use CMS blocks.

## Examples of handling compliance using Spryker

There're different obligations depending on your company's role with regard to the product, like manufacturer, distributor, or economic operator in distance sale. The following are examples on how Spryker features can enable you to comply with the obligations.

> Show the name, registered trade name, or trademark of the manufacturer (and, where the manufacturer is not established in the EU, of the responsible person in the EU), postal address, and electronic contact details  

To comply with this regulation, follow the steps:

1. In the Back Office, create a product attribute with the following settings:
  * **INPUT TYPE**: **textarea**
  * Select **Allow input any value other than predefined ones**
For detailed instructions, see [Create product attributes](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).

2. Assign the attribute to the relevant products of a specific manufacturer. For detailed instructions, see the following docs:
  * [Assign product attributes to abstract products](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/assign-product-attributes-to-abstract-products-and-product-bundles.html)
  * [Assign product attributes to product variants](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/assign-product-attributes-to-product-variants.html)

3. To add additional information to the products of a specific manufacturer, create a CMS block and add the needed information. For instructions, see [Create CMS blocks](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html).
4. Assign the block to a product slot and select SKUs of the manufacturer. For instructions, see [Assigning CMS blocks to slots](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/manage-in-the-back-office/manage-slots.html).

> Provide information allowing the identification of the product, including pictures, product type, identifiers

To comply with this regulation, follow the steps:

1. To add images to products, use one of the following docs:
  * [Create abstract products and product bundles](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html)
  * [Creating product variants](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html)
2. To add product type and identifiers, [create product attributes](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html) with the needed identifiers.
3. Assign the attributes to relevant products in one of the following ways:
  * [Assign product attributes to abstract products](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/assign-product-attributes-to-abstract-products-and-product-bundles.html)
  * [Assign product attributes to product variants](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/assign-product-attributes-to-product-variants.html)

> Indicate clear warnings or safety information to be affixed to the product  

To comply with this regulation, follow the steps:

1. To add safety information to the products of a specific manufacturer, create a CMS block and add the needed information. For instructions, see [Create CMS blocks](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html).
2. Assign the block to a product slot and select the needed SKUs. For instructions, see [Assigning CMS blocks to slots](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/manage-in-the-back-office/manage-slots.html).

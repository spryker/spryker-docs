---
title: Akeneo PIM Integration App
description: Learn how you can import products from Akeneo to your Spryker projects with Akeneo PIM Integration App
last_updated: August 7, 2023
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/akeneo-pim-integration-app.html
---

The Akeneo PIM Integration App lets you import products from Akeneo PIM to your Spryker project.

You can import the following product data:

- General product information: Name, description, SKU, locale, stores
- Product hierarchy (abstract product information with its variants)
- Digital assets (for example, product images)
- Product categories
- Product attributes
- Product super attributes
- Product relations
- Product labels
- Price types

You can specify the product data you want to import from Akeneo when configuring the data mapping between Akeneo and SCCOS in the Spryker Middleware powered by Alumio.
For more information, see [Configure data mapping between Akeneo and SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html).

You can initiate the product import manually whenever you need, set up the scheduler to automatically import data on a regular basis, or use webhooks to enable the Akeneo PIM to send data to Alumio in real-time. For details on how to do that, see [Create tasks and import products from Akeneo to SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos.html).

## Prerequisites for the Akeneo PIM Integration App

To use the Akeneo PIM Integration App, you need to have the Spryker Middleware powered by Alumio. To obtain it, reach out to [Spryker support](https://spryker.com/support/).
The Akeneo PIM Integration App works with B2C and B2B business models of Spryker Cloud Commerce OS (SCCOS). At the moment, it doesn't cover the Marketplace business models.

## Importing product structure from Akeneo to Spryker

Akeneo lets you create products with up to 3 levels of enrichment, while Spryker lets you select multiple super attributes to enrich product information and create product variants.

For example, if you want to create a T-shirt with varying sizes and colors, here is how it's created in Akeneo:
*Root* Product Model = T-shirt
*Level 1* Product Models (created by varying colour) = Yellow T-shirt, red T-shirt
*Level 2* Product Variants (with variant: size) = Yellow T-shirt small, yellow T-shirt large, red T-shirt small, red T-shirt Large

When importing this data into Spryker, the following applies:
- Level 1 Product Models from Akeneo are imported as abstract products into Spryker. In our example, this means that two abstract products are created in SCCOS: a yellow T-shirt and a red T-shirt.
- Level 2 variants are imported as concrete products of the abstract product. In our example, this means that two concrete products are created per each product abstract in Spryker:
- For the yellow T-shirt abstract product, a yellow T-shirt small and a yellow T-shirt large concrete products
- For the red T-shirt abstract product, a red T-shirt small and a red T-shirt large concrete products

To identify the Product Model (abstract product) for the different Akeneo products upon import, the parent identifier is saved as the abstract SKU in Spryker. This way, the hierarchy and relationship between the products is preserved after the import.

The following table represents the high-level mapping of product data between Akeneo and Spryker:

| Akeneo                | Spryker          | Note                                                                                                                                                           |
|-----------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product Model         | Abstract Product |                                                                                                                                                                |
| Family                | Abstract Product |                                                                                                                                                                |
| Product               | Concrete Product |                                                                                                                                                                |
| Family Variant        | Concrete Product | Spryker uses the family variant structure to determine the relationship between the Abstract and Concrete Product                                                |
| Family Variant (axes) | Super Attribute  | Spryker uses the family variant axes to identify the super attribute. However, for the sake of accuracy, make sure to specify the super attributes when configuring the [Memo Base to Spryker - Product - Akeneo Preprocessor](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html#memo-base-to-spryker---product---akeneo-preprocessor) |
| Category              | Category         |                                                                                                                                                                |
| Attribute             | Attribute        |                                                                                                                                                                |
| Localized Labels      | Locales          |                                                                                                                                                                |

## Next steps
[Configure the Akeneo PIM Integration App](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app.html)

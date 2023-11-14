---
title: Akeneo PIM Integration App
description: Import products from Akeneo to Spryker with Akeneo PIM Integration App
last_updated: August 7, 2023
template: concept-topic-template
---

The Akeneo PIM Integration App lets you import products from Akeneo PIM to your Spryker project.

Prerequisites
To use your Akeneo PIM Integration App you need to have the Spryker Middleware powered by Alumio.
The Akeneo PIM Integration App works with B2C or B2B business models of Spryker Cloud Commerce. Currently it doesn't cover the Marketplace business models.

You can import the following product data:

- General product information: Name, description, SKU, locale, stores
- Abstract product information with its variants
- Product categories
- Product attributes 
- Product super attributes
- Product images 
- Product relations
- Product labels
- Price types

For more information on the product data you can import, see

You can initiate the products import manually whenever you need, or set up the scheduler to automatically import data on a regular basis. For details on how to do that, see [Create tasks and import products from Akeneo to SCCOS](/docs/pbc/all/data-exchange/{{page.version}}/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos.html).

## Importing product structure from Akeneo to Spryker 

Akeneo lets you create products with up to 3 levels of enrichment, while Spryker allows users to select multiple super attributes to enrich product information and create product variants. 

For example, if you want to create a T-shirt with varying sizes and colors, here is how it is created in Akeneo:
*Root* Product Model = T-shirt
*Level 1* Product Models (created by varying colour) = Yellow T-shirt, red T-shirt
*Level 2* Product Variants (with variant: size) = Yellow T-shirt small, yellow T-shirt large, red T-shirt small, red T-shirt Large

When importing this data to Spryker, the following applies:
- Level 1 Product Models from Akeneo are imported as  Abstract products into Spryker. In our example, this implies that two abstract products are created in SCCOS: a yellow T-shirt and a red T-shirt.
- Level 2 variants are imported as concretes of the Abstract. In our example, this means that two concrete products are created per product abstract in Spryker: 
- For the yellow T-shirt abstract product, a yellow T-shirt small and a yellow T-shirt large concrete products
-  For the red T-shirt abstract product, a red T-shirt small and a red T-shirt large concrete products


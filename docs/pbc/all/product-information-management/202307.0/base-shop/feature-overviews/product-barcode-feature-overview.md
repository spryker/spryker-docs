---
title: Product Barcode feature overview
description: The Barcode Generator can be used for any kind of entity, and by default, we provide a solution for products.
last_updated: Jul 23, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/product-barcode-feature-overview
originalArticleId: 6d6d1bee-375f-4767-a866-a7d6f28eeaa1
redirect_from:
  - /2021080/docs/product-barcode-feature-overview
  - /2021080/docs/en/product-barcode-feature-overview
  - /docs/product-barcode-feature-overview
  - /docs/en/product-barcode-feature-overview
  - /docs/scos/user/features/202200.0/product-barcode-feature-overview.html
  - /docs/scos/user/features/202307.0/product-barcode-feature-overview.html
  - /docs/product-barcode
  - /docs/scos/dev/feature-walkthroughs/202200.0/product-barcode-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202307.0/product-barcode-feature-walkthrough.html
  - /docs/pbc/all/product-information-management/202307.0/feature-overviews/product-barcode-feature-overview.html
---

The *Product Barcode* feature lets you create barcodes for any kind of entity. By default, barcodes are only generated for [products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html).

A barcode is a square or rectangular image consisting of a series of parallel black lines (bars) and white spaces of varying widths that can be read by a scanner and printed. Barcodes are applied to entities as a means of quick identification.
![Barcode example](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Barcode+Generator/Barcode+Generator+Feature+Overview/barcode.png)

By default, barcodes are generated based on product SKUs using the [Code128](https://en.wikipedia.org/wiki/Code_128) format.

Though, Spryker highly provides customizable solutions through plugins that let you change the setup.

For more information about the product types we differentiate in product abstraction, see [Product feature overview](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html).

{% info_block errorBox %}

In your project, you can also implement the QR code functionality by creating similar plugins.

{% endinfo_block %}

Barcodes are dynamically generated for concrete products, which ensures that barcodes are immediately valid.

Also, depending on whether a customer chooses a product bundle or configurable bundle, the number of barcodes differs:
* If a customer purchases a product bundle, it's always assigned only one barcode, regardless of the quantity of the products within the bundle.
* If a customer purchases a configurable bundle, each product within the configurable bundle is assigned a separate unique barcode.

The following image demonstrates how barcodes are assigned depending on whether it's a product bundle or a configurable bundle.

![product-bundle-vs-configurable-bundle](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/features/product-barcode-feature-overview/product-bundle-versus-configurable-bundle.png)

You can view the barcodes in the Back Office, in the **Catalog&nbsp;<span aria-label="and then">></span> Product Barcodes** section. You can not perform any other actions on the barcodes, as they are generated automatically once a new concrete product is added to the system.

You can see the Product ID, product name, SKU, and barcode itself.

The barcodes help a store administrator update product stock numbers according to the actual information provided by the warehouse.

Creating barcodes requires two main prerequisites:

1. *Unique product codes for each product you offer*. These can be UPC codes that identify manufactured goods, unique SKU numbers that you use to track inventory your way, or other identifying numbers.
2. *A system that lets you input codes to create barcodes*. Your codes need to be entered into a device or software system that can translate the numeric or alphanumeric code into a scannable barcode.

Nowadays, B2B businesses face extraordinary challenges as more and more consumers are making comparisons of various ecommerce applications. To stay on top of the industry trends, improve customer experience and increase sales, every business must innovate with a deep understanding of their customer’s physical, emotional, and financial needs and triggers.

Barcodes are often overlooked as a way to cut costs and save time. A valuable and viable choice for businesses looking to improve efficiency and reduce overhead, barcodes are both cost-effective and reliable. Both inexpensive and user-friendly, barcodes provide an indispensable tool for tracking a variety of data, from pricing to inventory. The ultimate result of a comprehensive barcoding system is a reduction in overhead.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Viewing product barcodes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/view-product-barcodes.html)  |

| MIGRATION GUIDES|
|---------|
| [Migrating from CodeItNow to BarcodeLaminas](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/replace-the-codeitnow-with-the-barcodelaminas-module.html) |

---
title: Product Barcode Feature Overview
description: The Barcode Generator can be used for any kind of entity, and by default, we provide a solution for products.
last_updated: Sep 14, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/barcode-generator-feature-overview
originalArticleId: 2b9d9d5f-d48a-49ab-970e-34c32793b334
redirect_from:
  - /v5/docs/barcode-generator-feature-overview
  - /v5/docs/en/barcode-generator-feature-overview
  - /v5/docs/barcode-generator
  - /v5/docs/en/barcode-generator
---

The Barcode Generator can be used for any kind of entity, and by default, we provide a solution for products.

## What is a barcode?

A barcode is a square or rectangular image consisting of a series of parallel black lines (bars) and white spaces of varying widths that can be read by a scanner and printed. Barcodes are applied to entities as a means of quick identification.
![Barcode example](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Barcode+Generator/Barcode+Generator+Feature+Overview/barcode.png)

In the default configuration, barcodes are generated based on the SKU of a concrete product using [Code128](https://en.wikipedia.org/wiki/Code_128) format. Though, Spryker provides highly customizable solutions through plugins with the help of which the setup can be changed.

{% info_block infoBox %}

You can read more about the product types we differentiate in [Product Abstraction](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html)

{% endinfo_block %}

{% info_block errorBox %}

In your project, you can also implement QR codes functionality by creating similar plugins.

{% endinfo_block %}

Barcodes are dynamically generated for concrete products. This ensures that barcodes are immediately valid.

The feature also has plugins support to change the way the barcodes are generated. This includes support for different barcode formats.

The barcodes will help the store administrator to update the product stock numbers according to the actual information provided by the warehouse.

Creating barcodes requires 2 main prerequisites:

1. **Unique product codes for each product you offer –** These can be UPC codes that identify manufactured goods, unique SKU numbers that you use to track inventory your way, or other identifying numbers.
2. **A system that lets you input codes to create barcodes –** Your codes need to be entered into a device or software system that can translate the numeric or alphanumeric code into a scannable barcode.

Nowadays, B2B businesses are faced with extraordinary challenges as more and more consumers are making comparisons of various e-commerce applications. To stay on top of the industry trends, improve customer experience and increase sales, every business must innovate with a deep understanding of their customer’s physical, emotional and financial needs and triggers.

Barcodes are often overlooked as a way to cut costs and save time. A valuable and viable choice for businesses looking to improve efficiency and reduce overhead, barcodes are both cost-effective and reliable. Both inexpensive and user-friendly, barcodes provide an indispensable tool for tracking a variety of data, from pricing to inventory. The ultimate result of a comprehensive barcoding system is a reduction in overhead.

<!-- Last review date: Oct, 26-- by Vitaliy Kirichenko, Oksana Karasyova -->

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Viewing product barcodes](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-barcodes/viewing-product-barcodes.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Product Barcode feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-barcode-feature-walkthrough.html) for developers.

{% endinfo_block %}

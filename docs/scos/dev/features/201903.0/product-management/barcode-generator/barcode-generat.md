---
title: Barcode Generator Feature Overview
originalLink: https://documentation.spryker.com/v2/docs/barcode-generator-feature-overview
redirect_from:
  - /v2/docs/barcode-generator-feature-overview
  - /v2/docs/en/barcode-generator-feature-overview
---

The Barcode Generator can be used for any kind of entity, and by default, we provide a solution for products.

## What is a barcode?

A barcode is a square or rectangular image consisting of a series of parallel black lines (bars) and white spaces of varying widths that can be read by a scanner and printed. Barcodes are applied to entities as a means of quick identification.
![Barcode example](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Barcode+Generator/Barcode+Generator+Feature+Overview/barcode.png){height="" width=""}

In the default configuration, barcodes are generated based on the SKU of a concrete product using [Code128](https://en.wikipedia.org/wiki/Code_128) format. Though, Spryker provides highly customizable solutions through plugins with the help of which the setup can be changed.

{% info_block infoBox %}
You can read more about the product types we differentiate in [Product Abstraction](/docs/scos/dev/features/201903.0/product-management/product-abstrac
{% endinfo_block %}.)

{% info_block errorBox %}
In your project, you can also implement QR codes functionality by creating similar plugins.
{% endinfo_block %}

Barcodes are dynamically generated for concrete products. This ensures that barcodes are immediately valid.

The feature also has plugins support to change the way the barcodes are generated. This includes support for different barcode formats.

The barcodes will help the store administrator to update the product stock numbers according to the actual information provided by the warehouse.

<!-- Last review date: Oct, 26-- by Vitaliy Kirichenko, Oksana Karasyova -->

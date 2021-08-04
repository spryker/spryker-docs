---
title: Product Barcode feature overview
originalLink: https://documentation.spryker.com/2021080/docs/product-barcode-feature-overview
redirect_from:
  - /2021080/docs/product-barcode-feature-overview
  - /2021080/docs/en/product-barcode-feature-overview
---

The *Product Barcode*  feature allows creating barcodes for any kind of enity. By default, barcodes are only generated for [products](https://documentation.spryker.com/docs/product-feature-overview).


## What is a barcode?

A barcode is a square or rectangular image consisting of a series of parallel black lines (bars) and white spaces of varying widths that can be read by a scanner and printed. Barcodes are applied to entities as a means of quick identification.
![Barcode example](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Barcode+Generator/Barcode+Generator+Feature+Overview/barcode.png){height="" width=""}

By default, barcodes are generated based on product SKUs using the [Code128](https://en.wikipedia.org/wiki/Code_128) format. 

{% info_block infoBox %}
You can read more about the product types we differentiate in [Product Abstraction](https://documentation.spryker.com/docs/product-abstraction
{% endinfo_block %}.)

{% info_block errorBox %}
In your project, you can also implement QR codes functionality by creating similar plugins.
{% endinfo_block %}

Barcodes are dynamically generated for concrete products. This ensures that barcodes are immediately valid.

The feature also has plugins support to change the way the barcodes are generated. This includes support for different barcode formats.

The barcodes will help the store administrator to update the product stock numbers according to the actual information provided by the warehouse.


Creating barcodes requires 2 main prerequisites:

1. **Unique product codes for each product you offer –** These can be UPC codes that identify manufactured goods, unique SKU numbers that you use to track inventory your way, or other identifying numbers.
2. **A system that lets you input codes to create barcodes –** Your codes need to be entered into a device or software system that can translate the numeric or alphanumeric code into a scannable barcode.



Nowadays, B2B businesses face extraordinary challenges as more and more consumers are making comparisons of various e-commerce applications. To stay on top of the industry trends, improve customer experience and increase sales, every business must innovate with a deep understanding of their customer’s physical, emotional, and financial needs and triggers.

Barcodes are often overlooked as a way to cut costs and save time. A valuable and viable choice for businesses looking to improve efficiency and reduce overhead, barcodes are both cost-effective and reliable. Both inexpensive and user-friendly, barcodes provide an indispensable tool for tracking a variety of data, from pricing to inventory. The ultimate result of a comprehensive barcoding system is a reduction in overhead.

The Barcode Generator can be used for any kind of entity, and by default, Spryker provides a solution for products.
***
**What is a barcode?**
A barcode is a square or rectangular image consisting of a series of parallel black lines (bars) and white spaces of varying widths that can be read by a scanner and printed. Barcodes are applied to entities as a means of quick identification.

In the default configuration, barcodes are generated based on the SKU of a concrete product using the Code128 format. Though, Spryker provides highly customizable solutions through plugins with the help of which the setup can be changed.

Barcodes are dynamically generated for concrete products. This ensures that barcodes are immediately valid.

You can see the barcodes in the **Catalog > Product Barcodes** section. The section is designed as a review; thus no actual actions are performed here. The barcode is generated automatically once a new concrete product is added. 

You can see Product ID, product name, SKU, and the barcode itself.

## If you are:

<div class="mr-container">
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/viewing-product-barcodes" class="mr-link">View product barcode details</a></li>
            </ul>
        </div>
    </div>
</div>

<!-- Add a link Enable Barcode Generator for your project. The IG was never written.  -->

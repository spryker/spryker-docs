---
title: Prices overview
originalLink: https://documentation.spryker.com/2021080/docs/prices-overview
redirect_from:
  - /2021080/docs/prices-overview
  - /2021080/docs/en/prices-overview
---

A price can be attached to an abstract product as well as to a concrete product. The price is stored as an integer, in the smallest unit of the currency (e.g. for Euro that would be cents).

Each price is assigned to a price type ( e.g. gross price, net price ) and for a price type there can be one to n product prices defined. Price type entity is used to differentiate between use cases: for example we have DEFAULT and ORIGINAL type where we use it for sale pricing.

The price can have gross or net value which can be used based on a price mode selected by customer in Yves. You can have shop running in both modes and select net mode for business customer, for example. Price also has currency and store assigned to it.
![Price calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_calculation.png){height="" width=""}

## Price inheritance

As a general rule, if a concrete product doesn’t have a specific entity stored, then it inherits the values stored for its abstract product. This means that when getting the price entity for a specific product, first a check is made if a price is defined for the SKU corresponding to that product: if yes, then it returns that price, but if not, then it queries an abstract product linked to that product and checks if it has a price entity defined.

If it still can’t find a price, then it throws an exception (basically this shouldn’t happen if the products have been exported and are up to date).

The diagram bellow summarizes the logic for retrieving the price for a product:
![Price retrieval logic](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_retrieval_logic.png){height="" width=""}

## Price calculation

The concerns for the product price calculation are the following :

* retrieve valid price for the product
* calculate amount of tax

price for the options that were selected for the product (e.g.: frame, fabric, etc.)
For more information, see [Checkout Calculation](https://documentation.spryker.com/docs/calculation-3-0).


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/prices-feature-integration" class="mr-link">Enable Prices by integrating the Prices feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-prices-api-feature-integration" class="mr-link">Integrate the Product Price Glue API into your project</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-product-pricecsv" class="mr-link">Import product prices</a></li>
                <li><a href="https://documentation.spryker.com/docs/retrieving-abstract-product-prices" class="mr-link">Retrieve abstract product prices via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/retrieving-concrete-product-prices" class="mr-link">Retrieve concrete product prices via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/howto-handle-twenty-five-million-prices-in-spryker-commerce-os" class="mr-link">Learn how to handle twenty five million prices in Spryker Commerce OS</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/creating-abstract-products-and-product-bundles" class="mr-link">Define prices when creating an abstract product or a product bundle</a></li>
                <li><a href="https://documentation.spryker.com/docs/editing-abstract-products#editing-prices-of-an-abstract-product" class="mr-link">Edit prices of an abstract product</a></li>
                <li><a href="https://documentation.spryker.com/docs/creating-concrete-products" class="mr-link">Define prices when creating a concrete product</a></li>
                <li><a href="https://documentation.spryker.com/docs/editing-a-product-variant#editing-a-product-variant" class="mr-link">Edit prices of a concrete product</a></li>
            </ul>
        </div>
    </div>
</div>

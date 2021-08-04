---
title: Standard filters overview
originalLink: https://documentation.spryker.com/2021080/docs/standard-filters-overview
redirect_from:
  - /2021080/docs/standard-filters-overview
  - /2021080/docs/en/standard-filters-overview
---

E-commerce solutions usually offer a huge product catalog to display products and their variations. To help buyers find the products they are looking for in the catalog, we have the **Standard Filters** feature.

With Standard Filters, you can filter the products according to the specified price range, product ratings, product labels, color, material, brand etc.
![Filter Attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Standard+Filters/filter-attributes-b2c.png){height="" width=""}

## Filter types
In Spryker Commerce OS, the following filter types exist:

* **Single-select** - allows a user to select only one filter option.
![Single Select](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Standard+Filters/single-select-b2c.gif){height="" width=""}

* **Multi-select** - allows selecting several variants simultaneously.
![Multi Select](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Standard+Filters/multi-select-b2c.gif){height="" width=""}

* **Range** - filters data in the dimension from the maximum and minimum value. In the current implementation of our demo shop, the range filter is applied to the abstract product prices.
![Range Filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Standard+Filters/range-b2c.gif){height="" width=""}

Products appropriate for the active filters are displayed in the results.

Filter preferences can be configured in the **Back Office > Search and Filters > Filter Preferences**. Filter options depend on the attributes configured for the products. 

## Current constraints
Price Range Filter is not supported with the Merchant Relations, that is why this filter is not included in the B2B demo shop. However, in [the B2C demo shop](https://documentation.spryker.com/docs/en/demoshops#b2b-demo-shop), you can still filter the products using the price range filter.


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
               <li><a href="https://documentation.spryker.com/docs/managing-filter-preferences" class="mr-link">Manage filter preferences</a></li>           
            </ul>
        </div>
    </div>
</div>

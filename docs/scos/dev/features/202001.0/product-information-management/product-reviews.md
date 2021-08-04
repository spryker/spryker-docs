---
title: Product Reviews
originalLink: https://documentation.spryker.com/v4/docs/product-reviews
redirect_from:
  - /v4/docs/product-reviews
  - /v4/docs/en/product-reviews
---

The Product Reviews feature allows customers to add reviews and ratings to abstract products. A dedicated Zed Admin UI allows reviews and ratings to be supervised. Rating information can be used for sorting and filtering products. Product ratings and reviews can be displayed for customers on demand.

This feature is supported by 3 modules:

1. **ProductReview module**: Manages the Product Review’s core functionalities such as CRUD Zed actions, aggregated data access from database, Search and Storage access from Yves, database schema, and transfer object definitions.
2. **ProductReviewCollector module**: Provides full Collector logic to export Product Reviews to Search and Storage.
3. **ProductReviewGui module**: Provides a Zed Admin UI to supervise (approve, reject and delete) Product Reviews.

## Current Constraints

{% info_block infoBox %}
Currently, the feature has the following functional constraints which are going to be resolved in the future.
{% endinfo_block %}

* product reviews are linked to locales, but not stores

* a review is available in all the stores that share the locale of the store in which it has been originally created
 
<!-- Last review date: Dec 12, 2017-- by Karoly Gerner -->

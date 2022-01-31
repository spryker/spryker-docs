---
title: Product Rating and Reviews feature overview
description: The Product Reviews feature allows customers to add reviews and ratings to abstract products.
last_updated: Aug 23, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/product-rating-reviews-feature-overview
originalArticleId: c8f1dbb1-18f6-42a3-a0cf-3450a0bded91
redirect_from:
  - /2021080/docs/product-rating-reviews-feature-overview
  - /2021080/docs/en/product-rating-reviews-feature-overview
  - /docs/product-rating-reviews-feature-overview
  - /docs/en/product-rating-reviews-feature-overview
  - /2021080/docs/product-rating-reviews
  - /2021080/docs/en/product-rating-reviews
  - /docs/product-rating-reviews
  - /docs/en/product-rating-reviews
---

The _Product Reviews_ feature allows customers to add reviews and ratings to abstract products. In a dedicated Back Office section, you can manage customers' ratings and reviews to moderate content and collect information before publishing them live. Rating information can be used for sorting and filtering products. Product ratings and reviews can be displayed for customers on demand.


This feature is supported by 3 modules:
1. **ProductReview module**: Manages the Product Review’s core functionalities such as CRUD Zed actions, aggregated data access from database, Search and Storage access from Yves, database schema, and transfer object definitions.
2. **ProductReviewCollector module**: Provides full Collector logic to export Product Reviews to Search and Storage.
3. **ProductReviewGui module**: Provides a Zed Admin UI to supervise (approve, reject and delete) Product Reviews.

## Current constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future:
* Product reviews are linked to locales, but not stores.
* A review is available in all the stores that share the locale of the store in which it has been originally created.

## Video tutorial

For more details on managing ratings and reviews, check the video:

{% wistia efvyq9vfb8 720 480 %}

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Manage product reviews](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-reviews/managing-product-reviews.html) |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Product Rating & Reviews feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-rating-reviews-feature-walkthrough.html) for developers.

{% endinfo_block %}

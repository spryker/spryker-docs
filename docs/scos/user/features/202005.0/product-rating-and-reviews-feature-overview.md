---
title: Product Rating & Reviews feature overview
description: The Product Reviews feature allows customers to add reviews and ratings to abstract products.
originalLink: https://documentation.spryker.com/v5/docs/product-reviews
originalArticleId: e7d22bab-45ab-46af-b0c9-c2801f962c13
redirect_from:
  - /v5/docs/product-reviews
  - /v5/docs/en/product-reviews
---

The Product Reviews feature allows customers to add reviews and ratings to abstract products. In a dedicated Back Office section, you can manage customers' ratings and reviews to moderate content and collect information before publishing them live. Rating information can be used for sorting and filtering products. Product ratings and reviews can be displayed for customers on demand.


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
<iframe src="https://spryker.wistia.com/medias/efvyq9vfb8" title="Ratings and Reviews" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="720" height="480"></iframe>

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Manage product reviews](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-reviews/managing-product-reviews.html) |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Product Rating & Reviews feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-rating-reviews-feature-walkthrough.html) for developers.

{% endinfo_block %}

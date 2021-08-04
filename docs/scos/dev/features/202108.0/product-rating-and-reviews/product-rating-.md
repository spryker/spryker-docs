---
title: Product Rating & Reviews
originalLink: https://documentation.spryker.com/2021080/docs/product-rating-reviews
redirect_from:
  - /2021080/docs/product-rating-reviews
  - /2021080/docs/en/product-rating-reviews
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

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/product-rating-reviews-feature-integration" class="mr-link">Integrate the Product Rating & Reviews feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-product-rating-reviews-feature-integration" class="mr-link">Integrate the Product Rating & Reviews Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-product-reviewcsv" class="mr-link">Import product reviews</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-product-ratings-and-reviews" class="mr-link">Manage the product ratings and reviews via Glue API</a></li>
            </ul>
        </div>
      <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-product-reviews">Manage product reviews</a></li>
            </ul>
        </div>  
</div>
</div>


---
title: "HowTo: Configure product reviews"
description: Learn how to configure product reveiws in your Spryker based project using the Ratings and Reviews feature.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-product-review-feature-configuration
originalArticleId: ea370505-baab-48a6-8dc1-879739dd816a
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-configure-the-product-reviews.html
  - /docs/pbc/all/ratings-reviews/202204.0/tutorials-and-howtos/howto-configure-product-reviews.html
related:
  - title: Product Rating and Reviews feature overview
    link: docs/pbc/all/ratings-reviews/page.version/ratings-and-reviews.html
---

## Configure the maximum rating

To change the maximum allowed rating, alter the `Client` configuration by extending the `\Spryker\Client\ProductReview\ProductReviewConfig` class in your project directory.

Override the `getMaximumRating` method to return the desired selectable maximum rating value.

Example of client config extension:

```php
<?php
            namespace Pyz\Client\ProductReview;

            use Spryker\Client\ProductReview\ProductReviewConfig as ProductReviewProductReviewConfig;

            class ProductReviewConfig extends ProductReviewProductReviewConfig
            {

                /**
                 * @return int
                 */
                public function getMaximumRating()
                {
                    return 10;
                }

            }
```

## Configure the number of reviews displayed per page

1. To change the maximum number of reviews displayed per page, alter the `Client` configuration by extending the `\Spryker\Client\ProductReview\ProductReviewConfig` class in your project directory.

2. Override the `PAGINATION_DEFAULT_ITEMS_PER_PAGE` and `PAGINATION_VALID_ITEMS_PER_PAGE` constants to the desired number of reviews to be displayed per page.

An example of the client config extension:

```php
<?php
            namespace Pyz\Client\ProductReview;

            use Spryker\Client\ProductReview\ProductReviewConfig as ProductReviewProductReviewConfig;

            class ProductReviewConfig extends ProductReviewProductReviewConfig
            {

                const PAGINATION_DEFAULT_ITEMS_PER_PAGE = 5;
                const PAGINATION_VALID_ITEMS_PER_PAGE = [
                    5,
                ];

            }
```

---
title: HowTo - Configure the Product Reviews
originalLink: https://documentation.spryker.com/v3/docs/ht-product-review-feature-configuration
redirect_from:
  - /v3/docs/ht-product-review-feature-configuration
  - /v3/docs/en/ht-product-review-feature-configuration
---

## Configuring the Maximum Rating
To change the maximum allowed rating, alter the Client configuration by extending the `\Spryker\Client\ProductReview\ProductReviewConfig` class in your project directory.

Override the `getMaximumRating` method to return the desired selectable maximum rating value.

**Example of client config extension:**

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

## Configuring the Number of Reviews Displayed per Page
To change the maximum number of reviews displayed per page, alter the Client configuration by extending the `\Spryker\Client\ProductReview\ProductReviewConfig` class in your project directory.

Override the `PAGINATION_DEFAULT_ITEMS_PER_PAGE` and `PAGINATION_VALID_ITEMS_PER_PAGE` constants to the desired number of reviews to be displayed per page.

**Example of client config extension:**

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

_Last review date: Aug 28, 2017_

<!--by Karoly Gerner-->

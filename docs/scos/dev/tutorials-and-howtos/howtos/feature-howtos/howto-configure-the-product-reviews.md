---
title: HowTo - Configure the Product Reviews
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-product-review-feature-configuration
originalArticleId: ea370505-baab-48a6-8dc1-879739dd816a
redirect_from:
  - /2021080/docs/ht-product-review-feature-configuration
  - /2021080/docs/en/ht-product-review-feature-configuration
  - /docs/ht-product-review-feature-configuration
  - /docs/en/ht-product-review-feature-configuration
  - /v6/docs/ht-product-review-feature-configuration
  - /v6/docs/en/ht-product-review-feature-configuration
  - /v5/docs/ht-product-review-feature-configuration
  - /v5/docs/en/ht-product-review-feature-configuration
  - /v4/docs/ht-product-review-feature-configuration
  - /v4/docs/en/ht-product-review-feature-configuration
  - /v3/docs/ht-product-review-feature-configuration
  - /v3/docs/en/ht-product-review-feature-configuration
  - /v2/docs/ht-product-review-feature-configuration
  - /v2/docs/en/ht-product-review-feature-configuration
  - /v1/docs/ht-product-review-feature-configuration
  - /v1/docs/en/ht-product-review-feature-configuration
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

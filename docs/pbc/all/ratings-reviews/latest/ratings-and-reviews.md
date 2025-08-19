---
title: Ratings and Reviews
last_updated: Jul 29, 2022
description: Everything you need to know about the Ratings and Reviews feature within Spryker Cloud Commerce OS.
template: concept-topic-template
redirect_from:
  - /2021080/docs/product-rating-reviews-feature-overview
  - /2021080/docs/en/product-rating-reviews-feature-overview
  - /docs/product-rating-reviews-feature-overview
  - /docs/en/product-rating-reviews-feature-overview
  - /2021080/docs/product-rating-reviews
  - /2021080/docs/en/product-rating-reviews
  - /docs/product-rating-reviews
  - /docs/en/product-rating-reviews
  - /docs/scos/user/features/202200.0/product-rating-and-reviews-feature-overview.html
  - /docs/scos/user/features/202311.0/product-rating-and-reviews-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202200.0/product-rating-reviews-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/product-rating-reviews-feature-walkthrough.html
  - /docs/pbc/all/ratings-reviews/ratings-and-reviews.html
  - /docs/pbc/all/ratings-reviews/202204.0/ratings-and-reviews.html
---

Drive sales by including user reviews and ratings. Reviews and ratings are a proven sign of trust; they allow brands to receive valuable and moderate feedback in the Administration Interface. The Ratings and Reviews feature also comes with the functionality to add text-free reviews and star ratings.

## Video tutorial

For more details about managing ratings and reviews, check the video:

{% wistia efvyq9vfb8 720 480 %}

## Ratings & Reviews capabilities available in Spryker

| NAME | MARKETPLACE COMPATIBLE | AVAILABLE IN ACP |
| --- | --- | --- |
| Spryker | No | No |
| [Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/bazaarvoice.html) | No | Yes |

## Current constraints

The feature has the following functional constraints, which are going to be resolved in the future:
- Product reviews are linked to locales but not stores.
- A review is available in all the stores that share the locale of the store in which it has been originally created.


## Related Business User documents

| BACK OFFICE USER GUIDES | THIRD-PARTY INTEGRATIONS |
| - | - |
| [Manage product reviews in the Back Office](/docs/pbc/all/ratings-reviews/{{page.version}}/manage-product-reviews-in-the-back-office.html) | [Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/bazaarvoice.html)|
| [Integrate Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/integrate-bazaarvoice.html) | |
| [Configure Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/configure-bazaarvoice.html) | |
| [Disconnect Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/disconnect-bazaarvoice.html) | |


## Related Developer documents

| INSTALLATION GUIDES | GLUE API GUIDES  | DATA IMPORT | TUTORIALS AND HOWTOS |
|---------|---------|---------| - |
| [Install the Product Rating and Reviews feature](/docs/pbc/all/ratings-reviews/{{site.version}}/install-and-upgrade/install-the-product-rating-and-reviews-feature.html) | [Managing product ratings and reviews using Glue API](/docs/pbc/all/ratings-reviews/{{site.version}}/manage-using-glue-api/glue-api-manage-product-reviews.html)  | [File details: product_review.csv](/docs/pbc/all/ratings-reviews/{{site.version}}/import-and-export-data/import-file-details-product-review.csv.html)  | [HowTo: Configure product reviews](/docs/pbc/all/ratings-reviews/{{site.version}}/tutorials-and-howtos/howto-configure-product-reviews.html) |
| [Install the Product Rating and Reviews Glue API](/docs/pbc/all/ratings-reviews/{{site.version}}/install-and-upgrade/install-the-product-rating-and-reviews-glue-api.html)   | [Retrieve product reviews when retrieving abstract products](/docs/pbc/all/ratings-reviews/{{site.version}}/manage-using-glue-api/glue-api-retrieve-product-reviews-when-retrieving-abstract-products.html)  |  | |
| [Install the Product Rating and Reviews + Product Group feature](/docs/pbc/all/ratings-reviews/{{site.version}}/install-and-upgrade/install-the-product-rating-and-reviews-product-group-feature.html) | [Retrieving product reviews when retrieving concrete products](/docs/pbc/all/ratings-reviews/{{site.version}}/manage-using-glue-api/glue-api-retrieve-product-reviews-when-retrieving-concrete-products.html) | | |

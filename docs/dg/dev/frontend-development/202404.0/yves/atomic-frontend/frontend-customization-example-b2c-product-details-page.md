---
title: "Frontend customization example: B2C Product Details page"
description: Customize any front–end element in Spryker by adjusting a respective SCSS file.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/customization-example-b2c-product-details-page
originalArticleId: 2401ea81-04cc-431d-a369-20f834d4bdd4
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/yves/atomic-frontend/customization-example-b2c-product-details-page.html
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/customization-example-b2c-product-details-page.html
related:
  - title: Customization example - Suite Product Details page
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/frontend-customization-example-suite-product-details-page.html
  - title: Customization example - B2B Product Details page
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/frontend-customization-example-b2b-product-details-page.html
---

In Spryker, front-end elements have dedicated SCSS styles. To show you how to customize the Spryker front end, we broke down the *Product Details* page from our [B2C Demo Shop](/docs/about/all/b2c-suite.html#b2c-demo-shop) into separate elements with their respective style files. To customize a particular element, you adjust the code in the respective style file.

You can see the [full version of this page](https://www.de.b2c.demo-spryker.com/en/acer-aspire-s7-134) in our B2C Demo Shop.

![B2C-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Front-End/Yves/Atomic+Frontend/%D0%A1ustomization+example+-+B2C+Product+Details+page/b2c-1.png)



| # | PATH TO SCSS |
| --- | --- |
| 1 | project/src/Pyz/Yves/ShopUi/Theme/default/components/molecules/breadcrumb/breadcrumb.scss |
| 2 | project/src/Pyz/Yves/ProductImageWidget/Theme/default/components/molecules/image-gallery/image-gallery.scss |
| 3 | project/src/Pyz/Yves/ProductLabelWidget/Theme/default/components/molecules/label-group/label-group.scss |
| 4 | project/src/Pyz/Yves/ShopUi/Theme/default/components/atoms/title/title.scss |
| 5 | project/src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.scss |
| 6 | project/src/Pyz/Yves/PriceProductVolumeWidget/Theme/default/components/molecules/volume-price/volume-price.scss |
| 7 | project/src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/variant-resetter/variant-resetter.scss |
| 8 | project/src/Pyz/Yves/ShopUi/Theme/default/components/molecules/custom-select/custom-select.scss |
| 9 | project/src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-item/toggler-item.scss <br> project/src/Pyz/Yves/ShopUi/Theme/default/components/atoms/title/title.scss|
| 10 | project/src/Pyz/Yves/ShopUi/Theme/default/components/molecules/quantity-counter/quantity-counter.scss |
| 11 | project/src/Pyz/Yves/ShopUi/Theme/default/components/atoms/button/button.scss |


![B2C-2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Front-End/Yves/Atomic+Frontend/%D0%A1ustomization+example+-+B2C+Product+Details+page/b2c-2.png)


| # | PATH TO SCSS |
| --- | --- |
| 12 | project/src/Pyz/Yves/ShopUi/Theme/default/components/atoms/title/title.scss |
| 13 | project/src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-item/toggler-item.scss |
| 14 | project/src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-detail-option/product-detail-option.scss |

![B2C-3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Front-End/Yves/Atomic+Frontend/%D0%A1ustomization+example+-+B2C+Product+Details+page/b2c-3.png)


| # | PATH TO SCSS |
| --- | --- |
| 15 | project/src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-slider-title/product-slider-title.scss |
| 16 | project/src/Pyz/Yves/ShopUi/Theme/default/components/atoms/title/title.scss |
| 17 | project/src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review-average-display/review-average-display.scss <br> project/src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review-distribution-display/review-distribution-display.scss <br> project/src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review-distribution-display/review-distribution-display.scss <br> project/src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.scss |

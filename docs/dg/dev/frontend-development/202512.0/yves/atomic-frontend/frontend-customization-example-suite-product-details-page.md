---
title: "Frontend customization example: suite Product Details page"
description: Customize any front–end element in Spryker by overriding a respective SCSS file.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/customization-example-suite-product-details-page
originalArticleId: 748f6c93-de3a-4f69-94ba-5899ec8be494
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/yves/atomic-frontend/customization-example-suite-product-details-page.html
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/customization-example-suite-product-details-page.html
related:
  - title: Customization example - B2B Product Details page
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/frontend-customization-example-b2b-product-details-page.html
  - title: Customization example - B2C Product Details page
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/frontend-customization-example-b2c-product-details-page.html
---

In Spryker, front-end elements have dedicated SCSS styles. To show you how to customize the Spryker front end, we broke down the *Product Details* page from our [Spryker Suite](https://github.com/spryker-shop/suite) into separate elements with their respective style files. To customize a particular element, you [override it with the desired code](/docs/dg/dev/frontend-development/{{page.version}}/yves/atomic-frontend/managing-components/overriding-components.html) in the respective style file.

![suite-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Front-End/Yves/Atomic+Frontend/%D0%A1ustomization+example+-+Suite+Product+Details+page/suite-1.png)


| # | PATH TO SCSS |
| --- | --- |
| 1 | project/src/Pyz/Yves/ShopUi/Theme/default/components/molecules/breadcrumb-step/breadcrumb-step.scss |
| 2 | project/vendor/spryker-shop/price-product-volume-widget/src/SprykerShop/Yves/PriceProductVolumeWidget/Theme/default/components/molecules/volume-price/volume-price.scss |
| 3 | project/vendor/spryker-shop/product-review-widget/src/SprykerShop/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.scss |
| 4 | project/vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/product-detail-color-selector/product-detail-color-selector.scss |
| 5 | project/vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/atoms/select/select.scss |
| 6 | project/vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/atoms/button/button.scss |

![suite-2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Development+Guide/Front-End/Yves/Atomic+Frontend/%D0%A1ustomization+example+-+Suite+Product+Details+page/suite-2.png)

| # | PATH TO SCSS |
| --- | --- |
| 3 | project/vendor/spryker-shop/product-review-widget/src/SprykerShop/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.scss |
| 7 | project/vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/pagination/pagination.scss |

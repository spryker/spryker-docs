---
title: Install the Spryker core keyboard accessibility improvements
description: Learn how to the Spryker core keyboard accessibility improvements.
last_updated: March 31, 2025
template: feature-integration-guide-template
---

Keyboard accessibility improvements include the following changes:

- Enhanced Accessibility: Made several interface elements more accessible. You can now navigate more logically using the Tab key, and screen readers provide better descriptions of elements.
- Keyboard-Friendly Search: Improved the way keyboard users can interact with the product search suggestions.
- Better Visual Clarity: Adjusted the color scheme across the site to ensure text stands out better from its background, making it easier for everyone to read.

To install Yves keyboard accessibility improvements, take the following steps:

1. Update modules:
  - Update the `spryker-shop/catalog-page` module to version `1.29.0` or later.
  - Update the `spryker-shop/company-page` module to version `1.32.0` or later.
  - Update the `spryker-shop/customer-page` module to version `1.58.0` or later.1.2
  - Update the `spryker-shop/product-group-widget` module to version `1.11.1` or later.
  - Update the `spryker-shop/product-review-widget` module to version `1.16.2` or later.
  - Update the `spryker-shop/shop-ui` module to version `1.84.0` or later.
* To update necessary modules run the following command:
```bash
  composer update spryker-shop/catalog-page spryker-shop/company-page spryker-shop/customer-page spryker-shop/product-group-widget spryker-shop/product-review-widget spryker-shop/shop-ui
```

2. Adjust templates and files on the project level.
   - Add `skip-link` and ID attribute (href for `skip-link`) to 
     - src/Pyz/Yves/CatalogPage/Theme/default/templates/page-layout-catalog/page-layout-catalog.twig
     - src/Pyz/Yves/CompanyPage/Theme/default/templates/page-layout-company/page-layout-company.twig
     - src/Pyz/Yves/CustomerPage/Theme/default/templates/page-layout-customer/page-layout-customer.twig
    - Adjust `src/Pyz/Yves/ProductImageWidget/Theme/default/components/molecules/image-gallery/image-gallery.ts`
    - Enable `accessibility` param for the image slider at the `src/Pyz/Yves/ProductImageWidget/Theme/default/components/molecules/image-gallery/image-gallery.ts`
    - Adjust `src/Pyz/Yves/QuickOrderPage/Theme/default/components/molecules/quick-order-file-upload/quick-order-file-upload.ts`
    - Adjust `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/navigation-multilevel/navigation-multilevel.ts`
    - Add `parent-class-name` attribute to the call of the `suggest-search` molecule at `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/search-form/search-form.twig`
    - Add `navigationId` attribute to the `src/Pyz/Yves/ShopUi/Theme/default/components/organisms/header/header.twig` to enable `skip-link`. Pass this attribute into the `header` organism from `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig`  
    - Adjust styles for the following components
      - src/Pyz/Yves/ShopUi/Theme/default/components/atoms/checkbox/checkbox.scss
      - src/Pyz/Yves/ShopUi/Theme/default/components/molecules/custom-select/custom-select.scss
      - src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.scss
      - src/Pyz/Yves/ShopUi/Theme/default/components/molecules/slick-carousel/slick-carousel.scss
      - src/Pyz/Yves/ShopUi/Theme/default/components/molecules/user-navigation/user-navigation.scss
      - src/Pyz/Yves/ShopUi/Theme/default/components/organisms/navigation-top/navigation-top.scss
      - src/Pyz/Yves/ShopUi/Theme/default/styles/basics/_reset.scss
      - src/Pyz/Yves/ShopUi/Theme/default/styles/helpers/_outline.scss
      - src/Pyz/Yves/ShopUi/Theme/default/styles/settings/_z-index.scss
      - src/Pyz/Yves/ShopUi/Theme/default/styles/shared.scss
1. Build Javascript and CSS changes:

```bash
  console frontend:project:install-dependencies
  console frontend:yves:build -e production
```

2. Generate translation cache for Yves:

```bash
  console data:import glossary
```

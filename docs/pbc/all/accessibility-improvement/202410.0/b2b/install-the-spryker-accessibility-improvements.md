---
title: Accessibility improvements
description: Learn how install accessibility improvements.
last_updated: March 31, 2025
template: feature-integration-guide-template
---

Keyboard accessibility improvements include the following changes:

- Enhanced Accessibility: Made several interface elements more accessible. You can now navigate more logically using the Tab key, and screen readers provide better descriptions of elements.
- Keyboard-Friendly Search: Users can now interact with search suggestions using the keyboard.
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
    composer require spryker-shop/catalog-page:^1.29.0 spryker-shop/company-page:^1.32.0 spryker-shop/customer-page:^1.58.0 spryker-shop/product-group-widget:^1.11.1 spryker-shop/product-review-widget:^1.16.2 spryker-shop/shop-ui:^1.84.0
```
<!-- {% raw %} -->
2. Adjust templates and files on the project level.
- Rename `{% block body %}` to `{% block viewport %}` at `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig`.
- Pass `navigationId` attribute with its value as `navigationId` (variable from the Spryker Core) to the call of the `header` organism at `src/Pyz/Yves/ShopUi/Theme/default/components/organisms/header/header.twig` to enable `skip-link`. Pass this attribute into the `header` organism from `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig`

  ```twig
    {% embed organism('header') with {
        data: {
            ...
        },
        attributes: {
            navigationId: navigationId,
        },
    } only %}
  ```
<!-- {% endraw %} -->

- Define navigation ID `navigationId` attribute at `src/Pyz/Yves/ShopUi/Theme/default/components/organisms/header/header.twig` and use it as an ID for the navigation component. 

<!-- {% raw %} -->
```twig
  {% define attributes = {
    navigationId: '',
  } %}
 
  ...
  
  <div class="{{ config.name }}__navigation" id="{{ attributes.navigationId }}">
```
<!-- {% endraw %} -->

- Add `skip-link` and ID attribute for it's target to 
  - src/Pyz/Yves/CatalogPage/Theme/default/templates/page-layout-catalog/page-layout-catalog.twig
       <!-- {% raw %} -->
       ```twig
       {% block content %}
          {% set catalogProductListId = 'catalog-product-list' %}
    
          {% include molecule('skip-link') with {
             data: {
                href: catalogProductListId,
                text: 'global.skip-to-products' | trans,
             },
          } only %}
       ... 
    
    
       <div class="col col--sm-12 col--lg-8 col--xl-9" id="{{ catalogProductListId }}"> //Wrapper for the page content
       ```
       <!-- {% endraw %} -->

       - src/Pyz/Yves/CompanyPage/Theme/default/templates/page-layout-company/page-layout-company.twig
       <!-- {% raw %} -->
       ```twig
       {% block content %}
         {% set contentSectionId = 'company-content' %}
    
         {% include molecule('skip-link') with {
           data: {
             href: contentSectionId,
             text: 'global.skip-to-content' | trans,
           },
         } only %}
 
         <div id="{{ contentSectionId }}"> //Wrapper for the page content
       ```
       <!-- {% endraw %} -->

       - src/Pyz/Yves/CustomerPage/Theme/default/templates/page-layout-customer/page-layout-customer.twig
       <!-- {% raw %} -->
       ```twig
       {% block content %}
         {% set contentSectionId = 'customer-content' %}
    
         {% include molecule('skip-link') with {
           data: {
             href: contentSectionId,
             text: 'global.skip-to-content' | trans,
           },
         } only %}
 
         <div id="{{ contentSectionId }}"> //Wrapper for the page content 
          ...     
       ```
       <!-- {% endraw %} -->

- Adjust `mapEvents` method by adding `tabIndex` attribute and `focusin` event listener at `src/Pyz/Yves/ProductImageWidget/Theme/default/components/molecules/image-gallery/image-gallery.ts`
   
  ```js
      protected mapEvents(): void {
        this.thumbnailSlider.on('mouseenter', '.slick-slide', (event: Event) => this.onThumbnailHover(event));
        this.thumbnailSlider.on('afterChange', (event: Event, slider: $) => this.onAfterChange(event, slider));
        Array.from(this.querySelectorAll(`.slick-slide`)).forEach((button: HTMLButtonElement) => {
            button.setAttribute('tabindex', '0');
            button.addEventListener('focusin', (event: Event) => this.onThumbnailHover(event));
        })
      }
  ```
- Enable `accessibility` parameter for the image slider config at the `src/Pyz/Yves/ProductImageWidget/Theme/default/components/molecules/image-gallery/image-gallery.ts`

  <!-- {% raw %} -->
    ```twig
    {% define attributes = {
      'config-thumbnail-slider': '{
        ...
        "accessibility": true,
    ```
  <!-- {% endraw %} -->

- - In `src/Pyz/Yves/QuickOrderPage/Theme/default/components/molecules/quick-order-file-upload/quick-order-file-upload.ts`, adjust `mapEvents` and add a `browseFileLabelHandler` method:

```js
  protected mapEvents(): void {
    ...
    this.browseFileLabel.addEventListener('keydown', (event: KeyboardEvent) => this.browseFileLabelHandler(event));
  }

  protected browseFileLabelHandler(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
        return;
    }

    event.preventDefault();
    this.browseFileLabel.dispatchEvent(new MouseEvent('click'));
  }
```
- Adjust `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/navigation-multilevel/navigation-multilevel.ts` by adding `focusin` and `focusout` event listeners
  ```js
   protected mapEvents(): void {
    this.triggers.forEach((trigger: HTMLElement) => {
        trigger.addEventListener('mouseover', (event: Event) => this.onTriggerOver(event));
        trigger.addEventListener('focusin', (event: Event) => this.onTriggerOver(event));
    });
    this.triggers.forEach((trigger: HTMLElement) => {
        trigger.addEventListener('mouseout', (event: Event) => this.onTriggerOut(event));
        trigger.addEventListener('focusout', (event: Event) => this.onTriggerOut(event));
    });
    ...
  ```
- Add `parent-class-name` attribute to the call of the `suggest-search` molecule at `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/search-form/search-form.twig`

<!-- {% raw %} -->
  ```twig
    {% include molecule('suggest-search') with {
      attributes: {
        'parent-class-name': config.name,
        ...
  ```
<!-- {% endraw %} -->
 
- Next files contain text to background contrast adjustments and ui improvements.
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
  
3. Build Javascript and CSS changes:

```bash
  console frontend:project:install-dependencies
  console frontend:yves:build -e production
```

4. Generate translation cache for Yves:

```bash
  console data:import glossary
```
<hr />

#### Integration PR with an example:
https://github.com/spryker-shop/b2b-demo-marketplace/pull/532
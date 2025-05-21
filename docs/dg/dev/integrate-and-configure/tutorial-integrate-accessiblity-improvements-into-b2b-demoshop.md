---
title: "Tutorial: Integrate accessibility improvements into B2B Demo Shop"
description: Learn how install accessibility improvements.
last_updated: March 31, 2025
template: feature-integration-guide-template
---

This document describes an example integration of accessibility improvements into the B2B demo shop. Use it as a references for integrating this functionality into your projects.

For all changes described in this document, see the [integration PR](https://github.com/spryker-shop/b2b-demo-marketplace/pull/532).


## Prerequisites

[Integrate accessibility improvements](/docs/dg/dev/integrate-and-configure/integrate-accessibility-improvements.html)

## Update modules

```bash
composer require spryker-shop/catalog-page:^1.29.0 spryker-shop/company-page:^1.32.0 spryker-shop/customer-page:^1.58.0 spryker-shop/product-group-widget:^1.11.1 spryker-shop/product-review-widget:^1.16.2 spryker-shop/shop-ui:^1.84.0
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| Module                                  | Version     |
|-----------------------------------------|-------------|
| spryker-shop/catalog-page               | 1.29.0    |
| spryker-shop/company-page               | 1.32.0    |
| spryker-shop/customer-page              | 1.58.0    |
| spryker-shop/product-group-widget       | 1.11.1    |
| spryker-shop/product-review-widget      | 1.16.2   |
| spryker-shop/shop-ui                    | 1.84.0   |

{% endinfo_block %}


## Adjust templates on the project level

<!-- {% raw %} -->

1. In `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig`, rename `{% block body %}` to `{% block viewport %}`.

2. To enable the `skip-link` feature, pass the `navigationId` attribute (using the `navigationId` variable from the core) from `page-layout-main.twig` to the `header` organism:

**src/Pyz/Yves/ShopUi/Theme/default/components/organisms/header/header.twig**

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

3. Define the `navigationId` attribute and use it as an ID for the navigation component.

<!-- {% raw %} -->
**src/Pyz/Yves/ShopUi/Theme/default/components/organisms/header/header.twig**

```twig
  {% define attributes = {
    navigationId: '',
  } %}
 
  ...
  
  <div class="{{ config.name }}__navigation" id="{{ attributes.navigationId }}">
```
<!-- {% endraw %} -->

4. Add `skip-link` and ID attribute for its target:

**src/Pyz/Yves/CatalogPage/Theme/default/templates/page-layout-catalog/page-layout-catalog.twig**
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

 **src/Pyz/Yves/CompanyPage/Theme/default/templates/page-layout-company/page-layout-company.twig**
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

**src/Pyz/Yves/CustomerPage/Theme/default/templates/page-layout-customer/page-layout-customer.twig**
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

5. Adjust `mapEvents` method by adding the `tabIndex` attribute and `focusin` event listener:

**src/Pyz/Yves/ProductImageWidget/Theme/default/components/molecules/image-gallery/image-gallery.ts**

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

6. Enable the `accessibility` parameter for the image slider configuration:

**src/Pyz/Yves/ProductImageWidget/Theme/default/components/molecules/image-gallery/image-gallery.ts**
  <!-- {% raw %} -->
    ```twig
    {% define attributes = {
      'config-thumbnail-slider': '{
        ...
        "accessibility": true,
    ```
  <!-- {% endraw %} -->

7. Adjust `mapEvents` and add a `browseFileLabelHandler` method:

**src/Pyz/Yves/QuickOrderPage/Theme/default/components/molecules/quick-order-file-upload/quick-order-file-upload.ts**

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

8. Add `focusin` and `focusout` event listeners:

**src/Pyz/Yves/ShopUi/Theme/default/components/molecules/navigation-multilevel/navigation-multilevel.ts**

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

9. Add the `parent-class-name` attribute to the call of the `suggest-search` molecule:

**src/Pyz/Yves/ShopUi/Theme/default/components/molecules/search-form/search-form.twig**
<!-- {% raw %} -->
```twig
  {% include molecule('suggest-search') with {
    attributes: {
      'parent-class-name': config.name,
      ...
```
<!-- {% endraw %} -->

10. Improve text to background contrast in the following files:
- `src/Pyz/Yves/ShopUi/Theme/default/components/atoms/checkbox/checkbox.scss`  
- `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/custom-select/custom-select.scss`  
- `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.scss`  
- `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/slick-carousel/slick-carousel.scss`  
- `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/user-navigation/user-navigation.scss`  
- `src/Pyz/Yves/ShopUi/Theme/default/components/organisms/navigation-top/navigation-top.scss`  
- `src/Pyz/Yves/ShopUi/Theme/default/styles/basics/_reset.scss`  
- `src/Pyz/Yves/ShopUi/Theme/default/styles/helpers/_outline.scss`  
- `src/Pyz/Yves/ShopUi/Theme/default/styles/settings/_z-index.scss`  
- `src/Pyz/Yves/ShopUi/Theme/default/styles/shared.scss`

  
11. Build Javascript and CSS changes:

```bash
  console frontend:project:install-dependencies
  console frontend:yves:build -e production
```

12. Generate translation cache for Yves:

```bash
  console data:import glossary
```













































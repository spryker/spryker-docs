---
title: Install the ContentProductWidget module
description: Learn how to install and integrate the ContentProductWidget module that renders Abstract Product List content items on the Storefront.
last_updated: Mar 6, 2025
template: howto-guide-template
---

The **ContentProductWidget** module renders [Abstract Product List](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/content-items/create-abstract-product-list-content-items.html) content items as product lists or sliders on the Storefront. 

To integrate the ContentProductWidget module, follow the steps:

## 1) Install the module

Install the `spryker-shop/content-product-widget` module using Composer:

```bash
composer require spryker-shop/content-product-widget --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following module is installed in `vendor/spryker-shop`:

| MODULE              | EXPECTED DIRECTORY                         |
| ---                 | ---                                        |
| ContentProductWidget | `vendor/spryker-shop/content-product-widget` |

{% endinfo_block %}

## 2) Register the Twig plugin

Register the Twig plugin so that the `content_product_abstract_list` function is available in Yves and CMS blocks.

**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\ContentProductWidget\Plugin\Twig\ContentProductAbstractListTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            ...
            new ContentProductAbstractListTwigPlugin(),
        ];
    }
}
```

## 3) Use the Twig function

After registering the plugin, you can render Abstract Product List content items with the `content_product_abstract_list` function.

### 3.1 Function signature

| FUNCTION | DESCRIPTION |
| --- | --- |
| `content_product_abstract_list(contentKey, templateIdentifier)` | Renders an [Abstract Product List](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/content-items/create-abstract-product-list-content-items.html) content item by its content key using the specified template. |

**Parameters:**

- **contentKey** (string): The unique key of the Abstract Product List content item (for example, the NAME used when [creating the content item](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/content-items/create-abstract-product-list-content-items.html)).
- **templateIdentifier** (string): Identifier of the template to use (see [Default templates](#4-optional-configure-templates)).

**Example (CMS block or CMS page template):**

```twig
{% raw %}{{ content_product_abstract_list('best-sellers', 'bottom-title') }}{% endraw %}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, create an [Abstract Product List](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/content-items/create-abstract-product-list-content-items.html) content item.
2. Add the content item to a CMS block or CMS page.
3. Publish the block or page and open it on the Storefront.
4. Check that the product list is rendered without errors.

{% endinfo_block %}

## 4) (Optional) Configure templates

By default, the ContentProductWidget module ships with two templates:

| TEMPLATE IDENTIFIER | PATH | DESCRIPTION |
| --- | --- | --- |
| `bottom-title` | `@ContentProductWidget/views/cms-product-abstract-list/cms-product-abstract-list.twig` | Product list with title at the bottom (slider for store or landing pages). |
| `top-title` | `@ContentProductWidget/views/cms-product-abstract-list-alternative/cms-product-abstract-list-alternative.twig` | Product list with title at the top. |

To use one of the default templates, pass its identifier as the second argument of the Twig function.

To introduce custom templates, extend the project-level Twig function provider for `ContentProductWidget` and add your own identifiers and paths. For details, see [Create CMS templates](/docs/pbc/all/content-management-system/latest/base-shop/tutorials-and-howtos/create-cms-templates.html#content-item-widget-template).

## 5) (Optional) Extend product data with categories

You can extend the product data used by `ContentProductWidget` with additional information, such as product categories. To do this, register collection expander plugins in the project-level `ContentProductWidgetDependencyProvider`.

The following example registers `ProductCategoryContentProductAbstractCollectionExpanderPlugin`, which enriches the abstract product collection with category data:

**src/Pyz/Yves/ContentProductWidget/ContentProductWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ContentProductWidget;

use SprykerShop\Yves\ContentProductWidget\ContentProductWidgetDependencyProvider as SprykerContentProductWidgetDependencyProvider;
use SprykerShop\Yves\ProductCategoryWidget\Plugin\ContentProductWidget\ProductCategoryContentProductAbstractCollectionExpanderPlugin;

class ContentProductWidgetDependencyProvider extends SprykerContentProductWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\ContentProductWidget\Dependency\Plugin\ContentProductAbstractCollectionExpanderPluginInterface>
     */
    protected function getContentProductAbstractCollectionExpanderPlugins(): array
    {
        return [
            new ProductCategoryContentProductAbstractCollectionExpanderPlugin(),
        ];
    }
}
```

This plugin extends the abstract product collection with category information, so you can display categories in your ContentProductWidget templates.

## 6) Next steps

After installing and integrating the ContentProductWidget module, you can:

- [Create abstract product list content items](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/content-items/create-abstract-product-list-content-items.html).
- [Add content items to CMS blocks](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/blocks/add-content-items-to-cms-blocks.html).
- [Create CMS templates](/docs/pbc/all/content-management-system/latest/base-shop/tutorials-and-howtos/create-cms-templates.html) to customize how Abstract Product List content items are displayed.


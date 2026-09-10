---
title: Install the Product group + Product Labels feature
description: Instructions to integrate Product group + Product labels feature into a Spryker project.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-group-product-labels-feature-integration
originalArticleId: d4867491-433c-4986-98a8-679d70abb507
redirect_from:
  - /2021080/docs/product-group-product-labels-feature-integration
  - /2021080/docs/en/product-group-product-labels-feature-integration
  - /docs/product-group-product-labels-feature-integration
  - /docs/en/product-group-product-labels-feature-integration
  - /docs/scos/dev/feature-integration-guides/202311.0/product-group-product-labels-feature-integration.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/install-features/install-the-product-group-product-labels-feature.html
---

## Install feature core

Follow the steps below to install Product group + Product labels feature core.

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Product Group | {{page.release_tag}} |
| Product Labels | {{page.release_tag}} |


### Set up behavior

Register the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductLabelProductViewExpanderPlugin | Expands `ProductViewTransfer` with labels. | None | SprykerShop\Yves\ProductLabelWidget\Plugin\ProductGroupWidget |


```php
<?php

namespace Pyz\Yves\ProductGroupWidget;

use SprykerShop\Yves\ProductGroupWidget\ProductGroupWidgetDependencyProvider as SprykerShopProductGroupWidgetDependencyProvider;
use SprykerShop\Yves\ProductLabelWidget\Plugin\ProductGroupWidget\ProductLabelProductViewExpanderPlugin;

class ProductGroupWidgetDependencyProvider extends SprykerShopProductGroupWidgetDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ProductGroupWidgetExtension\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new ProductLabelProductViewExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the product label on a product abstract card changes correctly after hovering over a color selector.

{% endinfo_block %}

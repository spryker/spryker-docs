---
title: Product Group Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/product-group-feature-integration
redirect_from:
  - /v3/docs/product-group-feature-integration
  - /v3/docs/en/product-group-feature-integration
---

## Prerequisites

To prepare your project to work with Product groups:

1. Require the Product Group modules in your `composer.json` by running `composer require spryker/product-group spryker/product-group-collector`.
2. Install the new database tables by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
3. Apply the database changes: run `vendor/bin/console propel:migrate`.
4. Generate ORM models: run `vendor/bin/console propel:model:build`.
* After running this command, you’ll find some new classes in your project under the `\Orm\Zed\ProductGroup\Persistence` namespace. It’s important that you make sure that they extend the base classes from the Spryker core, e.g.:
* `\Orm\Zed\ProductGroup\Persistence\SpyProductGroup` extends `\Spryker\Zed\ProductGroup\Persistence\Propel\AbstractSpyProductGroup`
* `\Orm\Zed\ProductGroup\Persistence\SpyProductAbstractGroup` extends `\Spryker\Zed\ProductGroup\Persistence\Propel\AbstractSpyProductAbstractGroup`
* `\Orm\Zed\ProductGroup\Persistence\SpyProductGroupQuery` extends `\Spryker\Zed\ProductGroup\Persistence\Propel\AbstractSpyProductGroupQuery`
* `\Orm\Zed\ProductGroup\Persistence\SpyProductAbstractGroupQuery` extends `\Spryker\Zed\ProductGroup\Persistence\Propel\AbstractSpyProductAbstractGroupQuery`

5. Run `vendor/bin/console transfer:generate` to get the new transfer objects.
6. Activate the product group collectors by adding the `ProductGroupCollectorStoragePlugin` and  `ProductAbstractGroupsCollectorStoragePlugin` to the storage collector plugin stack, see example below:

```php
<?php

namespace Pyz\Zed\Collector;

use Spryker\Shared\ProductGroup\ProductGroupConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductGroupCollector\Communication\Plugin\ProductAbstractGroupsCollectorStoragePlugin;
use Spryker\Zed\ProductGroupCollector\Communication\Plugin\ProductGroupCollectorStoragePlugin;
// ...

class CollectorDependencyProvider extends SprykerCollectorDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        // ...
       
        $container[self::STORAGE_PLUGINS] = function (Container $container) {
            return [
                // ...
                ProductGroupConfig::RESOURCE_TYPE_PRODUCT_GROUP => new ProductGroupCollectorStoragePlugin(),
                ProductGroupConfig::RESOURCE_TYPE_PRODUCT_ABSTRACT_GROUPS => new ProductAbstractGroupsCollectorStoragePlugin(),
            ];
        };
        
        // ...
    }
}
```

## Data Setup
You should now be able to use the Zed API of the `ProductGroup` module to manage product groups, and the collectors should also be able to export them to the KV storage. This is a good time to implement an installer in your project to group products in a way how you’ll want to show them in your shop frontend. Check out our [Demoshop](https://github.com/spryker/demoshop) implementation for examples and ideas.

## Usage in Yves
The KV storage should by now have some product groups we can display in our frontend.
The `ProductGroup` module is shipped with a twig extension that provides the `spyProductGroupItems() twig` function. This function collects necessary data from the KV storage and renders it in the specified way.

`spyProductGroupItems()` accepts two parameters:
1. **$idProductAbstract**: Reference of an abstract product by its ID field.
2. **$template**: Template path used to render the product group items (i.e. `"@ProductGroup/partials/product-group-items.twig"`).

To enable this twig function, you’ll need to register `\Spryker\Yves\ProductGroup\Plugin\Provider\ProductGroupTwigServiceProvider` in your application’s bootstrap.

```php
<?php

namespace Pyz\Yves\Application;

use Spryker\Yves\ProductGroup\Plugin\Provider\ProductGroupTwigServiceProvider;
// ...

class YvesBootstrap
{
    /**
     * @return void
     */
    protected function registerServiceProviders()
    {
        // ...
        $this->application->register(new ProductGroupTwigServiceProvider());
    }
}
```

Below there is an example of rendering product group items in a Yves twig template (i.e. on catalog and product detail pages):

```php
{% raw %}{{{% endraw %} spyProductGroupItems(idProductAbstract, '@ProductGroup/partials/product-group-items.twig') {% raw %}}}{% endraw %}
```

## Rendering Product Group Items Templates
The templates used to render product group items use the `productGroupItems` template variable. The variable is an array that contains abstract products from the same group(s) that the subject product is in. The abstract products are read from the KV storage (as they were stored by the storage product collector) for the current locale.

The following code examples show the Demoshop implementation of how to render product group items. Our demo products have a `colorCode` attribute that we use as the group item selector in the shop. You could use any other attribute as well for group selector.

In `Pyz/Yves/ProductGroup/Theme/default/partials/product-group-items.twig` we simply traverse the product group items and display a list of links to the PDP of each product in the group. The links represent the color of each product.

```xml
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if productGroupItems|length {% raw %}%}{% endraw %}
       <div data-component="product-group">
            <ul class="product-group">
                {% raw %}{%{% endraw %} for productGroupItem in productGroupItems {% raw %}%}{% endraw %}
                    <li data-product-group-item-preview="{% raw %}{{{% endraw %} productGroupItem.imageSets.default[0].externalUrlSmall {% raw %}}}{% endraw %}">
                        <a href="{% raw %}{{{% endraw %} productGroupItem.url {% raw %}}}{% endraw %}" {% raw %}{%{% endraw %} if productGroupItem.colorCode {% raw %}%}{% endraw %}style="background-color: {% raw %}{{{% endraw %} productGroupItem.colorCode {% raw %}}}{% endraw %};"{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}></a>
                    </li>
                {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
            </ul>
        </div>
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

In the catalog pages of our Demoshop we also added custom styling and Javascript to display the image of an item on mouseover, but what and how you want to display for each item in the group is entirely up to your implementation.

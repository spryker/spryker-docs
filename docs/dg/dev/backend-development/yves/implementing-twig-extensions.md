---
title: Implementing Twig extensions
description: Create custom Twig extensions to enhance frontend templates. Learn to implement, register, and utilize Twig functions for a flexible ecommerce experience.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-twig-extensions
originalArticleId: 4a503169-a26b-4a37-bb44-f20b34a81c4e
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-twig-extensions.html
related:
  - title: "Tutorial: How the define Twig tag is working"
    link: docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-how-the-define-twig-tag-is-working.html
---

This document shows how to implement a Twig extension. As an example, let's build a filter which can be used for displaying prices.

To implement a Twig extension, take the following steps.

## 1. Implement the filter

To implement the filter, add the logic to a dedicated class in the module you're currently working on:

```php
<?php
namespace Pyz\Service\ExampleBundle\Plugin\Twig\Filters;

class PriceFilter
{
    const DECIMALS = 2;

    const DIVIDER = 100;

    /**
     * @return string
     */
    protected function getCurrency(): string
    {
        // here can be more logic to get the used currency
        return '&euro;';
    }

    /**
     * @return string
     */
    public function getConvertedPrice($price): string
    {
        // here could be more logic to convert the price if it needs to be displayed in a different currency
        return sprintf(
            '%s %s',
            number_format($price / static::DIVIDER, static::DECIMALS),
            $this->getCurrency()
        );
    }
}
```


```php
<?php
namespace Pyz\Service\ExampleBundle;

use Pyz\Service\ExampleBundle\Plugin\Twig\Filters\PriceFilter;
use Spryker\Service\Kernel\AbstractServiceFactory;

class ServiceFactory extends AbstractServiceFactory
{
    /**
     * @return \Pyz\Service\ExampleBundle\Plugin\Twig\Filters\PriceFilter
     */
    public function createPriceFilter(): PriceFilter
    {
        return new PriceFilter();
    }

}
```


```php
<?php
namespace Pyz\Service\ExampleBundle;

class PriceFilterService extends AbstractService implements PriceFilterServiceInterface
{
    /**
     * @param int $price
     *
     * @return string
     */
    public function getConvertedPrice(int $price): string
    {
        return $this->getFactory()->createPriceFilter()->getConvertedPrice($price);
    }

}
```

## 2. Add the Twig extension

Add the Twig extension by creating a class that extends the `AbstractTwigExtensionPlugin` class and calls the logic implemented in the preceding class.


```php
<?php
namespace Pyz\Service\ExampleBundle\Plugin\Twig;

use Spryker\Service\Twig\Plugin\AbstractTwigExtensionPlugin;
use Spryker\Shared\Twig\TwigFilter;

/**
 * @method \Pyz\Service\ExampleBundle\PriceFilterService getService()
 */
class ExampleTwigExtensionPlugin extends AbstractTwigExtensionPlugin
{

    /**
     * @return array
     */
    public function getFilters(): array
    {
        return [
            new TwigFilter(
                'myFilter',
                function ($price) {
                    return $this->getService()->getConvertedPrice($price);
                },
                ['is_safe' => ['html']]
            );
        ];
    }
}
```

## 3. Register the Twig extension you created

To be able to use the extension from the Twig templates, the extension must be registered in the `getTwigExtensions()` method from the `TwigDependencyProvider` class. See [Defining the module dependencies: Dependency Provider](/docs/dg/dev/backend-development/data-manipulation/data-interaction/define-module-dependencies-dependency-provider.html) for information on the dependency providers.

Add a reference to the Twig extension in `TwigDependencyProvider.php`:

```php
<?php
use Pyz\Service\ExampleBundle\Plugin\Twig\ExampleTwigExtensionPlugin;

// Instantiate the new Twig extension
protected function getTwigPlugins(Application $app): array
{
    return [
        new ExampleTwigExtensionPlugin(),
    ];
}
```

## 4. Test the Twig extension

Now, the Twig extension is ready to be used in the Twig templates.

```twig
{# outputs TEST STRING #}

{% raw %}{{{% endraw %} 100|myFilter {% raw %}}}{% endraw %}
```

An input of `100` will be output as `1.00 &euro`.

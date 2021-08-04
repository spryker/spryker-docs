---
title: Tutorial - Twig Extensions
originalLink: https://documentation.spryker.com/v3/docs/t-twig-extensions
redirect_from:
  - /v3/docs/t-twig-extensions
  - /v3/docs/en/t-twig-extensions
---

<!--used to be: http://spryker.github.io/tutorials/yves/twig-extensions/-->
As an example on how to implement a Twig extension, we’ll build a filter which can be used for displaying prices.

* [Implement the filter](https://documentation.spryker.com/v3/docs/t-twig-extensions#implement-the-filter)
* [Add the twig extension](https://documentation.spryker.com/v3/docs/t-twig-extensions#add-the-twig-extension)
* [Register the new twig extension](https://documentation.spryker.com/v3/docs/t-twig-extensions#register-the-twig-extension-that-you-created)
* [Test your twig extension](https://documentation.spryker.com/v3/docs/t-twig-extensions#test-the-twig-extension)

## Implement the Filter
Add the logic to a dedicated class in the module you’re currently working on:

<details open>
<summary>Code sample:</summary>

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
    protected function getCurrency()
    {
        // here can be more logic to get the used currency
        return '&euro;';
    }
 
    /**
     * @return string
     */
    public function getConvertedPrice($price)
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

</br>
</details>

<details open>
<summary>Code sample:</summary>

```php
<?php
namespace Pyz\Service\ExampleBundle;

use Pyz\Service\ExampleBundle\Plugin\Twig\Filters\PriceFilter;
use Spryker\Service\Kernel\AbstractServiceFactory;

class ServiceFactory extends AbstractServiceFactory
{
    /**
     * @return Pyz\Service\ExampleBundle\Plugin\Twig\Filters\PriceFilter
     */
    public function createPriceFilter()
    {
        return new PriceFilter();
    }
 
}
```

</br>
</details>

<details open>
<summary>Code sample:</summary>

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
    public function getConvertedPrice($price)
    {
        return $this->getFactory()->createPriceFilter()->getConvertedPrice($price);
    }
 
}
```

</br>
</details>

## Add the Twig Extension
Create a class that extends the `AbstractTwigExtensionPlugin` class and calls the logic implemented in the class mentioned above.

<details open>
<summary>Code sample:</summary>

```php
<?php
namespace Pyz\Service\ExampleBundle\Plugin\Twig;
 
use Spryker\Service\Twig\Plugin\AbstractTwigExtensionPlugin;
use Spryker\Shared\Twig\TwigFilter;

/**
 * @method \Pyz\Service\ExampleBundle\Plugin\Twig\Filters\PriceFilterService getService()
 */
class ExampleTwigExtensionPlugin extends AbstractTwigExtensionPlugin
{

    /**
     * @return array
     */
    public function getFilters()
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

</br>
</details>

## Register the Twig Extension You Created
To be able to use it from the Twig templates, the extension must be registered in the `getTwigExtensions()` method from the `TwigDependencyProvider` class. 

First, add a reference to the Twig extension in `TwigDependencyProvider.php`:

```php
<?php
use Pyz\Service\ExampleBundle\Plugin\Twig\ExampleTwigExtensionPlugin;

// Instantiate the new Twig extension
protected function getTwigPlugins(Application $app)
{
    return [
        ...
        new ExampleTwigExtensionPlugin(),
    ];
}
```

## Test the Twig Extension
Now, the Twig extension is ready to be used in the Twig templates.

```json
{# outputs TEST STRING #}

{% raw %}{{{% endraw %} 100|myFilter {% raw %}}}{% endraw %}
```
An input of `100` will be output as `1.00 &amp;euro`.

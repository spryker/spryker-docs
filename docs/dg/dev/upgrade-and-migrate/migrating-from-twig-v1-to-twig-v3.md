---
title: Migrate from Twig v1 to Twig v3
description: The article describes how you can migrate from Twig v1 to Twig v3
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migrating-from-twig-v1-to-twig-v3
originalArticleId: 00306b68-cf6d-4141-86a3-d4f1a33e9101
redirect_from:
- /docs/scos/dev/migration-concepts/migrating-from-twig-v1-to-twig-v3.html
---

Currently, Spryker supports only Twig v1 as a template engine. However, Twig v1 is quite an outdated solution, so we have added a possibility to update the Spryker-based projects to the latest version of Twig (v3).

Twig v3 has a few BC incompatibilities that should be fixed to be compatible with both versions.

To migrate to Twig v3, follow the steps:

1. Update modules that have `twig/twig` as a dependency `spryker/twig`, `spryker/twig-extension`.

```bash
composer require spryker/twig:"^3.13.0" spryker/twig-extension:"^1.1.0"
```

If you use `spryker/silexphp` or `spryker-sdk/spryk`, you need to update them too:

```bash
composer update spryker/silexphp spryker-sdk/spryk
```

2. Install the required version of Twig. For example, 3.0.0:

```bash
composer require twig/twig:"^3.0.0"
```

3. Update Spryker core modules that you have in your project. You can find the list of the modules and minimum required versions in the [Spryker Release Management application](https://api.release.spryker.com/release-group/2999).
4. Check if you use `\Spryker\Shared\Twig\TwigFunction` or `\Spryker\Shared\Twig\TwigFilter` as a base class for your custom functions or filters. Those classes are *final* in Twig v3, so you need to use native `\Twig\TwigFunction` and `\Twig\TwigFilter` instead. You can move the class inside your Twig plugins or add some function provider class that you can use with `TwigFunction`:

```php
class SomeFactory
{
    /**
     * @return \Spryker\Shared\Twig\TwigFunctionProvider
     */
    public function createFunctionProvider(): TwigFunctionProvider
    {
        return new FunctionProvider($this->getConfig());
    }

    /**
     * @return \Twig\TwigFunction
     */
    public function createFunction(): TwigFunction
    {
        $functionProvider = $this->createFunctionProvider();

        return new TwigFunction(
            $functionProvider->getFunctionName(),
            $functionProvider->getFunction(),
            $functionProvider->getOptions()
        );
    }
}
```

5. Check how you add Twig functions to the Twig environment and adjust, if needed:

```php
/** @var \Twig\Environment */
$twig;
/** @var \Twig\Function */
$function;

//WRONG
$twig->addFunction($function->getName(), $function);

//CORRECT
$twig->addFunction($function);
```

6. Check if you use `filter` or `spaceless` tags in your `*.twig` files. Those tags were removed in Twig v3, but can use them in all versions with tag `apply`. For example, `{% raw %}{%{% endraw %} apply trans|raw {% raw %}%}{% endraw %}` instead of `{% raw %}{%{% endraw %} filter trans|raw {% raw %}%}{% endraw %}` or `{% raw %}{%{% endraw %} apply spaceless {% raw %}%}{% endraw %}` instead of `{% raw %}{%{% endraw %} spaceless {% raw %}%}{% endraw %}`. The code with `apply` works in all versions.
7. Check if you use `if` tag with `for` tag. This will not work with Twig v3, so you need to put this `if` tag inside the loop body.

```php
{% raw %}{%{% endraw %} for item in order.items {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if item.salesOrderConfiguredBundle {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} set bundleId = item.salesOrderConfiguredBundle.idSalesOrderConfiguredBundle {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} set configuredBundleItemLength = configuredBundleItemLength | merge({('_' ~ bundleId):
            configuredBundleItemLength['_' ~ bundleId] is defined ?
            (configuredBundleItemLength['_' ~ bundleId] + 1) : 1
        }) {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
```

8. Check if you use `sameas` in conditions. It was removed in Twig v3 in favor of `same as` alias that we have also in v1.
9. Import macros in the file that you are going to use:

```php
{% raw %}{%{% endraw %} import _self as macro {% raw %}%}{% endraw %}
```

10. Check if you don't use object as an argument with replace tag:

```php
//WRONG
{% raw %}{{{% endraw %} replace('Bob', 'Alice') {% raw %}}}{% endraw %}

//CORRECT
{% raw %}{{{% endraw %} replace({'Bob': 'Alice'}) {% raw %}}}{% endraw %}
```

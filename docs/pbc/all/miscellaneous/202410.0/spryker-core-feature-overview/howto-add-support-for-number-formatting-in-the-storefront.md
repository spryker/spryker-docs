---
title: "HowTo: Add support for number formatting in the Storefront"
description: Learn how to add support for numbers formatting in the Spryker Storefront User Interface.
template: howto-guide-template
last_updated: Nov 04, 2022
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-add-support-for-number-formatting-in-the-storefront.html
---

Number formats can vary by locales. For example, if in the DE locale there is a number *123.456,78*, in the US locale it would be *123,456.78*. To enable the proper number formatting by locale in your store, follow the instructions in this document.

## Prerequisites

To add support for number formatting in the Storefront, integrate the required features:

| NAME                                   | VERSION          | INSTALLATION GUIDE                                                                                                                                              |
|----------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                           | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                           |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/util-number
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE     | EXPECTED DIRECTORY          |
|------------|-----------------------------|
| UtilNumber | vendor/spryker/util-number  |
| ShopUi     | vendor/spryker-shop/shop-ui |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                  | TYPE  | EVENT   | PATH                                                           |
|---------------------------|-------|---------|----------------------------------------------------------------|
| NumberFormatConfig        | class | created | src/Generated/Shared/Transfer/NumberFormatConfigTransfer       |
| NumberFormatFilter        | class | created | src/Generated/Shared/Transfer/NumberFormatFilterTransfer       |
| NumberFormatIntRequest    | class | created | src/Generated/Shared/Transfer/NumberFormatIntRequestTransfer   |
| NumberFormatFloatRequest  | class | created | src/Generated/Shared/Transfer/NumberFormatFloatRequestTransfer |

{% endinfo_block %}

## 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                           | SPECIFICATION                                                         | PREREQUISITES | NAMESPACE                                                     |
|----------------------------------|-----------------------------------------------------------------------|---------------|---------------------------------------------------------------|
| NumberFormatterTwigPlugin        | Extends Twig with `formatInt()` and `formatFloat()` filter functions. | None          | SprykerShop\Yves\ShopUi\Plugin\Twig\NumberFormatterTwigPlugin |

**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\ShopUi\Plugin\Twig\NumberFormatterTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            ...
            new NumberFormatterTwigPlugin(),
        ];
    }
}
```

## 4) Install npm dependency

Add `autonumeric` dependency:

```bash
npm install autonumeric@~4.6.0
```

## 5) Build the Storefront UI frontend

Enable Javascript and CSS changes for the Storefront:

```bash
console frontend:yves:build
```

After applying all these changes, you can see formatted prices and numbers in the Storefront forms and views.

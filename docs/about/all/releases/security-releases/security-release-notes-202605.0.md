---
title: Security release notes 202605.0
description: Security updates released for version 202605.0
last_updated: May 21, 2026
template: concept-topic-template
publish_date: "2026-05-18"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Information disclosure via phpinfo() method

{% info_block warningBox "Prerequisite" %}

This security update requires [Spryker 202604.0](/docs/about/all/releases/release-notes-202604.0.html) or later. Ensure your project is upgraded to this version before applying the fix.

{% endinfo_block %}

Instances of phpinfo() were identified in the codebase, which could potentially expose sensitive configuration details and environment variables to unauthorized parties. Such an instance was found to be part of the default Back Office setup.

### Affected modules

- `spryker/setup`: < 4.8.0
- `spryker/maintenance`: < 3.6.0

### Fix the vulnerability

Update the `spryker/setup` package to version 4.8.0 or higher:

```bash
composer update spryker/setup:"^4.8.0"
composer show spryker/setup # Verify the version
```

Update the `spryker/maintenance` package to version 4.0.0 or higher:

```bash
composer update spryker/maintenance:"^4.0.0"
composer show spryker/maintenance # Verify the version
```


## Possible brute force attack in adding discount voucher / gift card codes

An automated attack could attempt to guess valid strings by using every possible combination and/or pre-defined dictionaries.
In the site frontend, there is the possibility to use a discount code (voucher) or a gift card code, which is a predefined or randomized string.

### Affected modules

- `spryker-shop/cart-code-widget`: < 1.6.0

### Fix the vulnerability

Update the `spryker-shop/cart-code-widget` package to version 1.7.0 or higher:

```bash
composer update spryker-shop/cart-code-widget:"^1.7.0"
composer show spryker-shop/cart-code-widget # Verify the version
```


Enable `SecurityBlockerCartCodeEventDispatcherPlugin` plugin:

**src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use SprykerShop\Yves\CartCodeWidget\Plugin\EventDispatcher\SecurityBlockerCartCodeEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new SecurityBlockerCartCodeEventDispatcherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. From the cart page, submit an invalid voucher or gift card code multiple times.
2. After exceeding the configured number of attempts, make sure the request is blocked and the `cart_code_widget.error.too_many_requests` error message is displayed.

{% endinfo_block %}

Add glossary translations for the message `cart_code_widget.error.too_many_requests`.
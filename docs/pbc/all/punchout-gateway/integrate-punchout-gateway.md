---
title: Integrate PunchOut Gateway
description: Integrate PunchOut Gateway into a Spryker shop.
last_updated: Apr 24, 2026
template: howto-guide-template
---

This document describes how to integrate the PunchOut Gateway module into a Spryker shop.

## 1. Install the module

Install the PunchOut Gateway module using Composer:

```bash
composer require spryker-eco/punchout-gateway:^0.2.0
```

## 2. Configure the module

To control logging through the AWS Parameter Store, add the following optional configuration:

**config/Shared/config_default.php**

```php
use SprykerEco\Shared\PunchoutGateway\PunchoutGatewayConstants;

$config[PunchoutGatewayConstants::ENABLE_LOGGING] = getenv('PUNCHOUT_GATEWAY_ENABLE_LOGGING') ?: false;
```

### Configuration constants

| Constant | Description                                                                                                                                     | Default  |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `ENABLE_LOGGING` | Enables or disables logging for PunchOut Gateway. Check `\SprykerEco\Shared\PunchoutGateway\Logger\PunchoutLogger` to see what is logged. | `false` |

## 3. Additional module configuration

`src/Pyz/Zed/PunchoutGateway/PunchoutGatewayConfig.php` provides the following configuration methods:

| Method | Default | Description |
|--------|---------|-------------|
| `isLoggingEnabled()` | `true` | Enables or disables PunchOut Gateway logging. |
| `getCxmlSessionStartUrlValidityInSeconds()` | `600` | Validity period of the cXML session start URL in seconds. |
| `getOciDefaultStartUrl()` | `'/'` | Default redirect URL after OCI session start. |
| `getCxmlSessionTokenLength()` | `32` | Length of the generated cXML session token. |

## 4. Update Quote configuration

Update `QuoteConfig` to allow the PunchOut session field to be saved with the quote.

**src/Pyz/Zed/Quote/QuoteConfig.php**

```php
use Generated\Shared\Transfer\QuoteTransfer;

public function getQuoteFieldsAllowedForSaving(): array
{
    return array_merge(parent::getQuoteFieldsAllowedForSaving(), [
        // ...
        QuoteTransfer::PUNCHOUT_SESSION,
    ]);
}
```

## 5. Set up the database schema

Install the database schema:

```bash
vendor/bin/console propel:install
```

This creates the following tables:

| Table | Description |
|-------|-------------|
| `spy_punchout_connection` | Stores PunchOut connection configuration per store. |
| `spy_punchout_credential` | Stores credentials (username/password) linked to a connection and customer. |
| `spy_punchout_session` | Stores active PunchOut sessions linked to a quote. |

## 6. Generate transfer objects

Generate transfer objects for the module:

```bash
vendor/bin/console transfer:generate
```

## 7. Register plugins

### Register the Quote expander plugin

Add the PunchOut session expander plugin:

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
use SprykerEco\Zed\PunchoutGateway\Communication\Plugin\Quote\PunchoutSessionQuoteExpanderPlugin;

protected function getQuoteExpanderPlugins(): array
{
    return [
        // ...
        new PunchoutSessionQuoteExpanderPlugin(),
    ];
}
```

### Register the route provider plugin

Add the route provider plugin:

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
use SprykerEco\Yves\PunchoutGateway\Plugin\Router\PunchoutGatewayRouteProviderPlugin;

protected function getRouteProvider(): array
{
    return [
        // ...
        new PunchoutGatewayRouteProviderPlugin(),
    ];
}
```

### Register the security header expander plugin

Add the security header expander plugin:

**src/Pyz/Yves/Application/ApplicationDependencyProvider.php**

```php
use SprykerEco\Yves\PunchoutGateway\Plugin\Application\PunchoutSecurityHeaderExpanderPlugin;

protected function getSecurityHeaderExpanderPlugins(): array
{
    return [
        // ...
        new PunchoutSecurityHeaderExpanderPlugin(),
    ];
}
```

### Support iframe embedding

If your eProcurement system requires embedding into an iframe, you must also adjust this variable in the deploy file for your environments:

```yml
image:
  environment:
    SPRYKER_YVES_SESSION_COOKIE_SAMESITE: 'none'
```


## 8. Register the cart widget

Add the PunchOut cart widget:

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
use SprykerEco\Yves\PunchoutGateway\Widget\PunchoutCartWidget;

protected function getGlobalWidgets(): array
{
    return [
        // ...
        PunchoutCartWidget::class,
    ];
}
```

If you have custom Yves templates or your own frontend, add `PunchoutCartWidget` to your cart template. The core template is located at `SprykerShop/Yves/CartPage/Theme/default/templates/page-layout-cart/page-layout-cart.twig`.

The following example shows `PunchoutCartWidget` usage:

```twig
{% raw %}
{% widget 'PunchoutCartWidget' args [data.cart] only %}{% endwidget %}
{% endraw %}
```

## 9. Import glossary data

The module provides glossary translations used by the PunchOut flow.

**Option 1: Import using the module's configuration file**

```bash
vendor/bin/console data:import --config=vendor/spryker-eco/punchout-gateway/data/import/punchout-gateway.yml
```

**Option 2: Copy file content and import individually**

Copy content from `vendor/spryker-eco/punchout-gateway/data/import/*.csv` to the corresponding files in `data/import/common/common/`. Then run:

```bash
vendor/bin/console data:import glossary
```

## Additional links

For details about fine-tuning the integration on the project level, see [Project configuration for PunchOut Gateway](/docs/pbc/all/punchout-gateway/project-configuration-for-punchout-gateway.html).
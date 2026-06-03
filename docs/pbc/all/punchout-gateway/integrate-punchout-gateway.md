---
title: Integrate PunchOut Gateway
description: Integrate PunchOut Gateway into a Spryker shop.
last_updated: Jun 03, 2026
template: howto-guide-template
label: early-access
---

This document describes how to integrate the PunchOut Gateway module into a Spryker shop.

## 1. Install the module

Install the PunchOut Gateway module using Composer:

```bash
composer require spryker-eco/punchout-gateway:^1.0.0
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
| `ENABLE_LOGGING` | Enables or disables logging for PunchOut Gateway. | `false` |

### Logging

When logging is enabled, the module emits structured entries through `\SprykerEco\Shared\PunchoutGateway\Logger\PunchoutLoggerInterface`. The shipped implementation `PunchoutLogger` writes to the standard Spryker log channels and covers, among others, request reception and parsing, authentication attempts and outcomes, response generation, quote and session creation, and uncaught throwables. When logging is disabled, the resolver returns `NullPunchoutLogger` and all calls become no-ops.

## 3. Additional module configuration

`src/Pyz/Zed/PunchoutGateway/PunchoutGatewayConfig.php` provides the following configuration methods:

| Method | Default | Description |
|--------|---------|-------------|
| `isLoggingEnabled()` | `false` | Enables or disables PunchOut Gateway logging. |
| `getCxmlSessionStartUrlValidityInSeconds()` | `600` | Validity period of the cXML session start URL in seconds. |
| `getOciDefaultStartUrl()` | `'/'` | Default redirect URL after OCI session start. |
| `getCxmlSessionTokenLength()` | `32` | Length of the generated cXML session token. |

The same values can be changed at runtime through the Back Office under *Configuration > Punchout Gateway*.

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

The widget is rendered wherever it is embedded by the cart template. If your project uses the stock `spryker-shop/cart-page` template, embed it inside `SprykerShop/Yves/CartPage/Theme/default/templates/page-layout-cart/page-layout-cart.twig` (or your override) so that the "Transfer Cart" button is shown on the cart page.

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

## 10. Translations for the Back Office

The module ships Zed translations for the Back Office UI in `vendor/spryker-eco/punchout-gateway/data/translation/Zed/en_US.csv` and `de_DE.csv`. They are picked up by the standard Zed translator on the next request—no separate import step is required. To override a label, add an entry with the same key to your project's Zed translation file.

## Verify the integration

After completing the steps above:

- Open *Punchout Connections* in the Back Office. The grid should render empty until you create your first connection.
- Run `vendor/bin/console punchout-gateway:demo-connection:create` to insert demo cXML and OCI connections for store `DE` and confirm that DB table `spy_punchout_connection` and the grid both reflect them.

## Additional links

- [Manage PunchOut connections](/docs/pbc/all/punchout-gateway/manage-punchout-connections.html) — Back Office workflow for connections and credentials.
- [Project configuration for PunchOut Gateway](/docs/pbc/all/punchout-gateway/project-configuration-for-punchout-gateway.html) — connection columns, processor and form-handler plugins, endpoints.
- [PunchOut Protocols Coverage](/docs/pbc/all/punchout-gateway/punchout-protocol-coverage.html) — cXML and OCI field-by-field mapping.

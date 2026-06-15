---
title: Create a product configurator
description: Learn how to build a custom product configurator and integrate it with a Spryker shop, based on the Water Treatment configurator example.
last_updated: Jun 15, 2026
template: howto-guide-template
---

This document explains how to build a custom [product configurator](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html) at the code level and integrate it with a Spryker shop.

It uses the *Water Treatment* configurator example (`WaterTreatmentConfiguratorPageExample`) as a reference. The example lets a customer configure an industrial water treatment system (flow rate, filtration type, tank material, control system, inlet connection, and power supply). Use it as a blueprint for your own configurator.

Before you start, make sure the [Product Configuration feature is installed](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-configuration-feature.html). This document does not cover the core modules (`ProductConfiguration`, `ProductConfigurationStorage`, `ProductConfiguratorGatewayPage`, `ProductConfigurationCart`, the configuration widgets) — they are reused as is.

## Architecture overview

A product configurator consists of two parts:

1. **A standalone configurator application** — a self-contained web app, served on its own host, where the customer selects the configuration. It is not part of the Yves/Zed application; it is bootstrapped from its own `public/` entry point.
2. **Shop-side integration** — the plugins and configuration that let the shop redirect to the configurator, route by configurator key, render the saved configuration on the Storefront and in the Back Office, and accept the configurator key in the cart, shopping list, and checkout.

The data flow between the two is described in [Configuration process flow of configurable products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configuration-process-flow-of-configurable-product.html).

The example module spans the following layers:

```text
src/Pyz/Shared/WaterTreatmentConfiguratorPageExample/      # configurator key constant
src/Pyz/Client/WaterTreatmentConfiguratorPageExample/      # request expander (access token URL)
src/Pyz/Yves/WaterTreatmentConfiguratorPageExample/        # ConfiguratorPage, Theme (Angular app), render-strategy + security plugins
src/Pyz/Zed/WaterTreatmentConfiguratorPageExample/         # frontend build config/console, sales render-strategy plugin
public/WaterTreatmentConfigurator/                         # standalone app entry point + built assets (dist)
```

## 1. Define the configurator key

Each configurator is identified by a unique key. Add a shared config that exposes it:

```php
// src/Pyz/Shared/WaterTreatmentConfiguratorPageExample/WaterTreatmentConfiguratorPageExampleConfig.php
namespace Pyz\Shared\WaterTreatmentConfiguratorPageExample;

class WaterTreatmentConfiguratorPageExampleConfig
{
    public const WATER_TREATMENT_CONFIGURATOR_KEY = 'WATER_TREATMENT_CONFIGURATOR';
}
```

This key is used everywhere the shop needs to recognize the configurator: the request expander, the supported-keys configs, and the data import.

## 2. Configure the host and shared secrets

The configurator is served on a dedicated host. Set the host and port per environment in your `deploy.*.yml` files, and register the host in the application endpoints:

```yaml
# deploy.dev.yml
environment:
    SPRYKER_WATER_TREATMENT_CONFIGURATOR_HOST: water-treatment-configurator.spryker.local
    SPRYKER_WATER_TREATMENT_CONFIGURATOR_PORT: 80
# ...
groups:
    applications:
        yves:
            endpoints:
                water-treatment-configurator.spryker.local:
                    entry-point: WaterTreatmentConfigurator
```

{% info_block warningBox "Cloud environments" %}

Adding a new host in `deploy.*.yml` does not create the DNS record in the cloud hosted zone. For cloud environments, align with the infrastructure team to add the DNS record for the new host.

{% endinfo_block %}

The configurator and the shop exchange a checksum signed with a shared secret. Keep the encryption key and initialization vector in `config/Shared/config_default.php` (shared by the shop and the configurator app):

```php
$config[ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY] = getenv('SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY') ?: 'change123';
$config[ProductConfigurationConstants::SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR] = getenv('SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR') ?: '0c1ffefeebdab4a3d839d0e52590c9a2';
```

The shop redirects the customer to the configurator host, so add the host to the kernel domain allowlist in the same file:

```php
$config[KernelConstants::DOMAIN_WHITELIST][] = getenv('SPRYKER_WATER_TREATMENT_CONFIGURATOR_HOST');
```

## 3. Build the standalone configurator application

### Entry point

The configurator app is bootstrapped from its own `public/` entry point. It loads the autoloader only — it does not boot the Yves/Zed kernel—so it stays lightweight:

```php
// public/WaterTreatmentConfigurator/index.php
use Pyz\Yves\WaterTreatmentConfiguratorPageExample\ConfiguratorPage;
use Symfony\Component\HttpFoundation\Response;

define('APPLICATION', 'CONFIGURATOR');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

$response = (new ConfiguratorPage())->render();

if ($response instanceof Response) {
    $response->send();
}

echo $response;
```

Because the kernel is not bootstrapped here, read environment values directly with `getenv()` rather than `Config::get()`.

### ConfiguratorPage

`ConfiguratorPage` handles all requests to the configurator host. It distinguishes them by method and query parameters:

- `POST` (create token) — starts a session, stores the request payload sent by the shop, and returns the redirect URL to the configurator page.
- `GET` with `getConfigurationByToken` — returns the stored payload for a session token, so the frontend app can render it.
- `POST` with `prepareConfiguration` — signs the submitted configuration with the shared key and returns the checksum and timestamp.
- Default `GET` — serves the configurator HTML page (the built frontend app).

```php
// src/Pyz/Yves/WaterTreatmentConfiguratorPageExample/ConfiguratorPage.php
namespace Pyz\Yves\WaterTreatmentConfiguratorPageExample;

class ConfiguratorPage
{
    public function render()
    {
        if ($this->request->isMethod('GET') && $this->request->query->has('getConfigurationByToken')) {
            return $this->getRequestDataByTokenAction();
        }

        if ($this->request->isMethod('POST') && $this->request->query->has('prepareConfiguration')) {
            return $this->prepareConfigurationResponseAction();
        }

        if ($this->request->isMethod('POST')) {
            return $this->createTokenAction();
        }

        return $this->renderHtmlPageAction();
    }

    protected function createConfiguratorRedirectUrl(): string
    {
        return sprintf(
            '%s://%s?token=%s',
            getenv('SPRYKER_WATER_TREATMENT_CONFIGURATOR_PORT') === '443' ? 'https' : 'http',
            getenv('SPRYKER_WATER_TREATMENT_CONFIGURATOR_HOST') ?: '',
            htmlspecialchars($this->session->getId()),
        );
    }
}
```

The checksum is generated with the shared encryption key and initialization vector, so the shop can validate the configuration the configurator returns:

```php
$checkSum = (new CrcOpenSslChecksumGenerator(getenv('SPRYKER_PRODUCT_CONFIGURATOR_HEX_INITIALIZATION_VECTOR') ?: ''))
    ->generateChecksum($productConfiguration, getenv('SPRYKER_PRODUCT_CONFIGURATOR_ENCRYPTION_KEY') ?: '');
```

### Frontend application

The configurator UI is a self-contained frontend application (in the example, an Angular app) located in the module's `Theme/ConfiguratorApplication` folder. It is built into the `public/` folder of the configurator host.

The default `GET` request to the configurator host serves a static shell, `Theme/index.html`, which loads the built application:

```php
// ConfiguratorPage::renderHtmlPageAction()
return file_get_contents(__DIR__ . '/Theme/index.html');
```

Point the build to your app in the Zed module config. `getFrontendOriginPath()` resolves the built app inside the module, and `getFrontendTargetPath()` resolves the public folder of the configurator host:

```php
// src/Pyz/Zed/WaterTreatmentConfiguratorPageExample/WaterTreatmentConfiguratorPageExampleConfig.php
protected const FRONTEND_TARGET_PATH = '/public/WaterTreatmentConfigurator/dist';
protected const FRONTEND_ORIGIN_PATH = '../../Yves/WaterTreatmentConfiguratorPageExample/Theme/ConfiguratorApplication/dist';

public function getFrontendOriginPath(): string
{
    return sprintf('%s/%s', __DIR__, static::FRONTEND_ORIGIN_PATH);
}

public function getFrontendTargetPath(): string
{
    return sprintf('%s/%s', APPLICATION_ROOT_DIR, static::FRONTEND_TARGET_PATH);
}
```

The build is handled by the module's Zed business layer (`Business/Builder/FrontendBuilder`, exposed through `WaterTreatmentConfiguratorPageExampleFacade::buildProductConfigurationFrontend()`) and triggered by a console command:

```php
// src/Pyz/Zed/WaterTreatmentConfiguratorPageExample/Communication/Console/WaterTreatmentProductConfiguratorBuildFrontendConsole.php
public const COMMAND_NAME = 'frontend:water-treatment-product-configurator:build';
```

Register the console in `Pyz\Zed\Console\ConsoleDependencyProvider` and run it during the build/install step of your environment:

```bash
console frontend:water-treatment-product-configurator:build
```

{% info_block infoBox "Standalone tooling" %}

The configurator frontend app has its own tooling and formatting. Exclude it from the project linters and formatters—for example, add its `Theme/ConfiguratorApplication` path to `.stylelintignore` and `.prettierignore`.

{% endinfo_block %}

## 4. Route the shop to the configurator

When a customer clicks **Configure**, the shop sends an access-token request to the configurator host. Tell the shop which host to use for your configurator key with a `ProductConfiguratorRequestExpanderPlugin`:

```php
// src/Pyz/Client/WaterTreatmentConfiguratorPageExample/Plugin/ProductConfiguration/ExampleWaterTreatmentProductConfiguratorRequestExpanderPlugin.php
namespace Pyz\Client\WaterTreatmentConfiguratorPageExample\Plugin\ProductConfiguration;

class ExampleWaterTreatmentProductConfiguratorRequestExpanderPlugin extends AbstractPlugin implements ProductConfiguratorRequestExpanderPluginInterface
{
    public function expand(ProductConfiguratorRequestTransfer $productConfiguratorRequestTransfer): ProductConfiguratorRequestTransfer
    {
        return $productConfiguratorRequestTransfer->setAccessTokenRequestUrl($this->createConfiguratorUrl());
    }

    protected function createConfiguratorUrl(): string
    {
        return sprintf(
            '%s://%s',
            getenv('SPRYKER_WATER_TREATMENT_CONFIGURATOR_PORT') === '443' ? 'https' : 'http',
            getenv('SPRYKER_WATER_TREATMENT_CONFIGURATOR_HOST') ?: '',
        );
    }
}
```

Register it in `Pyz\Client\ProductConfiguration\ProductConfigurationDependencyProvider::getProductConfigurationRequestExpanderPlugins()`.

{% info_block infoBox "Multiple configurators" %}

If your shop has several configurators, route by `configuratorKey` inside `expand()`: read `$productConfiguratorRequestTransfer->getProductConfiguratorRequestDataOrFail()->getConfiguratorKey()` and map each key to its host.

{% endinfo_block %}

### Content Security Policy

The shop redirects to the configurator host through a form submit, so the configurator host must be allowlisted in the `form-action` directive of the `Content-Security-Policy` header. Add a `SecurityHeaderExpanderPlugin`:

```php
// src/Pyz/Yves/WaterTreatmentConfiguratorPageExample/Plugin/Application/WaterTreatmentConfiguratorSecurityHeaderExpanderPlugin.php
public function expand(array $securityHeaders): array
{
    $securityHeaders['Content-Security-Policy'] = str_replace(
        'form-action',
        sprintf('form-action %s', $this->createConfiguratorUrl()),
        $securityHeaders['Content-Security-Policy'] ?? '',
    );

    return $securityHeaders;
}
```

Register it in `Pyz\Yves\Application\ApplicationDependencyProvider`.

## 5. Allow the configurator key in the shop

By default, the configuration widgets and the gateway page accept only the configurator key shipped with the feature. Override `getSupportedConfiguratorKeys()` to add your key in each place a customer can configure or reconfigure a product:

- `Pyz\Yves\ProductConfiguratorGatewayPage\ProductConfiguratorGatewayPageConfig` — the **Configure** button on the Product Details page.
- `Pyz\Yves\ProductConfigurationCartWidget\ProductConfigurationCartWidgetConfig` — reconfiguring from the cart.
- `Pyz\Yves\ProductConfigurationShoppingListWidget\ProductConfigurationShoppingListWidgetConfig` — reconfiguring from a shopping list.

```php
public function getSupportedConfiguratorKeys(): array
{
    return [
        WaterTreatmentConfiguratorPageExampleConfig::WATER_TREATMENT_CONFIGURATOR_KEY,
    ];
}
```

## 6. Render the saved configuration

After a configuration is saved, the shop displays it on the Storefront and in the Back Office. Provide a render-strategy plugin for each location, returning the display data and a template path. Implement one plugin per widget:

| Location | Widget | Plugin interface |
|---|---|---|
| Product Details page | `ProductConfigurationWidget` | `ProductConfigurationRenderStrategyPluginInterface` |
| Cart | `ProductConfigurationCartWidget` | `CartProductConfigurationRenderStrategyPluginInterface` |
| Shopping list | `ProductConfigurationShoppingListWidget` | `ShoppingListItemProductConfigurationRenderStrategyPluginInterface` |
| Order (Storefront) | `SalesProductConfigurationWidget` | `SalesProductConfigurationRenderStrategyPluginInterface` |
| Order (Back Office) | `SalesProductConfigurationGui` | `SalesProductConfigurationRenderStrategyPluginInterface` |

Each Yves plugin implements the widget-specific render-strategy interface (for example, `CartProductConfigurationRenderStrategyPluginInterface` for the cart widget), matches the configurator key in `isApplicable()`, and in `getTemplate()` renders the `options-list` view from the module theme:

```php
public function isApplicable(ProductConfigurationInstanceTransfer $productConfigurationInstance): bool
{
    return $productConfigurationInstance->getConfiguratorKey() === WaterTreatmentConfiguratorPageExampleConfig::WATER_TREATMENT_CONFIGURATOR_KEY;
}

public function getTemplate(ProductConfigurationInstanceTransfer $productConfigurationInstance): ProductConfigurationTemplateTransfer
{
    return (new ProductConfigurationTemplateTransfer())
        ->setData(json_decode($productConfigurationInstance->getDisplayDataOrFail(), true) ?? [])
        ->setModuleName('WaterTreatmentConfiguratorPageExample')
        ->setTemplateType('view')
        ->setTemplateName('options-list');
}
```

The Back Office (Zed) plugin renders a presentation partial of the module:

```php
return (new SalesProductConfigurationTemplateTransfer())
    ->setData(json_decode($itemTransfer->getSalesOrderItemConfigurationOrFail()->getDisplayDataOrFail(), true) ?? [])
    ->setTemplatePath('@WaterTreatmentConfiguratorPageExample/_partials/order-item-configuration.twig');
```

Provide the templates in your module. The Storefront `options-list` view renders the display data as a collapsible list:

{% raw %}

```twig
{# src/Pyz/Yves/WaterTreatmentConfiguratorPageExample/Theme/default/views/options-list/options-list.twig #}
{% extends model('template') %}

{% define data = {
    listItems: {},
} %}

{% block body %}
    {% include molecule('collapsible-list') with {
        data: {
            listItems: data.listItems,
        },
    } only %}
{% endblock %}
```

{% endraw %}

The Back Office partial renders the first three attributes, with the rest collapsed behind a **Show more** toggle:

{% raw %}

```twig
{# src/Pyz/Zed/WaterTreatmentConfiguratorPageExample/Presentation/_partials/order-item-configuration.twig #}
<br>
{% for key, configuration in data | slice(0, 3) %}
    <div class="spacing-bottom">
        <strong>{{ key }}:</strong> {{ configuration }}
    </div>
{% endfor %}

{% if data | length > 3 %}
    <div id="attribute_details_configured-{{ IdSalesOrderItem }}" class="hidden">
        {% for key, configuration in data | slice(3) %}
            <div class="spacing-bottom">
                <strong>{{ key }}:</strong> {{ configuration }}
            </div>
        {% endfor %}
    </div>

    <a id="attribute-details-btn-configured-{{ IdSalesOrderItem }}" class="btn btn-sm more-attributes is-hidden" data-id="configured-{{ IdSalesOrderItem }}">
        <span class="show-more">{{ 'Show more' | trans }}</span>
        <span class="show-less">{{ 'Show less' | trans }}</span>
    </a>
{% endif %}
```

{% endraw %}

Register each plugin in the corresponding widget's `DependencyProvider` (for example, `Pyz\Yves\ProductConfigurationCartWidget\ProductConfigurationCartWidgetDependencyProvider`).

## 7. Mark products as configurable

A regular product becomes configurable when a configuration is imported for it. Import a `product_configuration.csv` file that maps the concrete SKU to your configurator key:

```csv
concrete_sku,configurator_key,is_complete,default_configuration,default_display_data
IWT-SYSTEM-1,WATER_TREATMENT_CONFIGURATOR,0,,
```

- `is_complete` — whether the imported configuration is complete. If `0`, the customer must open the configurator and save a configuration before purchasing. See [Complete and incomplete configuration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html#complete-and-incomplete-configuration).
- `default_configuration` / `default_display_data` — optional [preconfigured parameter values](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html#preconfigured-parameter-values).

Add the import to your data import configuration:

```yaml
- data_entity: product-configuration
  source: data/import/.../product_configuration.csv
```

## Verify the integration

1. Build the configurator frontend app and clear the cache (`console cache:empty-all`).
2. Import a configurable product.
3. On the Product Details page of the product, click **Configure** — you must be redirected to the configurator host.
4. Select a configuration and submit — you must be redirected back to the shop with the configuration applied.
5. Add the product to the cart, reconfigure it from the cart, and place an order — the configuration must be displayed on the cart, order, and in the Back Office.

## Related documents

- [Configurable Product feature overview](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html)
- [Configuration process flow of configurable products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configuration-process-flow-of-configurable-product.html)
- [Install the Product Configuration feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-configuration-feature.html)

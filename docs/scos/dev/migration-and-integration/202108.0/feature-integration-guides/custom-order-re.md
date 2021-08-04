---
title: Custom order reference feature integration
originalLink: https://documentation.spryker.com/2021080/docs/custom-order-reference-feature-integration
redirect_from:
  - /2021080/docs/custom-order-reference-feature-integration
  - /2021080/docs/en/custom-order-reference-feature-integration
---

## Install Feature Core

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 202009.0 |
| Order Management | 202009.0 |
| Persistent Cart | 202009.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/custom-order-reference: "202009.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| Module | Expected Directory |
| --- | --- |
| `OrderCustomReference` | `vendor/spryker/order-custom-reference` |
| `OrderCustomReferenceGui` | `vendor/spryker/order-custom-reference-gui` |


{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Run the following commands to apply database changes and to generate entity and transfer changes: 

```bash
console transfer:generate
console propel:install
console transfer:entity:generate
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred by checking your database:

| Database entity | Type | Event |
| --- | --- | --- |
| `spy_sales_order.order_custom_reference` | column | created |


{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `OrderCustomReferenceResponse` | class | created | `Generated/Shared/Transfer/OrderCustomReferenceResponseTransfer` |
| `Quote.orderCustomReference` | property | created | `Generated/Shared/Transfer/QuoteTransfer` |
| `QuoteUpdateRequestAttributes.orderCustomReference` | property | created | `Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer` |
| `Order.orderCustomReference` | property | created | `Generated/Shared/Transfer/OrderTransfer` |


{% endinfo_block %}

### 3) Add Translations
Append glossary according to your configuration:

**src/data/import/glossary.csv**

```bash
order_custom_reference.reference_saved,Custom order reference was successfully saved.,en_US
order_custom_reference.reference_saved,Ihre Bestellreferenz wurde erfolgreich gespeichert.,de_DE
order_custom_reference.reference_not_saved,Custom order reference has not been changed.,en_US
order_custom_reference.reference_not_saved,Ihre Bestellreferenz wurde nicht geändert.,de_DE
order_custom_reference.validation.error.message_invalid_length,Custom order reference length is invalid.,en_US
order_custom_reference.validation.error.message_invalid_length,Die Länge der Bestellreferenz ist ungültig.,de_DE
order_custom_reference.title,Custom Order Reference,en_US
order_custom_reference.title,Ihre Bestellreferenz,de_DE
order_custom_reference.form.placeholder,Add custom order reference,en_US
order_custom_reference.form.placeholder,Ihre Bestellreferenz hinzufügen,de_DE
order_custom_reference.save,Save,en_US
order_custom_reference.save,Speichern,de_DE
```

Run the following console command to import data:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data has been added to the **spy_glossary** table.

{% endinfo_block %}

### 4) Set up Behavior

#### Setup Custom Order Reference Workflow
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `OrderCustomReferenceQuoteFieldsAllowedForSavingProviderPlugin` | Returns the **QuoteTransfer** fields related to a custom order reference. | None | `Spryker\Zed\OrderCustomReference\Communication\Plugin\Quote` |
| `OrderCustomReferenceOrderPostSavePlugin` | <ul><li>Gets executed after the order is saved to Persistence.</li><li>Persists `orderCustomReference` in the `spy_sales_order` schema.</li></ul> | None | `Spryker\Zed\OrderCustomReference\Communication\Plugin\Sales\` |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\OrderCustomReference\Communication\Plugin\Sales\OrderCustomReferenceOrderPostSavePlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface[]
     */
    protected function getOrderPostSavePlugins()
    {
        return [
            new OrderCustomReferenceOrderPostSavePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\OrderCustomReference\Communication\Plugin\Quote\OrderCustomReferenceQuoteFieldsAllowedForSavingProviderPlugin;
use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteFieldsAllowedForSavingProviderPluginInterface[]
     */
    protected function getQuoteFieldsAllowedForSavingProviderPlugins(): array
    {
        return [
            new OrderCustomReferenceQuoteFieldsAllowedForSavingProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that if you are logged in, you can see the *Custom Order Reference* section with the **Edit Reference** button in the order details at `zed.mysprykershop.com/sales/detail`.

{% endinfo_block %}

## Install Feature Frontend

### Prerequisites
Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | 202009.0 |
| Cart | 202009.0 |
| Checkout | 202009.0 |
| Customer Account Management | 202009.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/custom-order-reference: "202009.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| Module | Expected DIrectory |
| --- | --- |
| `OrderCustomReferenceWidget` | `vendor/spryker-shop/order-custom-reference-widget` |

{% endinfo_block %}

### 2) Enable a Route Provider Plugin
Register route provider(s) in the Yves application:

| Provider | Namespace |
| --- | --- |
| `OrderCustomReferenceWidgetRouteProviderPlugin` | `SprykerShop\Yves\OrderCustomReferenceWidget\Plugin\Router` |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\OrderCustomReferenceWidget\Plugin\Router\OrderCustomReferenceWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new OrderCustomReferenceWidgetRouteProviderPlugin(),
        ];
    }
}
```

### 3) Set up Widgets
Register the following plugin to enable widgets:

| Plugin | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `OrderCustomReferenceWidget` | Edits and shows a custom order reference in Yves. | None | `SprykerShop\Yves\OrderCustomReferenceWidget\Widget` |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\OrderCustomReferenceWidget\Widget\OrderCustomReferenceWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 */
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            OrderCustomReferenceWidget::class,
        ];
    }
}
```

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widget was registered:

| Module | Test |
| --- | --- |
| `OrderCustomReferenceWidget` | Log in, open the **Cart** page and see the **Custom order reference** form. |

{% endinfo_block %}

---
title: Custom Order Reference feature integration
description: Use the guide to install the Custom Order Reference feature in your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/custom-order-reference-feature-integration
originalArticleId: 705625ff-2007-49ad-b7d7-6bb7cfdf49fb
redirect_from:
  - /2021080/docs/custom-order-reference-feature-integration
  - /2021080/docs/en/custom-order-reference-feature-integration
  - /docs/custom-order-reference-feature-integration
  - /docs/en/custom-order-reference-feature-integration
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Order Management | {{page.version}} |
| Persistent Cart | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/custom-order-reference: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| OrderCustomReference | vendor/spryker/order-custom-reference |
| OrderCustomReferenceGui | vendor/spryker/order-custom-reference-gui |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Run the following commands to apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:entity:generate
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_sales_order.order_custom_reference | column | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| OrderCustomReferenceResponse | class | created | Generated/Shared/Transfer/OrderCustomReferenceResponseTransfer |
| Quote.orderCustomReference | property | created | Generated/Shared/Transfer/QuoteTransfer |
| QuoteUpdateRequestAttributes.orderCustomReference | property | created | `Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer |
| Order.orderCustomReference | property | created | Generated/Shared/Transfer/OrderTransfer |

{% endinfo_block %}

### 3) Add translations

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

### 4) Set up behavior

#### Set up custom order reference workflow

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| OrderCustomReferenceQuoteFieldsAllowedForSavingProviderPlugin | Returns the **QuoteTransfer** fields related to a custom order reference. | None | Spryker\Zed\OrderCustomReference\Communication\Plugin\Quote |
| OrderCustomReferenceOrderPostSavePlugin | <ul><li>Gets executed after the order is saved to Persistence.</li><li>Persists `orderCustomReference` in the `spy_sales_order` schema.</li></ul> | None | Spryker\Zed\OrderCustomReference\Communication\Plugin\Sales\ |

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

## Install feature frontend

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Cart | {{page.version}} |
| Checkout | {{page.version}} |
| Customer Account Management | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/custom-order-reference: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| OrderCustomReferenceWidget | vendor/spryker-shop/order-custom-reference-widget |

{% endinfo_block %}

### 2) Enable a route provider plugin

Register route provider(s) in the Yves application:

| PROVIDER | NAMESPACE |
| --- | --- |
| OrderCustomReferenceWidgetRouteProviderPlugin | SprykerShop\Yves\OrderCustomReferenceWidget\Plugin\Router |

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

### 3) Set up widgets

Register the following plugin to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| OrderCustomReferenceWidget | Edits and shows a custom order reference in Yves. | None | SprykerShop\Yves\OrderCustomReferenceWidget\Widget |

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

| MODULE | TEST |
| --- | --- |
| OrderCustomReferenceWidget | Log in, open the **Cart** page and see the **Custom order reference** form. |

{% endinfo_block %}

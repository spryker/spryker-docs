This document describes how to install the Reorder feature.

## Install feature core

Follow the steps below to install the Reorder feature core.

Some plugins mentioned in the document are needed only for optional features. The document provides a list of plugins for all possible integration scenarios, but you need to include only the plugins that match your setup.


### Prerequisites

Install the required features:

| NAME             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                      |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core     | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                             |
| Cart             | 202507.0 | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                               |
| Order Management | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/reorder: "202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                      | EXPECTED DIRECTORY                             |
|-----------------------------|------------------------------------------------|
| CartReorder                 | vendor/spryker/cart-reorder                    |
| CartReorderExtension        | vendor/spryker/cart-reorder-extension          |
| CartReorderRestApi          | vendor/spryker/cart-reorder-rest-api           |
| CartReorderRestApiExtension | vendor/spryker/cart-reorder-rest-api-extension |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

| CONFIGURATION                                                          | SPECIFICATION                                  | NAMESPACE |
|------------------------------------------------------------------------|------------------------------------------------|-----------|
| A regular expression. | Used to close access for guest users. |       |

**config/Shared/config_default.php**

```php
<?php

$config[CustomerConstants::CUSTOMER_SECURED_PATTERN] = '(^(/en|/de)?/cart-reorder($|/))';
```

{% info_block warningBox "Verification" %}

Make sure that accessing `mysprykershop.com/cart-reorder` with a guest user redirects to the login page.

{% endinfo_block %}

### 3) Set up the transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been implemented in transfer objects:

| TRANSFER                         | TYPE  | PATH                                                                   |
|----------------------------------|-------|------------------------------------------------------------------------|
| CartReorderRequest               | class | src/Generated/Shared/Transfer/CartReorderRequestTransfer               |
| CartReorder                      | class | src/Generated/Shared/Transfer/CartReorderTransfer                      |
| CartReorderResponse              | class | src/Generated/Shared/Transfer/CartReorderResponseTransfer              |
| Quote                            | class | src/Generated/Shared/Transfer/QuoteTransfer                            |
| QuoteUpdateRequestAttributes     | class | src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer     |
| QuoteProcessFlow                 | class | src/Generated/Shared/Transfer/QuoteProcessFlowTransfer                 |
| Item                             | class | src/Generated/Shared/Transfer/ItemTransfer                             |
| CartChange                       | class | src/Generated/Shared/Transfer/CartChangeTransfer                       |
| Error                            | class | src/Generated/Shared/Transfer/ErrorTransfer                            |
| QuoteResponse                    | class | src/Generated/Shared/Transfer/QuoteResponseTransfer                    |
| OrderListRequest                 | class | src/Generated/Shared/Transfer/OrderListRequestTransfer                 |
| Order                            | class | src/Generated/Shared/Transfer/OrderTransfer                            |
| OrderList                        | class | src/Generated/Shared/Transfer/OrderListTransfer                        |
| QuoteError                       | class | src/Generated/Shared/Transfer/QuoteErrorTransfer                       |
| RestCartReorderRequestAttributes | class | src/Generated/Shared/Transfer/RestCartReorderRequestAttributesTransfer |
| RestErrorMessage                 | class | src/Generated/Shared/Transfer/RestErrorMessageTransfer                 |
| RestUser                         | class | src/Generated/Shared/Transfer/RestUserTransfer                         |

{% endinfo_block %}

### 4) Add translations

1. Append glossary according to your language configuration:

**src/data/import/glossary.csv**

```yaml
cart_reorder.validation.order_not_found,Order not found.,en_US
cart_reorder.validation.order_not_found,Bestellung nicht gefunden.,de_DE
cart_reorder.validation.quote_not_provided,Quote not provided.,en_US
cart_reorder.validation.quote_not_provided,Angebot nicht bereitgestellt.,de_DE
sales_configured_bundle.success.items_added_to_cart_as_individual_products,"Please notice: Items from the Configured Bundle were added to the Cart as individual products.",en_US
sales_configured_bundle.success.items_added_to_cart_as_individual_products,"Bitte beachten: Artikel aus dem konfigurierbaren Bündel wurden als einzelne Produkte in den Warenkorb gelegt.",de_DE
store.cart_reorder.error.store_mismatch,"This order was placed in a different store. This action cannot be performed.",en_US
store.cart_reorder.error.store_mismatch,"Diese Bestellung wurde in einem anderen Store getätigt. Aktion kann nicht ausgeführt werden.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                        | SPECIFICATION                                                                                 | PREREQUISITES | NAMESPACE                                                               |
|---------------------------------------------------------------|-----------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------|
| ResetItemsSessionCartReorderQuoteProviderStrategyPlugin       | Gets the quote from the session and sets the quote items to an empty array.                   |               | Spryker\Client\Quote\Plugin\CartReorder                                 |
| RemoveUnavailableItemsCartReorderPreAddToCartPlugin           | Removes unavailable items from a cart change request before adding to cart.                   |               | Spryker\Zed\AvailabilityCartConnector\Communication\Plugin\CartReorder  |
| CartNoteCartPreReorderPlugin                                  | Maps an order note from an original order to a reorder quote.                                 |               | Spryker\Zed\CartNote\Communication\Plugin\CartReorder                   |
| CartNoteCartReorderItemHydratorPlugin                         | Maps items order notes from order items to reorder items.                                     |               | Spryker\Zed\CartNote\Communication\Plugin\CartReorder                   |
| CopyOrderCurrencyCartPreReorderPlugin                         | Copies currency from an original order to a quote.                                            |               | Spryker\Zed\Currency\Communication\Plugin\CartReorder                   |
| MerchantProductCartReorderItemHydratorPlugin                  | Maps merchant references from order items to reorder items.                                   |               | Spryker\Zed\MerchantProduct\Communication\Plugin\CartReorder            |
| MerchantProductOfferCartReorderItemHydratorPlugin             | Maps merchant and product offer references from order items to reorder items.                 |               | Spryker\Zed\MerchantProductOffer\Communication\Plugin\CartReorder       |
| OrderCustomReferenceCartPreReorderPlugin                      | Maps order an custom reference from an original order to a reorder quote.                     |               | Spryker\Zed\OrderCustomReference\Communication\Plugin\CartReorder       |
| ReplacePersistentCartReorderQuoteProviderStrategyPlugin       | Provides a quote for `CartReorderRequest` for the `replace` reorder strategy.                 |               | Spryker\Zed\PersistentCart\Communication\Plugin\CartReorder             |
| NewPersistentCartReorderQuoteProviderStrategyPlugin           | Provides a quote for `CartReorderRequest` for the `new` reorder strategy.                     |               | Spryker\Zed\MultiCart\Communication\Plugin\CartReorder.                 |
| UpdateQuoteCartPostReorderPlugin                              | Updates a quote in persistence.                                                               |               | Spryker\Zed\PersistentCart\Communication\Plugin\CartReorder             |
| CopyOrderPriceModeCartPreReorderPlugin                        | Copies a price mode from an original order to a quote.                                       |               | Spryker\Zed\Price\Communication\Plugin\CartReorder                      |
| ReplaceBundledItemsCartPreReorderPlugin                       | Replaces bundled product items with bundle product items.                                     |               | Spryker\Zed\ProductBundle\Communication\Plugin\CartReorder              |
| RemoveInactiveItemsCartReorderPreAddToCartPlugin              | Removes deactivated items before adding reorder items to cart.                                |               | Spryker\Zed\ProductCartConnector\Communication\Plugin\CartReorder       |
| ProductListRestrictedItemsCartPreReorderPlugin                | Filters out restricted items from cart reorder request.                                       |               | Spryker\Zed\ProductList\Communication\Plugin\CartReorder                |
| MergeProductMeasurementUnitItemsCartPreReorderPlugin          | Merges the quantity of reorder items with `quantitySalesUnit` defined.                            |               | Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\CartReorder     |
| ProductMeasurementUnitCartReorderItemHydratorPlugin           | Maps quantity sales unit data from order items to reorder items.                              |               | Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\CartReorder     |
| ProductOfferCartReorderItemHydratorPlugin                     | Maps product offer reference from order items to reorder items.                               |               | Spryker\Zed\ProductOffer\Communication\Plugin\CartReorder               |
| ProductOptionCartReorderItemHydratorPlugin                    | Maps product options from order items to reorder items.                                       |               | Spryker\Zed\ProductOption\Communication\Plugin\CartReorder              |
| MergeProductPackagingUnitItemsCartPreReorderPlugin            | Merges quantity and amount of reorder items with `amountSalesUnit` defined.                   |               | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\CartReorder       |
| ProductPackagingUnitCartReorderItemHydratorPlugin             | Maps amount and sales unit data from order items to reorder items.                            |               | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\CartReorder       |
| MergeProductQuantityRestrictionItemsCartPreReorderPlugin      | Merges quantity of reorder items with product quantity restrictions.                          |               | Spryker\Zed\ProductQuantity\Communication\Plugin\CartReorder            |
| MergeConfigurableBundleItemsCartPreReorderPlugin              | Merges quantity of reorder items with `salesOrderConfiguredBundle` defined.                   |               | Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\CartReorder    |
| ConfigurableBundleCartReorderItemHydratorPlugin               | Maps configured bundle data from order items to reorder items.                                |               | Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\CartReorder    |
| ConfiguredBundleCartPostReorderPlugin                         | Displays a message if order items have a configured bundle property.                          |               | Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\CartReorder    |
| ConfigurableBundleNoteCartReorderItemHydratorPlugin           | Maps configurable bundle notes from order items to reorder items.                             |               | Spryker\Zed\ConfigurableBundleNote\Communication\Plugin\CartReorder     |
| ProductConfigurationCartReorderItemHydratorPlugin             | Maps product configuration from order items to reorder items.                                 |               | Spryker\Zed\SalesProductConfiguration\Communication\Plugin\CartReorder  |
| CopyOrderCommentThreadCartPreReorderPlugin                    | Copies a comment thread from an order to a quote if it's provided.                              |               | Spryker\Zed\Comment\Communication\Plugin\CartReorder                    |
| RemoveInactiveProductOffersCartReorderPreAddToCartPlugin      | Filters out inactive and non-approved product offer items from `CartChangeTransfer`.          |               | Spryker\Zed\ProductOffer\Communication\Plugin\CartReorder               |
| RemoveInactiveProductOptionItemsCartReorderPreAddToCartPlugin | Filters out items with inactive product options from `CartChangeTransfer`.                    |               | Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\CartReorder |
| CartReorderResourceRoutePlugin                                | Configures available actions for the `cart-reorder` resource.                                 |               | Spryker\Glue\CartReorderRestApi\Plugin\GlueApplication                  |
| CurrentStoreCartReorderValidatorPlugin                        | Validates that the current store matches the store of the order and quote.                    |               | Spryker\Zed\Store\Communication\Plugin\CartReorder                      |

**src/Pyz/Client/CartReorder/CartReorderDependencyProvider.php**

```php
<?php

namespace Pyz\Client\CartReorder;

use Spryker\Client\CartReorder\CartReorderDependencyProvider as SprykerCartReorderDependencyProvider;
use Spryker\Client\Quote\Plugin\CartReorder\ResetItemsSessionCartReorderQuoteProviderStrategyPlugin;

class CartReorderDependencyProvider extends SprykerCartReorderDependencyProvider
{
    /**
     * @return list<\Spryker\Client\CartReorderExtension\Dependency\Plugin\CartReorderQuoteProviderStrategyPluginInterface>
     */
    protected function getCartReorderQuoteProviderStrategyPlugins(): array
    {
        return [
            new ResetItemsSessionCartReorderQuoteProviderStrategyPlugin(),
        ];
    }
}
```

<details>
  <summary> src/Pyz/Zed/CartReorder/CartReorderDependencyProvider.php </summary>

```php
<?php

namespace Pyz\Zed\CartReorder;

use Spryker\Zed\AvailabilityCartConnector\Communication\Plugin\CartReorder\RemoveUnavailableItemsCartReorderPreAddToCartPlugin;
use Spryker\Zed\CartNote\Communication\Plugin\CartReorder\CartNoteCartPreReorderPlugin;
use Spryker\Zed\CartNote\Communication\Plugin\CartReorder\CartNoteCartReorderItemHydratorPlugin;
use Spryker\Zed\CartReorder\CartReorderDependencyProvider as SprykerCartReorderDependencyProvider;
use Spryker\Zed\Comment\Communication\Plugin\CartReorder\CopyOrderCommentThreadCartPreReorderPlugin;
use Spryker\Zed\ConfigurableBundleNote\Communication\Plugin\CartReorder\ConfigurableBundleNoteCartReorderItemHydratorPlugin;
use Spryker\Zed\Currency\Communication\Plugin\CartReorder\CopyOrderCurrencyCartPreReorderPlugin;
use Spryker\Zed\MerchantProduct\Communication\Plugin\CartReorder\MerchantProductCartReorderItemHydratorPlugin;
use Spryker\Zed\MerchantProductOffer\Communication\Plugin\CartReorder\MerchantProductOfferCartReorderItemHydratorPlugin;
use Spryker\Zed\MultiCart\Communication\Plugin\CartReorder\NewPersistentCartReorderQuoteProviderStrategyPlugin;
use Spryker\Zed\OrderCustomReference\Communication\Plugin\CartReorder\OrderCustomReferenceCartPreReorderPlugin;
use Spryker\Zed\PersistentCart\Communication\Plugin\CartReorder\ReplacePersistentCartReorderQuoteProviderStrategyPlugin;
use Spryker\Zed\PersistentCart\Communication\Plugin\CartReorder\UpdateQuoteCartPostReorderPlugin;
use Spryker\Zed\Price\Communication\Plugin\CartReorder\CopyOrderPriceModeCartPreReorderPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\CartReorder\ProductBundleCartReorderOrderItemFilterPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\CartReorder\ReplaceBundledItemsCartPreReorderPlugin;
use Spryker\Zed\ProductCartConnector\Communication\Plugin\CartReorder\RemoveInactiveItemsCartReorderPreAddToCartPlugin;
use Spryker\Zed\ProductList\Communication\Plugin\CartReorder\ProductListRestrictedItemsCartPreReorderPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\CartReorder\MergeProductMeasurementUnitItemsCartPreReorderPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\CartReorder\ProductMeasurementUnitCartReorderItemHydratorPlugin;
use Spryker\Zed\ProductOffer\Communication\Plugin\CartReorder\ProductOfferCartReorderItemHydratorPlugin;
use Spryker\Zed\ProductOffer\Communication\Plugin\CartReorder\RemoveInactiveProductOffersCartReorderPreAddToCartPlugin;
use Spryker\Zed\ProductOption\Communication\Plugin\CartReorder\ProductOptionCartReorderItemHydratorPlugin;
use Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\CartReorder\RemoveInactiveProductOptionItemsCartReorderPreAddToCartPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\CartReorder\MergeProductPackagingUnitItemsCartPreReorderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\CartReorder\ProductPackagingUnitCartReorderItemHydratorPlugin;
use Spryker\Zed\ProductQuantity\Communication\Plugin\CartReorder\MergeProductQuantityRestrictionItemsCartPreReorderPlugin;
use Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\CartReorder\ConfigurableBundleCartReorderItemHydratorPlugin;
use Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\CartReorder\ConfiguredBundleCartPostReorderPlugin;
use Spryker\Zed\SalesConfigurableBundle\Communication\Plugin\CartReorder\MergeConfigurableBundleItemsCartPreReorderPlugin;
use Spryker\Zed\SalesProductConfiguration\Communication\Plugin\CartReorder\ProductConfigurationCartReorderItemHydratorPlugin;
use Spryker\Zed\Store\Communication\Plugin\CartReorder\CurrentStoreCartReorderValidatorPlugin;

class CartReorderDependencyProvider extends SprykerCartReorderDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderValidatorPluginInterface>
     */
    protected function getCartReorderValidatorPlugins(): array
    {
        return [
            new CurrentStoreCartReorderValidatorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderQuoteProviderStrategyPluginInterface>
     */
    protected function getCartReorderQuoteProviderStrategyPlugins(): array
    {
        return [
            new ReplacePersistentCartReorderQuoteProviderStrategyPlugin(),
            new NewPersistentCartReorderQuoteProviderStrategyPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartPreReorderPluginInterface>
     */
    protected function getCartPreReorderPlugins(): array
    {
        return [
            new CopyOrderCurrencyCartPreReorderPlugin(),
            new CopyOrderPriceModeCartPreReorderPlugin(),
            new ProductListRestrictedItemsCartPreReorderPlugin(),
            new ReplaceBundledItemsCartPreReorderPlugin(),
            new MergeProductMeasurementUnitItemsCartPreReorderPlugin(),
            new MergeProductPackagingUnitItemsCartPreReorderPlugin(),
            new MergeConfigurableBundleItemsCartPreReorderPlugin(),
            new CartNoteCartPreReorderPlugin(),
            new OrderCustomReferenceCartPreReorderPlugin(),
            new MergeProductQuantityRestrictionItemsCartPreReorderPlugin(),
            new CopyOrderCommentThreadCartPreReorderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderItemHydratorPluginInterface>
     */
    protected function getCartReorderItemHydratorPlugins(): array
    {
        return [
            new ProductMeasurementUnitCartReorderItemHydratorPlugin(),
            new ProductPackagingUnitCartReorderItemHydratorPlugin(),
            new CartNoteCartReorderItemHydratorPlugin(),
            new ProductOfferCartReorderItemHydratorPlugin(),
            new MerchantProductCartReorderItemHydratorPlugin(),
            new MerchantProductOfferCartReorderItemHydratorPlugin(),
            new ProductConfigurationCartReorderItemHydratorPlugin(),
            new ProductOptionCartReorderItemHydratorPlugin(),
            new ConfigurableBundleCartReorderItemHydratorPlugin(),
            new ConfigurableBundleNoteCartReorderItemHydratorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartPostReorderPluginInterface>
     */
    protected function getCartPostReorderPlugins(): array
    {
        return [
            new UpdateQuoteCartPostReorderPlugin(),
            new ConfiguredBundleCartPostReorderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderPreAddToCartPluginInterface>
     */
    protected function getCartReorderPreAddToCartPlugins(): array
    {
        return [
            new RemoveUnavailableItemsCartReorderPreAddToCartPlugin(),
            new RemoveInactiveItemsCartReorderPreAddToCartPlugin(),
            new RemoveInactiveProductOffersCartReorderPreAddToCartPlugin(),
            new RemoveInactiveProductOptionItemsCartReorderPreAddToCartPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartReorderOrderItemFilterPluginInterface>
     */
    protected function getCartReorderOrderItemFilterPlugins(): array
    {
        return [
            new ProductBundleCartReorderOrderItemFilterPlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CartReorderRestApi\Plugin\GlueApplication\CartReorderResourceRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new CartReorderResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that a customer can reorder with different types of products on the cart page.

{% endinfo_block %}

## Install feature frontend

To install the feature frontend, take the following steps.

### Prerequisites

Install the following required features:

| NAME             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                      |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core     | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                             |
| Cart             | 202507.0 | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                               |
| Order Management | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/reorder: "202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                   | EXPECTED DIRECTORY                              |
|--------------------------|-------------------------------------------------|
| CartReorderPage          | vendor/spryker-shop/cart-reorder-page           |
| CartReorderPageExtension | vendor/spryker-shop/cart-reorder-page-extension |

{% endinfo_block %}

### 2) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
cart_reorder_page.reorder_all,Reorder all,en_US
cart_reorder_page.reorder_all,Alle Artikel Nachbestellen,de_DE
cart_reorder_page.reorder,Reorder,en_US
cart_reorder_page.reorder,Nachbestellen,de_DE
cart_reorder_page.reorder_selected,Reorder selected items,en_US
cart_reorder_page.reorder_selected,Ausgewählte Artikel Nachbestellen,de_DE
cart_reorder.pre_add_to_cart.inactive_product_option_item_removed,Inactive item %sku% was removed from your shopping cart.,en_US
cart_reorder.pre_add_to_cart.inactive_product_option_item_removed,Der inaktive Artikel %sku% wurde aus Ihrem Warenkorb entfernt.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                            | SPECIFICATION                                                      | PREREQUISITES | NAMESPACE                                                   |
|-------------------------------------------------------------------|--------------------------------------------------------------------|---------------|-------------------------------------------------------------|
| CartReorderPageRouteProviderPlugin                                | Expands router collection with the `cart-reorder` endpoint.            |           | SprykerShop\Yves\CartReorderPage\Plugin\Router              |
| ProductAvailabilityCartReorderItemCheckboxAttributeExpanderPlugin | Overwrites the disabled attribute for unavailable items.               |           | SprykerShop\Yves\AvailabilityWidget\Plugin\CartReorderPage  |
| ProductBundleCartReorderItemCheckboxAttributeExpanderPlugin       | Overwrites attribute name and value for bundle items.              |           | SprykerShop\Yves\ProductBundleWidget\Plugin\CartReorderPage |
| ProductBundleCartReorderRequestExpanderPlugin                     | Expands `CartReorderRequestTransfer` with bundle item identifiers. |           | SprykerShop\Yves\ProductBundleWidget\Plugin\CartReorderPage |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\CartReorderPage\Plugin\Router\CartReorderPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new CartReorderPageRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/CartReorderPage/CartReorderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CartReorderPage;

use SprykerShop\Yves\AvailabilityWidget\Plugin\CartReorderPage\ProductAvailabilityCartReorderItemCheckboxAttributeExpanderPlugin;
use SprykerShop\Yves\CartReorderPage\CartReorderPageDependencyProvider as SprykerCartReorderPageDependencyProvider;
use SprykerShop\Yves\ProductBundleWidget\Plugin\CartReorderPage\ProductBundleCartReorderItemCheckboxAttributeExpanderPlugin;
use SprykerShop\Yves\ProductBundleWidget\Plugin\CartReorderPage\ProductBundleCartReorderRequestExpanderPlugin;

class CartReorderPageDependencyProvider extends SprykerCartReorderPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\CartReorderPageExtension\Dependency\Plugin\CartReorderItemCheckboxAttributeExpanderPluginInterface>
     */
    protected function getCartReorderItemCheckboxAttributeExpanderPlugins(): array
    {
        return [
            new ProductAvailabilityCartReorderItemCheckboxAttributeExpanderPlugin(),
            new ProductBundleCartReorderItemCheckboxAttributeExpanderPlugin(),
        ];
    }

    /**
     * @return list<\SprykerShop\Yves\CartReorderPageExtension\Dependency\Plugin\CartReorderRequestExpanderPluginInterface>
     */
    protected function getCartReorderRequestExpanderPlugins(): array
    {
        return [
            new ProductBundleCartReorderRequestExpanderPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure a customer can reorder on the order details and order list pages.

{% endinfo_block %}

### 4) Set up widgets

To enable widgets, register the following plugins:

| PLUGIN                        | SPECIFICATION                                                                         | PREREQUISITES | NAMESPACE                               |
|-------------------------------|---------------------------------------------------------------------------------------|---------------|-----------------------------------------|
| CartReorderWidget             | Enables customers to reorder existing orders on the order table page.                     |           | SprykerShop\Yves\CartReorderPage\Widget |
| CartReorderItemCheckboxWidget | Enables customers to reorder concrete products from existing orders on the order detail page. |           | SprykerShop\Yves\CartReorderPage\Widget |
| CartReorderItemsWidget        | Enables customers to reorder existing orders on the order details page.                    |           | SprykerShop\Yves\CartReorderPage\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\CartReorderPage\Widget\CartReorderItemCheckboxWidget;
use SprykerShop\Yves\CartReorderPage\Widget\CartReorderItemsWidget;
use SprykerShop\Yves\CartReorderPage\Widget\CartReorderWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            CartReorderWidget::class,
            CartReorderItemCheckboxWidget::class,
            CartReorderItemsWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE                        | TEST                                                                                                                  |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| CartReorderWidget             | Go to the **Order List** page and make sure you can reorder an existing order by clicking the reorder button. |
| CartReorderItemCheckboxWidget | Go to the **Order Details** page and make sure you can select and reorder items clicking the reorder button. |
| CartReorderItemsWidget        | Go to the **Order Details** page and make sure you can reorder all items by clicking the reorder all button.   |

{% endinfo_block %}




















































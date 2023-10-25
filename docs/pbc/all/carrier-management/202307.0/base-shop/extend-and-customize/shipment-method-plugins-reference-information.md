---
title: "Shipment method plugins: reference information"
description: This topic provides an overview of the Availability, Price Calculation, and Delivery Time plugins.
last_updated: Aug 20, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/docs/reference-information-shipment-method-plugins
originalArticleId: c164d2cc-dc77-415c-a1a7-8a2071f19492
redirect_from:
  - 2021080/docs/reference-information-shipment-method-plugins
  - 2021080/docs/en/reference-information-shipment-method-plugins
  - /docs/reference-information-shipment-method-plugins
  - /docs/en/reference-information-shipment-method-plugins
  - /docs/scos/dev/feature-walkthroughs/202307.0/shipment-feature-walkthrough/reference-information-shipment-method-plugins.html
related:
  - title: Migration Guide - Shipment
    link: docs/pbc/all/carrier-management/page.version/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipment-module.html
  - title: Shipment feature overview
    link: docs/pbc/all/carrier-management/page.version/base-shop/shipment-feature-overview.html
---

The main concerns regarding shipping services are:

* **Availability**: Is the shipping method available to deliver the order?
* **Price**: How is the delivery price calculated?
* **Delivery time**: When will the order be delivered?

For each of these concerns, an optional plugin is linked to each shipping method:

* **Availability Plugin**: Returns a boolean value which defines if the active shipping method is both available and visible to the customers in the list of available shipping services.
* **Price Calculation Plugin**: Shipping services can consider different criteria in calculating the price for delivery (such as size of the package or weight). When a price plugin is paired to a shipping method, the related Zed Admin UI pre-configured prices are omitted.
* **Delivery Time Plugin**: Knowing the estimated delivery time information of the purchased items is important to customers. The delivery time can vary depending on region, shipping service type, or day of week. Delivery time is measured in seconds as integer (for example, 1 day = 86400; 5 days = 5 * 86400).

## Availability plugin

For each availability plugin linked to a shipment method, a class with the same name must exist on the project side in the Shipment module (`Pyz/Zed/Shipment/Communication/Plugin/Availability`).

The class must implement `ShipmentMethodAvailabilityPluginInterface` and must extend the `AbstractPlugin` class, as in the example below:

```php
<?php
namespace Pyz\Zed\Shipment\Communication\Plugin\Availability;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentGroupTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodAvailabilityPluginInterface;
class DHLExpressPlugin extends AbstractPlugin implements ShipmentMethodAvailabilityPluginInterface
{
    /**
     * Specification:
     *  - Checks shipment method availability for shipment group.
     *
     * @api
     *
     * @param /Generated/Shared/Transfer/ShipmentGroupTransfer $shipmentGroupTransfer
     * @param /Generated/Shared/Transfer/QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function isAvailable(ShipmentGroupTransfer $shipmentGroupTransfer, QuoteTransfer $quoteTransfer): bool
    {
        return true;
    }
}
```

## Price Calculation plugin

For each price calculation plugin linked to a shipment method, a class with the same name must exist on the project's side in the Shipment module (`Pyz/Zed/Shipment/Communication/Plugin/PriceCalculation`). The class must implement `ShipmentMethodPricePluginInterface` and must extend the `AbstractPlugin` class, as in the following example:

```php
<?php
namespace Pyz\Zed\Shipment\Communication\Plugin\PriceCalculation;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentGroupTransfer;
use Spryker\Zed/Kernel\Communication\AbstractPlugin;
use Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodPricePluginInterface;
class DHLExpressPlugin extends AbstractPlugin implements ShipmentMethodPricePluginInterface
{
    /**
     * Specification:
     *  - Returns shipment method price for shipment group.
     *
     * @api
     *
     * @param /Generated/Shared/Transfer/ShipmentGroupTransfer $shipmentGroupTransfer
     * @param /Generated/Shared/Transfer/QuoteTransfer $quoteTransfer
     *
     * @return int
     */
    public function getPrice(ShipmentGroupTransfer $shipmentGroupTransfer, QuoteTransfer $quoteTransfer): int
    {
        return 0;
    }
}
```

## Delivery Time plugin

For each availability plugin linked to a shipment method, a class with the same name must exist on the project's side in the Shipment module (`Pyz/Zed/Shipment/Communication/Plugin/DeliveryTime`). The class must implement `ShipmentMethodDeliveryTimePluginInterface` and must extend the `AbstractPlugin` class, as in the example below:

```php
<?php
namespace Pyz\Zed\Shipment\Communication\Plugin\DeliveryTime;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\ShipmentGroupTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodDeliveryTimePluginInterface;
class DHLExpressPlugin extends AbstractPlugin implements ShipmentMethodDeliveryTimePluginInterface
{
    /**
     * Specification:
     *  - Returns delivery time for shipment group.
     *
     * @param /Generated/Shared/Transfer/ShipmentGroupTransfer $shipmentGroupTransfer
     * @param /Generated/Shared/Transfer/QuoteTransfer $quoteTransfer
     *
     * @return int
     * @api
     *
     */
    public function getTime(ShipmentGroupTransfer $shipmentGroupTransfer, QuoteTransfer $quoteTransfer): int
    {
        return 0;
    }
}
```

## Plugin registration

The plugins must be registered in the `ShipmentDependencyProvider` by overriding the following 3 operations:

```php
<?php
/**
 * @param Container $container
 *
 * @return array
 */
protected function getAvailabilityPlugins(Container $container)
{
    return [
        'Plugin name visible in form' => new YourAvailabilityPlugin(),
    ];
}

/**
 * @param Container $container
 *
 * @return array
 */
protected function getPricePlugins(Container $container)
{
    return [
        'Plugin name visible in form' => new YourPricePlugin(),
    ];
}

/**
 * @param Container $container
 *
 * @return array
 */
protected function getDeliveryTimePlugins(Container $container)
{
    return [
        'Plugin name visible in form' => new YourDeliveryTimePlugin(),
    ];
}
```

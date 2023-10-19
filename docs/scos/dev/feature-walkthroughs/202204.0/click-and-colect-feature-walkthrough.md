---
title: Click and Collect feature walkthrough
last_updated: Sep 26, 2023
description: TODO
template: concept-topic-template
---

C&C business models refers to a retail strategy where customers make purchases online and then collect their ordered products from a physical store or a designated pickup location. This model combines the convenience of online shopping with the immediacy of in-store pickup.

## Domain Model

TBD (Diagrams are here https://spryker.atlassian.net/wiki/spaces/CORE/pages/3894607900/WIP+Developer+Feature+Overview+materials) 

| Connection | Description                                                                             | Rationale                                                                                                                                                                                                                                                                                                                                                                        |
|------------|-----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SP1        | Every service must belong to a service point. One service point can have many services. | Services are assigned to service points where it is provided, the service is an instance of its type that is available at this service point.                                                                                                                                                                                                                                    |
| SP2        | A service point must have one address.                                                  | A service point represents a physical location in the real world, for that reason, it must have an address and geo-location.                                                                                                                                                                                                                                                     |
| SP3        | A service point can belong to one or many stores.                                       | Service point can belong to one or many stores. Connection between service point and store enable possibility to provide services for specified online store. <br/> F.e. if service point is connected to two online stores it means that it could provide pickup service for orders created in this two stores as physical location where customers could collect their orders. |
| ST1        | Service type can have many services enabled in specific service points.                 | Service that have same service type could be created for any number of service points. <br/> The service point could have only one service of specific type.                                                                                                                                                                                                                     |
| ShT1       | Shipment type should have one or more Shipment methods.                                 | Shipment type is a logical grouping of specific shipment methods. <br/> F.e. “In store pickup“ shipment type could be represented by following shipment methods: In-Store Counter pickup, Curbside pickup, Locker pickup, etc.                                                                                                                                                   |
| ShT2       | Shipment type can have none or one connected service type.                              | If shipment type that has connection with the service is selected on checkout, it means that user can select specific service point as a destination of corresponding shipment group.                                                                                                                                                                                            |
| ShT3       | Shipment type can belong to one or many stores.                                         | This connection makes shipment type available at specific store(s).                                                                                                                                                                                                                                                                                                              |
| PO1        | Product offer can be connected to none or many services.                                | As Product Offer is used to share stock between various (especially selling services). As stock physically can be only in one physical place, it means that Product offer MUST be connected to services that have same service point only.                                                                                                                                       |
| PO2        | Product offer can be connected to none or many delivery types.                          | Same product offer could be connected with few delivery types. It means that offer could be delivered by two different delivery types but price of the product is same for both of them and stock is shared. So delivery will be done from one place. <br/> F.e single product offer can be created for Pickup and Ship from store delivery types.                               |


## Database Diagram

TBD (Diagrams are here https://spryker.atlassian.net/wiki/spaces/CORE/pages/3894607900/WIP+Developer+Feature+Overview+materials)

# Service Point

 * A **Service point** refers to a physical location, such as a store or a post office, where customers can pick up their orders. Service points are typically used to deliver products purchased online, especially for customers who may not be able to receive the products at their homes or workplace. <br/> Service points can be owned and operated by the e-commerce platform operator itself or by third-party providers.
 * A **Service point address** is the physical address of a location where customers can pick up their orders. <br/> For example, if a customer chooses to use an Amazon Locker as a service point to pick up their order, they will be given the address of the specific Amazon Locker location where their package will be delivered. The customer can then go to that location and use a unique code or barcode to retrieve their package. <br/> The service point address is an important component of e-commerce logistics, as it allows customers to locate and access their orders for pickup easily.
 * A **Service Type** is different categories or classifications of services that a business offers to its customers. These service types are often determined by the nature of the business. Examples: Pickup service, Return service, Stock keeping service, et.
 * A **Service** represent a specific service type that are provided (enabled) in specific Service point. <br/> A service is a capability within a service point that is offered to other entities, for example customers, merchants, third parties, basically any business entity. A service can be a point of sale, a locker where you can deliver to and customers can pick up their goods. It could be as well a loading point or loading dock. A service itself can be an aggregation of business entities that must be a logical part of this service. A service in this context is a point of interaction that exists in the real world.

# Shipment Type

Shipment type refers to the different options available to customers for receiving their orders.
Some common shipment types include:
 * Home Delivery: This option allows customers to get their order delivered to the address they filled in during checkout.
 * In-store pickup (aka click & collect): This option allows customers to pick up their orders from a physical store or service point location, typically within a few hours to a day after the order is placed.
Shipment method, on the other hand, refers to how the product is physically transported from the seller to the customer. Examples of shipment methods are Next Day Delivery or Express Delivery.
Shipment type is a logical grouping of the shipment methods.

# Click & Collect

TBD

# Extension Points

## ProductOfferServicePointAvailabilityCalculator module

### ProductOfferServicePointAvailabilityCalculatorStrategyPluginInterface plugin

The plugin is used to calculate product offer service point availability based on a specific needs.

The example of implementation:

**ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin**

The plugin calculates product offer availabilities per service point for each item in request based on the provided conditions:

```php
<?php

namespace Spryker\Client\ClickAndCollectExample\Plugin;

...

class ExampleClickAndCollectProductOfferServicePointAvailabilityCalculatorStrategyPlugin extends AbstractPlugin implements ProductOfferServicePointAvailabilityCalculatorStrategyPluginInterface
{
    /**
     * {@inheritDoc}
     * - Returns `true` if service point UUIDs and request items are provided.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ProductOfferServicePointAvailabilityCollectionTransfer $productOfferServicePointAvailabilityCollectionTransfer
     * @param \Generated\Shared\Transfer\ProductOfferServicePointAvailabilityConditionsTransfer $productOfferServicePointAvailabilityConditionsTransfer
     *
     * @return bool
     */
    public function isApplicable(
        ProductOfferServicePointAvailabilityCollectionTransfer $productOfferServicePointAvailabilityCollectionTransfer,
        ProductOfferServicePointAvailabilityConditionsTransfer $productOfferServicePointAvailabilityConditionsTransfer
    ): bool {
        ...
    }

    /**
     * {@inheritDoc}
     * - Requires `ProductOfferServicePointAvailabilityRequestItemTransfer.productConcreteSku` to be set.
     * - Requires `ProductOfferServicePointAvailabilityRequestItemTransfer.quantity` to be set.
     * - Requires `ProductOfferServicePointAvailabilityRequestItemTransfer.identifier` to be set.
     * - Requires `ProductOfferServicePointAvailabilityResponseItemTransfer.availableQuantity` to be set.
     * - Requires `ProductOfferServicePointAvailabilityResponseItemTransfer.isNeverOutOfStock` to be set.
     * - Requires `ProductOfferServicePointAvailabilityResponseItemTransfer.servicePointUuid` to be set.
     * - Requires `ProductOfferServicePointAvailabilityResponseItemTransfer.productConcreteSku` to be set.
     * - Expects `ProductOfferServicePointAvailabilityRequestItemTransfer.productOfferReference` to be set.
     * - Calculates product offer availabilities per service point for each item in request.
     * - Searches among all available product offers for the product.
     * - In case `ProductOfferServicePointAvailabilityRequestItemTransfer.merchantReference` set, searches for available offers only from the same merchant.
     * - In case `ProductOfferServicePointAvailabilityRequestItemTransfer.productOfferReference` set, searches for availability of requested offer first, and for alternatives after.
     * - Otherwise, searches for non-merchant-related offers only.
     * - In case there is another product offer which matches criteria found, it will be used for calculation.
     * - Returns ProductOfferServicePointAvailabilityResponseItemTransfer objects mapped by service point UUID for requested items.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ProductOfferServicePointAvailabilityCollectionTransfer $productOfferServicePointAvailabilityCollectionTransfer
     * @param \Generated\Shared\Transfer\ProductOfferServicePointAvailabilityConditionsTransfer $productOfferServicePointAvailabilityConditionsTransfer
     *
     * @return array<string, list<\Generated\Shared\Transfer\ProductOfferServicePointAvailabilityResponseItemTransfer>>
     */
    public function calculateProductOfferServicePointAvailabilities(
        ProductOfferServicePointAvailabilityCollectionTransfer $productOfferServicePointAvailabilityCollectionTransfer,
        ProductOfferServicePointAvailabilityConditionsTransfer $productOfferServicePointAvailabilityConditionsTransfer
    ): array {
        ...
    }
}
```

## ProductOfferServicePointStorage module

### ProductOfferServiceStorageFilterPluginInterface plugin

Provides ability to filter product offer services collection by provided criteria. The plugin gets executed after a list of `ProductOfferServicesTransfer` for publishing is retrieved from Persistence.

The example of implementation:

**MerchantProductOfferServiceStorageFilterPlugin**

The plugin filters product offer services collection by active and approved merchants:

```php
<?php

namespace Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferServicePointStorage;

...

class MerchantProductOfferServiceStorageFilterPlugin extends AbstractPlugin implements ProductOfferServiceStorageFilterPluginInterface
{
    /**
     * {@inheritDoc}
     * - Filters product offer services collection by active and approved merchants.
     *
     * @api
     *
     * @param list<\Generated\Shared\Transfer\ProductOfferServicesTransfer> $productOfferServicesTransfers
     *
     * @return list<\Generated\Shared\Transfer\ProductOfferServicesTransfer>
     */
    public function filterProductOfferServices(array $productOfferServicesTransfers): array
    {
        ...
    }
}
```

## ProductOfferServicePointAvailability module

### ProductOfferServicePointAvailabilityFilterPluginInterface plugin

Provides ability to filter product offer service point availability collection by provided criteria. The plugin gets executed after a list of `ProductOfferServicePointAvailabilityResponseItemTransfer` is created.

The example of implementation:

**ShipmentTypeProductOfferServicePointAvailabilityFilterPlugin**

The plugin filters product offer service point availability transfers by shipment type:

```php
<?php

namespace Spryker\Client\ProductOfferShipmentTypeAvailability\Plugin\ProductOfferServicePointAvailability;

...

class ShipmentTypeProductOfferServicePointAvailabilityFilterPlugin extends AbstractPlugin implements ProductOfferServicePointAvailabilityFilterPluginInterface
{
    /**
     * {@inheritDoc}
     * - Requires `ProductOfferServicePointAvailabilityCriteriaTransfer.productOfferServicePointAvailabilityConditions` to be set.
     * - Requires `ProductOfferServicePointAvailabilityResponseItemTransfer.productOfferStorage` to be set.
     * - Requires `ProductOfferServicePointAvailabilityResponseItemTransfer.productOfferStorage.shipmentTypes.uuid` to be set.
     * - Requires `ProductOfferServicePointAvailabilityConditionsTransfer.storeName` to be set.
     * - Expects `ProductOfferServicePointAvailabilityConditionsTransfer.productOfferServicePointAvailabilityResponseItems` to be set.
     * - Expects `ProductOfferServicePointAvailabilityResponseItemTransfer.productOfferStorage.shipmentTypes` to be set.
     * - Filters product offer service point availability transfers by `ProductOfferServicePointAvailabilityCriteriaTransfer.productOfferServicePointAvailabilityConditions.shipmentTypeUuid`.
     * - Returns `ProductOfferServicePointAvailabilityCollectionTransfer` filled with filtered product offer service point availability.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ProductOfferServicePointAvailabilityCriteriaTransfer $productOfferServicePointAvailabilityCriteriaTransfer
     * @param \Generated\Shared\Transfer\ProductOfferServicePointAvailabilityCollectionTransfer $productOfferServicePointAvailabilityCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\ProductOfferServicePointAvailabilityCollectionTransfer
     */
    public function filter(
        ProductOfferServicePointAvailabilityCriteriaTransfer $productOfferServicePointAvailabilityCriteriaTransfer,
        ProductOfferServicePointAvailabilityCollectionTransfer $productOfferServicePointAvailabilityCollectionTransfer
    ): ProductOfferServicePointAvailabilityCollectionTransfer {
        ...
    }
}
```

## ServicePointCart module

### ServicePointQuoteItemReplaceStrategyPluginInterface plugin

Provides ability to replace items in a quote.

The example of implementation:

**ClickAndCollectExampleServicePointQuoteItemReplaceStrategyPlugin**

The plugin replaces filtered product offers with suitable product offers from Persistence:

```php
<?php

namespace Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart;

...

class ClickAndCollectExampleServicePointQuoteItemReplaceStrategyPlugin extends AbstractPlugin implements ServicePointQuoteItemReplaceStrategyPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function isApplicable(QuoteTransfer $quoteTransfer): bool
    {
        ...
    }

    /**
     * {@inheritDoc}
     * - Requires `QuoteTransfer.store.name` to be set.
     * - Requires `QuoteTransfer.currency.code`to be set.
     * - Requires `QuoteTransfer.priceMode`to be set.
     * - Requires `ItemTransfer.name` for each `QuoteTransfer.item` to be set.
     * - Requires `ItemTransfer.sku` for each `QuoteTransfer.item` to be set.
     * - Requires `ItemTransfer.quantity` for each `QuoteTransfer.item` to be set.
     * - Requires `ItemTransfer.servicePoint.IdServicePoint` for each `QuoteTransfer.item` to be set in case pickup shipment type.
     * - Filters applicable `QuoteTransfer.items` for product offer replacement.
     * - Fetches available replacement product offers from Persistence.
     * - Replaces filtered product offers with suitable product offers from Persistence.
     * - Returns `QuoteReplacementResponseTransfer` with modified `QuoteTransfer.items` if replacements take place.
     * - Adds `QuoteErrorTransfer` to `QuoteReplacementResponseTransfer.errors` if applicable product offers have not been replaced.
     * - Adds QuoteTransfer.item.groupKey to QuoteReplacementResponseTransfer.failedItemGroupKeys if the product offer for the applicable item was not found.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteReplacementResponseTransfer
     */
    public function execute(QuoteTransfer $quoteTransfer): QuoteReplacementResponseTransfer
    {
        ...
    }
}
```

## ProductOfferShipmentTypeStorage module

### ProductOfferShipmentTypeStorageFilterPluginInterface plugin

Provides ability to filter product offer shipment type collection transfer by provided criteria.

The example of implementation:

**MerchantProductOfferShipmentTypeStorageFilterPlugin**

The plugin filters out `ProductOfferShipmentTypeCollectionTransfer.productOfferShipmentTypes` with product offers with inactive merchants:

```php
<?php

namespace Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferShipmentTypeStorage;

...

class MerchantProductOfferShipmentTypeStorageFilterPlugin extends AbstractPlugin implements ProductOfferShipmentTypeStorageFilterPluginInterface
{
    /**
     * {@inheritDoc}
     * - Requires `ProductOfferShipmentTypeCollectionTransfer.productOfferShipmentTypes.productOffer` to be set.
     * - Filters out `ProductOfferShipmentTypeCollectionTransfer.productOfferShipmentTypes` with product offers with inactive merchants.
     * - Doesn't filter out product offers without merchant references.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ProductOfferShipmentTypeCollectionTransfer $productOfferShipmentTypeCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\ProductOfferShipmentTypeCollectionTransfer
     */
    public function filter(
        ProductOfferShipmentTypeCollectionTransfer $productOfferShipmentTypeCollectionTransfer
    ): ProductOfferShipmentTypeCollectionTransfer {
        ...
    }
}
```

## Shipment module

### ShipmentMethodCollectionExpanderPluginInterface plugin

Provides an ability to expand `ShipmentMethodCollectionTransfer` with additional data.

The example of implementation:

**ShipmentTypeShipmentMethodCollectionExpanderPlugin**

The plugin expands `ShipmentMethodCollectionTransfer.shipmentMethod` with shipment type:

```php
<?php

namespace Spryker\Zed\ShipmentType\Communication\Plugin\Shipment;

...

class ShipmentTypeShipmentMethodCollectionExpanderPlugin extends AbstractPlugin implements ShipmentMethodCollectionExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Requires `ShipmentMethodCollectionTransfer.shipmentMethod.idShipmentMethod` to be set.
     * - Expands `ShipmentMethodCollectionTransfer.shipmentMethod` with shipment type.
     * - Does nothing if `ShipmentMethodCollectionTransfer.shipmentMethod` doesn't have shipment type relation.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ShipmentMethodCollectionTransfer $shipmentMethodCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentMethodCollectionTransfer
     */
    public function expand(ShipmentMethodCollectionTransfer $shipmentMethodCollectionTransfer): ShipmentMethodCollectionTransfer
    {
        ...
    }
}
```

## ShipmentsRestApi module

### QuoteItemExpanderPluginInterface plugin

Provides an ability to expand quote items during `/checkout-data` and `/checkout` requests.

The example of implementation:

**ShipmentTypeQuoteItemExpanderPlugin**

The plugin expands items with shipment types taken from shipment methods:

```php
<?php

namespace Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\ShipmentsRestApi;

...

class ShipmentTypeQuoteItemExpanderPlugin extends AbstractPlugin implements QuoteItemExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Does nothing if `ShipmentTransfer.method` is empty for each element in `QuoteTransfer.items`.
     * - Expects `QuoteTransfer.items.shipment.method.idShipmentMethod` to be set.
     * - Gets available shipment methods for the provided quote.
     * - Expands items with shipment types taken from shipment methods to `QuoteTransfer.items.shipmentType`.
     * - Expands `QuoteTransfer.items.shipment.shipmentTypeUuid` from `QuoteTransfer.items.shipmentType.uuid`.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function expandQuoteItems(QuoteTransfer $quoteTransfer): QuoteTransfer
    {
        ...
    }
}
```

## ShipmentTypeStorage module

### AvailableShipmentTypeFilterPluginInterface plugin

Allows filtering out unavailable shipment types.

The example of implementation:

**ShipmentTypeProductOfferAvailableShipmentTypeFilterPlugin**

The plugin filters out shipment types without product offer shipment type relation:

```php
<?php

namespace Spryker\Client\ClickAndCollectExample\Plugin\ShipmentTypeStorage;

...

class ShipmentTypeProductOfferAvailableShipmentTypeFilterPlugin extends AbstractPlugin implements AvailableShipmentTypeFilterPluginInterface
{
    /**
     * {@inheritDoc}
     * - Collects product offer SKUs from `QuoteTransfer.items`.
     * - Retrieves product offers by SKUs from storage.
     * - Filters out shipment types without product offer shipment type relation.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ShipmentTypeStorageCollectionTransfer $shipmentTypeStorageCollectionTransfer
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentTypeStorageCollectionTransfer
     */
    public function filter(
        ShipmentTypeStorageCollectionTransfer $shipmentTypeStorageCollectionTransfer,
        QuoteTransfer $quoteTransfer
    ): ShipmentTypeStorageCollectionTransfer {
        ...
    }
}
```

### ShipmentTypeStorageExpanderPluginInterface plugin

Provides ability to expand shipment type storage collection with additional data after retrieving it from the storage.

The example of implementation:

**ServiceTypeShipmentTypeStorageExpanderPlugin**

The plugin expands shipment type with a service type:

```php
<?php

namespace Spryker\Client\ShipmentTypeServicePointStorage\Plugin\ShipmentTypeStorage;

...

class ServiceTypeShipmentTypeStorageExpanderPlugin extends AbstractPlugin implements ShipmentTypeStorageExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Expects `ShipmentTypeStorageCollectionTransfer.shipmentType.serviceType.uuid` transfer property to be set.
     * - Retrieves service type data from storage by provided `ShipmentTypeStorageCollectionTransfer.shipmentType.serviceType.uuid` data.
     * - Returns `ShipmentTypeStorageCollectionTransfer` expanded with service types.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ShipmentTypeStorageCollectionTransfer $shipmentTypeStorageCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\ShipmentTypeStorageCollectionTransfer
     */
    public function expand(ShipmentTypeStorageCollectionTransfer $shipmentTypeStorageCollectionTransfer): ShipmentTypeStorageCollectionTransfer
    {
        ...
    }
}
```

### ShipmentTypeStorageExpanderPluginInterface plugin

Provides ability to expand `ShipmentTypeStorageTransfer` transfer objects.

The example of implementation:

**ServiceTypeShipmentTypeStorageExpanderPlugin**

The plugin expands shipment type with a service type:

```php
<?php

namespace Spryker\Zed\ShipmentTypeServicePointStorage\Communication\Plugin\ShipmentTypeStorage;

...

class ServiceTypeShipmentTypeStorageExpanderPlugin extends AbstractPlugin implements ShipmentTypeStorageExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Requires `ShipmentTypeStorageTransfer.idShipmentType` to be set.
     * - Retrieves a shipment type service type collection by provided `ShipmentTypeStorageTransfer.idShipmentType`.
     * - Maps related `ServiceType.uuid` to `ShipmentTypeStorageTransfer.serviceType.uuid`.
     * - Returns expanded list of `ShipmentTypeStorageTransfer` objects with service type.
     *
     * @api
     *
     * @param list<\Generated\Shared\Transfer\ShipmentTypeStorageTransfer> $shipmentTypeStorageTransfers
     *
     * @return list<\Generated\Shared\Transfer\ShipmentTypeStorageTransfer>
     */
    public function expand(array $shipmentTypeStorageTransfers): array
    {
        ...
    }
}

```

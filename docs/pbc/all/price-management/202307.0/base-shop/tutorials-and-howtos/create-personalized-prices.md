---
title: Create personalized prices
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-create-personalized-prices
originalArticleId: f196671d-6261-40e4-b405-0f0eda110b7b
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-create-personalized-prices.html
  - /docs/pbc/all/price-management/202307.0/base-shop/tutorials-and-howtos/howto-create-personalized-prices.html
---

This document describes the steps to consider when implementing personalized prices for customer groups.

There are several steps to consider when implementing special prices based on which customer group the customer belongs to.

| MODULE | DESCRIPTION |
| --- | --- |
| Customer | Customer entity needs to be extended to include the group ID. Also, the `Customer` module must be extended to have also the group ID information for the customer. |
| Price | Group ID must be also included in the price entity. For an SKU, you can have one or more prices. The `Price` module must be extended so that you can query the price based on the SKU of the product and the group ID. |
|Importer | Set of prices must be imported for each product. |
| Collector | Set of prices must be exported to the client side data storage. |
| Catalog | Price that corresponds to the logged-in customer group must be displayed. |
| PriceCartConnector | Price that corresponds to the group the logged-in customer is part of must be used in the cart. |

## Extend the Customer module

The `spy_customer` table must be extended on the project side to include the group ID. For more information about extending the database schema, see [Extend the database schema](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/extend-the-database-schema.html).

The `spy_customer` table must be extended on the project side to include the group ID. You can read more here on how to extend the database schema.

## Extend the Price module

The `spy_price` table must be extended on the project side to include the group ID. The newly added column must not be mandatory.

## Extend the Price module

The `Price` module must be extended so that you can query prices by SKU and group ID and retrieve the default price.

## Import prices

The `Importer` module takes care of importing data to the SQL database.

Prices are imported by the `ProductPriceImporter`. If you  use the `Importer` module to load initial data to the SQL database, update the `ProductPriceImporter:importOne(array $data)` to include the group ID for each price entry.

## Adjust prices for cart

For the products in the cart, prices must be displayed according to the group the logged-in user belongs to (if the current user is a guest, the default price is displayed).

The prices for the products in the cart are added by the `CartItemPricePlugin`.

These values are used by the cart calculators.

{% info_block infoBox %}

We recommend implementing a new plugin that replaces the one from the core instead of extending it on the project side. This way, you make sure the implementation is backward compatible.

{% endinfo_block %}

You can implement a new plugin to retrieve the price based on the group ID and register it under the `CartDependencyProvider:getExpanderPlugins(Container $container)`.

```php
<?php
   /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container)
    {
        return [
            new CartItemSpecialPricePlugin(),
            /..
        ];
    }
```

From the `QuoteTransfer` that is included in the `CartChangeTransfer`, you can get the customer data and the group ID:

```php
<?php
namespace Pyz\Zed\PriceCartConnector\Communication\Plugin;

use Generated\Shared\Transfer\CartChangeTransfer;
use Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\PriceCartConnector\Business\PriceCartConnectorFacade getFacade()
 * @method \Pyz\Zed\PriceCartConnector\Communication\PriceCartConnectorCommunicationFactory getFactory()
 */
class CartItemSpecialPricePlugin extends AbstractPlugin implements ItemExpanderPluginInterface
{

    /**
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return \Generated\Shared\Transfer\CartChangeTransfer
     */
    public function expandItems(CartChangeTransfer $cartChangeTransfer)
    {
        return $this->getFacade()->addGrossSpecialPriceToItems($cartChangeTransfer);
    }

}
```

## Export prices

The special prices also must be exported to the client-side data storage to display the corresponding price to the customer. Data aggregation and export to client-side data storage are handled by the `Collector` module.

The `ProductCollector` collects the product data. The `ProductCollector:collectItem($touchKey, array $collectItemData)` must be modified to collect the prices for the current SKU.

```php
<?php
 /**
     * @param string $touchKey
     * @param array $collectItemData
     *
     * @return array
     */
    protected function collectItem($touchKey, array $collectItemData)
    {
      $collectedItem= [
            'abstract_product_id' =>
            'abstract_attributes' => $this->getAbstractAttributes($collectItemData),
            'abstract_name' => $collectItemData[static::ABSTRACT_NAME],
            'abstract_sku' => $collectItemData[static::SKU], // FIXME
            'url' => $collectItemData[static::ABSTRACT_URL],
            'quantity' =>  (int)$collectItemData[static::QUANTITY],
            'available' => (int)$collectItemData[static::QUANTITY] > 0,
            'category' => $this->generateCategories($collectItemData[CollectorConfig::COLLECTOR_RESOURCE_ID]),
        ];
      $specialPrices = $this->getSpecialPricesBySku($collectItemData[static::ABSTRACT_SKU]),

      $collectedItem=$specialPrices;    

      return $collectedItem;
    }
```

## Display price to customers

The `ProductResourceCreator` transforms the JSON containing product details stored in Redis into a more understandable format.

The price needs to be set according to the group that the customer belongs to when building the product using the data from Redis.

A controller action that's called when a request on a product detail page is submitted lets you retrieve logged-in customer information by calling the `getUser()` method. Now that you know the ID of the group that the customer is a member of, you can set the price of the product according to the group.

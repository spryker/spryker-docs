---
title: HowTo - Create Personalized Prices
originalLink: https://documentation.spryker.com/v6/docs/ht-create-personalized-prices
redirect_from:
  - /v6/docs/ht-create-personalized-prices
  - /v6/docs/en/ht-create-personalized-prices
---

{% info_block infoBox "Personalized Prices" %}
This article describes the steps that you need to consider when you need to implement personalized prices for customer groups.
{% endinfo_block %}

## Overview

When implementing special prices that are according to the group the customer is part of, several steps need to be considered.

| Module | Description |
| --- | --- |
| Customer	 | The customer entity needs to be extended to include the group id. Also, the customer module should be extended so that we have also the group id information for the customer. |
| Price	 | The group id should be included in the price entity also. For an SKU, we should have one or more prices. The Price module should be extended so that we can query the price based on the SKU of the product and the group id. |
|Importer | The set of prices should be imported for each product. |
| Collector	 | The set of prices should be exported to the client side data storage. |
| Catalog | The price that corresponds to the logged in customer group should be displayed. |
| PriceCartConnector | The price that corresponds to the group the logged in customer is part of should be used in the cart. |

## Extend Customer Module
The `spy_customer` table should be extended on the project side to include the group id. You can read more here on how to extend the database schema.

After you applied the changes on the database level, you need to extend the Customer module to include the group id when creating, updating or retrieving customer data.

## Extend Price Module
The `spy_price` table should be extended on the project side to include the group id. The new added column should not be mandatory.

As a rule you can apply, for each SKU we should have an entry in the `spy_price` table without a group id associated. This entry can be considered the default price for that SKU and can be used if no price was found for a specific group id or for guest users.

The Price  module should be extended so that we are able to query prices by SKU and group id and to retrieve the default price.

## Import Prices

The `Importer` module takes care of importing data to the SQL database.

Prices are imported by the `ProductPriceImporter`. If you are using the Importer module to load initial data to the SQL database, you need to update the `ProductPriceImporter:importOne(array $data)` to include the group id for each price entry.

## Adjust Prices for Cart

The prices displayed for the products included in the cart must be according to the group the logged in customer is part of( in case the current user is a guest, the default price should be displayed).

The prices for the products in the cart are added by the `CartItemPricePlugin`. 

These values are used by the cart calculators.

{% info_block infoBox %}
We recommend you implement a new plugin that replaces the one from Core instead of extending it on the project side. This way, you make sure the implementation is backward compatible.
{% endinfo_block %}

You can implement a new plugin for retrieving the price based on the group id and register it under the `CartDependencyProvider:getExpanderPlugins(Container $container)`.

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

You can obtain the customer data and the id of the group is part of from the `QuoteTransfer` that is included in the `CartChangeTransfer`:

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

## Export Prices
The special prices must also be exported to the client-side data storage so that the corresponding price can be shown to the customer. Data aggregation and export to client-side data storage is handled by the `Collector` module.

The product data is collected by the `ProductCollector`. The `ProductCollector:collectItem($touchKey, array $collectItemData)` should be modified to collect the collection of prices for the current SKU.

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

## Display Price to Customer
The JSON containing the product details that’s stored in Redis is transformed in a more understandable format by the `ProductResourceCreator`.

When building the product using the data from Redis, we need to set the price according to the group the customer is part of.

In the controller action that’s called when a request on a product detail page is submitted, you can retrieve the logged in customer information by calling the `getUser()`. Now that you have the id of the group that the customer is part of, you can set the price to the product according to the users group.

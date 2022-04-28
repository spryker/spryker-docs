---
title: HowTo - Create personalized prices
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-create-personalized-prices
originalArticleId: f196671d-6261-40e4-b405-0f0eda110b7b
redirect_from:
  - /2021080/docs/ht-create-personalized-prices
  - /2021080/docs/en/ht-create-personalized-prices
  - /docs/ht-create-personalized-prices
  - /docs/en/ht-create-personalized-prices
  - /v6/docs/ht-create-personalized-prices
  - /v6/docs/en/ht-create-personalized-prices
  - /v5/docs/ht-create-personalized-prices
  - /v5/docs/en/ht-create-personalized-prices
  - /v4/docs/ht-create-personalized-prices
  - /v4/docs/en/ht-create-personalized-prices
  - /v3/docs/ht-create-personalized-prices
  - /v3/docs/en/ht-create-personalized-prices
  - /v2/docs/ht-create-personalized-prices
  - /v2/docs/en/ht-create-personalized-prices
  - /v1/docs/ht-create-personalized-prices
  - /v1/docs/en/ht-create-personalized-prices
---

This article describes the steps you need to consider when implementing personalized prices for customer groups.

There are several steps to consider when implementing special prices based on which customer group the customer belongs to.

| MODULE | DESCRIPTION |
| --- | --- |
| Customer | The customer entity needs to be extended to include the group id. Also, the customer module should be extended so that we have also the group id information for the customer. |
| Price | The group id should be included in the price entity also. For an SKU, we should have one or more prices. The Price module should be extended so that we can query the price based on the SKU of the product and the group id. |
| Importer | The set of prices should be imported for each product. |
| Collector | The set of prices should be exported to the client side data storage. |
| Catalog | The price that corresponds to the logged in customer group should be displayed. |
| PriceCartConnector | The price that corresponds to the group the logged in customer is part of should be used in the cart. |

## 1. Extend Customer module

The `spy_customer` table should be extended on the project side to include the group id. You can read more on how to extend the database schema in [Extending the database schema](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/extending-the-database-schema.html) article.

After you applied the changes on the database level, you need to extend the Customer module to include the group id when creating, updating or retrieving customer data.

## 2. Extend Price module

The `spy_price` table should be extended on the project side to include the group id. The new added column should not be mandatory.

As a rule you can apply, for each SKU we should have an entry in the `spy_price` table without a group id associated. This entry can be considered the default price for that SKU and can be used if no price was found for a specific group id or for guest users.

The Price module should be extended so that we can query prices by SKU and group id and retrieve the default price.

## 3. Import prices

The `Importer` module takes care of importing data to the SQL database.

Prices are imported by the `ProductPriceImporter`. If you are using the Importer module to load initial data to the SQL database, you need to update the `ProductPriceImporter:importOne(array $data)` to include the group id for each price entry.

## 4. Adjust prices for cart

For the products in the cart, prices must be displayed according to the group the logged-in user belongs to (in case the current user is a guest, the default price should be displayed).

The prices for the products in the cart are added by the `CartItemPricePlugin`.

These values are used by the cart calculators.

{% info_block infoBox %}

It is recommended that you implement a new plugin that replaces the one from Core rather than extending it on the project side. This ensures backward compatibility.

{% endinfo_block %}

You can implement a new plugin to retrieve the price based on the group id and register it under the `CartDependencyProvider:getExpanderPlugins(Container $container)`.

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

From the `QuoteTransfer` that is included in the `CartChangeTransfer` you can get the customer data and the group id:

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

## 5. Export prices

The special prices must also be exported to the client-side data storage so that the corresponding price can be displayed to the customer. Data aggregation and export to client-side data storage is handled by the `Collector` module.

The product data is collected by the `ProductCollector`. The `ProductCollector:collectItem($touchKey, array $collectItemData)` should be modified to collect the prices for the current SKU.

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

## 6. Display price to customer

The `ProductResourceCreator` transforms the JSON containing product details stored in Redis into a more understandable format.

The price needs to be set according to the group that the customer belongs to when building the product using the data from Redis.

A controller action that's called when a request on a product detail page is submitted allows you to retrieve logged in customer information by calling the `getUser()` method. Now that you know the id of the group that the customer is a member of, you can set the price of the product according to the group.

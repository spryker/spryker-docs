---
title: Cart Integration
originalLink: https://documentation.spryker.com/v1/docs/cart-integration
redirect_from:
  - /v1/docs/cart-integration
  - /v1/docs/en/cart-integration
---

{% info_block infoBox %}
This article describes how to add product variants and product images to an existing cart.
{% endinfo_block %}
## Prerequisites:
Before starting make sure you are familiar with the concept of Spryker Super Attributes.

## UI Changes:
Cart now supports changing the items in the cart by modifying their attributes. If we have a wrong T-Shirt size in the cart we will be able to change it.

Cart now also supports product images out of the box.
![cart_product_images](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/cart_product_images.png){height="" width=""}

If we have products with multiple super attributes we can now, narrowing-down in the cart.
![product_super_attributes](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/product_super_attributes.png){height="" width=""}

## Installation
### Item images in cart
To support  images in a cart,  install the optional module `ProductImageCartConnector` by running:

```bash
composer require spryker/product-image-cart-connector
```

This module will provide the `ProductImageCartPlugin` that you will have to register later in your shop `CartDependencyProvider` like in a snippet below:

```php
/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
 */
protected function getExpanderPlugins(Container $container)
{
    return [
        // your existing plugins ...
        new ProductImageCartPlugin(),
    ];
}
```

If your shop uses product bundles, register `ExpondBundleItemsWithImagesPlugin` in your shop's `CartDependencyProvider` as follows:

```php
/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
 */
protected function getExpanderPlugins(Container $container)
{
    return [
	  //your existing plugins
        new ExpandBundleItemsWithImagesPlugin(),
        ];
}
```

{% info_block warningBox "Verification" %}
Make sure the `ExpandBundleItemsWithImagesPlugin` is registered after the `ExpandBundleItemsPlugin` plugin.
{% endinfo_block %}

#### Cart variants
Spryker provides the `CartVariant` module for this purpose. 
To install the `CartVariant` module, run:

```bash
composer require spryker/cart-variant
```
<!--
### Integration for Demoshop:
To integrate variant selection in your cart you will need to do some modifications to your project.

#### Cart Controller

In the Cart controller `src/Pyz/Yves/Cart/Controller/CartController.php`  add an additional action to allow Cart item attribute changes as follows:

```php
/**
 * @param string $sku
 * @param int $quantity
 * @param array $selectedAttributes
 * @param array $preselectedAttributes
 * @param string|null $groupKey
 * @param array $optionValueIds
 *
 * @return \Symfony\Component\HttpFoundation\RedirectResponse
 */
public function updateAction($sku, $quantity, array $selectedAttributes, array $preselectedAttributes, $groupKey = null, array $optionValueIds = [])
{
    $quoteTransfer = $this->getClient()->getQuote();
    $isItemReplacedInCart = $this->getFactory()->createCartItemsAttributeProvider()
        ->tryToReplaceItem(
            $sku,
            $quantity,
            array_replace($selectedAttributes, $preselectedAttributes),
            $quoteTransfer->getItems(),
            $groupKey,
            $optionValueIds
        );
    if ($isItemReplacedInCart) {
        return $this->redirectResponseInternal(CartControllerProvider::ROUTE_CART);
    }
    $this->addInfoMessage('cart.item_attributes_needed');
    return $this->redirectResponseInternal(
        CartControllerProvider::ROUTE_CART,
        $this->getFactory()
            ->createCartItemsAttributeProvider()->formatUpdateActionResponse($sku, $selectedAttributes)
    );
}
```

To support cart item attribute rendering, add the following parameter to index action:

```
array $selectedAttributes = null
```

Add the following line to the function's body:

```
$itemAttributesBySku = $this->getFactory()
    ->createCartItemsAttributeProvider()->getItemsAttributes($quoteTransfer, $selectedAttributes);
```

<details open>
<summary>The full indexAction code should be as follows:</summary>

```php
/**
 * @param array|null $selectedAttributes
 *
 * @return array
 */
public function indexAction(array $selectedAttributes = null)
{
    $quoteTransfer = $this->getClient()
        ->getQuote();
    $voucherForm = $this->getFactory()
        ->createVoucherForm();
    $cartItems = $this->getFactory()
        ->createProductBundleGrouper()
        ->getGroupedBundleItems($quoteTransfer->getItems(), $quoteTransfer->getBundleItems());
    $stepBreadcrumbsTransfer = $this->getFactory()
        ->getCheckoutBreadcrumbPlugin()
        ->generateStepBreadcrumbs($quoteTransfer);
    $itemAttributesBySku = $this->getFactory()
        ->createCartItemsAttributeProvider()->getItemsAttributes($quoteTransfer, $selectedAttributes);
    return $this->viewResponse([
        'cart' => $quoteTransfer,
        'cartItems' => $cartItems,
        'attributes' => $itemAttributesBySku,
        'voucherForm' => $voucherForm->createView(),
        'stepBreadcrumbs' => $stepBreadcrumbsTransfer,
    ]);
}
```

<br>
</details>

### Additional Classes:
To complete the feature integration:

<details>
<summary>Add `src/Pyz/Yves/Cart/Plugin/Provider/AttributeVariantsProvider.php` by copying the following code:</summary>

```php
<?php

namespace Pyz\Yves\Cart\Plugin\Provider;
use ArrayObject;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\StorageProductTransfer;
use Pyz\Yves\Cart\Handler\CartItemHandlerInterface;
use Spryker\Yves\CartVariant\Dependency\Plugin\CartVariantAttributeMapperPluginInterface;
class AttributeVariantsProvider
{
    /**
     * @var \Spryker\Yves\CartVariant\Dependency\Plugin\CartVariantAttributeMapperPluginInterface
     */
    protected $cartVariantAttributeMapperPlugin;
    /**
     * @var \Pyz\Yves\Cart\Handler\CartItemHandlerInterface
     */
    protected $cartItemHandler;
    /**
     * CartItemsAttributeProvider constructor.
     *
     * @param \Spryker\Yves\CartVariant\Dependency\Plugin\CartVariantAttributeMapperPluginInterface $cartVariantAttributeMapperPlugin
     * @param \Pyz\Yves\Cart\Handler\CartItemHandlerInterface $cartItemHandler
     */
    public function __construct(
        CartVariantAttributeMapperPluginInterface $cartVariantAttributeMapperPlugin,
        CartItemHandlerInterface $cartItemHandler
    ) {
        $this->cartVariantAttributeMapperPlugin = $cartVariantAttributeMapperPlugin;
        $this->cartItemHandler = $cartItemHandler;
    }
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param array|null $itemAttributes
     *
     * @return array
     */
    public function getItemsAttributes(QuoteTransfer $quoteTransfer, array $itemAttributes = null)
    {
        $itemAttributesBySku = $this->cartVariantAttributeMapperPlugin
            ->buildMap($quoteTransfer->getItems());
        return $this->cartItemHandler
            ->narrowDownOptions($quoteTransfer->getItems(), $itemAttributesBySku, $itemAttributes);
    }
    /**
     * @param string $sku
     * @param int $quantity
     * @param array $selectedAttributes
     * @param \ArrayObject $items
     * @param string|null $groupKey
     * @param array $optionValueIds
     *
     * @return bool
     */
    public function tryToReplaceItem($sku, $quantity, $selectedAttributes, ArrayObject $items, $groupKey = null, $optionValueIds = [])
    {
        $storageProductTransfer = $this->cartItemHandler->getProductStorageTransfer($sku, $selectedAttributes, $items);
        if ($storageProductTransfer->getIsVariant() === true) {
            $this->cartItemHandler->replaceCartItem($sku, $storageProductTransfer, $quantity, $groupKey, $optionValueIds);
            return true;
        }
        return false;
    }
    /**
     * @param string $sku
     * @param array $selectedAttributes
     *
     * @return array
     */
    public function formatUpdateActionResponse($sku, array $selectedAttributes)
    {
        return [
            StorageProductTransfer::SELECTED_ATTRIBUTES => [$sku => $this->arrayRemoveEmpty($selectedAttributes)],
        ];
    }
    /**
     * Removes empty nodes from array
     *
     * @param array $haystack
     *
     * @return array
     */
    protected function arrayRemoveEmpty(array $haystack)
    {
        foreach ($haystack as $key => $value) {
            if (is_array($value)) {
                $haystack[$key] = $this->arrayRemoveEmpty($haystack[$key]);
            }
            if (empty($haystack[$key])) {
                unset($haystack[$key]);
            }
        }
        return $haystack;
    }
}
```

<br>
</details>

<details open>
<summary>Also, add `src/Pyz/Yves/Cart/Handler/CartItemHandler.php`:</summary>
```php
<?php

namespace Pyz\Yves\Cart\Handler;
use ArrayObject;
use Generated\Shared\Transfer\StorageProductTransfer;
use Pyz\Yves\Product\Dependency\Plugin\StorageProductMapperPluginInterface;
use Spryker\Client\Cart\CartClientInterface;
use Spryker\Client\Product\ProductClientInterface;
use Spryker\Shared\CartVariant\CartVariantConstants;
use Spryker\Yves\Messenger\FlashMessenger\FlashMessengerInterface;
class CartItemHandler extends BaseHandler implements CartItemHandlerInterface
{
    /**
     * @var \Pyz\Yves\Cart\Handler\CartOperationInterface
     */
    protected $cartOperationHandler;
    /**
     * @var \Spryker\Client\Cart\CartClientInterface
     */
    protected $cartClient;
    /**
     * @var \Spryker\Client\Product\ProductClientInterface
     */
    protected $productClient;
    /**
     * @var \Pyz\Yves\Product\Dependency\Plugin\StorageProductMapperPluginInterface
     */
    protected $storageProductMapperPlugin;
    /**
     * @param \Pyz\Yves\Cart\Handler\CartOperationInterface $cartOperationHandler
     * @param \Spryker\Client\Cart\CartClientInterface $cartClient
     * @param \Spryker\Client\Product\ProductClientInterface $productClient
     * @param \Pyz\Yves\Product\Dependency\Plugin\StorageProductMapperPluginInterface $storageProductMapperPlugin
     * @param \Spryker\Yves\Messenger\FlashMessenger\FlashMessengerInterface $flashMessenger
     */
    public function __construct(
        CartOperationInterface $cartOperationHandler,
        CartClientInterface $cartClient,
        ProductClientInterface $productClient,
        StorageProductMapperPluginInterface $storageProductMapperPlugin,
        FlashMessengerInterface $flashMessenger
    ) {
        parent::__construct($flashMessenger);
        $this->cartOperationHandler = $cartOperationHandler;
        $this->cartClient = $cartClient;
        $this->productClient = $productClient;
        $this->storageProductMapperPlugin = $storageProductMapperPlugin;
    }
    /**
     * @param string $sku
     * @param array $selectedAttributes
     * @param \ArrayObject|\Generated\Shared\Transfer\StorageProductTransfer[] $items
     * @return \Generated\Shared\Transfer\StorageProductTransfer
     */
    public function getProductStorageTransfer($sku, array $selectedAttributes, ArrayObject $items)
    {
        return $this->mapSelectedAttributesToStorageProduct($sku, $selectedAttributes, $items);
    }
    /**
     * @param string $currentItemSku
     * @param \Generated\Shared\Transfer\StorageProductTransfer $storageProductTransfer
     * @param int $quantity
     * @param string $groupKey
     * @param array $optionValueIds
     *
     * @return void
     */
    public function replaceCartItem(
        $currentItemSku,
        StorageProductTransfer $storageProductTransfer,
        $quantity,
        $groupKey,
        array $optionValueIds
    ) {
        $newItemSku = $storageProductTransfer->getSku();
        $this->cartOperationHandler->add($newItemSku, $quantity, $optionValueIds);
        $this->setFlashMessagesFromLastZedRequest($this->cartClient);
        if (count($this->cartClient->getZedStub()->getErrorMessages()) === 0) {
            $this->cartOperationHandler->remove($currentItemSku, $groupKey);
        }
    }
    /**
     * @param string $sku
     * @param array $selectedAttributes
     * @param \ArrayObject|\Generated\Shared\Transfer\StorageProductTransfer[] $items
     *
     * @return \Generated\Shared\Transfer\StorageProductTransfer
     */
    public function mapSelectedAttributesToStorageProduct($sku, array $selectedAttributes, ArrayObject $items)
    {
        foreach ($items as $item) {
            if ($item->getSku() === $sku) {
                return $this->getStorageProductForSelectedAttributes($selectedAttributes, $item);
            }
        }
        return new StorageProductTransfer();
    }
    /**
     * @param array $selectedAttributes
     * @param \Generated\Shared\Transfer\ItemTransfer $item
     *
     * @return \Generated\Shared\Transfer\StorageProductTransfer
     */
    protected function getStorageProductForSelectedAttributes(array $selectedAttributes, $item)
    {
        $productData = $this->productClient->getProductAbstractFromStorageByIdForCurrentLocale(
            $item->getIdProductAbstract()
        );
        return $this->storageProductMapperPlugin->mapStorageProduct($productData, $selectedAttributes);
    }
    /**
     * @param string $sku
     * @param \ArrayObject|\Generated\Shared\Transfer\ItemTransfer[] $items
     *
     * @return \Generated\Shared\Transfer\ItemTransfer
     */
    protected function findItemInCartBySku($sku, ArrayObject $items)
    {
        foreach ($items as $item) {
            if ($item->getSku() === $sku) {
                return $item;
            }
        }
    }
    /**
     * @param \ArrayObject|\Generated\Shared\Transfer\StorageProductTransfer[] $items
     * @param array $itemAttributesBySku
     * @param array|null $selectedAttributes
     *
     * @return array
     */
    public function narrowDownOptions(
        ArrayObject $items,
        array $itemAttributesBySku,
        array $selectedAttributes = null
    ) {
        if (count($selectedAttributes) === 0) {
            return $itemAttributesBySku;
        }
        foreach ($selectedAttributes as $sku => $attributes) {
            $itemAttributesBySku = $this->setSelectedAttributesAsSelected($itemAttributesBySku, $attributes, $sku);
            $availableAttributes = $this->getAvailableAttributesForItem($items, $selectedAttributes, $sku);
            $itemAttributesBySku = $this->removeAttributesThatAreNotAvailableForItem($itemAttributesBySku, $sku, $availableAttributes);
        }
        return $itemAttributesBySku;
    }
    /**
     * @param array $itemAttributesBySku
     * @param array $attributes
     * @param string $sku
     *
     * @return array
     */
    protected function setSelectedAttributesAsSelected(array $itemAttributesBySku, array $attributes, $sku)
    {
        foreach ($attributes as $key => $attribute) {
            unset($itemAttributesBySku[$sku][$key]);
            $itemAttributesBySku[$sku][$key][$attribute][CartVariantConstants::SELECTED] = true;
            $itemAttributesBySku[$sku][$key][$attribute][CartVariantConstants::AVAILABLE] = true;
        }
        return $itemAttributesBySku;
    }
    /**
     * @param \ArrayObject $items
     * @param array $itemAttributes
     * @param string $sku
     *
     * @return array
     */
    protected function getAvailableAttributesForItem(ArrayObject $items, array $itemAttributes, $sku)
    {
        $storageProductTransfer = $this->getProductStorageTransfer($sku, $itemAttributes[$sku], $items);
        $availableAttributes = $storageProductTransfer->getAvailableAttributes();
        return $availableAttributes;
    }
    /**
     * @SuppressWarnings(PHPMD.UnusedLocalVariable)
     *
     * @param array $itemAttributesBySku
     * @param string $sku
     * @param array $availableAttributes
     *
     * @return array
     */
    protected function removeAttributesThatAreNotAvailableForItem(array $itemAttributesBySku, $sku, array $availableAttributes)
    {
        foreach ($itemAttributesBySku[$sku] as $key => $attributes) {
            foreach ($attributes as $attributeName => $options) {
                if (array_key_exists($key, $availableAttributes)) {
                    if (in_array($attributeName, $availableAttributes[$key]) === false) {
                        unset($itemAttributesBySku[$sku][$key][$attributeName]);
                    }
                }
            }
        }
        return $itemAttributesBySku;
    }
}
```

<br>
</details>

<details open>
<summary>Add src/Pyz/Yves/Cart/Handler/CartItemHandlerInterface.php</summary>

```php
<?php
/**
 * This file is part of the Spryker Demoshop.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\Cart\Handler;
use ArrayObject;
use Generated\Shared\Transfer\StorageProductTransfer;
interface CartItemHandlerInterface
{
    /**
     * @param string $sku
     * @param array $selectedAttributes
     * @param \ArrayObject|\Generated\Shared\Transfer\StorageProductTransfer[] $items
     * @return \Generated\Shared\Transfer\StorageProductTransfer
     */
    public function getProductStorageTransfer($sku, array $selectedAttributes, ArrayObject $items);
    /**
     * @param string $currentItemSku
     * @param \Generated\Shared\Transfer\StorageProductTransfer $storageProductTransfer
     * @param int $quantity
     * @param string $groupKey
     * @param array $optionValueIds
     *
     * @return void
     */
    public function replaceCartItem(
        $currentItemSku,
        StorageProductTransfer $storageProductTransfer,
        $quantity,
        $groupKey,
        array $optionValueIds
    );
    /**
     * @param \ArrayObject|\Generated\Shared\Transfer\StorageProductTransfer[] $items
     * @param array $itemAttributesBySku
     * @param array|null $selectedAttributes
     *
     * @return array
     */
    public function narrowDownOptions(ArrayObject $items, array $itemAttributesBySku, array $selectedAttributes = null);
}
```

<br>
</details>

<details open>
<summary>Add `src/Pyz/Yves/Cart/Plugin/Provider/AttributeVariantsProvider.php`</summary>

```php
<?php
/**
 * This file is part of the Spryker Demoshop.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Yves\Cart\Plugin\Provider;
use ArrayObject;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\StorageProductTransfer;
use Pyz\Yves\Cart\Handler\CartItemHandlerInterface;
use Spryker\Yves\CartVariant\Dependency\Plugin\CartVariantAttributeMapperPluginInterface;

class AttributeVariantsProvider
{
    /**
     * @var \Spryker\Yves\CartVariant\Dependency\Plugin\CartVariantAttributeMapperPluginInterface
     */
    protected $cartVariantAttributeMapperPlugin;
    /**
     * @var \Pyz\Yves\Cart\Handler\CartItemHandlerInterface
     */
    protected $cartItemHandler;
    /**
     * CartItemsAttributeProvider constructor.
     *
     * @param \Spryker\Yves\CartVariant\Dependency\Plugin\CartVariantAttributeMapperPluginInterface $cartVariantAttributeMapperPlugin
     * @param \Pyz\Yves\Cart\Handler\CartItemHandlerInterface $cartItemHandler
     */
    public function __construct(
        CartVariantAttributeMapperPluginInterface $cartVariantAttributeMapperPlugin,
        CartItemHandlerInterface $cartItemHandler
    ) {
        $this->cartVariantAttributeMapperPlugin = $cartVariantAttributeMapperPlugin;
        $this->cartItemHandler = $cartItemHandler;
    }
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param array|null $itemAttributes
     *
     * @return array
     */
    public function getItemsAttributes(QuoteTransfer $quoteTransfer, array $itemAttributes = null)
    {
        $itemAttributesBySku = $this->cartVariantAttributeMapperPlugin
            ->buildMap($quoteTransfer->getItems());
        return $this->cartItemHandler
            ->narrowDownOptions($quoteTransfer->getItems(), $itemAttributesBySku, $itemAttributes);
    }
    /**
     * @param string $sku
     * @param int $quantity
     * @param array $selectedAttributes
     * @param \ArrayObject $items
     * @param string|null $groupKey
     * @param array $optionValueIds
     *
     * @return bool
     */
    public function tryToReplaceItem($sku, $quantity, $selectedAttributes, ArrayObject $items, $groupKey = null, $optionValueIds = [])
    {
        $storageProductTransfer = $this->cartItemHandler->getProductStorageTransfer($sku, $selectedAttributes, $items);
        if ($storageProductTransfer->getIsVariant() === true) {
            $this->cartItemHandler->replaceCartItem($sku, $storageProductTransfer, $quantity, $groupKey, $optionValueIds);
            return true;
        }
        return false;
    }
    /**
     * @param string $sku
     * @param array $selectedAttributes
     *
     * @return array
     */
    public function formatUpdateActionResponse($sku, array $selectedAttributes)
    {
        return [
            StorageProductTransfer::SELECTED_ATTRIBUTES => [$sku => $this->arrayRemoveEmpty($selectedAttributes)],
        ];
    }
    /**
     * Removes empty nodes from array
     *
     * @param array $haystack
     *
     * @return array
     */
    protected function arrayRemoveEmpty(array $haystack)
    {
        foreach ($haystack as $key => $value) {
            if (is_array($value)) {
                $haystack[$key] = $this->arrayRemoveEmpty($haystack[$key]);
            }
            if (empty($haystack[$key])) {
                unset($haystack[$key]);
            }
        }
        return $haystack;
    }
}
```

<br>
</details>

-->

### AttributeMapCollector
To support the mapping between attributes and availability, we need to collect additional data in our attribute map collector. You can do that by adding a single line with `SpyProductTableMap::COL_SKU` to the `getConreteProducts` function. 

The full function is as follows:

```php
/**
 * @param int $idProductAbstract
 *
 * @return \Orm\Zed\Product\Persistence\SpyProduct[]|\Propel\Runtime\Collection\ObjectCollection
 */
protected function getConcreteProducts($idProductAbstract)
{
    return SpyProductQuery::create()
        ->select([
            SpyProductTableMap::COL_ID_PRODUCT,
            SpyProductTableMap::COL_ATTRIBUTES,
            SpyProductTableMap::COL_SKU,
        ])
        ->withColumn(SpyProductLocalizedAttributesTableMap::COL_ATTRIBUTES, 'localized_attributes')
        ->useSpyProductLocalizedAttributesQuery()
            ->filterByFkLocale($this->locale->getIdLocale())
        ->endUse()
        ->filterByFkProductAbstract($idProductAbstract)
        ->filterByIsActive(true)
        ->find()
        ->toArray(null, false, TableMap::TYPE_CAMELNAME);
}
```

The `filterConcreteProductIds` function was changed to the following:

```php
/**
 * @param array $concreteProducts
 *
 * @return array
 */
protected function filterConcreteProductIds(array $concreteProducts)
{
    $concreteProductIds = array_map(function ($product) {
        return $product[SpyProductTableMap::COL_ID_PRODUCT];
    }, $concreteProducts);
    foreach ($concreteProducts as $product) {
        $concreteProductIds[$product[SpyProductTableMap::COL_SKU]] = $product[SpyProductTableMap::COL_ID_PRODUCT];
    }
    asort($concreteProductIds);
    return $concreteProductIds;
}
```

<!--
## UI Integration

You can use the demoshop's `cart-item.twig` as a template for your own project. 

<details open>
<summary>The following code sample demonstrates the feature's use:</summary>

```
&lt;form method="POST" action="{% raw %}{{{% endraw %} path('cart/update', {'sku': cartItem.sku }) {% raw %}}}{% endraw %}"&gt;
    {% raw %}{%{% endraw %} for attributeName, attributeOptions in itemAttributes {% raw %}%}{% endraw %}
        &lt;div class="row"&gt;
            &lt;div class="small-12  columns" data-component="cart-item"&gt;
                {% raw %}{%{% endraw %} if attributeOptions|length &gt; 1 {% raw %}%}{% endraw %}
                    &lt;label&gt;{% raw %}{{{% endraw %} ('product.attribute.' ~ attributeName) | trans {% raw %}}}{% endraw %}:
                        &lt;select class="js-cart-item-select" name="preselectedAttributes[{% raw %}{{{% endraw %} attributeName {% raw %}}}{% endraw %}]"&gt;
                            &lt;option value=""&gt;
                                {% raw %}{{{% endraw %} 'product.attribute._none' | trans {% raw %}}}{% endraw %}
                            &lt;/option&gt;
                            {% raw %}{%{% endraw %} for option, properties in attributeOptions {% raw %}%}{% endraw %}
                                &lt;option value="{% raw %}{{{% endraw %} option {% raw %}}}{% endraw %}"
                                        {% raw %}{%{% endraw %} if attribute(properties,'selected') {% raw %}%}{% endraw %}  selected{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %} {% raw %}{%{% endraw %} if not attribute(properties,'available') {% raw %}%}{% endraw %}disabled{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}&gt;
                                    {% raw %}{{{% endraw %} option {% raw %}}}{% endraw %}
                                &lt;/option&gt;
                            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                        &lt;/select&gt;
                    &lt;/label&gt;
                    &lt;input name="selectedAttributes[{% raw %}{{{% endraw %} attributeName {% raw %}}}{% endraw %}]" type="hidden"&gt;
                {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                    &lt;label&gt;
                        {% raw %}{{{% endraw %} ('product.attribute.' ~ attributeName) | trans {% raw %}}}{% endraw %}: &lt;a href="{% raw %}{{{% endraw %} url("cart") {% raw %}}}{% endraw %}"&gt;{% raw %}{{{% endraw %} 'reset' | trans {% raw %}}}{% endraw %}&lt;/a&gt;
                        {% raw %}{%{% endraw %} for option, properties in attributeOptions {% raw %}%}{% endraw %}
                            &lt;select class="js-cart-item-select" name="selectedAttributes[{% raw %}{{{% endraw %} attributeName {% raw %}}}{% endraw %}]"&gt;
                                &lt;option value="{% raw %}{{{% endraw %} option {% raw %}}}{% endraw %}" selected&gt;
                                    {% raw %}{{{% endraw %} option {% raw %}}}{% endraw %}
                                &lt;/option&gt;
                            &lt;/select&gt;
                        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                    &lt;/label&gt;
                {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
            &lt;/div&gt;
        &lt;/div&gt;
    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
    &lt;input type="hidden" value="{% raw %}{{{% endraw %} cartItem.groupKey {% raw %}}}{% endraw %}" name="groupKey"&gt;
    &lt;input type="hidden" value="{% raw %}{{{% endraw %} cartItem.quantity {% raw %}}}{% endraw %}" name="quantity"&gt;
    {% raw %}{%{% endraw %} if cartItem.productOptions|length &gt; 0 {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} for productOption in cartItem.productOptions {% raw %}%}{% endraw %}
            &lt;input name="product-option[{% raw %}{{{% endraw %} productOption.groupName {% raw %}}}{% endraw %}]" type="hidden" value="{% raw %}{{{% endraw %} productOption.idProductOptionValue {% raw %}}}{% endraw %}"&gt;
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
&lt;/form&gt;
```

<br>
</details>

Seemingly complex, you can simplify the code if your implementation does not support narrowing down of attributes (only one super attribute per product, i.e. T-shirt size). 

<details open>
<summary>The following snippet should help:</summary>

```
{% raw %}{%{% endraw %} set itemAttributes = attribute(data.attributes, cartItem.sku) {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} if itemAttributes|length &gt; 0 {% raw %}%}{% endraw %}
    &lt;form method="POST" action="{% raw %}{{{% endraw %} path('cart/update', {'sku': cartItem.sku }) {% raw %}}}{% endraw %}"
          data-component="cartitemlist"&gt;
        {% raw %}{%{% endraw %} for attributeName, attributeOptions in itemAttributes {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} if attributeOptions|length &gt; 0 {% raw %}%}{% endraw %}
                {% raw %}{{{% endraw %} ('product.attribute.' ~ attributeName) | trans {% raw %}}}{% endraw %}:
                &lt;select class="js-cart-item-select"
                        name="preselectedAttributes[{% raw %}{{{% endraw %} attributeName {% raw %}}}{% endraw %}]"&gt;
                    &lt;option value=""&gt;
                        {% raw %}{{{% endraw %} 'product.attribute._none' | trans {% raw %}}}{% endraw %}
                    &lt;/option&gt;
                    {% raw %}{%{% endraw %} for option, properties in attributeOptions {% raw %}%}{% endraw %}
                        &lt;option value="{% raw %}{{{% endraw %} option {% raw %}}}{% endraw %}"
                                {% raw %}{%{% endraw %} if attribute(properties,'selected') {% raw %}%}{% endraw %}  selected{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %} {% raw %}{%{% endraw %} if not attribute(properties,'available') {% raw %}%}{% endraw %}disabled{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}&gt;
                            {% raw %}{{{% endraw %} option {% raw %}}}{% endraw %}
                        &lt;/option&gt;
                    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                &lt;/select&gt;
                &lt;input class="selectedAttribute"
                       name="selectedAttributes[{% raw %}{{{% endraw %} attributeName {% raw %}}}{% endraw %}]" type="hidden"&gt;
            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        &lt;input type="hidden" value="{% raw %}{{{% endraw %} cartItem.groupKey {% raw %}}}{% endraw %}" name="groupKey"&gt;
        &lt;input type="hidden" value="{% raw %}{{{% endraw %} cartItem.quantity {% raw %}}}{% endraw %}" name="quantity"&gt;
    &lt;/form&gt;
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

<br>
</details>

<details open>
<summary>To submit a form when the user changes a cart item's attribute (such as a T-shirt size etc) , use  Java Script. The following snippet is an example implementation:</summary>

```
'use strict';
module.exports = {
    name: 'cart-item',
    view: {
        init: function($root) {
            this.$root = $root;
            this.$container = $('.js-cart-item-select', $root);
            if (!this.$container.length) {
                return;
            }
            this.$container.change(this.itemChanged.bind(this));
        },
        itemChanged: function(event) {
            var $selectedValue = this.$container.children('select option:selected').val();
            this.$root.children('input:hidden').val($selectedValue);
            this.$root.closest('form').submit();
            event.preventDefault();
        }
    }
};
```
-->


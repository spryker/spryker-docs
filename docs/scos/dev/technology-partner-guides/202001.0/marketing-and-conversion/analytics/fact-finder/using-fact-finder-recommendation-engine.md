---
title: Using FACT-Finder recommendation engine
description: The FACT-Finder recommendation engine analyzes product and category relationships. The results are rendered in recommendations widget, which can be displayed on product details pages, homepage or in the shopping cart.
template: howto-guide-template
originalLink: https://documentation.spryker.com/v4/docs/search-factfinder-recommendation
originalArticleId: 56df61f9-750b-4a45-ab44-cb07dad109dc
redirect_from:
  - /v4/docs/search-factfinder-recommendation
  - /v4/docs/en/search-factfinder-recommendation
---

## Prerequisites

The FACT-Finder recommendation engine analyzes product and category relationships. The results are rendered in recommendations widget, which can be displayed on product details pages, homepage or in the shopping cart.

## Usage

To add recommendations widget to product page, insert the following code into `src/Pyz/Yves/Product/Theme/default/product/detail.twig`:
```html
{% raw %}{{{% endraw %} fact_finder_recommendations({id: product.sku, mainId: product.idProductAbstract}, '@FactFinder/recommendations/products.twig') {% raw %}}}{% endraw %}
```
To add recommendations widget to cart page, modify cart controller  (`src/Pyz/Yves/Cart/Controller/CartController.php`) to add array of product ids into template variables:

<details open>
<summary>Click here to expand the code sample</summary>

```php
<?php
...

class CartController extends AbstractController
{

 /**
 * @return array
 */
 public function indexAction(Request $request, ?array $selectedAttributes = null)
 {
 $quoteTransfer = $this->getClient()
 ->getQuote();

 $factFinderSid = $request->cookies->get(FactFinderConstants::COOKIE_SID_NAME);
 $quoteTransfer->setFactFinderSid($factFinderSid);

 $voucherForm = $this->getFactory()
 ->getVoucherForm();

 $cartItems = $this->getFactory()
 ->createProductBundleGrouper()
 ->getGroupedBundleItems($quoteTransfer->getItems(), $quoteTransfer->getBundleItems());

 $cartItemsIds = [];
 $cartItemsNames = [];
 foreach ($cartItems as $cartItem) {
 $cartItemsNames[] = $cartItem->getName();
 $cartItemsIds[] = $cartItem->getSku();
 }

 $stepBreadcrumbsTransfer = $this->getFactory()
 ->getCheckoutBreadcrumbPlugin()
 ->generateStepBreadcrumbs($quoteTransfer);

 $itemAttributesBySku = $this->getFactory()
 ->createCartItemsAttributeProvider()
 ->getItemsAttributes($quoteTransfer, $selectedAttributes);

 $promotionStorageProducts = $this->getFactory()
 ->getProductPromotionMapperPlugin()
 ->mapPromotionItemsFromProductStorage(
 $quoteTransfer,
 $request
 );

 $factFinderSdkProductCampaignRequestTransfer = $this->getFactory()
 ->createFactFinderSdkProductCampaignRequestTransfer();
 $factFinderSdkProductCampaignRequestTransfer->setProductNumber($cartItemsIds);
 $factFinderSdkProductCampaignRequestTransfer->setSid($factFinderSid);

 $campaigns = $this->getCampaigns(
 $factFinderSdkProductCampaignRequestTransfer,
 $cartItems
 );

 return $this->viewResponse([
 'cart' => $quoteTransfer,
 'cartItems' => $cartItems,
 'attributes' => $itemAttributesBySku,
 'cartItemsIds' => $cartItemsIds,
 'cartItemsNames' => $cartItemsNames,
 'voucherForm' => $voucherForm->createView(),
 'stepBreadcrumbs' => $stepBreadcrumbsTransfer,
 'promotionStorageProducts' => $promotionStorageProducts,
 'campaigns' => $campaigns,
 ]);
 }

...
```
<br>
</details>

Then add recommendations widget to cart  page template `src/Pyz/Yves/Cart/Theme/default/cart/index.twig`:

```twig
{% raw %}{{{% endraw %} fact_finder_recommendations({id: cartItemsIds, mainId: cartItemsIds}, '@FactFinder/recommendations/products.twig') {% raw %}}}{% endraw %}
```

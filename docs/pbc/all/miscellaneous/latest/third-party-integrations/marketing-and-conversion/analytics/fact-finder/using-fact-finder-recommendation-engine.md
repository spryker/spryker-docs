---
title: Using FACT-Finder recommendation engine
description: The FACT-Finder recommendation engine analyzes product and category relationships. Creating recommendation widget, to be displayed on your store.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/search-factfinder-recommendation
originalArticleId: e3d079b4-2197-4009-a2f9-df27739a4b7f
redirect_from:
  - /2021080/docs/search-factfinder-recommendation
  - /2021080/docs/en/search-factfinder-recommendation
  - /docs/search-factfinder-recommendation
  - /docs/en/search-factfinder-recommendation
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-recommendation-engine.html
  - /docs/scos/dev/technology-partner-guides/202212.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-recommendation-engine.html
  - /docs/scos/dev/technology-partner-guides/202311.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-recommendation-engine.html
  - /docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-recommendation-engine.html
related:
  - title: Installing and configuring FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder.html
  - title: Integrating FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/integrating-fact-finder.html
  - title: Installing and configuring FACT-Finder NG API
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-the-fact-finder-ng-api.html
  - title: FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/fact-finder.html
  - title: Using FACT-Finder tracking
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-tracking.html
  - title: Using FACT-Finder search suggestions
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search-suggestions.html
  - title: Using FACT-Finder search
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search.html
  - title: Using FACT-Finder campaigns
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-campaigns.html
  - title: Exporting product data for FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/exporting-product-data-for-fact-finder.html
  - title: Installing and configuring FACT-Finder web components
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder-web-components.html
---

## Prerequisites

The FACT-Finder recommendation engine analyzes product and category relationships. The results are rendered in recommendations widget, which can be displayed on product details pages, homepage or in the shopping cart.

## Usage

To add recommendations widget to product page, insert the following code into `src/Pyz/Yves/Product/Theme/default/product/detail.twig`:

```html
{% raw %}{{{% endraw %} fact_finder_recommendations({id: product.sku, mainId: product.idProductAbstract}, '@FactFinder/recommendations/products.twig') {% raw %}}}{% endraw %}
```

To add recommendations widget to cart page, modify cart controller  (`src/Pyz/Yves/Cart/Controller/CartController.php`) to add array of product ids into template variables:

<details>
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

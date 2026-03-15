---
title: Using FACT-Finder tracking
description: Tracking information lets the FACT-Finder Search tool automatically learn from the user behavior.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/search-factfinder-tracking
originalArticleId: c84875c9-9cd3-40b6-a74f-8ea4abffe195
redirect_from:
  - /2021080/docs/search-factfinder-tracking
  - /2021080/docs/en/search-factfinder-tracking
  - /docs/search-factfinder-tracking
  - /docs/en/search-factfinder-tracking
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-tracking.html
  - /docs/scos/dev/technology-partner-guides/202212.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-tracking.html
  - /docs/scos/dev/technology-partner-guides/202311.0/marketing-and-conversion/analytics/fact-finder/using-fact-finder-tracking.html
related:
  - title: Integrating FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/integrating-fact-finder.html
  - title: Installing and configuring FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder.html
  - title: Installing and configuring FACT-Finder web components
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder-web-components.html
  - title: Installing and configuring FACT-Finder NG API
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-the-fact-finder-ng-api.html
  - title: Using FACT-Finder campaigns
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-campaigns.html
  - title: Exporting product data for FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/exporting-product-data-for-fact-finder.html
  - title: Using FACT-Finder search
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search.html
  - title: Using FACT-Finder recommendation engine
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-recommendation-engine.html
  - title: Using FACT-Finder search suggestions
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search-suggestions.html
---

## Prerequisites

Tracking information lets the FACT-Finder Search tool automatically learn from the user behavior.

The data provided through this interface can be used for a variety of purposes. They include the tracking of events such as users clicking on a detail page, placing a product into the shopping cart and purchasing it. The information can form the basis for automated search optimization. It automatically improves the search result on the basis of the established consumer behavior. Information about product clicks, shopping cart, and purchase events, in other words, the user behavior, is required for the Personalization module, which provides tailored search results for each user. The information on product purchases can also be used as a basis for the Recommendation Engine module.

Please note, that the personalization can only work if a proper session ID is sent with each search request.

## Usage

By default, you can use the `/fact-finder/track` route. According to the FACT-Finder documentation, you can use tracking `GET` parameters . The user session ID will be appended on a server side.

* **General Parameters**:
  - `id` - ID of the item for which information is to be sent.
  - `masterId` (optional) - If your shop contains item versions and you need to transmit the item version number with the id parameter, you will need to transmit the master item number using this parameter to ensure that the products and the possible events can be assigned to each other.
  - `channel` - The name of the FACT-Finder channel in which the search was conducted.
  - `sid` - Use it to pass the user's session identifier.
  - `event` - This parameter specifies the event type. Use the following values for the various types:
    + click
    + cart
    + checkout
    + login
    + recommendationClick
    + feedback
  - `title` (optional) - The item name.
  - `userId` (optional) - Use it to pass a user identifier. As with the session ID, it can be anonymized.
  - `cookieId` (optional) - You use this parameter to pass a token that identifies the user over a longer period of time, even when not being logged in to the shop.
* <b>Click on the detail page</b>:
  - `sid` - Use it to pass the user's session identifier.
  - `query` - The search term for which the user has searched.
  - `pos` - The position of the product in the search results.
  - `origPos` - It transmits the original position of the item in the search result.
  - `page` - The number of the search result page on which the selected product was displayed.
  - `pageSize` (optional) - The number of products per search result page at the time the click was executed.
  - `origPageSize` - The default number of products per search result page.
  - `simi` (optional) - The FACT-Finder similarity value for the respective product.
  - `campaign` - This field has the campaign ID as its value.
* <b>Shopping basket and purchase information</b>:
  - `count` - Quantity of product purchased.
  - `price` (optional) - Product price.
  - `campaign` - The search result via a campaign. This field has the campaign ID as its value.
* <b>User login</b>:
  - `sid` - Use this to pass the user's session identifier.
  - `userId` - Use this to pass a user identifier. Like the session ID, this can be anonymized.
* <b>Recommendation Engine click</b>:
  - `mainId` - ID of the article for which the clicked article was recommended.
* <b>Search result feedback</b>:
  - `query` - The search term for which a search was conducted and on which feedback has been provided.
  - `positive` - Send the value true at this point if the customer provided positive feedback. Send false if negative feedback was provided on the result.
  - `message` (optional) - If the customer left a message as justification of their opinion, you can send it using this parameter.
* <b>Shop cachehit</b>:
  - `page` - The number of the search result page on which the selected product was displayed.
  - `pageSize` - The number of products per search result page at the time the click was executed.
  - `query` - The search term for which a search was conducted and on which feedback has been provided.
  - `hitCount` - The amount of products found in the search result.
  - `searchTime` - The time which was needed to create the search result.
  - `bestSimi` - Similarity of the best product.
  - `minSimi` - Similarity of the last product.
  - `filterfieldName` (optional) - Information about active filters in the search result.
  - `searchField` (optional) - The field for which the search was performed in case the search was limited to a specific field.
  - `customSorting` (optional) - If the default sorting was not used for the search result, then  send a true.
  - `additionalInfo`` (optional) - You may use this parameter to add something to the log entry, such as to enable searching the log for a specific entry.
* <b>Suggest Tracking</b>:
  - `queryFromSuggest` - This parameter indicates that the FACT-Finder query was triggered through a selection from the suggestion list. In this case send the parameter with the value true.
  - `userInput` - Please use this parameter to send the order of letters the shop user entered until the search query was triggered.

To use tracking on the back-end, provide the dependency to your module dependency provider.

**Code sample**

 ```php
<?php

 /**
 * @param \Spryker\Yves\Kernel\Container $container
 *
 * @return \Spryker\Yves\Kernel\Container
 */
 public function provideDependencies(Container $container) {
 $container[self::FACT_FINDER_CLIENT] = function (Container $container) {
 return $container->getLocator()->factFinderSdk()->client();
 };

 return $container;
 }

{% raw %}{%{% endraw %} endhighlight {% raw %}%}{% endraw %}

Add a new function to your module factory.

{% raw %}{%{% endraw %} highlight php linenos {% raw %}%}{% endraw %}
<?php

 /**
 * @return \SprykerEco\Client\FactFinderSdk\FactFinderSdkClient
 */
 public function getFactFinderSdkClient()
 {
 return $this->getProvidedDependency(YourBundleDependencyProvider::FACT_FINDER_CLIENT);
 }
```

Login tracking could be added to a `Pyz\Yves\Customer\Plugin\Provider\CustomerAuthenticationSuccessHandler` on `AuthenticationSuccess` function.

Example of a user login tracking function:

```php
<?php

 /**
 * @param \Generated\Shared\Transfer\CustomerTransfer $customer
 * @param Request $request
 *
 * @return void
 */
 protected function trackLogin(CustomerTransfer $customer, Request $request)
 {
 $trackingTransfer = new FactFinderSdkTrackingRequestTransfer();
 $trackingTransfer->setEvent(CustomerConstants::LOGIN_TRACKING);
 $trackingTransfer->setSid($request->cookies->get(FactFinderConstants::COOKIE_SID_NAME));
 $trackingTransfer->setUserId(md5($customer->getEmail()));

 $this->factFinderSdkClient->track($trackingTransfer);
 }
```

Shopping basket tracking function could be added to a `Yves\Cart\Handler\CartOperationHandler` changeQuantity and add functions.

Add a session client and a fact finder sdk client to the `CartOperationHandler` class via a `DependencyProvider`.

Example of an add to cart tracking function:

```php
<?php

 /**
 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 * @param $sku
 * @param $quantity
 *
 * @return \Generated\Shared\Transfer\FactFinderSdkTrackingResponseTransfer
 */
 protected function trackAddToCart(QuoteTransfer $quoteTransfer, $sku, $quantity)
 {
 $trackItemTransfer = $this->getCurrentItemTransfer($quoteTransfer, $sku);

 if ($trackItemTransfer) {
 $trackRequestTransfer = new FactFinderSdkTrackingRequestTransfer();
 $trackRequestTransfer->setId($trackItemTransfer->getSku())
 ->setMasterId() // generate and add an abstract product sku
 ->setEvent(static::CART_TRACK_EVENT_NAME) // static::CART_TRACK_EVENT_NAME === 'cart'
 ->setCount($quantity)
 ->setPrice($trackItemTransfer->getUnitPrice() / 100)
 ->setSid($this->sessionClient->getId());

 return $this->factFinderSdkClient->track($trackRequestTransfer);
 }

 return new FactFinderSdkTrackingResponseTransfer();
 }
```

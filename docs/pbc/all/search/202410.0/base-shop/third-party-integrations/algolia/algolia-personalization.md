---
title: Algolia Personalization
description: Find out how you can enable Algolia personalization in your Spryker shop
last_updated: Nov 24, 2024
template: howto-guide-template
---

{% info_block infoBox "Info" %}

Default Spryker installation supports Algolia personalization only for YVES frontend.
If you plan to use Algolia personalization in headless frontend or mobile application follow [this guide](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/algolia-personalization-headless.html). 

This feature also enables other Algolia premium features:

- Dynamic Re-Ranking
- Query Categorization
- Search analytics
- Revenue analytics
- A/B Testing

{% endinfo_block %}

## Prerequisites

Your shop already has [integrated](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html) 
and [configured](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/configure-algolia.html) ACP Algolia App
and your Algolia search indexes have products. 

## Update Spryker Shop


### Install new Spryker packages

```bash
composer install spryker-shop/traceable-event-widget
```

### Update Spryker packages

```bash
composer update --with-dependencies spryker/search-http spryker/customer \
spryker-shop/shop-ui spryker-shop/catalog-page spryker-shop/cart-page spryker-shop/checkout-page spryker-shop/home-page \
spryker-shop/product-detail-page spryker-shop/product-group-widget spryker-shop/product-set-detail-page spryker-shop/quick-order-page
```
TODO: the list should be revalidated after final code review.

if the command does now work, try it with `--with-all-dependencies` flag instead. 

### Enabled new features
1. Update project config:
```php
// config_default.php

$config[KernelAppConstants::TENANT_IDENTIFIER]
    //..   
    = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';
```

2. Enable new widget, that will trigger events for user actions and send them to [Algolia Insights](https://www.algolia.com/doc/guides/sending-events/getting-started/): 
```php
// src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{

    protected function getGlobalWidgets(): array
    {
        return [
            //...
            SprykerShop\Yves\TraceableEventWidget\Widget\TraceableEventWidget::class
        ];
}
```

3. Enabled the plugin that will generate an anonymous token for guest users in the session:
```php
// src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{

    protected function getEventDispatcherPlugins(): array
    {
        return [
            //...
            new Spryker\Yves\Customer\Plugin\EventDispatcher\AnonymousIdSessionAssignEventDispatcherPlugin(),
        ];
}
```

4. Build the JavaScript assets for Yves `npm ci && npm run yves` or `console frontend:project:install-dependencies && console frontend:yves:build`.
   Usually, it's executed automatically during the Spryker Cloud deployment pipeline. But it's better to check this command on the local development environment first.

5. Check your Yves's compatibility with the feature:

In case of customizations, your codebase could have updated Yves templates on the project level (src/Pyz/Yves/).
It could be a reason that some events won't be triggered or triggered with incorrect data.

// TODO (@matweew/@supproduction)
`TraceableEventWidgetConfig::isDebugEnabled()` set to `true`.
  
* Run the project locally or deploy to testing environment.
* Open your Shop Storefront home page.
* Open browser's development console and check "Preserve log" in the settings.

Test the correctness of data in the triggered events in the browser console:
* Open Home page
  * (if home page has products) Click on a product - `PRODUCT_CLICK`
  * (if home page has the add to cart button) Click on a product add to cart button - `ADD_TO_CART`
* Open any product detail page (PDP), you should see events for the actions: 
  * `PAGE_LOAD`
  * `ADD_TO_CART`
  * `ADD_TO_SHOPPING_LIST`
  * `ADD_TO_WISHLIST`
* Open any Category page or Search results page:
  * `QueryID` should be present in the event payload on this page type.
  * `PAGE_LOAD` with displayed products SKUs and displayed search filters.
  * `PRODUCT_CLICK` when user clicks on results.
  * `ADD_TO_CART` with product SKU, currency and price, when user clicks Add to cart from the catalog page.
* Open Cart page
  * (if applicable) add a new product from add to cart widget `ADD_TO_CART`
  * (if applicable) save cart items to a shopping list `ADD_TO_SHOPPING_LIST`
* Open Quick Order page
  * (if applicable) add a new product from add to cart widget `ADD_TO_CART`
  * (if applicable) save cart items to a shopping list `ADD_TO_SHOPPING_LIST`


If you find some events are not triggered or data in the event payload is incorrect check your updated Yves templates on project level (src/Pyz/Yves/).
Find the original template in the core `/vendor/spryker/spryker-shop/...` and check what selectors are used in `{% block eventTracker %}`,
adjust the block code in your project templates when needed.

// TODO (@supproduction): example will be helpful here. 

### Update website agreement text

You should update the website agreement text and ask for user consent to have their interactions with the website tracked and sent to Algolia.
Something similar to

> **User Data analytics**
> 
> To enhance your experience, we use data and analytics to understand how you interact with our site.
> By accepting, you allow us to capture anonymous events for personalization, analysis, and continuous improvement of your experience on our platform.

### Test it

1. Deploy to testing environment.
2. Make sure that Algolia is connected and configured in the Backoffice > Apps.

{% warning_block warningBox "Make sure" %}

If you previously had ACP Algolia App connected and used, you will need to disconnect and connect it again with the same Algolia credentials in the ACP App Catalog.
This action will update your Spryker shop config to be able to send events to Algolia.

{% endinfo_block %}

3. Open Yves, act as a guest and logged-in user, do searches, filter results, open product pages after search, add products to cart, do order placement.
4. Go to [Algolia Dashboard](https://dashboard.algolia.com/) and open Events from Data Sources section - `https://dashboard.algolia.com/apps/$APP_ID$/events/debugger`.
5. Check that you see events from your website here.

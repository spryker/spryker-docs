---
title: Algolia Personalization
description: Find out how you can enable Algolia personalization in your Spryker shop
last_updated: Nov 24, 2024
template: howto-guide-template
---

{% info_block infoBox "Info" %}

Default Spryker setup supports Algolia personalization only with YVES frontend.
If you plan to use it with customer headless frontend or mobile application follow [this guide](#todo) 

{% endinfo_block %}

## Prerequisites

Your shop already has [integrated](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html) 
and [configured](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html) ACP Algolia App
and your Algolia search indexes have some products. 

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

if the command does now work, try with `--with-all-dependencies` instead. 

### Enabled new features
1. Update project config
```php
// config_default.php

$config[KernelAppConstants::TENANT_IDENTIFIER]
    //..   
    = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';
```

2. New widget will trigger events for user actions, that will be sent to [Algolia Insights](https://www.algolia.com/doc/guides/sending-events/getting-started/) 
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

3. The plugin that will generate an anonymous token for guest users in the session.   
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

4. Build a new javascript for Yves `npm ci && npm run yves` or `console frontend:project:install-dependencies && console frontend:yves:build`.
   Usually it's executed automatically during Spryker Cloud deployment pipeline. But it's better to check this command on local development environment.


5Check project Yves compatibility and customizations

* TODO: updated after the implementation of debugger.
`TraceableEventWidgetConfig::getIsDebugEnabled()` set to `true`.
  
* Run the project locally or deploy to testing environment.
* Open your Shop storefront home page
* Open browser's development console and check "Preserve log" in the settings.

Test the correctness of data in the triggered events in the browser console:
* (if applicable) Click on a product on the home page - PRODUCT_CLICK
* (if applicable) Click on a product add to cart button on the home page - ADD_TO_CART
* Open product details page (PDP) - PAGE_LOAD
  * ADD_TO_CART
  * ADD_TO_SHOPPING_LIST
  * ADD_TO_WISHLIST

### Add consent for your site users

You have to update the text of your site agreement and ask for a user's consent that they agree that their site interactions will be tracked and sent  

### Test it

Deploy to testing environment. Go to 

## Last checks

{% warning_block warningBox "Make sure" %}

If you previously had ACP Algolia App connected and used, you will need to disconnect and connect it again with the same Algolia credentials in the ACP App Catalog.
This action will update your Spryker shop config to be able to send events to Algolia.

{% endinfo_block %}
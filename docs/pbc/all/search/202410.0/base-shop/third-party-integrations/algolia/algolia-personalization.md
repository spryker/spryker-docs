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
spryker-shop/cart-page spryker-shop/catalog-page spryker-shop/checkout-page spryker-shop/payment-page spryker-shop/home-page \
spryker-shop/price-product-volume-widget spryker-shop/product-detail-page  spryker-shop/product-group-widget \
spryker-shop/product-review-widget spryker-shop/product-set-detail-page spryker-shop/quick-order-page \
spryker-shop/shop-ui
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
`npm list search-insights` if you have `└── (empty)` result it means that you have to install `search-insights` manually `npm i search-insights`.


In case of customizations, your codebase could have updated Yves templates on the project level (src/Pyz/Yves/).
It could be a reason that some events won't be triggered or triggered with incorrect data.

`TraceableEventWidgetConfig::isDebugEnabled()` set to `true`.
  
* Run the project locally or deploy to testing environment.
* Open your Shop Storefront home page.
* Open browser's development console and check "Preserve log" in the settings.

Test the correctness of data in the triggered events in the browser console:
* Open Home page
  * (if home page has products) Click on a product - `PRODUCT_CLICK`
  * (if home page has the add to cart button) Click on a product add to cart button - `ADD_TO_CART`
* Open any product detail page (PDP), you should see events for the actions: 
  * `PAGE_LOAD` with sku of viewed product.
  * `ADD_TO_CART` with product SKU, currency, price and quantity, when user clicks Add to cart.
  * `ADD_TO_SHOPPING_LIST` with product SKU when user clicks Add to shopping list.
  * `ADD_TO_WISHLIST` with product SKU when user clicks Add to wishlist list.
* Open any Category page or Search results page:
  * `QueryID` should be present in the event payload on this page type.
  * `PAGE_LOAD` with displayed products SKUs and displayed search filters.
  * `PRODUCT_CLICK` when user clicks on results.
  * `ADD_TO_CART` with product SKU, currency and price, when user clicks Add to cart from the catalog page.
  * `FILTER_CLICK` with filters list, when user clicks any filter from the filter section.
* Open Cart page
  * (if applicable) add a new product from add to cart widget `ADD_TO_CART`
  * (if applicable) save cart items to a shopping list `ADD_TO_SHOPPING_LIST`
* Open Quick Order page
  * (if applicable) add a new product from add to cart widget `ADD_TO_CART`
  * (if applicable) save cart items to a shopping list `ADD_TO_SHOPPING_LIST`
* Open Order Success page
  * `PAGE_LOAD` with currency, order total, skus, prices, quantities  of purchased products.

To view a full list of available events, refer to the `traceable-events-algolia` [Readme file](https://github.com/spryker-shop/traceable-event-widget/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-algolia/README.md).

When debug mode is enabled, you can see event logs in the console to help with inspection.

#### Common Issues and Solutions

##### Prerequisites

If you need to add, modify, or fix events at the project level, start with these two steps:

- Locate the page template or view that is used for the current page.
- Override the `{% block eventTracker %}` block in your project’s template at the [project level](https://docs.spryker.com/docs/dg/dev/frontend-development/202410.0/yves/atomic-frontend/managing-components/overriding-components.html#create-component-folder-on-project-level).

For comprehensive details about the **event configuration API**, visit the [traceable-events-orchestrator README](https://github.com/spryker-shop/traceable-event-widget/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md).

##### Issue: Event Not Triggering on User Action

If an event is not firing, verify that the desired action (e.g., 'click', 'change') is configured for the specific event (e.g., `PRODUCT_CLICK`).

1. Check the Configuration

Spryker provides default configurations for built-in components. For new components, you need to add the appropriate event configuration.

```twig
{% block eventTracker %}
    {% set events = {
        list: events.list | merge([
            {
                event: 'NEEDED_EVENT_NAME', // e.g., PRODUCT_CLICK
                name: 'NEEDED_EVENT_LISTENER', // e.g., click/change
                triggers: [...event triggers data],
            },
        ]),
        data: events.data,
    } %}

    {{ parent() }}
{% endblock %}
```

Refer to the [API documentation](https://github.com/spryker-shop/traceable-event-widget/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md) for more details.

2. Check Event Selector

Spryker includes default CSS selectors. If selectors have changed, update the configuration accordingly.

```twig
{% block eventTracker %}
    {% set events = {
        list: events.list | merge([
            {
                event: 'NEEDED_EVENT_NAME', // e.g., PRODUCT_CLICK
                name: 'NEEDED_EVENT_LISTENER', // e.g., click/change/load
                triggers: [
                    {
                        selector: 'new_css_selector_path', // The element selector to monitor
                        /* event data configuration */
                    },
                ],
            },
        ]),
        data: events.data,
    } %}

    {{ parent() }}
{% endblock %}

```

##### Issue: Incorrect Event Payload

You can view the event payload in the console under `Adapter Data:`. If the payload is incorrect, check the static and dynamic data configurations.

1. Static Data

Adjust static data in the eventTracker block as needed:

```twig
{% block eventTracker %}
    {% set events = {
        list: events.list,
        data: events.data | merge({
          existing_key_to_override: New Data,
          new_key: New Data,
        }),
    } %}

    {{ parent() }}
{% endblock %}
```

1. Dynamic Data

For adding dynamic data, refer to the [API documentation](https://github.com/spryker-shop/traceable-event-widget/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md). Adjust the configuration as needed for specific triggers.

```twig
{% set events = {
    list: events.list | merge([{
        event: 'EVENT_EXAMPLE',
        name: 'click',
        triggers: [
            {
                selector: '.js-related-products',
                groupAs: {
                    key: 'relatedProducts', // Group data under the 'relatedProducts' key
                    toArray: true, // Convert the grouped data into an array format
                },
                data: {
                    details: {
                        selector: 'self', // Look for the 'details' attribute within the current element
                        flatten: true, // Flatten the structure of the object to simplify it
                    },
                    name: {
                        selector: '.product-name', // Search for an element with the 'product-name' class within the monitored element
                        attribute: 'price', // Use the 'price' attribute as the value; if absent, fallback to the element's text content
                    },
                    price: {
                        value: 'static value', // Assign a fixed value to the 'price' attribute
                    },
                    attributes: {
                        selector: '.attribute-selector',
                        multi: true, // Collect all matching elements and return their data as an array
                    },
                    metadata: {
                        multi: true,
                        selector: '.metadata-row',
                        composed: { // Create nested structures for more detailed data gathering and start searching elements from `.metadata-row` selector.
                            brand: {
                                selector: '.product-brand',
                                attribute: 'textContent'
                            },
                            category: {
                                selector: '.product-category',
                            },
                        },
                    },
                },
            },
        ],
    }]),
    data: events.data,
} %}

{# Expected transformed data format in the console:
  {
      ...global data/event metadata,
      relatedProducts: {
          // Flattened data from the 'details' attribute
          name: VALUE, // The value taken from the 'name' selector or attribute
          price: 'static value', // The fixed 'price' value
          attributes: [VALUE, VALUE, VALUE, ...], // Array of values collected from elements matching '.attribute-selector'
          metadata: [
              {
                  brand: VALUE, // 'brand' data extracted from the '.metadata-row .product-brand' element
                  category: VALUE, // 'category' data from the '.metadata-row .product-category' element
              },
              {
                  brand: VALUE, // 'brand' data extracted from the '.metadata-row .product-brand' element
                  category: VALUE, // 'category' data from the '.metadata-row .product-category' element
              },
              ...
          ]
      }
  }
#}
```

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

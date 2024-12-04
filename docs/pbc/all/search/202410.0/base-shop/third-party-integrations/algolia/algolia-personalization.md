---
title: Integrate Algolia Personalization
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

1. [Integrate Algolia](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html)
2. [Configure Algolia](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/configure-algolia.html)
3. Add products to your Algolia search indexes

## Update Spryker Shop

1. Install new Spryker packages:

```bash
composer require --with-dependencies spryker-shop/traceable-event-widget:^1.0.2
```
if the command does now work, try it with `--with-all-dependencies` flag instead.


2. Update Spryker packages:

```bash
composer update --with-dependencies spryker-shop/cart-page:^3.45.0 spryker-shop/catalog-page:^1.28.0 spryker-shop/checkout-page:^3.32.1 \
spryker-shop/home-page:^1.2.0 spryker-shop/payment-page:^1.5.0 spryker-shop/product-detail-page:^3.23.0 spryker-shop/product-group-widget:^1.10.1 \
spryker-shop/product-review-widget:^1.16.1 spryker-shop/product-set-detail-page:^1.11.0 spryker-shop/quick-order-page:^4.10.1 \
spryker-shop/shop-ui:^1.82.0
```
if the command does now work, try it with `--with-all-dependencies` flag instead.

### Enable new features

1. Update project config:
```php
// config_default.php

$config[KernelAppConstants::TENANT_IDENTIFIER]
    //..   
    = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';
```

2. Enable a widget that triggers events for user actions and sends them to [Algolia Insights](https://www.algolia.com/doc/guides/sending-events/getting-started/):
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

3. Enabled the plugin that generates an anonymous token for guest users in the session:
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

4. Build JavaScript assets for Yves using one of the following commands:
```bash
npm ci && npm run yves
```

```bash
console frontend:project:install-dependencies && console frontend:yves:build
```

5. Install required `search-insights` dependency:
```bash
npm i search-insights`.


### Check your Yves's compatibility with new functionality

In case of customizations, your codebase could have updated Yves templates on the project level (`src/Pyz/Yves/`).
It could be a reason that some events won't be triggered or triggered with incorrect data.

#### Run the project
1. Set `TraceableEventWidgetConfig::isDebugEnabled()` set to `true`.  
2. Run the project locally or deploy to testing environment.
3. Open your Shop Storefront home page.
4. Open browser's development console and check "Preserve log" in the settings.

#### Check triggered events and their payload

When debug mode is enabled, you can see event logs in the console to help with inspection.

Monitor the browser's console and execute following cases:
* Open the home page.
  * If the home page has products, click on a product - `PRODUCT_CLICK`.
  * If the home page has the add to cart button, click on it - `ADD_TO_CART`
* Open a product's details page, you should see events for the actions:
  * `PAGE_LOAD` with the product's SKU.
  * `ADD_TO_CART` with the product's SKU, currency, price and quantity, when user clicks **Add to cart**.
  * `ADD_TO_SHOPPING_LIST` with product SKU when user clicks **Add to shopping list**.
  * `ADD_TO_WISHLIST` with product SKU when user clicks **Add to wishlist**.
* Open a **Category** or **Search Results** page:
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


#### Common Issues and Solutions

##### Prerequisites

If you need to add, modify, or fix events at the project level, start with these two steps:

- Locate the page template or view that is used for the current page.
- Override the `{% raw %}{% block eventTracker %}{% endraw %}` block in your project’s template at the [project level](https://docs.spryker.com/docs/dg/dev/frontend-development/202410.0/yves/atomic-frontend/managing-components/overriding-components.html#create-component-folder-on-project-level).

For comprehensive details about the **event configuration API**, visit the [traceable-events-orchestrator README](https://github.com/spryker-shop/traceable-event-widget/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md).

##### Issue: Event Not Triggering on User Action

If an event is not firing, verify that the desired action (e.g., 'click', 'change') is configured for the specific event (e.g., `PRODUCT_CLICK`).

1. Check the Configuration

Spryker provides default configurations for built-in components. For new or modified components, you need to add the appropriate event configuration.

```twig
{% raw %}{% block eventTracker %}{% endraw %}
    {% raw %}{% set events = {{% endraw %}
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
{% raw %}{% endblock %}{% endraw %}
```

Refer to the [API documentation](https://github.com/spryker-shop/traceable-event-widget/blob/master/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md) for more details.

2. Check Event Selector

Spryker includes default CSS selectors. If selectors have changed, update the configuration accordingly.

```twig
{% raw %}{% block eventTracker %}{% endraw %}
    {% raw %}{% set events = {{% endraw %}
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
{% raw %}{% endblock %}{% endraw %}

```

##### Issue: Incorrect Event Payload

You can view the event payload in the console under `Adapter Data:`. If the payload is incorrect, check the static and dynamic data configurations.

1. Static Data

Adjust static data in the `eventTracker` block as needed:

```twig
{% raw %}{% block eventTracker %}{% endraw %}
    {% raw %}{% set events = {{% endraw %}
        list: events.list,
        data: events.data | merge({
          existing_key_to_override: New Data,
          new_key: New Data,
        }),
    } %}

    {{ parent() }}
{% raw %}{% endblock %}{% endraw %}
```

2. Dynamic Data

For adding dynamic data, refer to the [API documentation](https://github.com/spryker-shop/traceable-event-widget/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md). Adjust the configuration as needed for specific triggers.

```twig
{% raw %}{% set events = {{% endraw %}
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

##### Examples of the feature integration into Spryker demo shops

- [B2C Demo Shop](https://github.com/spryker-shop/b2c-demo-shop/pull/595/files)
- [B2C Marketplace Demo Shop](https://github.com/spryker-shop/b2c-demo-marketplace/pull/474/files)
- [B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop/pull/542/files)
- [B2B Marketplace Demo Shop](https://github.com/spryker-shop/b2b-demo-marketplace/pull/490/files)

  

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

{% info_block warningBox "Make sure" %}

If you previously had ACP Algolia App connected and used, you will need to disconnect and connect it again with the same Algolia credentials in the ACP App Catalog.
This action will update your Spryker shop config to be able to send events to Algolia.

{% endinfo_block %}

3. Open Yves, act as a guest and logged-in user, do searches, filter results, open product pages after search, add products to cart, do order placement.
4. Go to [Algolia Dashboard](https://dashboard.algolia.com/) and open Events from Data Sources section - `https://dashboard.algolia.com/apps/$APP_ID$/events/debugger`.
5. Check that you see events from your website here.


### Configure Algolia Features

When your indexes will have enough data (unique searches, events), you can check it in Analytics and Events Debugger tabs on Algolia Dashaboard.
Then you can start configuration of Personalization, Dynamic Re-Ranking and Query Categorization features (find Algolia docs and guides on their website).

**It's important** that you need to first create [A/B tests](https://academy.algolia.com/training/00f72f14-0713-11ef-b9fe-0617d5264223/overview)
with new personalized configuration of your search ("A/B Testing" page in Algolia Dashboard).
It will allow you to see how new features influence your search conversion rate only for some limit audience of your site. When the results are good,
you can change the settings globally in the indexes configuration, so it will work for all users.

---
title: Integrate Algolia Personalization
description: Find out how you can enable Algolia personalization in your Spryker shop
last_updated: Nov 24, 2024
template: howto-guide-template
---

This document describes how to integrate Algolia Personalization. This integration also enabled other Algolia premium features:

- Dynamic Re-Ranking
- Query Categorization
- Search analytics
- Revenue analytics
- A/B Testing

{% info_block infoBox "Third-party frontends" %}

By default, Spryker supports Algolia Personalization only for Yves. To integrate Algolia Personalization with a third-party or mobile frontend, follow [this guide](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/algolia-personalization-headless.html).

{% endinfo_block %}

## Prerequisites

1. [Integrate Algolia](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html)
2. [Configure Algolia](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/configure-algolia.html)
3. Add products to your Algolia search indexes

## Install and update Spryker packages

1. Install a Spryker package for tracing events:

```bash
composer require --with-dependencies spryker-shop/traceable-event-widget:^1.0.2
```
If the command doesn't work, try running the following command: `composer require --with-dependencies spryker-shop/traceable-event-widget:^1.0.2 --with-all-dependencies`.


2. Update Spryker packages:

```bash
composer update --with-dependencies spryker-shop/cart-page:^3.45.0 spryker-shop/catalog-page:^1.28.0 spryker-shop/checkout-page:^3.32.1 \
spryker-shop/home-page:^1.2.0 spryker-shop/payment-page:^1.5.0 spryker-shop/product-detail-page:^3.23.0 spryker-shop/product-group-widget:^1.10.1 \
spryker-shop/product-review-widget:^1.16.1 spryker-shop/product-set-detail-page:^1.11.0 spryker-shop/quick-order-page:^4.10.1 \
spryker-shop/shop-ui:^1.82.0
```
if the command doesn't work, try running it with the `--with-all-dependencies` flag.

### Enable features

1. Update the project config:
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

3. Enable the plugin that generates an anonymous token for guest users in the session:
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

5. Install the `search-insights` dependency:
```bash
npm i search-insights
```

### Check your Yves's compatibility with new functionality

In case of customizations, your codebase could have updated Yves templates on the project level: `src/Pyz/Yves/`.
It could be a reason that some events won't be triggered or triggered with incorrect data.

#### Run the project
1. Set `TraceableEventWidgetConfig::isDebugEnabled()` to `true`.  
2. Run the project locally or deploy to a testing environment.
3. Open the Storefront's home page.
4. In browser development console, go to settings.
5. Enable the "Preserve log" option.

#### Check triggered events and their payload

When debug mode is enabled, you can see event logs in the console to help with inspection.

Execute the following cases while monitoring the console for specified events:

Home page cases:

| CASE | EVENT |
| - | - |
| If the home page has products, click on a product. | `PRODUCT_CLICK` |
| If the home page has the add to cart button, click on it. | `ADD_TO_CART` |


Product Details page cases:

| CASE | EVENT |
| - | - |
| Open the Product Details page | `PAGE_LOAD` with the product's SKU. |
| Click **Add to cart**. | `ADD_TO_CART` with the product's SKU, currency, price, and quantity. |
| Click **Add to shopping list**. | `ADD_TO_SHOPPING_LIST` with product's SKU. |
| Click **Add to wishlist** | `ADD_TO_WISHLIST` with the product's SKU. |

Category and Search Results page cases:

| CASE | EVENT |
| - | - |
| Open Category or Search Results page. | `QueryID` is present in the event payload. `PAGE_LOAD` with displayed products SKUs and search filters. |
| Click on a product. | `PRODUCT_CLICK` |
| Click **Add to cart**. | `ADD_TO_CART` with the product's SKU, currency, and price. |
| Click on a filter | `FILTER_CLICK` with a list of filters. |

Cart page cases:

| CASE | EVENT |
| - | - |
| If applicable: add a product from the "Add to cart" widget. |  `ADD_TO_CART` |
| If applicable: save cart items to a shopping list. | `ADD_TO_SHOPPING_LIST` |

Quick Order page cases:

| CASE | EVENT |
| - | - |
| If applicable: add a product from the "Add to cart" widget. | `ADD_TO_CART` |
| If applicable: save cart items to a shopping list. | `ADD_TO_SHOPPING_LIST` |

Order Success page cases:
| CASE | EVENT |
| - | - |
| Open the **Order Success** page | `PAGE_LOAD` with currency, order total, SKUs, prices, and quantities of purchased products. |

To view a full list of available events, refer to the `traceable-events-algolia` [Readme file](https://github.com/spryker-shop/traceable-event-widget/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-algolia/README.md).


#### Common issues and solutions

##### Prerequisites

If you need to add, change, or fix events at the project level, start with these steps:

1. Locate the page template or view that is used for the current page.
2. On the [project level](https://docs.spryker.com/docs/dg/dev/frontend-development/202410.0/yves/atomic-frontend/managing-components/overriding-components.html#create-component-folder-on-project-level), override the `{% raw %}{% block eventTracker %}{% endraw %}` block in your project’s template.

For comprehensive details about the **event configuration API**, visit the [traceable-events-orchestrator README](https://github.com/spryker-shop/traceable-event-widget/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md).

##### Issue: Event not triggering on user action

If an event isn't firing, verify that the action, like `click` or `change`, is configured for the specific event, like `PRODUCT_CLICK`. Detailed steps:

1. Check the configuration is set up for new and changed components. Configuration for built-in components is provided by default.

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

For more details, see [API documentation](https://github.com/spryker-shop/traceable-event-widget/blob/master/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md).

2. Check the Event Selector. CSS selectors are provided by default. If you've changed selectors, update the configuration accordingly.

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

##### Issue: Incorrect event payload

You can view the event payload in the console under `Adapter Data:`. If the payload is incorrect, check the static and dynamic data configuration.

* Adjust static data in the `eventTracker` block as needed:

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

* Adjust the configuration for dynamic data for the needed triggers. For more information, see [API documentation](https://github.com/spryker-shop/traceable-event-widget/blob/master/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md).

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


> **User Data analytics**
>
> To enhance your experience, we use data and analytics to understand how you interact with our site.
> By accepting, you allow us to capture anonymous events for personalization, analysis, and continuous improvement of your experience on our platform.

### Verify the installation

1. Deploy to a testing environment.
2. In the Back Office, go to **Apps** and verify that Algolia is connected and configured.

{% info_block warningBox "Make sure" %}

If you previously had ACP Algolia App connected and used, you will need to disconnect and connect it again with the same Algolia credentials in the ACP App Catalog.
This action will update your Spryker shop config to be able to send events to Algolia.

{% endinfo_block %}

3. On the Storefront, do the following as a guest user:
  * Search products
  * Filter search results
  * From search results, go to a product page
  * Add products to cart
  * Place orders
4. Repeat step 3 as a logged-in user.  
5. In the [Algolia Dashboard](https://dashboard.algolia.com/), go to **Data Sources**>**Events** and open  from  section - `https://dashboard.algolia.com/apps/$APP_ID$/events/debugger`.
  Make sure the events you've triggered are displayed.


### Configure Algolia Features

When your indexes will have enough data (unique searches, events), you can check it in Analytics and Events Debugger tabs on Algolia Dashaboard.
Then you can start configuration of Personalization, Dynamic Re-Ranking and Query Categorization features (find Algolia docs and guides on their website).

**It's important** that you need to first create [A/B tests](https://academy.algolia.com/training/00f72f14-0713-11ef-b9fe-0617d5264223/overview) with new personalized configuration of your search ("A/B Testing" page in Algolia Dashboard).
It will allow you to see how new features influence your search conversion rate only for some limit audience of your site. When the results are good, you can change the settings globally in the indexes configuration, so it will work for all users.

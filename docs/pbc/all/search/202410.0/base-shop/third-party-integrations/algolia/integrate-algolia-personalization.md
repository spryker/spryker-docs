---
title: Integrate Algolia Personalization
description: Find out how you can enable Algolia personalization in your Spryker shop
last_updated: Nov 24, 2024
template: howto-guide-template
---

This document describes how to integrate Algolia Personalization. This integration also enables the following Algolia premium features:

- Dynamic Re-Ranking
- Query Categorization
- Search analytics
- Revenue analytics
- A/B Testing

{% info_block infoBox "Third-party frontends" %}

By default, Spryker supports Algolia Personalization only for Yves. To integrate Algolia Personalization with a third-party or mobile frontend, follow [Algolia Personalization for headless frontends](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/algolia-personalization-with-headless-frontends.html).

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

If the command doesn't work, try running it with the `--with-all-dependencies` flag.


2. Update Spryker packages:

```bash
composer update --with-dependencies spryker-shop/cart-page:^3.45.0 spryker-shop/catalog-page:^1.28.0 spryker-shop/checkout-page:^3.32.1 \
spryker-shop/home-page:^1.2.0 spryker-shop/payment-page:^1.5.0 spryker-shop/product-detail-page:^3.23.0 spryker-shop/product-group-widget:^1.10.1 \
spryker-shop/product-review-widget:^1.16.1 spryker-shop/product-set-detail-page:^1.11.0 spryker-shop/quick-order-page:^4.10.1 \
spryker-shop/shop-ui:^1.82.0
```

If the command doesn't work, try running it with the `--with-all-dependencies` flag.

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

## Test and configure Yves customizations to work with Algolia Personalization

If you customized Yves templates on the [project level](https://docs.spryker.com/docs/dg/dev/frontend-development/202410.0/yves/atomic-frontend/managing-components/overriding-components.html#create-component-folder-on-project-level) (`src/Pyz/Yves/`), some events may not trigger or trigger with incorrect data.

### Run the project in a testing environment

1. To be able to see event logs in the console, enable debug mode by setting `TraceableEventWidgetConfig::isDebugEnabled()` to `true`.  
2. Run the project locally or deploy to a testing environment.
3. Open the Storefront's home page.
4. In browser development console, go to settings.
5. Enable the "Preserve log" option.

### Check triggered events and their payload

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

For a full list of available events, see the [traceable-events-algolia readme file](https://github.com/spryker-shop/traceable-event-widget/blob/master/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-algolia/README.md).


### Common issues and solutions

This section common issues to event and solutions. Most solutions involve adding, changing, and fixing events on the [project level](https://docs.spryker.com/docs/dg/dev/frontend-development/202410.0/yves/atomic-frontend/managing-components/overriding-components.html#create-component-folder-on-project-level).

#### Prerequisites

1. Locate the page template or view that is used for the page with faulty events.
2. On the project level, override the `{% raw %}{% block eventTracker %}{% endraw %}` block in the template.

For details on the event configuration API, see the [traceable-events-orchestrator README](https://github.com/spryker-shop/traceable-event-widget/blob/master/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md).

#### Issue: Event not triggering on user action

If an event isn't firing, verify that the action, like `click` or `change`, is configured for the event, like `PRODUCT_CLICK`. Detailed steps:

1. Check the configuration is set up for new and changed components.

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

    {% raw %}{{ parent() }}{% endraw %}
{% raw %}{% endblock %}{% endraw %}
```

Configuration for built-in components is provided by default. For more details, see [API documentation](https://github.com/spryker-shop/traceable-event-widget/blob/master/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md).

2. Check the Event Selector. CSS selectors are provided by default. If you changed selectors, update the configuration accordingly:

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

    {% raw %}{{ parent() }}{% endraw %}
{% raw %}{% endblock %}{% endraw %}

```

#### Issue: Incorrect event payload

You can view event payload in the console under `Adapter Data:`. If payload is incorrect, check and adjust static and dynamic data configuration.

- Adjust static data in the `eventTracker` block:

```twig
{% raw %}{% block eventTracker %}{% endraw %}
    {% raw %}{% set events = {{% endraw %}
        list: events.list,
        data: events.data | merge({
          existing_key_to_override: New Data,
          new_key: New Data,
        }),
    } %}

    {% raw %}{{ parent() }}{% endraw %}
{% raw %}{% endblock %}{% endraw %}
```

- Adjust the configuration for dynamic data for the needed triggers.

<details>
  <summary>Dynamic data configuration example</summary>

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

</details>

For more information, see [API documentation](https://github.com/spryker-shop/traceable-event-widget/blob/master/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/components/molecules/traceable-events-orchestrator/README.md).


## Examples of integration into demo shops

For examples of Algolia Personalization integration into demo shops, see the following PRs:

- [B2C Demo Shop](https://github.com/spryker-shop/b2c-demo-shop/pull/595/files)
- [B2C Marketplace Demo Shop](https://github.com/spryker-shop/b2c-demo-marketplace/pull/474/files)
- [B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop/pull/542/files)
- [B2B Marketplace Demo Shop](https://github.com/spryker-shop/b2b-demo-marketplace/pull/490/files)



## Update privacy policy

With Algolia Personalization, user data is tracked and sent to Algolia. To ensure user privacy, you need to update your privacy policy and proactively collect users' consent for data tracking. The data consent popup can be similar to the following:

```Text
User Data analytics

To enhance your experience, we use data and analytics to understand how you interact with our site.
By accepting, you allow us to capture anonymous events for personalization, analysis, and continuous improvement of your experience on our platform.
```

### Disable user data tracking

If a user doesn't consent to data tracking, no user data should be sent from the application. To stop sending user action tracking events, set the `disableUserActionTracking` flag in the cookie to `true`.


## Verify the installation

1. Deploy to a testing environment.
2. In the Back Office, go to **Apps** and verify that Algolia is connected and configured.
3. If you've previously been using the Algolia App, in the Back Office, disconnect and connect it again with the same Algolia credentials.
  This action updates your project config to be able to send events to Algolia.

3. On the Storefront, do the following as a guest user:
- Search products
- Filter search results
- From search results, go to a product's page
- Add products to cart
- Place orders
4. Repeat step 3 as a logged-in user.  
5. In the [Algolia Dashboard](https://dashboard.algolia.com/users/sign_in), go to **Data Sources**>**Events**.
  Make sure the events you've triggered are displayed.


### Configure Algolia features

When your indexes have enough data, such as unique searches and events, you can start configuring [Personalization](https://www.algolia.com/doc/guides/personalization/ai-personalization/what-is-ai-personalization/), [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/), and [Query Categorization](https://www.algolia.com/doc/guides/algolia-ai/query-categorization/) features.


When updating the configuration of Algolia features, make sure to A/B test them before rolling out globally. A/B testing lets you test configuration and see how it affects conversion rates for a limited audience. For more details, see [A/B Testing](https://academy.algolia.com/training/00f72f14-0713-11ef-b9fe-0617d5264223/overview).

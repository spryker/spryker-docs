---
title: Configuration process flow of configurable products
last_updated: Jun 2, 2022
description: This document shows the configuration process of the configurable product.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202307.0/configurable-product-feature-walkthrough/configuration-process-flow-of-configurable-product.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/configurable-product-feature-overview/configuration-process-flow-of-configurable-product.html
  - /docs/pbc/all/product-information-management/202307.0/base-shop/configurable-product-feature-overview/configuration-process-flow-of-configurable-product.html
---

The configuration process of a configurable product consists of eight phases illustrated in the following flow chart:

![configuration-flow](https://confluence-connect.gliffy.net/embed/image/49194e23-84dc-4dc8-8ce2-29fa244522b3.png?utm_medium=live&utm_source=custom)

## Product configuration data flow on the product details page

When configuration starts on Yves, from the product details page (PDP), the product configuration data flow consists of the following phases.

### Phase 1

* A customer is on a PDP—the page with the product configuration.
* The product configuration can be a complete configuration or use an incomplete pre-configuration defined by the shop owner.
* The product configuration can be taken from two sources:
  - A session for complete configuration.
  - Storage (Redis) for the pre-configuration.

The following table shows the configuration data that is stored in the Session and Storage.

| PARAMETER | VALUE | COMMENTS  |
|---|---|---|
| `ProductConfigurationInstance.isComplete` | `true` or `false` | Sensitive data. |
| `ProductConfigurationInstance.displayData` | Some text of JSON blob—fore example, `["color"=>"red", "weight"=> 100]` |   |
| `ProductConfigurationInstance.configuratorKey` | `dateTime` |   |
| `ProductConfigurationInstance.configuration` |  `["color"=>"red", "weight"=> 100]` | Sensitive data. |

The framework generates a back URL that points to the gateway page with the following parameters:

| PARAMETER | VALUE | COMMENT |
|---|---|---|
| `sourceType` | `pdp`, `cart-page` | Defines the page type where the configurator request is started. Resolves the `backUrl`, when the configurator response is processed. |
| `SKU` | `some_sku` |   |
| `Quantity` | `2` |   |

The following table contains request parameters, which the plugin adds to the request:

| PARAMETER | VALUE |
|---|---|
| `idCustomer` | `DE-1` |
| `localeName` | `de_DE` |
| `storeName` | `DE` |
| `currencyCode` | `EUR` |
| `priceMode` | `NET_MODE` or `GROSS_MODE` |
| `backUrl` | `https://SOME_URL` |

### Phase 2

The customer clicks the configuration button, and the request is redirected to the gateway page with a given product configuration using a `GET` method.

### Phase 3

1. The configuration data is read from the session or storage for the given SKU.
2. A plugin that handles the request is selected based on the configurator type.
3. The plugin expands the request with additional necessary data:
  - store, locale, currency, customer, price mode.
  - `backUrl`—based on the referer header.
4. The plugin generates the URL that points to the configurator page together with all of the necessary data.

### Phase 4

1. The request comes from the gateway to the configurator `index.php`.
2. The configurator handles the request by creating a new session and saving the request's data there.
3. The configurator responds with a redirect URL that contains what session ID needs to be picked up.
4. The request comes from the gateway to the configurator `index.php` to pick up a session.
5. The response redirects the customer to the configurator page by a GET request using a secured connection.

### Phase 5

1. The customer is on the configurator page.
2. The configurator page is rendered based on the data in the session.
3. The customer does the configuration and submits the configuration form.
4. The configurator redirects the customer to the gateway page with configuration data.

| PARAMETER | VALUE                                                                                                                                        | COMMENT |
|---|----------------------------------------------------------------------------------------------------------------------------------------------|---|
| `ProductConfigurationInstance.prices` | `{% raw %}{{"EUR":{"GROSS_MODE":{"DEFAULT":30000}},{"NET_MODE":{"DEFAULT": 25000}},"priceData":{"volume_prices":[{"quantity": 5,"net_price": 28500,"gross_price": 29000}]}}{% endraw %}`                                                                                                        | Sensitive data. |
| `ProductConfigurationInstance.isComplete` | `true`                                                                                                                                       | Sensitive data. |
| `ProductConfigurationInstance.availableQuantity` | `2`                                                                                                                                          |   |
| `ProductConfigurationInstance.displayData` | Some text of JSON blob—for example, `{"color"=>"red", "weight"=> 100}`                                                                       |   |
| `ProductConfigurationInstance.configuration` | `{"color"=>"red", "weight"=> 100}`                                                                                                           | Sensitive data. |
| `idCustomer` | `DE-1`                                                                                                                                       |   |
| sourceType | SOURCE_TYPE_PDP, SOURCE_TYPE_CART, SOURCE_TYPE_WISHLIST_DETAIL, …                                                                            |   |
| `SKU`  | `some_sku`                                                                                                                                   |   |
| `timestamp` | `1231313123123`                                                                                                                              |   |
| `CheckSum` | It's an encrypted value of the `CheckSum`. It must be based on the all requested parameters and must have the same order for decryption. |   |

### Phase 6

1. The customer finishes the configuration and clicks a button that creates an AJAX POST request with the data to the configurator page (self).
2. In the backend, the response is prepared according to the public data API from the configurator to Spryker.
3. In the backend, a `CheckSum` is prepared based on the response data, which is encrypted with a shared key and returns these as the AJAX response.
4. On the configurator page, the framework puts data to a hidden form and submits the form, which points to the gateway page.
5. After the successful configuration, the customer is redirected to the configurator gateway with a configuration response.
6. The gateway URL does not equal the back URL; it's a fixed, known URL.

### Phase 7

1. The gateway page receives data.
2. The data is checked through the execution of the validator plugins stack for received data.
  - If validation is not successful, the request is redirected to the `backUrl` without saving the configuration. A warning message is displayed.
  - If the validation part is successful, the configuration is saved to the session.
3. All applicable plugins that can handle the configurator response are executed. A plugin that applies to the PDP source type resolves the back URL according to the response data.

### Phase 8

The customer is redirected back to the PDP.

## Product configuration data flow on the Cart page

When configuration starts on Yves, from the **Cart** page, the product configuration data flow consists of the following phases:

### Phase 1

* The customer is on the **Cart** page—the page with items that contains the product configuration.
* The product configuration can be already complete or not.
* The item product configuration can be taken from one source only: Quote.
* The framework generates the URL that points to the gateway page with the following parameters.

| PARAMETER                                      | VALUE | COMMENT |
|------------------------------------------------|---|---|
| `ProductConfigurationInstance.displayData`     | Some text of JSON blob—for example, `["color"=>"red", "weight"=> 100]` |   |
| `ProductConfigurationInstance.configuration`   |  `["color"=>"red", "weight"=> 100]` | Sensitive data. |
| `ProductConfigurationInstance.configuratorKey` | `dateTime` |   |
| `ProductConfigurationInstance.isComplete`      | `true` or `false` | Sensitive data. |
| `backUrl`                                      | `https://some.url` | Sensitive data. |
| `SubmitUrl`                                    | `https://some.url` | Sensitive data. |
| sourceType                                     | SOURCE_TYPE_PDP, SOURCE_TYPE_CART, SOURCE_TYPE_WISHLIST_DETAIL, …                                        |   |
| `SKU`                                          | `some_sku` |   |
| `Quantity`                                     | `2` |   |
| `ItemGroupKey`                                 | `some_key` |   |

### Phase 2

1. The customer clicks the configuration button.
2. The form request is redirected to the gateway page with a given product configuration using the `GET` method.

### Phase 3

1. The configuration data is read from the quote for the given `ItemGroupKey` and `SKU`.
2. A plugin that handles the request is selected based on the configurator type.
3. The plugin expands the request with additional necessary data:
  - store, locale, currency, customer, price mode.
  - `CheckSum`—calculates the CRC32 polynomial of a request data as a string.
  - `timestamp`—the timestamp when the request is created.
  - `backUrl`—based on the `Referer` header.
4. The plugin generates the URL that points to the configurator page together with all the necessary data.

### Phase 4

Redirects the customer to the configurator page using the GET request.

### Phase 5

1. The customer is on the configurator page.
2. The customer does the configuration.
3. Submits the configuration form.
4. The configurator has to redirect to the gateway page with configuration data.

| PARAMETER | VALUE                                                                  | COMMENT |
|---|------------------------------------------------------------------------|---|
| `ProductConfigurationInstance.prices` | `{% raw %}{"EUR":{"GROSS_MODE":{"DEFAULT":30000}},{"NET_MODE":{"DEFAULT": 25000}},"priceData":{"volume_prices":[{"quantity": 5,"net_price": 28500,"gross_price": 29000}]}}{% endraw %}`                                                              | Sensitive data. |
| `ProductConfigurationInstance.isComplete` | `1`                                                                    | Sensitive data. |
| `ProductConfigurationInstance.availableQuantity` | `2`                                                                    |   |
| `ProductConfigurationInstance.displayData` | Some text of JSON blob—for example, `["color"=>"red", "weight"=> 100]` |   |
| `ProductConfigurationInstance.configuration` | `"date"=>"23.07.2020", "time"=>"18:45" 4]`                             | Sensitive data. |
| `ProductConfigurationInstance.timestamp` | `10312313135234`                                                       | Sensitive data, a certain configuration must be valid only a certain amount of the time given. |
| `sourceType` | `SOURCE_TYPE_PDP`, `SOURCE_TYPE_CART`, `SOURCE_TYPE_WISHLIST_DETAIL`, …                                        |   |
| `SKU`  | `some_sku`                                                             |   |
| itemGroupKey | `some_group_key`                                                         |   |

### Phase 6

1. After the successful configuration, the customer is redirected to the configurator gateway with a configuration response.
2. The gateway URL is not the same as the back URL; it's a fixed known URL.

### Phase 7

1. The gateway page receives data.
2. The data is checked through the execution of the validator plugins stack for received data.
  - If validation is not successful, the request is redirected to `backUrl` without saving the configuration. A warning message is displayed.
  - If validation is successful, the framework updates the cart item configuration in the cart.
3. All applicable plugins that can handle the configurator response are executed. A plugin that applies to the cart page source type resolves the back URL according to the response data.

### Phase 8

1. The customer is redirected back to the **Cart** page.

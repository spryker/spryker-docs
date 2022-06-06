---
title: Configurable Product flow chart
last_updated: Jun 2, 2022
description:
template: concept-topic-template
---

This document describes the flow chart that demonstrates the configuration process of the configurable product.

## Flow chart

The following flow chart represents the configuration process flow of the configurable product:

![configuration-flow](https://confluence-connect.gliffy.net/embed/image/49194e23-84dc-4dc8-8ce2-29fa244522b3.png?utm_medium=live&utm_source=custom)

## Product configuration data flow on the product details page

When configuration starts on Yves, from the product details page (PDP), the product configuration data flow consists of the following phases.

### Phase 1

- A customer is on a PDP—the page with the product configuration.
- The product configuration can be already complete or use not complete pre-configuration defined by the shop owner.
- The product configuration can be taken from two sources:
  - A session for complete configuration.
  - Storage (Redis) for the pre-configuration.

The following table shows the configuration data that is stored in the Session and Storage.

| PARAMETER | VALUE | COMMENTS  |
|---|---|---|
| `ProductConfigurationInstance.isComplete` | `true` or `false` | Sensitive data. |
| `ProductConfigurationInstance.displayDescription` | Some text of JSON blob—fore example, `["color"=>"red", "weight"=> 100]` |   |
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
4. The plugin generates the URL that points to the configurator page together with all the necessary data.

### Phase 4

1. The request comes from the gateway to the configurator `index.php` (phase 4.1).
2. The configurator handles the request by creating a new session and saving the request's data there (phase 4.2).
3. The configurator responds with a redirect URL that contains what session ID needs to be picked up (phase 4.2).
4. The request comes from the gateway to the configurator `index.php` to pick up a session (phase 4.3).
5. The response redirects the customer to the configurator page by a GET request using a secured connection.

### Phase 5

1. You are on the configurator page.
2. The configurator page is rendered based on the data in the session.
3. The customer does the configuration.
4. Submits the configuration form.
5. The configurator redirects the customer to the gateway page with configuration data.

| PARAMETER | VALUE | COMMENT |
|---|---|---|
| `ProductConfigurationInstance.price` | `123` | Sensitive data. |
| `ProductConfigurationInstance.isComplete` | `true` | Sensitive data. |
| `ProductConfigurationInstance.availableQuantity` | `2` |   |
| `ProductConfigurationInstance.displayDescription` | Some text of JSON blob—for example, `{"color"=>"red", "weight"=> 100}` |   |
| `ProductConfigurationInstance.configuration` | `{"color"=>"red", "weight"=> 100}`   | Sensitive data. |
| `idCustomer` | `DE-1` |   |
| `sourceType` | `pdp`, `cart-page` |   |
| `SKU`  | `some_sku` |   |
| `timestamp` | `1231313123123` |   |
| `CheckSum` | It’s an encrypted value of the `CheckSum`. It should be based on the all requested parameters and should have the same order for decryption. |   |

### Phase 6

1. The customer finishes the configuration and clicks a button which creates an AJAX POST request with the data to the configurator page (self).
2. In the backend, the response is prepared according to the public data API from the configurator to Spryker.
3. In the backend, a `CheckSum` is prepared based on the response data, which is encrypted with a shared key and returns these as the AJAX response.
4. The data is put to a hidden form on the configurator page and submit the form that points to the gateway page.
5. After the successful configuration, the customer is redirected to the configurator gateway with a configuration response.
6. The gateway URL does not equal to the back URL; it’s a fixed, known URL.

### Phase 7

1. The gateway page receives data.
2. The data is checked through the execution of the validator plugins stack for received data.
  - If validation is not successful, the request is redirected to the `backUrl` without saving the of the configuration with a warning message.
  - If the validation part is successful, the configuration is saved to the session.
3. All applicable plugins that can handle the configurator response are executed. A plugin that applies to the PDP source type resolves the back URL according to the response data.

### Phase 8

The customer is redirected back to a PDP—page.

## Product configuration data flow on the Cart page

When configuration starts on Yves, from the Cart page, the product configuration data flow consists of the following phases:

### Phase 1

- The customer is on the Cart page—the page with items that contains the product configuration.
- The product configuration can be already complete or not.
- The item product configuration can be taken from one source only: Quote.
- The generate the URL that points to the gateway page with the following parameters.

| PARAMETER | VALUE | COMMENT |
|---|---|---|
| `ProductConfigurationInstance.displayDescription` | Some text of JSON blob—fore example, `["color"=>"red", "weight"=> 100]` |   |
| `ProductConfigurationInstance.configuration` |  `["color"=>"red", "weight"=> 100]` | Sensitive data. |
| `ProductConfigurationInstance.configuratorKey` | `dateTime` |   |
| `ProductConfigurationInstance.isComplete` | `true` or `false` | Sensitive data. |
| `backUrl` | `https://some.url` | Sensitive data. |
| `sourceType` | `pdp`, `cart-page` |   |
| `SKU` | `some_sku` |   |
| `Quantity` | `2` |   |
| `ItemGroupKey` | `some_key` |   |

### Phase 2

1. The customer clicks the configuration button,
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

1. We are on the configurator page.
2. The customer does the configuration.
3. Submits the configuration form.
4. The configurator has to redirect to the gateway page with configuration data.

| PARAMETER | VALUE | COMMENT |
|---|---|---|
| `ProductConfigurationInstance.price` | `2123123` | Sensitive data. |
| `ProductConfigurationInstance.isComplete` | `1` | Sensitive data. |
| `ProductConfigurationInstance.availableQuantity` | `2` |   |
| `ProductConfigurationInstance.displayDescription` | Some text of JSON blob—for example, `["color"=>"red", "weight"=> 100]` |   |
| `ProductConfigurationInstance.configuration` |  `"date"=>"23.07.2020", "time"=>"18:45" 4]`   | Sensitive data. |
| `ProductConfigurationInstance.timestamp` | `10312313135234` | Sensitive data, a certain configuration should be valid only a certain amount of the time given. |
| sourceType | pdp, cart-page, … |   |
| SKU  | `some_sku` |   |
| itemGroupKey | some_group_key |   |

### Phase 6

* After the successful configuration, the customer is redirected to the configurator gateway with a configuration response.
* The gateway URL does not equal to the back URL; it’s a fixed known URL.

### Phase 7

1. The gateway page receives data.
2. The data is checked through the execution of the validator plugins stack for received data.
  - If validation is not successful, the request is redirected to the `backUrl` without saving the of the configuration with a warning message.
  - If validation is successful, then updates the cart item configuration in the cart.
4. All applicable plugins that can handle the configurator response are executed. A plugin that applies to the cart page source type resolves the back URL according to the response data.

### Phase 8

The customer is redirected back to the **Cart** page.

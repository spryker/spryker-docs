---
title: Implementing ERP Integration
description: Easy starting point for projects to connect to ERP systems.
last_updated: Feb 19, 2026
template: default
layout: custom_new
---

## Introduction

This document provides a comprehensive development plan for connecting Spryker projects to ERP systems using the ERP Integration Template.

## Overview

In order to connect a project to an ERP system faster, we provide a template module structure for implementing third party calls.

We recommend implementing one ERP Client for each ERP system.

## General approach

Template can be downloaded from the community package [ERP Integration](https://github.com/spryker-community/erp-integration).

This template provides a foundation with essential components already wired together, allowing you to focus on business logic implementation rather than application architecture.
It's not intended to be used as a composer dependency, thus composer.json file is not a part of this repository. It has no special requirements for packages, since it requires Guzzle, Kernel and Transfer modules, which are a part of every Spryker project.

Overall the implementation process looks like this:
1. Configure ERP connection.
2. Validate logging and error handling.
3. Implement requests:
    1. Prepare a request model
    2. Prepare a request and response mapping models
    3. Wire models into Factory and Client
4. Call created Client method from the business logic.

## Getting Started with the ERP Integration Template

To begin working with the ERP integration template in your project:

1. **Copy the template module** from `\Pyz\Zed\ErpIntegration` to your project.
2. **Replace the name and namespace** to match your project naming conventions.
3. **Update configuration** in your `config_default-erp.php` with your ERP system credentials and endpoints.
4. **Implement requests** for the specific operations your project requires.

### Template Module Structure Overview

The template follows Spryker architecture patterns and can be refactored to match your project's specific coding standards.

- config
  - Shared
    - **config_default-erp.php** - connection configuration.
- src
  - Pyz
    - Client
      - ErpIntegration
        - Models
          - **BaseRequest.php** - base module, providing essentials for each specific request model.
            - **[Name]Request.php** + **[Name]RequestMapper.php** - models for each type of request.
            - **ErpIntegrationClient.php** - Spryker Client entry point
    - Shared
      - ErpIntegration
        - **erp_integration.transfer.xml** - request/response transfer objects definition.
    - Yves - contains blueprint usage of the Client methods.
    - Zed - contains blueprint usage of the Client methods.

### Prepare the Module Structure

First, decide how to name your new module with an ERP integration. This document uses name `ErpIntegration`.

{% info_block infoBox %}

If you plan to develop a reusable standalone module, follow [How to Create standalone modules](/docs/dg/dev/developing-standalone-modules/create-standalone-modules.html).

{% endinfo_block %}

Next, copy the full content of Client and Shared into the module's folder, adjusting namespace if you don't use Pyz.
Review all added classes to ensure the code follows your project's coding guidelines, including naming conventions, visibility modifiers, and documentation standards.

Then copy the provided configuration **config_default-erp.php** into `config/Shared` and add to the very end of **config/Shared/config_default.php**:

```php
require 'config_default-erp.php';
```

Repeat this procedure for each environment, using the corresponding to that environment file.

### Configure ERP Connection

The class `src/Pyz/Client/ErpIntegration/Models/BaseRequest` provides a request builder, logging and handling of failed responses. You have to adjust the following places:

- `BaseRequest::DEFAULT_REQUEST_TIMEOUT_SECONDS` - with the default timeout for requests.
- `BaseRequest::getRequestOptions` - request parameters, including authentication, referrer. See [Guzzle documentation](https://docs.guzzlephp.org/en/stable/request-options.html) for a full list of options.
- `BaseRequest::buildRequestHeaders` - request headers, like content type, accept, and anything ERP system party specific.

Following Spryker best practices, configuration happens in `config_default-erp.php`, including environment-specific files:

```php
$config[ErpIntegrationConstants::BASE_URI] = getenv('ERP_BASE_URI');
$config[ErpIntegrationConstants::EXAMPLE_REQUEST_URL] = '/example-request/';
```

If your integration has fixed URLs, consider putting them directly into the ErpIntegrationConfig class.

In most cases, Preproduction and Production ERP systems have different setup, and this has to be reflected in the definition of the environment variable **ERP_BASE_URI** in the Parameter Store. Follow [this guideline](/docs/ca/dev/add-variables-in-the-parameter-store.html) to define environment-specific variables for your project.

If the connection requires authentication, make sure to put credentials into environment variables as well.

In case of a special connection setup for [Guzzle client configuration](https://docs.guzzlephp.org/en/5.3/clients.html), apply it to `ErpIntegrationDependencyProvider::addGuzzleClient`.

### Validate Logging and Error Handling

The template provides detailed logging in each case following Spryker best practices:

- `BaseRequest::handleFailedConnectionResponse` - when connection failed, usually due to timeout or server error. Request is logged at error level.
- `BaseRequest::handleGenericRequestFailureResponse` - any non-connection related failure. Request is logged at error level.
- `BaseRequest::createFailedResponse` - provides a template for generating the failed response, including the message from the exception.
- `BaseRequest::logRequest` - logging request at info level.
- `BaseRequest::logResponse` - logging response at info level.

### Example Implementation Pattern

When implementing an ERP integration, follow this pattern for each request:

1. **Define Transfer objects** that represent request and response
2. **Create a Request model** that encapsulates the data your ERP system needs.
3. **Implement Request and Response Mapping** that transforms your domain model into the ERP request format and vice versa.
4. **Add a Client method** that makes the request.
5. **Connect to your business logic** (plugins, facades, console commands) using the Client method.

#### 1. Define Transfer Objects

Each request requires specialized transfer objects for request and response. Edit `src/Pyz/Shared/ErpIntegration/Transfer/erp_integration.transfer.xml`:

```xml
<transfer name="ExampleRequest" strict="true">
</transfer>

<transfer name="ExampleResponse" strict="true">
    <property name="isSuccessful" type="bool" />
    <property name="messages" type="string[]" singular="message" />
</transfer>
```

Execute `vendor/bin/console transfer:generate` to generate new transfer PHP classes.

#### 2. Create a Request model

Start with a copy of model `src/Pyz/Client/ErpIntegration/Models/ExampleRequest`, which doesn't require an interface since it contains a single method without a reason for extension.

Once the model is prepared, adjust the factory by creating the method `ErpIntegrationFactory::createExampleRequest`. Skip if using DI.

Adjust the name of the request method `doRequest`, if necessary. Simultaneously, create a client method to call it - `ErpIntegrationClient::doExampleRequest`.

If your system doesn't require a POST call, change the method called on guzzleClient.

#### 3. Implement Request and Response Mapping

Create a copy of `src/Pyz/Client/ErpIntegration/Models/ExampleRequestMapper` and adjust:

- `mapTransferToRequestString` - to map request transfer object onto the 3rd party service request format.
- `mapResponseToResponseTransfer` - to map 3rd party service response format onto response transfer object.

#### 4. Add a Client method

First, update Factory and introduce model and mapper instantiation, follow methods `createExampleRequest` and `createExampleRequestMapper` as example.

Then add a client method, follow method `doExampleRequest` as example.

#### 5. Connect to your business logic

You can call this client method from Glue, Yves or Zed application.

## Integrating ERP calls into Business logic

Based on our experience, we collected a set of the most common places to integrate a call to ERP system.

### Provide live product prices into the cart

Implement a plugin interface `\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface` and add your plugin into `\Spryker\Zed\Cart\CartDependencyProvider::getExpanderPlugins` .
See example implementation here: `\Pyz\Zed\ErpIntegration\Communication\Plugin\Cart\ErpCartItemExpanderPlugin`.

### Provide live availability check in cart

Implement a plugin interface `\Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface` and add your plugin into `\Spryker\Zed\Cart\CartDependencyProvider::getCartPreCheckPlugins` .

See example implementation here: `\Pyz\Zed\ErpIntegration\Communication\Plugin\Cart\ErpCartValidationPlugin`.

### Live shipment method data

General documentation can be found here - [Shipment method plugins](/docs/pbc/all/carrier-management/latest/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html).

For price, implement a plugin interface `\Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodPricePluginInterface` and add your plugin into  `\Spryker\Zed\Shipment\ShipmentDependencyProvider::getPricePlugins`.

See example implementation here: `\Pyz\Zed\ErpIntegration\Communication\Plugin\Shipment\ErpShipmentMethodPricePlugin`.

For availability, implement a plugin interface `\Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodAvailabilityPluginInterface` and add your plugin into `\Spryker\Zed\Shipment\ShipmentDependencyProvider::getAvailabilityPlugins`.

See example implementation here: `\Pyz\Zed\ErpIntegration\Communication\Plugin\Shipment\ErpShipmentMethodAvailabilityPlugin`.

For delivery time, implement a plugin interface `\Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodDeliveryTimePluginInterface` and add your plugin into `\Spryker\Zed\Shipment\ShipmentDependencyProvider::getDeliveryTimePlugins`.

See example implementation here: `\Pyz\Zed\ErpIntegration\Communication\Plugin\Shipment\ErpShipmentMethodDeliveryTimePlugin`.

### Monitor connection status, aka Health check

Implement a plugin interface `\Spryker\Shared\HealthCheckExtension\Dependency\Plugin\HealthCheckPluginInterface` and add your plugin into `\Spryker\Yves\HealthCheck\HealthCheckDependencyProvider::getHealthCheckPlugins`.

See example implementation here: `\Pyz\Zed\ErpIntegration\Communication\Plugin\HealthCheck\ErpHealthCheckPlugin`.

We recommend calling the fastest resource your ERP system can provide.

Consult with [integration of health checks](/docs/dg/dev/integrate-and-configure/integrate-health-checks.html) documentation.

### Validation of the whole cart

Implement a plugin interface `\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface` and add your plugin into `\Pyz\Zed\Checkout\CheckoutDependencyProvider::getCheckoutPreConditions`.

See example implementation here: `\Pyz\Zed\ErpIntegration\Communication\Plugin\Checkout\ErpCheckoutPreConditionPlugin`.

### Communication with ERP related to the placed order

Spryker provides a variety of plugin stacks to use during order placement.

We highly discourage including in any of them an ERP calls, since it slows down order placement.

When you need to make an ERP call related to the order, put it into the OMS command.

Implement a plugin interface `\Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface` and add your plugin into `\Spryker\Zed\Oms\OmsDependencyProvider::getCommandPlugins`.

See example implementation here: `\Pyz\Zed\ErpIntegration\Communication\Plugin\Oms\Command\ErpOrderExportCommandByOrderPlugin`.

### Providing a webhook for ERP system

Implement a [BackendAPI resource](/docs/integrations/spryker-glue-api/backend-api/developing-apis/create-backend-resources.html) and call required Client method inside it.


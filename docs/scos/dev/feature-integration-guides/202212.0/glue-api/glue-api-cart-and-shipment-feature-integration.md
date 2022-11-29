---
title: Glue API - Cart + Shipment feature integration.
description: Carts API + Shipment features allows to get carts functionality with shipments including counting cart totals accounting shipment costs. The guide describes how to integrate this feature set into your project.
last_updated: Nov 29, 2022
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2022120/docs/glue-api-cart-and--shipment-feature-integration
---

This document describes how to integrate the Glue API - Cart + Shipment features into a Spryker project.

## Install feature API
## Prerequisites

To start feature integration, overview and install the following features and Glue APIs:

| NAME               | VERSION          | INTEGRATION GUIDE |
|--------------------|------------------|-------------------|
| Glue API: Shipment | {{page.version}} |                   |
| Glue API: Cart     | {{page.version}} |                   |


## 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/carts-rest-api:"^5.22.0" --update-with-dependencies
composer require spryker/shipments-rest-api:"^1.6.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

| MODULE            | EXPECTED DIRECTORY                          |
|-------------------|---------------------------------------------|
| CartsRestApi      | vendor/spryker/carts-rest-api               |
| ShipmentsRestApi  | vendor/spryker/shipments-rest-api-extension |

{% endinfo_block %}


## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate 
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in transfer objects:

| TRANSFER                                               | TYPE     | EVENT   | PATH                                                    |
|--------------------------------------------------------|----------|---------|---------------------------------------------------------|
| RestCartsTotalsTransfer                                | class    | created | src/Generated/Shared/Transfer/RestCartsTotalsTransfer   |
| RestCartsTotalsTransfer.shipmentTotal                  | property | created | src/Generated/Shared/Transfer/RestCartsTotalsTransfer   |

{% endinfo_block %}

## 3) Set up behavior

Enable the following plugins:

| PLUGIN                                                | SPECIFICATION                                                                                                          | PREREQUISITES | NAMESPACE                                        |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------|
| CartByRestCheckoutDataResourceRelationshipPlugin      | Adds `carts` resource as relationship by `RestCheckoutDataTransfer.quote`. Applies only for registered customers.      |               | Spryker\Glue\CartsRestApi\Plugin\GlueApplication |
| GuestCartByRestCheckoutDataResourceRelationshipPlugin | Adds `guest-carts` resource as the relationship by `RestCheckoutDataTransfer.quote`. Applies only for guest customers. |               | Spryker\Glue\CartsRestApi\Plugin\GlueApplication |
 

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CartsRestApi\Plugin\GlueApplication\CartByRestCheckoutDataResourceRelationshipPlugin;
use Spryker\Glue\CartsRestApi\Plugin\GlueApplication\GuestCartByRestCheckoutDataResourceRelationshipPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
     /**
      * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
      *
      * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
      */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface
    {
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new CartByRestCheckoutDataResourceRelationshipPlugin(),
        );
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new GuestCartByRestCheckoutDataResourceRelationshipPlugin(),
        );
        
        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

To ensure that `CartByRestCheckoutDataResourceRelationshipPlugin` is set up correctly:
1) Send a request with an authorization token to a `checkout-data` endpoint with `carts` relation. For example, send the `POST https://glue.mysprykershop.com/checkout-data?include=carts` request with the request body:

```json
{"data":
    {"type": "checkout-data",
      "attributes":
      {
        "idCart": "_cart_id",
        "shipment": {
          "idShipmentMethod": 1
        }
      }
    }
}
```

2) Check that the cart data will be returned as a relationship and contains `shipmentTotal` in cart totals:

```json
{
  "data": {
    "type": "checkout-data",
     ...
    },
    ...
    "relationships": {
      "carts": {
        "data": [
          {
            "type": "carts",
            "id": "_cart_id"
          }
        ]
      }
    }
  },
  "included": [
    {
      "type": "carts",
      "id": "_cart_id",
      "attributes": {
        ...
        "totals": {
        ...
          "shipmentTotal": ...
        }
      }
    }
  ]
}
```

{% endinfo_block %}

To ensure that `GuestCartByRestCheckoutDataResourceRelationshipPlugin` is set up correctly:
1) Send a request with an anonymous customer ID to a `checkout-data` endpoint with `guest-carts` relation. For example, send the `POST https://glue.mysprykershop.com/checkout-data?include=guest-carts` request with the request body:

```json
{"data":
    {"type": "checkout-data",
      "attributes":
      {
        "idCart": "_cart_id",
        "shipment": {
          "idShipmentMethod": 1
        }
      }
    }
}
```

2) Check that the guest cart data will be returned as a relationship and contains `shipmentTotal` in cart totals:

```json
{
  "data": {
    "type": "checkout-data",
     ...
    },
    ...
    "relationships": {
      "carts": {
        "data": [
          {
            "type": "carts",
            "id": "_cart_id"
          }
        ]
      }
    }
  },
  "included": [
    {
      "type": "carts",
      "id": "_cart_id",
      "attributes": {
        ...
        "totals": {
        ...
          "shipmentTotal": ...
        }
      }
    }
  ]
}
```

{% endinfo_block %}
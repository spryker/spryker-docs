---
title: Adding products to cart
description: Learn how to add different types of products to cart using Storefront API, including configurable products, products with options, merchant products, and product offers.
last_updated: September 25, 2025
template: default
---

The Storefront API provides comprehensive support for adding various types of products to shopping carts. This document covers the different product types and their specific requirements when adding them to a cart via the `/carts/{cartId}/items` endpoint.

## Prerequisites

Before adding products to cart, ensure you have:

1. Authentication token: Obtain a customer access token via `/access-tokens` endpoint (for customer carts)
2. Cart ID: Create a cart using `/carts` endpoint or use an existing cart
3. Product information: Know the product SKU and any additional attributes required for the specific product type

### Guest Cart Support

All product types described in this document can also be added to guest carts using the `/guest-carts/{guestCartId}/guest-cart-items` endpoint. Guest carts do not require authentication and follow the same request structure as authenticated carts. The main differences are:

- No authentication token required
- Use guest cart ID instead of regular cart ID
- Guest cart endpoints: `/guest-carts/{guestCartId}/guest-cart-items`

## Basic Cart Item Structure

All cart item requests follow this basic structure:

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "product-sku",
            "quantity": 1
            // Additional attributes based on product type
        }
    }
}
```

## Product Types

### Standard Products

For basic concrete products without special configurations:

Request:

```http
POST /carts/{cartId}/items
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

Body:

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "123_456789",
            "quantity": 2
        }
    }
}
```

### Configurable Products

Configurable products require additional configuration data through the `productConfigurationInstance` attribute.

Request:

```http
POST /carts/{cartId}/items?include=items
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

Body:

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "configurable-product-sku",
            "quantity": 3,
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\":\"Afternoon\",\"Date\":\"09.09.2050\"}",
                "configuration": "{\"time_of_day\":\"4\"}",
                "configuratorKey": "DATE_TIME_CONFIGURATOR",
                "isComplete": true,
                "quantity": 3,
                "availableQuantity": 4,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": 23434,
                        "grossAmount": 42502,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "netAmount": 150,
                                "grossAmount": 165,
                                "quantity": 5
                            }
                        ]
                    }
                ]
            }
        }
    }
}
```

### Products with Random Weight/Measurement Units

These products use sales units and measurement units for quantity specification.

Request:

```http
POST /carts/{cartId}/items?include=items,sales-units,product-measurement-units
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

Body:

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "random-weight-product-sku",
            "quantity": 1,
            "salesUnit": {
                "id": "sales-unit-id",
                "amount": 10
            }
        }
    }
}
```

### Products with Options

Products that have selectable options require the `productOptions` array.

Request:

```http
POST /carts/{cartId}/items?include=items
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

Body:

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "product-with-options-sku",
            "quantity": 1,
            "productOptions": [
                {
                    "sku": "option-1-sku"
                },
                {
                    "sku": "option-2-sku"
                }
            ]
        }
    }
}
```

### Merchant Products

For marketplace scenarios where products are sold by specific merchants.

Request:

```http
POST /carts/{cartId}/items
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

Body:

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "merchant-product-sku",
            "quantity": 70,
            "merchantReference": "merchant-spryker-id"
        }
    }
}
```

### Product Offers

Product offers are marketplace-specific variants of products with special pricing or conditions. The offer must belong to the referenced SKU.

Request:

```http
POST /carts/{cartId}/items
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

Body:

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "005_30663301",
            "quantity": 2,
            "productOfferReference": "offer53"
        }
    }
}
```

## Response Structure

Successful requests return a `201 Created` status with cart information:

```json
{
    "data": {
        "type": "carts",
        "id": "cart-id",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 1000,
                "taxTotal": 1500,
                "subtotal": 10000,
                "grandTotal": 10500,
                "priceToPay": 10500
            }
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "item-id"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "items",
            "id": "item-id",
            "attributes": {
                "sku": "product-sku",
                "quantity": 1,
                "calculations": {
                    "unitPrice": 5000,
                    "sumPrice": 5000
                }
            }
        }
    ]
}
```

## Common Include Parameters

Use these include parameters to get additional data in the response:

### Basic Includes
- `items`: Cart items details
- `concrete-products`: Product information
- `sales-units`: Sales unit details (for measurement products)
- `product-measurement-units`: Measurement unit information
- `product-options`: Product option details

### Advanced Includes
- `product-offers`: Product offer information (requires two-step include: `items,concrete-products,product-offers`)
- `merchants`: Merchant details for marketplace products
- `product-offer-prices`: Pricing information for product offers
- `product-offer-availabilities`: Availability data for product offers
- `configurable-bundle-templates`: Template information for configurable bundles
- `bundled-products`: Information about products within bundles

### Configurable Products
For configurable products, the configuration data is included directly in the item attributes as `productConfigurationInstance`. No additional include parameter is needed for the configuration itself, but you can include:
- `concrete-products`: To get base product information
- `product-configuration-instances`: For detailed configuration metadata (if available)

### Example with Multiple Includes

```http
POST /carts/{cartId}/items?include=items,concrete-products,product-offers,merchants
```

This will return cart items with detailed product information, offer details, and merchant data in the `included` section of the response.
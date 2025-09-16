---
title: Batch processing and performance optimization with Data Exchange API
description: Learn how to optimize performance by sending data in batches and using complex endpoints with the Spryker Data Exchange API.
last_updated: September 15, 2025
template: howto-guide-template
redirect_from: null
---

This document explains how to optimize performance when working with the Data Exchange API by using batch processing and complex endpoints for efficient data operations.

## Overview

When using the Data Exchange API with basic single-entity operations (one request per entity), processing can be time-consuming for large datasets. To improve performance, you can:

1. **Send data in batches**: Process multiple entities in a single request
2. **Use complex endpoints**: Update multiple related tables with one request

These optimization techniques significantly reduce processing time and improve overall system performance.

## Batch Processing

### Basic vs Batch Operations

**Basic operation** (inefficient for large datasets):
- One request per entity
- Higher network overhead
- Slower processing times

**Batch operation** (recommended):
- Multiple entities per request
- Reduced network overhead
- Faster processing times

### Sending Data in Batches

To send data in batches, include multiple objects in the `data` array of your request:

```json
{
    "data": [
        {
            // First entity data
        },
        {
            // Second entity data
        },
        {
            // Additional entities...
        }
    ]
}
```

## Complex Endpoints

Complex endpoints allow you to update data across multiple related tables in a single request. This is particularly useful for creating or updating entities with nested relationships.

For configuration details, see [Configure Data Exchange API endpoints](/docs/integrations/spryker-glue-api/backend-api/data-exchange-api/configure-data-exchange-api.html).

### Product Creation Example

The following example demonstrates creating a product with all related data using a complex endpoint:

**Endpoint**: `POST http://glue-backend.eu.spryker.local/dynamic-entity/product-abstracts`

**Request Body**:

```json
{
    "data": [
        {
            "fk_tax_set": "{TAX_SET_ID}",
            "approval_status": "{APPROVAL_STATUS}",
            "attributes": "{PRODUCT_ATTRIBUTES_JSON}",
            "new_to": "{NEW_TO_DATE}",
            "sku": "{PRODUCT_ABSTRACT_SKU}",
            "color_code": "{COLOR_CODE}",
            "productAbstractProducts": [
                {
                    "attributes": "{CONCRETE_PRODUCT_ATTRIBUTES}",
                    "is_active": true,
                    "is_quantity_splittable": true,
                    "sku": "{CONCRETE_PRODUCT_SKU}",
                    "productSearch": [
                        {
                            "fk_locale": "{LOCALE_ID_1}",
                            "is_searchable": true
                        },
                        {
                            "fk_locale": "{LOCALE_ID_2}",
                            "is_searchable": true
                        }
                    ],
                    "productStocks": [
                        {
                            "fk_stock": "{STOCK_ID}",
                            "is_never_out_of_stock": true,
                            "quantity": "{STOCK_QUANTITY}"
                        }
                    ],
                    "productLocalizedAttributes": [
                        {
                            "fk_locale": "{LOCALE_ID_1}",
                            "attributes": "{LOCALIZED_ATTRIBUTES_1}",
                            "description": "{PRODUCT_DESCRIPTION_1}",
                            "name": "{PRODUCT_NAME_1}"
                        },
                        {
                            "fk_locale": "{LOCALE_ID_2}",
                            "attributes": "{LOCALIZED_ATTRIBUTES_2}",
                            "description": "{PRODUCT_DESCRIPTION_2}",
                            "name": "{PRODUCT_NAME_2}"
                        }
                    ]
                }
            ],
            "productAbstractStores": [
                {
                    "fk_store": "{STORE_ID}"
                }
            ],
            "productRelations": [
                {
                    "fk_product_relation_type": "{RELATION_TYPE_ID}",
                    "is_active": true,
                    "is_rebuild_scheduled": true,
                    "product_relation_key": "{PRODUCT_RELATION_KEY}",
                    "query_set_data": "{QUERY_SET_DATA}",
                    "productRelationStores": [
                        {
                            "fk_store": "{STORE_ID}"
                        }
                    ]
                }
            ],
            "productAbstractPriceProducts": [
                {
                    "fk_price_type": "{PRICE_TYPE_ID}",
                    "price": "{BASE_PRICE}",
                    "priceProductStores": [
                        {
                            "fk_currency": "{CURRENCY_ID}",
                            "fk_store": "{STORE_ID}",
                            "gross_price": "{GROSS_PRICE}",
                            "net_price": "{NET_PRICE}",
                            "priceProductStoreDefaults": [
                                {}
                            ]
                        }
                    ]
                }
            ],
            "productAbstractCategories": [
                {
                    "fk_category": "{CATEGORY_ID}",
                    "product_order": "{PRODUCT_ORDER}"
                }
            ],
            "productAbstractLocalizedAttributes": [
                {
                    "fk_locale": "{LOCALE_ID_1}",
                    "attributes": "{ABSTRACT_ATTRIBUTES_1}",
                    "description": "{ABSTRACT_DESCRIPTION_1}",
                    "meta_description": "{META_DESCRIPTION_1}",
                    "meta_keywords": "{META_KEYWORDS_1}",
                    "meta_title": "{META_TITLE_1}",
                    "name": "{ABSTRACT_NAME_1}"
                },
                {
                    "fk_locale": "{LOCALE_ID_2}",
                    "attributes": "{ABSTRACT_ATTRIBUTES_2}",
                    "description": "{ABSTRACT_DESCRIPTION_2}",
                    "meta_description": "{META_DESCRIPTION_2}",
                    "meta_keywords": "{META_KEYWORDS_2}",
                    "meta_title": "{META_TITLE_2}",
                    "name": "{ABSTRACT_NAME_2}"
                }
            ]
        }
    ]
}
```

This example shows a single product in the array, but you can include multiple products to process them in batches.

### Related Data Structure

The provided complex endpoint example allows you to create or update:

- **Product Abstract**: Main product information
- **Concrete Products**: Product variants with specific attributes
- **Product Search**: Search configuration for different locales
- **Product Stocks**: Inventory information
- **Localized Attributes**: Product names and descriptions in multiple languages
- **Store Relations**: Store assignments
- **Product Relations**: Related product configurations
- **Price Products**: Pricing information with store and currency specifics
- **Category Relations**: Product category assignments

## Performance Metrics

Based on performance testing, the following metrics demonstrate the efficiency of batch processing:

| Target Volume | Chunk Size | Threads | Time (sec) | Performance (items/sec) | Performance (items/min) |
|---------------|------------|---------|------------|-------------------------|-------------------------|
| 100,000       | 100        | 12      | 3,600      | 27.78                   | 1,666.8                 |

### Key Performance Factors

- **Target Volume**: Total number of items to process
- **Chunk Size**: Number of items processed per request (recommended: 100 items)
- **Concurrent Threads**: Number of parallel processing threads
- **Processing Rate**: Approximately 1,667 items per minute with optimal configuration

By following these optimization techniques, you can significantly improve the performance of your Data Exchange API operations and efficiently handle large-scale data processing tasks.

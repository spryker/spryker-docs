---
title: Product & Attributes Model
description: Comprehensive guide to understanding Spryker's Product & Attributes model, including abstract products, super attributes, and data handling in the Data Exchange API.
last_updated: Dec 28, 2024
template: concept-topic-template
---

# Product & Attributes Model

This document explains the Product & Attributes model in Spryker, focusing on the relationship between abstract and concrete products, super attributes functionality, and data handling patterns in the Data Exchange API.

## Product Model Overview

### Abstract Product Requirement

In Spryker's product data model, an abstract product is always required, even in 1-1 relationships between abstract and concrete products. This design ensures:

- Consistent product hierarchy across the system
- Proper inheritance of attributes from abstract to concrete products
- Unified product management interface in the Back Office
- Correct data synchronization and caching mechanisms

Example of 1-1 relationship:

```
Abstract Product: "Premium Laptop Model X"
└── Concrete Product: "Premium Laptop Model X - SKU123"
```

Even when there's only one concrete product variant, the abstract product serves as the parent container for shared attributes and metadata.

## Super Attributes

### What are Super Attributes

Super attributes are special product attributes that distinguish one product variant from another. They are defined by the `is_super` boolean field in the `spy_product_attribute_key` table.

Key characteristics:
- Used to create product variants (concrete products)
- Enable variant selection on the Storefront
- Required for products with multiple variants
- Stored in database with `is_super = true`

### Super Attribute Requirements

Super attributes are required when:
- Creating products with multiple variants
- Enabling variant selection functionality
- Implementing precise search and filtering
- Managing product matrices with different characteristics

For single-variant products (1-1 abstract-concrete relationship), super attributes are not strictly required but may be used for future extensibility.

### Multiple Super Attributes

Products can have multiple super attributes simultaneously. Common examples:

```
T-Shirt Product:
- Color (red, blue, green) - is_super = true  
- Size (S, M, L, XL) - is_super = true
- Material (cotton) - is_super = false
- Brand (Nike) - is_super = false
```

This creates a variant matrix: red-S, red-M, blue-S, blue-M, etc.

### Super Attribute Exclusivity

An attribute cannot be both super and non-super simultaneously. The `is_super` field is a global boolean setting that applies system-wide for each attribute key.

Once an attribute is marked as `is_super = true`, it functions as a super attribute for all products using that attribute key.

## Attribute Data Handling

### JSON Strings in API Responses

Product attributes are often serialized as JSON strings in API responses:

```json
{
  "attributes": "{\"color\": \"yellow\", \"size\": \"M\"}"
}
```

This format:
- Allows flexible attribute structures
- Supports dynamic attribute sets
- Maintains backward compatibility
- Enables efficient data transfer

### Boolean Values in Attributes

When importing boolean values for attributes and products, use these formats:

#### Database Storage Options:
- Numeric format: `0` (false) / `1` (true)
- String format: `"false"` / `"true"`
- Translation keys for localized display

#### Import Formats:
```csv
# Product import with boolean attributes
sku,attribute_key,attribute_value
SKU123,waterproof,1
SKU124,waterproof,0
```

#### Translation Handling:
```csv
# Attribute translations
attribute_key,locale,translation
waterproof,en_US,Waterproof
waterproof,de_DE,Wasserdicht
waterproof_value_1,en_US,Yes
waterproof_value_0,en_US,No
```

### Attribute Value Assignment

When assigning values to attributes in `spy_product` or localized attributes tables, use the concrete attribute value, not the translation key.

#### Correct Approach:
```sql
-- Use the actual value
INSERT INTO spy_product_attribute_value (attribute_value) VALUES ('red');
```

#### Translation Handling:
```sql  
-- Translations are handled separately
INSERT INTO spy_product_attribute_key_translation (translation) VALUES ('Color');
INSERT INTO spy_product_attribute_value_translation (translation) VALUES ('Red');
```

## Database Schema

### Key Tables:
- `spy_product_attribute_key`: Stores attribute definitions with `is_super` flag
- `spy_product_attribute_value`: Stores attribute values
- `spy_product_abstract_attribute`: Links attributes to abstract products
- `spy_product_concrete_attribute`: Links attributes to concrete products

### Super Attribute Storage:
```sql
-- Example attribute key with super flag
INSERT INTO spy_product_attribute_key (
    key, 
    is_super
) VALUES (
    'color', 
    true
);
```

## Data Exchange API Considerations

### Attribute Synchronization

The Data Exchange API handles attribute synchronization through:
- Buffered loading of super attributes via `loadSuperAttributes()`
- Cached attribute data for performance optimization
- Automatic inheritance from abstract to concrete products

### JSON Attribute Handling

When working with JSON attribute strings in the API:

```php
// Decode JSON attributes for processing
$attributes = json_decode($product['attributes'], true);

// Process individual attributes
foreach ($attributes as $key => $value) {
    // Handle attribute logic
}

// Re-encode for storage/transfer
$encodedAttributes = json_encode($attributes);
```

### Boolean Attribute Processing

Handle boolean attributes consistently:

```php
// Normalize boolean values
$booleanValue = in_array($value, ['1', 'true', true], true) ? 1 : 0;

// For translations
$translationKey = $booleanValue ? 'attribute.yes' : 'attribute.no';
```

## Best Practices

### Product Structure Design
- Always create abstract products, even for single variants
- Plan super attributes before product creation
- Use consistent attribute naming conventions
- Consider future extensibility when defining attributes

### Data Import Strategy
- Import attribute keys before product data
- Set `is_super` flag during attribute key import
- Use consistent boolean value formats
- Implement proper error handling for malformed JSON

### API Integration
- Validate JSON attribute strings before processing
- Handle missing or null attribute values gracefully
- Implement caching for frequently accessed attribute data
- Use batch processing for large attribute datasets

## Common Use Cases

### E-commerce Variants
```
Abstract: "Running Shoes"
├── Concrete: "Running Shoes - Red - Size 8" (color=red, size=8)
├── Concrete: "Running Shoes - Blue - Size 8" (color=blue, size=8)  
└── Concrete: "Running Shoes - Red - Size 9" (color=red, size=9)
```

### Technical Products
```
Abstract: "Server Configuration"
├── Concrete: "Server - 16GB RAM - Intel i5" (ram=16GB, cpu=i5)
└── Concrete: "Server - 32GB RAM - Intel i7" (ram=32GB, cpu=i7)
```

### Single Variant Products
```
Abstract: "Unique Artwork Piece"
└── Concrete: "Unique Artwork Piece - Limited Edition" (edition=limited)
```

## Related Documentation

- [Product Attributes Overview](https://docs.spryker.com/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attributes-overview)
- [Precise Search by Super Attributes](https://docs.spryker.com/docs/pbc/all/search/latest/base-shop/best-practices/precise-search-by-super-attributes)
- [Data Exchange API Limitations](data-exchange-api-limitations)

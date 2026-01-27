---
title: New data export
description: This document describes how to export data from a Spryker shop to an external
  system for your third-party integrations.
last_updated: October 20, 2025
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/new-data-export-feature
originalArticleId: 0a32b993-f10c-4f6c-20db-247a62cd22e7
related:
  - title: Orders data export
    link: docs/integrations/custom-building-integrations/data-exchange/data-export/orders-data-export.html
---

## Overview

The new data export system simplifies exporting entities from Spryker to external systems. It provides a declarative YAML-based configuration combined with PHP plugins for flexibility, making it easy to integrate with third-party systems, analytics platforms, and data warehouses.

## How to export an entity

The new export system greatly simplifies the process. For example, creating an `OrderDataExport` requires only:

### 1. Add YML Configuration

```yml
version: 1

defaults:
    filter_criteria:
        created_at:
            from: "3 week ago 00:00:00"
            to: 'now'
    connection:
        # your connection params

actions:
    - data_entity: order
      destination: '{store}_order.{extension}'
      format:
        type: json
        object: 'order'
      fields:
         field_name_in_export_file: $.fieldNameInYourTransfer
         entity_id: $.entityId
    # Fields can be configured here or in a plugin.
    # YML config is merged with plugin config.
    # YML overrides plugin config fields if they are also defined in plugin.
```

- [Field configuration explanation](#field-configuration-explanation)

### 2. Implement a Plugin

```php
class OrderDataEntityReaderPlugin extends AbstractPlugin implements DataEntityReaderPluginInterface, DataEntityFieldsConfigPluginInterface
{
    public function getDataEntity(): string
    {
        return 'order';
    }

    public function getDataBatch(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportBatchTransfer
    {
        $criteriaTransfer = (new SomeCriteriaTransfer())
            ->fromArray($dataExportConfigurationTransfer->getFilterCriteria());

        return $this->getRepository()->getOrderData(
            $criteriaTransfer,
            $dataExportConfigurationTransfer->getOffsetOrFail(),
            $dataExportConfigurationTransfer->getBatchSizeOrFail(),
        );
    }

    public function getFieldsConfig(): array
    {
        return [
            'field_name_in_config' => '$.fieldNameInYourDataTransfer',
        ];
    }
}
```

This plugin links the data entity (`order`) with its data retrieval logic and field mapping.

You can choose where to define the fields configuration — either in the YAML file or in a plugin that implements the `DataEntityFieldsConfigPluginInterface`.

#### Register the plugin

Add the plugin to your module's dependency provider:

```php
<?php

namespace Pyz\Zed\DataExport;

use Pyz\Zed\Sales\Communication\Plugin\DataExport\OrderDataEntityReaderPlugin;
use Spryker\Zed\DataExport\DataExportDependencyProvider as SprykerDataExportDependencyProvider;

class DataExportDependencyProvider extends SprykerDataExportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityReaderPluginInterface>
     */
    protected function getDataEntityReaderPlugins(): array
    {
        return [
            new OrderDataEntityReaderPlugin(),
        ];
    }
}
```

### 3. Implement Repository Logic

Implement the repository method that retrieves and prepares data for export:

```php
public function getOrderData(
    DataExportConfigurationTransfer $dataExportConfigurationTransfer,
    int $offset,
    int $limit
): DataExportBatchTransfer {
    $query = $this->getFactory()->getSpySalesOrderQuery();

    $this->applyFilters($query, $dataExportConfigurationTransfer);
    $query->setOffset($offset)->setLimit($limit);

    $orderEntities = $query->find();
    $dataExportBatchTransfer = (new DataExportBatchTransfer())
        ->setOffset($offset)
        ->setLimit($limit);

    $data = [];

    foreach ($orderEntities as $orderEntity) {
        $data[] = $this->mapExportDataItem($orderEntity);
    }

    return $dataExportBatchTransfer->setData($data);
}

protected function applyFilters(
    SpySalesOrderQuery $query,
    SomeCriteriaTransfer $criteriaTransfer
): void {
    if ($criteriaTransfer->getCreatedAtFrom()) {
        $query->filterByCreatedAt(
            $criteriaTransfer->getCreatedAtFrom(),
            Criteria::GREATER_EQUAL
        );
    }

    if ($criteriaTransfer->getCreatedAtTo()) {
        $query->filterByCreatedAt(
            $criteriaTransfer->getCreatedAtTo(),
            Criteria::LESS_EQUAL
        );
    }
}

protected function mapExportDataItem(SpySalesOrder $orderEntity): OrderTransfer
{
    // map to OrderTransfer
}
```

The repository prepares the query with necessary joins, applies filters from the configuration, and maps results into `DataExportBatchTransfer`.

---

### Field configuration explanation

The fields configuration defines how data from your Transfer objects is mapped to fields in the export output.
Each entry specifies:
- Left side – the field name in your export file
- Right side – the field path in the Transfer object returned in the repository collection

For example, if you are exporting orders, the OrderTransfer contains:

```php
    /**
     * @var \Generated\Shared\Transfer\AddressTransfer|null
     */
    protected $billingAddress;
```

and the AddressTransfer includes:

```php
    /**
     * @var string
     */
    public const PHONE = 'phone';

```

You can then define in your configuration:

```yaml
phone: $.billingAddress.phone
```

Here, `$` represents the root OrderTransfer object.

The fields configuration defined in the YAML file has higher priority than the configuration defined in the plugin.
If the same field is defined in both the plugin and the YAML configuration, the value from the YAML file will be used.

Fields from both sources (plugin and YAML) are merged into the final configuration:
- Fields defined only in the plugin will be included by default
- Fields defined in the YAML file can override or extend those from the plugin

**Example with OrderTransfer:**

The following example demonstrates how to export order data with various mapping scenarios:
- Simple field mapping
- Nested object field mapping
- Array field mapping with wildcards

**In plugin:**

```php
public function getFieldsConfig(): array
{
    return [
        // Simple field mapping (colon syntax)
        'order_reference:$.orderReference',
        'created_at:$.createdAt',

        // Nested object field mapping
        'billing_address_phone:$.billingAddress.phone',
        'billing_address_city:$.billingAddress.city',

        // Alternative key-value syntax
        'customer_email' => '$.customer.email',

        // Array mapping with wildcards - exports each order item
        // Results in: item_0_sku, item_1_sku, item_2_sku, etc.
        'item_*_sku:$.items.*.sku',
        'item_*_quantity:$.items.*.quantity',
    ];
}
```

**In YAML configuration:**

```yaml
actions:
    - data_entity: order
      fields:
          # Override the billing phone from plugin
          billing_address_phone: $.billingAddress.phone

          # Add new fields not defined in plugin
          order_total: $.totals.grandTotal
          currency: $.currencyIsoCode

          # Add more nested fields
          shipping_address_city: $.shippingAddress.city
          shipping_address_country: $.shippingAddress.country.name

          # Override array mapping to include item names
          item_*_name: $.items.*.name
          item_*_price: $.items.*.unitPrice
```

**Merged output:**

If a field appears in both configurations, the YAML version replaces the plugin one. Fields from both sources are combined in the final configuration:

```yaml
# From plugin (kept):
order_reference: $.orderReference
created_at: $.createdAt
billing_address_city: $.billingAddress.city
customer_email: $.customer.email
item_*_sku: $.items.*.sku
item_*_quantity: $.items.*.quantity

# From plugin (overridden by YAML):
billing_address_phone: $.billingAddress.phone

# From YAML (new fields):
order_total: $.totals.grandTotal
currency: $.currencyIsoCode
shipping_address_city: $.shippingAddress.city
shipping_address_country: $.shippingAddress.country.name
item_*_name: $.items.*.name
item_*_price: $.items.*.unitPrice
```

**Resulting export data for an order with 2 items:**

```json
{
    "order_reference": "DE--123",
    "created_at": "2025-01-27 10:00:00",
    "billing_address_phone": "+49123456789",
    "billing_address_city": "Berlin",
    "customer_email": "customer@example.com",
    "order_total": 15000,
    "currency": "EUR",
    "shipping_address_city": "Munich",
    "shipping_address_country": "Germany",
    "item_0_sku": "SKU-001",
    "item_0_quantity": 2,
    "item_0_name": "Product A",
    "item_0_price": 5000,
    "item_1_sku": "SKU-002",
    "item_1_quantity": 1,
    "item_1_name": "Product B",
    "item_1_price": 5000
}
```

Or in CSV format:

```csv
order_reference,created_at,billing_address_phone,billing_address_city,customer_email,order_total,currency,shipping_address_city,shipping_address_country,item_0_sku,item_0_quantity,item_0_name,item_0_price,item_1_sku,item_1_quantity,item_1_name,item_1_price
DE--123,2025-01-27 10:00:00,+49123456789,Berlin,customer@example.com,15000,EUR,Munich,Germany,SKU-001,2,Product A,5000,SKU-002,1,Product B,5000
```

**How wildcard mapping works:**

When you use `*` in the export key (e.g., `item_*_sku`), the mapper:
1. Evaluates the path `$.items.*.sku` against the OrderTransfer
2. Iterates through each item in the `items` array
3. Creates separate fields for each item: `item_0_sku`, `item_1_sku`, `item_2_sku`, etc.
4. The `*` is replaced with the array index

This is useful when you need to export arrays as flat structure for CSV files or when your destination system expects a fixed column structure.

---

### Alternative: Streaming with Generator

If the previous approach does not meet your requirements, implement `DataEntityGeneratorPluginInterface` instead of `DataEntityReaderPluginInterface`.

```php
<?php

namespace Pyz\Zed\Sales\Communication\Plugin\DataExport;

use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Generated\Shared\Transfer\DataExportResultTransfer;
use Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityGeneratorPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class OrderDataEntityGeneratorPlugin extends AbstractPlugin implements DataEntityGeneratorPluginInterface
{
    public function getDataEntity(): string
    {
        return 'order';
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generator<\Generated\Shared\Transfer\DataExportResultTransfer>
     */
    public function getBatchGenerator(DataExportConfigurationTransfer $dataExportConfigurationTransfer): \Generator
    {
        $criteriaTransfer = (new SomeCriteriaTransfer())
            ->fromArray($dataExportConfigurationTransfer->getFilterCriteria());

        $query = $this->getRepository()->createOrderQuery($criteriaTransfer);

        foreach ($query->find() as $orderEntity) {
            yield (new DataExportResultTransfer())
                ->setData($orderEntity->toArray());
        }
    }
}
```

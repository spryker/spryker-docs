---
title: New data export
description: This document shows how to export data from a Spryker shop to an external
  system for your third party integrations
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

The new export system greatly simplifies the process. For example, creating a `QuoteRequestDataExport` requires only:

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
    - data_entity: quote-request
      destination: '{store}_quote_request.{extension}'
      format:
        type: json
        object: 'quote_request'
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
class QuoteRequestDataEntityReaderPlugin extends AbstractPlugin implements DataEntityReaderPluginInterface, DataEntityFieldsConfigPluginInterface
{
    public function getDataEntity(): string
    {
        return 'quote-request';
    }

    public function getDataBatch(DataExportConfigurationTransfer $dataExportConfigurationTransfer): DataExportBatchTransfer
    {
        $criteriaTransfer = (new SomeCriteriaTransfer())
            ->fromArray($dataExportConfigurationTransfer->getFilterCriteria());

        return $this->getRepository()->getQuoteRequestData(
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

This plugin links the data entity (`quote-request`) with its data retrieval logic and field mapping.

You can choose where to define the fields configuration — either in the YAML file or in a plugin that implements the `DataEntityFieldsConfigPluginInterface`.

#### Register the plugin

Add the plugin to your module's dependency provider:

```php
<?php

namespace Pyz\Zed\DataExport;

use Pyz\Zed\QuoteRequest\Communication\Plugin\DataExport\QuoteRequestDataEntityReaderPlugin;
use Spryker\Zed\DataExport\DataExportDependencyProvider as SprykerDataExportDependencyProvider;

class DataExportDependencyProvider extends SprykerDataExportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityReaderPluginInterface>
     */
    protected function getDataEntityReaderPlugins(): array
    {
        return [
            new QuoteRequestDataEntityReaderPlugin(),
        ];
    }
}
```

### 3. Implement Repository Logic

Implement the repository method that retrieves and prepares data for export:

```php
public function getQuoteRequestData(
    DataExportConfigurationTransfer $dataExportConfigurationTransfer,
    int $offset,
    int $limit
): DataExportBatchTransfer {
    $query = $this->getFactory()->getSpyQuoteRequestQuery();

    $this->applyFilters($query, $dataExportConfigurationTransfer);
    $query->setOffset($offset)->setLimit($limit);

    $quoteRequestEntities = $query->find();
    $dataExportBatchTransfer = (new DataExportBatchTransfer())
        ->setOffset($offset)
        ->setLimit($limit);

    $data = [];

    foreach ($quoteRequestEntities as $quoteRequestEntity) {
        $data[] = $this->mapExportDataItem($quoteRequestEntity);
    }

    return $dataExportBatchTransfer->setData($data);
}

protected function applyFilters(
    SpyQuoteRequestQuery $query,
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

protected function mapExportDataItem(SpyQuoteRequest $quoteRequestEntity): QuoteRequestTransfer
{
    // map to QuoteRequestTransfer
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

**Example behavior:**

If a field appears in both configurations, the YAML version replaces the plugin one. Otherwise, fields from both configurations are kept in the final output.

**In plugin:**

```php
        return [
            // valid configuration
            'name:$.name',
            'some_field_1:$.someDefaultFieldNameDefinedInPlugin',
            // Also valid configuration
            'some_field_2' => '$.someFieldTwoInTransfer'

        ];
```

**In YAML configuration:**

```yaml
actions:
    fields:
        field_name_in_export_file: $.fieldNameInYourTransfer
        entity_id: $.entityId
        some_field_1: $.someFieldOneInTransfer
        some_field_2: $.someFieldTwoInTransfer
        some_field_3: $.someFieldThreeInTransfer
```

**Merged output:**

```yaml
actions:
    fields:
        name: $.name
        field_name_in_export_file: $.fieldNameInYourTransfer
        entity_id: $.entityId
        some_field_1: $.someFieldOneInTransfer
        some_field_2: $.someFieldTwoInTransfer
        some_field_3: $.someFieldThreeInTransfer
```

This configuration defines what data to export, where to put it, and how to structure it.

---

###  Alternative: Streaming with Generator

If the previous approach does not meet your requirements, implement `DataEntityGeneratorPluginInterface` instead of `DataEntityReaderPluginInterface`.

```php
<?php

namespace Pyz\Zed\QuoteRequest\Communication\Plugin\DataExport;

use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Generated\Shared\Transfer\DataExportResultTransfer;
use Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityGeneratorPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\QuoteRequest\Persistence\QuoteRequestRepositoryInterface getRepository()
 */
class QuoteRequestDataEntityGeneratorPlugin extends AbstractPlugin implements DataEntityGeneratorPluginInterface
{
    public function getDataEntity(): string
    {
        return 'quote-request';
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

        $query = $this->getRepository()->createQuoteRequestQuery($criteriaTransfer);

        foreach ($query->find() as $quoteRequestEntity) {
            yield (new DataExportResultTransfer())
                ->setData($quoteRequestEntity->toArray());
        }
    }
}
```

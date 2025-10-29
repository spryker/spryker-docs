---
title: New data export
description: This document shows how to export data from a Spryker shop to an external
  system for your third party integrations
last_updated: October 20
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/new-data-export-feature
originalArticleId: 0a32b993-f10c-4f6c-20db-247a62cd22e7
---

# Data Export

## How to export the entity.

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

#### fields config explanation
The fields configuration defined in the YAML file has higher priority than the configuration defined in the plugin. <br>
If the same field is defined in both the plugin and the YAML configuration, the value from the YAML file will be used.

Fields from both sources (plugin and YAML) are merged into the final configuration.
This means:
•	Fields defined only in the plugin will be included by default.
•	Fields defined in the YAML file can override or extend those from the plugin.

Example result:
If a field appears in both configurations, the YAML version replaces the plugin one.
Otherwise, fields from both configurations are kept in the final output.

In plugin:
```php
        return [
            'name:$.name',
            'some_field_1:$.someDefaultFieldNameDefinedInPlugin',
            'some_field_2' => '$.someFieldTwoInTransfer'

        ];
```

yml fields
```yaml
         field_name_in_export_file: $.fieldNameInYourTransfer
         entity_id: $.entityId
         some_field_1: $.someFieldOneInTransfer
         some_field_2: $.someFieldTwoInTransfer
         some_field_3: $.someFieldThreeInTransfer
```

output:
```yaml
         name: $.name
         field_name_in_export_file: $.fieldNameInYourTransfer
         entity_id: $.entityId
         some_field_1: $.someFieldOneInTransfer
         some_field_2: $.someFieldTwoInTransfer
         some_field_3: $.someFieldThreeInTransfer
```


This configuration defines what data to export, where to put it, and how to structure it.

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
            'field_name_in_config:fieldNameInYourDataTransfer',
        ];
    }
}
```

This plugin links the entity (quote-request) with its data retrieval logic and field mapping.

You can choose where to define the fields configuration — either in the YAML file or in a plugin that implements the DataEntityFieldsConfigPluginInterface.

### 3. Implement Repository Logic

```php
public function getQuoteRequestData(
    DataExportConfigurationTransfer $dataExportConfigurationTransfer,
    int $offset,
    int $limit,
): DataExportBatchTransfer {
    $query = $this->getFactory()->getSpyQuoteRequestQuery();

    $this->prepareQuery($query);
    $this->applyFilters($query, $dataExportConfigurationTransfer);
    $query->setOffset($offset)->setLimit($limit);

    $quoteRequestEntities = $query->find();
    $dataExportBatchTransfer = (new DataExportBatchTransfer())->setOffset($offset)->setLimit($limit);

    $data = [];

    foreach ($quoteRequestEntities as $quoteRequestEntity) {
        $data[] = $this->mapExportDataItem($quoteRequestEntity);
    }

    return $dataExportBatchTransfer->setData($data);
}
```
The repository prepares the query, applies filters, and maps results into DataExportBatchTransfer.

---

### 4. Alternative: Streaming with Generator
Also, you can return a \Generator<\Generated\Shared\Transfer\DataExportResultTransfer> by implementing DataEntityGeneratorPluginInterface.

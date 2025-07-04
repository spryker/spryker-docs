---
title: Table Filter extension
last_updated: Oct 21, 2022
description: This document provides details about the Table Filter extension in the Сomponents Library.
template: concept-topic-template
redirect_from:
    - /docs/marketplace/dev/front-end/202212.0/table-design/table-filters/
    - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-filter-extension/table-filter-extension.html
    - /docs/scos/dev/front-end-development/202404.0/marketplace/table-design/table-filter-extension/table-filter-extension.html

related:
  - title: Table Filter Date Range
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-filter-extension/table-filter-date-range.html
  - title: Table Filter Select
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-filter-extension/table-filter-select.html
  - title: Table Filter Tree Select
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-filter-extension/table-filter-tree-select.html
---

This document explains the Table Filter extension in the Components Library.

## Overview

The Table Filters feature provides filtering functionality to the Core Table Component. The filters, however, are not included in the feature itself — instead, they are registered separately.

A Table Filter is an Angular Component that implements a specific interface (`TableFilterComponent`) and is registered to the Table Filters feature module via `TableFiltersFeatureModule.withFilterComponents()`.

Furthermore, you need to create your own filter module and add it to the `RootModule`.

```ts
// Module augmentation
import { TableFilterBase } from '@spryker/table.feature.filters';

declare module '@spryker/table.feature.filters' {
    interface TableFiltersRegistry {
        custom: TableFilterCustom;
    }
}

export interface TableFilterSelect extends TableFilterBase<TableFilterSelectValue> {
    type: 'custom';
    typeOptions: { ... };
}

// Component implementation
// Module
@NgModule({
    declarations: [TableFilterCustomComponent],
    exports: [TableFilterCustomComponent],
})
export class TableFilterCustomModule {}

// Component
@Component({
    selector: 'spy-table-filter-custom',
    ...
})
export class TableFilterCustomComponent implements TableFilterComponent<TableFilterSelect> {}

// Root module
@NgModule({
    imports: [
        TableFiltersFeatureModule.withFilterComponents({
            custom: TableFilterCustomComponent,
        }),
        TableFilterCustomModule,
    ],
})
export class RootModule {}
```

You can configure any filter in the table config.

```html
<spy-table
    [config]="{
        ...,
        filters: {
            ...,
            items: [
                {
                    type: FILTER_TYPE_NAME,
                    typeOptions: {
                      // Filter specific configuration...
                    },
                },
            ],
            // Makes feature always visible regardless of data (`true` by default).
            forceAlwaysVisible: false,
        },
    }"
>
</spy-table>
```

## Main Filter feature

Using the static method `TableFiltersFeatureModule.withFilterComponents()`, the table module allows registering any table filter by a key. Under the hood, this method assigns the object of filters to `TABLE_FILTERS_TOKEN`.

The main component injects all registered types from the `TABLE_FILTERS_TOKEN` and `Injector`.

`TableFiltersFeatureComponent` gets all registered filters from `TABLE_FILTERS_TOKEN` and maps them to `tableConfig.filters.items` upon initialization. Table Features feature then renders Table Filters as required by the Table Configuration.

## Interfaces

Below you can find interfaces for the Table Filter extension configuration.

```ts
import { TableFeatureConfig } from '@spryker/table';

export interface TableFiltersConfig extends TableFeatureConfig {
    items: TableFilterBase[];
    forceAlwaysVisible?: boolean;
}

export interface TableFilterBase<V = unknown> {
    __capturedValue: V;
    id: string;
    title: string;
    type: string;
    typeOptions?: unknown;
}

export interface TableFilterComponent<C extends TableFilterBase> {
    config?: C;
    value?: C['__capturedValue'];
    valueChange: EventEmitter<C['__capturedValue']>;
    classes: Observable<string | string[]>; // @Output
}
```

## Table Filter types

The Table Filters feature ships with a few common Table Filter types:

- [Date Range](/docs/dg/dev/frontend-development/latest/marketplace/table-design/table-filter-extension/table-filter-date-range.html)—allows filtering data via `DateRangePickerComponent`.
- [Select](/docs/dg/dev/frontend-development/latest/marketplace/table-design/table-filter-extension/table-filter-select.html)—allows filtering data via `SelectComponent`.
- [Tree Select](/docs/dg/dev/frontend-development/latest/marketplace/table-design/table-filter-extension/table-filter-tree-select.html)—allows filtering data via `TreeSelectComponent`.

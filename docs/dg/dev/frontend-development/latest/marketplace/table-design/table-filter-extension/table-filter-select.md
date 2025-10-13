---
title: Table Filter Select
description: This document provides details about the Table Filter Select component in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-filters/table-filter-select.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-filter-extension/table-filter-select.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-filter-extension/table-filter-tree-select.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/table-design/table-filter-extension/table-filter-select.html

related:
  - title: Table Filter extension
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-filter-extension/table-filter-extension.html
  - title: Table Filter Date Range
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-filter-extension/table-filter-date-range.html
  - title: Table Filter Tree Select
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-filter-extension/table-filter-tree-select.html
---

This document explains the Table Filter Select component in the Components Library.

## Overview

Table Filter Select is a feature of the Table Component that allows filtering data via `Select` component.

Check out an example usage of the Table Filter Select in the `@spryker/table` config.

Component configuration:

- `enabled`—enables the filter via config.  
- `items`—an array with the configuration for each filter select.  

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        filters: {
            enabled: true,
            items: [
                {
                    id: 'select1',
                    title: 'Column 1',
                    type: 'select',
                    typeOptions: {
                        multiselect: false,
                        values: [
                            { value: 1, title: 'Option_1' },
                            { value: 2, title: 'Option_2' },
                            { value: 0, title: 'Option_0' },
                        ],
                    },
                },
            ],
        },                                                                                           
    }"
>
</spy-table>
```

## Component registration

Register the component:

```ts
declare module '@spryker/table.feature.filters' {
    interface TableFiltersRegistry {
        select: TableFilterSelect;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            filters: () =>
                import('@spryker/table.feature.filters').then(
                    (m) => m.TableFiltersFeatureModule,
                ),
        }),
        TableFiltersFeatureModule.withFilterComponents({
            select: TableFilterSelectComponent,
        }),
        TableFilterSelectModule,
    ],
})
export class RootModule {}
```

```html
// Via HTML
@NgModule({
    imports: [
        TableModule.forRoot(),
        TableFiltersFeatureModule,
        TableFilterSelectModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-filters-feature spy-table-feature></spy-table-filters-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Filter Select:

```ts
export interface TableFilterSelect
    extends TableFilterBase<TableFilterSelectValue> {
    type: 'select';
    typeOptions: TableFilterSelectOptions;
}

export interface TableFilterSelectOptions {
    values: TableFilterSelectOptionsValue[];
    multiselect?: boolean;
}

export interface TableFilterSelectOptionsValue {
    value: TableFilterSelectValue;
    title: string;
}

export type TableFilterSelectValue = SelectValueSelected;
```

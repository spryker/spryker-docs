---
title: Table Filter Tree Select
description: This document provides details about the Table Filter Tree Select component in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-filters/table-filter-tree-select.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/table-design/table-filter-extension/table-filter-tree-select.html

related:
  - title: Table Filter extension
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-filter-extension/table-filter-extension.html
  - title: Table Filter Date Range
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-filter-extension/table-filter-date-range.html
  - title: Table Filter Select
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-filter-extension/table-filter-select.html
---

This document explains the Table Filter Tree Select component in the Components Library.

## Overview

Table Filter Tree Select is a feature of the Table Component that allows filtering data via `Tree Select` component.

Check out an example usage of the Table Filter Tree Select in the `@spryker/table` config.

Component configuration:

- `enabled`—enables the filter via config.  
- `items`—an array with config for each filter tree-select.  

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        filters: {
            enabled: true,
            items: [
                {
                    id: 'tree-select',
                    title: 'TreeSelect',
                    type: 'tree-select',
                    typeOptions: {
                        multiselect: true,
                        values: [
                            { value: 1, title: 'Option_1' },
                            {
                                value: 2,
                                title: 'Option_2',
                                children: [
                                    { value: 6, title: 'Option_6' },
                                    { value: 7, title: 'Option_7' },
                                ],
                            },
                            { value: 3, title: 'Option_3' },
                            { value: 4, title: 'Option_4' },
                            { value: 5, title: 'Option_5' },
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
        'tree-select': TableFilterTreeSelect;
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
            'tree-select': TableFilterTreeSelectComponent,
        }),
        TableFilterTreeSelectModule,
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
        TableFilterTreeSelectModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-filters-feature spy-table-feature></spy-table-filters-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Filter Tree Select:

```ts
export interface TableFilterTreeSelect
    extends TableFilterBase<TableFilterTreeSelectValue | TableFilterTreeSelectValue[]> {
    type: 'tree-select';
    typeOptions: TableFilterTreeSelectOptions;
}

export interface TableFilterTreeSelectOptions {
    values: TableFilterTreeSelectOptionsValue[];
    multiselect?: boolean;
}

export interface TableFilterTreeSelectOptionsValue {
    value: TableFilterTreeSelectValue;
    title: string;
    children?: TableFilterTreeSelectOptionsValue[];
}

export type TableFilterTreeSelectValue = TreeSelectValue;
```

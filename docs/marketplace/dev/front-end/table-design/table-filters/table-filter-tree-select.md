---
title: Table Filter Tree Select
description: This article provides details about the Table Filter Tree Select component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Filter Tree Select component in the Components Library.

## Overview

Table Filter Tree Select is a feature of the Table Component that allows filtering data via `Tree Select` component.
Check out this example below to see how to use the Filter Tree Select feature.

Feature configuration:

- `enabled` - enables the filter via config.  
- `items` - an array with config for each filter tree-select.  

```html
<spy-table [config]="{
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
}">
</spy-table>
```

## Feature registration

Register the feature

```ts
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

## Interfaces

Below you can find interfaces for the Table Filter Tree Select.

```ts
export interface TableFilterTreeSelect
  extends TableFilterBase<TableFilterTreeSelectValue> {
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

export type TableFilterTreeSelectValue = unknown | unknown[];
```

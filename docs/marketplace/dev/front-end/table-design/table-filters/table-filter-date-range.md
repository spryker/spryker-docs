---
title: Table Filter Date Range
description: This article provides details about the Table Filter Date Range component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Filter Date Range component in the Components Library.

## Overview

Table Filter Date Range is a feature of the Table Component that allows filtering data via `Date Range Picker` component.
Check out this example below to see how to use the Filter Date Range feature.

Feature configuration:

- `enabled` - enables the filter via config.  
- `items` - an array with config for each filter date-range.  

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  filters: {
    enabled: true,
    items: [
      {
        id: 'range',
        title: 'Range',
        type: 'date-range',
        typeOptions: {
          placeholderFrom: 'from',
          placeholderTo: 'to',
        },
      },
    ],
  },                                                                                           
}">
</spy-table>
```

## Feature registration

Register the feature:

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
      'date-range': TableFilterDateRangeComponent,
    }),
    TableFilterDateRangeModule,
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Filter Select.

```ts
export interface TableFilterDateRange
  extends TableFilterBase<DateRangeValueInput> {
  type: 'date-range';
  typeOptions: TableFilterDateRangeOptions;
}

export interface TableFilterDateRangeOptions {
  placeholderFrom?: string;
  placeholderTo?: string;
  format?: string;
  time?: string | boolean;
}
```

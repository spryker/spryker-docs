---
title: Table Feature Pagination
description: This article provides details about the Table Feature Pagination component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Pagination component in the Components Library.

## Overview

Table Feature Pagination is a feature of the Table Component that renders pagination of the table.
This feature is based on the Pagination component.
Check out this example below to see how to use the Pagination feature.

Feature configuration:

- `enabled` - enables feature via config.  
- `sizes` - is an array of numbers of table rows that needs to be displayed per page.  

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  pagination: {
    enabled: true,
    sizes: [10, 50, 100],
  },                                                                                           
}">
</spy-table>
```

## Feature registration

Register the feature:
   
```ts
@NgModule({
  imports: [
    TableModule.withFeatures({
      pagination: () =>
        import('@spryker/table.feature.pagination').then(
          (m) => m.TablePaginationFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Feature Pagination component.

```ts
export interface TablePaginationConfig extends TableFeatureConfig {
  sizes: number[];
}
```

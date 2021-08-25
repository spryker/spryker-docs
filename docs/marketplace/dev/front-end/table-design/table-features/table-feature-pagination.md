---
title: Table Feature Pagination
description: This article provides details about the Table Feature Pagination component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Pagination component in the Components Library.

## Overview

Table Feature Pagination is a feature of the Table Component that displays pagination and `sizes` dropdown.
This feature based on the [Pagination component](/docs/marketplace/dev/front-end/ui-components-library/pagination.html).
See an example below, how to use the Pagination feature.

`enabled` - will enable feature via config.  
`sizes` - an array of numbers of table rows that needs to be displayed per page.

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

## Interfaces

Below you can find interfaces for Table Feature Pagination.

```ts
export interface TablePaginationConfig extends TableFeatureConfig {
  sizes: number[];
}

// Component registration
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      pagination: () =>
        import('./table-pagination-feature.module').then(
          (m) => m.TablePaginationFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```

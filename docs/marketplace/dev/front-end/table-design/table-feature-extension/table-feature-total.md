---
title: Table Feature Total
description: This article provides details about the Table Feature Total component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Total component in the Components Library.

## Overview

Table Feature Total is a feature of the Table Component that renders the total number of the data 
set via [Chips component](/docs/marketplace/dev/front-end/ui-components-library/chips.html).
In case table rows are selectable, Table Feature Total will also render number of selected rows.
See an example below, how to use the Total feature.

`enabled` - will enable feature via config.

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  total: {
    enabled: true,
  },                                                                                           
}">
</spy-table>
```

## Interfaces

Below you can find interfaces for Table Feature Total.

```ts
export interface TableTotalConfig extends TableFeatureConfig {}

// Component registration
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      total: () =>
        import('./table-total-feature.module').then(
          (m) => m.TableTotalFeatureModule,
        ),
    }),
  ],
})
export class RootModule {}
```

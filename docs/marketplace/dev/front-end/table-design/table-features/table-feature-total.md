---
title: Table Feature Total
description: This article provides details about the Table Feature Total component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Total component in the Components Library.

## Overview

Table Feature Total is a feature of the Table Component that renders the total number of the data 
set via Chips component.
In case table rows are selectable, Table Feature Total also renders a number of selected rows.
Check out this example below to see how to use the Total feature.

Feature configuration:

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

## Feature registration

Register the feature:

```ts
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      total: () =>
        import('@spryker/table.feature.total').then(
          (m) => m.TableTotalFeatureModule,
        ),
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Feature Total.

```ts
export interface TableTotalConfig extends TableFeatureConfig {}
```

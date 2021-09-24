---
title: Table Feature Search
description: This article provides details about the Table Feature Search component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Search component in the Components Library.

## Overview

Table Feature Search is a feature of the Table Component that allows searching within the data set.
See an example below, how to use the Search feature.

Feature Configuration:

`enabled` - will enable feature via config.  
`placeholder` - the search placeholder text.

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  search: {
    enabled: true,
    placeholder: 'Search',
  },                                                                                       
}">
</spy-table>
```

## Feature Registration

```ts
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      search: () =>
        import('table.feature.search').then(
          (m) => m.TableSearchFeatureModule,
        ),   
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for Table Feature Search.

```ts
export interface TableSearchConfig extends TableFeatureConfig {
  placeholder?: string;
}
```

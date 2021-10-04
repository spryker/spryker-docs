---
title: Table Feature Search
description: This article provides details about the Table Feature Search component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Search component in the Components Library.

## Overview

Table Feature Search is a feature of the Table Component that allows searching within the data set.
Check out this example below to see how to use the Search feature.

Feature configuration:

- `enabled` - enables the feature via config.  
- `placeholder` - is the search placeholder text.

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

## Feature registration

Register the feature:

```ts
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      search: () =>
        import('@spryker/table.feature.search').then(
          (m) => m.TableSearchFeatureModule,
        ),   
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find an interface for the Table Feature Search.

```ts
export interface TableSearchConfig extends TableFeatureConfig {
  placeholder?: string;
}
```

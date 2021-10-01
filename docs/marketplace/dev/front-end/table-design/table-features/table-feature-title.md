---
title: Table Feature Title
description: This article provides details about the Table Feature Title component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Title component in the Components Library.

## Overview

Table Feature Title is a feature of the Table Component that renders the title of the table.
Check out this example below to see how to use the Title feature.

Feature configuration:

- `enabled` - enables the feature via config.  
- `title` - is a table title text.

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  title: {
    enabled: true,
    title: 'Table title',
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
      title: () =>
        import('@spryker/table.feature.title').then(
          (m) => m.TableTitleFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Feature Title.

```ts
export interface TableTitleConfig extends TableFeatureConfig {
  title?: string;
}
```
